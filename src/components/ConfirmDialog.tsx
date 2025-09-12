import React, { useEffect, useState } from "react";

interface ConfirmDialogProps {
	text: string;
	isVisible: boolean;
	onClose: () => void;
	onConfirm: () => void;
	confirmText: string;
	cancelText: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
	text,
	isVisible,
	onClose,
	onConfirm,
	confirmText,
	cancelText,
}) => {
	const [show, setShow] = useState(false);

	useEffect(() => {
		if (isVisible) {
			setShow(true);
		}
	}, [isVisible]);

	if (!isVisible) return null;

	return (
		<div
			className={`fixed inset-0 flex items-center justify-center z-50 -left-[10px] pointer-events-auto transition-opacity duration-300 ${
				show ? "opacity-100" : "opacity-0"
			}`}
		>
			<div
				className={`bg-white rounded-3xl min-w-[280px] px-8 py-6 shadow-lg transform transition-all duration-300 ${
					show ? "scale-100 translate-y-0" : "scale-95 translate-y-2"
				}`}
				style={{
					boxShadow: "5px 10px 41.6px rgba(0, 0, 0, 0.17)",
					fontFamily: "NexonLv1Gothic",
				}}
			>
				<p className="text-black text-lg text-center whitespace-pre-line">
					{text}
				</p>
				<div className="flex justify-center gap-4 mt-4">
					<button
						onClick={onConfirm}
						className="flex-1 py-4.5 text-white bg-primary rounded-full hover:bg-primary/90 transition-colors cursor-pointer"
					>
						{confirmText}
					</button>
					<button
						onClick={() => {
							setShow(false);
							setTimeout(onClose, 300);
						}}
						className="flex-1 py-4.5 text-dark-gray bg-gray/20 rounded-full hover:bg-gray/30 transition-colors cursor-pointer"
					>
						{cancelText}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ConfirmDialog;
