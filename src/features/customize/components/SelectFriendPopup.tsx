import iconClose from "../../../assets/generate/result/icon-close.svg";
import type { Friend, UIState } from "../../../types/FlowerCard";
import SimpleIconButton from "../../../components/button/SimpleIconButton";

interface SelectFriendPopupProps {
	mockFriends: Friend[];
	onFriendSelect: (friend: Friend) => void;
	updateUIState: (updates: Partial<UIState>) => void;
}

export default function SelectFriendPopup({
	mockFriends,
	onFriendSelect,
	updateUIState,
}: SelectFriendPopupProps) {
	return (
		<div className="w-full flex justify-center">
			{/* Wrapper keeps box centered; button is positioned next to it */}
			<div className="relative w-161">
				<div
					className="bg-white rounded-[2.25em] p-12 w-161 h-204 overflow-hidden flex flex-col"
					style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)" }}
				>
					<h2
						className="text-3xl font-bold text-gray mb-4 text-center shrink-0"
						style={{ fontFamily: "NexonLv1Gothic" }}
					>
						친구 목록
					</h2>
					<span
						className="flex flex-row gap-1 mb-2 text-gray"
						style={{ fontFamily: "NexonLv1Gothic" }}
					>
						<p>내 친구</p>
						<p className="font-bold">{mockFriends.length}명</p>
					</span>
					<div className="overflow-y-auto flex-1 pr-1 select-friends-scroll">
						{mockFriends.map((friend) => (
							<button
								key={friend.id}
								onClick={() => onFriendSelect(friend)}
								className="w-full p-6 text-left rounded-[1.5em] hover:bg-gray/20 transition-colors"
								style={{ fontFamily: "NexonLv1Gothic" }}
							>
								<span className="flex flex-col">
									<p className="font-bold">{friend.name}</p>
									<p>{friend.email}</p>
								</span>
							</button>
						))}
					</div>
				</div>

				<SimpleIconButton
					onClick={() => updateUIState({ showFriendsDialog: false })}
					icon={iconClose}
					className="absolute -right-20 top-0"
				/>
			</div>

			{/* Scoped scrollbar styling for this popup only */}
			<style>
				{`
				.select-friends-scroll::-webkit-scrollbar { background: transparent; }
				.select-friends-scroll::-webkit-scrollbar-track { background: transparent; }
				.select-friends-scroll::-webkit-scrollbar-corner { background: transparent; }
				/* Firefox */
				.select-friends-scroll { scrollbar-color: #a3a3a3 transparent; }
				`}
			</style>
		</div>
	);
}
