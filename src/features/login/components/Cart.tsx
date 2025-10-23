import React from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../../assets/generate/bg.svg";
import cartPng from "../../../assets/cart.png";

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
				<img src={cartPng} alt="chat" className="w-[10.8em] h-[13.2em] mb-9" />
				<p
					className="text-black text-center font-semibold whitespace-nowrap text-3xl mb-14"
					style={{
						fontFamily: "NexonLv1Gothic",
						lineHeight: "1.39",
					}}
				>
					주문내역이 없어요!
				</p>
				<button className="px-32 py-4.5 rounded-full text-lg font-semibold transition-all duration-200 bg-primary text-white hover:bg-primary/90 hover:scale-105 active:scale-95 cursor-pointer" style={{ fontFamily: "NexonLv1Gothic", fontWeight: "600", }} onClick={() => navigate("/archive")}>
					주문하러 가기
				</button>
			</div>
		</div>
	);
};

export default Cart;
