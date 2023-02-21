import React, { memo } from "react";

import useHintStyle from "../../hooks/useHintStyle/useHintStyle";

interface Dispatch {
	type: string;
	fieldName: string;
	payload: string;
}

interface Props {
	dispatch: ({ type, fieldName, payload }: Dispatch) => void;
	username: string;
	usernameHint: string;
	placeHolder: string;
}

const UsernameInput = ({ dispatch, username, usernameHint, placeHolder }: Props): JSX.Element => {
	// Using a custom hook to change color and focus
	const { iconStyle, inputStyle } = useHintStyle(usernameHint, placeHolder);

	return (
		<>
			<section>
				<div className="content">
					<div className="icon-container" style={iconStyle}>
						<div className="fa fa-pencil-alt"></div>
					</div>

					<input
						autoFocus
						type="text"
						placeholder={placeHolder}
						minLength={3}
						maxLength={15}
						style={inputStyle}
						value={username}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							dispatch({
								type: "field",
								fieldName: "username",
								payload: e.target.value,
							})
						}
					/>
				</div>
				<small>{usernameHint}</small>
			</section>
		</>
	);
};

export default memo(UsernameInput);
