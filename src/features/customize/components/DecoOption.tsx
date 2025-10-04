import React from "react";

interface DecoOption {
	type: "point" | "color";
	value: string;
	label: string;
	color?: string;
}

interface DecoSelectorProps {
	selectedPoint: string;
	selectedColor: string;
	onPointChange: (value: string) => void;
	onColorChange: (value: string) => void;
}

const DecoSelector: React.FC<DecoSelectorProps> = ({
	selectedPoint,
	selectedColor,
	onPointChange,
	onColorChange,
}) => {
	const decoOptions: DecoOption[] = [
		{ type: "point", value: "ribbon", label: "리본" },
		{ type: "point", value: "pompon", label: "폼폼" },
		{ type: "color", value: "white", label: "white/흰색", color: "#FFFFFF" },
		{ type: "color", value: "pink", label: "pink/분홍", color: "#FFA3AD" },
		{ type: "color", value: "black", label: "black/검정", color: "#000000" },
	];

	return (
		<div className="flex flex-col gap-8 w-[15em]">
            <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-row block text-start items-center gap-3">
                    <h2 className="text-xl font-normal text-black" style={{ fontFamily: "NexonLv1Gothic" }}>Point</h2>
                </div>


                <div className="flex flex-row gap-2">
					{/* Point 버튼 */}
					{decoOptions
						.filter((opt) => opt.type === "point")
						.map((opt) => {
							const isSelected = selectedPoint === opt.value;
							return (
								<button
									key={opt.value}
									onClick={() => onPointChange(opt.value)}
									className={`w-fit text-center items-center px-6 py-2.5 rounded-full border border-gray-300 transition-colors duration-150 font-normal ${
										isSelected ? "bg-[#FFD1D4]" : "bg-white"
									}`}
								>
									{opt.label}
								</button>
							);
					})}
				</div>
            </div>
			
			<div className="flex flex-col gap-4 w-full">
                <div className="flex flex-row block text-start items-center gap-3">
                    <h2 className="text-xl font-normal text-black" style={{ fontFamily: "NexonLv1Gothic" }}>Color</h2>
                    <p className="text-xs text-[#8E8E8E] font-normal" style={{ fontFamily: "NexonLv1Gothic" }}>장식 색상을 선택해 주세요</p>
                </div>
				<div className="flex flex-col gap-2">
					{decoOptions
						.filter((opt) => opt.type === "color")
						.map((opt) => {
							const isSelected = selectedColor === opt.value;
							return (
								<button
									key={opt.value}
									onClick={() => onColorChange(opt.value)}
									className={`flex items-center justify-between px-4 py-2 rounded-full border border-gray-300 transition-colors duration-150 ${
										isSelected
											? "bg-[#FFD1D4]"
											: "bg-white"
									}`}
								>
									<div
										className="w-7 h-7 rounded-full border"
										style={{ backgroundColor: opt.color }}
									/>
									<span className="text-base font-normal text-black" style={{ fontFamily: "NexonLv1Gothic" }}>{opt.label}</span>
								</button>
							);
						})}
				</div>
			</div>
		</div>
	);
};

export default DecoSelector;