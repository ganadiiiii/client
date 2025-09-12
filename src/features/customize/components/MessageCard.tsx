import React, { useRef } from "react";

import cardBg from "../../../assets/generate/result/card-message.png";
import type { FlowerCard } from "../../../types/FlowerCard";

type MessageCardProps = {
	flowerCard: FlowerCard;
	onMessageChange: (message: string) => void;
};

const MessageCard: React.FC<MessageCardProps> = ({
	flowerCard,
	onMessageChange,
}) => {
	const { message, sender, receiver } = flowerCard;
	const ref = useRef<HTMLDivElement>(null);

	return (
		<div ref={ref} className="w-[24em] h-[37.0625em]">
			<div
				className="relative w-full h-full rounded-5xl"
				style={{
					backgroundImage: `url(${cardBg})`,
					backgroundRepeat: "no-repeat",
					backgroundSize: "100% 100%",
					backgroundPosition: "center",
				}}
			>
				<div>
					{/* Message title */}
					<div
						className="absolute left-[2.8em] top-[3em] text-black z-20 text-sm"
						style={{
							fontFamily: "Yidstreet",
						}}
					>
						Message
					</div>

					{/* Message input area */}
					<div className="absolute left-[2.5em] top-[5em] right-[2.5em] bottom-[7.5em] text-black">
						<textarea
							value={message || ""}
							onChange={(e) => onMessageChange(e.target.value)}
							placeholder="전하고 싶은 말을 입력해주세요"
							className="w-full h-full p-4 text-sm/7.5 focus:outline-none resize-none bg-transparent border-none"
							style={{
								fontFamily: "NexonLv1Gothic",
							}}
						/>
					</div>

					{/* To & From at bottom */}
					<div className="absolute left-[2.7em] bottom-[3.4em] flex flex-row gap-20 text-black text-sm">
						<div className="flex gap-3 items-baseline">
							<span
								style={{
									fontFamily: "Yidstreet",
									fontWeight: "600",
								}}
							>
								To
							</span>
							<span
								style={{
									fontFamily: "NexonLv1Gothic",
									fontWeight: "400",
								}}
							>
								{receiver}
							</span>
						</div>
						<div className="flex gap-3 items-baseline">
							<span
								style={{
									fontFamily: "Yidstreet",
									fontWeight: "600",
								}}
							>
								From
							</span>
							<span
								style={{
									fontFamily: "NexonLv1Gothic",
									fontWeight: "400",
								}}
							>
								{sender}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MessageCard;
