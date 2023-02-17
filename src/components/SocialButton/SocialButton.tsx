import React, { memo } from "react";

interface Props {
	href: string;
	btnColor: string;
	iconName: string;
	btnText: string;
}

const iconStyles: React.CSSProperties = { marginRight: "0.5rem" };

const SocialButton = ({ href, btnColor, iconName, btnText }: Props): JSX.Element => {
	return (
		<>
			<a href={href} style={{ background: btnColor }}>
				<i className={iconName} style={iconStyles}></i>
				{btnText}
			</a>
		</>
	);
};

export default memo(SocialButton);
