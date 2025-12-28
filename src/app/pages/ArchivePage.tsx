import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import DeleteConfirmModal from "../../features/archive/components/DeleteConfirmModal";
import FlowerGrid from "../../features/archive/components/FlowerGrid";
import FriendsListModal, {
	type FriendsListModalRef,
} from "../../features/archive/components/FriendsListModal";
import Mailbox from "../../features/archive/components/Mailbox";
import SuccessModal from "../../features/archive/components/SuccessModal";
import PageButton from "../../features/archive/components/PageButton";
import NoCardsModal from "../../features/archive/components/NoCardsModal";
import type { FlowerCard } from "../../types/FlowerCard";
import { AnimatePresence, easeInOut, motion } from "framer-motion";
import AnimatedFlowerCard from "../../features/archive/components/AnimatedFlowerCard";
import CircleTransition from "../../components/CircleTransition";
import cardAlertPng from "../../assets/archive/card-alert.png";
import sofaSvg from "../../assets/archive/sofa.svg";
import characterPng from "../../assets/archive/character.png";
import homeLight from "../../assets/archive/home-light.png";
import homeDark from "../../assets/archive/home-dark.png";
import lampOn from "../../assets/archive/lamp-on.svg";
import lampOnHover from "../../assets/archive/lamp-on-hover.svg";
import lampOff from "../../assets/archive/lamp-off.svg";
import lampOffHover from "../../assets/archive/lamp-off-hover.svg";
import bgDaySvg from "../../assets/archive/bg.svg";
import bgSunsetSvg from "../../assets/archive/bg-sunset.svg";
import bgNightSvg from "../../assets/archive/bg-dark.svg";
import clickMePng from "../../assets/archive/click-me.png";
import { demoCards } from "../../demo/const";

interface Friend {
	id: string;
	name: string;
	email: string;
	isFriend: boolean;
}

