import { useState } from "react";
import Mailbox from "../../features/archive/components/Mailbox";
import FlowerGrid from "../../features/archive/FlowerGrid";

const ArchivePage = () => {
	const [isLightOn, setIsLightOn] = useState(true);
	const [isLampHovered, setIsLampHovered] = useState(false);

	const toggleLight = () => {
		setIsLightOn((isLightOn) => !isLightOn);
	};

	return (
		<main className="overflow-hidden">
			<div
				className="relative w-full h-screen bg-cover bg-center bg-no-repeat flex justify-center pt-[139px]"
				style={{
					backgroundImage: `url(/src/assets/archive/${isLightOn ? "bg" : "bg-dark"}.svg)`,
				}}
			>
				{/* 배경 역할을 하는 home 이미지 */}
				<div className="relative">
					<img
						src={`/src/assets/archive/${isLightOn ? "home-light.svg" : "home-dark.svg"}`}
						alt="Home background"
						className="max-w-full h-auto"
					/>

					<div
						className="absolute z-10 group flex top-0 left-1/2 cursor-pointer h-48 justify-center items-center"
						style={{
							transform: "translate(-50%, -5%)",
						}}
						onMouseEnter={() => setIsLampHovered(true)}
						onMouseLeave={() => setIsLampHovered(false)}
						onClick={toggleLight}
					>
						{isLightOn ? (
							<img
								src={`/src/assets/archive/${isLampHovered ? "lamp-on-hover.svg" : "lamp-on.svg"}`}
								alt="Lamp"
								className="pointer-events-none"
							/>
						) : (
							<img
								src={`/src/assets/archive/${isLampHovered ? "lamp-off-hover.svg" : "lamp-off.svg"}`}
								alt="Lamp"
								className="pointer-events-none"
							/>
						)}
					</div>
					{/* --- 그리드 및 네비게이션을 포함하는 컨테이너 --- */}
					<FlowerGrid />
				</div>
			</div>
			<Mailbox />
			<div
				className="absolute top-1/2 left-1/2 z-10 w-[400px] h-[400px]"
				style={{
					transform: "translate(calc(-50% + 540px), calc(-50% + 240px))",
				}}
			>
				<img src="/src/assets/archive/sofa.svg" alt="Sofa" />
			</div>
		</main>
	);
};

export default ArchivePage;
