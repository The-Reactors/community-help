import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import "../assets/css/style.css"
import Navbar from "../components/navbar";

const MyTickets = () => {

    const [issues, setIssues] = useState([])

    useEffect(() =>{

            fetch(`http://localhost:5000/MyTickets`, {credentials: "include"})
        .then((response) => {
            if(!response.ok){
                swal({
                  title: "Unauthorised!",
                  text: "Please Login",
                  icon: "error",
                });
               }
            response.json().then((problems) => {
                setIssues(problems)
                console.log(problems);
                
            })
        }).catch((error) => {
                swal({
                  title: "Unknown Error!",
                  text: "Please Try Again Later",
                  icon: "error",
                });
            })
    }, [])

    return (
        <div>
            <div id="content" className="p-4 p-md-5 pt-5">
                <h1 style={{textAlign:"center"}}>My Tickets</h1>
                {
                    
                issues.map((issue, index) => {
                    return <div key={index}>
                        ***********Ticket {index+1} **************
                        <h3>Title: {issue.title}</h3>
                        <h4> Description: {issue.description}</h4> 
                        <h5>Priority: {issue.priority}</h5>
                        <h5>Status: {issue.status}</h5>
                        <h5>Category: {issue.category}</h5>
                        <h5>Location: {issue.location}</h5>
                        
                    </div>
                })}
            </div> 
            
            <div>

            </div>

    
        </div>
        )
};
export default MyTickets;