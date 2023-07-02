import { useState } from "react";
import { IProjectObject } from "../../types/project-object.types"
import { ProjectFileDetails } from "../project-file-details/ProjectFileDetails";
import { ProjectObject } from "../project-object/ProjectObject";
import "./ProjectObjects.scss";

interface ProjectObjectProps {
    objects: IProjectObject[];
    path: string[];
    onLoadObjects: (parentFolder: IProjectObject) => unknown;
}

export function ProjectObjects(props: ProjectObjectProps) {
    const [fileDetails, setFileDetails] = useState<IProjectObject | null>(null);

    return (
        <div className="w-100 h-100 project-objects-container d-flex">
            <div 
                className={`${fileDetails ? 'w-75' : 'w-100'} h-100 project-objects`}
            >
                {props.objects.map(object => 
                    <ProjectObject 
                        object={object}  
                        key={object.name}
                        onLoadObjects={props.onLoadObjects}
                        onShowFileDetails={setFileDetails}
                    />
                )}
            </div>
            {
                fileDetails &&
                <div className="project-object__details">
                    <ProjectFileDetails file={fileDetails} />
                </div>
            }
        </div>
    )
}