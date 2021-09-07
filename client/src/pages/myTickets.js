import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import "../assets/css/style.css"
import Navbar from "../components/navbar";
import ProblemCard from "../components/card";
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
                        <ProblemCard title={issue.title} description={issue.description} 
                        priority={issue.priority} status={issue.status} category={issue.category} location={issue.location} problemId={issue._id} images={issue.images}></ProblemCard>
                    </div>
                })}
            </div> 
            
            <div>

            </div>

    
        </div>
        )
};
export default MyTickets;