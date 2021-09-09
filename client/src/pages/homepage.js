import React, { useEffect, useState } from "react";
import "../assets/css/style.css"
import Modal from 'react-modal'
import Navbar from "../components/navbar";
import ProblemCard from "../components/card"
import RightCard from "../components/rightCard";
import "../assets/css/rightCard.css";
import Loader from "../components/loaderGeneral";

const Homepage = () => {

    const [issues, setIssues] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoadingHome, setIsLoadingHome] = useState(true);
    

    
      
    useEffect(() =>{
        
        navigator.geolocation.getCurrentPosition(function () {}, function () {}, {});
        navigator.geolocation.getCurrentPosition((position) => 
        {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            
            fetch(`http://localhost:5000/fetchProblems/${position.coords.latitude}/${position.coords.longitude}`, {credentials: "include"})
            .then((response) => {
                response.json().then((problems) => {
                    setIssues(problems)
                    console.log(problems)
                    setIsLoadingHome(false)
                    setIsLoadingHome(false)
                     
                    
            })
        })

        }, function (e) {
            
            setIsModalOpen(true)
            
        },
        {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0
        });

    }, [])


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
            {isLoadingHome && <Loader/>}
                {!isLoadingHome && <div className="col-md-10">
                {
                issues.map((issue, index) => {
                    return <div key={index}>
                        
                        <ProblemCard title={issue.title} description={issue.description} 
                        priority={issue.priority} status={issue.status} category={issue.category} location={issue.location} problemId={issue._id} images={issue.images}></ProblemCard>
                        
                    </div>
                })}
            </div>}
            <div className="col-md-2" style = {{position:"sticky",top:"0",alignSelf:"right"}}>
            {!isLoadingHome && <RightCard />}
            
            </div>
            </div> 
            
            <div>
            </div>

            </Navbar>
            
        </div>
        )
};
export default Homepage;