const ArchivePage = () => {
	const navigate = useNavigate();
	type LightState = "day" | "sunset" | "night";
	const [lightState, setLightState] = useState<LightState>("day");
	const [isLampHovered, setIsLampHovered] = useState(false);

	// 카드 데이터 상태
	const [cards] = useState<FlowerCard[]>(demoCards);
	const [isLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(0);
	const [totalPages] = useState(Math.max(1, Math.ceil(demoCards.length / 15)));

	// 모달 상태 관리
	const [isFriendsModalOpen, setIsFriendsModalOpen] = useState(false);
	const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
	const [friendToDelete, setFriendToDelete] = useState<Friend | null>(null);
	const [successMessage, setSuccessMessage] = useState("");
	const [showNoCardsModal, setShowNoCardsModal] = useState(false);

	// new card alert state
	const [isNewCardAlert, setIsNewCardAlert] = useState(false);
	const [showCardAnimation, setShowCardAnimation] = useState(false);
	const [triggerCardLanding, setTriggerCardLanding] = useState(false);
	const [latestCard, setLatestCard] = useState<FlowerCard | null>(null);
	const [unreadCards, setUnreadCards] = useState<FlowerCard[]>([]);
	const [currentUnreadIndex, setCurrentUnreadIndex] = useState(0);
	const [unreadCardCount, setUnreadCardCount] = useState(0);

	// Circle transition state
	const [showCircleTransition, setShowCircleTransition] = useState(false);
	const [transitionOrigin, setTransitionOrigin] = useState({ x: 0, y: 0 });

	// click me state
	const [isClickMeHovered, setIsClickMeHovered] = useState(false);

	// FriendsListModal ref
	const friendsModalRef = useRef<FriendsListModalRef>(null);

	// Dummy FlowerCard data
	const dummyCard: FlowerCard = {
		cardId: 1,
		title: "축하의 마음을 전해요",
		imageUrl: "/assets/demo/flowers/flower1.png",
		imageSource: "custom",
		floriography: "사랑과 감사의 마음을 담아",
		whoType: "myself",
		whoLabel: "친구",
		whenType: "birthday",
		whenLabel: "생일",
		emotionTypes: ["joy", "love"],
		emotionLabels: ["기쁨", "사랑"],
		bouquetSize: "medium",
		bouquetLabel: "중간",
		wrappingType: "ribbon",
		wrappingLabel: "리본",
		price: 35000,
		designAssetId: 1,
		backgroundColors: ["#F4B086", "#FBD3B1", "#F0816F", "#F0816F"],
		mainFlower: {
			flowerId: 1,
			koreanName: "장미",
			englishName: "Rose",
			imageUrl: "/assets/demo/flowers/flower1.png",
		},
		subFlower: {
			flowerId: 2,
			koreanName: "카네이션",
			englishName: "Carnation",
			imageUrl: "/assets/demo/flowers/flower2.png",
		},
	};

	// newFriend API 호출하여 unreadCardCount 확인
	useEffect(() => {
		// 데모 모드: unread 카드 알림을 위해 demo 데이터만 사용
		setUnreadCardCount(demoCards.length);
		setUnreadCards(demoCards);
		setLatestCard(demoCards[0]);
		setIsNewCardAlert(demoCards.length > 0);
	}, []);

	// 카드가 없을 때 모달을 보여주고 2초 후 자동으로 닫기
	useEffect(() => {
		if (!isLoading && cards.length === 0) {
			setShowNoCardsModal(true);
			const timer = setTimeout(() => {
				setShowNoCardsModal(false);
			}, 2000);

			return () => clearTimeout(timer);
		}
	}, [isLoading, cards.length]);

	const toggleLight = () => {
		setLightState((prev) =>
			prev === "day" ? "sunset" : prev === "sunset" ? "night" : "day"
		);
	};

	// Mailbox 클릭 핸들러
	const handleMailboxClick = () => {
		setIsFriendsModalOpen(true);
	};

	// 친구 삭제 요청 핸들러
	const handleDeleteFriend = (friend: Friend) => {
		setFriendToDelete(friend);
		setIsDeleteConfirmOpen(true);
	};

	// 친구 삭제 확인 핸들러
	const handleConfirmDelete = async () => {
		if (friendToDelete) {
			setIsDeleteConfirmOpen(false);
			setSuccessMessage("삭제되었습니다.");
			setIsSuccessModalOpen(true);
			setFriendToDelete(null);

			// 친구 목록 즉시 새로고침 (demo에서는 로컬 상태만 갱신)
			friendsModalRef.current?.refreshFriends();
		}
	};

	// 친구 삭제 취소 핸들러
	const handleCancelDelete = () => {
		setIsDeleteConfirmOpen(false);
		setFriendToDelete(null);
	};

	// 친구 요청 핸들러
	const handleSendFriendRequest = () => {
		setSuccessMessage("친구요청이\n완료되었습니다.");
		setIsSuccessModalOpen(true);
	};

	// 친구 방문 핸들러
	const handleVisitFriend = (friend: Friend) => {
		// 친구의 카드 페이지로 이동
		navigate(`/archive/user/${friend.id}`);
	};

	// 성공 모달 닫기 핸들러
	const handleCloseSuccessModal = () => {
		setIsSuccessModalOpen(false);
		setSuccessMessage("");
	};

	// New Card Alert 클릭 핸들러
	const handleNewCardAlertClick = () => {
		setShowCardAnimation(true);
		setIsNewCardAlert(false);
	};

	// Card Animation 닫기 핸들러
	const handleCloseCardAnimation = () => {
		setShowCardAnimation(false);
		// 0.6초 후에 카드 착지 애니메이션 트리거
		setTimeout(() => {
			setTriggerCardLanding(true);
			// 애니메이션이 진행될 시간을 준 후 리셋 (spring 애니메이션이 완료될 시간)
			setTimeout(() => {
				setTriggerCardLanding(false);
			}, 100);
		}, 500);
	};

	// 다음 안 읽은 카드로 넘어가는 핸들러
	const handleNextUnreadCard = () => {
		if (currentUnreadIndex < unreadCards.length - 1) {
			const nextIndex = currentUnreadIndex + 1;
			setCurrentUnreadIndex(nextIndex);
			setLatestCard(unreadCards[nextIndex]);
		} else {
			// 마지막 카드인 경우 애니메이션 종료
			handleCloseCardAnimation();
		}
	};

	// 페이지네이션 핸들러
	const goToNextPage = () => {
		if (currentPage < totalPages - 1) {
			setCurrentPage(currentPage + 1);
		}
	};

	const goToPreviousPage = () => {
		if (currentPage > 0) {
			setCurrentPage(currentPage - 1);
		}
	};

	// Handle character click for Miyeonsi page navigation
	const handleCharacterClick = (event: React.MouseEvent<HTMLImageElement>) => {
		const rect = event.currentTarget.getBoundingClientRect();
		const x = rect.left + rect.width / 2;
		const y = rect.top + rect.height / 2;

		setTransitionOrigin({ x, y });
		setShowCircleTransition(true);
	};

	const handleTransitionComplete = () => {
		navigate("/miyeonsi");
	};

	return (
		<main className="overflow-hidden">
			{/* background image with smooth crossfade */}
			<div className="relative w-full h-screen flex justify-center pt-[139px] overflow-hidden">
				{/* Light background layer */}
				<div
					className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-400 ease-in-out pointer-events-none"
					style={{
						backgroundImage: `url(${bgDaySvg})`,
						opacity: lightState === "day" ? 1 : 0,
					}}
				/>
				{/* Sunset background layer */}
				<div
					className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-400 ease-in-out pointer-events-none"
					style={{
						backgroundImage: `url(${bgSunsetSvg})`,
						opacity: lightState === "sunset" ? 1 : 0,
					}}
				/>
				{/* Dark background layer */}
				<div
					className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-400 ease-in-out pointer-events-none"
					style={{
						backgroundImage: `url(${bgNightSvg})`,
						opacity: lightState === "night" ? 1 : 0,
					}}
				/>
				{/* 배경 역할을 하는 home 이미지 */}
				<div className="relative w-full h-[calc(100vh-10em-80px)] 3xl:h-[calc(100vh-8em-102px)]">
					<img src={{ day: homeLight, sunset: homeLight, night: homeDark }[lightState]}
						alt="Home background"
						className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
						style={{
							width: "102em",
							height: "53em",
						}}
					/>
					<div
						className="absolute z-10 group flex bottom-[42em] left-1/2 cursor-pointer w-22 h-35 justify-center items-center"
						style={{
							transform: "translate(-50%, -5%)",
						}}
						onMouseEnter={() => setIsLampHovered(true)}
						onMouseLeave={() => setIsLampHovered(false)}
						onClick={toggleLight}
					>
						{lightState !== "night" ? (
							<img
								src={isLampHovered ? lampOnHover : lampOn}
								alt="Lamp"
								className={`pointer-events-none ${isLampHovered ? "scale-121" : ""}`}
							/>
						) : (
							<img
								src={isLampHovered ? lampOffHover : lampOff}
								alt="Lamp"
								className={`pointer-events-none ${isLampHovered ? "scale-118" : ""}`}
							/>
						)}
					</div>
					{/* --- 그리드 및 네비게이션을 포함하는 컨테이너 --- */}
					<div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-3em]">
						<FlowerGrid
							cards={cards}
							isLoading={isLoading}
							triggerCardLanding={triggerCardLanding}
						/>
					</div>

					{/* 페이지네이션 */}
					<div className="absolute bottom-[-3em] left-1/2 transform -translate-x-1/2 gap-[160px] w-full flex flex-row justify-center items-center">
						{/* 왼쪽 화살표 버튼 */}
						<PageButton
							direction="left"
							onClick={goToPreviousPage}
							disabled={currentPage === 0}
						/>

						{/* 페이지 번호 레이블 */}
						<span
							className="font-bold text-[#868686] text-lg w-12 text-center"
							style={{ fontFamily: "NEXONLv1Gothic" }}
						>
							{currentPage + 1} / {totalPages}
						</span>

						{/* 오른쪽 화살표 버튼 */}
						<PageButton
							direction="right"
							onClick={goToNextPage}
							disabled={currentPage >= totalPages - 1}
						/>
					</div>
					<div
						className="
							absolute bottom-[7.5em] left-1/2 z-10 cursor-pointer w-48 h-64
							translate-x-[calc(-50%-34em)]
						"
					>
						<Mailbox onClick={handleMailboxClick} />
					</div>

					<div
						className="absolute left-1/2 bottom-0 z-10"
						style={{
							width: "25em",
							height: "26.5em",
							transform: "translate(calc(-50% + 33.75em), calc(-50% + 15em))",
						}}
					>
						{isNewCardAlert && !isClickMeHovered ?
							<motion.img
								src={cardAlertPng}
								alt="New Card Alert"
								whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 100, ease: easeInOut, duration: 0.5 }}
								className="absolute w-40 transform translate-x-3/5 -translate-y-1/4 cursor-pointer"
								onClick={handleNewCardAlertClick}
							/> :
							<img
								src={clickMePng}
								alt="Click Me"
								className="absolute w-40 transform translate-x-3/5 -translate-y-1/4 cursor-pointer"

							/>}
						<img src={sofaSvg} alt="Sofa" />
						<img
							src={characterPng}
							alt="Character"
							className="absolute top-1/2 left-1/2 transform -translate-x-2/3 -translate-y-1/2 cursor-pointer hover:scale-105 transition-transform"
							style={{
								width: "14em",
								height: "14em",
							}}
							onClick={handleCharacterClick}
							onMouseEnter={() => setIsClickMeHovered(false)}
							onMouseLeave={() => setIsClickMeHovered(true)}
						/>
					</div>
				</div>
			</div>

			{/* Card Animation */}
			<AnimatePresence>
				{showCardAnimation && (
					<>
						{/* Overlay */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{ duration: 0.8 }}
							className="fixed inset-0 bg-black/30 z-50"
							onClick={handleCloseCardAnimation}
						/>

						{/* Card Container with perspective */}
						<div
							className="fixed inset-0 z-50 pointer-events-none"
							style={{
								perspective: "2000px",
								perspectiveOrigin: "center center",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							{/* 카드 카운터 표시 */}
							{unreadCardCount > 1 && (
								<div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-60">
									<div className="bg-black/50 text-white px-4 py-2 rounded-full text-sm font-medium">
										{currentUnreadIndex + 1} / {unreadCardCount}
									</div>
								</div>
							)}
							<motion.div
								initial={{
									scale: 0.3,
									rotateY: 0,
									rotateX: 40,
									x: "100vw",
									y: "100vh",
								}}
								animate={{
									scale: 1,
									rotateY: 720,
									rotateX: 0,
									x: 0,
									y: 0,
									transition: {
										duration: 1.5,
										ease: [0.33, 1, 0.68, 1],
									},
								}}
								exit={{
									scale: 0.1,
									rotateY: 360,
									rotateX: 25,
									x: "-15vw",
									y: "-10vh",
									opacity: 0.05,
									transition: {
										duration: 1,
										ease: [0.33, 1, 0.68, 1],
									},
								}}
								style={{
									transformStyle: "preserve-3d" as React.CSSProperties["transformStyle"],
								}}
								className="pointer-events-auto"
							>
								<AnimatedFlowerCard
									flowerCard={latestCard || dummyCard}
									onClick={handleNextUnreadCard}
								/>
							</motion.div>
						</div>
					</>
				)}
			</AnimatePresence>

			{/* 모달들 */}
			<FriendsListModal
				ref={friendsModalRef}
				isOpen={isFriendsModalOpen}
				onClose={() => setIsFriendsModalOpen(false)}
				onDeleteFriend={handleDeleteFriend}
				onSendFriendRequest={handleSendFriendRequest}
				onVisitFriend={handleVisitFriend}
			/>

			<DeleteConfirmModal
				isOpen={isDeleteConfirmOpen}
				friendName={friendToDelete?.name || ""}
				onConfirm={handleConfirmDelete}
				onCancel={handleCancelDelete}
			/>

			<SuccessModal
				isOpen={isSuccessModalOpen}
				message={successMessage}
				onClose={handleCloseSuccessModal}
			/>

			<NoCardsModal
				isVisible={showNoCardsModal}
				onClose={() => setShowNoCardsModal(false)}
			/>

			{/* Circle Transition */}
			<CircleTransition
				isActive={showCircleTransition}
				onComplete={handleTransitionComplete}
				originX={transitionOrigin.x}
				originY={transitionOrigin.y}
			/>
		</main>
	);
};

export default ArchivePage;
