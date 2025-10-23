import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import iconUpSvg from "../../assets/order/icon-up.svg";
import iconDownSvg from "../../assets/order/icon-down.svg";

interface TimePickerModalProps {
	date: Date;
	onClose: () => void;
	onSelectTime: (meridiem: string, hour: string, minute: string) => void;
}

const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
const minutes = Array.from({ length: 6 }, (_, i) =>
	(i * 10).toString().padStart(2, "0"),
);
const meridiems = ["오전", "오후"];

export function TimePickerModal({
	date,
	onClose,
	onSelectTime,
}: TimePickerModalProps) {
	const [meridiem, setMeridiem] = useState("오전");
	const [hour, setHour] = useState("12");
	const [minute, setMinute] = useState("00");

	const modalRef = useRef<HTMLDivElement>(null);

	// 바깥 클릭 시 닫힘 처리
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				onClose();
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [onClose]);

	const handleTimeSelect = () => {
		onSelectTime(meridiem, hour, minute);
		onClose();
	};

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-modal-bg/60"
			onClick={onClose}
		>
			<div
				ref={modalRef}
				className="bg-white p-6 rounded-[1.25em] w-[25.4em] h-[17em] flex flex-col items-center"
				onClick={(e) => e.stopPropagation()}
			>
				<p
					className="text-xl font-bold mb-6 text-dark-gray"
					style={{ fontFamily: "NexonLv1Gothic" }}
				>
					{date.toLocaleDateString("ko-KR", {
						year: "numeric",
						month: "long",
						day: "numeric",
						weekday: "long",
					})}
				</p>

				<div className="flex gap-2 items-center">
					<TimeColumn
						list={meridiems}
						selected={meridiem}
						setSelected={setMeridiem}
					/>
					<p className="text-xl">:</p>
					<TimeColumn list={hours} selected={hour} setSelected={setHour} />
					<p className="text-xl">:</p>
					<TimeColumn
						list={minutes}
						selected={minute}
						setSelected={setMinute}
					/>
				</div>

				<button
					onClick={handleTimeSelect}
					className="w-full mt-6 px-6 py-2 bg-primary text-white rounded-full text-xl"
					style={{ fontFamily: "NexonLv1Gothic" }}
				>
					선택 완료
				</button>
			</div>
		</div>
	);
}

interface TimeColumnProps {
	list: string[];
	selected: string;
	setSelected: (value: string) => void;
}

function TimeColumn({ list, selected, setSelected }: TimeColumnProps) {
	const index = list.indexOf(selected);

	const handleUp = () => {
		const newIndex = (index - 1 + list.length) % list.length;
		setSelected(list[newIndex]);
	};

	const handleDown = () => {
		const newIndex = (index + 1) % list.length;
		setSelected(list[newIndex]);
	};

	return (
		<div className="flex flex-col items-center gap-2">
				<img
				src={iconUpSvg}
				alt="up"
				className="w-6 h-4 cursor-pointer"
				onClick={handleUp}
			/>
			<div
				className="w-[5.2em] h-[2.5em] border border-gray/40 rounded-full flex items-center justify-center text-xl text-dark-gray font-bold py-2"
				style={{ fontFamily: "NexonLv1Gothic" }}
			>
				<AnimatePresence mode="wait">
					<motion.div
						key={selected}
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: -20, opacity: 0 }}
						transition={{ duration: 0.25 }}
					>
						{selected}
					</motion.div>
				</AnimatePresence>
			</div>
				<img
				src={iconDownSvg}
				alt="down"
				className="w-6 h-4 cursor-pointer"
				onClick={handleDown}
			/>
		</div>
	);
}
