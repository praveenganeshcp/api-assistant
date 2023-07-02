import { Tab, TabView } from "@praveenkumarcp/reacteasy";
import { useState } from "react";
import { ProjectDatabase } from "../project-database/ProjectDatabase";
import { ProjectInfo } from "../project-info/ProjectInfo";
import { ProjectObjectsExplorer } from "../project-objects-explorer/ProjectObjectsExplorer";
import "./ProjectShell.scss";

export function ProjectShell() {

    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="h-100 w-100 d-flex align-items-center flex-column justify-content-center">
            <div className="mt-3 project-shell-tab-view">
                <TabView 
                    activeIndex={activeIndex} 
                    onChangeTab={setActiveIndex}
                    contentWidth={'85%'}
                    titleWidth={'15%'}
                >
                    <Tab title="Project Info">
                        <ProjectInfo />
                    </Tab>
                    <Tab title="Database">
                        <ProjectDatabase />
                    </Tab>
                    <Tab title="Files">
                        <ProjectObjectsExplorer />
                    </Tab>
                    <Tab disabled title="Settings">
                        <h1>Settings</h1>
                    </Tab>
                    <Tab title="Access Token">
                        <h1>Access token</h1>
                    </Tab>
                    <Tab title="Logs">
                        <h1>Logs</h1>
                    </Tab>
                </TabView>
            </div>
        </div>
    )
}