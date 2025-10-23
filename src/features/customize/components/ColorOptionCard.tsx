import React from "react";
import ColorSelector from "./ColorOption";

interface ColorOptionCardProps {
    selectedValue: string;
    onChange: (value: string) => void;
}

const ColorOptionCard: React.FC<ColorOptionCardProps> = ({ selectedValue, onChange }) => {

	const getImageSrc = (value: string) => {
		if (value === "none") return "/assets/generate/bouquet-white.png";
		return `/assets/generate/bouquet-${value}.png`;
	};

	return (
        <div className="relative w-[62em] h-[33.175em] flex items-center justify-center">
			{/* Left: Bouquet Image */}
			<div 
                className="absolute left-0 w-[32.65rem] h-full flex items-center justify-center z-10"
                style={{ 
                    backgroundImage: "url('/assets/generate/detailcard.png')", 
                    backgroundSize: "contain", 
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    filter: "drop-shadow(2px 4px 14.4px rgba(0, 0, 0, 0.15))"
                }}
                >
                <img
                    src={getImageSrc(selectedValue)}
                    alt={`Bouquet - ${selectedValue}`}
                    className={`max-w-full max-h-full 2xl:scale-80 4xl:scale-100 object-contain transition-all duration-300 ${
                        selectedValue === "none" ? "blur-[7.65px]" : ""
                    }`}
                />
			</div>

			{/* Right: Color Selector - Overlapping */}
			<div 
                className="absolute right-25 flex w-[30rem] h-[30em] rounded-3xl items-center justify-center pl-22 z-0"
                style={{
                    background: "linear-gradient(163deg, rgba(255, 255, 255, 0.20) 22.62%, rgba(255, 255, 255, 0.80) 85.11%)",
                    filter: "drop-shadow(2px 4px 14.4px rgba(0, 0, 0, 0.15))"
                }}
            >
                <ColorSelector
                    selectedValue={selectedValue}
                    onChange={onChange}
                />
			</div>
		</div>
	);
};

export default ColorOptionCard;