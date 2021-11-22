import React from 'react'

const Buttons = (props) => {
    const { handleClick } = props

    return (
        <div className="btn-toolbar">
            <button 
                type="button"
                className="btn btn-outline-primary mb-4 mx-auto" 
                name="front-end" 
                onClick={handleClick} 
            > 
            Front-End Developer 
            </button>

            <button 
                type="button"
                className="btn btn-outline-warning mb-4 mx-auto" 
                name="node-js" 
                onClick={handleClick} 
            > 
            Node.js Developer 
            </button>
            
            <button 
                type="button"
                className="btn btn-outline-info mb-4 mx-auto" 
                name="mean-stack" 
                onClick={handleClick} 
            > 
            MEAN Stack Developer 
            </button>
            
            <button 
                type="button"
                className="btn btn-outline-secondary mb-4 mx-auto" 
                name="full-stack" 
                onClick={handleClick} 
            > 
            FULL Stack Developer 
            </button>
        </div>
    )
}

export default Buttons