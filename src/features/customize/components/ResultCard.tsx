import type { SpringOptions } from "framer-motion";
import { motion, useSpring } from "framer-motion";
import React, { useRef } from "react";

import cardBg from "../../../assets/generate/result/card.png";
import type { FlowerCard } from "../../../types/FlowerCard";

type ResultCardProps = {
	flowerCard: FlowerCard;
};

// 1. 스프링 애니메이션 설정 (원하는 느낌으로 조절 가능)
const springConfig: SpringOptions = {
	stiffness: 150,
	damping: 20,
};

// 효과 강도 설정
const ROTATE_AMPLITUDE = 8; // 기울기 강도

const ResultCard: React.FC<ResultCardProps> = ({ flowerCard }) => {
	const {
		date,
		title,
		flowerImg,
		mainFlowers,
		subFlowers,
		floriography,
		size,
		price,
	} = flowerCard;
	const ref = useRef<HTMLDivElement>(null);

	// 2. useSpring을 사용하여 회전 및 스케일 값 설정
	const rotateX = useSpring(0, springConfig);
	const rotateY = useSpring(0, springConfig);
	const scale = useSpring(1, springConfig);

	// 3. 마우스 이벤트 핸들러 (참고 코드 로직 적용)
	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!ref.current) return;

		const rect = ref.current.getBoundingClientRect();
		const offsetX = e.clientX - rect.left - rect.width / 2;
		const offsetY = e.clientY - rect.top - rect.height / 2;

		const rotationX = (offsetY / (rect.height / 2)) * -ROTATE_AMPLITUDE;
		const rotationY = (offsetX / (rect.width / 2)) * ROTATE_AMPLITUDE;

		// .set()으로 목표 값을 지정하면 스프링이 알아서 부드럽게 도달합니다.
		rotateX.set(rotationX);
		rotateY.set(rotationY);
	};

	const handleMouseLeave = () => {
		// 모든 값을 원래대로 되돌리면 스프링 효과로 자연스럽게 복귀합니다.
		rotateX.set(0);
		rotateY.set(0);
	};

	return (
		// 4. 이벤트 핸들러와 perspective를 위한 외부 컨테이너
		<div
			ref={ref}
			className="w-[384px] h-[593px]"
			style={{ perspective: "1500px" }}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
		>
			{/* 5. 실제 기울어지는 motion.div */}
			<motion.div
				className="relative w-full h-full rounded-[40px]"
				style={{
					backgroundImage: `url(${cardBg})`,
					backgroundRepeat: "no-repeat",
					backgroundSize: "100% 100%",
					backgroundPosition: "center",
					rotateX,
					rotateY,
					scale,
				}}
			>
				<div>
					{/* 날짜 */}
					<div
						className="absolute left-[40px] top-[40px] text-black z-20"
						style={{
							fontFamily: "Yidstreet",
							fontSize: "14px",
							fontWeight: "400",
						}}
					>
						{date}
					</div>

					{/* 꽃 이미지 */}
					<div className="absolute left-1/2 top-[220px] transform -translate-x-1/2 -translate-y-1/2 z-10">
						<img
							src={flowerImg}
							alt="flower"
							className="w-[320px] h-[320px] object-contain"
						/>
					</div>
					{/* 제목 */}
					<div
						className="absolute left-[40px] top-[393px] text-black z-20"
						style={{
							fontFamily: "Yidstreet",
							fontSize: "28px",
							fontWeight: "600",
						}}
					>
						{title}
					</div>
					{/* 메인/서브 꽃 */}
					<div className="absolute flex flex-col left-[40px] top-[452px] items-start gap-[5px] text-black">
						<div className="flex flex-row gap-[10px]">
							<span
								style={{
									fontFamily: "Yidstreet",
									fontSize: "14px",
									fontWeight: "600",
								}}
							>
								Main
							</span>
							<span
								style={{
									fontFamily: "NexonLv1Gothic",
									fontSize: "14px",
									fontWeight: "400",
								}}
							>
								{mainFlowers.join(", ")}
							</span>
							<span
								style={{
									fontFamily: "Yidstreet",
									fontSize: "14px",
									fontWeight: "600",
								}}
							>
								Sub
							</span>
							<span
								style={{
									fontFamily: "NexonLv1Gothic",
									fontSize: "14px",
									fontWeight: "400",
								}}
							>
								{subFlowers.join(", ")}
							</span>
						</div>
						<div className="flex flex-row gap-[10px]">
							<span
								style={{
									fontFamily: "Yidstreet",
									fontSize: "14px",
									fontWeight: "600",
								}}
							>
								Floriography
							</span>
							<span
								style={{
									fontFamily: "NexonLv1Gothic",
									fontSize: "14px",
									fontWeight: "400",
								}}
							>
								{floriography}
							</span>
						</div>
					</div>
					<div className="absolute left-[40px] top-[526px] flex flex-row gap-20 text-black">
						<div className="flex gap-3 items-baseline">
							<span
								style={{
									fontFamily: "Yidstreet",
									fontSize: "14px",
									fontWeight: "600",
								}}
							>
								Size
							</span>
							<span
								style={{
									fontFamily: "NexonLv1Gothic",
									fontSize: "14px",
									fontWeight: "400",
								}}
							>
								{size}
							</span>
						</div>
						<div className="flex gap-3 items-baseline">
							<span
								style={{
									fontFamily: "Yidstreet",
									fontSize: "14px",
									fontWeight: "600",
								}}
							>
								Price
							</span>
							<span
								style={{
									fontFamily: "NexonLv1Gothic",
									fontSize: "14px",
									fontWeight: "400",
								}}
							>
								{price}원
							</span>
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default ResultCard;
