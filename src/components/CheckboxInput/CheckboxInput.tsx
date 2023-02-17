import React, { memo } from "react";

interface Dispatch {
	type: string;
	fieldName: string;
	payload: boolean;
}

interface Props {
	dispatch: ({ type, fieldName, payload }: Dispatch) => void;
	isChecked: boolean;
	checkboxText: string;
	isRequired: boolean;
}

const CheckboxInput = ({ dispatch, isChecked, checkboxText, isRequired }: Props): JSX.Element => {
	return (
		<>
			<section className="checkbox-section">
				<input
					required={isRequired}
					type="checkbox"
					id="checkbox-input"
					checked={isChecked}
					onChange={(e) =>
						dispatch({
							type: "field",
							fieldName: "isChecked",
							payload: e.target.checked,
						})
					}></input>
				<label htmlFor="checkbox-input" style={{ cursor: "pointer" }}>
					{checkboxText}
				</label>
			</section>
		</>
	);
};

export default memo(CheckboxInput);
