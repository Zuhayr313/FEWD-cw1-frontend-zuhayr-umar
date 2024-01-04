import React from "react";
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className="container-fluid bg-white sticky-top">
            <div className="container">
                <nav className="navbar navbar-expand-lg bg-white navbar-light py-2 py-lg-0">
                    <button
                        type="button"
                        className="navbar-toggler ms-auto me-0"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav ms-auto">
                            <NavLink exact to="/" className="nav-item nav-link" activeClassName="active">
                                Home
                            </NavLink>
                            <NavLink to="/itinerary" className="nav-item nav-link" activeClassName="active">
                                Itinerary
                            </NavLink>
                            {/* Add more NavLink components as needed */}
                        </div>
                        <div className="border-start ps-4 d-none d-lg-block">
                            <button type="button" className="btn btn-sm p-0">
                                <i className="fa fa-search"></i>
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;
