import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderPage: React.FC = () => {
    const [isDeliveryHovered, setIsDeliveryHovered] = useState(false);
    const [isPickupHovered, setIsPickupHovered] = useState(false);
    const navigate = useNavigate();
	return (
        <div
			className="min-h-screen flex flex-col items-center justify-center relative bg-background bg-cover bg-center text-center"
			style={{
				backgroundImage: "url('./src/assets/generate/bg.svg')",
			}}
		>
            <div className="flex flex-col items-center justify-center">
				<h1
					className="text-black text-center mb-19 font-bold whitespace-nowrap text-3xl"
					style={{
						fontFamily: "NexonLv1Gothic",
					    fontWeight: "700",
						lineHeight: "1.39",
					}}
				>
					주문방식을 선택해주세요
				</h1>
                <div className="flex flex-row gap-x-5">
                    <button 
                        className="w-60 h-77.5 rounded-3xl flex flex-col items-center justify-end bg-white p-4"
                        style={{boxShadow: "2.182px 2.182px 3.71px rgba(0, 0, 0, 0.10)"}}
                        onMouseEnter={() => setIsDeliveryHovered(true)}
                        onMouseLeave={() => setIsDeliveryHovered(false)}
                        onClick={() => {
                            navigate("/shop/delivery");
                        }}
                    >
                        <div className="relative flex w-full h-full items-center justify-center">
                            {isDeliveryHovered ? (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 213 237" fill="none" className="absolute inset-0 w-full h-full z-10">
                                        <path d="M192.903 0.863281C203.527 0.863445 212.14 9.47574 212.14 20.0996V217.114C212.14 227.738 203.527 236.351 192.903 236.352H19.4629C8.83889 236.352 0.226589 227.738 0.226562 217.114V24.2725H73.1396L89.1104 0.863281H192.903Z" fill="#CAE4FF"/>
                                    </svg>
                                    <img src="/src/assets/order/delivery.png" alt="delivery" className="absolute left-1/2 bottom-10 transform -translate-x-1/2 w-50 h-30 z-20"/>
                                </>
                            ) : (
                                <img src="/src/assets/order/delivery.png" alt="delivery" className="absolute left-1/2 bottom-10 transform -translate-x-1/2 w-50 h-30 z-20"/>
                            )}
                        </div>
                        <p className="text-black text-2xl font-bold mt-4"
                            style={{fontFamily: "Yidstreet"}}
                        >배달</p>
                    </button>
                    <button 
                        className="w-60 h-77.5 rounded-3xl flex flex-col items-center justify-end bg-white p-4"
                        style={{boxShadow: "2.182px 2.182px 3.71px rgba(0, 0, 0, 0.10)"}}
                        onMouseEnter={() => setIsPickupHovered(true)}
                        onMouseLeave={() => setIsPickupHovered(false)}
                        onClick={() => {
                            navigate("/shop/pickup");
                        }}
                    >
                        <div className="relative flex w-full h-full items-center justify-center">
                            {isPickupHovered ? (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 213 237" fill="none" className="absolute inset-0 w-full h-full z-10">
                                        <path d="M192.903 0.863281C203.527 0.863445 212.14 9.47574 212.14 20.0996V217.114C212.14 227.738 203.527 236.351 192.903 236.352H19.4629C8.83889 236.352 0.226589 227.738 0.226562 217.114V24.2725H73.1396L89.1104 0.863281H192.903Z" fill="#CAE4FF"/>
                                    </svg>
                                    <img src="/src/assets/order/pickup.png" alt="pickup" className="absolute left-1/2 bottom-10 transform -translate-x-1/2 w-50 h-38 z-20"/>
                                </>
                            ) : (
                                <img src="/src/assets/order/pickup.png" alt="pickup" className="absolute left-1/2 bottom-10 transform -translate-x-1/2 w-50 h-38 z-20"/>
                            )}
                        </div>
                        <p className="text-black text-2xl font-bold mt-4"
                            style={{fontFamily: "Yidstreet"}}
                        >픽업</p>
                    </button>
                </div>
			</div>
		</div>
    )
};

export default OrderPage;