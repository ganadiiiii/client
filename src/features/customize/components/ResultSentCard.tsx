import type { SpringOptions } from "framer-motion";
import { motion, useSpring } from "framer-motion";
import React, { useCallback, useRef, useState } from "react";
import messageCardBg from "../../../assets/generate/result/card-message.png";
import type { FlowerCard } from "../../../types/FlowerCard";
import ResultCard from "./ResultCard";

type ResultSentCardProps = {
	flowerCard: FlowerCard;
};

// Hover tilt spring config
const springConfig: SpringOptions = {
	stiffness: 150,
	damping: 20,
};

// Tilt intensity
const ROTATE_AMPLITUDE = 8;

const ResultSentCard: React.FC<ResultSentCardProps> = ({ flowerCard }) => {
	const ref = useRef<HTMLDivElement>(null);
	const [isFlipped, setIsFlipped] = useState(false);

	// Springs for hover tilt
	const rotateX = useSpring(0, springConfig);
	const rotateY = useSpring(0, springConfig);
	const scale = useSpring(1, springConfig);

	const handleFlip = useCallback(() => {
		setIsFlipped((v) => !v);
	}, []);

	const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
		if (!ref.current) return;
		const rect = ref.current.getBoundingClientRect();
		const offsetX = e.clientX - rect.left - rect.width / 2;
		const offsetY = e.clientY - rect.top - rect.height / 2;
		const rotationX = (offsetY / (rect.height / 2)) * -ROTATE_AMPLITUDE;
		const rotationY = (offsetX / (rect.width / 2)) * ROTATE_AMPLITUDE;
		rotateX.set(rotationX);
		rotateY.set(rotationY);
	}, []);

	const handleMouseLeave = useCallback(() => {
		rotateX.set(0);
		rotateY.set(0);
	}, [rotateX, rotateY]);

	return (
		<div
			ref={ref}
			className="w-[24em] h-[37.0625em]"
			style={{ perspective: "1500px" }}
		>
			{/* Tilt layer wrapping both faces */}
			<motion.div
				className="relative w-full h-full"
				style={{ rotateX, rotateY, scale }}
				onMouseMove={handleMouseMove}
				onMouseLeave={handleMouseLeave}
			>
				{/* Flip layer */}
				<motion.div
					className="relative w-full h-full"
					style={{
						transformStyle:
							"preserve-3d" as React.CSSProperties["transformStyle"],
					}}
					animate={{ rotateY: isFlipped ? 180 : 0 }}
					transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
				>
					{/* Front: ResultCard */}
					<div
						className="absolute inset-0 cursor-pointer"
						style={{
							backfaceVisibility:
								"hidden" as React.CSSProperties["backfaceVisibility"],
						}}
						onClick={handleFlip}
					>
						<ResultCard flowerCard={flowerCard} />
					</div>

					{/* Back: MessageCard */}
					<div
						className="absolute inset-0 cursor-pointer"
						style={{
							backfaceVisibility:
								"hidden" as React.CSSProperties["backfaceVisibility"],
							transform: "rotateY(180deg)",
						}}
						onClick={handleFlip}
					>
						<div className="w-[24em] h-[37.0625em]">
							<div
								className="relative w-full h-full rounded-5xl"
								style={{
									backgroundImage: `url(${messageCardBg})`,
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
										<p
											className="w-full h-full p-4 text-sm/7.5 focus:outline-none resize-none bg-transparent border-none text-dark-gray"
											style={{
												fontFamily: "NexonLv1Gothic",
											}}
										>
											{flowerCard.message}
										</p>
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
												{flowerCard.receiver}
											</span>
										</div>
										<div className="flex gap-3 items-baseline text-sm">
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
												{flowerCard.sender}
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default ResultSentCard;
