import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { customizingQuestions } from "../../data/customizingQuestions";
import QuestionStep from "../../features/customize/components/QuestionStep";
import TitleInputStep from "../../features/customize/components/TitleInputStep";
// import { authAPI } from "../../api";
import { cardAPI } from "../../api";
import type { FlowerCard } from "../../types/FlowerCard";

const CustomizingPage: React.FC = () => {
	const navigate = useNavigate();
	const [currentStep, setCurrentStep] = useState(0);
	const [answers, setAnswers] = useState<Record<number, string[]>>({});
	const [bouquetTitle, setBouquetTitle] = useState("");

	// currentStep이 0이면 제목 입력 단계, 1부터는 질문 단계
	const currentQuestion = currentStep > 0 ? customizingQuestions[currentStep - 1] : null;
	const currentAnswers = currentQuestion ? answers[currentQuestion.id] || [] : [];

	const handleOptionSelect = (option: string) => {
		if (!currentQuestion) return;
		
		const newAnswers = { ...answers };
		const questionAnswers = newAnswers[currentQuestion.id] || [];

		if (questionAnswers.includes(option)) {
			// 이미 선택된 옵션이면 제거
			newAnswers[currentQuestion.id] = questionAnswers.filter(
				(ans) => ans !== option,
			);
		} else {
			if (currentQuestion.isMultipleChoice) {
				// 복수선택 가능한 경우: 새로운 옵션 추가
				newAnswers[currentQuestion.id] = [...questionAnswers, option];
			} else {
				// 단일선택인 경우: 기존 선택을 대체
				newAnswers[currentQuestion.id] = [option];
			}
		}

		setAnswers(newAnswers);
	};

    const handleNext = async () => {
		// 제목 입력 단계에서 첫 번째 질문으로 이동
		if (currentStep === 0) {
			setCurrentStep(1);
			return;
		}

		// Question 8에서 "None" 선택 시 바로 결과 페이지로 이동 (currentStep 8 = 실제 질문 7)
		if (currentStep === 8 && currentAnswers.includes("None")) {
			// 카드 생성 호출 후 결과 페이지로 이동
			const flowerCard = await createCardFromAnswers();
			navigate("/customizing/result", { state: { flowerCard } });
			return;
		}

		// Question 8에서 "Special Detail" 선택 시에만 Question 9로 이동
		if (currentStep === 8 && currentAnswers.includes("Special Detail")) {
			if (currentStep < customizingQuestions.length) {
				const nextQuestionId = customizingQuestions[currentStep].id;
				setAnswers((prev) => ({
					...prev,
					[nextQuestionId]: [],
				}));
				setCurrentStep(currentStep + 1);
			}
			return;
		}

		// 일반적인 다음 질문으로 이동
		if (currentStep < customizingQuestions.length) {
			const nextQuestionId = customizingQuestions[currentStep].id;
			setAnswers((prev) => ({
				...prev,
				[nextQuestionId]: [], // 다음 질문의 응답을 초기화
			}));
			setCurrentStep(currentStep + 1);
		} else {
			// 마지막 질문 완료 시 결과 페이지로 이동하거나 다른 처리
			const flowerCard = await createCardFromAnswers();
			navigate("/customizing/result", { state: { flowerCard } });
		}
	};

	// 질문 답변을 기반으로 카드 생성 API 호출
	const createCardFromAnswers = async (): Promise<FlowerCard | undefined> => {
		try {
			// 유저 id
			// const me = await authAPI.me();
			// const userId: string = me.userId ?? me.id ?? "";

			// 각 질문별 값 추출
			const q1 = answers[1]?.[0]; // whoType
			const q2 = answers[2]?.[0]; // whenType
			const q3 = answers[3] || []; // emotionTypes
			const q4 = answers[4]?.[0]; // mainFlowerId (id 문자열 가정)
			const q5 = answers[5]?.[0]; // bouquetSize S|M|L
			const q6 = answers[6]?.[0]; // wrappingType

			const sizeToPrice = (size?: string) => {
				switch ((size || "").toLowerCase()) {
					case "s":
						return 10000;
					case "m":
						return 25000;
					case "l":
						return 50000;
					default:
						return 25000;
				}
			};

			const payload = {
				mainFlowerId: Number(q4) || 0,
				title: bouquetTitle || "꽃다발",
				whoType: q1 || "",
				whenType: q2 || "",
				emotionTypes: q3 as string[],
				bouquetSize: q5 || "",
				wrappingType: q6 || "",
				price: sizeToPrice(q5),
			};

			const res = await cardAPI.createCard(payload);

			// 결과 페이지에 전달할 FlowerCard 구성
			const senderName = localStorage.getItem("name") || "";
			const today = new Date();
			const formatDate = (d: Date) =>
				`${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(
					d.getDate(),
				).padStart(2, "0")}`;

			const flowerCard: FlowerCard = {
				id: String(res.cardId),
				date: formatDate(today),
				title: res.title,
				flowerImg: res.imageUrl,
				mainFlowers: [res.mainFlower?.koreanName || ""],
				subFlowers: [res.subFlower?.koreanName || ""],
				floriography: res.floriography || "",
				size: res.bouquetSize,
				price: res.price,
				sender: senderName || undefined,
			};

			return flowerCard;
		} catch (e) {
			console.error("createCard error", e);
			return undefined;
		}
	};

	const handlePrevious = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const canProceed = currentStep === 0 ? bouquetTitle.trim().length > 0 : currentAnswers.length > 0;

	return currentStep === 0 ? (
		<TitleInputStep
			value={bouquetTitle}
			onChange={setBouquetTitle}
			onNext={handleNext}
			canProceed={canProceed}
		/>
	) : (
		<QuestionStep
			questionNumber={currentStep}
			title={currentQuestion!.title}
			options={currentQuestion!.options}
			selectedOptions={currentAnswers}
			onOptionSelect={handleOptionSelect}
			onNext={handleNext}
			onPrevious={currentStep > 0 ? handlePrevious : undefined}
			canProceed={canProceed}
			isMultipleChoice={currentQuestion!.isMultipleChoice}
		/>
	);
};

export default CustomizingPage;
