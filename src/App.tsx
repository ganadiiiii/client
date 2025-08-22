import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import SignUpForm from "./components/SignUpForm";
import CustomizingPage from "./pages/CustomizingPage";
import CustomizingResultPage from "./pages/CustomizingResultPage";

function AppContent() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route path="/customizing" element={<CustomizingPage />} />
				<Route path="/customizing/result" element={<CustomizingResultPage />} />
				<Route path="/login" element={<LoginForm />} />
				<Route path="/signup" element={<SignUpForm />} />
				{/* <Route path="/" element={<LoginForm />} /> */}
			</Routes>
		</>
	);
}

function App() {
	return (
		<Router>
			<AppContent />
		</Router>
	);
}

export default App;
