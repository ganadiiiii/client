import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const location = useLocation();
	const isAuthPage =
		location.pathname === "/login" || location.pathname === "/signup";

	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			setIsScrolled(scrollTop > 50);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<nav>
			{/* 배경 이미지 영역: 로그인/회원가입/메인/온보딩에서만 보이도록 */}
			{isAuthPage && (
				<div
					className="absolute top-0 left-0 w-full h-[579px] z-0 bg-cover bg-center bg-no-repeat"
					style={{ backgroundImage: "url('./src/assets/nav_bg.svg')" }}
				/>
			)}

			{/* 상단 바만 배경색이 변경되도록 분리 */}
			<div
				className={`fixed top-0 left-0 w-full z-10 transition-all duration-300 ease-in-out
        ${isScrolled ? "bg-[#FCFBF6]" : isAuthPage ? "bg-transparent" : "bg-[#FCFBF6]"}
        h-[102px] flex items-center justify-between px-8
      `}
			>
				{/* 로고 영역 - 좌우 300px 간격 */}
				<div className="flex items-center ml-[300px]">
					<Link to="/">
						<img
							src="./src/assets/logo.png"
							alt="Logo"
							className={`transition-all duration-1000 ease-in-out h-12 w-auto`}
						/>
					</Link>
				</div>

				{/* 중앙 메뉴 - 50px 간격 */}
				<div className="hidden md:flex items-center" style={{ gap: "50px" }}>
					<Link
						to="/shop"
						className="hover:opacity-70 transition-opacity text-[17px] font-bold"
						style={{
							fontFamily: "SUIT-Regular",
							color: "rgba(90, 90, 90, 0.8)",
						}}
					>
						Shop
					</Link>
					<Link
						to="/customizing"
						className="hover:opacity-70 transition-opacity text-[17px] font-bold"
						style={{
							fontFamily: "SUIT-Regular",
							color: "rgba(90, 90, 90, 0.8)",
						}}
					>
						Customizing
					</Link>
					<Link
						to="/brand"
						className="hover:opacity-70 transition-opacity text-[17px] font-bold"
						style={{
							fontFamily: "SUIT-Regular",
							color: "rgba(90, 90, 90, 0.8)",
						}}
					>
						Brand
					</Link>
					<Link
						to="/archive"
						className="hover:opacity-70 transition-opacity text-[17px] font-bold"
						style={{
							fontFamily: "SUIT-Regular",
							color: "rgba(90, 90, 90, 0.8)",
						}}
					>
						Archive
					</Link>
				</div>

				{/* 우측 메뉴 - 300px 간격 */}
				<div
					className="flex items-center space-x-6 mr-[300px]"
					style={{ gap: "70px" }}
				>
					<Link
						to="/login"
						className="hover:opacity-70 transition-opacity text-[17px] font-medium"
						style={{
							fontFamily: "SUIT-Regular",
							color: "#646464",
						}}
					>
						Login
					</Link>
					<Link
						to="/cart"
						className="hover:opacity-70 transition-opacity text-[17px] font-medium"
						style={{
							fontFamily: "SUIT-Regular",
							color: "#646464",
						}}
					>
						Cart
					</Link>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
