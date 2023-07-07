export type CanBeNull<T> = T | undefined | null;

export function valueIsDefined<T>(data: T): data is typeof data {
    return data !== null && data !== undefined;
}

export interface Usecase<I, O> {
    execute(data: I): Promise<O>
}