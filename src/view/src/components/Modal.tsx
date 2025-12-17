import React from "react";

interface ModalProps {
    open: boolean;
    title?: string;
    children: React.ReactNode;
    onClose: () => void;
    footer?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
    open,
    title,
    children,
    onClose,
    footer,
}) => {
    if (!open) return null;

    return (
        <dialog open>
            <article>
                <header>
                    {title && <h3>{title}</h3>}
                    <button
                        aria-label="Close"
                        className="close"
                        onClick={onClose}
                    />
                </header>

                {children}

                {footer && <footer>{footer}</footer>}
            </article>
        </dialog>
    );
};

export default Modal;
