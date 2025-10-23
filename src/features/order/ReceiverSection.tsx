import { forwardRef, useImperativeHandle, useState } from "react";
import FriendsListModal from "../archive/components/FriendsListModal";
import iconFullSvg from "../../assets/icon-full.svg";
import iconCheckSvg from "../../assets/icon-check.svg";

interface Friend {
	id: string;
	name: string;
	email: string;
	isFriend: boolean;
}

interface ReceiverSectionRef {
	isValid: () => boolean;
}

export const ReceiverSection = forwardRef<ReceiverSectionRef>((_, ref) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
	const [phone, setPhone] = useState("");

	// 전화번호 자동 하이픈 추가
	const formatPhoneNumber = (value: string) => {
		const onlyNums = value.replace(/[^0-9]/g, "");
		if (onlyNums.length <= 3) return onlyNums;
		if (onlyNums.length <= 7)
			return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
		return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(7, 11)}`;
	};

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPhone(formatPhoneNumber(e.target.value));
	};

	const handleFriendSelect = (friend: Friend) => {
		setSelectedFriend(friend);
		setIsModalOpen(false);
	};

	useImperativeHandle(ref, () => ({
		isValid: () => selectedFriend !== null && phone.length > 0,
	}));

	// Validation check
	// useEffect(() => {
	// 	const isValid = selectedFriend !== null && phone.length > 0;
	// 	onValidationChange(isValid);
	// }, [selectedFriend, phone, onValidationChange]);

	return (
		<section
			className="bg-transparent"
			style={{
				width: "42.4375em",
				height: "18em",
			}}
		>
			<h2
				className="w-full text-start text-2xl font-bold text-black mb-2.5"
				style={{ fontFamily: "NexonLv1Gothic" }}
			>
				받는 사람
			</h2>
			<div
				className="p-9 rounded-[1.25em] bg-white w-full"
				style={{ boxShadow: "2px 2px 21.3px 0 rgba(0, 0, 0, 0.08)" }}
			>
				{/* 이름 선택 */}
				<div className="mb-6">
					<div className="flex items-center gap-2">
						<p
							className="text-black/60 text-base font-light"
							style={{ fontFamily: "NexonLv1Gothic" }}
						>
							이름
						</p>
						<img
							src={
								selectedFriend
									? iconFullSvg
									: iconCheckSvg
							}
							alt="check"
							className="w-5 h-5"
						/>
					</div>
					<div className="block flex items-center gap-4 py-2">
						<h2
							className="text-xl font-bold text-black"
							style={{ fontFamily: "NexonLv1Gothic" }}
						>
							{selectedFriend
								? selectedFriend.name
								: "받는 사람을 선택해 주세요"}
						</h2>
						{selectedFriend && (
							<span
								className="text-black text-lg font-light"
								style={{ fontFamily: "NexonLv1Gothic" }}
							>
								{selectedFriend.email}
							</span>
						)}
						<button
							onClick={() => setIsModalOpen(true)}
							className="bg-gray/20 text-base text-black/60 px-3 py-1 rounded-full"
						>
							{selectedFriend ? "변경" : "선택"}
						</button>
					</div>
				</div>

				{/* 연락처 */}
				<div className="flex flex-col">
					<div className="flex items-center gap-2">
						<p
							className="text-black/60 text-base font-light"
							style={{ fontFamily: "NexonLv1Gothic" }}
						>
							연락처
						</p>
						<img
							src={
								phone
									? iconFullSvg
									: iconCheckSvg
							}
							className="w-5 h-5"
							alt="check"
						/>
					</div>
					<div className="block flex items-start">
						<input
							type="text"
							placeholder="연락처를 입력해주세요"
							value={phone}
							onChange={handlePhoneChange}
							className="w-[23em] h-[2.6em] px-5 mt-2.5 rounded-full bg-gray/10 border border-gray/40 text-black/80 focus:outline-none"
							style={{ fontFamily: "NexonLv1Gothic" }}
						/>
					</div>
				</div>

				{/* 친구 선택 모달 */}
				<FriendsListModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					onSelectFriend={handleFriendSelect}
				/>
			</div>
		</section>
	);
});
