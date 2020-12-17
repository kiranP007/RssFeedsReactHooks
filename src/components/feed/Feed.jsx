import React from 'react'

function Feed({feed}) {
    return (
        <div className="feed-container">
            <div>{feed.title}</div>
            {feed.author && <div className="author">- {feed.author}</div>}
            {feed.content && <div className="content">{feed.content}</div>}
            {feed.link && <a href={feed.link} target="_blank">View more</a>}
        </div>
    )
}

export default Feed