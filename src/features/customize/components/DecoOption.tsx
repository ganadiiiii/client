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
		<div className="flex flex-col gap-8">
			<div className="flex flex-col gap-4 w-full">
				<div className="flex flex-row text-start items-center gap-2">
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
									className={`w-fit cursor-pointer text-center items-center px-6 py-2.5 rounded-full border transition-colors duration-150 ${isSelected ? "bg-primary/40 border-primary text-primary"
											: "bg-white border-gray/60 text-dark-gray hover:bg-gray/20"
										}`}
									style={{ fontFamily: "NexonLv1Gothic" }}
								>
									{opt.label}
								</button>
							);
						})}
				</div>
			</div>

			<div className="flex flex-col gap-4 w-full">
				<div className="flex flex-row text-start items-center gap-2">
					<h2 className="text-xl font-normal text-black" style={{ fontFamily: "NexonLv1Gothic" }}>Color</h2>
					<p className="text-sm text-[#8E8E8E] font-normal" style={{ fontFamily: "NexonLv1Gothic" }}>장식 색상을 선택해 주세요</p>
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
									className={`flex cursor-pointer items-center justify-between p-2.5 rounded-full border ransition-colors duration-150 ${isSelected
											? "bg-primary/40 border-primary text-primary"
											: "bg-white border-gray/60 text-dark-gray hover:bg-gray/20"
										}`}
									style={{ fontFamily: "NexonLv1Gothic" }}
								>
									<div
										className="w-6 h-6 rounded-full border"
										style={{ backgroundColor: opt.color }}
									/>
									{opt.label}
								</button>
							);
						})}
				</div>
			</div>
		</div>
	);
};

export default DecoSelector;