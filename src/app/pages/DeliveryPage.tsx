import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddressSection } from "../../features/archive/order/AddressSection";
import { DateSection } from "../../features/archive/order/DateSection";
import { ReceiverSection } from "../../features/archive/order/ReceiverSection";
import { SenderSection } from "../../features/archive/order/SenderSection";

const DeliveryPage: React.FC = () => {
	const navigate = useNavigate();
	const [validationStates, setValidationStates] = useState({
		receiver: false,
		sender: false,
		address: false,
		date: false,
	});

	const handleValidationChange = (section: keyof typeof validationStates, isValid: boolean) => {
		setValidationStates(prev => ({
			...prev,
			[section]: isValid
		}));
	};

	const isAllValid = Object.values(validationStates).every(isValid => isValid);

	return (
		<div className="min-h-screen flex flex-col items-center justify-center relative bg-background bg-cover bg-center text-center">
			<div className="flex flex-col items-center justify-center gap-y-10 mt-40">
				<ReceiverSection onValidationChange={(isValid) => handleValidationChange('receiver', isValid)} />
				<SenderSection onValidationChange={(isValid) => handleValidationChange('sender', isValid)} />
				<AddressSection onValidationChange={(isValid) => handleValidationChange('address', isValid)} />
				<DateSection onValidationChange={(isValid) => handleValidationChange('date', isValid)} />
				<button
					type="button"
					onClick={() => navigate("/")}
					className={`w-105 h-13.5 rounded-full text-white text-xl font-bold mb-10 transition-colors duration-200 ${
						isAllValid 
							? 'bg-primary hover:bg-primary/90' 
							: 'bg-gray/40 cursor-not-allowed'
					}`}
					style={{ fontFamily: "NexonLv1Gothic" }}
					disabled={!isAllValid}
				>
					결제하기
				</button>
			</div>
		</div>
	);
};

export default DeliveryPage;
