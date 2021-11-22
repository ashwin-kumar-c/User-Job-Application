import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ListingJobs from './ListingJobs'
import Buttons from './Buttons'

const Container = (props) => {
    const [ userData, setUserData ] = useState([])
    const [ appliedJob, setAppliedJob ] = useState([])

    useEffect(() => {
        axios.get('http://dct-application-form.herokuapp.com/users/application-forms')
            .then((response) => {
                const result = response.data
                setUserData(result)
            })
            .catch((err) => {
                alert(err.message)
            })
    }, [])

    const updateItem = (job) => {
        const result = appliedJob.map((ele) => {
            if(ele._id === job._id) {
                return {...ele, ...job}
            }   else {
                return {...ele}
            }
        })
        setUserData(result)
        setAppliedJob(result)
    }

    const frontEndJobs = userData.filter(ele => ele.jobTitle === "Front-End Developer")

    const nodeJsJobs = userData.filter(ele => ele.jobTitle === "Node.js Developer")

    const meanStackJobs = userData.filter(ele => ele.jobTitle === "MEAN Stack Developer")

    const fullStackJobs = userData.filter(ele => ele.jobTitle === "FULL Stack Developer")
    
    const handleClick = (e) => {
        if(e.target.name === 'front-end') {
            setAppliedJob(frontEndJobs)
        }   else if (e.target.name === 'node-js') {
            setAppliedJob(nodeJsJobs)
        }   else if (e.target.name === 'mean-stack') {
            setAppliedJob(meanStackJobs)
        }   else if (e.target.name === 'full-stack') {
            setAppliedJob(fullStackJobs)
        }
    }

    return (
        <div>
            <Buttons handleClick={handleClick}/>        
            <ListingJobs
            appliedJob={appliedJob}
            updateItem={updateItem} 
            />
        </div>
    )
}

export default Container