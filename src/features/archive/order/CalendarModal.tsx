import { useEffect, useRef } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css";

interface CalendarModalProps {
	onSelectDate: (date: Date) => void;
	onClose: () => void;
}

export function CalendarModal({ onSelectDate, onClose }: CalendarModalProps) {
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

	const handleDateChange = (value: Date | Date[] | null) => {
		if (!value || Array.isArray(value)) return;

		const formatted = value
			.toLocaleDateString("ko-KR")
			.replace(/\. /g, ".")
			.replace(/\.$/, "");
		onSelectDate(new Date(formatted));
		onClose();
	};

	return (
		<div
			className="fixed inset-0 z-50 flex items-center justify-center bg-modal-bg/60"
			onClick={onClose}
		>
			<div
				ref={modalRef}
				className="bg-white p-6 rounded-[1.25em] w-[25.4em] h-[31.7em]"
				onClick={(e) => e.stopPropagation()} // 모달 내부 클릭 시 닫히지 않게
			>
				<Calendar
					onChange={(value) => handleDateChange(value as Date | Date[] | null)}
					calendarType="gregory"
					minDetail="year"
					maxDetail="month"
					prev2Label={null}
					next2Label={null}
					formatDay={(locale, date) =>
						date.toLocaleString("en", { day: "numeric" })
					}
					className="custom-calendar"
					tileDisabled={({ date, view }) =>
						view === "year" &&
						date < new Date(new Date().getFullYear(), new Date().getMonth(), 1)
					}
				/>
			</div>
		</div>
	);
}
