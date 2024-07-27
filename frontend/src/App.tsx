import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProvider";
import ProtectedRoute from "@/components/ProtectedRoute";
import SignUpPage from "@/pages/signup";
import ChatPage from "@/pages/chat";
import LoginPage from "@/pages/login";
import PublicRoute from "@/components/PublicRoute";
import NotFoundPage from "@/pages/notfound";

const App = () => {
	const { token, user } = useAuth();

	return (
		<Routes>
			<Route path="/" element={
				token && user?._id ? (
					<Navigate to="/chat" />
				) : (
					<Navigate to="/login" />
				)
			} />

			<Route path="/chat" element={
				<ProtectedRoute>
					<ChatPage />
				</ProtectedRoute>
			} />

			<Route path="/signup" element={
				<PublicRoute>
					<SignUpPage />
				</PublicRoute>
			} />

			<Route path="/login" element={
				<PublicRoute>
					<LoginPage />
				</PublicRoute>
			} />

			<Route path="*" element={<NotFoundPage />} />
		</Routes>
	);
}

export default App;
