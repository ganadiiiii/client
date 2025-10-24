import { AnimatePresence, motion } from "motion/react";
import React, { useState, useEffect } from "react";
import bg from "../../../assets/generate/bg.svg";

interface TitleInputStepProps {
    value: string;
    onChange: (value: string) => void;
    onNext: () => void;
    canProceed: boolean;
}

const PLACEHOLDERS = [
    "수지의 졸업을 축하하며",
    "엄마, 생신 축하드려요!",
    "100일 기념! 앞으로도 함께하자",
];

const TitleInputStep: React.FC<TitleInputStepProps> = ({
    value,
    onChange,
    onNext,
    canProceed,
}) => {
    const [hasMounted, setHasMounted] = useState(false);
    const [placeholder, setPlaceholder] = useState("수지의 졸업을 축하하며");
    useEffect(() => {
        setHasMounted(true);
        setPlaceholder(PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)]);
    }, []);

    const slideVariants = {
        enter: { x: 200, opacity: 0 },
        center: { x: 0, opacity: 1 },
        exit: { x: -200, opacity: 0 },
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && canProceed) {
            onNext();
        }
    };

    return (
        <div
            className="min-h-screen flex flex-col items-center justify-center relative bg-background bg-cover bg-center text-center"
            style={{
                backgroundImage: `url(${bg})`,
            }}
        >
            {/* content with slide transition */}
            <div className="flex-1 flex flex-col items-center justify-center gap-y-4 md:gap-y-6 2xl:gap-y-10 w-full overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key="title-input"
                        variants={slideVariants}
                        initial={hasMounted ? "enter" : false}
                        animate="center"
                        exit="exit"
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                            mass: 0.5,
                        }}
                        className="flex flex-col items-center justify-center gap-y-10"
                    >
                        {/* question title */}
                        <div className="relative">
                            <h1
                                className="text-black text-center mb-2 font-bold whitespace-pre-wrap text-3xl"
                                style={{
                                    fontFamily: "NexonLv1Gothic",
                                    fontWeight: "700",
                                    lineHeight: "1.39",
                                }}
                            >
                                생성할 <span
                                    className="inline-flex items-center bg-primary/40 rounded-3xl px-3 pb-1 pt-2"
                                    style={{
                                        boxDecorationBreak: "clone",
                                        WebkitBoxDecorationBreak: "clone",
                                    }}
                                >꽃다발의 이름</span>은 무엇인가요?
                                <br />
                                당신의 감정과 이야기를 담아, 지금 시작해보세요.
                            </h1>
                        </div>

                        {/* input field */}
                        <div className="w-full px-4">
                            <input
                                type="text"
                                value={value}
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress}
                                placeholder={placeholder}
                                className="w-full px-6 py-4 text-lg border-2 border-primary/30 rounded-full focus:border-primary focus:outline-none bg-white/90 backdrop-blur-sm text-center"
                                style={{
                                    fontFamily: "NexonLv1Gothic",
                                    fontWeight: "400",
                                }}
                                maxLength={50}
                            />
                            <div className="mt-2 text-sm text-gray-500 text-right mr-1">
                                {value.length}/50
                            </div>
                        </div>

                        {/* start button */}
                        <button
                            onClick={onNext}
                            disabled={!canProceed}
                            className={`px-32 py-4.5 rounded-full text-lg font-semibold transition-all duration-200 ${canProceed
                                ? "bg-primary text-white hover:bg-primary/90 hover:scale-105 active:scale-95 cursor-pointer"
                                : "bg-gray/20 text-gray"
                                }`}
                            style={{
                                fontFamily: "NexonLv1Gothic",
                                fontWeight: "600",
                            }}
                        >
                            시작하기!
                        </button>
                    </motion.div>
                </AnimatePresence>
            </div>

        </div>
    );
};

export default TitleInputStep;
