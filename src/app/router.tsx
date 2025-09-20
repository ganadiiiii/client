import { Route, Routes } from "react-router-dom";
import LoginForm from "../features/login/components/LoginForm";
import SignUpForm from "../features/login/components/SignUpForm";
import ArchivePage from "./pages/ArchivePage";
import CustomizingPage from "./pages/CustomizingPage";
import CustomizingResultPage from "./pages/CustomizingResultPage";
import ResultSentPage from "./pages/ResultSentPage";
import OrderPage from "./pages/OrderPage";
import FlowerInfoPage from "./pages/FlowerInfoPage";
import DeliveryPage from "./pages/DeliveryPage";
import PickupPage from "./pages/PickupPage";

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/customizing" element={<CustomizingPage />} />
			<Route path="/customizing/result" element={<CustomizingResultPage />} />
			<Route path="/customizing/result/sent" element={<ResultSentPage />} />
			<Route path="/archive" element={<ArchivePage />} />
			<Route path="/archive/:flowerId" element={<FlowerInfoPage />} />
			<Route path="/login" element={<LoginForm />} />
			<Route path="/signup" element={<SignUpForm />} />
			<Route path="/shop" element={<OrderPage />} />
			<Route path="/shop/delivery" element={<DeliveryPage />} />
			<Route path="/shop/pickup" element={<PickupPage />} />
		</Routes>
	);
};
