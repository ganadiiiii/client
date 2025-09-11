import { useState } from "react";
import { motion } from "framer-motion";

interface MailboxProps {
    onClick?: () => void;
}

export default function Mailbox({ onClick }: MailboxProps) {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div
            className="absolute top-1/2 left-1/2 z-10 cursor-pointer w-64 h-64"
            style={{
                transform: "translate(calc(-50% - 480px), calc(-50% + 200px))",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
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
            />
            {isHovered ? (
                <img
                    src="/src/assets/archive/mailbox-open.svg"
                    alt="Mailbox"
                    style={{
                        transform: "translate(-22px, -11px)",
                    }}
                />
            ) : (
                <img src="/src/assets/archive/mailbox-close.svg" alt="Mailbox" />
            )}
        </div>
    );
}