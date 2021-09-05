import React, { useEffect, useState } from "react";
import "../assets/css/style.css"
import Navbar from "../components/navbar";

const Homepage = () => {

    // const [refresh, setRefresh] = useState(false)
    const [issues, setIssues] = useState([])

    let issuesList = []

    useEffect(() =>{

        fetch("http://localhost:5000/fetchProblems", {credentials: "include"})
        .then((response) => {
            response.json().then((problems) => {
                setIssues(problems)
                console.log(problems);
            })
        })

    }, [])


    // const test = () =>{
    //     console.log("here",problems)
        
    //     // setProblemsList(problemList)
    //     // console.log("there",problemsList)
    // }

    return (
        <div>
            <Navbar>
              
                
            <div id="content" className="p-4 p-md-5 pt-5">
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

            </Navbar>
    
        </div>
        )
};
export default Homepage;