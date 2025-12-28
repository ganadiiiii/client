import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { cardAPI } from "../../api";
import FlowerGrid from "../../features/archive/components/FlowerGrid";
import PageButton from "../../features/archive/components/PageButton";
import type { FlowerCard } from "../../types/FlowerCard";
import sofaSvg from "../../assets/archive/sofa.svg";
import characterPng from "../../assets/archive/character.png";
import homeLight from "../../assets/archive/home-light.png";
import homeDark from "../../assets/archive/home-dark.png";
import lampOn from "../../assets/archive/lamp-on.svg";
import lampOnHover from "../../assets/archive/lamp-on-hover.svg";
import lampOff from "../../assets/archive/lamp-off.svg";
import lampOffHover from "../../assets/archive/lamp-off-hover.svg";
import bgDaySvg from "../../assets/archive/bg.svg";
import bgSunsetSvg from "../../assets/archive/bg-sunset.svg";
import bgNightSvg from "../../assets/archive/bg-dark.svg";
import SimpleIconButton from "../../components/button/SimpleIconButton";
import iconBack from "../../assets/generate/result/icon-back.svg";

const FriendArchivePage = () => {
	const { userId } = useParams<{ userId: string }>();
	const navigate = useNavigate();

	type LightState = "day" | "sunset" | "night";
	const [lightState, setLightState] = useState<LightState>("day");
	const [isLampHovered, setIsLampHovered] = useState(false);

	// 카드 데이터 상태
	const [cards, setCards] = useState<FlowerCard[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(0);
	const [totalPages, setTotalPages] = useState(0);

	// 카드 데이터 가져오기
	useEffect(() => {
		const fetchCards = async () => {
			if (!userId) return;

			try {
				setIsLoading(true);
				const response = await cardAPI.getUserCards(userId, currentPage, 15);

				// 응답 데이터 구조 안전하게 처리
				if (response && response.items && Array.isArray(response.items) && response.items.length > 0) {
					// SharedCardDetail 배열을 FlowerCard 배열로 변환
					const flowerCards = response.items.map((sharedCard: {
						card: FlowerCard;
						note: string;
						fromName: string;
						toName: string;
					}) => ({
						...sharedCard.card,
						message: sharedCard.note,
						sender: sharedCard.fromName,
						receiver: sharedCard.toName,
					}));

					setCards(flowerCards);
					setTotalPages(response.totalPages || 0);
				} else {
					// 응답이 비어있거나 구조가 다른 경우
					setCards([]);
					setTotalPages(0);
				}
			} catch {
				// 에러 발생 시 빈 배열로 설정
				setCards([]);
				setTotalPages(0);
			} finally {
				setIsLoading(false);
			}
		};

		fetchCards();
	}, [userId, currentPage]);

	const toggleLight = () => {
		setLightState((prev) =>
			prev === "day" ? "sunset" : prev === "sunset" ? "night" : "day"
		);
	};

	// 페이지네이션 핸들러
	const goToNextPage = () => {
		if (currentPage < totalPages - 1) {
			setCurrentPage(currentPage + 1);
		}
	};

	const goToPreviousPage = () => {
		if (currentPage > 0) {
			setCurrentPage(currentPage - 1);
		}
	};

	// 뒤로가기 핸들러
	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<main className="overflow-hidden">
			{/* background image with smooth crossfade */}
			<div className="relative w-full h-screen flex justify-center pt-[139px] overflow-hidden">
				{/* Light background layer */}
				<div
					className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-400 ease-in-out pointer-events-none"
					style={{
						backgroundImage: `url(${bgDaySvg})`,
						opacity: lightState === "day" ? 1 : 0,
					}}
				/>
				{/* Sunset background layer */}
				<div
					className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-400 ease-in-out pointer-events-none"
					style={{
						backgroundImage: `url(${bgSunsetSvg})`,
						opacity: lightState === "sunset" ? 1 : 0,
					}}
				/>
				{/* Dark background layer */}
				<div
					className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-400 ease-in-out pointer-events-none"
					style={{
						backgroundImage: `url(${bgNightSvg})`,
						opacity: lightState === "night" ? 1 : 0,
					}}
				/>
				{/* 배경 역할을 하는 home 이미지 */}
				<div className="relative w-full h-[calc(100vh-10em-80px)] 3xl:h-[calc(100vh-8em-102px)]">
					<img src={{ day: homeLight, sunset: homeLight, night: homeDark }[lightState]}
						alt="Home background"
						className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
						style={{
							width: "102em",
							height: "53em",
						}}
					/>
					<div
						className="absolute z-10 group flex bottom-[42em] left-1/2 cursor-pointer w-22 h-35 justify-center items-center"
						style={{
							transform: "translate(-50%, -5%)",
						}}
						onMouseEnter={() => setIsLampHovered(true)}
						onMouseLeave={() => setIsLampHovered(false)}
						onClick={toggleLight}
					>
						{lightState !== "night" ? (
							<img
								src={isLampHovered ? lampOnHover : lampOn}
								alt="Lamp"
								className={`pointer-events-none ${isLampHovered ? "scale-121" : ""}`}
							/>
						) : (
							<img
								src={isLampHovered ? lampOffHover : lampOff}
								alt="Lamp"
								className={`pointer-events-none ${isLampHovered ? "scale-118" : ""}`}
							/>
						)}
					</div>
					{/* --- 그리드 및 네비게이션을 포함하는 컨테이너 --- */}
					<div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-3em] cursor-not-allowed">
						{!isLoading && (!cards || cards.length === 0) ? (
							<div className="text-center text-gray text-lg">
								<p style={{ fontFamily: "NexonLv1Gothic" }}>
									이 친구는 아직 카드를 만들지 않았습니다.
								</p>
							</div>
						) : (
							<FlowerGrid
								cards={cards || []}
								isLoading={isLoading}
							/>
						)}
					</div>

					{/* 페이지네이션 */}
					<div className="absolute bottom-[-3em] left-1/2 transform -translate-x-1/2 gap-[160px] w-full flex flex-row justify-center items-center">
						{/* 왼쪽 화살표 버튼 */}
						<PageButton
							direction="left"
							onClick={goToPreviousPage}
							disabled={currentPage === 0}
						/>

						{/* 페이지 번호 레이블 */}
						<span
							className="font-bold text-[#868686] text-lg w-12 text-center"
							style={{ fontFamily: "NEXONLv1Gothic" }}
						>
							{currentPage + 1} / {totalPages}
						</span>

						{/* 오른쪽 화살표 버튼 */}
						<PageButton
							direction="right"
							onClick={goToNextPage}
							disabled={currentPage >= totalPages - 1}
						/>
					</div>

					{/* 뒤로가기 버튼 */}
					<SimpleIconButton
						onClick={handleGoBack}
						icon={iconBack}
						label="돌아가기"
						className="absolute left-1/10 top-6"
					/>

					<div
						className="absolute left-1/2 bottom-0 z-10"
						style={{
							width: "25em",
							height: "26.5em",
							transform: "translate(calc(-50% + 33.75em), calc(-50% + 15em))",
						}}
					>
						<img src={sofaSvg} alt="Sofa" />
						<img
							src={characterPng}
							alt="Character"
							className="absolute top-1/2 left-1/2 transform -translate-x-2/3 -translate-y-1/2"
							style={{
								width: "14em",
								height: "14em",
							}}
						/>
					</div>
				</div>
			</div>
		</main>
	);
};

export default FriendArchivePage;
