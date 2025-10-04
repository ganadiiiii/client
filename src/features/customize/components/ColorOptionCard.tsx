import React from "react";
import ColorSelector from "./ColorOption";

interface ColorOptionCardProps {
    selectedValue: string;
    onChange: (value: string) => void;
}

const ColorOptionCard: React.FC<ColorOptionCardProps> = ({ selectedValue, onChange }) => {

	const getImageSrc = (value: string) => {
		if (value === "none") return "src/assets/generate/bouquet-white.png";
		return `src/assets/generate/bouquet-${value}.png`;
	};

	return (
        <div className="relative w-[62em] h-[37.625em] flex items-center justify-center">
			{/* Left: Bouquet Image */}
			<div 
                className="absolute left-0 w-[37.56rem] h-full flex items-center justify-center z-10"
                style={{ 
                    backgroundImage: "url('/src/assets/generate/detailcard.png')", 
                    backgroundSize: "contain", 
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    filter: "drop-shadow(2px 4px 14.4px rgba(0, 0, 0, 0.15))"
                }}
                >
                <img
                    src={getImageSrc(selectedValue)}
                    alt={`Bouquet - ${selectedValue}`}
                    className={`max-w-full max-h-full object-contain transition-all duration-300 ${
                        selectedValue === "none" ? "blur-[7.65px]" : ""
                    }`}
                />
			</div>

			{/* Right: Color Selector - Overlapping */}
			<div 
                className="absolute -right-8 flex w-[40rem] h-[34em] rounded-3xl items-center justify-center pl-48 z-0"
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