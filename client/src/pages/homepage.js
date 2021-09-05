import React, { useEffect, useState } from "react";
import "../assets/css/style.css"
import Modal from 'react-modal'
import Navbar from "../components/navbar";

const Homepage = () => {

    // const [refresh, setRefresh] = useState(false)
    const [issues, setIssues] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)

    let issuesList = []

    useEffect(() =>{

        navigator.geolocation.getCurrentPosition(function (position) {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);

            fetch(`http://localhost:5000/fetchProblems/${position.coords.latitude}/${position.coords.longitude}`, {credentials: "include"})
        .then((response) => {
            response.json().then((problems) => {
                setIssues(problems)
                console.log(problems);
            })
        })

        }, function (e) {
            
            setIsModalOpen(true)
            
        });

        

    }, [])


    // const test = () =>{
    //     console.log("here",problems)
        
    //     // setProblemsList(problemList)
    //     // console.log("there",problemsList)
    // }

    return (
        <div>
            <Navbar>
              
            <Modal isOpen={isModalOpen}>
                <div>
                    Please allow the access to your location to see nearby tickets<br/>
                    Please follow the instructions from the
                    <a href="https://support.google.com/chrome/answer/142065?hl=ena" target="_blank"> link </a>
                    and then refresh the page
                    <button onClick = {() =>{setIsModalOpen(false)}}>OK</button>
                </div>
                </Modal>
                
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