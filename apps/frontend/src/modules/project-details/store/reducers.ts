import { createReducer, on } from "@ngrx/store";
import { FileExplorerState, ProjectDetailsState } from "./state";
import { errorInLoadingExplorerObjectsAction, errorInLoadingProjectDetailsAction, explorerObjectsLoadedAction, goInsideFolderAction, loadProjectDetailsAction, projectDetailsLoadedAction } from "./actions";

const PROJECT_DETAILS_DEFAULT_STATE: ProjectDetailsState = {
    isLoading: false,
    data: null,
    error: ''
}

const FILE_EXPLORER_DEFAULT_STATE: FileExplorerState = {
    isLoading: false,
    currentPath: '',
    objects: [],
    error: ''
}

export const projectDetailsReducer = createReducer(
    PROJECT_DETAILS_DEFAULT_STATE,
    on(loadProjectDetailsAction, (state) => ({
        ...state,
        isLoading: true,
        error: ''
    })),
    on(projectDetailsLoadedAction, (state, { projectDetails }) => ({
        isLoading: false,
        data: projectDetails,
        error: ''
    })),
    on(errorInLoadingProjectDetailsAction, (state, { error }) => ({
        isLoading: false,
        data: null,
        error
    }))
)

export const fileExplorerReducer = createReducer(
    FILE_EXPLORER_DEFAULT_STATE,
    on(goInsideFolderAction, (state, { folderPath }) => ({
        ...state,
        isLoading: true,
        currentPath: folderPath,
        objects: []
    })),
    on(explorerObjectsLoadedAction, (state, { objects }) => ({
        ...state,
        isLoading: false,
        objects,
        error: ''
    })),
    on(errorInLoadingExplorerObjectsAction, (state, { error }) => ({
        ...state,
        isLoading: false,
        objects: [],
        error
    }))
)