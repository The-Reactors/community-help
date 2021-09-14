import React from 'react'

const Navbar = (props) => {
    
    return (
            <div className="wrapper d-flex align-items-stretch"  >
            <nav id="sidebar" >
                <div>
                <div className="custom-menu" >
                    <button type="button" id="sidebarCollapse" className="btn btn-primary" style={{zIndex:"2"}}>
                        <i className="fa fa-bars"></i>
                        <span className="sr-only" >Toggle Menu</span>
                    </button>
                
                </div>
                <div>
                <div className="p-4" >
                    <h1><a href="/" className="logo">Nayak <span>Community Help Service</span></a></h1>
                    <ul className="list-unstyled components mb-5">
                        
                        <li name = "home">
                            <a href="/"><span className="fa fa-home mr-3"></span> Home</a>
                        </li>
                        <li name = "register">
                            <a href="/register"><span className="fa fa-pencil mr-3"></span> Register</a>
                        </li>
                        <li name = "login">
                            <a href="/login"><span className="fa fa-book mr-3"></span> Login</a>
                        </li>
                        <li name = "raiseATicket">
                            <a href="/createTicket"><span className="fa fa-sticky-note mr-3"></span> Raise a Ticket</a>
                        </li>
                        <li name = "myTickets">
                            <a href="/myTickets"><span className="fa fa-suitcase mr-3"></span> My Tickets</a>
                        </li>
                        
                    </ul>
                    </div>
                
                <div className="mb-5" style={{margin:"10px"}}>
                    <h3 className="h6 mb-3">Contact the NAYAK Team</h3>
                    <form action="#" className="subscribe-form">
                        <div className="form-group d-flex">
                            <div className="icon"><span className="icon-paper-plane"></span></div>
                            <input type="text" className="form-control" placeholder="Enter Email Address"  style={{border:"1px solid #3445B4"}}/>
                        </div>
                    </form>
                </div>
                </div>
                
                <div className="footer" style={{margin:"10px"}}>
                    <p style={{color:"white"}}>Copyright ©2021 All rights reserved | NAYAK Team </p>
                </div>
                </div>   
            </nav>
            {props.children} 
	    </div>
        
    )
}

export default Navbar
