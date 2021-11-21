import React, { useState } from 'react'
import axios from 'axios'
import { Modal } from 'react-bootstrap'
import SwitchButtons from './SwitchButtons'

const ListingJobs = (props) => {
    const { appliedJob, updateItem } = props
    const [ user, setUser ] = useState({})
    const [ show, setShow ] = useState(false)

    const handleDisplay = (_id) => {
        axios.get(`http://dct-application-form.herokuapp.com/users/application-form/${_id}`)
            .then((response)=> {
                const result = response.data
                setUser(result)
                setShow(true)
            }) 
            .catch((err) => {
                alert(err) 
            })
    }

    const handleClose = () => {
        setShow(false)
    }
    
    return (
        <div>
            { appliedJob.length > 0 ? (
                <div>
                    <h3>{ appliedJob[0]['jobTitle'] }</h3>
                    <p>List of candidates applied for { appliedJob[0]['jobTitle'] } job</p>

                    <div className="row">
                        <div className="col-md-12">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Technical Skills</th>
                                        <th>Experience</th>
                                        <th>Applied Date</th>
                                        <th>View Details</th>
                                        <th>Update Application Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    { appliedJob.map((ele, i) => {
                                        return (
                                            <tr key={ele._id}>
                                                <td>{ele.name}</td>
                                                <td>{ele.skills}</td>
                                                <td>{ele.experience}</td>
                                                <td>{ele.createdAt}</td>
                                                <td><button className="btn btn-info" onClick={() => {
                                                    handleDisplay(ele._id)
                                                }}>View Details</button></td>
                                                <td><SwitchButtons
                                                    {...ele}
                                                    updateItem={ updateItem }
                                                /></td>
                                            </tr>
                                        )
                                    }) }
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header>
                            <Modal.Title><h4>{user.name} Profile</h4></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>    
                            { Object.keys(user).length > 0 && (
                            <>
                            <div className="d-flex justify-content-between">
                                <h5>Contact No</h5> <span>{user.phone}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <h5>Email ID</h5> <span>{user.email}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <h5>Skills</h5> 
                                <ul className="list-unstyled"> { 
                                user.skills.split(',').map((skill, i) => <li key={i}>{skill}</li>)
                                } </ul>
                            </div>
                            <div className="d-flex justify-content-between">
                                <h5>Experience</h5> <span>{user.experience}</span>
                            </div>
                            </> 
                        ) }
                        </Modal.Body>
                        <Modal.Footer>
                            <button variant="secondary" onClick={handleClose}>Close</button>
                        </Modal.Footer>
                    </Modal>
                </div>
            ) : null }
        </div>
    )
}

export default ListingJobs