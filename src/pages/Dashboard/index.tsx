import useAuth from "@/hooks/useAuth";
import Iconify from "@components/iconify";
import { Avatar, IconButton } from "@mui/material";
import { Tooltip } from "antd";
import React from "react";

const Dashboard: React.FC = () => {
	const { user } = useAuth();

	const orders = JSON.parse(localStorage.getItem("orders") || "[]") || [];

	console.log(orders);

	return (
		<div>
			<div className="flex flex-row gap-3 items-center p-3 bg-slate-100 rounded-md">
				<Avatar
					src={user?.photoURL}
					variant="rounded"
				/>
				<div className="flex flex-col flex-1">
					<h1 className="font-bold">{user?.displayName}</h1>
					<h2 className="text-sm">{user?.email}</h2>
				</div>
				<div>
					<Tooltip title="Logout">
						<IconButton>
							<Iconify icon="mdi:logout" />
						</IconButton>
					</Tooltip>
				</div>
			</div>
			<div></div>
		</div>
	);
};

export default Dashboard;
