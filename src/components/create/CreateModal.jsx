import React, {useState, useEffect, useRef} from 'react'
import './create.css'
import Button from '../common/Button'
import useOnClickOutside from "../../hooks/useOnClickOutside"
import {ServerPath} from "../../constants/common"
import rssFeedParser from "../../utils/rssFeedParser"
import {postData} from "../../utils/serviceUtils"
import {createModalErrObj} from "../../constants/errorMessages/create"

function CreateModal({toggleCreatePorjectModal, fetchProjects}) {
    const createModalRef = useRef()
    const handleOutsideCreateModalClick = (event) => {
        event.preventDefault()
        event.stopPropagation()
        toggleCreatePorjectModal(false)
    }
    useOnClickOutside(createModalRef, handleOutsideCreateModalClick)

    const [name, setName] = useState("")
    const [link, setLink] = useState("")
    const [error, setError] = useState("")
    const handleNameChange = (e) => {
        e.persist();
        setName(e.target.value)
    }

    const handleLinkChange = (e) => {
        e.persist();
        setLink(e.target.value)
    } 

    function validateLinkAndCreateProject() {
            if(link.trim() === "" || name.trim() === "") {
                setError(createModalErrObj.allManditory)
                return
            }
            
            rssFeedParser(link.trim())
                .then((res) => {
                    let url = `${ServerPath}/projects/create`
                    let params = {name, link}
                    const successFunc = response => {
                        if(response.data.error) {
                            setError(createModalErrObj.somethingWentWrong)
                        } else {
                            fetchProjects()
                            toggleCreatePorjectModal(false)
                        }
                    }
                    const errFunc = err => {
                        setError(createModalErrObj.somethingWentWrong)
                    }
                    postData(url,params,successFunc,errFunc)
                })
                .catch((err) => {
                    setError(err.msg) 
                })
    }

    const projectNameRef = useRef()
    useEffect(() => {
        projectNameRef.current.focus()
    }, [])

    return  (
        <div className="create-modal-container" >
            <div ref={createModalRef}>
                <div>
                    <div className="feed-modal-close-icon" onClick={() => toggleCreatePorjectModal(false)}>
                        <div>
                            <div>X</div>
                        </div>
                    </div>
                    <div className="create-modal-header">Create Project</div>
                    <div className="create-modal-block">
                        <div className="label">Project Name:</div>
                        <div>
                            <input ref={projectNameRef} 
                                   value={name} 
                                   placeholder="Example: New Yorker Feeds" 
                                   onChange={(e) => handleNameChange(e)} />
                            <div className="desc">Enter Project name, for which you are going to setup rss feed. For Example: "New Yorker Feeds"</div>
                        </div>
                    </div>
                    <div className="create-modal-block">
                        <div className="label">Feed link:</div>
                        <div>
                            <input value={link} placeholder="Example: https://www.newyorker.com/feed/humor" onChange={(e) => handleLinkChange(e)}/>
                            <div className="desc">Enter feed link, for which you are going to recieve rss feeds. For Example: "https://www.newyorker.com/feed/humor"</div>
                        </div>
                    </div>
                    <div className={error?"error":"hidden error"}>{error? error : "hidden"}</div>
                    <div className="create-modal-button">
                        <Button handleClick={() => validateLinkAndCreateProject()}>Create</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateModal