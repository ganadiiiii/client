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
			className={`px-8 py-4 rounded-full border cursor-pointer transition-all duration-100 min-w-[144px] h-[61px] flex items-center justify-center ${
				isSelected
					? "bg-[#FFD1D4] border-[#FF6E77] border-2 text-[#FF6E77] font-bold"
					: "bg-white border-[#c3c3c3] border-[1.5px] text-[#5e5e5e] font-normal hover:bg-[#f3f3f3]"
			}`}
			style={{
				fontFamily: "NexonLv1Gothic",
				fontSize: "24px",
			}}
		>
			{option}
		</button>
	);
};

export default OptionButton;
