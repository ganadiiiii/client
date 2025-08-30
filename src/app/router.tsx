import { Routes, Route } from "react-router-dom"
import LoginForm from "../features/login/components/LoginForm";
import SignUpForm from "../features/login/components/SignUpForm";
import CustomizingPage from "./pages/CustomizingPage";
import CustomizingResultPage from "./pages/CustomizingResultPage";
import ArchivePage from "./pages/ArchivePage";

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/customizing" element={<CustomizingPage />} />
			<Route path="/customizing/result" element={<CustomizingResultPage />} />
			<Route path="/archive" element={<ArchivePage />} />
			<Route path="/login" element={<LoginForm />} />
			<Route path="/signup" element={<SignUpForm />} />
		</Routes>
	);
};
