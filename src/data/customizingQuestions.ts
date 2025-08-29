export interface Question {
	id: number;
	title: string;
	options: string[];
	isMultipleChoice?: boolean;
}

export const customizingQuestions: Question[] = [
	{
		id: 1,
		title: "누구에게 이 꽃다발을 선물하시나요?",
		options: ["스승", "연인", "본인", "가족", "친구", "동료"],
		isMultipleChoice: false,
	},
	{
		id: 2,
		title: "어떤 순간을 함께 나누고 싶으신가요?",
		options: ["경사", "고백", "생일", "기념일", "첫만남", "일상"],
		isMultipleChoice: false,
	},
	{
		id: 3,
		title: "이번 꽃다발에는 어떤 감정을 담고 싶으신가요?",
		options: [
			"설렘",
			"사랑",
			"감사",
			"용기",
			"격려",
			"기대",
			"축하",
			"존경",
			"우정",
			"애정",
			"사과",
		],
		isMultipleChoice: true,
	},
	{
		id: 4,
		title: "특별히 담고 싶은 꽃이 있다면 선택해 주세요.",
		options: ["선택지1", "선택지2", "선택지3", "선택지4", "선택지5"],
		isMultipleChoice: true,
	},
	{
		id: 5,
		title: "꽃다발의 크기를 정해 주세요.",
		options: ["최종1", "최종2", "최종3"],
		isMultipleChoice: false,
	},
];
