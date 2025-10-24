import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface CircleTransitionProps {
	isActive: boolean;
	onComplete?: () => void;
	originX?: number;
	originY?: number;
	color?: string;
	reverse?: boolean; // true면 circle이 커지면서 사라짐
}

const CircleTransition = ({
	isActive,
	onComplete,
	originX = window.innerWidth / 2,
	originY = window.innerHeight / 2,
	color = "#FFE7E9", // primary color
	reverse = false,
}: CircleTransitionProps) => {
	const maskRef = useRef<SVGCircleElement>(null);

	useEffect(() => {
		if (!maskRef.current) return;

		if (isActive) {
			const mask = maskRef.current;

			// 화면 대각선 길이 계산 (충분히 크게)
			const maxRadius = Math.sqrt(
				Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2)
			);

			if (reverse) {
				// Reverse: 작은 원에서 시작해서 커지면서 사라짐
				gsap.set(mask, {
					attr: { r: 0 },
				});

				gsap.to(mask, {
					attr: { r: maxRadius },
					duration: 0.8,
					ease: "power2.inOut",
					onComplete: () => {
						if (onComplete) onComplete();
					},
				});
			} else {
				// Normal: 큰 원에서 시작해서 작아지면서 화면을 가림
				gsap.set(mask, {
					attr: { r: maxRadius },
				});

				gsap.to(mask, {
					attr: { r: 0 },
					duration: 1,
					ease: "power2.inOut",
					onComplete: () => {
						if (onComplete) onComplete();
					},
				});
			}
		}
	}, [isActive, onComplete, originX, originY, reverse]);

	if (!isActive) return null;

	return (
		<div className="fixed inset-0 z-[9999] pointer-events-none">
			<svg width="100%" height="100%" className="absolute inset-0">
				<defs>
					<mask id="circle-mask">
						{/* White background - visible area */}
						<rect width="100%" height="100%" fill="white" />
						{/* Black circle - invisible area (구멍) */}
						<circle
							ref={maskRef}
							cx={originX}
							cy={originY}
							r="0"
							fill="black"
						/>
					</mask>
				</defs>
				{/* Color layer with mask applied */}
				<rect
					width="100%"
					height="100%"
					fill={color}
					mask="url(#circle-mask)"
				/>
			</svg>
		</div>
	);
};

export default CircleTransition;

