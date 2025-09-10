import { motion, AnimatePresence } from "framer-motion";

interface DeleteConfirmModalProps {
	isOpen: boolean;
	friendName: string;
	onConfirm: () => void;
	onCancel: () => void;
}

const DeleteConfirmModal = ({
	isOpen,
	friendName,
	onConfirm,
	onCancel,
}: DeleteConfirmModalProps) => {
	return (
		<AnimatePresence>
			{isOpen && (
				<motion.div
					className="fixed inset-0 z-[60] flex items-center justify-center"
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
						className="bg-white rounded-3xl p-7 w-80"
						style={{
							boxShadow: "2.351px 3.135px 15.519px 0 rgba(0,0,0,0.25)",
						}}
						initial={{ scale: 0.7, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.7, opacity: 0 }}
						transition={{ type: "spring", damping: 25, stiffness: 300 }}
						onClick={(e) => e.stopPropagation()}
					>
						<div className="flex flex-col items-center justify-center gap-y-4.5">
							<p className="text-black text-center text-lg font-light whitespace-pre-line"
							style={{fontFamily: "NexonLv1Gothic"}}
							>
								{friendName}님을 친구목록에서<br />삭제하시겠습니까?
							</p>
							<div className="flex space-x-4">
								<button
									onClick={onConfirm}
									className="flex-1 px-11 py-3.5 text-white bg-primary rounded-3xl font-bold"
									style={{fontFamily: "NexonLv1Gothic"}}
								>
									삭제
								</button>
								<button
									onClick={onCancel}
									className="flex-1 px-11 py-3.5 text-gray bg-[#E3E3E3] rounded-3xl font-bold"
									style={{fontFamily: "NexonLv1Gothic"}}
								>
									취소
								</button>
							</div>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default DeleteConfirmModal;
