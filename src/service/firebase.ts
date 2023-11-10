// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyBkXTNpyJZ6K--k2_1jYLQzduhFnm8Uuqo",
	authDomain: "tam11a.firebaseapp.com",
	projectId: "tam11a",
	storageBucket: "tam11a.appspot.com",
	messagingSenderId: "12388468204",
	appId: "1:12388468204:web:be93889bc05939a263ecc9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
