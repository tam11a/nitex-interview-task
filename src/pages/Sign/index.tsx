import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/service/firebase";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { saveToken, saveUser } from "@/store/auth";

const provider = new GoogleAuthProvider();

const Sign: React.FC = () => {
	const dispatch = useDispatch();

	const signInWithGoogle = () => {
		signInWithPopup(auth, provider)
			.then((result: any) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential?.accessToken;
				// The signed-in user info.
				const user = result.user;

				dispatch(saveUser(user));
				dispatch(saveToken(token));
			})
			.catch((error) => {
				// Handle Errors here.
				const errorMessage = error.message;
				message.error(errorMessage);
			});
	};

	return (
		<div>
			<button onClick={signInWithGoogle}>Sign in with Google</button>
		</div>
	);
};

export default Sign;
