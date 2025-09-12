import { AnimatePresence, motion } from "framer-motion";

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
						className="bg-white rounded-3xl w-[280px] px-8 py-6"
						style={{
							boxShadow: "2.351px 3.135px 15.519px 0 rgba(0,0,0,0.25)",
							fontFamily: "NexonLv1Gothic",
						}}
						initial={{ scale: 0.7, opacity: 0, y: 20 }}
						animate={{ scale: 1, opacity: 1, y: 0 }}
						exit={{ scale: 0.7, opacity: 0, y: 20 }}
						transition={{ type: "spring", damping: 25, stiffness: 300 }}
						onClick={(e) => e.stopPropagation()}
					>
						<img
							src="/src/assets/archive/complete.svg"
							className="mx-auto mb-3"
						/>
						<p className="text-dark-gray text-lg text-center whitespace-nowrap">
							{message}
						</p>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default SuccessModal;
