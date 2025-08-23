import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionStep from "../../features/customize/components/QuestionStep";
import { customizingQuestions } from "../../data/customizingQuestions";

const CustomizingPage: React.FC = () => {
	const navigate = useNavigate();
	const [currentStep, setCurrentStep] = useState(0);
	const [answers, setAnswers] = useState<Record<number, string[]>>({});

	const currentQuestion = customizingQuestions[currentStep];
	const currentAnswers = answers[currentQuestion.id] || [];

	const handleOptionSelect = (option: string) => {
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

	const handleNext = () => {
		if (currentStep < customizingQuestions.length - 1) {
			const nextQuestionId = customizingQuestions[currentStep + 1].id;
			setAnswers((prev) => ({
				...prev,
				[nextQuestionId]: [], // 다음 질문의 응답을 초기화
			}));
			setCurrentStep(currentStep + 1);
		} else {
			// 마지막 질문 완료 시 결과 페이지로 이동하거나 다른 처리
			console.log("설문 완료:", answers);
			navigate("/customizing/result");
		}
	};

	const handlePrevious = () => {
		if (currentStep > 0) {
			setCurrentStep(currentStep - 1);
		}
	};

	const canProceed = currentAnswers.length > 0;

	return (
		<QuestionStep
			questionNumber={currentStep + 1}
			title={currentQuestion.title}
			options={currentQuestion.options}
			selectedOptions={currentAnswers}
			onOptionSelect={handleOptionSelect}
			onNext={handleNext}
			onPrevious={currentStep > 0 ? handlePrevious : undefined}
			canProceed={canProceed}
			isMultipleChoice={currentQuestion.isMultipleChoice}
		/>
	);
};

export default CustomizingPage;
