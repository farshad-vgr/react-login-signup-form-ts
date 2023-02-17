import { memo } from "react";

const SocialButton = ({ href, btnColor, iconName, btnText }) => {
	return (
		<>
			<a href={href} style={{ background: btnColor }}>
				<i className={iconName} style={{ marginRight: "0.5rem" }}></i>
				{btnText}
			</a>
		</>
	);
};

export default memo(SocialButton);
