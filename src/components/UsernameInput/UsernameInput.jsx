import { memo } from "react";

const UsernameInput = ({ dispatch, username, usernameHint }) => {
	return (
		<>
			<section>
				<div className="content">
					<div className="icon-container" style={usernameHint.length > 0 ? { borderBottomColor: "red", backgroundColor: "red" } : null}>
						<div className="fa fa-pencil-alt"></div>
					</div>

					<input
						type="text"
						placeholder="Name"
						minLength={3}
						maxLength={15}
						style={usernameHint.length > 0 ? { borderBottomColor: "red" } : null}
						value={username}
						onChange={(e) =>
							dispatch({
								type: "field",
								fieldName: "username",
								payload: e.currentTarget.value,
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