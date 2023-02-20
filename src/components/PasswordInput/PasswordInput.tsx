import React, { memo, useEffect, useRef } from "react";

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

	const iconStyles: React.CSSProperties =
		passwordHint.length > 0
			? {
					borderBottomColor: "red",
					backgroundColor: "red",
			  }
			: {};

	const inputStyles: React.CSSProperties = passwordHint.length > 0 ? { borderBottomColor: "red" } : {};

	useEffect(() => {
		if (passwordHint.length > 0) {
			(document.querySelector(`[placeholder=${placeHolder}]`) as HTMLInputElement).focus();
		}
	}, [passwordHint]);

	return (
		<>
			<section>
				<div className="content">
					<div className="icon-container" style={iconStyles}>
						<div className="fa fa-lock"></div>
					</div>

					<input
						ref={passwordInput}
						type="password"
						placeholder={placeHolder}
						minLength={8}
						maxLength={15}
						style={inputStyles}
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
