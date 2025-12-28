import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { customizingQuestions } from "../../data/customizingQuestions";
import QuestionStep from "../../features/customize/components/QuestionStep";
import TitleInputStep from "../../features/customize/components/TitleInputStep";
import LoadingPage from "../../components/LoadingPage";

const CustomizingPage: React.FC = () => {
	const navigate = useNavigate();
	const [currentStep, setCurrentStep] = useState(0);
	const [answers, setAnswers] = useState<Record<number, string[]>>({});
	const [bouquetTitle, setBouquetTitle] = useState("");
	const [isLoading, setIsLoading] = useState(false);

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
			// 데모용: 로딩 후 바로 결과 페이지로 이동
			setIsLoading(true);
			await new Promise(resolve => setTimeout(resolve, 2500)); // 2.5초 대기
			setIsLoading(false);
			navigate("/customizing/result");
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
			// 마지막 질문 완료 시 결과 페이지로 이동
			setIsLoading(true);
			await new Promise(resolve => setTimeout(resolve, 2500)); // 2.5초 대기
			setIsLoading(false);
			navigate("/customizing/result");
		}
	};

	const handlePrevious = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const canProceed = currentStep === 0 ? bouquetTitle.trim().length > 0 : currentAnswers.length > 0;

	// 로딩 중일 때 로딩 페이지 표시
	if (isLoading) {
		return <LoadingPage message="꽃다발 만드는 중" />;
	}

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
