import React from 'react'

const Navbar = (props) => {
    return (
            <div className="wrapper d-flex align-items-stretch">
            <nav id="sidebar">
                <div className="custom-menu">
                    <button type="button" id="sidebarCollapse" className="btn btn-primary">
                        <i className="fa fa-bars"></i>
                        <span className="sr-only">Toggle Menu</span>
                    </button>
                </div>
                <div className="p-4">
                    <h1><a href="index.html" className="logo">Portfolio <span>Portfolio Agency</span></a></h1>
                    <ul className="list-unstyled components mb-5">
                        <li className="active">
                            <a href="/register"><span className="fa fa-pencil mr-3"></span> Register</a>
                        </li>
                        <li>
                            <a href="/login"><span className="fa fa-book mr-3"></span> Login</a>
                        </li>
                        <li>
                            <a href="/createTicket"><span className="fa fa-sticky-note mr-3"></span> Raise a Ticket</a>
                        </li>
                        <li>
                            <a href="/myTickets"><span className="fa fa-suitcase mr-3"></span> My Tickets</a>
                        </li>
                        {/* <li>
                            <a href="/"><span className="fa fa-suitcase mr-3"></span> Gallery</a>
                        </li>
                        <li>
                            <a href="/"><span className="fa fa-cogs mr-3"></span> Services</a>
                        </li>
                        <li>
                            <a href="/"><span className="fa fa-paper-plane mr-3"></span> Contacts</a>
                        </li> */}
                    </ul>
                </div>
                <div className="mb-5">
                    <h3 className="h6 mb-3">Subscribe for newsletter</h3>
                    <form action="#" className="subscribe-form">
                        <div className="form-group d-flex">
                            <div className="icon"><span className="icon-paper-plane"></span></div>
                            <input type="text" className="form-control" placeholder="Enter Email Address" />
                        </div>
                    </form>
                </div>

                <div className="footer">
                    <p>Copyright ©2021 All rights reserved | This template is made with by </p>
                </div>
            </nav>
            {props.children} 
	    </div>
        
    )
}

export default Navbar
