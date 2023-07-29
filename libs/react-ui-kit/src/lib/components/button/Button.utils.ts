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
 * Maps the CSS class names for specific button size.
 */
const buttonSizeClassMap: Map<ButtonProps['size'], string> = new Map([
    ['large', 'large-size'],
    ['medium', 'medium-size'],
    ['small', 'small-size']
]);

/**
 * Returns the CSS class name for given button variant.
 */
export function getButtonGroupClass(group: ButtonProps['group']): string {
    return buttonGroupClassMap.get(group) as string;
}

/**
 * Returns the CSS class name for given button size. 
 */
export function getButtonSizeClass(size: ButtonProps['size']): string {
    return buttonSizeClassMap.get(size) as string;
}