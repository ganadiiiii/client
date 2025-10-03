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
        <div className="flex w-[62em] h-[37.625em] items-center justify-center">
			{/* Left: Bouquet Image */}
			<div 
                className="w-[37.56rem] h-full flex items-center justify-center relative"
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
                    className="max-w-full max-h-full object-contain"
                />
			</div>

			{/* Right: Deco Selector */}
			<div 
                className="flex w-[24rem] h-[34em] rounded-2xl items-start justify-center pt-10"
                style={{
                    background: "linear-gradient(163deg, rgba(255, 255, 255, 0.20) 22.62%, rgba(255, 255, 255, 0.80) 85.11%)",
                    boxShadow: "0 11px 6.1px 0 rgba(255, 255, 255, 0.54) inset"
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