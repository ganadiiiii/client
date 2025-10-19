import React from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../../assets/generate/bg.svg";

const Cart: React.FC = () => {
	const navigate = useNavigate();

	return (
		<div
			className="min-h-screen flex flex-col items-center justify-center relative bg-background bg-cover bg-center text-center"
			style={{
				backgroundImage: `url(${bg})`,
			}}
		>
			<div className="flex flex-col items-center justify-center">
				<img src="/src/assets/cart.png" alt="chat" className="w-[10.8em] h-[13.2em] mb-9" />
				<p
					className="text-black text-center font-semibold whitespace-nowrap text-3xl mb-14"
					style={{
						fontFamily: "NexonLv1Gothic",
						lineHeight: "1.39",
					}}
				>
					주문내역이 없어요!
				</p>
				<button className="cursor-pointer py-4.5 px-32 text-lg font-semibold rounded-full flex items-center justify-center bg-primary text-white hover:scale-105 transition-all duration-200 hover:bg-primary/90 active:scale-95" style={{ fontFamily: "NexonLv1Gothic" }} onClick={() => navigate("/archive")}>
					주문하러 가기
				</button>
			</div>
		</div>
	);
};

export default Cart;
