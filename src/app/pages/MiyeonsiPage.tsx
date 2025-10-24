import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CircleTransition from "../../components/CircleTransition";
import bg from "../../assets/archive/miyeonsi/bg-mi.svg";
import home from "../../assets/archive/miyeonsi/home.png";

interface Dialogue {
    id: number;
    text: string;
}

const dialogues: Dialogue[] = [
    {
        id: 1,
        text: "안녕? 내가 지금부터\n꽃다발 보관 방법을 아르켜줄게~",
    },
    {
        id: 2,
        text: "첫 번째로 꽃이 숨을 쉴 수 있게 포장지를 바로 제거해야 해.\n물 흡수 면적을 위해 줄기는 사선으로 잘라 줘!",
    },
    {
        id: 3,
        text: "물에 잠기는 잎은 제거해 줘야 해.\n물을 갈 때마다 줄기 끝을 1cm씩 자르는 것도 잊지 마~",
    },
    {
        id: 4,
        text: "보관 장소를 찾는다고? 그렇다면\n서늘하고 통풍이 잘 되는 밝은 그늘이 좋아!",
    },
    {
        id: 5,
        text: "물에 락스 1~2방울 또는 사이다를\n소량 섞으면 더 오래 유지할 수 있어",
    },
    {
        id: 6,
        text: "그럼 꽃다발 오랫동안 예쁘게 보관해 줘! 💖\n모르는 게 있으면 또 찾아오라구~!",
    },
];

const MiyeonsiPage = () => {
    const navigate = useNavigate();
    const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
    const [isTextAnimating, setIsTextAnimating] = useState(false);
    const [showCircleTransition, setShowCircleTransition] = useState(true);

    const currentDialogue = dialogues[currentDialogueIndex];

    // 페이지 진입 시 circle transition 시작
    useEffect(() => {
        setShowCircleTransition(true);
    }, []);

    const handleDialogueClick = () => {
        if (isTextAnimating) return;

        if (currentDialogueIndex < dialogues.length - 1) {
            setIsTextAnimating(true);
            setTimeout(() => {
                setCurrentDialogueIndex(currentDialogueIndex + 1);
                setIsTextAnimating(false);
            }, 200);
        }
    };

    const handleEndConversation = () => {
        navigate(-1); // 이전 페이지로 이동
    };

    const handleTransitionComplete = () => {
        setShowCircleTransition(false);
    };

    return (
        <main className="overflow-hidden">
            {/* background image with smooth crossfade */}
            <div className="relative w-full h-screen flex justify-center pt-[139px] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-400 ease-in-out pointer-events-none"
                    style={{
                        backgroundImage: `url(${bg})`,
                    }}
                />
                <div className="relative w-full h-[calc(100vh-9em-80px)] 3xl:h-[calc(100vh-9em-102px)]">
                    <img src={home}
                        alt="Home background"
                        className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                        style={{
                            width: "102em",
                            height: "53em",
                        }}
                    />

                    {/* Dialogue Box Container */}
                    <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ 
                            duration: 0.3, 
                            type: "spring",
                            stiffness: 100,
                            damping: 15
                        }}
                        className="absolute bottom-[0] left-0 right-0 flex flex-col items-center"
                    >
                        {/* End Conversation Button - Above Dialogue Box */}
                        <div className="flex flex-row items-center gap-10 justify-center w-full mr-48">
                            <section
                                className="px-8 pt-4 pb-3 bg-primary text-white rounded-t-2xl font-bold text-xl"
                                style={{ fontFamily: "NEXONLv1Gothic" }}
                            >
                                하나 3세 | 아이돌 ‘플로리스트’ 지망생
                            </section>
                            <button
                                onClick={handleEndConversation}
                                className="px-8 pt-4 pb-3 bg-[#ececec] cursor-pointer text-gray rounded-t-2xl font-bold text-xl hover:bg-[#d9d9d9] transition-colors"
                                style={{ fontFamily: "NEXONLv1Gothic" }}
                            >
                                대화 종료하기
                            </button>
                        </div>

                        {/* Dialogue Box */}
                        <div
                            className="relative bg-white/95 rounded-3xl shadow-lg px-12 py-8 mx-8 max-w-4xl w-full border-4 border-primary"
                        >
                            {/* Dialogue Text with Animation and Arrow */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    onClick={handleDialogueClick}
                                    key={currentDialogue.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="cursor-pointer flex items-end gap-3"
                                >
                                    <p
                                        className="text-xl text-gray-800 leading-relaxed flex-1 whitespace-pre-line"
                                        style={{ fontFamily: "NEXONLv1Gothic" }}
                                    >
                                        {currentDialogue.text}
                                    </p>

                                    {/* Arrow for next dialogue */}
                                    {currentDialogueIndex < dialogues.length - 1 && (
                                        <button
                                            onClick={handleDialogueClick}
                                            className="flex-shrink-0 flex items-center justify-center cursor-pointer"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="#FF9BAF"
                                                className="w-8 h-8"
                                            >
                                                <path d="M12 16l-6-6h12z" />
                                            </svg>
                                        </button>
                                    )}
                                </motion.div>
                            </AnimatePresence>

                            {/* Progress Indicator */}
                            <div className="absolute bottom-4 right-6 text-sm text-gray-500">
                                {currentDialogueIndex + 1} / {dialogues.length}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Circle Transition - Reverse mode */}
            <CircleTransition
                isActive={showCircleTransition}
                onComplete={handleTransitionComplete}
                originX={window.innerWidth / 2}
                originY={window.innerHeight / 2}
                reverse={true}
            />
        </main>
    );
};

export default MiyeonsiPage;

