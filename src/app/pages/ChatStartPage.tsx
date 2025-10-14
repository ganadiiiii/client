import React from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/generate/bg.svg";

const ChatStartPage: React.FC = () => {
    const navigate = useNavigate();
	return (
		<div
			className="min-h-screen flex flex-col items-center justify-center relative bg-background bg-cover bg-center text-center"
			style={{
				backgroundImage: `url(${bg})`,
			}}
		>
			<div className="flex flex-col items-center justify-center">
                <img src="/src/assets/order/chat.png" alt="chat" className="w-[26.25em] h-[14.75em] mb-9" />
				<p
					className="text-black text-center font-semibold whitespace-nowrap text-3xl mb-14"
					style={{
						fontFamily: "NexonLv1Gothic",
						lineHeight: "1.39",
					}}
				>
					플로리스트와 1:1 채팅을 통해<br />
                    날짜, 시간, 요구사항 등을 자세히 소통할 수 있어요!
				</p>
                <button className="py-4 px-32 rounded-full flex items-center justify-center bg-primary text-white text-white text-lg" style={{ fontFamily: "NexonLv1Gothic" }} onClick={() => navigate("/shop/pickup/chat")}>
                    1:1 상담 시작하기
                </button>
			</div>
		</div>
	);
};

export default ChatStartPage;
