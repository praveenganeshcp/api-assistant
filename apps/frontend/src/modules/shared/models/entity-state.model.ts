import { CanBeNull } from "@api-assistant/utils";
import { createAction } from "@reduxjs/toolkit";

export interface EntityState<T> {
    isLoading: boolean;
    error: string;
    data: CanBeNull<T>
}

export const resetState = createAction("RESET_STATE");