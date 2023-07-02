import { MdOutlineFileOpen } from "react-icons/md";
import { IProjectObject } from "../../types/project-object.types";
import { Button } from "@praveenkumarcp/reacteasy";
import "./ProjectFileDetails.scss";

export interface ProjectFileDetailsProps {
    file: IProjectObject;
}

export function ProjectFileDetails(props: ProjectFileDetailsProps) {
    const {file} = props;
    return (
        <div className="project-file-details">
            <MdOutlineFileOpen />
            <h5>{file.name}</h5>
            <h6>Created on {file.createdOn.toDateString()}</h6>
            <h6>Modified on {file.modifiedOn.toDateString()}</h6>
            <Button label="Download file" />
        </div>
    )
}