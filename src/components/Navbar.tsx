import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import bg from "../assets/nav_bg.png";
import logoWhite from "../assets/logo-white.png";
import logoBlack from "../assets/logo-black.png";

const Navbar: React.FC = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const location = useLocation();
	const isAuthPage =
		location.pathname === "/login" || location.pathname === "/signup";
	const isMainPage = location.pathname === "/";
	const isShopPage = location.pathname === "/shop";

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
			{/* 배경 이미지 영역: 로그인/회원가입에서만 보이도록 */}
			{isAuthPage && (
				<>
					<div
						className="absolute top-0 left-0 w-screen h-[357px] 3xl:h-[481px] 4xl:h-[605px] z-0 bg-cover bg-center bg-no-repeat"
						style={{ backgroundImage: `url(${bg})` }}
					/>
					<div
						className="absolute top-[357px] 3xl:top-[481px] 4xl:top-[605px] w-screen z-0"
						style={{
							height: "2em",
							background:
								"linear-gradient(90deg, #FFA8B5 0%, #E3CAEB 37.98%, #F8CBD6 68.27%, #FFBBD8 100%)",
						}}
					/>
				</>
			)}

			{/* 상단 바만 배경색이 변경되도록 분리 */}
			<div
				className={`fixed top-0 left-0 w-full z-10 transition-all duration-300 ease-in-out
				${isScrolled && !isMainPage ? "bg-background" : "bg-transparent"}
				h-[80px] 3xl:h-[102px] 4xl:h-[124px] flex items-center justify-between px-[300px]
			`}
			>
				{/* 로고 영역 - 좌우 300px 간격 */}
				<div>
					<Link to="/">
						<motion.img src={isMainPage ? logoWhite : logo} alt="Logo" className="h-12" whileHover={{ scale: 1.06,  }} transition={{ type: "spring", stiffness: 300 }} />
					</Link>
				</div>

			{/* 중앙 메뉴 - 50px 간격 */}
			<div className="hidden xl:flex gap-[10px] 4xl:gap-[3.125em]">
				<motion.div
					whileHover={{ rotate: -5 }}
					transition={{ type: "spring", stiffness: 300 }}
				>
					<Link
						to="/shop"
						className={`flex items-center justify-center px-6 py-1.5 rounded-full border-2 border-transparent ${isMainPage ? 'text-white hover:border-white' : 'text-primary hover:border-primary'} transition-all text-lg font-bold`}
						style={{
							fontFamily: "SUIT-Regular",
						}}
					>
						Shop
					</Link>
				</motion.div>
				<motion.div
					whileHover={{ rotate: 5 }}
					transition={{ type: "spring", stiffness: 300 }}
				>
					<Link
						to="/customizing"
						className={`flex items-center justify-center px-6 py-1.5 rounded-full border-2 border-transparent ${isMainPage ? 'text-white hover:border-white' : 'text-primary hover:border-primary'} transition-all text-lg font-bold`}
						style={{
							fontFamily: "SUIT-Regular",
						}}
					>
						Customizing
					</Link>
				</motion.div>
				<motion.div
					whileHover={{ rotate: -8 }}
					transition={{ type: "spring", stiffness: 300 }}
				>
					<Link
						to="/order"
						className={`flex items-center justify-center px-6 py-1.5 rounded-full border-2 border-transparent ${isMainPage ? 'text-white hover:border-white' : 'text-primary hover:border-primary'} transition-all text-lg font-bold`}
						style={{
							fontFamily: "SUIT-Regular",
						}}
					>
						Order
					</Link>
				</motion.div>
				<motion.div
					whileHover={{ rotate: 5 }}
					transition={{ type: "spring", stiffness: 300 }}
				>
					<Link
						to="/archive"
						className={`flex items-center justify-center px-6 py-1.5 rounded-full border-2 border-transparent ${isMainPage ? 'text-white hover:border-white' : 'text-primary hover:border-primary'} transition-all text-lg font-bold`}
						style={{
							fontFamily: "SUIT-Regular",
						}}
					>
						Archive
					</Link>
				</motion.div>
			</div>


			{/* 우측 메뉴 - 300px 간격 */}
			<div className="flex items-center gap-[10px] 4xl:gap-[3.125em]">
				<motion.div
					whileHover={{ rotate: -5 }}
					transition={{ type: "spring", stiffness: 300 }}
				>
					<Link
						to="/login"
						className={`flex items-center justify-center px-6 py-1.5 rounded-full border-2 border-transparent ${isMainPage ? 'text-white hover:border-white' : 'text-primary hover:border-primary'} transition-all text-lg font-bold`}
						style={{
							fontFamily: "SUIT-Regular",
						}}
					>
						Login
					</Link>
				</motion.div>
				<motion.div
					whileHover={{ rotate: -3 }}
					transition={{ type: "spring", stiffness: 300 }}
				>
					<Link
						to="/cart"
						className={`flex items-center justify-center px-6 py-1.5 rounded-full border-2 border-transparent ${isMainPage ? 'text-white hover:border-white' : 'text-primary hover:border-primary'} transition-all text-lg font-bold`}
						style={{
							fontFamily: "SUIT-Regular",
						}}
					>
						Cart
					</Link>
				</motion.div>
			</div>
			</div>
		</nav>
	);
};

export default Navbar;
