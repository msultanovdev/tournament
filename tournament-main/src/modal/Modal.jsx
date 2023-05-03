import React from 'react';
import cl from './Modal.module.css'

const Modal = ({active, setActive, children}) => {
    return (
        <div className={`${cl.modal} ${active ? cl.active : ''}`} onClick={() => setActive(false)}>
            <div className={`${cl.modal__content} ${active ? cl.act : ''}`} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Modal;
