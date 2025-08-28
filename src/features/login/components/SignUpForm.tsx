import { useId, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
	const firstNameId = useId();
	const lastNameId = useId();
	const emailId = useId();
	const passwordId = useId();
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Sign up with:", { firstName, lastName, email, password });
		// 회원가입 처리 로직
	};

	return (
		<div className="flex items-start flex-col min-h-screen pt-[680px] bg-[#FCFBF6]">
			<div className="flex justify-center px-4 w-full">
				<div className="w-full max-w-6xl h-[1000px]">
					{/* 로그인 제목과 데코레이션 라인 */}
					<div className="flex items-center justify-center mb-12">
						{/* 왼쪽 분홍색 파선 */}
						<div
							className="flex items-center space-x-2"
							style={{ width: "450px" }}
						>
							{Array.from({ length: 30 }, (_, i) => (
								<div key={i} className="w-2 h-2 bg-[#FFD1D4] rounded-full" />
							))}
						</div>

						{/* 로그인 제목 */}
						<h1
							className="px-8 text-[36px] text-nowrap text-[#C69FD4] font-normal"
							style={{ fontFamily: "BagelFatOne-Regular" }}
						>
							CUSTOMER LOGIN
						</h1>

						{/* 오른쪽 분홍색 파선 */}
						<div
							className="flex items-center space-x-2"
							style={{ width: "450px" }}
						>
							{Array.from({ length: 30 }, (_, i) => (
								<div key={i} className="w-2 h-2 bg-[#FFD1D4] rounded-full" />
							))}
						</div>
					</div>

					{/* 회원가입 폼 */}
					<div className="flex justify-center">
						<form
							onSubmit={handleSubmit}
							className="space-y-4 w-full max-w-3xl"
						>
							{/* First Name 입력 */}
							<div>
								<label
									htmlFor="firstName"
									className="block text-2xl font-bold text-[#000000] mb-2"
									style={{ fontFamily: "NEXON Lv1 Gothic OTF" }}
								>
									First Name
								</label>
								<input
									type="text"
									id={firstNameId}
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									required
									className="w-full px-4 py-4 border-2 border-gray-300/60 rounded-full bg-white text-lg focus:outline-none focus:border-gray-400 transition-colors"
									style={{ fontFamily: "NEXON Lv1 Gothic OTF" }}
								/>
							</div>

							{/* Last Name 입력 */}
							<div>
								<label
									htmlFor="lastName"
									className="block text-2xl font-bold text-[#000000] mb-2"
									style={{ fontFamily: "NEXON Lv1 Gothic OTF" }}
								>
									Last Name
								</label>
								<input
									type="text"
									id={lastNameId}
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
									required
									className="w-full px-4 py-4 border-2 border-gray-300/60 rounded-full bg-white text-lg focus:outline-none focus:border-gray-400 transition-colors"
									style={{ fontFamily: "NEXON Lv1 Gothic OTF" }}
								/>
							</div>
							{/* Email 입력 */}
							<div>
								<label
									htmlFor="email"
									className="block text-2xl font-bold text-[#000000] mb-2"
									style={{ fontFamily: "NEXON Lv1 Gothic OTF" }}
								>
									Email
								</label>
								<input
									type="email"
									id={emailId}
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									className="w-full px-4 py-4 border-2 border-gray-300/60 rounded-full bg-white text-lg focus:outline-none focus:border-gray-400 transition-colors"
									style={{ fontFamily: "NEXON Lv1 Gothic OTF" }}
								/>
							</div>

							{/* Password 입력 */}
							<div>
								<label
									htmlFor="password"
									className="block text-2xl font-bold text-[#000000] mb-2"
									style={{ fontFamily: "NEXON Lv1 Gothic OTF" }}
								>
									Password
								</label>
								<input
									type="password"
									id={passwordId}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									className="w-full px-4 py-4 border-2 border-gray-300/60 rounded-full bg-white text-lg focus:outline-none focus:border-gray-400 transition-colors"
									style={{ fontFamily: "NEXON Lv1 Gothic OTF" }}
								/>
							</div>

							<div className="text-center pt-4">
								{/* Create 버튼 */}
								<div className="flex gap-4 pt-12 justify-center">
								{/* Sign in 버튼 */}
								<button
									type="submit"
									className="flex py-4 pl-[50px] pr-[50px] rounded-full bg-[#EDEDED] text-black text-[24px] font-bold hover:bg-[#FFD1D4] transition-colors"
									style={{ fontFamily: "NEXON Lv1 Gothic OTF" }}
								>
									Create Account
								</button>

								{/* Create Account 버튼 */}
								<button
									type="button"
									onClick={() => navigate("/login")}
									className="flex py-4 pl-[50px] pr-[50px] rounded-full bg-[#EDEDED] text-black text-[24px] font-bold hover:bg-[#FFD1D4] transition-colors"
									style={{ fontFamily: "NEXON Lv1 Gothic OTF" }}
								>
									Back to Login
								</button>
							</div>
							</div>
						</form>
					</div>
				</div>
			</div>
			<footer className="w-full h-[200px] bg-[#EDEDED] mt-auto" />
		</div>
	);
};

export default LoginForm;
