import { createFeature, createReducer, on } from "@ngrx/store";
import { PROJECT_DETAILS_SLICE_NAME, ProjectDetailsState } from "./state";
import { errorInLoadingExplorerObjectsAction, errorInLoadingProjectDetailsAction, explorerObjectsLoadedAction, goInsideFolderAction, loadProjectDetailsAction, projectDetailsLoadedAction } from "./actions";

const PROJECT_DETAILS_DEFAULT_STATE: ProjectDetailsState = {
   project: {
    isLoading: false,
    data: null,
    error: ''
   },
   files: {
    isLoading: false,
    currentPath: '',
    objects: [],
    error: ''
   }
}

const projectDetailsReducer = createReducer(
    PROJECT_DETAILS_DEFAULT_STATE,
    on(loadProjectDetailsAction, (state) => ({
        ...state,
        project: {
            isLoading: true,
            error: '',
            data: null
        }
    })),
    on(projectDetailsLoadedAction, (state, { projectDetails }) => ({
        ...state,
        project: {
            isLoading: false,
            data: projectDetails,
            error: ''
        }
    })),
    on(errorInLoadingProjectDetailsAction, (state, { error }) => ({
        ...state,
        project: {
            isLoading: false,
            data: null,
            error
        }
    })),
    on(goInsideFolderAction, (state, { folderPath }) => ({
        ...state,
        files: {
            isLoading: true,
            currentPath: folderPath,
            objects: [],
            error: ''
        }
    })),
    on(explorerObjectsLoadedAction, (state, { objects }) => ({
        ...state,
        files: {
            ...state.files,
            isLoading: false,
            objects,
            error: '',
        }
    })),
    on(errorInLoadingExplorerObjectsAction, (state, { error }) => ({
        ...state,
        files: {
            ...state.files,
            isLoading: false,
            objects: [],
            error
        }
    }))
)

export const projectDetailsFeature = createFeature({
    name: PROJECT_DETAILS_SLICE_NAME,
    reducer: projectDetailsReducer,
})

export const {
    name,
    reducer,
} = projectDetailsFeature