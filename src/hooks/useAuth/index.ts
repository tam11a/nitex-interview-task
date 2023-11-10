import { useSelector } from "react-redux";

const useAuth = () => {
	const auth = useSelector((state: any) => state.auth);

	return {
		...auth,
		isLoggedIn: !!auth.token,
	};
};

export default useAuth;
