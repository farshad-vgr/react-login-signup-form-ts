import React, { memo } from "react";

import useHintStyle from "../../hooks/useHintStyle/useHintStyle";

interface Dispatch {
	type: string;
	fieldName: string;
	payload: string;
}

interface Props {
	dispatch: ({ type, fieldName, payload }: Dispatch) => void;
	email: string;
	emailHint: string;
	placeHolder: string;
}

const EmailInput = ({ dispatch, email, emailHint, placeHolder }: Props): JSX.Element => {
	// Using a custom hook to change color and focus
	const { iconStyle, inputStyle } = useHintStyle(emailHint, placeHolder);

	return (
		<>
			<section>
				<div className="content">
					<div className="icon-container" style={iconStyle}>
						<div className="fa fa-envelope"></div>
					</div>

					<input
						type="email"
						placeholder="Email"
						minLength={3}
						maxLength={30}
						style={inputStyle}
						value={email}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							dispatch({
								type: "field",
								fieldName: "email",
								payload: e.target.value,
							})
						}
					/>
				</div>
				<small>{emailHint}</small>
			</section>
		</>
	);
};

export default memo(EmailInput);
