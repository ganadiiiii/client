import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import bg from "../../assets/generate/result_bg.svg";

const CustomizingResultPage: React.FC = () => {
	const [leftPanelOpen, setLeftPanelOpen] = useState(false);
	const [rightPanelOpen, setRightPanelOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const anyOpen = leftPanelOpen || rightPanelOpen;
	const navigate = useNavigate();

	const handleSave = async () => {
		try {
			setIsSaving(true); // 저장 중 상태
			// 저장 로직 추가

			// 저장 성공
			setIsModalOpen(true);
		} catch (err) {
			console.error("저장 오류:", err);
			alert("저장에 실패했습니다.");
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<div
			className="relative w-full max-h-[1117px] bg-background bg-cover bg-center bg-no-repeat"
			style={{
				backgroundImage: `url(${bg})`,
			}}
		>
			{/* 메인 컨텐츠 */}
			<div
				className={`flex flex-col items-center justify-center min-h-screen px-8 transition-all duration-300`}
			>
				{/* 제목 */}
				<h1
					className="text-[27.5px] font-bold text-black/80 mb-5 mt-20 z-40"
					style={{ fontFamily: "NexonLv1Gothic" }}
				>
					커스텀 결과물
				</h1>

				{/* 꽃다발 영역 */}
				<div className="relative flex items-center justify-center z-40">
					{/* 좌측 설정 버튼 */}
					<button
						onClick={() => setLeftPanelOpen(!leftPanelOpen)}
						className="absolute left-[-20px] top-1/2 -translate-y-1/2 w-14 h-14 z-50"
					>
						<img src="/src/assets/generate/leftbutton.svg" alt="Left Button" />
					</button>

					{/* 꽃다발 카드 */}
					<div className="relative w-[480px] h-[462px]">
						<img
							src="/src/assets/generate/result_card.svg"
							alt="Card"
							className="absolute inset-0 w-full h-full rounded-[23px]"
						/>
						<img
							src="/src/assets/generate/image128.png"
							alt="꽃다발"
							className="absolute left-[62px] top-[13px] w-[355px] h-[410px] object-cover rounded-sm"
						/>
					</div>

					{/* 우측 설정 버튼 */}
					<button
						onClick={() => setRightPanelOpen(!rightPanelOpen)}
						className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-14 h-14 z-50"
					>
						<img
							src="/src/assets/generate/rightbutton.svg"
							alt="Right Button"
						/>
					</button>
				</div>

				{/* 하단 버튼들 */}
				<div className="flex flex-col items-center gap-6 mt-[-40px] z-40">
					<div className="relative">
						<button className="w-20 h-20 rounded-full flex items-center justify-center">
							<img
								src="/src/assets/generate/newdesign.svg"
								alt="New Design"
								className="w-20 h-20"
							/>
						</button>
						<p
							className="text-xs text-black mt-2 text-center text-3 text-normal"
							style={{ fontFamily: "Pretendard" }}
						>
							디자인 새로 생성
						</p>

						<div className="relative group">
							{/* 공유하기 버튼 */}
							<button
								className="absolute -left-16 top-[-24px] -translate-y-1/2 w-11 h-11 bg-[#FFDE87] rounded-full flex items-center justify-center hover:scale-105 transition-all duration-200"
								onClick={() => navigate("/customizing/card")}
							>
								<img src="/src/assets/generate/share.svg" alt="Left Button" />
							</button>
							{/* 레이블 */}
							<div className="absolute -left-[66px] top-[-95px] -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
								<div
									className="bg-white text-black text-sm py-5 px-7 rounded-[18px_18px_18px_0] border border-[#D9D9D9]"
									style={{
										fontFamily: "Pretendard",
										fontSize: "20px",
										fontWeight: "500",
									}}
								>
									공유하기
								</div>
							</div>
						</div>

						<div className="relative group">
							{/* 저장 버튼 */}
							<button
								className="absolute -right-16 top-[-24px] -translate-y-1/2 w-11 h-11 bg-[#FFDE87] rounded-full flex items-center justify-center hover:scale-105 transition-all duration-200"
								onClick={handleSave}
								disabled={isSaving}
							>
								<img src="/src/assets/generate/save.svg" alt="Right Button" />
							</button>
							{/* 레이블 */}
							<div className="absolute -right-[220px] top-[-95px] w-50 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
								<div
									className="bg-white text-black text-sm py-5 px-6 rounded-[18px_18px_18px_0] border border-[#D9D9D9]"
									style={{
										fontFamily: "Pretendard",
										fontSize: "20px",
										fontWeight: "500",
									}}
								>
									내 아카이빙에 저장
								</div>
							</div>
						</div>
					</div>
					<button
						className="px-26 py-4 rounded-full bg-[#FF9BAF] text-white text-5 font-bold"
						style={{ fontFamily: "NexonLv1Gothic" }}
						onClick={() => navigate("/order")}
					>
						주문하기
					</button>
				</div>

				{/* 뒤로가기 버튼 */}
				<button
					onClick={() => navigate(-1)}
					className="absolute top-[168px] left-[291px] w-14 h-14 rounded-full shadow-lg hover:scale-105 transition-all duration-200"
					style={{
						background:
							"linear-gradient(149deg, rgba(255, 255, 255, 0.1) 12%, rgba(255, 255, 255, 0.8) 60%)",
						boxShadow:
							"0px 3px 6px 0px rgba(0, 0, 0, 0.15), inset 2px 3px 1px 0px rgba(255, 255, 255, 0.51)",
					}}
				>
					<div className="flex items-center justify-center w-full h-full">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
							/>
						</svg>
					</div>
				</button>
			</div>
			{isModalOpen && (
				<div
					className="fixed inset-0 z-[60] flex items-center justify-center"
					onClick={() => setIsModalOpen(false)}
				>
					<div
						className="w-[388px] h-[405px] bg-white/85 rounded-xl flex flex-col items-center justify-center relative mb-8"
						onClick={(e) => e.stopPropagation()}
					>
						<img
							src="/src/assets/generate/success.svg"
							alt="Success"
							className="w-24 h-24"
						/>
						<p
							className="text-xl text-black"
							style={{
								fontFamily: "NexonLv1Gothic",
								fontSize: "20px",
								fontWeight: "700",
							}}
						>
							저장되었습니다
						</p>
					</div>
				</div>
			)}
			{/* === Overlay: 열렸을 때만 클릭 가능 === */}
			<div
				className={`fixed inset-0 z-20 backdrop-blur-sm transition-opacity
            ${anyOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
        `}
				onClick={() => {
					setLeftPanelOpen(false);
					setRightPanelOpen(false);
				}}
				aria-hidden={!anyOpen}
			/>

			{/* 좌측 패널 */}
			<aside
				role="dialog"
				aria-modal="true"
				aria-hidden={!leftPanelOpen}
				className={`
            fixed top-86 left-42 h-[423px] w-[577px] z-30 transition-all duration-300 ease-out
            ${
							leftPanelOpen
								? "translate-x-0 opacity-100 pointer-events-auto"
								: "translate-x-6 opacity-0 pointer-events-none"
						}
        `}
				style={{
					backgroundImage: "url('/src/assets/generate/left.svg')",
					backgroundSize: "cover",
				}}
			>
				<div className="relative h-full rounded-r-[23px] px-22 py-7">
					<div className="mb-4">
						<div className="flex items-end gap-6">
							{/* 디자인 이름 */}
							<div>
								<label
									className="block mb-2 font-medium text-black text-[15.5px]"
									style={{ fontFamily: "Pretendard" }}
								>
									디자인 이름
								</label>
								<div className="flex gap-2">
									<input
										type="text"
										// onChange={(e) => setDesignName(e.target.value)}
										className="w-[154px] h-[29px] px-2 border text-sm border-[#D9D9D9] rounded-sm bg-white"
										style={{ fontFamily: "Pretendard" }}
									/>
									<button
										className="w-[54px] h-[29px] bg-[#FFD1D4] rounded-sm text-sm"
										style={{ fontFamily: "Pretendard" }}
									>
										변경
									</button>
								</div>
							</div>
							{/* 꽃다발 크기 */}
							<div>
								<label
									className="block mb-2 text-black"
									style={{
										fontFamily: "Pretendard",
										fontSize: "15.5px",
										fontWeight: "500",
										lineHeight: "1.19",
									}}
								>
									꽃다발 크기
								</label>
								<div
									className="w-[33px] h-[29px] bg-white border rounded-sm flex items-center justify-center"
									style={{
										borderColor: "#D9D9D9",
										borderWidth: "0.77px",
									}}
								>
									<span
										className="text-black"
										style={{
											fontFamily: "Pretendard",
											fontSize: "13.1px",
											fontWeight: "400",
											lineHeight: "1.19",
										}}
									>
										M
									</span>
								</div>
							</div>
						</div>
					</div>

					{/* 꽃 종류 */}
					<div className="mb-4">
						<label
							className="block mb-2 text-black"
							style={{
								fontFamily: "Pretendard",
								fontSize: "15.5px",
								fontWeight: "500",
								lineHeight: "1.19",
							}}
						>
							꽃 종류
						</label>
						<div className="mb-2">
							<span
								className="text-black text-opacity-60 mr-3"
								style={{
									fontFamily: "Pretendard",
									fontSize: "14px",
									fontWeight: "500",
									lineHeight: "1.19",
								}}
							>
								메인
							</span>
							<div
								className="inline-flex h-[29px] bg-white border rounded-sm items-center justify-center px-[10px]"
								style={{
									borderColor: "#D9D9D9",
									borderWidth: "0.77px",
								}}
							>
								<span
									className="text-black"
									style={{
										fontFamily: "Pretendard",
										fontSize: "13.1px",
										fontWeight: "400",
										lineHeight: "normal",
									}}
								>
									장미
								</span>
							</div>
						</div>
						<div className="mb-2">
							<span
								className="text-black text-opacity-60 mr-3"
								style={{
									fontFamily: "Pretendard",
									fontSize: "14px",
									fontWeight: "500",
									lineHeight: "1.19",
								}}
							>
								서브
							</span>
							<div
								className="inline-flex h-[29px] bg-white border rounded-sm items-center justify-center px-[10px]"
								style={{
									borderColor: "#D9D9D9",
									borderWidth: "0.77px",
								}}
							>
								<span
									className="text-black"
									style={{
										fontFamily: "Pretendard",
										fontSize: "13.1px",
										fontWeight: "400",
										lineHeight: "1.19",
									}}
								>
									은방울꽃
								</span>
							</div>
						</div>
					</div>
					{/* 꽃말 */}
					<div className="mb-4">
						<label
							className="block mb-2 text-black"
							style={{
								fontFamily: "Pretendard",
								fontSize: "15.5px",
								fontWeight: "500",
								lineHeight: "1.19",
							}}
						>
							꽃말
						</label>
						<div className="flex flex-wrap gap-[5px]">
							{["사랑", "순애", "희망"].map((word, index) => (
								<div
									key={index}
									className="flex h-[29px] bg-white border rounded-sm flex items-center justify-center px-[10px]"
									style={{
										borderColor: "#D9D9D9",
										borderWidth: "0.77px",
									}}
								>
									<span
										className="text-black"
										style={{
											fontFamily: "Pretendard",
											fontSize: "13.1px",
											fontWeight: "400",
											lineHeight: "1.19",
										}}
									>
										{word}
									</span>
								</div>
							))}
						</div>
					</div>

					{/* 메시지 */}
					<div>
						<div className="flex items-center justify-between w-[341px] mb-2">
							<label
								className="block font-medium text-black text-[15.5px] items-center"
								style={{ fontFamily: "Pretendard" }}
							>
								메시지
							</label>
							<button
								className=" w-[54px] h-[29px] bg-[#FFD1D4] rounded-sm text-sm"
								style={{ fontFamily: "Pretendard" }}
							>
								저장
							</button>
						</div>
						<textarea
							className="w-[341px] h-[70px] p-2 border border-[#D9D9D9] text-sm rounded-sm resize-none bg-white"
							style={{ fontFamily: "Pretendard", fontSize: "13.1px" }}
						/>
					</div>
				</div>
			</aside>

			{/* 우측 패널 */}
			<aside
				role="dialog"
				aria-modal="true"
				aria-hidden={!rightPanelOpen}
				className={`
            fixed top-86 right-71 h-[423px] w-[453px] z-30 transition-all duration-300 ease-out
            ${
							rightPanelOpen
								? "translate-x-6 opacity-100 pointer-events-auto"
								: "translate-x-0 opacity-0 pointer-events-none"
						}
        `}
				style={{
					backgroundImage: "url('/src/assets/generate/right.svg')",
					backgroundSize: "cover",
				}}
			>
				{/* 우측 패널 내용 */}
			</aside>
		</div>
	);
};

export default CustomizingResultPage;
