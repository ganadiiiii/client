import { useState } from "react";
import Bubble from "../../components/Bubble";
import { useNavigate } from "react-router-dom";
import mainBgPng from "../../assets/main/main_bg.png";
import cartPng from "../../assets/main/cart.png";
import archivePng from "../../assets/main/archive.png";
import customPng from "../../assets/main/custom.png";
import orderPng from "../../assets/main/order.png";
import tablePng from "../../assets/main/table.png";

const MainTestPage = () => {
	const [characterSpeechIndex, setCharacterSpeechIndex] = useState(0);
	const [hoveredButton, setHoveredButton] = useState<string | null>(null);
    const navigate = useNavigate();

	const characterSpeeches = [
        "",
        "🌸어서오세요! 한줌입니다🌸",
        "세상에 단 하나뿐인 꽃다발을 만들어드려요!",
        "취향대로 꽃을 커스텀 해봐!",
    ];

	const handleCharacterClick = () => {
		setCharacterSpeechIndex((prev) => (prev + 1) % characterSpeeches.length);
	};

	const renderHoverBubble = (text: string, className: string) => (
		<Bubble
			text={text}
			className={`absolute z-40 ${className}`}
		/>
	);
    return (
		<div
			className="min-h-screen flex flex-col items-center justify-center relative bg-background bg-cover bg-center text-center"
			style={{
				backgroundImage: `url(${mainBgPng})`,
			}}
		>
            <div>
				<button 
					onMouseEnter={() => setHoveredButton("shop")}
					onMouseLeave={() => setHoveredButton(null)}
                    onClick={() => navigate("/shop")}
                    className="absolute bottom-[8.74em] left-1/2 z-30 cursor-pointer w-[12.25em] h-[11.88em] translate-x-[calc(-50%-18.5em)]">
                    <img 
                        src={cartPng}
                        alt="shop"
                        className="w-full h-full"
                    />
					{hoveredButton === "shop" &&
						renderHoverBubble(
							"Shop",
							"bottom-[18em] left-1/2 translate-x-[calc(-50%-2em)]"
						)}
                </button>
                <button 
					onMouseEnter={() => setHoveredButton("archive")}
					onMouseLeave={() => setHoveredButton(null)}
                    onClick={() => navigate("/archive")}
                    className="absolute bottom-[14.516em] left-1/2 z-20 cursor-pointer w-[22.54em] h-[20.55em] translate-x-[calc(-50%+23.5em)]">
                    <img 
                        src={archivePng}
                        alt="archive"
                        className="w-full h-full"
                    />
					{hoveredButton === "archive" &&
						renderHoverBubble(
							"Archive",
							"bottom-[22.5em] left-1/2 translate-x-[calc(-50%-10em)]"
						)}
                </button>
                <button 
					onMouseEnter={() => setHoveredButton("custom")}
					onMouseLeave={() => setHoveredButton(null)}
                    onClick={() => navigate("/customizing")}
                    className="absolute bottom-[16.8em] left-1/2 z-20 cursor-pointer w-[20em] h-[21.3125em] translate-x-[calc(-50%-25em)]">
                    <img 
                        src={customPng}
                        alt="customizing"
                        className="w-full h-full"
                    />
                    {hoveredButton === "custom" &&
						renderHoverBubble(
							"Customizing",
							"bottom-[26.5em] left-1/2 translate-x-[calc(-50%-4.5em)]"
						)}
				</button>
                <button 
					onMouseEnter={() => setHoveredButton("order")}
					onMouseLeave={() => setHoveredButton(null)}
                    onClick={() => navigate("/order")}
                    className="absolute bottom-[26.2em] left-1/2 transform -translate-x-1/2 z-40 cursor-pointer w-[5.78em] h-[4.3em] translate-x-[calc(-10em)]">
                    <img 
                        src={orderPng}
                        alt="order"
                        className="w-full h-full"
                    />
                    {hoveredButton === "order" &&
						renderHoverBubble(
							"Order",
							"bottom-[11em] left-1/2 translate-x-[calc(-50%)]"
						)}
				</button>
                <img 
                    src={tablePng}
					alt="table"
					className="absolute bottom-[14em] left-1/2 transform -translate-x-1/2 w-[24.28em] h-[28.375em] z-30"
					onClick={handleCharacterClick}
                />
                {characterSpeechIndex !== 0 && (
					<Bubble
						text={characterSpeeches[characterSpeechIndex]}
						className="absolute bottom-[10em] left-1/2 z-40 translate-x-[-50%]"
					/>
				)}
			</div>

        </div>
    );
};

export default MainTestPage;
