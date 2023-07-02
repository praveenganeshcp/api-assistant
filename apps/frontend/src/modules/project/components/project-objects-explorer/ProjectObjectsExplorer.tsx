import { ProjectObjects } from "../project-objects/ProjectObjects";
import { IProjectObject } from "../../types/project-object.types";
import "./ProjectObjectsExplorer.scss";

export function ProjectObjectsExplorer() {

    const onLoadObjects = (parentObject: IProjectObject) => {
        console.log(`Loading files under ${parentObject.name} folder`);
    }

    const projectObjects: IProjectObject[] = [
        { name: "Profile.jpeg", isFile: true, path: "/", size: 100, createdOn: new Date(), modifiedOn: new Date() },
        { name: "Dogs.jpeg", isFile: true, path: "/", size: 100, createdOn: new Date(), modifiedOn: new Date()  },
        { name: "Accounts", isFile: false, path: "/", size: 100, createdOn: new Date(), modifiedOn: new Date()  },
        { name: "Profiles", isFile: false, path: "/", size: 100, createdOn: new Date(), modifiedOn: new Date()  },
    ]
    
    return (
        <section className="project-objects-explorer">
            <ProjectObjects 
                path={['']} objects={projectObjects} 
                onLoadObjects={onLoadObjects}
            />
        </section>
    )
}