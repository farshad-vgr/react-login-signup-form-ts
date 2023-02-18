import React, { useCallback, useState } from "react";

import LoginForm from "./components/LoginForm/LoginForm";
import SignupForm from "./components/SignupForm/SignupForm";

import "./App.css";

function App(): JSX.Element {
	const [isLogin, setIsLogin] = useState<boolean>(true);

	const isLoginToggler: () => void = useCallback(() => {
		setIsLogin(!isLogin);
	}, [isLogin]);

	// Switch between the Login component and the Signup component when user click on button
	return <>{isLogin ? <LoginForm isLoginToggler={isLoginToggler} /> : <SignupForm isLoginToggler={isLoginToggler} />}</>;
}

export default App;
