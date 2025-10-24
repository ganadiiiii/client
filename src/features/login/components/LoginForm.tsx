import { useId, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../../../api";
import footerPng from "../../../assets/footer.png";

const LoginForm: React.FC = () => {
	const navigate = useNavigate();
	const emailId = useId();
	const passwordId = useId();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// 페이지 로드 시 스크롤을 맨 위로 리셋
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!email.trim() || !password.trim()) {
			return;
		}
		try {
			const data = await authAPI.login(email, password);
			const { accessToken, refreshToken } = data;
			const { userId, lastName, firstName } = data.user;
			const name = `${lastName} ${firstName}`;

			localStorage.setItem("accessToken", accessToken);
			localStorage.setItem("refreshToken", refreshToken);
			localStorage.setItem("userId", userId);
			localStorage.setItem("name", name);
			// 로그인 성공 후 메인 페이지로 이동
			navigate("/main");
		} catch (error) {
			console.error("Login failed:", error);
		}
	};

	return (
		<div className="flex items-start flex-col min-h-screen pt-[500px] 3xl:pt-[650px] 4xl:pt-[800px] bg-background">
			<div className="flex justify-center px-4 w-full">
				<div className="w-full max-w-6xl h-[500px] 3xl:h-[600px] 4xl:h-[700px]">
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
							className="px-8 text-3xl text-nowrap text-purple font-normal"
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
									htmlFor="emailId"
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
									className="w-140 h-11.5 px-4 py-4 border-2 border-gray/40 rounded-full bg-white text-lg focus:outline-none focus:border-gray transition-colors"
									style={{ fontFamily: "NexonLv1Gothic" }}
								/>
							</div>

							{/* Password 입력 */}
							<div className="flex-col justify-center">
								<label
									htmlFor="passwordId"
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
									className="w-140 h-11.5 px-4 py-4 border-2 border-gray/40 rounded-full bg-white text-lg focus:outline-none focus:border-gray transition-colors"
									style={{ fontFamily: "NexonLv1Gothic" }}
								/>
							</div>

							{/* 버튼들 */}
							<div className="flex gap-4 pt-12 justify-center">
								{/* Sign in 버튼 */}
								<button
									type="submit"
									className="flex cursor-pointer py-3 pl-8 pr-8 rounded-full bg-gray/20 text-gray text-lg font-bold hover:bg-primary/40 hover:text-white transition-colors"
									style={{ fontFamily: "NexonLv1Gothic" }}
								>
									Sign in
								</button>

								{/* Create Account 버튼 */}
								<button
									type="button"
									onClick={() => navigate("/signup")}
									className="flex cursor-pointer py-3 pl-8 pr-8 rounded-full bg-gray/20 text-gray text-lg font-bold hover:bg-primary/40 hover:text-white transition-colors"
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
			<footer className="w-full h-[36em] bg-transparent mt-auto">
				<img src={footerPng} className="w-full h-full" />
			</footer>
		</div>
	);
};

export default LoginForm;
