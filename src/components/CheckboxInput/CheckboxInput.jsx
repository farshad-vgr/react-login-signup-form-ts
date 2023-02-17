import { memo } from "react";

const CheckboxInput = ({ dispatch, isChecked, checkboxText, isRequired }) => {
	return (
		<>
			<section className="checkbox-section">
				<input
					required={isRequired}
					type="checkbox"
					id="checkbox-input"
					checked={isChecked}
					onChange={() =>
						dispatch({
							type: "field",
							fieldName: "isChecked",
							payload: !isChecked,
						})
					}></input>
				<label htmlFor="checkbox-input" style={{cursor: "pointer"}}>{checkboxText}</label>
			</section>
		</>
	);
};

export default memo(CheckboxInput);
