import React, { useEffect, useState } from "react";
import checkIcon from "../assets/icon-check.svg"

interface AlertDialogProps {
	text: string;
	duration?: number;
	isVisible: boolean;
	onClose: () => void;
}

const AlertDialog: React.FC<AlertDialogProps> = ({
	text,
	duration = 2000,
	isVisible,
	onClose,
}) => {
	const [show, setShow] = useState(false);

	useEffect(() => {
		console.log("AlertDialog useEffect - isVisible:", isVisible);
		if (isVisible) {
			// Show immediately
			setShow(true);
			console.log("AlertDialog showing");
			
			// Auto-dismiss after duration
			const timer = setTimeout(() => {
				console.log("AlertDialog auto-dismissing");
				setShow(false);
				// Call onClose after fade-out animation
				setTimeout(onClose, 300);
			}, duration);

			return () => clearTimeout(timer);
		} else {
			setShow(false);
		}
	}, [isVisible, duration, onClose]);

	console.log("AlertDialog render - isVisible:", isVisible, "show:", show);

	if (!isVisible) return null;

	return (
		<div
			className={`fixed inset-0 flex items-center justify-center z-50 -left-[12px] pointer-events-none transition-opacity duration-300 ${
				show ? "opacity-100" : "opacity-0"
			}`}
		>
			<div
				className={`bg-white rounded-[19px] w-[320px] px-8 py-6 shadow-lg transform transition-all duration-300 ${
					show ? "scale-100 translate-y-0" : "scale-95 translate-y-2"
				}`}
				style={{ 
					boxShadow: "5px 10px 41.6px rgba(0, 0, 0, 0.17)",
					fontFamily: "NexonLv1Gothic"
				}}
			>
				<img src={checkIcon} className="mx-auto mb-3" />
				<p className="text-dark-gray text-lg text-center whitespace-nowrap">
					{text}
				</p>
			</div>
		</div>
	);
};

export default AlertDialog;
