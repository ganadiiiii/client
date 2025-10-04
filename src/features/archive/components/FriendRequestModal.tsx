import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import type { Friend } from "../hooks/useFriendsManager";

interface FriendRequestModalProps {
	isOpen: boolean;
	selectedRequest: Friend | null;
	onClose: () => void;
	onAccept: (friend: Friend) => void;
	onReject: (friend: Friend) => void;
}

const FriendRequestModal: React.FC<FriendRequestModalProps> = ({
	isOpen,
	selectedRequest,
	onClose,
	onAccept,
	onReject,
}) => {
	return (
		<AnimatePresence>
			{isOpen && selectedRequest && (
				<motion.div
					className="fixed inset-0 z-[80] flex items-center justify-center"
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
						<p className="text-black text-lg text-center whitespace-pre-line">
							{selectedRequest.name}님의 친구요청을
							<br />
							수락하시겠습니까?
						</p>
						<div className="flex justify-center gap-4 mt-4">
							<button
								onClick={() => onAccept(selectedRequest)}
								className="flex-1 py-4.5 text-white bg-primary rounded-full hover:bg-primary/90 transition-colors cursor-pointer"
							>
								수락
							</button>
							<button
								onClick={() => onReject(selectedRequest)}
								className="flex-1 py-4.5 text-dark-gray bg-gray/20 rounded-full hover:bg-gray/30 transition-colors cursor-pointer"
							>
								거절
							</button>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	);
};

export default FriendRequestModal;
