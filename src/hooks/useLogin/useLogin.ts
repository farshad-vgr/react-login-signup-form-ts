import { useReducer } from "react";

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

type CustomHook = () => { state: State; dispatch: React.Dispatch<Action>; onSubmit: (e: React.FormEvent<HTMLFormElement>) => void };

const useLogin: CustomHook = () => {
	const [state, dispatch] = useReducer(loginReducer, initialState);
	
	// When the user clicks on the Form's submit button, this function handle process
	const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		
		const { username, password } = state;
		
		if (username.trim() === "ejiro" && password.toString().trim() === "12345678") {
			dispatch({ type: "success" });
			(document.getElementById("show") as HTMLElement).style.transform = "translateX(150%)";
			alert("Successfully loged in!");
		} else if (state.username.trim() === "") {
			dispatch({ type: "errorUsername" });
		} else if (state.password.toString().trim() === "") {
			dispatch({ type: "errorPassword" });
		} else {
			dispatch({ type: "error" });
			alert("Incorrect username or password!");
		}
	};

	return { state, dispatch, onSubmit };
};

export default useLogin;
