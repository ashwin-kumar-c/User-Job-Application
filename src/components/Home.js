import React from 'react'
import interview from '../assests/interview.svg' 

const Home = (props) => {

    return (
        <div className="container">
            <div className="text-center">
                <img src={interview} alt="interview"/>
            </div>
        </div>
    )
}

export default Home