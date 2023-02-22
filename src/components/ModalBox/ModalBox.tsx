import React, { memo, forwardRef, Ref } from "react";

interface Props {
	onClose: () => void;
	title: string;
	children: React.ReactNode;
}

const ModalBox = forwardRef(({ onClose, title, children }: Props, ref2: Ref<HTMLButtonElement>) => {
	return (
		<>
			<div
				className="modal-backdrop"
				onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
					if (e.target === e.currentTarget) {
						onClose();
					}
				}}>
				<div className="modal-box">
					<button className="modal-btn" onClick={onClose} ref={ref2}>
						<i className="fa fa-window-close"></i>
					</button>
					<section className="modal-main">
						<h3 className="modal-title">{title}</h3>
						<hr style={{ border: "1px dashed black" }}></hr>
						<div className="modal-body">{children}</div>
					</section>
				</div>
			</div>
		</>
	);
});

export default memo(ModalBox);
