import React from 'react'
import Button from '../common/Button'
import {ServerPath} from "../../constants/common"
import {deleteData} from "../../utils/serviceUtils" 

function ProjectThumbnail({projectObj, setSelectedProject, removeProjectFromList}) {

    const handleDeleteClick = (uid) => {
        let url = `${ServerPath}/projects/delete/${uid}`
        const successFunc = () => removeProjectFromList(uid)
        const errFunc = (err) => console.log(err)
        deleteData(url,successFunc,errFunc)
    } 

    return (
        <div className="project-thumbnail-container">
            <div className="delete-icon" onClick={() => handleDeleteClick(projectObj.uid)}><span className="material-icons">delete_outline</span></div>
            <span className="ellipsis inline-block thumbail-title">{projectObj.name}</span>
            <div className="view-button-container"><Button handleClick={() => setSelectedProject(projectObj)}>View</Button></div>
        </div>
    )
}

export default ProjectThumbnail