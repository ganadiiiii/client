import React from "react";
import { useNavigate } from "react-router-dom";

const OrderPage: React.FC = () => {
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
                        className="w-60 h-77.5 rounded-3xl flex flex-col items-center justify-end bg-white px-7 pt-11 pb-3.5"
                        style={{boxShadow: "2.182px 2.182px 3.71px rgba(0, 0, 0, 0.10)"}}
                        onClick={() => {
                            navigate("/shop/delivery");
                        }}
                    >
                        <img src="/src/assets/order/delivery.svg" alt="order" className="w-full h-29"/>
                        <p className="text-black text-2xl font-bold mt-15"
                            style={{fontFamily: "Yidstreet"}}
                        >배달</p>
                    </button>
                    <button 
                        className="w-60 h-77.5 rounded-3xl flex flex-col items-center justify-end bg-white px-7 pt-11 pb-3.5"
                        style={{boxShadow: "2.182px 2.182px 3.71px rgba(0, 0, 0, 0.10)"}}
                        onClick={() => {
                            navigate("/shop/pickup");
                        }}
                    >
                        <img src="/src/assets/order/pickup.png" alt="order" className="w-full h-38"/>
                        <p className="text-black text-2xl font-bold mt-15"
                            style={{fontFamily: "Yidstreet"}}
                        >픽업</p>
                    </button>
                </div>
			</div>
		</div>
    )
};

export default OrderPage;