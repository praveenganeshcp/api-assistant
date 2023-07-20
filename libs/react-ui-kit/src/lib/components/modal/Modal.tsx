import "./Modal.scss";
import { MdClose } from "react-icons/md";

interface ModalProps {
    isOpen: boolean;
    title: string;
    cancelText: string;
    confirmText: string;
    onCancel: () => void;
    onConfirm: () => void;
    children: any
}

export function Modal(props: ModalProps) {
    if(!props.isOpen) {
        return <></>
    }

    function handleClickOnModalContainer(e: any) {
        e.stopPropagation();
    }

    return (
        <div 
            className="react-easy-modal" 
            onClick={props.onCancel}
        >
            <div 
                onClick={handleClickOnModalContainer} 
                className="react-easy-modal-container"
            >
                <div 
                    className="react-easy-modal-container__header"
                >
                    <h3>{props.title}</h3>
                    <button onClick={props.onCancel}>
                        <MdClose />
                    </button>
                </div>
                <div className="react-easy-modal-container__body">
                    {props.children}
                </div>
                <div className="react-easy-modal-container__footer">
                    {
                        props.cancelText && 
                        <button onClick={props.onCancel}>
                            {props.cancelText}
                        </button>
                    }
                    {
                        props.confirmText && 
                        <button onClick={props.onConfirm}>
                            {props.confirmText}
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}
