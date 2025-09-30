import React, { useRef, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AddressSection } from "../../features/order/AddressSection";
import { DateSection } from "../../features/order/DateSection";
import { FlowerSection } from "../../features/order/FlowerSection";
import { ReceiverSection } from "../../features/order/ReceiverSection";
import { SenderSection } from "../../features/order/SenderSection";

const DeliveryPage: React.FC = () => {
	const navigate = useNavigate();
	
	// 각 섹션의 ref를 통해 validation 상태를 확인
	const receiverRef = useRef<{ isValid: () => boolean }>(null);
	const senderRef = useRef<{ isValid: () => boolean }>(null);
	const addressRef = useRef<{ isValid: () => boolean }>(null);
	const dateRef = useRef<{ isValid: () => boolean }>(null);

	const [buttonEnabled, setButtonEnabled] = useState(false);

	// validation 체크 함수
	const checkValidation = useCallback(() => {
		const isValid = (
			receiverRef.current?.isValid() &&
			senderRef.current?.isValid() &&
			addressRef.current?.isValid() &&
			dateRef.current?.isValid()
		);
		setButtonEnabled(!!isValid);
	}, []);

	// 주기적으로 validation 체크 (input 변경 시)
	React.useEffect(() => {
		const interval = setInterval(checkValidation, 500);
		return () => clearInterval(interval);
	}, [checkValidation]);

	return (
		<div className="min-h-screen flex flex-col items-center justify-center relative bg-background bg-cover bg-center text-center">
			<div className="flex flex-col items-center justify-center gap-y-10 mt-40">
				<FlowerSection />
				<ReceiverSection ref={receiverRef} />
				<SenderSection ref={senderRef} />
				<AddressSection ref={addressRef} />
				<DateSection ref={dateRef} />
				<button
					type="button"
					onClick={() => navigate("/")}
					className={`w-105 h-13.5 rounded-full text-white text-xl font-bold mb-10 transition-colors duration-200 ${
						buttonEnabled
							? "bg-primary hover:bg-primary/90"
							: "bg-gray/40 cursor-not-allowed"
					}`}
					style={{ fontFamily: "NexonLv1Gothic" }}
					disabled={!buttonEnabled}
				>
					결제하기
				</button>
			</div>
		</div>
	);
};

export default DeliveryPage;
