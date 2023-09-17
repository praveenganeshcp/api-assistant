import { createAction, props } from "@ngrx/store";
import { Project } from "./dashboard.state";

const DASHBOARD_ACTION_PREFIX = "[Dashboard]";

export const loadProjects = createAction(
    `${DASHBOARD_ACTION_PREFIX} Load Projects`
)

export const projectsLoaded = createAction(
    `${DASHBOARD_ACTION_PREFIX} Projects loaded`,
    props<{data: Project[]}>()
)

export const errorInLoadingProjects = createAction(
    `${DASHBOARD_ACTION_PREFIX} Error in loading projects`,
    props<{error: string}>()
)