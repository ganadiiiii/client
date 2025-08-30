import React, { useState } from "react";
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
	return (
		<div
			className="relative w-[385px] h-[594px] transition-all rounded-[40px] duration-100 hover:scale-105"
			style={{
				backgroundImage: `url(${cardBg})`,
			}}
		>
			{/* 꽃 이미지 */}

			{/* 날짜 */}
			<div
				className="absolute left-[40px] top-[40px] text-black z-20"
				style={{
					fontFamily: "NexonLv1Gothic",
					fontSize: "14px",
					fontWeight: "400",
					lineHeight: "1.18",
					letterSpacing: "5%",
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
					lineHeight: "1.18",
					letterSpacing: "5%",
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
							lineHeight: "1.18",
							letterSpacing: "5%",
						}}
					>
						Main
					</span>
					<span
						style={{
							fontFamily: "NexonLv1Gothic",
							fontSize: "14px",
							fontWeight: "400",
							lineHeight: "1.18",
							letterSpacing: "5%",
						}}
					>
						{mainFlowers.join(", ")}
					</span>
					<span
						style={{
							fontFamily: "Yidstreet",
							fontSize: "15px",
							fontWeight: "700",
							lineHeight: "1.18",
							letterSpacing: "5%",
						}}
					>
						Sub
					</span>
					<span
						style={{
							fontFamily: "NexonLv1Gothic",
							fontSize: "14px",
							fontWeight: "400",
							lineHeight: "1.18",
							letterSpacing: "5%",
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
							lineHeight: "1.18",
							letterSpacing: "5%",
						}}
					>
						Floriography
					</span>
					<span
						style={{
							fontFamily: "NexonLv1Gothic",
							fontSize: "14px",
							fontWeight: "400",
							lineHeight: "1.18",
							letterSpacing: "5%",
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
							lineHeight: "1.18",
							letterSpacing: "5%",
						}}
					>
						To.
					</span>
					<span
						style={{
							fontFamily: "NexonLv1Gothic",
							fontSize: "14px",
							fontWeight: "400",
							lineHeight: "1.18",
							letterSpacing: "5%",
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
							lineHeight: "1.18",
							letterSpacing: "5%",
						}}
					>
						From.
					</span>
					<span
						style={{
							fontFamily: "NexonLv1Gothic",
							fontSize: "14px",
							fontWeight: "400",
							lineHeight: "1.18",
							letterSpacing: "5%",
						}}
					>
						@{from}
					</span>
				</div>
			</div>
		</div>
	);
};

export default FlowerCard;
