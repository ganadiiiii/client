import React from "react";

interface BubbleProps {
	text: string;
	className?: string;
}

const Bubble: React.FC<BubbleProps> = ({ text, className }) => {
	return (
		<div className={`relative inline-block ${className}`}>
			<div 
                className="bg-white text-black/90 px-9 py-4 rounded-full border-4 border-[#CBCBCB] relative whitespace-nowrap" 
                style={{
                    filter: "drop-shadow(3px 4px 11.4px rgba(0, 0, 0, 0.10))"
                }}
                >
				<span 
                    className="font-bold text-xl" 
                    style={{
						fontFamily: "SUIT-Regular",
					}}
                    >
                        {text}
                    </span>

				
			{/* 꼬리 테두리 (before) */}
			<div className="absolute bottom-[-2.25em] 3xl:bottom-[-1.75em] 4xl:bottom-[-1.5em] left-[2em] z-0 w-0 h-0 border-l-[10px] border-r-[10px] border-t-[26px] border-transparent border-t-[#CBCBCB]" />
			{/* 꼬리 내부 (after) */}
			<div className="absolute bottom-[-1.625em] 3xl:bottom-[-1.25em] 4xl:bottom-[-1em] left-[2.325em] z-10 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[23px] border-transparent border-t-white" />
			</div>
		</div>
	);
};

export default Bubble;