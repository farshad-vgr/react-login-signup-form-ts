import React, { useState } from "react";

import LoginForm from "./components/LoginForm/LoginForm";
import SignupForm from "./components/SignupForm/SignupForm";

import "./App.css";

function App() {
	const [isLogin, setIsLogin] = useState(true);

	function isLoginToggler(): void {
		setIsLogin(!isLogin);
	}

	// Switch between the Login component and the Signup component when user click on button
	return <>{isLogin ? <LoginForm isLoginToggler={isLoginToggler} /> : <SignupForm isLoginToggler={isLoginToggler} />}</>;
}

export default App;
