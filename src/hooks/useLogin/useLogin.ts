import { MutableRefObject, useReducer } from "react";
import { toast } from "react-toastify";

interface State {
	username: string;
	password: string;
	usernameHint: string;
	passwordHint: string;
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
	usernameHint: "",
	passwordHint: "",
	isChecked: false,
};

function loginReducer(state: State, action: Action): State {
	const { type, fieldName, payload } = action;

	switch (type) {
		case "field": {
			return {
				...state,
				[fieldName]: payload,
				usernameHint: "",
				passwordHint: "",
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

type CustomHook = (ref: MutableRefObject<HTMLElement>) => { state: State; dispatch: React.Dispatch<Action>; onSubmit: (e: React.FormEvent<HTMLFormElement>) => void };

const useLogin: CustomHook = (ref) => {
	const [state, dispatch] = useReducer(loginReducer, initialState);

	// When the user clicks on the Form's submit button, this function handle process
	const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();

		// Destructuring state values for easier usage
		const { username, password } = state;

		// Evaluating input values and then showing the proper result to the user
		if (formValidator(username, password)) {
			dispatch({ type: "success" });
			toast.success(`Successfully loged in ${username.toUpperCase()}!`);
			toast.clearWaitingQueue();
			ref.current.style.transform = "translateX(150%)";
		} else if (state.username.trim() === "") {
			dispatch({ type: "errorUsername" });
		} else if (state.password.toString().trim() === "") {
			dispatch({ type: "errorPassword" });
		} else {
			dispatch({ type: "error" });
			toast.warn("Incorrect username or password! try this:\nusername = ejiro\npassword = 12345678", { autoClose: false });
			toast.clearWaitingQueue();
		}
	};

	function formValidator(usernameValue: string, passwordValue: string): boolean {
		if (
			usernameValue.length > 0 &&
			!/^\s*$/.test(usernameValue) &&
			usernameValue.trim() === "ejiro" &&
			passwordValue.length > 0 &&
			!/^\s*$/.test(passwordValue) &&
			passwordValue.trim() === "12345678"
		) {
			return true;
		} else return false;
	}

	return { state, dispatch, onSubmit };
};

export default useLogin;
