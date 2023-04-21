import { createPortal } from "react-dom";
import { Backdrop, ModalWrapper } from "./Modal.styled";
import { useCallback, useEffect } from "react";

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ onClose, children }) {

    const handleKeyDown = useCallback(e => {
        if(e.code === 'Escape') {
            onClose();
        };
    }, [onClose]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    const handleBackdrop = e => {
        if(e.currentTarget === e.target) {
            onClose();
        };
    };


    return createPortal(
        <Backdrop  onClick={handleBackdrop}>
            <ModalWrapper>{children()}</ModalWrapper>
        </Backdrop>,
     modalRoot);
};