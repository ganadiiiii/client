/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			animation: {
				slideInLeft: "slideInLeft 0.3s ease-out forwards",
				slideInRight: "slideInRight 0.3s ease-out forwards",
			},
			keyframes: {
				slideInLeft: {
					"0%": { transform: "translateX(-100%)" },
					"100%": { transform: "translateX(0)" },
				},
				slideInRight: {
					"0%": { transform: "translateX(100%)" },
					"100%": { transform: "translateX(0)" },
				},
			},
		},
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1440px',
			'3xl': '1728px', // 커스텀 추가
		  },
	},
	plugins: [],
};
