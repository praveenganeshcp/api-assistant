import { InputHTMLAttributes } from "react";
import "./Input.scss";

/**
 * Input component props supporting all HTML attributes for dynamic form interactions
 */
export type InputProps = InputHTMLAttributes<HTMLInputElement>

/**
 * The Input Component supports standard HTML input properties and dynamically displays 
 * labels when 'id' and 'placeholder' attributes are provided. Simplify form creation 
 * with this versatile feature.
 */
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