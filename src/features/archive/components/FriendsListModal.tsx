import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface Friend {
	id: number;
	name: string;
	email: string;
	isFriend: boolean;
}

interface FriendsListModalProps {
	isOpen: boolean;
	onClose: () => void;
	onDeleteFriend: (friend: Friend) => void;
	onSendFriendRequest: (user: Friend) => void;
}

const FriendsListModal = ({
	isOpen,
	onClose,
	onDeleteFriend,
	onSendFriendRequest,
}: FriendsListModalProps) => {
	const [isRequesting, setIsRequesting] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [friends] = useState<Friend[]>([
		{ id: 1, name: "김철수", email: "chulsoo@example.com", isFriend: true },
		{ id: 2, name: "이영희", email: "younghee@example.com", isFriend: true },
		{ id: 3, name: "박민수", email: "minsu@example.com", isFriend: true },
		{ id: 4, name: "최지영", email: "jiyoung@example.com", isFriend: true },
		{ id: 5, name: "한동훈", email: "donghoon@example.com", isFriend: true },
		{ id: 6, name: "정영희", email: "younghee@example.com", isFriend: true },
		{ id: 7, name: "김민수", email: "minsu@example.com", isFriend: true },
		{ id: 8, name: "이지영", email: "jiyoung@example.com", isFriend: true },
		{ id: 9, name: "박동훈", email: "donghoon@example.com", isFriend: true },
		{ id: 10, name: "최영희", email: "younghee@example.com", isFriend: true },
	]);

	const [searchResults] = useState<Friend[]>([
		{ id: 4, name: "최지수", email: "jisoo@example.com", isFriend: false },
		{ id: 5, name: "한동석", email: "dongseok@example.com", isFriend: false },
	]);

	// 검색 필터링
	const filteredFriends = friends.filter(
		(friend) =>
			friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			friend.email.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	const filteredSearchResults = searchResults.filter(
		(user) =>
			user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			user.email.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	// 모달 외부 클릭 시 닫기
	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="fixed inset-0 z-10 flex items-center justify-center bg-modal-bg/60"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={handleBackdropClick}
				>
					<div className="fixed inset-0 flex items-end justify-center pointer-events-none z-20">
						<img 
							src="/src/assets/archive/letter_up.png" 
							alt="letter_up" 
							className="absolute bottom-[13.5em] w-[52em] h-[32em]"
						/>
					</div>
					<motion.div
						className="flex flex-col items-center w-161 h-204 bg-white rounded-[2.25em] shadow-[0_0_10px_0_rgba(0,0,0,0.15)] overflow-hidden py-10 px-18 gap-y-7 z-30"
						initial={{ y: "100%" }}
						animate={{ y: 0 }}
						exit={{ y: "100%" }}
						transition={{ type: "spring", damping: 25, stiffness: 300 }}
						onClick={(e) => e.stopPropagation()}
					>
						<h1
							className="w-full text-center text-3xl font-bold text-gray"
							style={{ fontFamily: "NexonLv1Gothic" }}
						>
							친구목록
						</h1>
						<div className="flex items-center justify-between gap-x-5 h-12">
							<input
								type="text"
								placeholder="검색"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-109 h-full px-5 py-3 border border-[#d9d9d9] rounded-[36px] outline-none"
								style={{ fontFamily: "NexonLv1Gothic" }}
							/>
							<button
								onClick={() => setSearchTerm("")}
								className="flex items-center justify-center w-11 h-11 rounded-full"
								style={{
									boxShadow:
										"inset 1.647px 2.196px 0.878px 0 rgba(255,255,255,0.51), 0 2.196px 4.228px rgba(0,0,0,0.15)",
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="size-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M6 18 18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>

						<p
							className="text-lg text-gray-600 w-full"
							style={{ fontFamily: "NexonLv1Gothic" }}
						>
							<span className="font-bold">내 친구</span>{" "}
							<span className="font-light">{filteredFriends.length}</span>
						</p>

						{/* 내 친구 섹션 */}
						{(searchTerm === "" || filteredFriends.length > 0) && (
							<div className="w-138 px-16 overflow-y-auto">
								<div className="space-y-[14px]">
									{filteredFriends.map((friend, index) => (
										<div key={friend.id} className="space-y-[14px]">
											<div className="flex items-center justify-between">
												<div
													className="flex flex-col text-start"
													style={{ fontFamily: "NexonLv1Gothic" }}
												>
													<span className="font-semibold text-2xl text-black">
														{friend.name}
													</span>
													<span className="text-lg font-light text-black">
														{friend.email}
													</span>
												</div>
												<button
													onClick={() => onDeleteFriend(friend)}
													className="px-7 py-3 text-lg bg-[#E3E3E3] text-black rounded-[30px] font-light"
													style={{ fontFamily: "NexonLv1Gothic" }}
												>
													삭제
												</button>
											</div>
											{/* 아래에 실선 */}
											{index !== filteredFriends.length - 1 && (
												<hr className="border-t border-gray-300" />
											)}
										</div>
									))}
								</div>
							</div>
						)}

						{/* 검색 결과 섹션 */}
						{searchTerm !== "" && filteredSearchResults.length > 0 && (
							<div className="w-138 px-16 overflow-y-auto">
								<div className="space-y-[14px]">
									{filteredSearchResults.map((user, index) => (
										<div key={user.id} className="space-y-[14px]">
											<div className="flex items-center justify-between">
												<div
													className="flex flex-col text-start"
													style={{ fontFamily: "NexonLv1Gothic" }}
												>
													<span className="font-semibold text-2xl text-black">
														{user.name}
													</span>
													<span className="text-lg font-light text-black">
														{user.email}
													</span>
												</div>
												<button
													onClick={() => {
														setIsRequesting(true);
														onSendFriendRequest(user);
													}}
													className={`px-7 py-3 text-lg rounded-[30px] font-light ${isRequesting ? "border-3 border-primary text-black bg-white cursor-not-allowed" : "bg-primary text-white"}`}
													style={{ fontFamily: "NexonLv1Gothic" }}
												>
													{isRequesting ? "요청중" : "친구요청"}
												</button>
											</div>
											{index !== filteredSearchResults.length - 1 && (
												<hr className="border-t border-gray-300" />
											)}
										</div>
									))}
								</div>
							</div>
						)}

						{/* 검색 결과 없음 */}
						{searchTerm !== "" &&
							filteredFriends.length === 0 &&
							filteredSearchResults.length === 0 && (
								<div
									className="text-center text-gray-600 text-lg"
									style={{ fontFamily: "NexonLv1Gothic" }}
								>
									검색 결과가 없습니다.
								</div>
							)}
					</motion.div>
					<div className="fixed inset-0 flex items-end justify-center pointer-events-none z-40">
						<img 
							src="/src/assets/archive/letter.png" 
							alt="letter" 
							className="absolute bottom-0 w-[52em] h-[28em]"
						/>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default FriendsListModal;
