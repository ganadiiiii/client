import { useId, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
	const navigate = useNavigate();
	const emailId = useId();
	const passwordId = useId();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// 로그인 로직 구현
		console.log("Login attempted with:", { email, password });
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
								<div key={i} className="w-2 h-2 bg-primary/40 rounded-full" />
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
								<div key={i} className="w-2 h-2 bg-primary/40 rounded-full" />
							))}
						</div>
					</div>

					{/* 로그인 폼 */}
					<div className="flex justify-center">
						<form
							onSubmit={handleSubmit}
							className="flex flex-col items-center space-y-4 w-full max-w-3xl"
						>
							{/* Email 입력 */}
							<div className="flex-col justify-center">
								<label
									htmlFor="email"
									className="block text-[18px] font-bold text-gray mb-2 text-start w-140"
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
									className="w-140 h-11.5 px-4 py-4 border-2 border-gray/60 rounded-full bg-white text-lg focus:outline-none focus:border-gray-400 transition-colors"
									style={{ fontFamily: "NexonLv1Gothic" }}
								/>
							</div>

							{/* Password 입력 */}
							<div className="flex-col justify-center">
								<label
									htmlFor="password"
									className="block font-bold text-gray text-lg mb-2 w-140"
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
									className="w-140 h-11.5 px-4 py-4 border-2 border-gray/60 rounded-full bg-white text-lg focus:outline-none focus:border-gray-400 transition-colors"
									style={{ fontFamily: "NexonLv1Gothic" }}
								/>
							</div>

							{/* 버튼들 */}
							<div className="flex gap-4 pt-12 justify-center">
								{/* Sign in 버튼 */}
								<button
									type="submit"
									className="flex py-3 pl-8 pr-8 rounded-full bg-gray/20 text-gray text-lg font-bold hover:bg-primary/40 hover:text-white transition-colors"
									style={{ fontFamily: "NexonLv1Gothic" }}
								>
									Sign in
								</button>

								{/* Create Account 버튼 */}
								<button
									type="button"
									onClick={() => navigate("/signup")}
									className="flex py-3 pl-8 pr-8 rounded-full bg-gray/20 text-gray text-lg font-bold hover:bg-primary/40 hover:text-white transition-colors"
									style={{ fontFamily: "NexonLv1Gothic" }}
								>
									Create Account
								</button>
							</div>

							{/* Reset password 링크 */}
							<div className="text-center">
								<Link
									to="/forgot-password"
									className="hover:text-gray-700 transition-colors hover:underline text-lg font-light text-gray"
									style={{ fontFamily: "NexonLv1Gothic" }}
								>
									Forgot password?
								</Link>
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
