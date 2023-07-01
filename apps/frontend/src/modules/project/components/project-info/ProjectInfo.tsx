import { 
    MdOutlineFolder, 
    MdOutlineStorage,
    MdOutlinePeople,
    MdOutlineCalendarMonth,
    MdOutlineTableView,
    MdOutlineUpload,
    MdOutlineEdit,
    MdOutlineGetApp,
    MdOutlineDelete,
    MdOutlineKey
} from "react-icons/md";
import "./ProjectInfo.scss";

interface ProjectInfoProp {
    id: number,
    icon: any;
    value: string;
}

export function ProjectInfo() {
    const projectProps: ProjectInfoProp[] = [
        { id: 1, icon: <MdOutlineFolder />, value: "API Assistant" },
        { id: 2, icon: <MdOutlineStorage />, value: "1.2 GB" },
        { id: 3, icon: <MdOutlinePeople />, value: "14 users" },
        { id: 4, icon: <MdOutlineTableView />, value: "12 tables" },
        { id: 5, icon: <MdOutlineUpload />, value: "2018 Create queries" },
        { id: 6, icon: <MdOutlineEdit />, value: "1200 Update queries" },
        { id: 7, icon: <MdOutlineGetApp />, value: "14 Read queries" },
        { id: 8, icon: <MdOutlineDelete />, value: "2018 Delete queries" },
        { id: 9, icon: <MdOutlineCalendarMonth />, value: "July 11, 2018" },
        { id: 10, icon: <MdOutlineKey />, value: "API Token generated on July 11, 2018" },
    ]
    return (
        <section className="project-info">
            {projectProps.map((props, index) => {
                return (
                    <div className="project-info__prop" key={index}>
                        {props.icon}
                        <span>{props.value}</span>
                    </div>
                )
            })}
        </section>
    )
}