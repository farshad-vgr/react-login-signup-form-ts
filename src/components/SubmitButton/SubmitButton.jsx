import { memo } from "react";

const SubmitButton = ({ btnText }) => {
	return (
		<>
			<button className="submit-btn" type="submit">
				{btnText}
			</button>
		</>
	);
};

export default memo(SubmitButton);