import { Button } from "@mui/material";
import React from "react";

const Header: React.FC = () => {
	return (
		<header className="bg-primary-light px-8 py-3 shadow-md">
			<div className="max-w-5xl flex flex-row items-center justify-between mx-auto">
				<img
					src="/logo.svg"
					alt="logo"
					className="max-h-12"
				/>
				<Button
					variant="contained"
					className="text-white bg-primary-dark rounded-full"
				>
					Sign in
				</Button>
			</div>
		</header>
	);
};

export default Header;
