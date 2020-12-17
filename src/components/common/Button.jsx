import React from 'react'

function Button({children, handleClick}) {
    return (
        <div className="button-container" onClick={handleClick}>
            <div>{children}</div>
        </div>
    )
}

export default Button