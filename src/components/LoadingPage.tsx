import React from "react";
import { useEffect, useState } from "react";
import characterLoadingPng from "../assets/character-loading.png";
import backgroundSvg from "../assets/generate/bg.svg";

interface LoadingPageProps {
    message?: string;
    image?: string;
}

const LoadingPage: React.FC<LoadingPageProps> = ({
    message = "꽃다발 생성 중",
    image = characterLoadingPng
}) => {
    const [dots, setDots] = useState("");

    useEffect(() => {
		// 점 애니메이션
		const interval = setInterval(() => {
			setDots(prev => {
				if (prev === "...") return "";
				return prev + ".";
			});
		}, 500);

		return () => clearInterval(interval);
	}, []);

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center relative bg-background bg-cover bg-center text-center"
            style={{
                backgroundImage: `url(${backgroundSvg})`,
            }}
        >
            <div className="flex flex-col items-center justify-center">
                <img
                    src={image}
                    alt="Loading character"
                    className="w-60 mb-9"
                />
                {/* Loading Text with Dots */}
                <h1
                    className="text-black text-center font-semibold whitespace-nowrap text-3xl"
                    style={{
                        fontFamily: "NexonLv1Gothic",
                        fontWeight: "700",
                    }}
                >
                    {message}{dots}
                </h1>
            </div>
        </div>
    );
};

export default LoadingPage;
