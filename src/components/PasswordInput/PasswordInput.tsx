import React, { memo, forwardRef, Ref } from "react";

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

const PasswordInput = forwardRef(({ dispatch, password, passwordHint, placeHolder }: Props, ref1: Ref<HTMLElement>): JSX.Element => {
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
						type="password"
						placeholder={placeHolder}
						minLength={8}
						maxLength={15}
						style={inputStyle}
						value={password}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
							e.target.value.toString().length > 0
								? e.currentTarget.nextElementSibling?.firstElementChild?.setAttribute("style", "transform: translateX(0)")
								: e.currentTarget.nextElementSibling?.firstElementChild?.setAttribute("style", "transform: translateX(150%)");
							dispatch({
								type: "field",
								fieldName: placeHolder === "Password" ? "password" : "passwordConfirm",
								payload: e.target.value,
							});
						}}
					/>

					<span className="show-hide">
						<i
							ref={ref1}
							id="show"
							className="fa fa-eye"
							onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => {
								if (e.currentTarget.parentElement?.previousElementSibling?.getAttribute("type") === "password") {
									e.currentTarget.parentElement?.previousElementSibling?.setAttribute("type", "text");
									e.currentTarget.classList.add("hide");
								} else {
									e.currentTarget.parentElement?.previousElementSibling?.setAttribute("type", "password");
									e.currentTarget.classList.remove("hide");
								}
							}}></i>
					</span>
				</div>
				<small>{passwordHint}</small>
			</section>
		</>
	);
});

export default memo(PasswordInput);
