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
			className={`w-[68px] h-[68px] relative rounded-full flex items-center justify-center ${className} ${disabled ? "" : "transition-all duration-300 hover:scale-110"}`}
		>
			{/* Pink background for enabled state, only for right button */}
			{direction === "right" && (
				<div
					className={`absolute inset-0 rounded-full bg-[#FF9BAF] z-0 transition-opacity duration-300 ${!disabled ? "opacity-100" : "opacity-0"}`}
				/>
			)}

			{/* Circular background with gradient and shadow effects */}
			<div
				className="absolute inset-0 rounded-full shadow-md z-10"
				style={{
					background:
						"linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.8) 100%)",
					filter: "drop-shadow(0px 4px 7.7px rgba(0, 0, 0, 0.15))",
				}}
			/>

			{/* Arrow icon */}
			{direction === "left" ? (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="w-6 h-6 z-20 relative"
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
					className={`w-6 h-6 z-20 relative transition-all duration-200 ${!disabled ? "text-[#FF6E77]" : "text-black"}`}
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
