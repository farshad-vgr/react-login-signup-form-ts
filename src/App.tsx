import React, { useCallback, useState } from "react";
import { ToastContainer } from "react-toastify";

import { LoginForm, SignupForm } from "./components"

import "react-toastify/dist/ReactToastify.min.css";
import "./App.css";

function App(): JSX.Element {
	// By default login form will be shown to the user
	const [loginFormShowed, setLoginFrormShowed] = useState<boolean>(true);

	// Switch between the Login component and the Signup component when the user clicked on a specific button on form
	const formToggler: () => void = useCallback(() => {
		setLoginFrormShowed(!loginFormShowed);
	}, [loginFormShowed]);

	return (
		<>
			<ToastContainer position="top-center" limit={2} newestOnTop={true} closeOnClick={false} draggablePercent={30} />
			{loginFormShowed ? <LoginForm formToggler={formToggler} /> : <SignupForm formToggler={formToggler} />}
		</>
	);
}

export default App;
