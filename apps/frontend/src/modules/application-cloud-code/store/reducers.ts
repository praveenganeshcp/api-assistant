import { createReducer, on } from "@ngrx/store";
import { ApplicationCloudCodeState } from "./state";
import { allRequestHandlersLoadedAction, errorInFetchingRequestHandlerssAction, fetchAllRequestHandlersAction } from "./actions";

const DEFAULT_STATE: ApplicationCloudCodeState = {
    requestHandlers: {
        data: [],
        error: '',
        isLoading: false
    }
}

export const APPLICATION_CLOUD_CODE_SLICE_NAME = 'cloudCode';

export const applicationCloudCodeReducer = createReducer(
    DEFAULT_STATE,
    on(fetchAllRequestHandlersAction, (state) => ({
        ...state,
        requestHandlers: {
            isLoading: true,
            error: '',
            data: []
        }
    })),
    on(allRequestHandlersLoadedAction, (state, payload) => ({
        ...state,
        requestHandlers: {
            data: payload.files,
            error: '',
            isLoading: false
        }
    })),
    on(errorInFetchingRequestHandlerssAction, (state, payload) => ({
        ...state,
        requestHandlers: {
            data: [],
            error: payload.error,
            isLoading: false
        }
    }))
)