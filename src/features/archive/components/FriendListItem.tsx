import React from "react";
import type { Friend } from "../hooks/useFriendsManager";
import iconHome from "../../../assets/archive/icon-friend-home.svg";
import iconTrash from "../../../assets/archive/icon-trash.svg";
interface FriendListItemProps {
	friend: Friend;
	onDeleteFriend?: (friend: Friend) => void;
	onSelectFriend?: (friend: Friend) => void;
	onRequestClick?: (friend: Friend) => void;
	onRequestReceived?: (friend: Friend) => void;
	onVisitFriend?: (friend: Friend) => void;
}

const FriendListItem: React.FC<FriendListItemProps> = ({
	friend,
	onDeleteFriend,
	onSelectFriend,
	onRequestClick,
	onRequestReceived,
	onVisitFriend,
}) => {
	return (
		<div className="flex items-center justify-between py-5">
			<div className="flex flex-row items-center justify-between w-full gap-5">
				<span className="flex flex-col">
					<p className="font-bold text-start">{friend.name}</p>
					<p>{friend.email}</p>
				</span>
				<button
					className="w-11 h-11 rounded-lg bg-gray/20 p-2 cursor-pointer hover:bg-gray/40 transition-all duration-200 mr-2"
					onClick={() => onVisitFriend?.(friend)}
				>
					<img src={iconHome} alt="visit" className="w-full h-full cursor-pointer" />
				</button>
			</div>

			{friend.isFriend && (!friend.requestStatus || friend.requestStatus === "none") && (
				<>
					{onDeleteFriend && (
						<button
							className="w-11 h-11 rounded-lg bg-gray/20 p-2 cursor-pointer hover:bg-gray/40 transition-all duration-200"
							onClick={() => onDeleteFriend(friend)}
						>
							<img src={iconTrash} alt="delete" className="w-full h-full cursor-pointer" />
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
					className="px-5 py-2 bg-white text-primary border-3 border-primary cursor-not-allowed rounded-xl text-nowrap font-semibold"
					style={{ fontFamily: "NexonLv1Gothic" }}
				>
					요청중
				</button>
			)}

			{friend.requestStatus === "received" && (
				<button
					onClick={() => onRequestReceived?.(friend)}
					className="px-5 py-2 bg-white text-primary border-3 border-primary rounded-xl text-nowrap font-semibold"
					style={{ fontFamily: "NexonLv1Gothic" }}
				>
					요청받기
				</button>
			)}

			{!friend.isFriend &&
				(!friend.requestStatus || friend.requestStatus === "none") && 
					<button
						onClick={() => onRequestClick?.(friend)}
						className="px-7 py-3 bg-primary text-white rounded-[30px] hover:bg-primary/90 text-nowrap"
						style={{ fontFamily: "NexonLv1Gothic" }}
					>
						친구요청
					</button>
				}
		</div>
	);
};

export default FriendListItem;
