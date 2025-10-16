import React from "react";
import { useEffect, useState } from "react";

interface LoadingPageProps {
    message?: string;
}

const LoadingPage: React.FC<LoadingPageProps> = ({
    message = "꽃다발 생성 중"
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
                backgroundImage: "url('/src/assets/generate/bg.svg')",
            }}
        >
            <div className="flex flex-col items-center justify-center">
                <img
                    src="/src/assets/generate/loading.png"
                    alt="Loading character"
                    className="w-[10.8em] h-[13.2em] mb-9"
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
