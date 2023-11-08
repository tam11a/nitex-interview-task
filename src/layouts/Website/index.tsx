import React from "react";
import { Outlet } from "react-router-dom";

const WebsiteLayout: React.FC = () => {
	return (
		<>
			<Outlet />
		</>
	);
};

export default WebsiteLayout;
