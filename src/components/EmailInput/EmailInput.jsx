import { memo } from "react";

const EmailInput = ({ dispatch, email, emailHint }) => {
	return (
		<>
			<section>
				<div className="content">
					<div className="icon-container" style={emailHint.length > 0 ? { borderBottomColor: "red", backgroundColor: "red" } : null}>
						<div className="fa fa-envelope"></div>
					</div>

					<input
						type="email"
						placeholder="Email"
						minLength={3}
						maxLength={30}
						style={emailHint.length > 0 ? { borderBottomColor: "red" } : null}
						value={email}
						onChange={(e) =>
							dispatch({
								type: "field",
								fieldName: "email",
								payload: e.currentTarget.value,
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
