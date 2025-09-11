import React, { useState } from "react";
import iconBack from "../../../assets/generate/result/icon-back.svg";
import iconSend from "../../../assets/generate/result/icon-send.svg";
import iconSendHover from "../../../assets/generate/result/icon-send-hover.svg";
import ConfirmDialog from "../../../components/ConfirmDialog";
import type { FlowerCard } from "../../../types/FlowerCard";
import GradientIconButton from "../components/GradientIconButton";
import MessageCard from "../components/MessageCard";
import SimpleIconButton from "../components/SimpleIconButton";

interface MessageSectionProps {
	flowerCard: FlowerCard;
	onMessageChange: (message: string) => void;
	onBack: () => void;
	onSend: () => void;
}

const MessageSection: React.FC<MessageSectionProps> = ({
	flowerCard,
	onMessageChange,
	onBack,
	onSend,
}) => {
	const [showConfirm, setShowConfirm] = useState(false);
	return (
		<div className="flex flex-col items-center transition-all duration-300">
			{/* 제목 */}
			<h1
				className="text-[27.5px] font-bold text-gray mb-6 z-40 mt-20"
				style={{ fontFamily: "NexonLv1Gothic" }}
			>
				카드 작성
			</h1>

			{/* Message Card with interactive inputs */}
			<div className="relative inline-block">
				<SimpleIconButton
					onClick={() => onBack()}
					icon={iconBack}
					label="뒤로가기"
					className="absolute left-[-100px] top-[10px]"
				/>
				<MessageCard
					flowerCard={flowerCard}
					onMessageChange={onMessageChange}
				/>
				<div className="mt-4 flex justify-center">
					<GradientIconButton
						onClick={() => setShowConfirm(true)}
						icon={iconSend}
						hoverIcon={iconSendHover}
						label="보내기"
						disabled={!flowerCard.message?.trim() || !flowerCard.sender?.trim()}
					/>
				</div>
			</div>

			<ConfirmDialog
				isVisible={showConfirm}
				text={`${flowerCard.title}을\n${flowerCard.receiver}님에게 보내시겠습니까?`}
				confirmText="보내기"
				cancelText="취소"
				onConfirm={() => {
					onSend();
					setShowConfirm(false);
				}}
				onClose={() => setShowConfirm(false)}
			/>
		</div>
	);
};

export default MessageSection;
