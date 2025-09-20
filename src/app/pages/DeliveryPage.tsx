import React from "react";
import { useNavigate } from "react-router-dom";
import { ReceiverSection } from "../../features/archive/order/ReceiverSection";
import { SenderSection } from "../../features/archive/order/SenderSection";
import { AddressSection } from "../../features/archive/order/AddressSection";
import { CalendarSection } from "../../features/archive/order/CalendarSection";

const DeliveryPage: React.FC = () => {
    const navigate = useNavigate();
	return (
        <div className="min-h-screen flex flex-col items-center justify-center relative bg-background bg-cover bg-center text-center">
            <div className="flex flex-col items-center justify-center gap-y-10 mt-40">
                <ReceiverSection />
                <SenderSection />
                <AddressSection />
                <CalendarSection />
                <button 
                    type="button"
                    onClick={() => navigate('/')}
                    className="w-105 h-13.5 bg-gray/40 rounded-full text-white text-xl font-bold mb-10"
                    style={{fontFamily: "NexonLv1Gothic"}}
                >
                    결제하기
                </button>
			</div>
		</div>
    )
};

export default DeliveryPage;