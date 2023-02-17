import { useReducer } from "react";

interface State {
	username: string;
	password: string;
	passwordConfirm: string;
	email: string;
	usernameHint: string;
	passwordHint: string;
	passwordConfirmHint: string;
	incorrectConfirmHint: string;
	emailHint: string;
	isChecked: boolean;
}

interface Action {
	type: string;
	fieldName?: any;
	payload?: string | boolean;
}

const initialState: State = {
	username: "",
	password: "",
	passwordConfirm: "",
	email: "",
	usernameHint: "",
	passwordHint: "",
	passwordConfirmHint: "",
	incorrectConfirmHint: "",
	emailHint: "",
	isChecked: false,
};

function signupReducer(state: State, { type, fieldName, payload }: Action): State {
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
				passwordConfirm: "",
				email: "",
				usernameHint: "",
				passwordHint: "",
				passwordConfirmHint: "",
				incorrectConfirmHint: "",
				emailHint: "",
				isChecked: false,
			};
		}
		case "error": {
			return {
				...state,
				usernameHint: "",
				passwordHint: "",
				passwordConfirmHint: "",
				incorrectConfirmHint: "",
				emailHint: "",
			};
		}
		case "errorUsername": {
			return {
				...state,
				usernameHint: "Enter your name!",
				passwordHint: "",
				passwordConfirmHint: "",
				incorrectConfirmHint: "",
				emailHint: "",
			};
		}
		case "errorPassword": {
			return {
				...state,
				usernameHint: "",
				passwordHint: "Enter your password!",
				passwordConfirmHint: "",
				incorrectConfirmHint: "",
				emailHint: "",
			};
		}
		case "errorPasswordConfirm": {
			return {
				...state,
				usernameHint: "",
				passwordHint: "",
				passwordConfirmHint: "Enter your password again!",
				incorrectConfirmHint: "",
				emailHint: "",
			};
		}
		case "errorIncorrectConfirm": {
			return {
				...state,
				usernameHint: "",
				passwordHint: "",
				passwordConfirmHint: "Incorrect confirmation password!",
				incorrectConfirmHint: "",
				emailHint: "",
			};
		}
		case "errorEmail": {
			return {
				...state,
				usernameHint: "",
				passwordHint: "",
				passwordConfirmHint: "",
				incorrectConfirmHint: "",
				emailHint: "Enter your email!",
			};
		}
		default:
			throw new Error("Error in signup reducer case: " + type);
	}
}

const useSignup = () => {
	const [state, dispatch] = useReducer(signupReducer, initialState);
	
	// When the user clicks on the Form's submit button, this function handle process
	const onRegister = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		
		const { username, password, passwordConfirm, email } = state;
		
		if (username.trim() === "") {
			dispatch({ type: "errorUsername" });
		} else if (password.toString().trim() === "") {
			dispatch({ type: "errorPassword" });
		} else if (passwordConfirm.toString().trim() === "") {
			dispatch({ type: "errorPasswordConfirm" });
		} else if (password.toString().trim() !== passwordConfirm.toString().trim()) {
			dispatch({ type: "errorIncorrectConfirm" });
		} else if (email.trim() === "") {
			dispatch({ type: "errorEmail" });
		} else {
			dispatch({ type: "success" });
			[...(document.querySelectorAll(".show-hide i") as NodeListOf<HTMLLIElement>)].map((btn) => (btn.style.transform = "translateX(150%)"));
			alert("Successfully signed up!");
		}
	};

	return { state, dispatch, onRegister };
};

export default useSignup;
