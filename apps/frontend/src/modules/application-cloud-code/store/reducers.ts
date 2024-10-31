import { createReducer, on } from "@ngrx/store";
import { ApplicationCloudCodeState } from "./state";
import { allRequestHandlersLoadedAction, cloudCodeStatusFetchedAction, errorInFetchingCloudCodeStatusAction, errorInFetchingRequestHandlerssAction, fetchAllRequestHandlersAction, fetchCloudCodeStatusAction } from "./actions";
import { DEFAULT_FACTORY_CLASS_METHOD_KEY } from "@nestjs/common/module-utils/constants";

const DEFAULT_STATE: ApplicationCloudCodeState = {
    requestHandlers: {
        data: [],
        error: '',
        isLoading: false
    },
    processStatus: {
        isLoading: false,
        error: '',
        data: {
            status: 'stopped',
            restartCount: 0
        }
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
    })),
    on(fetchCloudCodeStatusAction, (state) => ({
        ...state,
        processStatus: {
            ...state.processStatus,
            isLoading: true
        }
    })),
    on(cloudCodeStatusFetchedAction, (state, payload) => ({
        ...state,
        processStatus: {
            data: {
                status: payload.status,
                restartCount: payload.restartCount
            },
            isLoading: false,
            error: ''
        }
    })),
    on(errorInFetchingCloudCodeStatusAction, (state, payload) => ({
        ...state,
        processStatus: {
            isLoading: false,
            error: payload.error,
            data: null
        }
    }))
)