import React, { memo, useEffect } from "react";

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
	const iconStyles: React.CSSProperties =
		emailHint.length > 0
			? {
					borderBottomColor: "red",
					backgroundColor: "red",
			  }
			: {};

	const inputStyles: React.CSSProperties = emailHint.length > 0 ? { borderBottomColor: "red" } : {};

	useEffect(() => {
		if (emailHint.length > 0) {
			(document.querySelector(`[placeholder=${placeHolder}]`) as HTMLInputElement).focus();
		}
	}, [emailHint, placeHolder]);

	return (
		<>
			<section>
				<div className="content">
					<div className="icon-container" style={iconStyles}>
						<div className="fa fa-envelope"></div>
					</div>

					<input
						type="email"
						placeholder="Email"
						minLength={3}
						maxLength={30}
						style={inputStyles}
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
