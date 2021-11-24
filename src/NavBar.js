import React from 'react'
import { Link, Route } from 'react-router-dom'
import Home from './components/Home'
import ApplicationForm from './components/job-application/ApplicationForm'
import AdminDashboard from './components/admin-dashboard/Admin-Dashboard'

const NavBar = (props) => {

    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark" >
                <div className="container">
                    <h1 className="navbar-brand" > User Job Application </h1>
                    <button 
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbar"
                        >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbar">
                        <ul className="navbar-nav ms-auto" >
                            <li className="nav-item" >
                                <Link className="nav-link" to="/"> Home </Link>
                            </li>
                            <li className="nav-item" >
                                <Link className="nav-link" to="/application-form"> Application Form </Link>
                            </li>
                            <li className="nav-item" >
                                <Link className="nav-link" to="/admin"> Admin Dashboard </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        
            <Route path="/" component={ Home } exact={ true } />
            <Route path="/application-form" component={ ApplicationForm } />
            <Route path="/admin" component={ AdminDashboard } />
        </div>
    )
}

export default NavBar