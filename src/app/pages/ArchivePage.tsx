import { useState } from "react";
import DeleteConfirmModal from "../../features/archive/components/DeleteConfirmModal";
import FriendsListModal from "../../features/archive/components/FriendsListModal";
import Mailbox from "../../features/archive/components/Mailbox";
import SuccessModal from "../../features/archive/components/SuccessModal";
import FlowerGrid from "../../features/archive/FlowerGrid";

interface Friend {
	id: number;
	name: string;
	email: string;
	isFriend: boolean;
}

const ArchivePage = () => {
	const [isLightOn, setIsLightOn] = useState(true);
	const [isLampHovered, setIsLampHovered] = useState(false);

	// 모달 상태 관리
	const [isFriendsModalOpen, setIsFriendsModalOpen] = useState(false);
	const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
	const [friendToDelete, setFriendToDelete] = useState<Friend | null>(null);
	const [successMessage, setSuccessMessage] = useState("");

	const toggleLight = () => {
		setIsLightOn((isLightOn) => !isLightOn);
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
	const handleConfirmDelete = () => {
		if (friendToDelete) {
			setIsDeleteConfirmOpen(false);
			setSuccessMessage("삭제되었습니다.");
			setIsSuccessModalOpen(true);
			setFriendToDelete(null);
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

	return (
		<main className="overflow-hidden">
			{/* background image with smooth crossfade */}
			<div className="relative w-full h-screen flex justify-center pt-[139px] overflow-hidden">
				{/* Light background layer */}
				<div
					className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-400 ease-in-out pointer-events-none"
					style={{
						backgroundImage: "url(/src/assets/archive/bg.svg)",
						opacity: isLightOn ? 1 : 0,
					}}
				/>
				{/* Dark background layer */}
				<div
					className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-400 ease-in-out pointer-events-none"
					style={{
						backgroundImage: "url(/src/assets/archive/bg-dark.svg)",
						opacity: isLightOn ? 0 : 1,
					}}
				/>
				{/* 배경 역할을 하는 home 이미지 */}
				<div className="relative">
					<img
						src={`/src/assets/archive/${isLightOn ? "home-light.svg" : "home-dark.svg"}`}
						alt="Home background"
						className="max-w-full h-auto"
					/>

					<div
						className="absolute z-10 group flex top-0 left-1/2 cursor-pointer h-48 justify-center items-center"
						style={{
							transform: "translate(-50%, -5%)",
						}}
						onMouseEnter={() => setIsLampHovered(true)}
						onMouseLeave={() => setIsLampHovered(false)}
						onClick={toggleLight}
					>
						{isLightOn ? (
							<img
								src={`/src/assets/archive/${isLampHovered ? "lamp-on-hover.svg" : "lamp-on.svg"}`}
								alt="Lamp"
								className="pointer-events-none"
							/>
						) : (
							<img
								src={`/src/assets/archive/${isLampHovered ? "lamp-off-hover.svg" : "lamp-off.svg"}`}
								alt="Lamp"
								className="pointer-events-none"
							/>
						)}
					</div>
					{/* --- 그리드 및 네비게이션을 포함하는 컨테이너 --- */}
					<FlowerGrid />
				</div>
			</div>
			<Mailbox onClick={handleMailboxClick} />
			<div
				className="absolute top-1/2 left-1/2 z-10 w-[400px] h-[400px]"
				style={{
					transform: "translate(calc(-50% + 540px), calc(-50% + 240px))",
				}}
			>
				<img src="/src/assets/archive/sofa.svg" alt="Sofa" />
			</div>

			{/* 모달들 */}
			<FriendsListModal
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
