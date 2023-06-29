import { ButtonHTMLAttributes } from "react";
import { RESize } from "../../types/prop-types";
import "./Button.scss";
import { getButtonGroupClass, getButtonSizeClass } from "./Button.utils";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    group?: 'primary' | 'secondary' | 'text',
    size?: RESize
}

export function Button(props: ButtonProps) {
    const { label, group, size } = props;
    const classNames = `react-easy-button ${getButtonGroupClass(group)} ${getButtonSizeClass(size)}`;
    return (
        <button 
            {...props}
            className={classNames + ' ' + props.className}
        >
            { label }
        </button>
    )
}

