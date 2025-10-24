import React from "react";

interface BubbleProps {
	text: string;
	className?: string;
	backgroundImage?: string;
	backgroundSize?: string;
	backgroundPosition?: string;
	fontFamily?: string;
}

const Bubble: React.FC<BubbleProps> = ({ 
	text, 
	className, 
	backgroundImage, 
	backgroundSize = "contain", 
	backgroundPosition = "center",
	fontFamily = "SUIT-Regular"
}) => {
	return (
		<div className={`relative inline-block ${className}`}>
			<div 
                className="text-black/90 rounded-full relative whitespace-nowrap flex items-start justify-center w-full h-full" 
                style={{
                    backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
                    backgroundSize: backgroundSize,
                    backgroundPosition: backgroundPosition,
                    backgroundRepeat: "no-repeat",
                    backgroundColor: backgroundImage ? "transparent" : "white",
                    border: backgroundImage ? "none" : "4px solid #CBCBCB",
                }}
                >
				<span 
                    className={`${fontFamily === "NexonLv1Gothic" ? "font-normal" : "font-bold"} text-xl py-6.5 text-align-start`}
                    style={{
						fontFamily: fontFamily,
					}}
                    >
                        {text}
                    </span>
			</div>
		</div>
	);
};

export default Bubble;