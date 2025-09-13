import { useId, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpForm: React.FC = () => {
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
		<div className="flex items-start flex-col min-h-screen pt-[600px] 2xl:pt-[700px] bg-background">
			<div className="flex justify-center px-4 w-full">
				<div className="w-full max-w-6xl h-[1000px]">
					{/* 로그인 제목과 데코레이션 라인 */}
					<div className="flex items-center justify-center mb-12">
						{/* 왼쪽 분홍색 파선 */}
						<div className="flex items-center space-x-2 w-65.1">
							{Array.from({ length: 14 }, (_, i) => (
								<div key={i} className="w-2 h-2 bg-[#FFD1D4] rounded-full" />
							))}
						</div>

						{/* 로그인 제목 */}
						<h1
							className="px-8 text-[28px] text-nowrap text-purple font-normal"
							style={{ fontFamily: "BagelFatOne-Regular" }}
						>
							CUSTOMER LOGIN
						</h1>

						{/* 오른쪽 분홍색 파선 */}
						<div className="flex items-center space-x-2 w-65.1">
							{Array.from({ length: 14 }, (_, i) => (
								<div key={i} className="w-2 h-2 bg-[#FFD1D4] rounded-full" />
							))}
						</div>
					</div>

					{/* 회원가입 폼 */}
					<div className="flex justify-center">
						<form
							onSubmit={handleSubmit}
							className="flex flex-col items-center space-y-4 w-full max-w-3xl"
						>
							{/* First Name 입력 */}
							<div className="flex-col justify-center">
								<label
									htmlFor="firstName"
									className="block text-lg font-bold text-gray mb-2 text-start w-140"
									style={{ fontFamily: "NexonLv1Gothic" }}
								>
									First Name
								</label>
								<input
									type="text"
									id={firstNameId}
									value={firstName}
									onChange={(e) => setFirstName(e.target.value)}
									required
									className="w-full h-11.5 px-4 py-4 border-2 border-gray/40 rounded-full bg-white text-lg focus:outline-none focus:border-gray transition-colors"
									style={{ fontFamily: "NexonLv1Gothic", fontSize: "18px" }}
								/>
							</div>

							{/* Last Name 입력 */}
							<div className="flex-col justify-center">
								<label
									htmlFor="lastName"
									className="block text-lg font-bold text-gray mb-2 text-start w-140"
									style={{ fontFamily: "NexonLv1Gothic" }}
								>
									Last Name
								</label>
								<input
									type="text"
									id={lastNameId}
									value={lastName}
									onChange={(e) => setLastName(e.target.value)}
									required
									className="w-full h-11.5 px-4 py-4 border-2 border-gray/40 rounded-full bg-white text-lg focus:outline-none focus:border-gray transition-colors"
									style={{ fontFamily: "NexonLv1Gothic", fontSize: "18px" }}
								/>
							</div>
							{/* Email 입력 */}
							<div className="flex-col justify-center">
								<label
									htmlFor="email"
									className="block text-lg font-bold text-gray mb-2 text-start w-140"
									style={{ fontFamily: "NexonLv1Gothic" }}
								>
									Email
								</label>
								<input
									type="email"
									id={emailId}
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									className="w-full h-11.5 px-4 py-4 border-2 border-gray/40 rounded-full bg-white text-lg focus:outline-none focus:border-gray transition-colors"
									style={{ fontFamily: "NexonLv1Gothic", fontSize: "18px" }}
								/>
							</div>

							{/* Password 입력 */}
							<div className="flex-col justify-center">
								<label
									htmlFor="password"
									className="block text-lg font-bold text-gray mb-2 text-start w-140"
									style={{ fontFamily: "NexonLv1Gothic" }}
								>
									Password
								</label>
								<input
									type="password"
									id={passwordId}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									className="w-full h-11.5 px-4 py-4 border-2 border-gray/40 rounded-full bg-white text-lg focus:outline-none focus:border-gray transition-colors"
									style={{ fontFamily: "NexonLv1Gothic", fontSize: "18px" }}
								/>
							</div>

							<div className="text-center pt-4">
								{/* Create 버튼 */}
								<div className="flex gap-4 pt-12 justify-center">
									{/* Sign in 버튼 */}
									<button
										type="submit"
										className="flex py-3 pl-8 pr-8 rounded-full bg-gray/20 text-gray text-lg font-bold hover:bg-primary/40 hover:text-white transition-colors"
										style={{ fontFamily: "NexonLv1Gothic" }}
									>
										Create Account
									</button>

									{/* Create Account 버튼 */}
									<button
										type="button"
										onClick={() => navigate("/login")}
										className="flex py-3 pl-8 pr-8 rounded-full bg-gray/20 text-gray text-lg font-bold hover:bg-primary/40 hover:text-white transition-colors"
										style={{ fontFamily: "NexonLv1Gothic" }}
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

export default SignUpForm;
