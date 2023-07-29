import { ButtonHTMLAttributes } from "react";
import { RESize } from "../../types/prop-types";
import "./Button.scss";
import { getButtonGroupClass, getButtonSizeClass } from "./Button.utils";

/**
 * The Button component allows seamless customization with the following props:

    - `label` (string): Custom label for the button.
    - `variant` (string): Style variant for the button (e.g., "primary," "secondary," "text,").
    - `size` (string): Size variant for the button (e.g., "small," "medium," "large," etc.).
    - Standard button element attributes (e.g., onClick, disabled, etc.) can also be used.
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    group?: 'primary' | 'secondary' | 'text',
    size?: RESize
}

/**
 * The `Button` component offers various variants `primary`, `secondary`, `text` 
 * and sizes `large`, `medium`, `small` to suit different styles. 
 * It supports all standard HTML `button` attributes, providing developers with flexibility 
 * and ease of use.
 */
export function Button(props: ButtonProps) {
    const { label, group, size } = props;
    // derives all the CSS class names for the selected size and variant along with basic styles.
    const classNames = 
        `react-easy-button ${getButtonGroupClass(group || "primary")} ${getButtonSizeClass(size || "medium")}`;
    return (
        <button 
            {...props}
            className={classNames}
            style={{}}
        >
            { label }
        </button>
    )
}

