import React from 'react'
import axios from 'axios'

const SwitchButtons = (props) => {
    const { status, _id, updateItem } = props

    const handleShortlist = () => {
        axios.put(`http://dct-application-form.herokuapp.com/users/application-form/update/${_id}`, {
            "status" : "shortlisted"
        })
        .then((response) => {
            const result = response.data    
            updateItem(result)
        })
        .catch((err) => {
            alert(err.message)
        })
    }

    const handleReject = () => {
        axios.put(`http://dct-application-form.herokuapp.com/users/application-form/update/${_id}`, {
            "status" : "rejected"
        })
        .then((response) => {
            const result = response.data
            updateItem(result)
        })
        .catch((err) => {
            alert(err.message)
        })
    }

    let button
    if(status === 'applied') {
        button = (
            <>
                <button 
                    className="btn btn-success" 
                    onClick={ handleShortlist } 
                >
                Shortlisted
                </button>
                
                <button 
                    className="btn btn-danger" 
                    onClick={ handleReject }
                >
                Rejected
                </button>
            </>
        )
    }   else if (status === 'shortlisted') {
        button = (
            <button 
                className="btn btn-success" 
                onClick={ handleShortlist } 
                disabled={true} 
            >
            Shortlisted
            </button>
        ) 
    }   else if (status === 'rejected') {
        button = (
            <button 
                className="btn btn-danger" 
                onClick={ handleReject } 
                disabled={true}
            >
            Rejected
            </button>
        )
    }


    return (
        <div>
            { button }
        </div>
    )
}

export default SwitchButtons