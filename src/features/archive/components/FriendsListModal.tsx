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
						className="flex flex-col w-161 h-204 bg-white rounded-[2.25em] shadow-[0_0_10px_0_rgba(0,0,0,0.15)] overflow-hidden p-12 z-30"
						initial={{ y: "100%" }}
						animate={{ y: 0 }}
						exit={{ y: "100%" }}
						transition={{ type: "spring", damping: 25, stiffness: 300 }}
						onClick={(e) => e.stopPropagation()}
					>
						<h1
							className="text-3xl font-bold text-gray mb-4 text-center shrink-0"
							style={{ fontFamily: "NexonLv1Gothic" }}
						>
							친구목록
						</h1>
						<div className="flex items-center justify-between gap-x-3 w-full h-12 mb-8">
							<input
								type="text"
								placeholder="검색"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="w-full h-full px-5 py-6 border border-gray/40 rounded-[1.5em] outline-none"
								style={{ fontFamily: "NexonLv1Gothic" }}
							/>
							{/* <button
								onClick={() => setSearchTerm("")}
								className="flex items-center justify-center w-11 h-11 rounded-full text-gray"
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
							</button> */}
						</div>
						<span
							className="flex flex-row gap-1 text-gray ml-1 mb-4"
							style={{ fontFamily: "NexonLv1Gothic" }}
						>
							<p>내 친구</p>
							<p className="font-bold">{filteredFriends.length}명</p>
						</span>

						{/* 내 친구 섹션 */}
						{(searchTerm === "" || filteredFriends.length > 0) && (
							<div
								className="w-full px-6 overflow-y-auto select-friends-scroll"
								style={{ fontFamily: "NexonLv1Gothic" }}
							>
								<div className="overflow-y-auto">
									{filteredFriends.map((friend, index) => (
										<div
											key={friend.id}
											className={`flex items-center justify-between py-5 ${index !== filteredFriends.length - 1 ? 'border-b border-gray/20' : ''}`}
										>
											<span className="flex flex-col">
												<p className="font-bold">{friend.name}</p>
												<p>{friend.email}</p>
											</span>
											<button
												key={friend.id}
												onClick={() => onDeleteFriend(friend)}
												className="px-7 py-3 bg-gray/20 text-dark-gray rounded-[30px] hover:bg-gray/40 transition-colors duration-100"
												style={{ fontFamily: "NexonLv1Gothic" }}
											>
												삭제
											</button>
										</div>
									))}
								</div>
							</div>
						)}

						{/* 검색 결과 섹션 */}
						{searchTerm !== "" && filteredSearchResults.length > 0 && (
							<div
								className="w-full px-6 overflow-y-auto border-t border-gray/60 select-friends-scroll"
								style={{ fontFamily: "NexonLv1Gothic" }}
							>
								<div className="overflow-y-auto">
									{filteredSearchResults.map((user, index) => (
										<div
											key={user.id}
											className={`flex items-center justify-between py-5 ${index !== filteredSearchResults.length - 1 ? 'border-b border-gray/20' : ''}`}
										>
											<span className="flex flex-col">
												<p className="font-bold">{user.name}</p>
												<p>{user.email}</p>
											</span>
											<button
												onClick={() => {
													setIsRequesting((prev) => !prev);
													onSendFriendRequest(user);
												}}
												className={`px-7 py-3 rounded-[30px] bg-primary text-white`}
											>
												{isRequesting ? "요청 중" : "친구요청"}
											</button>
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
									className="text-center text-dark-gray text-lg mt-10"
									style={{ fontFamily: "NexonLv1Gothic" }}
								>
									검색 결과가 없습니다.
								</div>
							)}
							
							{/* Scoped scrollbar styling for this modal only */}
							<style>
								{`
								.select-friends-scroll::-webkit-scrollbar { background: transparent; }
								.select-friends-scroll::-webkit-scrollbar-track { background: transparent; }
								.select-friends-scroll::-webkit-scrollbar-corner { background: transparent; }
								/* Firefox */
								.select-friends-scroll { scrollbar-color: #a3a3a3 transparent; }
								`}
							</style>
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
