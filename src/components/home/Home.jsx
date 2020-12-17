import React, {useState,useEffect} from 'react'
import ProjectDashboard from './ProjectsDashboard'
import './home.css'
import FeedModal from '../feed/FeedModal'
import CreateModal from '../create/CreateModal'
import {ServerPath} from "../../constants/common"
import {getData} from "../../utils/serviceUtils"

function Home() {
    const [selectedProject, setSelectedProject] = useState(null)

    const [projects, setProjects] = useState([])
    const [isLoading, setLoadingStatus] = useState(true)
    const [showCreate, setShowCreate] = useState(false)
    
    const fetchProjects = () => {
        let url = `${ServerPath}/projects/list`
        const successFunc = response => {
            setProjects(response.data)
            setLoadingStatus(false)
        }
        const errFunc = err => {
            console.log(err)
        }
        getData(url, successFunc, errFunc)
    }

    useEffect(() => {
        fetchProjects()    
    }, [])

    const toggleCreatePorjectModal = (value) => {
        setShowCreate(value)
    }

    const removeProjectFromList = (uid) => {
        let nextProjects = [...projects].filter((obj, i) => obj.uid !== uid)
        setProjects(nextProjects)
    }
    
    return (
    <div>
        <div className="home-title">RSS Projects</div>
        <div className="home-desc">RSS Projects lets you check current rss feeds so you can stay upto date with latest development.</div>
        {isLoading 
            ? <div className="loader"></div>
            : <React.Fragment>
                <ProjectDashboard   
                    setSelectedProject={setSelectedProject} 
                    dataStore={{projects, isLoading, showCreate}}
                    toggleCreatePorjectModal={toggleCreatePorjectModal}
                    removeProjectFromList={removeProjectFromList}
                />
                {selectedProject && <FeedModal selectedProject={selectedProject} setSelectedProject={setSelectedProject}/>}
                {showCreate && <CreateModal toggleCreatePorjectModal={toggleCreatePorjectModal} fetchProjects={fetchProjects}/>}
              </React.Fragment>}
    </div>
    )
}

export default Home