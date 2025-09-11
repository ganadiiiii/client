import { motion, AnimatePresence } from "framer-motion";

interface SuccessModalProps {
	isOpen: boolean;
	message: string;
	onClose: () => void;
}

const SuccessModal = ({ isOpen, message, onClose }: SuccessModalProps) => {
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="fixed inset-0 z-[70] flex items-center justify-center"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					onClick={(e) => {
						if (e.target === e.currentTarget) {
							onClose();
						}
					}}
				>
					<motion.div
						className="bg-white rounded-3xl p-7 w-80"
						style={{
							boxShadow: "2.351px 3.135px 15.519px 0 rgba(0,0,0,0.25)",
						}}
						initial={{ scale: 0.7, opacity: 0, y: 20 }}
						animate={{ scale: 1, opacity: 1, y: 0 }}
						exit={{ scale: 0.7, opacity: 0, y: 20 }}
						transition={{ type: "spring", damping: 25, stiffness: 300 }}
						onClick={(e) => e.stopPropagation()}
					>
						<div className="flex flex-col items-center justify-center gap-y-2">
							<img src="/src/assets/archive/complete.svg" alt="Success" className="w-9.5 h-9.5" />
							<p className="text-black text-center text-lg font-light whitespace-pre-line"
							style={{fontFamily: "NexonLv1Gothic"}}
							>
								{message}
							</p>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default SuccessModal;
