import React from "react";

interface OptionButtonProps {
	option: string;
	isSelected: boolean;
	onClick: () => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({
	option,
	isSelected,
	onClick,
}) => {
	return (
		<button
			onClick={onClick}
			className={`px-8 py-4 rounded-full border cursor-pointer transition-all duration-100 min-w-31 h-13 text-lg flex items-center justify-center ${
				isSelected
					? "bg-primary/40 border-primary border-2 text-primary font-bold"
					: "bg-white border-gray/60 border-[1.5px] text-dark-gray font-normal hover:bg-gray/20"
			}`}
			style={{
				fontFamily: "NexonLv1Gothic",
			}}
		>
			{option}
		</button>
	);
};

export default OptionButton;
