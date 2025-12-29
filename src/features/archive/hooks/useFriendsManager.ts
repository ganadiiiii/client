import { useCallback, useEffect, useMemo, useState } from "react";
import { demoFriends, allDemoUsers } from "../../../demo/user";

export type RequestStatus = "sent" | "received" | "none";

export interface Friend {
	id: string;
	name: string;
	email: string;
	isFriend: boolean;
	status: string;
	profileImage: string;
	requestStatus?: RequestStatus;
	requestId?: number;
}

export interface FriendRequest {
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

export function useFriendsManager() {
	const [searchTerm, setSearchTerm] = useState("");
	const [friends, setFriends] = useState<Friend[]>([]);
	const [searchResults, setSearchResults] = useState<Friend[]>([]);
	const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(false);
	const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
	const [selectedRequest, setSelectedRequest] = useState<Friend | null>(null);


	const getCurrentUser = useCallback(async () => {
		// 데모용 현재 유저
		const demoCurrentUser: User = {
			userId: "current-user",
			email: "me@example.com",
			firstName: "현재",
			lastName: "유저",
		};
		setCurrentUser(demoCurrentUser);
		return demoCurrentUser;
	}, []);

	const getFriends = useCallback(async () => {
		// 데모용 친구 목록 반환
		return demoFriends.map(friend => ({
			...friend,
			requestStatus: "none" as RequestStatus,
		}));
	}, []);

	const getFriendRequests = useCallback(async () => {
		// 데모용: 빈 요청 목록 반환
		return { requestUsers: [] as Friend[], requests: [] as FriendRequest[] };
	}, []);

	const refreshFriends = useCallback(async () => {
		await getCurrentUser();
		const [friendList, { requestUsers, requests }] = await Promise.all([
			getFriends(),
			getFriendRequests(),
		]);


		// 친구 목록을 먼저 설정 (getFriends() API 결과를 우선시)
		const idToFriend = new Map(friendList.map((f) => [f.id, f] as const));
		
		// PENDING 상태의 요청만 추가 (ACCEPTED는 getFriends()에서 처리)
		requestUsers.forEach((reqUser) => {
			if (!idToFriend.has(reqUser.id)) {
				// 친구가 아닌 경우, 요청 상태와 함께 추가
				if (reqUser.requestStatus) {
					idToFriend.set(reqUser.id, {
						...reqUser,
						requestStatus: reqUser.requestStatus
					});
				}
			} else {
				// 이미 친구인 경우, PENDING 요청 상태만 업데이트
				const existingFriend = idToFriend.get(reqUser.id)!;
				if (reqUser.requestStatus && reqUser.requestStatus !== "none") {
					idToFriend.set(reqUser.id, {
						...existingFriend,
						requestStatus: reqUser.requestStatus,
						requestId: reqUser.requestId,
					});
				}
			}
		});
		
		const finalFriends = Array.from(idToFriend.values());
		setFriends(finalFriends);
		setFriendRequests(requests);
	}, [getCurrentUser, getFriends, getFriendRequests]);

	const mapSearchWithStatuses = useCallback(
		(results: Friend[]) => {
			if (results.length === 0) return results;
			const idToFriend = new Map(friends.map((f) => [f.id, f] as const));
			return results.map((user) => {
				const inFriends = idToFriend.get(user.id);
				if (inFriends) {
					return {
						...user,
						isFriend: inFriends.isFriend,
						requestStatus: inFriends.requestStatus ?? "none",
						requestId: inFriends.requestId,
					};
				}
				return user;
			});
		},
		[friends],
	);

	const searchUsers = useCallback(
		async (term: string) => {
			if (!term.trim()) {
				setSearchResults([]);
				return;
			}
			setLoading(true);
			
			// 데모용: 로딩 시뮬레이션
			await new Promise(resolve => setTimeout(resolve, 500));
			
			try {
				// 데모용: 전체 유저에서 검색
				const searchData: Friend[] = allDemoUsers.filter(user => 
					user.name.toLowerCase().includes(term.toLowerCase()) ||
					user.email.toLowerCase().includes(term.toLowerCase())
				).map(user => ({
					...user,
					requestStatus: "none" as RequestStatus,
				}));
				
				setSearchResults(mapSearchWithStatuses(searchData));
			} catch {
				setSearchResults([]);
			} finally {
				setLoading(false);
			}
		},
		[mapSearchWithStatuses],
	);

	const handleSendFriendRequest = useCallback(
		async (user: Friend, onSuccess?: (user: Friend) => void) => {
			// 데모용: 친구 요청 시뮬레이션
			console.log("데모: 친구 요청 전송 -", user.name);
			
			const updateToSent = (u: Friend): Friend => ({
				...u,
				isFriend: false,
				requestStatus: "sent",
			});

			setFriends((prev) => {
				const exists = prev.some((f) => f.id === user.id);
				if (exists) {
					return prev.map((f) => (f.id === user.id ? updateToSent(f) : f));
				}
				return [...prev, updateToSent(user)];
			});

			setSearchResults((prev) => {
				const seen = new Set<string>();
				const updated = prev.map((u) => {
					if (u.id === user.id) {
						seen.add(u.id);
						return updateToSent(u);
					}
					return u;
				});
				if (!seen.has(user.id)) {
					updated.push(updateToSent(user));
				}
				const uniqueById = new Map(updated.map((u) => [u.id, u] as const));
				return Array.from(uniqueById.values());
			});

			// 데모용: 항상 성공
			onSuccess?.(user);
		},
		[],
	);

	const handleAcceptRequest = useCallback(
		async (friend: Friend) => {
			// 데모용: 친구 요청 수락 시뮬레이션
			console.log("데모: 친구 요청 수락 -", friend.name);
			setIsRequestModalOpen(false);
			setSelectedRequest(null);
			await refreshFriends();
		},
		[refreshFriends],
	);

	const handleRejectRequest = useCallback(
		async (friend: Friend) => {
			// 데모용: 친구 요청 거절 시뮬레이션
			console.log("데모: 친구 요청 거절 -", friend.name);
			setIsRequestModalOpen(false);
			setSelectedRequest(null);
			await refreshFriends();
		},
		[refreshFriends],
	);

	const handleRequestReceived = useCallback((friend: Friend) => {
		setSelectedRequest(friend);
		setIsRequestModalOpen(true);
	}, []);

	// debounce search
	useEffect(() => {
		const id = setTimeout(() => {
			searchUsers(searchTerm);
		}, 300);
		return () => clearTimeout(id);
	}, [searchTerm, searchUsers]);

	const filteredFriends = useMemo(
		() =>
			friends.filter(
				(friend) =>
					friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
					friend.email.toLowerCase().includes(searchTerm.toLowerCase()),
			),
		[friends, searchTerm],
	);

	const filteredSearchResults = useMemo(() => {
		const friendIds = new Set(friends.map((f) => f.id));
		return searchResults.filter((user) => !user.isFriend && !friendIds.has(user.id));
	}, [searchResults, friends]);

	return {
		// state
		searchTerm,
		setSearchTerm,
		friends,
		setFriends,
		searchResults,
		loading,
		isRequestModalOpen,
		setIsRequestModalOpen,
		selectedRequest,
		setSelectedRequest,
		friendRequests,
		currentUser,
		// derived
		filteredFriends,
		filteredSearchResults,
		// actions
		refreshFriends,
		searchUsers,
		handleSendFriendRequest,
		handleAcceptRequest,
		handleRejectRequest,
		handleRequestReceived,
	} as const;
}
