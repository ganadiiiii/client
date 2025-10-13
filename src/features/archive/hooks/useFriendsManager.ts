import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { authAPI, friendAPI } from "../../../api";

export type RequestStatus = "sent" | "received" | "none";

export interface Friend {
	id: string;
	name: string;
	email: string;
	isFriend: boolean;
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

	const previousFriendsRef = useRef<Friend[] | null>(null);
	const previousSearchResultsRef = useRef<Friend[] | null>(null);

	const getCurrentUser = useCallback(async () => {
		const response = await authAPI.me();
		setCurrentUser(response);
		return response as User;
	}, []);

	const getFriends = useCallback(async () => {
		const response = await friendAPI.getFriends();
		const friendsData: Friend[] = (response.items || []).map(
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
				requestStatus: "none",
			}),
		);
		return friendsData;
	}, []);

	const getFriendRequests = useCallback(async (user: User | null) => {
		if (!user)
			return { requestUsers: [] as Friend[], requests: [] as FriendRequest[] };
		const response = await friendAPI.getFriendsRequest("all");
		const requests: FriendRequest[] = response.items || [];

		const idToRequestUser = new Map<string, Friend>();
		requests.forEach((request: FriendRequest) => {
			if (request.status === "PENDING") {
				const isReceived = request.receiver.userId === user.userId;
				const userInfo = isReceived ? request.sender : request.receiver;
				const existing = idToRequestUser.get(userInfo.userId);
				const candidate: Friend = {
					id: userInfo.userId,
					name: `${userInfo.firstName} ${userInfo.lastName}`.trim(),
					email: userInfo.email,
					isFriend: false,
					requestStatus: isReceived ? "received" : "sent",
					requestId: request.requestId,
				};
				if (!existing || (existing.requestStatus === "sent" && candidate.requestStatus === "received")) {
					idToRequestUser.set(userInfo.userId, candidate);
				}
			}
		});

		const requestUsers = Array.from(idToRequestUser.values());
		return { requestUsers, requests };
	}, []);

	const refreshFriends = useCallback(async () => {
		const user = await getCurrentUser();
		const [friendList, { requestUsers, requests }] = await Promise.all([
			getFriends(),
			getFriendRequests(user),
		]);


		const idToFriend = new Map(friendList.map((f) => [f.id, f] as const));
		requestUsers.forEach((reqUser) => {
			if (!idToFriend.has(reqUser.id)) {
				idToFriend.set(reqUser.id, reqUser);
			}
		});
		setFriends(Array.from(idToFriend.values()));
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
			try {
				const response = await friendAPI.search(term);
				const searchData: Friend[] = (response.items || []).map(
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
						requestStatus: "none",
					}),
				);
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
			// Optimistic update
			previousFriendsRef.current = friends;
			previousSearchResultsRef.current = searchResults;

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

			try {
				await friendAPI.sendFriendRequest(user.id);
				onSuccess?.(user);
				// refresh to get requestId
				await refreshFriends();
			} catch {
				// revert on failure
				if (previousFriendsRef.current) setFriends(previousFriendsRef.current);
				if (previousSearchResultsRef.current)
					setSearchResults(previousSearchResultsRef.current);
			}
		},
		[friends, searchResults, refreshFriends],
	);

	const handleAcceptRequest = useCallback(
		async (friend: Friend) => {
			if (!friend.requestId) return;
			try {
				await friendAPI.acceptFriendRequest(friend.requestId);
				setIsRequestModalOpen(false);
				setSelectedRequest(null);
				await refreshFriends();
			} catch {
				// no-op; modal state remains until next refresh
			}
		},
		[refreshFriends],
	);

	const handleRejectRequest = useCallback(
		async (friend: Friend) => {
			if (!friend.requestId) return;
			try {
				await friendAPI.rejectFriendRequest(friend.requestId);
				setIsRequestModalOpen(false);
				setSelectedRequest(null);
				await refreshFriends();
			} catch {
				// no-op; modal state remains until next refresh
			}
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
