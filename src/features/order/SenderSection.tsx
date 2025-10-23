import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { authAPI } from "../../api";
import iconFullSvg from "../../assets/icon-full.svg";
import iconCheckSvg from "../../assets/icon-check.svg";

interface User {
	id: string;
	name: string;
	email: string;
}

interface SenderSectionRef {
	isValid: () => boolean;
}

export const SenderSection = forwardRef<SenderSectionRef>((_, ref) => {
	const [phone, setPhone] = useState("");
	const [user, setUser] = useState<User | null>(null);
	// 전화번호 자동 하이픈 추가
	const formatPhoneNumber = (value: string) => {
		const onlyNums = value.replace(/[^0-9]/g, "");
		if (onlyNums.length <= 3) return onlyNums;
		if (onlyNums.length <= 7)
			return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
		return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(7, 11)}`;
	};

	const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPhone(formatPhoneNumber(e.target.value));
	};

	const getUser = async () => {
		try {
			const response = await authAPI.me();
			const userData: User = {
				id: response.userId,
				name: `${response.lastName}${response.firstName}`.trim(),
				email: response.email,
			};
			setUser(userData);
		} catch (error) {
			console.error("유저 정보 가져오기 실패:", error);
		}
	};

	useEffect(() => {
		if (!user) getUser();
	}, [user]);

	// Validation check
	useImperativeHandle(ref, () => ({
		isValid: () => !!user && phone.length > 0,
	}));

	return (
		<section
			className="bg-transparent"
			style={{
				width: "42.4375em",
				height: "18em",
			}}
		>
			<h2
				className="w-full text-start text-2xl font-bold text-black mb-2.5"
				style={{ fontFamily: "NexonLv1Gothic" }}
			>
				보내는 사람
			</h2>
			<div
				className="p-9 rounded-[1.25em] bg-white w-full"
				style={{ boxShadow: "2px 2px 21.3px 0 rgba(0, 0, 0, 0.08)" }}
			>
				{/* 이름 선택 */}
				<div className="mb-6">
					<div className="flex items-center gap-2">
						<p
							className="text-black/60 text-base font-light"
							style={{ fontFamily: "NexonLv1Gothic" }}
						>
							이름
						</p>
						<img
							src={iconFullSvg}
							alt="check"
							className="w-5 h-5"
						/>
					</div>
					<div className="block flex items-center gap-4 py-2">
						<h2
							className="text-xl font-bold text-black"
							style={{ fontFamily: "NexonLv1Gothic" }}
						>
							{user?.name}
						</h2>
						<span
							className="text-black text-lg font-light"
							style={{ fontFamily: "NexonLv1Gothic" }}
						>
							{user?.email}
						</span>
					</div>
				</div>

				{/* 연락처 */}
				<div className="flex flex-col">
					<div className="flex items-center gap-2">
						<p
							className="text-black/60 text-base font-light"
							style={{ fontFamily: "NexonLv1Gothic" }}
						>
							연락처
						</p>
						<img
							src={
								phone
								? iconFullSvg
								: iconCheckSvg
							}
							className="w-5 h-5"
							alt="check"
						/>
					</div>
					<div className="block flex items-start">
						<input
							type="text"
							placeholder="연락처를 입력해주세요"
							value={phone}
							onChange={handlePhoneChange}
							className="w-[23em] h-[2.6em] px-5 mt-2.5 rounded-full bg-gray/10 border border-gray/40 text-black/80 focus:outline-none"
							style={{ fontFamily: "NexonLv1Gothic" }}
						/>
					</div>
				</div>
			</div>
		</section>
	);
});
