import { InputHTMLAttributes } from "react";
import "./Input.scss";

export type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input(props: InputProps) {
    return (
        <div className="react-easy-input-container">
            {
                props.id && 
                props.placeholder && 
                <label htmlFor={props.id}>
                    { props.placeholder }
                </label>
            }
            <input  
                {...props}
                placeholder=""
                className={`react-easy-input ${props.className}`}
            />
        </div>
    )
}