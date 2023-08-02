import { RESize } from "../../types/prop-types"
import "./Loader.scss"

interface LoaderProps {
    size: RESize;
    style?: React.CSSProperties
}

/**
 * The Spinner indicates the ongoing processes. It comes in small, medium, and large sizes. 
 * Easily integrate it in the application for an enhanced user experience.
 */
export function Loader(props: LoaderProps) {
    return (
        <div className={`react-easy-loader ${props.size}-loader`} {...props}>
        </div>
    )
}