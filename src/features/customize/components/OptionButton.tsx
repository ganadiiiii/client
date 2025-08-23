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
			className={`px-8 py-4 rounded-full border transition-all duration-200 min-w-[144px] h-[61px] flex items-center justify-center ${
				isSelected
					? "bg-[#FFD1D4] border-[#FF6E77] border-2 text-[#FF6E77] font-bold"
					: "bg-white border-[#868686] border-1 text-[#000000] font-normal"
			}`}
			style={{
				fontFamily: "NEXON Lv1 Gothic OTF",
				fontSize: "24px",
			}}
		>
			{option}
		</button>
	);
};

export default OptionButton;
