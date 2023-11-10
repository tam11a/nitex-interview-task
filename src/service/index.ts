// Axios
import axios from "axios";

// Configuring root url
export const rootURL: string = import.meta.env.VITE_BASE_URL;

// configuring axios on initial load with the authorization token from localstorage it exists
const instance = axios.create({
	baseURL: rootURL,
	timeout: 10000,
	headers: {
		Authorization:
			sessionStorage.getItem("token") || localStorage.getItem("token")
				? `Bearer ${
						sessionStorage.getItem("token") || localStorage.getItem("token")
				  }`
				: "",
		accept: "*/*",
	},
});

export default instance;
