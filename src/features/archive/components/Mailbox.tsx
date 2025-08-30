import { useState } from "react";

export default function Mailbox() {
    const [isHovered, setIsHovered] = useState(false);
	return (
		<div
				className="absolute top-1/2 left-1/2 z-10 cursor-pointer w-64 h-64"
				style={{
					transform: "translate(calc(-50% - 480px), calc(-50% + 280px))",
				}}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				{isHovered ? (
					<img
						src="/src/assets/archive/mailbox-open.svg"
						alt="Mailbox"
						style={{
							// 덜컹거림을 보정하기 위해 열린 이미지의 위치 조정
							transform: "translate(-22px, -11px)",
						}}
					/>
				) : (
					<img src="/src/assets/archive/mailbox-close.svg" alt="Mailbox" />
				)}
			</div>
	);
}