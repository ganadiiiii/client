import { useState } from "react";
import Bubble from "../../components/Bubble";
import { useNavigate } from "react-router-dom";
import mainBgPng from "../../assets/main/main_bg.png";
import cartPng from "../../assets/main/cart.png";
import archivePng from "../../assets/main/archive.png";
import customPng from "../../assets/main/custom.png";
import orderPng from "../../assets/main/order.png";
import tablePng from "../../assets/main/table.png";
import archiveHoverPng from "../../assets/main/archive-hover.png";
import customHoverPng from "../../assets/main/custom-hover.png";
import shoongPng from "../../assets/main/shoong.png";
import orderHoverPng from "../../assets/main/order-hover.png";
import functionBubblePng from "../../assets/main/function_bubble.png";
import characterBubblePng from "../../assets/main/character_bubble.png";

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
                    className="absolute bottom-[7.5em] left-1/2 z-30 cursor-pointer w-[12.25em] h-[11.88em] translate-x-[calc(-50%-18.5em)]"
					style={{
						transform: hoveredButton === "shop" ? "scale(1.02)" : "scale(1)",
						transition: "transform 0.2s ease-in-out",
						transformOrigin: "center center",
						transformStyle: "preserve-3d",
					}}>
                    <img 
                        src={cartPng}
                        alt="shop"
                        className="w-full h-full"
						style={{
							transform: hoveredButton === "shop" ? "rotate(-20deg)" : "rotate(0deg)",
							transition: "transform 0.2s ease-in-out",
						}}
                    />
                    {hoveredButton === "shop" && (
                        <img 
                            src={shoongPng}
                            alt="shoong"
                            className="absolute top-[7em] left-[-2em] w-[4em] h-[4em] z-40"
                        />
                    )}
					{hoveredButton === "shop" &&
						<Bubble
							text="Shop"
							className="absolute bottom-[18em] left-1/2 translate-x-[calc(-50%-2em)] w-[13.75em] h-[7.5em]"
							backgroundImage={functionBubblePng}
							backgroundSize="contain"
							backgroundPosition="center"
						/>}
                </button>
                <button 
					onMouseEnter={() => setHoveredButton("archive")}
					onMouseLeave={() => setHoveredButton(null)}
                    onClick={() => navigate("/archive")}
                    className="absolute bottom-[12.5em] right-1/5 z-20 cursor-pointer w-[22.54em] h-[20.55em]"
					style={{
						transform: hoveredButton === "archive" ? "scale(1.02)" : "scale(1)",
						transition: "transform 0.2s ease-in-out",
						transformOrigin: "center center",
						transformStyle: "preserve-3d",
					}}>
                    <img 
                        src={hoveredButton === "archive" ? archiveHoverPng : archivePng}
                        alt="archive"
                        className="w-full h-full"
                    />
					{hoveredButton === "archive" &&
						<Bubble
							text="Archive"
							className="absolute bottom-[22.5em] left-1/2 translate-x-[calc(-50%-10em)] w-[13.75em] h-[7.5em]"
							backgroundImage={functionBubblePng}
							backgroundSize="contain"
							backgroundPosition="center"
						/>}
                </button>
                <button 
					onMouseEnter={() => setHoveredButton("custom")}
					onMouseLeave={() => setHoveredButton(null)}
                    onClick={() => navigate("/customizing")}
                    className={`absolute bottom-[15.5em] right-2/3 z-20 cursor-pointer h-[21.3125em] ${hoveredButton === "custom" ? "w-[20.6em]" : "w-[20em]"}`}
					style={{
						transform: hoveredButton === "custom" ? "scale(1.02)" : "scale(1)",
						transition: "transform 0.2s ease-in-out",
						transformOrigin: "center center",
						transformStyle: "preserve-3d",
					}}>
                    <img 
                        src={hoveredButton === "custom" ? customHoverPng : customPng}
                        alt="customizing"
                        className="w-full h-full"
                    />
                    {hoveredButton === "custom" &&
						<Bubble
							text="Customizing"
							className="absolute bottom-[26.5em] left-1/2 translate-x-[calc(-50%-4.5em)] w-[13.75em] h-[7.5em]"
							backgroundImage={functionBubblePng}
							backgroundSize="contain"
							backgroundPosition="center"
						/>}
				</button>
                <button 
					onMouseEnter={() => setHoveredButton("order")}
					onMouseLeave={() => setHoveredButton(null)}
                    onClick={() => navigate("/order")}
                    className="absolute bottom-[26.2em] left-1/2 transform -translate-x-1/2 z-40 cursor-pointer w-[5.78em] h-[4.3em] translate-x-[calc(-10em)]"
					style={{
						transform: hoveredButton === "order" ? "scale(1.02)" : "scale(1)",
						transition: "transform 0.2s ease-in-out",
						transformOrigin: "center center",
						transformStyle: "preserve-3d",
					}}>
                    <img 
                        src={orderPng}
                        alt="order"
                        className="w-full h-full"
                    />
					{hoveredButton === "order" && (
                        <img 
                            src={orderHoverPng}
                            alt="order"
                            className="absolute top-[-2em] left-[-4em] w-[4em] h-[4em] z-40"
							style={{
								transform: "rotate(360deg) translateY(-5%)",
								transition: "transform 0.2s ease-in-out",
							}}
                        />
                    )}
                    {hoveredButton === "order" &&
						<Bubble
							text="Order"
							className="absolute bottom-[12em] left-1/2 translate-x-[calc(-50%)] w-[13.75em] h-[7.5em]"
							backgroundImage={functionBubblePng}
							backgroundSize="contain"
							backgroundPosition="center"
						/>}
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
						className="absolute bottom-[10em] left-1/2 z-40 translate-x-[-50%] w-[28em] h-[7.875em]"
						backgroundImage={characterBubblePng}
						backgroundSize="contain"
						backgroundPosition="center"
						fontFamily="NexonLv1Gothic"
					/>
				)}
			</div>

        </div>
    );
};

export default MainTestPage;
