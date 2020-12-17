import React from 'react'
import ProjectThumbnail from './ProjectThumbnail'
import Button from '../common/Button'

function ProjectDashboard({setSelectedProject, dataStore, toggleCreatePorjectModal, removeProjectFromList}) {
    return (
        <div className="project-dashboard-container">
            <div className="create-project-thumbnail">
                <div>Create Project</div>
                <div className="create-button-container">
                    <Button handleClick={() => toggleCreatePorjectModal(true)}>Create</Button>
                </div>
            </div>
            {dataStore.projects.map((projectObj, i) => 
                <ProjectThumbnail 
                    key={projectObj.uid ? `${projectObj.uid}-${i}` : i}   
                    projectObj={projectObj} 
                    setSelectedProject={setSelectedProject} 
                    removeProjectFromList={removeProjectFromList}/>
            )}
        </div>
    )
}

export default ProjectDashboard