import { useReducer } from "react";

const initialState = {
	username: "",
	password: "",
	usernameHint: "",
	passwordHint: "",
	isChecked: false,
};

function loginReducer(state, { type, fieldName, payload }) {
	switch (type) {
		case "field": {
			return {
				...state,
				[fieldName]: payload,
			};
		}
		case "success": {
			return {
				username: "",
				password: "",
				usernameHint: "",
				passwordHint: "",
				isChecked: false,
			};
		}
		case "error": {
			return {
				...state,
				usernameHint: "",
				passwordHint: "",
			};
		}
		case "errorUsername": {
			return {
				...state,
				usernameHint: "Enter your name!",
				passwordHint: "",
			};
		}
		case "errorPassword": {
			return {
				...state,
				usernameHint: "",
				passwordHint: "Enter your password!",
			};
		}
		default:
			throw new Error("Error in login reducer case: " + type);
	}
}

const useLogin = () => {
	const [state, dispatch] = useReducer(loginReducer, initialState);
	const { username, password } = state;

	// When the user clicks on the Form's submit button, this function handle process
	const onSubmit = (e) => {
		e.preventDefault();

		if (username.trim() === "ejiro" && password.trim() === "12345678") {
			dispatch({ type: "success" });
			document.getElementById("show").style.transform = "translateX(150%)";
			alert("Successfully loged in!");
		} else if (username.trim() === "") {
			dispatch({ type: "errorUsername" });
		} else if (password.trim() === "") {
			dispatch({ type: "errorPassword" });
		} else {
			dispatch({ type: "error" });
			alert("Incorrect username or password!");
		}
	};

	return [state, dispatch, onSubmit];
};

export default useLogin;
