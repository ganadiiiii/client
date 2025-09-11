import React, { useState } from "react";

interface SimpleIconButtonProps {
	onClick: () => void;
	icon: string;
	hoverIcon?: string;
	className?: string;
	label?: string;
}

const SimpleIconButton: React.FC<SimpleIconButtonProps> = ({
	onClick,
	icon,
	hoverIcon,
	className = "",
	label,
}) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			className={`flex flex-col items-center justify-center ${className}`}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<button
				onClick={onClick}
				className="w-16 h-16 rounded-full shadow-lg hover:scale-95 transition-all duration-200 cursor-pointer mb-4"
				style={{
					background:
						"linear-gradient(149deg, rgba(255, 255, 255, 0.1) 12%, rgba(255, 255, 255, 0.8) 60%)",
					boxShadow:
						"0px 3px 6px 0px rgba(0, 0, 0, 0.15), inset 2px 3px 1px 0px rgba(255, 255, 255, 0.51)",
				}}
			>
				<div className="flex items-center justify-center w-full h-full">
					<img
						src={hoverIcon && isHovered ? hoverIcon : icon}
						className="w-6 h-6 text-dark-gray stroke-[5px]"
					/>
				</div>
			</button>
			<label
				className="text-dark-gray text-base"
				style={{ fontFamily: "NexonLv1Gothic" }}
			>
				{label}
			</label>
		</div>
	);
};

export default SimpleIconButton;
