export type CanBeNull<T> = null | undefined | T;

export function valueIsDefined<T>(value: CanBeNull<T>) {
    return value !== null && value !== undefined;
}