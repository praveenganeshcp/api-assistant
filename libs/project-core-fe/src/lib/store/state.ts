import { CanBeNull } from "ngx-simple-widgets";
import { FileObject, ProjectDetails } from "../types";

export interface ProjectDetailsState {
  project: {
    data: CanBeNull<ProjectDetails>;
    isLoading: boolean;
    error: string
  },
  files: {
    isLoading: boolean;
    currentPath: string;
    objects: FileObject[];
    error: string
  }
}

export type GlobalState = {[PROJECT_DETAILS_SLICE_NAME]: ProjectDetailsState}

export const PROJECT_DETAILS_SLICE_NAME = "projectDetails"