import { RefObject, useReducer } from "react";
import { toast } from "react-toastify";

interface State {
	email: string;
	emailHint: string;
}

interface Action {
	type: string;
	fieldName?: any;
	payload?: string | boolean;
}

const initialState: State = {
	email: "",
	emailHint: "",
};

function recoveryReducer(state: State, action: Action): State {
	const { type, fieldName, payload } = action;

	switch (type) {
		case "field": {
			return {
				...state,
				[fieldName]: payload,
				emailHint: "",
			};
		}
		case "success": {
			return {
				email: "",
				emailHint: "",
			};
		}
		case "errorEmail": {
			return {
				...state,
				emailHint: "Enter your email!",
			};
		}
		default:
			throw new Error("Error in signup reducer case: " + type);
	}
}

type CustomHook = (ref: RefObject<HTMLElement>) => {
	emailAddress: State;
	dispatchEmail: React.Dispatch<Action>;
	onRecovery: (e: React.FormEvent<HTMLFormElement>) => void;
};

const useRecovery: CustomHook = (ref) => {
	const [emailAddress, dispatchEmail] = useReducer(recoveryReducer, initialState);

	// When the user clicks on the Form's submit button, this function handle process
	const onRecovery = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();

		// Evaluating input values and then showing the proper result to the user
		if (formValidator(emailAddress.email)) {
			dispatchEmail({ type: "success" });
			if (ref.current !== null) { ref.current.click(); }
			toast.success(`Successfully sent to ( ${emailAddress.email} )!`);
			toast.clearWaitingQueue();
		} else if (emailAddress.email.trim() === "") {
			dispatchEmail({ type: "errorEmail" });
		}
	};

	function formValidator(emailValue: string): boolean {
		if (emailValue.length > 0 && !/^\s*$/.test(emailValue)) {
			return true;
		} else return false;
	}

	return { emailAddress, dispatchEmail, onRecovery };
};

export default useRecovery;
