import React, { memo } from "react";

interface Props {
	btnText: string;
}

const SubmitButton = ({ btnText }: Props): JSX.Element => {
	return (
		<>
			<button className="submit-btn" type="submit">
				{btnText}
			</button>
		</>
	);
};

export default memo(SubmitButton);