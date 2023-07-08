export type CanBeNull<T> = T | undefined | null;

export function valueIsDefined<T>(data: CanBeNull<T>): data is T {
    return data !== null && data !== undefined;
}

export interface Usecase<I, O> {
    execute(data: I): Promise<O>
}

export function valueIsNotEmptyString<T>(data: string): data is string {
    return valueIsDefined(data) && typeof data === "string" && data.length > 0;
}