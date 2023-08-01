import "./Modal.scss";
import { MdClose } from "react-icons/md";
import { Button } from "../button/Button";

interface ModalProps {
    /**
     * Whether the modal is open
     */
    isOpen: boolean;
    /**
     * Title of the modal.
     */
    title: string;
    /**
     * Secondary action button label
     */
    secondaryCTALabel: string;
    /**
     * Primary action button label
     */
    primaryCTALabel: string;
    /**
     * Method to handle primary action.
     */
    onPerformPrimaryAction: () => void;
    /**
     * Method to handle secondary action.
     */
    onPerformSecondaryAction: () => void;
    /**
     * Triggered when modal is closed. 
     */
    onClose: () => void;
    /**
     * Modal HTML content.
     */
    children: any
}

/**
 * The Modal Component is a reusable and customizable user interface element 
 * designed to display content in a modal dialog. It provides an efficient way to present 
 * information, receive user input, or trigger specific actions.
 */
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
                        <Button 
                            label={props.secondaryCTALabel} 
                            group="secondary" 
                            onClick={props.onPerformSecondaryAction} 
                        />
                    }
                    {
                        props.primaryCTALabel && props.onPerformPrimaryAction &&
                        <Button 
                            group="primary" 
                            label={props.primaryCTALabel} 
                            onClick={props.onPerformPrimaryAction} 
                        />
                    }
                </div>
            </div>
        </div>
    )
}
