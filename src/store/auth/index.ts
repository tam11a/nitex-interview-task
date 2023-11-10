import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: localStorage.getItem("user")
			? JSON.parse(localStorage.getItem("user") || "{}")
			: {},
		token: localStorage.getItem("token") || "",
	},
	reducers: {
		saveUser: (state, action) => {
			state.user = action.payload;
			localStorage.setItem("user", JSON.stringify(action.payload));
		},
		saveToken: (state, action) => {
			state.token = action.payload;
			localStorage.setItem("token", action.payload);
		},
		clean(state) {
			state.user = {};
			state.token = "";
		},
		pull(state) {
			state.user = localStorage.getItem("user")
				? JSON.parse(localStorage.getItem("user") || "{}")
				: {};
			state.token = localStorage.getItem("token") || "";
		},
	},
});

// Action creators are generated for each case reducer function
export const { saveUser, clean, pull, saveToken } = authSlice.actions;

export default authSlice.reducer;
