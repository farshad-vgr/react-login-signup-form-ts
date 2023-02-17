import { memo, useRef } from "react";

const PasswordInput = ({ dispatch, password, passwordHint, placeHolder }) => {
	const passwordInput = useRef();
	const eyeBtn = useRef();

	return (
		<>
			<section>
				<div className="content">
					<div className="icon-container" style={passwordHint.length > 0 ? { borderBottomColor: "red", backgroundColor: "red" } : null}>
						<div className="fa fa-lock"></div>
					</div>

					<input
						ref={passwordInput}
						type="password"
						placeholder={placeHolder}
						minLength={8}
						maxLength={15}
						style={passwordHint.length > 0 ? { borderBottomColor: "red" } : null}
						value={password}
						onChange={(e) => {
							e.currentTarget.value.toString().length > 0
								? (eyeBtn.current.style.transform = "translateX(0)")
								: (eyeBtn.current.style.transform = "translateX(150%)");
							dispatch({
								type: "field",
								fieldName: placeHolder === "Password" ? "password" : "passwordConfirm",
								payload: e.currentTarget.value,
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
