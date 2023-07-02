import { MdOutlineFileOpen, MdFolderOpen } from "react-icons/md";
import { IProjectObject } from "../../types/project-object.types";
import "./ProjectObject.scss";

interface ProjectObjectProps {
    object: IProjectObject;
    onLoadObjects: (parentFolder: IProjectObject) => unknown;
    onShowFileDetails: (file: IProjectObject | null) => unknown;
}

export function ProjectObject(props: ProjectObjectProps) {
    const projectObject = props.object;
    const isObjectFileType = projectObject.isFile;

    const onLoadObjects = () => {
        if(!projectObject.isFile) {
            props.onLoadObjects(projectObject);
        }
    }

    const onShowFileDetails = () => {
        if(projectObject.isFile) {
            props.onShowFileDetails(projectObject);
        }
        else {
            props.onShowFileDetails(null);
        }
    }

    return (
        <button 
            onDoubleClick={onLoadObjects}
            onClick={onShowFileDetails} 
            className="project-object"
        >
            {isObjectFileType ? <MdOutlineFileOpen /> : <MdFolderOpen />}
            <span className="project-object__name">{projectObject.name}</span>
        </button>
    )
}