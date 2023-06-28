import { ReactEasyComponentProps } from "../../types/prop-types";
import "./Input.scss";

interface InputProps extends ReactEasyComponentProps {}

export function Input(props: InputProps) {
    return (
        <input 
            {...props}
            className="react-easy-input"
        />
    )
}