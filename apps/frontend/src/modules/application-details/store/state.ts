import { ApplicationDetails, FileObject } from '@api-assistant/project-core-fe';
import { CanBeNull } from 'ngx-simple-widgets';

export interface ApplicationDetailsState {
  application: {
    data: CanBeNull<ApplicationDetails>;
    isLoading: boolean;
    error: string;
  };
  files: {
    isLoading: boolean;
    currentPath: string;
    objects: FileObject[];
    error: string;
  };
}

export const APPLICATION_DETAILS_SLICE_NAME = 'applicationDetails';
