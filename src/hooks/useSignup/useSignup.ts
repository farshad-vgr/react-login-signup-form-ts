import { useReducer } from "react";
import { toast } from "react-toastify";

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

function signupReducer(state: State, action: Action): State {
	const { type, fieldName, payload } = action;

	switch (type) {
		case "field": {
			return {
				...state,
				[fieldName]: payload,
				usernameHint: "",
				passwordHint: "",
				passwordConfirmHint: "",
				incorrectConfirmHint: "",
				emailHint: "",
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

type CustomHook = () => { state: State; dispatch: React.Dispatch<Action>; onRegister: (e: React.FormEvent<HTMLFormElement>) => void };

const useSignup: CustomHook = () => {
	const [state, dispatch] = useReducer(signupReducer, initialState);

	// When the user clicks on the Form's submit button, this function handle process
	const onRegister = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();

		const { username, password, passwordConfirm, email } = state;

		// Evaluating input values and then showing the proper result to the user
		if (formValidator(username, password, passwordConfirm, email)) {
			dispatch({ type: "success" });
			[...(document.querySelectorAll(".show-hide i") as NodeListOf<HTMLElement>)].map((btn) => (btn.style.transform = "translateX(150%)"));
			toast.info(`Successfully signed up ( ${username} )!`);
			toast.clearWaitingQueue();
		} else if (username.trim() === "") {
			dispatch({ type: "errorUsername" });
		} else if (password.trim() === "") {
			dispatch({ type: "errorPassword" });
		} else if (passwordConfirm.trim() === "") {
			dispatch({ type: "errorPasswordConfirm" });
		} else if (password.trim() !== passwordConfirm.trim()) {
			dispatch({ type: "errorIncorrectConfirm" });
		} else if (email.trim() === "") {
			dispatch({ type: "errorEmail" });
		}
	};

	function formValidator(usernameValue: string, passwordValue: string, passwordConfirmValue: string, emailValue: string): boolean {
		if (
			usernameValue.length > 0 &&
			!/^\s*$/.test(usernameValue) &&
			passwordValue.length > 0 &&
			!/^\s*$/.test(passwordValue) &&
			passwordConfirmValue.length > 0 &&
			!/^\s*$/.test(passwordConfirmValue) &&
			emailValue.length > 0 &&
			!/^\s*$/.test(emailValue)
		) {
			return true;
		} else return false;
	}

	return { state, dispatch, onRegister };
};

export default useSignup;
