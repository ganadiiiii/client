import React from "react";
import type { Friend } from "../hooks/useFriendsManager";

interface FriendListItemProps {
	friend: Friend;
	onDeleteFriend?: (friend: Friend) => void;
	onSelectFriend?: (friend: Friend) => void;
	onRequestClick?: (friend: Friend) => void;
	onRequestReceived?: (friend: Friend) => void;
}

const FriendListItem: React.FC<FriendListItemProps> = ({
	friend,
	onDeleteFriend,
	onSelectFriend,
	onRequestClick,
	onRequestReceived,
}) => {
	return (
		<div className="flex items-center justify-between py-5">
			<span className="flex flex-col">
				<p className="font-bold text-start">{friend.name}</p>
				<p>{friend.email}</p>
			</span>

			{friend.isFriend && (!friend.requestStatus || friend.requestStatus === "none") && (
				<>
					{onDeleteFriend && (
						<button
							onClick={() => onDeleteFriend(friend)}
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

			{friend.requestStatus === "sent" && (
				<button
					disabled
					className="px-5 py-2 bg-white text-primary border-3 border-primary cursor-not-allowed rounded-[30px]"
					style={{ fontFamily: "NexonLv1Gothic" }}
				>
					요청중
				</button>
			)}

			{friend.requestStatus === "received" && (
				<button
					onClick={() => onRequestReceived?.(friend)}
					className="px-5 py-2 bg-white text-primary border-3 border-primary rounded-[30px]"
					style={{ fontFamily: "NexonLv1Gothic" }}
				>
					요청받음
				</button>
			)}

			{!friend.isFriend &&
				(!friend.requestStatus || friend.requestStatus === "none") && (
					<button
						onClick={() => onRequestClick?.(friend)}
						className="px-7 py-3 bg-primary text-white rounded-[30px] hover:bg-primary/90"
						style={{ fontFamily: "NexonLv1Gothic" }}
					>
						친구요청
					</button>
				)}
		</div>
	);
};

export default FriendListItem;
