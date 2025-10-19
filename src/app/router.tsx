import { Route, Routes } from "react-router-dom";
import LoginForm from "../features/login/components/LoginForm";
import SignUpForm from "../features/login/components/SignUpForm";
import ArchivePage from "./pages/ArchivePage";
import CustomizingPage from "./pages/CustomizingPage";
import CustomizingResultPage from "./pages/CustomizingResultPage";
import DeliveryPage from "./pages/DeliveryPage";
import FlowerInfoPage from "./pages/FlowerInfoPage";
import OrderPage from "./pages/OrderPage";
import PickupPage from "./pages/PickupPage";
import ResultSentPage from "./pages/ResultSentPage";
import Cart from "../features/login/components/Cart";
import ChatStartPage from "./pages/ChatStartPage";
import ChatPage from "./pages/ChatPage";
import MainPage from "./pages/MainPage";
import ShopPage from "./pages/ShopPage";
import PageNotFound from "./pages/404";

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<MainPage />} />
			<Route path="/customizing" element={<CustomizingPage />} />
			<Route path="/customizing/result" element={<CustomizingResultPage />} />
			<Route path="/customizing/result/sent" element={<ResultSentPage />} />
			<Route path="/archive" element={<ArchivePage />} />
			<Route path="/archive/:flowerId" element={<FlowerInfoPage />} />
			<Route path="/login" element={<LoginForm />} />
			<Route path="/signup" element={<SignUpForm />} />
			<Route path="/order" element={<OrderPage />} />
			<Route path="/order/delivery" element={<DeliveryPage />} />
			<Route path="/order/pickup" element={<PickupPage />} />
			<Route path="/cart" element={<Cart />} />
			<Route path="/order/pickup/chat-start" element={<ChatStartPage />} />
			<Route path="/order/pickup/chat" element={<ChatPage />} />
			<Route path="/shop" element={<ShopPage />} />
			{/* 404 - Catch all unmatched routes */}
			<Route path="*" element={<PageNotFound />} />
		</Routes>
	);
};
