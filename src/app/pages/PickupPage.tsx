import React from "react";
import GoogleMapComponent from "../../features/order/GoogleMap";
import { useNavigate } from "react-router-dom";

const PickupPage: React.FC = () => {
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
					픽업할 꽃집을 선택해주세요
				</h1>
				<div className="w-full h-full" onClick={() => navigate("/shop/pickup/chat-start")}>
					<GoogleMapComponent />
				</div>
			</div>
		</div>
	);
};

export default PickupPage;
