import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CalendarModal } from "./CalendarModal";
import { TimePickerModal } from "./TimePickerModal";

interface DateSectionProps {
	onValidationChange: (isValid: boolean) => void;
}

export function DateSection({ onValidationChange }: DateSectionProps) {
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");
	const [isDateModalOpen, setIsDateModalOpen] = useState(false);
	const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);

	const handleDateSelect = (selectedDate: Date) => {
		const formatted = selectedDate
			.toLocaleDateString("ko-KR")
			.replace(/\. /g, ".")
			.replace(/\.$/, "");
		setDate(formatted);
	};

	const handleTimeSelect = (meridiem: string, hour: string, minute: string) => {
		const formatted = `${meridiem} ${hour}시 ${minute}분`;
		setTime(formatted);
		setIsTimeModalOpen(false);
	};

	// Validation check
	useEffect(() => {
		const isValid = date.length > 0 && time.length > 0;
		onValidationChange(isValid);
	}, [date, time, onValidationChange]);

	return (
		<section
			className="bg-transparent"
			style={{ width: "42.4375em", height: "20em" }}
		>
			<h2
				className="w-full text-start text-2xl font-bold text-black mb-2.5"
				style={{ fontFamily: "NexonLv1Gothic" }}
			>
				배송날짜/시간 선택
			</h2>
			<div
				className="p-9 rounded-[1.25em] bg-white w-full"
				style={{ boxShadow: "2px 2px 21.3px 0 rgba(0, 0, 0, 0.08)" }}
			>
				{/* 배송날짜 */}
				<div className="flex flex-col mb-6">
					<LabelWithCheck label="배송날짜" isFilled={!!date} />
					<div className="flex justify-between items-center gap-2 mt-2.5">
						<input
							type="text"
							placeholder="YYYY.MM.DD"
							value={date}
							readOnly
							onClick={() => setIsDateModalOpen(true)}
							className="w-full h-[2.6em] px-5 mt-2.5 rounded-full bg-gray/10 border border-gray/40 text-black/80 focus:outline-none"
							style={{ fontFamily: "NexonLv1Gothic" }}
						/>
					</div>
				</div>

				{/* 배송시간 */}
				<div className="flex flex-col">
					<LabelWithCheck label="배송시간" isFilled={!!time} />
					<input
						type="text"
						placeholder="오전 12시 00분"
						value={time}
						onClick={() => setIsTimeModalOpen(true)}
						onChange={(e) => setTime(e.target.value)}
						className="w-full h-[2.6em] px-5 mt-2.5 rounded-full bg-gray/10 border border-gray/40 text-black/80 focus:outline-none"
						style={{ fontFamily: "NexonLv1Gothic" }}
					/>
				</div>
			</div>

			{/* 모달 */}
			<AnimatePresence>
				{isDateModalOpen && (
					<motion.div
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setIsDateModalOpen(false)}
					>
						<CalendarModal
							onSelectDate={handleDateSelect}
							onClose={() => setIsDateModalOpen(false)}
						/>
					</motion.div>
				)}
				{isTimeModalOpen && (
					<motion.div
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={() => setIsTimeModalOpen(false)}
					>
						<TimePickerModal
							date={new Date(date)}
							onClose={() => setIsTimeModalOpen(false)}
							onSelectTime={handleTimeSelect}
						/>
					</motion.div>
				)}
			</AnimatePresence>
		</section>
	);
}

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
				src={
					isFilled ? "/src/assets/icon-full.svg" : "/src/assets/icon-check.svg"
				}
				className="w-5 h-5"
				alt="check"
			/>
		</div>
	);
}
