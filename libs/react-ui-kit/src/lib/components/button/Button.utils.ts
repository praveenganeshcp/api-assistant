import { ButtonProps } from "./Button";

const buttonGroupClassMap: Map<ButtonProps['group'], string> = new Map();
buttonGroupClassMap.set('primary', 'primary-group');
buttonGroupClassMap.set('secondary', 'secondary-group');
buttonGroupClassMap.set('text', 'text-group');

const buttonSizeClassMap: Map<ButtonProps['size'], string> = new Map();
buttonSizeClassMap.set('large', 'large-size');
buttonSizeClassMap.set('medium', 'medium-size');
buttonSizeClassMap.set('small', 'small-size');

export function getButtonGroupClass(group: ButtonProps['group']): string {
    return buttonGroupClassMap.get(group) || buttonGroupClassMap.get('primary') as string;
}

export function getButtonSizeClass(size: ButtonProps['size']): string {
    return buttonSizeClassMap.get(size) || buttonSizeClassMap.get('medium') as string;
}