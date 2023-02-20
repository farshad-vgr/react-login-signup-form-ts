import React, { memo } from "react";

import useLogin from "../../hooks/useLogin/useLogin";

import { UsernameInput, PasswordInput, CheckboxInput, SubmitButton, SocialButton } from "../../components";

interface Props {
	formToggler: () => void;
}

const LoginForm = ({ formToggler }: Props): JSX.Element => {
	const { state, dispatch, onSubmit } = useLogin();

	// Destructuring state values for easier usage in return section
	const { username, password, usernameHint, passwordHint, isChecked } = state;

	return (
		<>
			<main className="container">
				<section className="form-wrapper">
					<h1 className="form-title">Login Form</h1>

					<form className="form" onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmit(e)}>
						<UsernameInput dispatch={dispatch} username={username} usernameHint={usernameHint} placeHolder="Name" />

						<PasswordInput dispatch={dispatch} password={password} passwordHint={passwordHint} placeHolder="Password" />

						<CheckboxInput dispatch={dispatch} isChecked={isChecked} checkboxText="Remember me!" isRequired={false} />

						<SubmitButton btnText="Login" />

						<span className="or-section">&mdash; or &mdash;</span>

						<section className="social-login">
							<SocialButton href="https://www.facebook.com/login/" btnColor="#3b5998c4" iconName="fab fa-facebook-f" btnText="Login with Facebook" />

							<SocialButton href="https://twitter.com/login?lang=en" btnColor="#1da1f2c4" iconName="fab fa-twitter" btnText="Login with Twitter" />

							<SocialButton
								href="https://myaccount.google.com/?utm_source=sign_in_no_continue&pli=1"
								btnColor="#ea4335c4"
								iconName="fab fa-google"
								btnText="Login with Google"
							/>
						</section>

						<section className="form-options">
							<span>Forgot password?</span>
							<span
								onClick={() => {
									formToggler();
									dispatch({ type: "success" });
								}}>
								Sign up?
							</span>
						</section>
					</form>
				</section>
			</main>
		</>
	);
};

export default memo(LoginForm);
