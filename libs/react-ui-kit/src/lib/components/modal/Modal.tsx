import "./Modal.scss";
import { MdClose } from "react-icons/md";

interface ModalProps {
    isOpen: boolean;
    title: string;
    secondaryCTALabel: string;
    primaryCTALabel: string;
    onPerformPrimaryAction: () => void;
    onPerformSecondaryAction: () => void;
    onClose: () => void;
    children: any
}

export function Modal(props: Partial<ModalProps>) {
    if(!props.isOpen) {
        return <></>
    }

    function handleClickOnModalContainer(e: any) {
        e.stopPropagation();
    }

    return (
        <div 
            className="react-easy-modal" 
            onClick={props.onClose}
        >
            <div 
                onClick={handleClickOnModalContainer} 
                className="react-easy-modal-container"
            >
                <div 
                    className="react-easy-modal-container__header"
                >
                    <h3>{props.title}</h3>
                    <button onClick={props.onClose}>
                        <MdClose />
                    </button>
                </div>
                <div className="react-easy-modal-container__body">
                    {props.children}
                </div>
                <div className="react-easy-modal-container__footer">
                    {
                        props.secondaryCTALabel && props.onPerformSecondaryAction &&
                        <button onClick={props.onPerformSecondaryAction}>
                            {props.secondaryCTALabel}
                        </button>
                    }
                    {
                        props.primaryCTALabel && props.onPerformPrimaryAction &&
                        <button onClick={props.onPerformPrimaryAction}>
                            {props.primaryCTALabel}
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}
