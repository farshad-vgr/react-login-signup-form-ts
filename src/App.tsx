import React, { useCallback, useState } from "react";

import { LoginForm, SignupForm } from "./components"

import "./App.css";

function App(): JSX.Element {
	// By default login form will be shown to the user
	const [loginFormShowed, setLoginFrormShowed] = useState<boolean>(true);

	const formToggler: () => void = useCallback(() => {
		setLoginFrormShowed(!loginFormShowed);
	}, [loginFormShowed]);

	// Switch between the Login component and the Signup component when the user clicked on a specific button
	return <>{loginFormShowed ? <LoginForm formToggler={formToggler} /> : <SignupForm formToggler={formToggler} />}</>;
}

export default App;
