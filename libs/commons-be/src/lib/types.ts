export type CanBeNull<T> = T | undefined | null;

export function valueIsDefined<T>(data: CanBeNull<T>): data is T {
  return data !== null && data !== undefined;
}

export interface Usecase<I, O> {
  execute(data: I): Promise<O>;
}

export function valueIsNotEmptyString<T>(
  data: CanBeNull<string>
): data is string {
  return valueIsDefined(data) && typeof data === 'string' && data.length > 0;
}

export interface Mapper<I, O> {
  from(input: I): O;
  to(input: O): I;
}

export interface ServerData<D> {
  isLoading: boolean;
  data: CanBeNull<D>;
  error: string;
}

export const GLOBAL_PREFIX = '/api/v6';

export const CORE_ENGINE_PREFIX = `${GLOBAL_PREFIX}/core-engine`
