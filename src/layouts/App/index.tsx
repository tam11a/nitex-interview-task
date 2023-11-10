import useAuth from "@/hooks/useAuth";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AppLayout: React.FC = () => {
	const { isLoggedIn } = useAuth();
	return isLoggedIn ? (
		<>
			<Outlet />
		</>
	) : (
		<Navigate to={`/sign`} />
	);
};

export default AppLayout;
