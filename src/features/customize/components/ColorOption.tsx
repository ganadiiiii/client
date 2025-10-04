import React from "react";

interface ColorOption {
	type: "none" | "color";
	value: string;
	label: string;
	color?: string;
}

interface ColorSelectorProps {
	selectedValue: string;
	onChange: (value: string) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({
	selectedValue,
	onChange,
}) => {
	const colorOptions: ColorOption[] = [
		{ type: "none", value: "none", label: "Made Just for You" },
		{ type: "color", value: "white", label: "white/흰색", color: "#FFFFFF" },
		{ type: "color", value: "pink", label: "pink/분홍", color: "#FFA3AD" },
		{ type: "color", value: "yellow", label: "yellow/노랑", color: "#FFCD2A" },
		{ type: "color", value: "orange", label: "orange/주황", color: "#FF9000" },
		{ type: "color", value: "blue", label: "blue/파랑", color: "#44B0FF" },
		{ type: "color", value: "black", label: "black/검정", color: "#000000" },
	];

	return (
		<div className="flex flex-col gap-8">
			<div className="flex flex-col gap-4 w-full">
				<div className="flex flex-row text-start items-center gap-2">
					<h2 className="text-xl font-normal text-black" style={{ fontFamily: "NexonLv1Gothic" }}>None</h2>
					<p className="text-medium text-[#8E8E8E] font-normal" style={{ fontFamily: "NexonLv1Gothic" }}>한줌's pick</p>
				</div>

				{/* Made Just for You 버튼 */}
				{colorOptions
					.filter((opt) => opt.type === "none")
					.map((opt) => {
						const isSelected = selectedValue === opt.value;
						return (
							<button
								key={opt.value}
								onClick={() => onChange(opt.value)}
								className={`w-52 cursor-pointer text-center items-center px-6 py-2.5 rounded-full border transition-colors duration-150 ${isSelected ? "bg-primary/40 border-primary text-primary"
									: "bg-white border-gray/60 text-dark-gray hover:bg-gray/20"
									}`}
								style={{ fontFamily: "NexonLv1Gothic" }}
							>
								{opt.label}
							</button>
						);
					})}
			</div>

			<div className="flex flex-col gap-4 w-full">
				<div className="flex flex-row text-start items-center gap-2">
					<h2 className="text-xl font-normal text-black" style={{ fontFamily: "NexonLv1Gothic" }}>Color</h2>
					<p className="text-medium text-[#8E8E8E] font-normal" style={{ fontFamily: "NexonLv1Gothic" }}>포장지 색상을 선택해 주세요</p>
				</div>
				<div className="flex flex-col gap-2">
					{colorOptions
						.filter((opt) => opt.type === "color")
						.map((opt) => {
							const isSelected = selectedValue === opt.value;
							return (
								<button
									key={opt.value}
									onClick={() => onChange(opt.value)}
									className={`flex cursor-pointer items-center justify-between p-2.5 rounded-full border transition-colors duration-150 ${isSelected
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

export default ColorSelector;