import { AnimatePresence, motion } from "framer-motion";
import { forwardRef, useImperativeHandle, useState } from "react";
import type { Address } from "react-daum-postcode";
import CustomPostcodeModal from "./CustomPostcodeModal";
import iconFullSvg from "../../assets/icon-full.svg";
import iconCheckSvg from "../../assets/icon-check.svg";

interface AddressSectionRef {
	isValid: () => boolean;
}

export const AddressSection = forwardRef<AddressSectionRef>((_, ref) => {
	const [zipcode, setZipcode] = useState("");
	const [address, setAddress] = useState("");
	const [detailAddress, setDetailAddress] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleComplete = (data: Address) => {
		const fullAddress = data.address;
		setZipcode(data.zonecode);
		setAddress(fullAddress);
		setIsModalOpen(false);
	};

	// Validation check
	useImperativeHandle(ref, () => ({
		isValid: () =>
			zipcode.length > 0 && address.length > 0 && detailAddress.length > 0,
	}));

	return (
		<section
			className="bg-transparent"
			style={{ width: "42.4375em", height: "25em" }}
		>
			<h2
				className="w-full text-start text-2xl font-bold text-black mb-2.5"
				style={{ fontFamily: "NexonLv1Gothic" }}
			>
				배송지
			</h2>
			<div
				className="p-9 rounded-[1.25em] bg-white w-full"
				style={{ boxShadow: "2px 2px 21.3px 0 rgba(0, 0, 0, 0.08)" }}
			>
				{/* 우편번호 */}
				<div className="flex flex-col mb-6">
					<LabelWithCheck label="우편번호" isFilled={!!zipcode} />
					<div className="flex justify-between items-center gap-2 mt-2.5">
						<input
							type="text"
							placeholder="우편번호를 입력해주세요"
							value={zipcode}
							readOnly
							className="w-[28em] h-[2.6em] px-5 rounded-full bg-gray/10 border border-gray/40 text-black/80 focus:outline-none"
							style={{ fontFamily: "NexonLv1Gothic" }}
						/>
						<button
							onClick={() => setIsModalOpen(true)}
							className="bg-gray/20 text-base text-black/60 px-6 py-2 rounded-full"
						>
							우편번호 찾기
						</button>
					</div>
				</div>

				{/* 주소지 */}
				<div className="flex flex-col mb-6">
					<LabelWithCheck label="주소지" isFilled={!!address} />
					<input
						type="text"
						placeholder="주소지를 입력해주세요"
						value={address}
						readOnly
						className="w-full h-[2.6em] px-5 mt-2.5 rounded-full bg-gray/10 border border-gray/40 text-black/80 focus:outline-none"
						style={{ fontFamily: "NexonLv1Gothic" }}
					/>
				</div>

				{/* 상세 주소지 */}
				<div className="flex flex-col">
					<LabelWithCheck label="상세 주소지" isFilled={!!detailAddress} />
					<input
						type="text"
						placeholder="상세 주소지를 입력해주세요"
						value={detailAddress}
						onChange={(e) => setDetailAddress(e.target.value)}
						className="w-full h-[2.6em] px-5 mt-2.5 rounded-full bg-gray/10 border border-gray/40 text-black/80 focus:outline-none"
						style={{ fontFamily: "NexonLv1Gothic" }}
					/>
				</div>
			</div>

			{/* 모달 */}
			<AnimatePresence>
				{isModalOpen && (
					<motion.div
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setIsModalOpen(false)}
					>
						<CustomPostcodeModal
							onClose={() => setIsModalOpen(false)}
							onComplete={handleComplete}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
});

function LabelWithCheck({
	label,
	isFilled,
}: {
	label: string;
	isFilled: boolean;
}) {
	return (
		<div className="flex items-center gap-2">
			<p
				className="text-black/60 text-base font-light"
				style={{ fontFamily: "NexonLv1Gothic" }}
			>
				{label}
			</p>
			<img
				src={isFilled ? iconFullSvg : iconCheckSvg}
				className="w-5 h-5"
				alt="check"
			/>
		</div>
	);
}
