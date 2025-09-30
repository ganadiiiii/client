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
		options: ["연회", "고백", "생일", "기념일", "추모", "개업"],
		isMultipleChoice: false,
	},
	{
		id: 3,
		title: "이번 꽃다발에는 어떤 감정을 담고 싶으신가요?",
		options: [
			"설렘",
			"사랑",
			"고마움",
			"용기",
			"격려",
			"기대",
			"축하",
			"존경",
			"우정",
			"다짐",
			"사과",
			"애도",
		],
		isMultipleChoice: true,
	},
	{
		id: 4,
		title: "특별히 담고 싶은 꽃이 있다면 선택해 주세요.",
		options: ["rose", "tulip", "carnation", "sunflower", "lily", "gerbera", "baby's breath", "freesia", "muguet"],
		isMultipleChoice: true,
	},
	{
		id: 5,
		title: "꽃다발의 크기를 정해 주세요.",
		options: ["s", "m", "l"],
		isMultipleChoice: false,
	},
	{
		id: 6,
		title: "꽃다발의 포장지를 선택해 주세요.",
		options: ["kraft paper", "color paper", "clear vinyl"],
		isMultipleChoice: false,
	},
	{
		id: 7,
		title: "포인트 장식을 선택해 주세요.",
		options: ["none", "specia"],
		isMultipleChoice: false,
	},
];
