import useAuth from "@/hooks/useAuth";
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AppLayout: React.FC = () => {
	const { isLoggedIn } = useAuth();
	const location = useLocation();

	return isLoggedIn ? (
		<>
			<Outlet />
		</>
	) : (
		<Navigate to={`/sign?redirect=${location.pathname}`} />
	);
};

export default AppLayout;
