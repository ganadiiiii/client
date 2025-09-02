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
<<<<<<< HEAD
					className="absolute top-0 left-0 w-screen h-[579px] z-0 bg-cover bg-center bg-no-repeat"
=======
					className="absolute top-0 left-0 w-screen h-160 z-0 bg-cover bg-center bg-no-repeat"
>>>>>>> 3a97378 (refactor: responsive nav bar)
					style={{ backgroundImage: "url('./src/assets/nav_bg.svg')" }}
				/>
			)}

			{/* 상단 바만 배경색이 변경되도록 분리 */}
			<div
				className={`fixed top-0 left-0 w-full z-10 transition-all duration-300 ease-in-out
<<<<<<< HEAD
        ${isScrolled ? "bg-background" : "bg-transparent"}
        h-[102px] flex items-center justify-between px-[300px]
=======
        ${isScrolled ? "bg-[#FCFBF6]" : "bg-transparent"}
        h-25.5 flex items-center justify-between px-[300px]
>>>>>>> 3a97378 (refactor: responsive nav bar)
      `}
			>
				{/* 로고 영역 - 좌우 300px 간격 */}
				<div>
					<Link to="/">
						<img src="./src/assets/logo.png" alt="Logo" className="h-12" />
					</Link>
				</div>

				{/* 중앙 메뉴 - 50px 간격 */}
				<div className="hidden xl:flex gap-[50px]">
					<Link
						to="/shop"
						className="text-[#5A5A5A] hover:text-black transition-colors text-[17px] font-bold"
						style={{
							fontFamily: "SUIT-Regular",
						}}
					>
						Shop
					</Link>
					<Link
						to="/customizing"
						className="text-[#5A5A5A] hover:text-black transition-colors text-[17px] font-bold"
						style={{
							fontFamily: "SUIT-Regular",
						}}
					>
						Customizing
					</Link>
					<Link
						to="/brand"
						className="text-[#5A5A5A] hover:text-black transition-colors text-[17px] font-bold"
						style={{
							fontFamily: "SUIT-Regular",
						}}
					>
						Brand
					</Link>
					<Link
						to="/archive"
						className="text-[#5A5A5A] hover:text-black transition-colors text-[17px] font-bold"
						style={{
							fontFamily: "SUIT-Regular",
						}}
					>
						Archive
					</Link>
				</div>

				{/* 우측 메뉴 - 300px 간격 */}
				<div className="flex items-center gap-[50px]">
					<Link
						to="/login"
						className="text-[#5A5A5A] hover:text-black transition-colors text-[17px] font-bold"
						style={{
							fontFamily: "SUIT-Regular",
						}}
					>
						Login
					</Link>
					<Link
						to="/cart"
						className="text-[#5A5A5A] hover:text-black transition-colors text-[17px] font-bold"
						style={{
							fontFamily: "SUIT-Regular",
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
