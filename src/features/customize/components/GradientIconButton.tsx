import React, { useState } from "react";

interface GradientIconButtonProps {
	onClick: () => void;
	icon: string;
	hoverIcon?: string;
	label: string;
	disabled?: boolean;
}

const GradientIconButton: React.FC<GradientIconButtonProps> = ({
	onClick,
	icon,
	hoverIcon,
	label,
	disabled = false,
}) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div className="flex flex-col items-center justify-center">
			<button
				onClick={disabled ? undefined : onClick}
				disabled={disabled}
				className={`w-20 h-20 rounded-full shadow-sm transition-all duration-200 mb-4 ${
					disabled
						? "opacity-50 cursor-not-allowed"
						: "hover:scale-95 cursor-pointer"
				}`}
				style={{
					background: "linear-gradient(145deg, #FFD1D4 0%, #CAE4FF 100%)",
				}}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<div className="flex items-center justify-center w-full h-full">
					<img
						src={hoverIcon && isHovered ? hoverIcon : icon}
						className="w-10 h-10 text-dark-gray stroke-[6px]"
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

export default GradientIconButton;
