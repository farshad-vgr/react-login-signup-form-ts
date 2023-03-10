import React, { memo, useRef } from "react";
import { toast } from "react-toastify";

import useSignup from "../../hooks/useSignup/useSignup";

import { UsernameInput, PasswordInput, EmailInput, CheckboxInput, SubmitButton } from "../../components";

interface Props {
	formToggler: () => void;
}

const SignupForm = ({ formToggler }: Props): JSX.Element => {
	// These useRef hooks are for implementing forwardRef
	const ref1 = useRef<HTMLElement>(null);
	const ref2 = useRef<HTMLElement>(null);

	const { state, dispatch, onRegister } = useSignup(ref1, ref2);

	// Destructuring state values for easier usage in return section
	const { username, password, passwordConfirm, email, usernameHint, passwordHint, passwordConfirmHint, emailHint, isChecked } = state;

	return (
		<>
			<main className="container">
				<section className="form-wrapper">
					<h1 className="form-title">Signup Form</h1>

					<form className="form" onSubmit={(e: React.FormEvent<HTMLFormElement>) => onRegister(e)}>
						<UsernameInput dispatch={dispatch} username={username} usernameHint={usernameHint} placeHolder="Name" />

						<PasswordInput dispatch={dispatch} password={password} passwordHint={passwordHint} placeHolder="Password" ref={ref1} />

						<PasswordInput dispatch={dispatch} password={passwordConfirm} passwordHint={passwordConfirmHint} placeHolder="Confirm-Password" ref={ref2} />

						<EmailInput dispatch={dispatch} email={email} emailHint={emailHint} placeHolder="Email" />

						<section className="form-terms">
							<CheckboxInput dispatch={dispatch} isChecked={isChecked} checkboxText="I Agree with all terms!" isRequired={true} />

							<a href="https://opensource.guide/legal/" target={"_blank"} rel="noreferrer" style={{ width: "40%", cursor: "pointer" }}>
								(view terms)
							</a>
						</section>

						<SubmitButton btnText="Signup" />

						<section className="form-options">
							<span onClick={ () => toast.success("Successfully subscribed!") }>Subscribe Newsletter?</span>
							<span
								onClick={() => {
									formToggler();
									dispatch({ type: "success" });
								}}>
								Login?
							</span>
						</section>
					</form>
				</section>
			</main>
		</>
	);
};

export default memo(SignupForm);
