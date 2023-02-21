import React, { memo, useRef } from "react";

import useHintStyle from "../../hooks/useHintStyle/useHintStyle";

interface Dispatch {
	type: string;
	fieldName: string;
	payload: string;
}

interface Props {
	dispatch: ({ type, fieldName, payload }: Dispatch) => void;
	password: string | number;
	passwordHint: string;
	placeHolder: string;
}

const PasswordInput = ({ dispatch, password, passwordHint, placeHolder }: Props): JSX.Element => {
	const passwordInput = useRef<HTMLInputElement>(null!);
	const eyeBtn = useRef<HTMLElement>(null!);

	// Using a custom hook to change color and focus
	const { iconStyle, inputStyle } = useHintStyle(passwordHint, placeHolder);

	return (
		<>
			<section>
				<div className="content">
					<div className="icon-container" style={iconStyle}>
						<div className="fa fa-lock"></div>
					</div>

					<input
						ref={passwordInput}
						type="password"
						placeholder={placeHolder}
						minLength={8}
						maxLength={15}
						style={inputStyle}
						value={password}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							e.target.value.toString().length > 0
								? (eyeBtn.current.style.transform = "translateX(0)")
								: (eyeBtn.current.style.transform = "translateX(150%)");
							dispatch({
								type: "field",
								fieldName: placeHolder === "Password" ? "password" : "passwordConfirm",
								payload: e.target.value,
							});
						}}
					/>

					<span className="show-hide">
						<i
							ref={eyeBtn}
							id="show"
							className="fa fa-eye"
							onClick={() => {
								if (passwordInput.current.type === "password") {
									passwordInput.current.type = "text";
									eyeBtn.current.classList.add("hide");
								} else {
									passwordInput.current.type = "password";
									eyeBtn.current.classList.remove("hide");
								}
							}}></i>
					</span>
				</div>
				<small>{passwordHint}</small>
			</section>
		</>
	);
};

export default memo(PasswordInput);
