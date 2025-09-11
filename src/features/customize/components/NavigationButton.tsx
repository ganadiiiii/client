import React from "react";

interface NavigationButtonProps {
	direction: "left" | "right";
	onClick: () => void;
	disabled?: boolean;
	className?: string;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({
	direction,
	onClick,
	disabled = false,
	className = "",
}) => {
	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			className={`w-17 h-17 relative rounded-full flex items-center justify-center ${className} ${disabled ? "" : "transition-all duration-100 hover:scale-95 cursor-pointer"}`}
		>
			{/* Pink background for enabled state, only for right button */}
			{direction === "right" && (
				<div
					className={`absolute inset-0 rounded-full bg-[#FF9BAF] z-0 transition-opacity duration-300 ${!disabled ? "opacity-100" : "opacity-0"}`}
				/>
			)}

			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 85 85"
				fill="none"
				className="absolute top-9/16 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none w-21 h-21"
			>
				<g filter="url(#filter0_di)">
					<circle
						cx="42.1913"
						cy="38.1913"
						r="34.1913"
						fill="url(#paint0_linear)"
						shapeRendering="crispEdges"
					/>
				</g>
				<defs>
					<filter
						id="filter0_di"
						x="0.3"
						y="0.3"
						width="83.7828"
						height="83.7828"
						filterUnits="userSpaceOnUse"
					>
						<feFlood floodOpacity="0" result="BackgroundImageFix" />
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dy="4" />
						<feGaussianBlur stdDeviation="3.85" />
						<feComposite in2="hardAlpha" operator="out" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
						/>
						<feBlend
							mode="normal"
							in2="BackgroundImageFix"
							result="effect1_dropShadow"
						/>
						<feBlend
							mode="normal"
							in="SourceGraphic"
							in2="effect1_dropShadow"
							result="shape"
						/>
						<feColorMatrix
							in="SourceAlpha"
							type="matrix"
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
							result="hardAlpha"
						/>
						<feOffset dx="3" dy="4" />
						<feGaussianBlur stdDeviation="0.8" />
						<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
						<feColorMatrix
							type="matrix"
							values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.51 0"
						/>
						<feBlend mode="normal" in2="shape" result="effect2_innerShadow" />
					</filter>
					<linearGradient
						id="paint0_linear"
						x1="25.7054"
						y1="12.546"
						x2="45.2746"
						y2="45.002"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor="white" stopOpacity="0.1" />
						<stop offset="1" stopColor="white" stopOpacity="0.8" />
					</linearGradient>
				</defs>
			</svg>

			{/* Arrow icon */}
			{direction === "left" ? (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-7 h-7 z-20 relative"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
					/>
				</svg>
			) : (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className={`w-6 h-6 z-20 relative transition-all duration-200 pointer-events-none ${!disabled ? "text-primary" : "text-black"}`}
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
					/>
				</svg>
			)}
		</button>
	);
};

export default NavigationButton;
