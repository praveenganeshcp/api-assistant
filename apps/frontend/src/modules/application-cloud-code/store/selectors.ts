import { createSelector } from "@ngrx/store";
import { AppState } from "../../app/app.state";

const cloudCodeSelector = (state: AppState) => state.application.cloudCode

const requestHandlersSelector = createSelector(
    cloudCodeSelector,
    (cloudCodeState) => cloudCodeState.requestHandlers
)

export const requestHandlersDataSelector = createSelector(
    requestHandlersSelector,
    (requestHandlersState) => requestHandlersState.data
)  

export const requestHandlersLoadingSelector = createSelector(
    requestHandlersSelector,
    (requestHandlersState) => requestHandlersState.isLoading
)  

export const requestHandlersErrorSelector = createSelector(
    requestHandlersSelector,
    (requestHandlersState) => requestHandlersState.error
)  

const processStateSelector = createSelector(
    cloudCodeSelector,
    (cloudCodeState) => cloudCodeState.processStatus
)

export const processStateDataSelector = createSelector(
    processStateSelector,
    (processState) => processState.data
)  

export const processStateLoadingSelector = createSelector(
    processStateSelector,
    (processState) => processState.isLoading
)  

export const processStateErrorSelector = createSelector(
    processStateSelector,
    (processState) => processState.error
)  