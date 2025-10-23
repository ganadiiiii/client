import { useEffect, useRef, useState } from "react";
import { cardAPI, friendAPI } from "../../api";
import DeleteConfirmModal from "../../features/archive/components/DeleteConfirmModal";
import FlowerGrid from "../../features/archive/components/FlowerGrid";
import FriendsListModal, {
	type FriendsListModalRef,
} from "../../features/archive/components/FriendsListModal";
import Mailbox from "../../features/archive/components/Mailbox";
import SuccessModal from "../../features/archive/components/SuccessModal";
import PageButton from "../../features/archive/components/PageButton";
import type { FlowerCard } from "../../types/FlowerCard";
import { AnimatePresence, easeInOut, motion } from "framer-motion";
import AnimatedFlowerCard from "../../features/archive/components/AnimatedFlowerCard";
import cardAlertPng from "../../assets/archive/card-alert.png";
import sofaSvg from "../../assets/archive/sofa.svg";
import characterPng from "../../assets/archive/character.png";
import homeLight from "/src/assets/archive/home-light.png"
import homeDark from "/src/assets/archive/home-dark.png"
import lampOn from "/src/assets/archive/lamp-on.svg";
import lampOnHover from "/src/assets/archive/lamp-on-hover.svg";
import lampOff from "/src/assets/archive/lamp-off.svg";
import lampOffHover from "/src/assets/archive/lamp-off-hover.svg";

interface Friend {
	id: string;
	name: string;
	email: string;
	isFriend: boolean;
}

const ArchivePage = () => {
	type LightState = "day" | "sunset" | "night";
	const [lightState, setLightState] = useState<LightState>("day");
	const [isLampHovered, setIsLampHovered] = useState(false);

	// 카드 데이터 상태
	const [cards, setCards] = useState<FlowerCard[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);

	// 모달 상태 관리
	const [isFriendsModalOpen, setIsFriendsModalOpen] = useState(false);
	const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
	const [friendToDelete, setFriendToDelete] = useState<Friend | null>(null);
	const [successMessage, setSuccessMessage] = useState("");

	// new card alert state
	const [isNewCardAlert, setIsNewCardAlert] = useState(true);
	const [showCardAnimation, setShowCardAnimation] = useState(false);
	const [triggerCardLanding, setTriggerCardLanding] = useState(false);

	// FriendsListModal ref
	const friendsModalRef = useRef<FriendsListModalRef>(null);

	// Dummy FlowerCard data
	const dummyCard: FlowerCard = {
		cardId: 999,
		title: "축하의 마음을 전해요",
		imageUrl: "/src/assets/generate/bouquet-pink.png",
		imageSource: "custom",
		floriography: "사랑과 감사의 마음을 담아",
		whoType: "friend",
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
		backgroundColors: ["#FFB6C1", "#FFC0CB"],
		mainFlower: {
			flowerId: 1,
			koreanName: "장미",
			englishName: "Rose",
			imageUrl: "/src/assets/generate/flower-1.png",
		},
		subFlower: {
			flowerId: 2,
			koreanName: "카네이션",
			englishName: "Carnation",
			imageUrl: "/src/assets/generate/flower-2.png",
		},
		message: "생일 축하해! 항상 행복하고 건강하길 바랄게. 우리 앞으로도 오래오래 좋은 친구로 지내자!",
		sender: "지은",
		receiver: "정원",
	};

	// 카드 데이터 가져오기
	useEffect(() => {
		const fetchCards = async () => {
		try {
			setIsLoading(true);
			const response = await cardAPI.getAllCards(currentPage, 15);
			
			// SharedCardDetail 배열을 FlowerCard 배열로 변환
			const flowerCards = response.items?.map((sharedCard: any) => ({
				...sharedCard.card,
				message: sharedCard.note,
				sender: sharedCard.fromName,
				receiver: sharedCard.toName,
			})) || [];
			
			setCards(flowerCards);
			setTotalPages(response.totalPages || 0);
		} catch (error) {
			console.error("카드 목록 조회 실패:", error);
		} finally {
			setIsLoading(false);
		}
		};

		fetchCards();
	}, [currentPage]);

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
			try {
				await friendAPI.deleteFriend(friendToDelete.id);
				setIsDeleteConfirmOpen(false);
				setSuccessMessage("삭제되었습니다.");
				setIsSuccessModalOpen(true);
				setFriendToDelete(null);

				// 친구 목록 즉시 새로고침
				friendsModalRef.current?.refreshFriends();
			} catch (error) {
				console.error("친구 삭제 실패:", error);
			}
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

	return (
		<main className="overflow-hidden">
			{/* background image with smooth crossfade */}
			<div className="relative w-full h-screen flex justify-center pt-[139px] overflow-hidden">
				{/* Light background layer */}
				<div
					className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-400 ease-in-out pointer-events-none"
					style={{
						backgroundImage: "url(/src/assets/archive/bg.svg)",
						opacity: lightState === "day" ? 1 : 0,
					}}
				/>
				{/* Sunset background layer */}
				<div
					className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-400 ease-in-out pointer-events-none"
					style={{
						backgroundImage: "url(/src/assets/archive/bg-sunset.svg)",
						opacity: lightState === "sunset" ? 1 : 0,
					}}
				/>
				{/* Dark background layer */}
				<div
					className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-400 ease-in-out pointer-events-none"
					style={{
						backgroundImage: "url(/src/assets/archive/bg-dark.svg)",
						opacity: lightState === "night" ? 1 : 0,
					}}
				/>
				{/* 배경 역할을 하는 home 이미지 */}
				<div className="relative w-full h-[calc(100vh-9em-80px)] 3xl:h-[calc(100vh-9em-102px)]">
					<img src={{day: homeLight, sunset: homeLight, night: homeDark}[lightState]}
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
					<motion.img
						src={cardAlertPng}
						alt="New Card Alert"
						whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 100, ease: easeInOut, duration: 0.5 }}
						className={`absolute w-40 transform translate-x-3/5 -translate-y-1/4 cursor-pointer ${isNewCardAlert ? "opacity-100" : "opacity-0 invisible"}`}
						onClick={handleNewCardAlertClick}
					/>
						<img src={sofaSvg} alt="Sofa" />
						<img
							src={characterPng}
							alt="Character"
							className="absolute top-1/2 left-1/2 transform -translate-x-2/3 -translate-y-1/2"
							style={{
								width: "14em",
								height: "14em",
							}}
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
							<AnimatedFlowerCard flowerCard={dummyCard} />
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
		</main>
	);
};

export default ArchivePage;
