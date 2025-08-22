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
					? "bg-[#FFD1D4] border-[#868686]"
					: "bg-white border-[#868686] hover:bg-gray-50"
			}`}
			style={{
				fontFamily: "NEXON Lv1 Gothic OTF",
				fontSize: "24px",
				fontWeight: isSelected ? "700" : "400",
				lineHeight: "1.15",
				color: "#000000",
			}}
		>
			{option}
		</button>
	);
};

export default OptionButton;
