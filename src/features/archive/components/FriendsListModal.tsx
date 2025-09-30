import { AnimatePresence, motion } from "framer-motion";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { authAPI, friendAPI } from "../../../api";

interface Friend {
	id: string;
	name: string;
	email: string;
	isFriend: boolean;
	requestStatus?: "sent" | "received" | "none";
	requestId?: number;
}

interface FriendRequest {
	requestId: number;
	sender: {
		userId: string;
		email: string;
		firstName: string;
		lastName: string;
	};
	receiver: {
		userId: string;
		email: string;
		firstName: string;
		lastName: string;
	};
	status: string;
	createdAt: string;
	respondedAt: string | null;
}

interface User {
	userId: string;
	email: string;
	firstName: string;
	lastName: string;
}

interface FriendsListModalProps {
	isOpen: boolean;
	onClose: () => void;
	onDeleteFriend?: (friend: Friend) => void;
	onSendFriendRequest?: (user: Friend) => void;
	onSelectFriend?: (friend: Friend) => void;
}

export interface FriendsListModalRef {
	refreshFriends: () => void;
}

const FriendsListModal = forwardRef<FriendsListModalRef, FriendsListModalProps>(
	(
		{ isOpen, onClose, onDeleteFriend, onSendFriendRequest, onSelectFriend },
		ref,
	) => {
		const [searchTerm, setSearchTerm] = useState("");
		const [friends, setFriends] = useState<Friend[]>([]);
		const [searchResults, setSearchResults] = useState<Friend[]>([]);
		const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
		const [currentUser, setCurrentUser] = useState<User | null>(null);
		const [loading, setLoading] = useState(false);
		const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
		const [selectedRequest, setSelectedRequest] = useState<Friend | null>(null);

		// 현재 사용자 정보 가져오기
		const getCurrentUser = async () => {
			try {
				const response = await authAPI.me();
				setCurrentUser(response);
			} catch (error) {
				console.error("현재 사용자 정보 가져오기 실패:", error);
			}
		};

		// 친구 목록 가져오기
		const getFriends = async () => {
			try {
				const response = await friendAPI.getFriends();
				const friendsData = response.items.map(
					(item: {
						userId: string;
						firstName: string;
						lastName: string;
						email: string;
					}) => ({
						id: item.userId,
						name: `${item.firstName} ${item.lastName}`.trim(),
						email: item.email,
						isFriend: true,
						requestStatus: "none" as const,
					}),
				);
				setFriends(friendsData);
			} catch (error) {
				console.error("친구 목록 가져오기 실패:", error);
			}
		};

		// 친구 요청 목록 가져오기
		const getFriendRequests = async () => {
			if (!currentUser) return;

			try {
				const response = await friendAPI.getFriendsRequest();
				setFriendRequests(response.items || []);

				// 친구 요청 사용자들을 친구 목록에 추가
				const requestUsers: Friend[] = [];
				response.items?.forEach((request: FriendRequest) => {
					if (request.status === "PENDING") {
						const isReceived = request.receiver.userId === currentUser.userId;
						const userInfo = isReceived ? request.sender : request.receiver;

						requestUsers.push({
							id: userInfo.userId,
							name: `${userInfo.firstName} ${userInfo.lastName}`.trim(),
							email: userInfo.email,
							isFriend: false,
							requestStatus: isReceived ? "received" : "sent",
							requestId: request.requestId,
						});
					}
				});

				// 기존 친구 목록과 요청 사용자들을 합치기
				setFriends((prev) => {
					const existingFriends = prev.filter((f) => f.isFriend);
					return [...existingFriends, ...requestUsers];
				});
			} catch (error) {
				console.error("친구 요청 목록 가져오기 실패:", error);
			}
		};

		const refreshFriends = async () => {
			await getCurrentUser();
			await getFriends();
			await getFriendRequests();
		};

		useImperativeHandle(ref, () => ({
			refreshFriends,
		}));

		// 검색 실행
		const searchUsers = async (term: string) => {
			if (!term.trim()) {
				setSearchResults([]);
				return;
			}

			setLoading(true);
			try {
				const response = await friendAPI.search(term);
				const searchData = response.items.map(
					(item: {
						userId: string;
						firstName: string;
						lastName: string;
						email: string;
						isFriend: boolean;
					}) => ({
						id: item.userId,
						name: `${item.firstName} ${item.lastName}`.trim(),
						email: item.email,
						isFriend: item.isFriend,
						requestStatus: "none" as const,
					}),
				);
				setSearchResults(searchData);
			} catch (error) {
				console.error("검색 실패:", error);
				setSearchResults([]);
			} finally {
				setLoading(false);
			}
		};

		// 모달이 열릴 때마다 데이터 로드
		useEffect(() => {
			if (isOpen) {
				refreshFriends();
			}
		}, [isOpen]);

		// 검색어가 변경될 때마다 검색 실행
		useEffect(() => {
			const timeoutId = setTimeout(() => {
				searchUsers(searchTerm);
			}, 300);

			return () => clearTimeout(timeoutId);
		}, [searchTerm]);

		// 검색 필터링
		const filteredFriends = friends.filter(
			(friend) =>
				friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				friend.email.toLowerCase().includes(searchTerm.toLowerCase()),
		);

		// 검색 결과에서 이미 친구가 아닌 사용자만 표시
		const filteredSearchResults = onSendFriendRequest
			? searchResults.filter((user) => !user.isFriend)
			: [];

		// 친구 요청 보내기
		const handleSendFriendRequest = async (user: Friend) => {
			try {
				await friendAPI.sendFriendRequest(user.id);
				onSendFriendRequest?.(user);
				refreshFriends(); // 요청 후 목록 새로고침
			} catch (error) {
				console.error("친구 요청 보내기 실패:", error);
			}
		};

		// 친구 요청 수락
		const handleAcceptRequest = async (friend: Friend) => {
			if (!friend.requestId) return;

			try {
				await friendAPI.acceptFriendRequest(friend.requestId);
				setIsRequestModalOpen(false);
				setSelectedRequest(null);
				refreshFriends();
			} catch (error) {
				console.error("친구 요청 수락 실패:", error);
			}
		};

		// 친구 요청 거절
		const handleRejectRequest = async (friend: Friend) => {
			if (!friend.requestId) return;

			try {
				await friendAPI.rejectFriendRequest(friend.requestId);
				setIsRequestModalOpen(false);
				setSelectedRequest(null);
				refreshFriends();
			} catch (error) {
				console.error("친구 요청 거절 실패:", error);
			}
		};

		// 친구 요청 받은 사람 클릭 핸들러
		const handleRequestReceived = (friend: Friend) => {
			setSelectedRequest(friend);
			setIsRequestModalOpen(true);
		};

		// 친구 삭제
		const handleDeleteFriend = (friend: Friend) => {
			onDeleteFriend?.(friend);
		};

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
							transition={{ type: "spring", damping: 40, stiffness: 300 }}
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
								<p className="font-bold">
									{filteredFriends.filter((f) => f.isFriend).length}명
								</p>
							</span>

							{/* 친구 목록 */}
							{((searchTerm === "" && filteredFriends.length > 0) ||
								(searchTerm !== "" &&
									(filteredFriends.length > 0 ||
										filteredSearchResults.length > 0))) && (
								<div
									className="w-full px-6 overflow-y-auto select-friends-scroll"
									style={{ fontFamily: "NexonLv1Gothic" }}
								>
									<div className="overflow-y-auto">
										{/* 내 친구 + 요청 중인 사람들 */}
										{filteredFriends.map((friend, index) => (
											<div
												key={`friend-${friend.id}`}
												className={`flex items-center justify-between py-5 ${(searchTerm !== "" && filteredSearchResults.length > 0) || index !== filteredFriends.length - 1 ? "border-b border-gray/20" : ""}`}
											>
												<span className="flex flex-col">
													<p className="font-bold text-start">{friend.name}</p>
													<p>{friend.email}</p>
												</span>

												{/* 친구인 경우 */}
												{friend.isFriend && (
													<>
														{onDeleteFriend && (
															<button
																onClick={() => handleDeleteFriend(friend)}
																className="px-7 py-3 bg-gray/20 text-dark-gray rounded-[30px] hover:bg-gray/40 transition-colors duration-100"
																style={{ fontFamily: "NexonLv1Gothic" }}
															>
																삭제
															</button>
														)}
														{onSelectFriend && (
															<button
																onClick={() => onSelectFriend(friend)}
																className="px-7 py-3 bg-primary text-white rounded-[30px]"
																style={{ fontFamily: "NexonLv1Gothic" }}
															>
																선택
															</button>
														)}
													</>
												)}

												{/* 요청 보낸 경우 */}
												{friend.requestStatus === "sent" && (
													<button
														disabled
														className="px-5 py-2 bg-white text-primary border-3 border-primary cursor-not-allowed rounded-[30px]"
														style={{ fontFamily: "NexonLv1Gothic" }}
													>
														요청중
													</button>
												)}

												{/* 요청 받은 경우 */}
												{friend.requestStatus === "received" && (
													<button
														onClick={() => handleRequestReceived(friend)}
														className="px-5 py-2 bg-white text-primary border-3 border-primary rounded-[30px]"
														style={{ fontFamily: "NexonLv1Gothic" }}
													>
														요청받음
													</button>
												)}
											</div>
										))}

										{/* 검색 결과 (친구가 아닌 사용자들) */}
										{searchTerm !== "" &&
											filteredSearchResults.map((user, index) => (
												<div
													key={`user-${user.id}`}
													className={`flex items-center justify-between py-5 ${index !== filteredSearchResults.length - 1 ? "border-b border-gray/20" : ""}`}
												>
													<span className="flex flex-col">
														<p className="font-bold">{user.name}</p>
														<p>{user.email}</p>
													</span>
													{onSendFriendRequest && (
														<button
															onClick={() => handleSendFriendRequest(user)}
															className="px-7 py-3 bg-primary text-white rounded-[30px] hover:bg-primary/90"
															style={{ fontFamily: "NexonLv1Gothic" }}
														>
															친구요청
														</button>
													)}
												</div>
											))}
									</div>
								</div>
							)}

							{/* 검색 결과 없음 */}
							{searchTerm !== "" &&
								filteredFriends.length === 0 &&
								filteredSearchResults.length === 0 &&
								!loading && (
									<div
										className="text-center text-dark-gray text-lg mt-10"
										style={{ fontFamily: "NexonLv1Gothic" }}
									>
										검색 결과가 없습니다.
									</div>
								)}

							{/* 로딩 상태 */}
							{loading && (
								<div
									className="text-center text-dark-gray text-lg mt-10"
									style={{ fontFamily: "NexonLv1Gothic" }}
								>
									검색 중...
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

				{/* 친구 요청 수락/거절 모달 */}
				<AnimatePresence>
					{isRequestModalOpen && selectedRequest && (
						<motion.div
							className="fixed inset-0 z-[80] flex items-center justify-center"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={(e) => {
								if (e.target === e.currentTarget) {
									setIsRequestModalOpen(false);
									setSelectedRequest(null);
								}
							}}
						>
							<motion.div
								className="bg-white rounded-3xl min-w-[280px] px-8 py-6 shadow-lg"
								style={{
									boxShadow: "2.351px 3.135px 15.519px 0 rgba(0,0,0,0.25)",
									fontFamily: "NexonLv1Gothic",
								}}
								initial={{ scale: 0.7, opacity: 0 }}
								animate={{ scale: 1, opacity: 1 }}
								exit={{ scale: 0.7, opacity: 0 }}
								transition={{ type: "spring", damping: 25, stiffness: 300 }}
								onClick={(e) => e.stopPropagation()}
							>
								<p className="text-black text-lg text-center whitespace-pre-line">
									{selectedRequest.name}님의 친구요청을
									<br />
									수락하시겠습니까?
								</p>
								<div className="flex justify-center gap-4 mt-4">
									<button
										onClick={() => handleAcceptRequest(selectedRequest)}
										className="flex-1 py-4.5 text-white bg-primary rounded-full hover:bg-primary/90 transition-colors cursor-pointer"
									>
										수락
									</button>
									<button
										onClick={() => handleRejectRequest(selectedRequest)}
										className="flex-1 py-4.5 text-dark-gray bg-gray/20 rounded-full hover:bg-gray/30 transition-colors cursor-pointer"
									>
										거절
									</button>
								</div>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>
			</AnimatePresence>
		);
	},
);

FriendsListModal.displayName = "FriendsListModal";

export default FriendsListModal;
