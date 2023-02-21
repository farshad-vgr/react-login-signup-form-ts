import { useEffect, useState } from "react";

interface HintStyles {
	iconStyle: React.CSSProperties;
	inputStyle: React.CSSProperties;
}

const useHintStyle = (hintMessage: string, placeHolder: string): HintStyles => {
	const [hintStyles, setHintStyles] = useState<HintStyles>({ iconStyle: {}, inputStyle: {} });

	// Changes text color and focus on this input when it has an error hint message
	useEffect(() => {
		if (hintMessage.length > 0) {
			(document.querySelector(`[placeholder=${placeHolder}]`) as HTMLInputElement).focus();
			setHintStyles({
				iconStyle: { borderBottomColor: "red", backgroundColor: "red" },
				inputStyle: { borderBottomColor: "red" },
			});
		} else {
			setHintStyles({
				iconStyle: {},
				inputStyle: {},
			});
		}
	}, [hintMessage, placeHolder]);

	return hintStyles;
};

export default useHintStyle;
