import React, {useState, useEffect, useRef} from 'react'
import './feed.css'
import Feed from './Feed'
import useOnClickOutside from "../../hooks/useOnClickOutside"
import rssFeedParser from "../../utils/rssFeedParser"

function FeedModal({selectedProject, setSelectedProject}) {
    const feedModalRef = useRef()
    const handleFeedModalOutsideClick = (event) => {
        event.preventDefault()
        event.stopPropagation()
        setSelectedProject(null)
    }
    useOnClickOutside(feedModalRef,handleFeedModalOutsideClick)

    const [feeds, setFeeds] = useState([])
    const [isLoading, setLoadingState] =  useState(true)
    const [errorMsg, setErrorMsg] = useState("")
    const [refresh, setRefresh] = useState(0)
    useEffect(() => {
        rssFeedParser(selectedProject.link)
        .then(res => {
            setFeeds(res.feeds)
            setLoadingState(false)
            setErrorMsg("")
        })
        .catch((errObj) => {
            setLoadingState(false)
            setErrorMsg(errObj.msg)
        })    
    }, [refresh])

    const handleRefreshClick = () => {
        setFeeds([])
        setLoadingState(true)
        setErrorMsg("")
        setRefresh(refresh + 1)
    }

    return  (
        <div className="feed-modal-container" >
            <div ref={feedModalRef}>
                <div>
                    <div className="feed-modal-close-icon" onClick={() => setSelectedProject(null)}>
                        <div>
                            <div>X</div>
                        </div>
                    </div>
                    <div className="feed-modal-refresh-icon" >
                        <div>
                            <i class="material-icons" onClick={() => handleRefreshClick()}>refresh</i>
                        </div>
                    </div>
                    <div className="feed-modal-title">{selectedProject.name}</div>
                    {isLoading 
                        ? <div className="loader"></div>
                        : <React.Fragment>
                          {
                            errorMsg 
                                ? <div>{errorMsg}</div>
                                : <div>
                                    {feeds.map((feed, i) => <Feed key={feed.link ? `${feed.link}-${i}` : i} feed={feed}/>)}
                                </div> 
                          }
                          </React.Fragment>
                    }    
                </div>
            </div>
        </div>
    )
}

export default FeedModal