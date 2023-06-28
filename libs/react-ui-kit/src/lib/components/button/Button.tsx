import { RESize, ReactEasyComponentProps } from "../../types/prop-types";
import "./Button.scss";
import { getButtonGroupClass, getButtonSizeClass } from "./Button.utils";

export interface ButtonProps extends ReactEasyComponentProps {
    label: string;
    group?: 'primary' | 'secondary' | 'text',
    size?: RESize
}

export function Button(props: ButtonProps) {
    const { label, group, size } = props;
    const classNames = `react-easy-button ${getButtonGroupClass(group)} ${getButtonSizeClass(size)}`;
    return (
        <button 
            className={classNames}
        >
            { label }
        </button>
    )
}

