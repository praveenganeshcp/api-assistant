import { CanBeNull } from "@api-assistant/utils";

export interface EntityState<T> {
    isLoading: boolean;
    error: string;
    data: CanBeNull<T>
}