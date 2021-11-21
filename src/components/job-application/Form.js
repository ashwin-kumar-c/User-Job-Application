import React, { useState } from 'react'
import validator from 'validator'
import axios from 'axios'
import { withRouter } from 'react-router'

const Form = (props) => {
    const [ name, setName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ phone, setPhone ] = useState('')
    const [ jobTitle, setJobTitle ] = useState('')
    const [ experience, setExperience ] = useState('')
    const [ skills, setSkills ] = useState('')
    const [ formErrors, setFormErrors ] = useState({})
    const errors = {}

    const roles = ['Front-End Developer', 'Node.js Developer', 'MEAN Stack Developer', 'FULL Stack Developer']

    const handleChange = (e) => {
        if(e.target.name === 'name') {
            setName(e.target.value)
        }   else if (e.target.name === 'email') {
            setEmail(e.target.value)
        }   else if (e.target.name === 'phone') {
            setPhone(e.target.value)
        }   else if (e.target.name === 'jobTitle') {
            setJobTitle(e.target.value)
        }   else if (e.target.name === 'experience') {
            setExperience(e.target.value)
        }   else if (e.target.name === 'skills') {
            setSkills(e.target.value)
        }   
    }

    const runValidations = () => {
        //name
        if(name.trim().length === 0) {
            errors.name = "Full Name cannot be blank"
        }

        //email
        if(email.trim().length === 0) {
            errors.email = "Email Address cannot be blank"
        }   else if (!validator.isEmail(email)) {
            errors.email = "Invalid email format"
        }

        //phone
        if(phone.trim().length === 0) {
            errors.phone = "Contact Number cannot be blank"
        } else if( !validator.isMobilePhone(phone.trim().split(' ').join(''),'en-IN',true)){
            errors.phone ='Invalid Number'
        }

        //experience
        if(experience.trim().length === 0) {
            errors.experience = "Experience cannot be blank"
        } 

        //skills
        if(skills.trim().length === 0) {
            errors.skills = "Technical Skills cannot be blank"
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        runValidations()

        if(Object.keys(errors).length === 0) {
            setFormErrors({})
            const formData = {
                name : name,
                email : email,
                phone : phone,
                jobTitle : jobTitle,
                experience : experience,
                skills : skills
            }
            
            axios.post('http://dct-application-form.herokuapp.com/users/application-form', formData)
                .then((response) => {
                    const result = response.data
                    if(result.hasOwnProperty("errors")) {
                        alert(result.message)
                    }   else {
                        alert('Successfully Registered')
                        // reset from
                        setName('')
                        setEmail('')
                        setPhone('')
                        setJobTitle('')
                        setExperience('')
                        setSkills('')
                        props.history.push('/')
                    }
                })
                .catch((err) => {
                    alert(err)
                })
        }   else {
            setFormErrors(errors)
        }
    }

    return (
        <form onSubmit={ handleSubmit }>
            <div className="row mb-3">
                <div className="col-sm-6">
                    <label className="form-label">Full name</label>
                    <input 
                        className="form-control"
                        type="text"
                        value={name}
                        onChange={handleChange}
                        name="name"                    
                    />
                    { formErrors.name && <div className="form-text"> {formErrors.name} </div> }
                </div>
            </div>
                
            <div className="row mb-3">
                <div className="col-sm-6">
                    <label className="form-label">Email address</label>
                    <input
                        className="form-control"
                        type="text"
                        value={email}
                        onChange={handleChange}
                        name="email"
                        placeholder="example@gmail.com"
                    />
                    { formErrors.email && <div className="form-text"> {formErrors.email} </div> }
                    </div>
            </div>    
                
            <div className="row mb-3">
                <div className="col-sm-6">
                    <label className="form-label">Contact Number</label>
                    <input
                        className="form-control"
                        type="text"
                        value={phone}
                        onChange={handleChange}
                        name="phone"
                        placeholder="+91 9481645207"
                    />
                    { formErrors.phone && <div className="form-text"> {formErrors.phone} </div> }
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-sm-6">
                    <label className="form-label">Applying for job</label>
                    <select 
                        className="form-select form-select" 
                        value={jobTitle} 
                        onChange={handleChange} 
                        name="jobTitle"
                    >
                        <option value="">---Select---</option>
                        { roles.map((ele, i) => {
                            return (
                                <option value={ele} key={i}>{ele}</option>
                            )
                        }) }
                    </select>
                </div>
            </div>


            <div className="row mb-3">
                <div className="col-sm-6">
                    <label className="form-label">Experience</label>
                    <input 
                        className="form-control"
                        type="text"
                        name="experience"
                        value={experience}
                        onChange={handleChange}
                        placeholder="Experience (2 years, 8 months)"
                    />
                    { formErrors.experience && <div className="form-text"> {formErrors.experience} </div> }
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-sm-6">
                    <label className="form-label">Technical Skills</label>
                    <textarea 
                        className="form-control"
                        value={skills} 
                        onChange={handleChange}
                        name="skills" 
                        placeholder="Technical Skills"
                    ></textarea>
                    { formErrors.skills && <div className="form-text"> {formErrors.skills} </div> }
                </div>
            </div>

            <input 
                className="btn btn-primary my-3"
                type="submit"
                value="Send Application"
            />
        </form>      
    )
}

export default withRouter(Form) 