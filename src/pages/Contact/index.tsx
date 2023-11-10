import Label from "@components/Label";
import { Button } from "@mui/material";
import { Input, message } from "antd";
import React from "react";

import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";
import Iconify from "@components/iconify";

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
		if (response.status === 200) {
			message.success("Message sent successfully!");
			setData({
				to_name: "",
				reply_to: "",
				message: "",
			});
		} else {
			message.error("Message failed to send! Try again later.");
		}
	};

	return (
		<>
			<h1 className="text-3xl font-semibold text-center mt-10">
				Contact <span className="text-primary underline">Arc</span>
			</h1>
			<div className="max-w-sm bg-slate-100 py-3 mt-10 px-4 [&>*]:my-1 mx-auto rounded">
				<Label
					isRequired
					className="font-bold"
				>
					Name
				</Label>
				<Input
					size="large"
					placeholder="Name (For Example: John Doe)"
					value={data?.to_name}
					onChange={(e) =>
						setData((d) => ({
							...d,
							to_name: e.target.value,
						}))
					}
				/>
				<Label
					isRequired
					className="font-bold"
				>
					Email
				</Label>
				<Input
					size="large"
					placeholder="example@email.com"
					value={data?.reply_to}
					onChange={(e) =>
						setData((d) => ({
							...d,
							reply_to: e.target.value,
						}))
					}
				/>
				<Label className="font-bold">Message</Label>
				<Input.TextArea
					size="large"
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
					size="large"
					fullWidth
					variant="contained"
					onClick={() => submitMessage()}
				>
					Submit
				</Button>
			</div>
			<div className="flex flex-col items-center justify-center gap-5 mt-10">
				<p>Or</p>
				<Button
					variant="outlined"
					size="large"
					className="mx-auto rounded-full"
					component={Link}
					to={"/search"}
					startIcon={<Iconify icon={"teenyicons:search-solid"} />}
				>
					Browse Products...
				</Button>
			</div>
		</>
	);
};

export default Contact;
