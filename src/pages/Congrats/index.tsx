import { Avatar } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

const Congrats: React.FC = () => {
	const { name } = useParams<{ name: string }>();
	return (
		<div>
			<Avatar
				src={"/confirm.svg"}
				className="h-[70vw] w-[70vw] max-h-96 max-w-sm mx-auto"
			/>
			<h1 className="text-center text-2xl mb-3">
				Congratulations <b>{name}</b>!!
			</h1>
			<p className="text-center text-primary-600">
				Your order has been confirmed!
			</p>
		</div>
	);
};

export default Congrats;
