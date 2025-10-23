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

	// FriendsListModal ref
	const friendsModalRef = useRef<FriendsListModalRef>(null);

	// 카드 데이터 가져오기
	useEffect(() => {
		const fetchCards = async () => {
			try {
				setIsLoading(true);
				const response = await cardAPI.getAllCards(currentPage, 15);
				setCards(response.cards);
				setTotalPages(response.totalPages);
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
					<img
						src={`/src/assets/archive/${{
							day: "home-light.png",
							sunset: "home-light.png",
							night: "home-dark.png",
						}[lightState]}`}
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
								src={`/src/assets/archive/${isLampHovered ? "lamp-on-hover.svg" : "lamp-on.svg"}`}
								alt="Lamp"
								className={`pointer-events-none ${isLampHovered ? "scale-121" : ""}`}
							/>
						) : (
							<img
								src={`/src/assets/archive/${isLampHovered ? "lamp-off-hover.svg" : "lamp-off.svg"}`}
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
						<img src="/src/assets/archive/sofa.svg" alt="Sofa" />
						<img
							src="/src/assets/archive/character.png"
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
