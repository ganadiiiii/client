import { motion } from "framer-motion";
import { useState } from "react";

interface MailboxProps {
	onClick?: () => void;
}

export default function Mailbox({ onClick }: MailboxProps) {
	const [isHovered, setIsHovered] = useState(false);
	return (
		<div
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={onClick}
			className="relative w-full h-full"
		>
			<motion.img
				src="/src/assets/archive/callout.png"
				alt="Callout"
				// style의 transform을 제거하고, animate 속성으로 위치를 제어합니다.
				// x는 고정된 왼쪽 위치, y는 아래에서 위아래로 움직이는 애니메이션입니다.
				initial={{ x: "-50%", y: "-10%" }}
				animate={{
					y: ["-20%", "-10%", "-20%"],
				}}
				transition={{
					duration: 1.2,
					repeat: Infinity,
					ease: "easeOut",
				}}
				className="w-40 h-23"
			/>
			{isHovered ? (
				<img
					src="/src/assets/archive/mailbox-open.svg"
					alt="Mailbox"
					style={{
						transform: "translate(-1.375em, -0.6875em)",
					}}
					className="w-38 h-78"
				/>
			) : (
				<img src="/src/assets/archive/mailbox-close.svg" alt="Mailbox" className="w-28 h-77"/>
			)}
		</div>
	);
}
