import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import SuccessModal from "../archive/components/SuccessModal";

type MessageType = {
	id: string;
	sender: "me" | "other";
	text?: string;
	image?: string;
};

const quickReplies = ["가격 문의", "날짜 문의", "시간 문의", "디자인 문의"];

const Talk: React.FC = () => {
	const navigate = useNavigate();
	const [messages, setMessages] = useState<MessageType[]>([]);
	const [input, setInput] = useState("");
	const [isProfileOpen, setIsProfileOpen] = useState(false);
	const messageEndRef = useRef<HTMLDivElement>(null);
    const [isPickupConfirmModalOpen, setIsPickupConfirmModalOpen] = useState(false);
    const [isEndChatConfirmModalOpen, setIsEndChatConfirmModalOpen] = useState(false);
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const today = new Date();
    const formattedDate = today.toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });

	// 자동 스크롤
	useEffect(() => {
		messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	// 빠른 버튼 클릭
	const handleQuickReply = (text: string) => {
		setMessages((prev) => [
			...prev,
			{
				id: crypto.randomUUID(),
				sender: "other",
				text: `플로리스트가 "${text}"에 대해 답변을 준비중입니다.`,
			},
		]);
	};

	// 텍스트 전송
	const handleSend = () => {
		if (input.trim()) {
			setMessages((prev) => [
				...prev,
				{ id: crypto.randomUUID(), sender: "me", text: input.trim() },
			]);
			setInput("");
		}
	};

	// 이미지 업로드
	const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const url = URL.createObjectURL(file);
			setMessages((prev) => [
				...prev,
				{ id: crypto.randomUUID(), sender: "me", image: url },
			]);
		}
	};

    const handlePickupConfirm = () => {
        setIsPickupConfirmModalOpen(false);
        setIsSuccessModalOpen(true);
    };

    const handleEndChatConfirm = () => {
        //로딩중 애니메이션 띄우기
        setIsEndChatConfirmModalOpen(false);
        navigate("/");
    };

    const handleCloseSuccessModal = () => {
        setIsSuccessModalOpen(false);
        navigate("/");
    };

	return (
		<div className="relative">
			{/* Main chat container */}
			<div 
				className={`relative w-[41.875em] h-[50.3em] rounded-2xl flex flex-col overflow-hidden px-7 pb-7 bg-white`}
				style={{
					boxShadow: "2px 2px 21.3px 0 rgba(0, 0, 0, 0.08)",
				}}
			>
			{/* 헤더 */}
			<div className="flex justify-between items-center px-2 py-10 border-b border-gray-300">
				<h1 className="text-2xl font-semibold" style={{ fontFamily: "NexonLv1Gothic" }}>꽃집이름</h1>
				<button onClick={() => setIsProfileOpen(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.75em" height="1.4375em" viewBox="0 0 28 23" fill="none">
                        <path d="M26.8591 0.664828H7.44608C7.29982 0.664828 7.18015 0.784498 7.18015 0.93076V2.79228C7.18015 2.93854 7.29982 3.05821 7.44608 3.05821H26.8591C27.0053 3.05821 27.125 2.93854 27.125 2.79228V0.93076C27.125 0.784498 27.0053 0.664828 26.8591 0.664828ZM26.8591 10.1054H7.44608C7.29982 10.1054 7.18015 10.2251 7.18015 10.3713V12.2328C7.18015 12.3791 7.29982 12.4988 7.44608 12.4988H26.8591C27.0053 12.4988 27.125 12.3791 27.125 12.2328V10.3713C27.125 10.2251 27.0053 10.1054 26.8591 10.1054ZM26.8591 19.546H7.44608C7.29982 19.546 7.18015 19.6656 7.18015 19.8119V21.6734C7.18015 21.8197 7.29982 21.9393 7.44608 21.9393H26.8591C27.0053 21.9393 27.125 21.8197 27.125 21.6734V19.8119C27.125 19.6656 27.0053 19.546 26.8591 19.546ZM0 1.86152C-3.64271e-09 2.10598 0.0481497 2.34804 0.1417 2.57389C0.23525 2.79974 0.372368 3.00496 0.545227 3.17781C0.718085 3.35067 0.923297 3.48779 1.14915 3.58134C1.375 3.67489 1.61706 3.72304 1.86152 3.72304C2.10598 3.72304 2.34804 3.67489 2.57389 3.58134C2.79974 3.48779 3.00495 3.35067 3.17781 3.17781C3.35067 3.00496 3.48779 2.79974 3.58134 2.57389C3.67489 2.34804 3.72304 2.10598 3.72304 1.86152C3.72304 1.61706 3.67489 1.375 3.58134 1.14915C3.48779 0.923297 3.35067 0.718085 3.17781 0.545227C3.00495 0.372368 2.79974 0.23525 2.57389 0.1417C2.34804 0.0481495 2.10598 0 1.86152 0C1.61706 0 1.375 0.0481495 1.14915 0.1417C0.923297 0.23525 0.718085 0.372368 0.545227 0.545227C0.372368 0.718085 0.23525 0.923297 0.1417 1.14915C0.0481497 1.375 -3.64271e-09 1.61706 0 1.86152ZM0 11.3021C-3.64271e-09 11.5465 0.0481497 11.7886 0.1417 12.0145C0.23525 12.2403 0.372368 12.4455 0.545227 12.6184C0.718085 12.7912 0.923297 12.9284 1.14915 13.0219C1.375 13.1155 1.61706 13.1636 1.86152 13.1636C2.10598 13.1636 2.34804 13.1155 2.57389 13.0219C2.79974 12.9284 3.00495 12.7912 3.17781 12.6184C3.35067 12.4455 3.48779 12.2403 3.58134 12.0145C3.67489 11.7886 3.72304 11.5465 3.72304 11.3021C3.72304 11.0576 3.67489 10.8156 3.58134 10.5897C3.48779 10.3639 3.35067 10.1586 3.17781 9.98579C3.00495 9.81293 2.79974 9.67581 2.57389 9.58226C2.34804 9.48871 2.10598 9.44056 1.86152 9.44056C1.61706 9.44056 1.375 9.48871 1.14915 9.58226C0.923297 9.67581 0.718085 9.81293 0.545227 9.98579C0.372368 10.1586 0.23525 10.3639 0.1417 10.5897C0.0481497 10.8156 -3.64271e-09 11.0576 0 11.3021ZM0 20.7426C-3.64271e-09 20.9871 0.0481497 21.2292 0.1417 21.455C0.23525 21.6809 0.372368 21.8861 0.545227 22.0589C0.718085 22.2318 0.923297 22.3689 1.14915 22.4625C1.375 22.556 1.61706 22.6042 1.86152 22.6042C2.10598 22.6042 2.34804 22.556 2.57389 22.4625C2.79974 22.3689 3.00495 22.2318 3.17781 22.0589C3.35067 21.8861 3.48779 21.6809 3.58134 21.455C3.67489 21.2292 3.72304 20.9871 3.72304 20.7426C3.72304 20.4982 3.67489 20.2561 3.58134 20.0303C3.48779 19.8044 3.35067 19.5992 3.17781 19.4264C3.00495 19.2535 2.79974 19.1164 2.57389 19.0228C2.34804 18.9293 2.10598 18.8811 1.86152 18.8811C1.61706 18.8811 1.375 18.9293 1.14915 19.0228C0.923297 19.1164 0.718085 19.2535 0.545227 19.4264C0.372368 19.5992 0.23525 19.8044 0.1417 20.0303C0.0481497 20.2561 -3.64271e-09 20.4982 0 20.7426Z" fill="#989898"/>
                    </svg>
				</button>
			</div>

			{/* 메시지 영역 */}
			<div className="flex-1 py-5 overflow-y-auto space-y-3">
				{/* 날짜 표시 */}
                <div className="w-full flex justify-center items-center">
				    <div className="text-center text-base text-gray rounded-full mb-2 px-6 py-2 bg-gray/10" style={{ fontFamily: "NexonLv1Gothic" }}>{formattedDate}</div>
                </div>

				{/* 시작 안내 메시지 */}
				<div className="flex items-start gap-3">
					<img
						src="/src/assets/order/avatar.png"
						alt="avatar"
						className="w-14 h-14 rounded-full"
					/>
                    <div className="flex flex-col gap-2 items-start justify-center">
                        <p className="text-lg text-black" style={{ fontFamily: "NexonLv1Gothic" }}>꽃집이름</p>
                        <div className="bg-[#FFEBEF] w-[17em] px-3 py-4 rounded-3xl text-lg text-black text-start font-normal" style={{ fontFamily: "NexonLv1Gothic" }}>
                            <p className="px-3 pb-2">안녕하세요 ‘꽃집이름’ 입니다.<br />어떤 것을 문의하고 싶으신가요?</p>
                            {quickReplies.map((label) => (
                                <button
                                    key={label}
                                    onClick={() => handleQuickReply(label)}
                                    className="w-full border-t border-gray-300 bg-white py-2.5 px-auto text-lg text-black text-center hover:bg-gray/50"
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>
				</div>

				{/* 메시지 목록 */}
				{messages.map((msg) => (
					<div
						key={msg.id}
						className={`flex ${
							msg.sender === "me" ? "justify-end" : "justify-start"
						}`}
					>
						<div
							className={`rounded-3xl px-6 py-4 max-w-[70%] text-lg text-black ${
								msg.sender === "me"
									? "bg-primary"
									: "bg-[#FFEBEF]"
							}`}
						>
							{msg.text && <p>{msg.text}</p>}
							{msg.image && (
								<img
									src={msg.image}
									alt="sent"
									className="mt-1 rounded-lg max-w-[12rem]"
								/>
							)}
						</div>
					</div>
				))}

				<div ref={messageEndRef} />
			</div>

			{/* 입력창 */}
			<div className="flex flex-col items-start border border-gray-300 bg-gray/10 px-6 py-4 rounded-3xl">
				<input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="메시지를 입력하세요."
					className="flex-1 border-none outline-none text-lg text-black/40 py-2" style={{ fontFamily: "NexonLv1Gothic" }}
				/>
                <div className="flex flex-row justify-between items-center w-full">
                    <label>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1.75em" height="1.75em" viewBox="0 0 28 28" fill="none">
                            <path d="M2 6.8C2 4.14903 4.14903 2 6.8 2H21.2C23.8509 2 26 4.14903 26 6.8V21.2C26 23.8509 23.8509 26 21.2 26H6.8C4.14903 26 2 23.8509 2 21.2V6.8Z" stroke="#AAAAAA" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M9.80078 12.8008C11.4576 12.8008 12.8008 11.4576 12.8008 9.80078C12.8008 8.14393 11.4576 6.80078 9.80078 6.80078C8.14393 6.80078 6.80078 8.14393 6.80078 9.80078C6.80078 11.4576 8.14393 12.8008 9.80078 12.8008Z" stroke="#AAAAAA" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M17.0322 14.7426L6.80078 25.9973H21.3601C23.9231 25.9973 26.0008 23.9196 26.0008 21.3566V21.1973C26.0008 20.6375 25.7909 20.4229 25.4127 20.0102L20.5773 14.7353C19.6234 13.6947 17.9819 13.6981 17.0322 14.7426Z" stroke="#AAAAAA" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                        />
                    </label>
                    <button
                        onClick={handleSend}
                        className="text-xl text-black/60 bg-gray/50 px-4 py-1.5 rounded-full"
                    >
                        전송
                    </button>
				</div>
			</div>

			{/* 사이드 패널 */}
			{isProfileOpen && (
				<div className="absolute inset-0 bg-modal-bg/60 z-40 rounded-2xl">
					{/* Side panel */}
					<div className="absolute top-0 right-0 w-[75%] h-full bg-white z-50 shadow-xl flex flex-col p-9">
                    <div className="w-full h-5 flex items-center justify-end mb-5">
                        <button onClick={() => setIsProfileOpen(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 19 19" fill="none">
                                <path d="M1.55664 1.5625L17.1578 17.1636M1.55664 17.1636L17.1578 1.5625" stroke="black" stroke-width="0.727513" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </button>
                    </div>
					<div className="px-auto pb-10 flex flex-col gap-4 items-center">
						<img src="/src/assets/order/avatar.png" className="w-24.5 h-24.5 rounded-full" />
						<h2 className="text-2xl font-bold" style={{ fontFamily: "NexonLv1Gothic" }}>꽃집이름</h2>
                        <button className="rounded-full border border-gray px-3 py-1">
                            <div className="flex flex-row block gap-1.5 items-center justify-center text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="0.9em" height="0.9em" viewBox="0 0 15 15" fill="none">
                                    <path d="M14.5 13.5384V8.30181C14.5 7.44905 14.1499 6.63363 13.5317 6.04629L8.57139 1.33402C7.97102 0.763657 7.02898 0.763657 6.42861 1.33403L1.46833 6.04629C0.850062 6.63363 0.5 7.44905 0.5 8.30181V13.5384C0.5 14.3976 1.19645 15.094 2.05556 15.094H12.9444C13.8036 15.094 14.5 14.3976 14.5 13.5384Z" stroke="#707070" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M5.16602 10.4266C5.16602 9.56752 5.86246 8.87109 6.72157 8.87109H8.27713C9.13626 8.87109 9.83268 9.56752 9.83268 10.4266V15.0933H5.16602V10.4266Z" stroke="#707070" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                                <p className="text-base text-black/60" style={{ fontFamily: "NexonLv1Gothic" }}>꽃집 정보</p>
                            </div>
                        </button>
					</div>
                    <hr className="w-full border-gray-300" />
                    <p className="w-full text-start text-base text-black/60 pt-6" style={{ fontFamily: "NexonLv1Gothic" }}>차단하기</p>
                    <p className="w-full text-start text-base text-black/60 pt-6" style={{ fontFamily: "NexonLv1Gothic" }}>1:1 채팅 운영 정책</p>
					<div className="mt-auto space-y-3">
						<button
							className="w-full py-6 items-center justify-center bg-primary rounded-3xl text-lg text-white"
							onClick={() => {
								setIsPickupConfirmModalOpen(true);
							}}
                            style={{ fontFamily: "NexonLv1Gothic" }}
						>
							픽업 확정하기
						</button>
						<button
							className="w-full py-6 items-center justify-center bg-gray/10 border border-gray-300 rounded-3xl text-lg font-light"
							onClick={() => {
								setIsEndChatConfirmModalOpen(true);
							}}
                            style={{ fontFamily: "NexonLv1Gothic" }}
						>
							채팅 종료하기
						</button>
					</div>
					</div>
				</div>
			)}

            {isPickupConfirmModalOpen && (
                <ConfirmModal
                    isOpen={isPickupConfirmModalOpen}
                    message="픽업을 확정하시겠어요?"
                    confirmText="확정"
                    onConfirm={handlePickupConfirm}
                    onCancel={() => setIsPickupConfirmModalOpen(false)}
                />
            )}

            {isEndChatConfirmModalOpen && (
                <ConfirmModal
                    isOpen={isEndChatConfirmModalOpen}
                    title="채팅방을 나가시겠어요?"
                    message={`채팅이 모두 삭제되며\n다시 확인하실 수 없습니다.`}
                    confirmText="나가기"
                    onConfirm={handleEndChatConfirm}
                    onCancel={() => setIsEndChatConfirmModalOpen(false)}
                />
            )}

            {isSuccessModalOpen && (
                <SuccessModal
                    isOpen={isSuccessModalOpen}
                    message="픽업이 확정 되었습니다"
                    onClose={handleCloseSuccessModal}
                />
            )}
			</div>
		</div>
	);
};

export default Talk;