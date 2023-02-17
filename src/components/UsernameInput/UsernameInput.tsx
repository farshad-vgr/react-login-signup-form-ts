import React, { memo } from "react";

interface Dispatch {
	type: string;
	fieldName: string;
	payload: string;
}

interface Props {
	dispatch: ({ type, fieldName, payload }: Dispatch) => void;
	username: string;
	usernameHint: string;
}

const UsernameInput = ({ dispatch, username, usernameHint }: Props): JSX.Element => {
	const iconStyles: React.CSSProperties =
		usernameHint.length > 0
			? {
					borderBottomColor: "red",
					backgroundColor: "red",
			  }
			: {};

	const inputStyles: React.CSSProperties = usernameHint.length > 0 ? { borderBottomColor: "red" } : {};

	return (
		<>
			<section>
				<div className="content">
					<div className="icon-container" style={iconStyles}>
						<div className="fa fa-pencil-alt"></div>
					</div>

					<input
						type="text"
						placeholder="Name"
						minLength={3}
						maxLength={15}
						style={inputStyles}
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