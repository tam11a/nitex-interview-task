import Label from "@components/Label";
import { Button } from "@mui/material";
import { Input, message } from "antd";
import React from "react";

import emailjs from "@emailjs/browser";

const Contact: React.FC = () => {
	const [data, setData] = React.useState({
		to_name: "",
		reply_to: "",
		message: "",
	});

	React.useEffect(() => {
		emailjs.init(import.meta.env.VITE_EMAIL_API_KEY);
	});

	const submitMessage = async () => {
		const templateParams = {
			from_name: "Arc - Online Shop",
			to_name: data.to_name,
			reply_to: data.reply_to,
			message: data.message,
		};

		message.open({
			type: "loading",
			content: "Submitting your message..",
			duration: 0,
		});

		const response = await emailjs.send(
			import.meta.env.VITE_EMAIL_SERVICE_ID,
			import.meta.env.VITE_EMAIL_TEMPLATE_ID,
			templateParams
		);

		message.destroy();

		console.log(response);
	};

	return (
		<>
			<div>Contact</div>
			<Label isRequired>Name</Label>
			<Input
				placeholder="Name (For Example: John Doe)"
				value={data?.to_name}
				onChange={(e) =>
					setData((d) => ({
						...d,
						to_name: e.target.value,
					}))
				}
			/>
			<Label isRequired>Email</Label>
			<Input
				placeholder="example@email.com"
				value={data?.reply_to}
				onChange={(e) =>
					setData((d) => ({
						...d,
						reply_to: e.target.value,
					}))
				}
			/>
			<Label>Message</Label>
			<Input.TextArea
				placeholder="Aa..."
				value={data?.message}
				onChange={(e) =>
					setData((d) => ({
						...d,
						message: e.target.value,
					}))
				}
			/>
			<Button
				variant="contained"
				onClick={() => submitMessage()}
			>
				Submit
			</Button>
		</>
	);
};

export default Contact;
