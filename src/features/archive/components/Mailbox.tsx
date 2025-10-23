import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { friendAPI } from "../../../api";
import calloutPng from "../../../assets/archive/callout.png";
import mailboxOpenPng from "../../../assets/archive/mailbox-open.png";
import mailboxClosePng from "../../../assets/archive/mailbox-close.png";

interface MailboxProps {
	onClick?: () => void;
}

export default function Mailbox({ onClick }: MailboxProps) {
	const [isHovered, setIsHovered] = useState(false);
	const [isNewFriend, setIsNewFriend] = useState(false);

	const getNewFriend = async () => {
		try {
			const response = await friendAPI.newFriend();
			setIsNewFriend(response.hasPendingFriendRequests);
		} catch (error) {
			console.error("친구 요청 여부 가져오기 실패:", error);
		}
	};

	useEffect(() => {
		getNewFriend();
	}, []);

	return (
		<div
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={onClick}
			className="relative w-full h-full"
		>
			<motion.img
				src={calloutPng}
				alt="Callout"
				// style의 transform을 제거하고, animate 속성으로 위치를 제어합니다.
				// x는 고정된 왼쪽 위치, y는 아래에서 위아래로 움직이는 애니메이션입니다.
				initial={{ x: "-30%", y: "-5%" }}
				animate={{
					y: ["-10%", "-5%", "-10%"],
				}}
				transition={{
					duration: 1.2,
					repeat: Infinity,
					ease: "easeOut",
				}}
				className={`w-40 h-24 ${isNewFriend ? "opacity-100" : "opacity-0 pointer-events-none invisible"}`}
			/>
			{isHovered ? (
				<img
					src={mailboxOpenPng}
					alt="Mailbox"
					style={{
						transform: "translate(-1.35em, -0.6em)",
					}}
					className="w-38 h-80"
				/>
			) : (
				<img
					src={mailboxClosePng}
					alt="Mailbox"
					className="w-30 h-76"
				/>
			)}
		</div>
	);
}
