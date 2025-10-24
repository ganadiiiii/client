import React from "react";
import type { FlowerCard } from "../../../types/FlowerCard";
import ResultCard from "../../customize/components/ResultCard";
import messageCardBg from "../../../assets/generate/result/card-message.png";

type AnimatedFlowerCardProps = {
	flowerCard: FlowerCard;
	onClick?: () => void;
};

const AnimatedFlowerCard: React.FC<AnimatedFlowerCardProps> = ({ flowerCard, onClick }) => {
	return (
		<div
			className="relative w-[28em] h-[43.24em] cursor-pointer"
			style={{
				transformStyle: "preserve-3d" as React.CSSProperties["transformStyle"],
			}}
			onClick={onClick}
		>
			{/* Front: ResultCard */}
			<div
				className="absolute inset-0 w-full h-full overflow-hidden rounded-5xl bg-transparent"
				style={{
					backfaceVisibility: "hidden" as React.CSSProperties["backfaceVisibility"],
					WebkitBackfaceVisibility: "hidden",
					transform: "rotateY(0deg)",
				}}
			>
				<div style={{
					transform: "scale(1.1667)",
					transformOrigin: "center center",
					width: "24em",
					height: "37.0625em",
					position: "absolute",
					top: "50%",
					left: "50%",
					marginLeft: "-12em",
					marginTop: "-18.53125em",
				}}>
					<ResultCard flowerCard={flowerCard} />
				</div>
			</div>

			{/* Back: MessageCard */}
			<div
				className="absolute inset-0 w-full h-full overflow-hidden rounded-5xl bg-transparent"
				style={{
					backfaceVisibility:
						"hidden" as React.CSSProperties["backfaceVisibility"],
					transform: "rotateY(180deg)",
				}}
			>
				<div className="w-[24em] h-[37.0625em]">
					<div
						className="relative w-full h-full rounded-5xl"
						style={{
							backgroundImage: `url(${messageCardBg})`,
							backgroundRepeat: "no-repeat",
							backgroundSize: "100% 100%",
							backgroundPosition: "center",
							transform: "scale(1.1667)",
							transformOrigin: "center center",
							width: "24em",
							height: "37.0625em",
							position: "absolute",
							top: "50%",
							left: "50%",
							marginLeft: "-12em",
							marginTop: "-18.53125em",
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
							{/* To & From at bottom */}
							<div className="absolute left-[2.7em] bottom-[3.4em] flex flex-row text-black text-sm">
								<div className="flex gap-3 items-baseline mr-10">
									<span
										style={{
											fontFamily: "Yidstreet",
											fontWeight: "600",
										}}
									>
										To
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
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AnimatedFlowerCard;

