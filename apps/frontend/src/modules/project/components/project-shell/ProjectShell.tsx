import { SideTabView, SideTabContent } from "@praveenkumarcp/reacteasy";
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
                <SideTabView 
                    activeIndex={activeIndex} 
                    onChangeTab={setActiveIndex}
                    titleWidth={10}                    
                >
                    <SideTabContent title="Project Info">
                        <ProjectInfo />
                    </SideTabContent>
                    <SideTabContent title="Database">
                        <ProjectDatabase />
                    </SideTabContent>
                    <SideTabContent title="Files">
                        <ProjectObjectsExplorer />
                    </SideTabContent>
                    <SideTabContent disabled title="Settings">
                        <h1>Settings</h1>
                    </SideTabContent>
                    <SideTabContent title="Access Token">
                        <h1>Access token</h1>
                    </SideTabContent>
                    <SideTabContent title="Logs">
                        <h1>Logs</h1>
                    </SideTabContent>
                </SideTabView>
            </div>
        </div>
    )
}