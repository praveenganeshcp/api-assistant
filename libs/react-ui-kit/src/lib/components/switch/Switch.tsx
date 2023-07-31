import "./Switch.scss";

interface SwitchProps {
    /**
     * This prop determines whether the switch is in the "on" or "off" state. 
     * It is a required prop, and its value must be controlled by the parent 
     * component to manage the state of the switch.
     */
    isOn: boolean;

    /**
     * This prop is a callback function that gets triggered 
     * whenever the switch state changes. It receives the new state 
     * (true for "on" and false for "off") as an argument.
     */
    handleChange: (isOn: boolean) => void;
    /**
     * This prop specifies whether the switch is disabled or not. 
     * If set to true, the switch will be non-interactive, and users cannot change its state.
     */
    disabled?: boolean;
}

/**
 * The Switch component is a simple component that provides a user-friendly toggle switch. 
 * It allows users to switch between two states (on and off) and supports a disabled state. 
 */
export function Switch(props: SwitchProps) {

    const { isOn, handleChange, disabled } = props;

    return (
        <div className="react-easy-switch-track">
            <button 
                onClick={() => handleChange(!isOn)} 
                disabled={disabled}
                className={`react-easy-switch-thumb${isOn ? " is-on" : ""}`}
            >
            </button>
        </div>
    )
}