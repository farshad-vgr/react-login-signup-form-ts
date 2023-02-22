import React, { memo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import useLogin from "../../hooks/useLogin/useLogin";
import useRecovery from "../../hooks/useRecovery/useRecovery";

import { UsernameInput, PasswordInput, CheckboxInput, SubmitButton, SocialButton, ModalBox, EmailInput } from "../../components";

interface Props {
	formToggler: () => void;
}

const LoginForm = ({ formToggler }: Props): JSX.Element => {
	// These useRef hooks are for implementing forwardRef
	const ref1 = useRef<HTMLElement>(null);
	const ref2 = useRef<HTMLButtonElement>(null);

	const { state, dispatch, onSubmit } = useLogin(ref1);
	const { emailAddress, dispatchEmail, onRecovery } = useRecovery(ref2);

	// Show a modal when the user wants to recovery his password by email address
	const [showModal, setShowModal] = useState<boolean>(false);

	// Destructuring state values for easier usage in return section
	const { username, password, usernameHint, passwordHint, isChecked } = state;

	return (
		<>
			<main className="container">
				<section className="form-wrapper">
					<h1 className="form-title">Login Form</h1>

					<form className="form" onSubmit={(e: React.FormEvent<HTMLFormElement>) => onSubmit(e)}>
						<UsernameInput dispatch={dispatch} username={username} usernameHint={usernameHint} placeHolder="Name" />

						<PasswordInput dispatch={dispatch} password={password} passwordHint={passwordHint} placeHolder="Password" ref={ref1} />

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
							<span onClick={() => setShowModal(true)}>Forgot password?</span>
							{showModal &&
								createPortal(
									<ModalBox onClose={() => setShowModal(false)} title="Password Recovery" ref={ref2}>
										<form
											className="form"
											onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
												e.stopPropagation();
												onRecovery(e);
											}}>
											<EmailInput dispatch={dispatchEmail} email={emailAddress.email} emailHint={emailAddress.emailHint} placeHolder="Email" />
											<SubmitButton btnText="Send" />
										</form>
									</ModalBox>,
									document.body,
								)}

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
