import { ButtonProps } from "./Button";

/**
 * Maps the CSS class names for specific variant of button.
 */
const buttonGroupClassMap: Map<ButtonProps['group'], string> = new Map([
    ['primary', 'primary-group'],
    ['secondary', 'secondary-group'],
    ['text', 'text-group']
]);


/**
 * Returns the CSS class name for given button variant.
 */
export function getButtonGroupClass(group: ButtonProps['group']): string {
    return buttonGroupClassMap.get(group) as string;
}