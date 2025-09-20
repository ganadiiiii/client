import { useState } from "react";
import DeleteConfirmModal from "../../features/archive/components/DeleteConfirmModal";
import FriendsListModal from "../../features/archive/components/FriendsListModal";
import Mailbox from "../../features/archive/components/Mailbox";
import SuccessModal from "../../features/archive/components/SuccessModal";
import FlowerGrid from "../../features/archive/components/FlowerGrid";

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
				<div className="relative w-full h-[calc(100vh-9em-80px)] 2xl:h-[calc(100vh-9em-102px)]">
					<img
						src={`/src/assets/archive/${isLightOn ? "home-light.png" : "home-dark.png"}`}
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
						{isLightOn ? (
							<img
								src={`/src/assets/archive/${isLampHovered ? "lamp-on.svg" : "lamp-on.svg"}`}
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
					<div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-3em]">
						<FlowerGrid />
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
