import { forwardRef } from "react";

interface FlowerSectionRef {
	isValid: () => boolean;
}

export const FlowerSection = forwardRef<FlowerSectionRef>(() => {
	return (
		<section
			className="bg-transparent"
			style={{
				width: "42.4375em",
				height: "14.875em",
			}}
		>
			<h2
				className="w-full text-start text-2xl font-bold text-black mb-2.5"
				style={{ fontFamily: "NexonLv1Gothic" }}
			>
				주문 상품
			</h2>
			<div
				className="p-9 rounded-[1.25em] bg-white w-full"
				style={{ boxShadow: "2px 2px 21.3px 0 rgba(0, 0, 0, 0.08)" }}
			>
				{/* 이름 선택 */}
				<div className="flex flew-row gap-6">
					<div
						className="flex items-center justify-center rounded-full w-[7em] aspect-square"
						style={{
							backgroundImage:
								"linear-gradient(158deg, rgba(255, 255, 255, 0.80) 14.96%, #FEDEE6 88.22%)",
							backgroundSize: "cover",
							backgroundRepeat: "no-repeat",
							backgroundPosition: "center",
						}}
					>
						{/* <img src="/src/assets/generate/flower-1.png" alt="flower" className="w-full h-full bg-no-repeat bg-center bg-cover" /> */}
					</div>
					<div className="flex flex-col text-start w-full justify-center">
						<h2
							className="text-xl font-bold text-black w-full"
							style={{ fontFamily: "NexonLv1Gothic" }}
						>
							TITLE 꽃다발
						</h2>
						<div className="inline-block flex flew-row">
							<span
								className="text-black text-lg font-light mr-3"
								style={{ fontFamily: "NexonLv1Gothic" }}
							>
								25,000원
							</span>
							<span
								className="text-black/60 text-base font-light"
								style={{ fontFamily: "NexonLv1Gothic" }}
							>
								수량 1개
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
});
