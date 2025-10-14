import { useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../../../api";

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
	const [duplicate, setDuplicate] = useState(false);

	const emailValid = {
		email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email),
	};

	const passwordValid = {
		hasEng: /[a-zA-Z]/.test(password),
		hasNum: /[0-9]/.test(password),
		hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
		length: password.length >= 8 && password.length <= 20,
	};

	const isPasswordValid =
		passwordValid.hasEng &&
		passwordValid.hasNum &&
		passwordValid.hasSpecial &&
		passwordValid.length;

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await authAPI.signup({
				firstName,
				lastName,
				email,
				password,
			});
			setTimeout(() => navigate("/login"), 2000);
		} catch (error: unknown) {
			const err = error as { response?: { status?: number } } | undefined;
			if (err?.response?.status === 409) {
				console.error("이미 존재하는 이메일입니다.");
				setDuplicate(true);
			} else {
				console.error("Login failed:", error);
			}
		}
	};

	return (
		<div className="flex items-start flex-col min-h-screen pt-[500px] 2xl:pt-[650px] bg-background">
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
								{!emailValid.email && (
									<p className="text-gray text-sm p-2 w-full text-start">
										이메일 형식이 올바르지 않습니다.
									</p>
								)}
								{duplicate && (
									<p className="text-gray text-sm p-2 w-full text-start">
										이미 존재하는 이메일입니다.
									</p>
								)}
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
								<ul className="text-sm flex flex-row gap-2 text-start w-full p-2">
									<li
										className={
											passwordValid.hasEng ? "text-primary" : "text-gray"
										}
									>
										✓ 영문
									</li>
									<li
										className={
											passwordValid.hasNum ? "text-primary" : "text-gray"
										}
									>
										✓ 숫자
									</li>
									<li
										className={
											passwordValid.hasSpecial ? "text-primary" : "text-gray"
										}
									>
										✓ 특수문자
									</li>
									<li
										className={
											passwordValid.length ? "text-primary" : "text-gray"
										}
									>
										✓ 8~20자
									</li>
								</ul>
							</div>

							<div className="text-center pt-4">
								<div className="flex gap-4 pt-12 justify-center">
									<button
										type="submit"
										disabled={!isPasswordValid || !emailValid.email}
										className="flex cursor-pointer py-3 pl-8 pr-8 rounded-full bg-gray/20 text-gray text-lg font-bold hover:bg-primary/40 hover:text-white transition-colors"
										style={{ fontFamily: "NexonLv1Gothic" }}
									>
										Create Account
									</button>
									<button
										type="button"
										onClick={() => navigate("/login")}
										className="flex cursor-pointer py-3 pl-8 pr-8 rounded-full bg-gray/20 text-gray text-lg font-bold hover:bg-primary/40 hover:text-white transition-colors"
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
			<footer className="w-full h-[36em] bg-transparent mt-auto">
				<img src="/src/assets/footer.png" className="w-full h-full" />
			</footer>
		</div>
	);
};

export default SignUpForm;
