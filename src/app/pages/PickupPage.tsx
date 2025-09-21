import React from "react";
import GoogleMapComponent from "../../features/archive/order/GoogleMap";

const PickupPage: React.FC = () => {
	return (
		<div className="min-h-screen flex flex-col items-center justify-center relative bg-background bg-cover bg-center text-center">
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
				<GoogleMapComponent />
			</div>
		</div>
	);
};

export default PickupPage;
