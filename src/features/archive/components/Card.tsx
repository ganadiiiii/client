// 구버전이라면: import { motion, useMotionValue, useSpring } from "framer-motion";
import type { SpringOptions } from "framer-motion";
// framer-motion v11 이상을 사용한다면 아래 import를 사용하세요.
import { motion, useSpring } from "framer-motion";
import React, { useRef } from "react";

import cardBg from "../../../assets/generate/card.svg";

type FlowerCardProps = {
	date: string;
	title: string;
	flowerImg: string;
	mainFlowers: string[];
	subFlowers: string[];
	floriography: string;
	to: string;
	from: string;
};

// 1. 스프링 애니메이션 설정 (원하는 느낌으로 조절 가능)
const springConfig: SpringOptions = {
	stiffness: 150,
	damping: 20,
};

// 효과 강도 설정
const ROTATE_AMPLITUDE = 8; // 기울기 강도

const FlowerCard: React.FC<FlowerCardProps> = ({
	date,
	title,
	flowerImg,
	mainFlowers,
	subFlowers,
	floriography,
	to,
	from,
}) => {
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
			className="w-[385px] h-[594px]"
			style={{ perspective: "1500px" }}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
		>
			{/* 5. 실제 기울어지는 motion.div */}
			<motion.div
				className="relative w-full h-full rounded-[40px]"
				style={{
					backgroundImage: `url(${cardBg})`,
					rotateX,
					rotateY,
					scale,
				}}
			>
				{/* 콘텐츠를 살짝 앞으로 띄워 입체감을 더함 */}
				<div>
					{/* --- 기존 FlowerCard 콘텐츠 --- */}
					{/* 날짜 */}
					<div
						className="absolute left-[40px] top-[40px] text-black z-20"
						style={{
							fontFamily: "NexonLv1Gothic",
							fontSize: "14px",
							fontWeight: "400",
						}}
					>
						{date}
					</div>
					{/* 제목 */}
					<div
						className="absolute left-[34px] top-[413px] text-black z-20"
						style={{
							fontFamily: "Yidstreet",
							fontSize: "28px",
							fontWeight: "700",
						}}
					>
						{title}
					</div>
					{/* 메인/서브 꽃 */}
					<div className="absolute left-[36px] top-[473px] flex flex-col items-start gap-[5px]">
						<div className="flex gap-[10px] text-black items-baseline">
							<span
								style={{
									fontFamily: "Yidstreet",
									fontSize: "15px",
									fontWeight: "700",
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
									fontSize: "15px",
									fontWeight: "700",
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
						{/* 꽃말 */}
						<div className="flex gap-[10px] text-black items-baseline">
							<span
								style={{
									fontFamily: "Yidstreet",
									fontSize: "15px",
									fontWeight: "700",
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
					{/* TO / FROM */}
					<div className="absolute left-[36px] top-[549px] flex flex-row gap-[53px] text-black">
						<div className="flex gap-2 items-baseline">
							<span
								style={{
									fontFamily: "Yidstreet",
									fontSize: "15px",
									fontWeight: "400",
								}}
							>
								To.
							</span>
							<span
								style={{
									fontFamily: "NexonLv1Gothic",
									fontSize: "14px",
									fontWeight: "400",
								}}
							>
								@{to}
							</span>
						</div>
						<div className="flex gap-2 items-baseline">
							<span
								style={{
									fontFamily: "Yidstreet",
									fontSize: "15px",
									fontWeight: "400",
								}}
							>
								From.
							</span>
							<span
								style={{
									fontFamily: "NexonLv1Gothic",
									fontSize: "14px",
									fontWeight: "400",
								}}
							>
								@{from}
							</span>
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default FlowerCard;
