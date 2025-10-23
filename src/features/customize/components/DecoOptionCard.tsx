import React from "react";
import DecoSelector from "./DecoOption";

interface DecoOptionCardProps {
    selectedPoint: string;
    selectedColor: string;
    onPointChange: (value: string) => void;
    onColorChange: (value: string) => void;
}

const DecoOptionCard: React.FC<DecoOptionCardProps> = ({ selectedPoint, selectedColor, onPointChange, onColorChange }) => {

	const getImageSrc = (point: string, color: string) => {
        return `/src/assets/generate/bouquet-${point}-${color}.png`;
    };

	return (
        <div className="relative w-[62em] h-[33.175em] flex items-center justify-center">
			{/* Left: Bouquet Image */}
			<div 
                className="absolute left-0 w-[32.65rem] h-full flex items-center justify-center z-10"
                style={{ 
                    backgroundImage: "url('/src/assets/generate/detailcard.png')", 
                    backgroundSize: "contain", 
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    filter: "drop-shadow(2px 4px 14.4px rgba(0, 0, 0, 0.15))"
                }}
                >
                <img
                    src={getImageSrc(selectedPoint, selectedColor)}
                    alt={`Bouquet - ${selectedPoint}-${selectedColor}`}
                    className="max-w-full max-h-full 2xl:scale-80 4xl:scale-100 object-contain"
                />
			</div>

			{/* Right: Deco Selector */}
			<div 
                className="absolute right-36 flex w-[24rem] h-[28em] rounded-3xl items-center justify-center pl-10 z-0"
                style={{
                    background: "linear-gradient(163deg, rgba(255, 255, 255, 0.20) 22.62%, rgba(255, 255, 255, 0.80) 85.11%)",
                    filter: "drop-shadow(2px 4px 14.4px rgba(0, 0, 0, 0.15))"
                }}
            >
                <DecoSelector
                    selectedPoint={selectedPoint}
                    selectedColor={selectedColor}
                    onPointChange={onPointChange}
                    onColorChange={onColorChange}
                />
			</div>
		</div>
	);
};

export default DecoOptionCard;