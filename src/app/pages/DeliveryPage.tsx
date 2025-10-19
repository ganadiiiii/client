import React, { useCallback, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AddressSection } from "../../features/order/AddressSection";
import { DateSection } from "../../features/order/DateSection";
import { FlowerSection } from "../../features/order/FlowerSection";
import { ReceiverSection } from "../../features/order/ReceiverSection";
import { SenderSection } from "../../features/order/SenderSection";
import { TagSection } from "../../features/order/TagSection";
import type { FlowerCard } from "../../types/FlowerCard";

const DeliveryPage: React.FC = () => {
	const navigate = useNavigate();
	const location = useLocation();

	// 각 섹션의 ref를 통해 validation 상태를 확인
	const receiverRef = useRef<{ isValid: () => boolean }>(null);
	const senderRef = useRef<{ isValid: () => boolean }>(null);
	const addressRef = useRef<{ isValid: () => boolean }>(null);
	const dateRef = useRef<{ isValid: () => boolean }>(null);

	const [buttonEnabled, setButtonEnabled] = useState(false);

	// validation 체크 함수
	const checkValidation = useCallback(() => {
		const isValid =
			receiverRef.current?.isValid() &&
			senderRef.current?.isValid() &&
			addressRef.current?.isValid() &&
			dateRef.current?.isValid();
		setButtonEnabled(!!isValid);
	}, []);

	// 주기적으로 validation 체크 (input 변경 시)
	React.useEffect(() => {
		const interval = setInterval(checkValidation, 500);
		return () => clearInterval(interval);
	}, [checkValidation]);

	const flowerCard = location.state?.flowerCard as FlowerCard;
	if (!flowerCard) {
		navigate("/archive");
		return null;
	}

	return (
		<div className="min-h-screen flex flex-col items-center justify-center relative bg-background bg-cover bg-center text-center">
			<div className="flex flex-col items-center justify-center gap-y-10 mt-40">
				<FlowerSection flowerCard={flowerCard} />
				<ReceiverSection ref={receiverRef} />
				<TagSection />
				<SenderSection ref={senderRef} />
				<AddressSection ref={addressRef} />
				<DateSection ref={dateRef} />
				<button
					type="button"
					onClick={() => navigate("/")}
					className={`px-32 py-4.5 rounded-full text-lg font-semibold transition-all duration-200 mb-40 ${buttonEnabled
						? "bg-primary text-white hover:bg-primary/90 hover:scale-105 active:scale-95 cursor-pointer"
						: "bg-gray/20 text-gray"
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
