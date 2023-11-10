import React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/service/firebase";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { saveToken, saveUser } from "@/store/auth";
import { Navigate, useSearchParams } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const provider = new GoogleAuthProvider();

const Sign: React.FC = () => {
	const dispatch = useDispatch();
	let [searchParams] = useSearchParams();

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

	const { isLoggedIn } = useAuth();

	return !isLoggedIn ? (
		<div className="m-6 py-10">
			<h1 className="text-2xl font-bold text-center">😇 Let's get Started</h1>
			<p className="text-center my-2 font-semibold text-slate-600">
				Sign up to the family and get started immediately
			</p>
			<div className="w-fit mx-auto mt-8">
				<button
					type="button"
					className="text-secondary w-full  bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
					onClick={signInWithGoogle}
				>
					<svg
						className="mr-2 -ml-1 w-4 h-4"
						aria-hidden="true"
						focusable="false"
						data-prefix="fab"
						data-icon="google"
						role="img"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 488 512"
					>
						<path
							fill="currentColor"
							d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
						></path>
					</svg>
					<span className="text-white">Sign up with Google</span>
					<div></div>
				</button>
			</div>
		</div>
	) : (
		<Navigate to={searchParams.get("redirect") || "/app/user"} />
	);
};

export default Sign;
