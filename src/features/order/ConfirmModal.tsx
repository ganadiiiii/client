import { AnimatePresence, motion } from "framer-motion";
import React from "react";

interface FriendRequestModalProps {
	isOpen: boolean;
	title?: string;
	message: string;
	confirmText: string;
	onConfirm: () => void;
	onCancel: () => void;
}

const FriendRequestModal: React.FC<FriendRequestModalProps> = ({
	isOpen,
	title,
	message,
	confirmText,
	onConfirm,
	onCancel,
}) => {
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="fixed inset-0 z-[60] flex items-center justify-center bg-modal-bg/60"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={(e) => {
						if (e.target === e.currentTarget) {
							onCancel();
						}
					}}
				>
					<motion.div
						className="bg-white rounded-3xl min-w-[280px] px-8 py-6 shadow-lg"
						style={{
							boxShadow: "2.351px 3.135px 15.519px 0 rgba(0,0,0,0.25)",
							fontFamily: "NexonLv1Gothic",
						}}
						initial={{ scale: 0.7, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.7, opacity: 0 }}
						transition={{ type: "spring", damping: 25, stiffness: 300 }}
						onClick={(e) => e.stopPropagation()}
					>
						{title && (
							<h2 className="text-black text-lg font-bold text-center whitespace-pre-line mb-2.5">
								{title}
							</h2>
						)}
						<p className="text-black text-base text-center whitespace-pre-line">
							{message}
						</p>
						<div className="flex justify-center gap-4 mt-4">
							<button
								onClick={() => onCancel()}
								className="flex-1 py-4.5 text-dark-gray bg-gray/20 rounded-full hover:bg-gray/30 transition-colors cursor-pointer"
							>
								취소
							</button>
							<button
								onClick={() => onConfirm()}
								className="flex-1 py-4.5 text-white bg-primary rounded-full hover:bg-primary/90 transition-colors cursor-pointer"
							>
								{confirmText}
							</button>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default FriendRequestModal;
