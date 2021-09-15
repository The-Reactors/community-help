import React, { useEffect, useState } from "react";
import "../assets/css/style.css"
import Modal from 'react-modal'
import Navbar from "../components/navbar";
import ProblemCard from "../components/card"
import RightCard from "../components/rightCard";
import "../assets/css/rightCard.css";
import Loader from "../components/loaderGeneral";
import ProfileNav from "../components/profileNav";

const Homepage = () => {

    const [issues, setIssues] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoadingHome, setIsLoadingHome] = useState(true);
    const [filter, setFilter] = useState(false)
    const [refreshCard,setRefreshCard] = useState(false)

    const setLoadingHome = () => {
        setIsLoadingHome(true);
    }
    const [filterParams, setFilterParams] = useState({
        proximity:"10",
        category:"none",
        priority:"none",
        status:"none"
    })
    
    const updateIssues = (problems) => setIssues(problems);
    const updateFilter = () => filter === false ? setFilter(true) : setFilter(false);
    const updateRefreshCard = () => refreshCard === false ? setRefreshCard(true): setRefreshCard(false);

    const updateFilterParams = (params) => setFilterParams({
        proximity:params.proximity,
        category:params.category,
        priority:params.priority,
        status:params.status
    })
      
    useEffect(() =>{
        console.log("ahhahha")
        
        navigator.geolocation.getCurrentPosition(function () {}, function () {}, {});
        navigator.geolocation.getCurrentPosition((position) => 
        {
            console.log("Latitude is :", position.coords.latitude);
            console.log("Longitude is :", position.coords.longitude);
            
            fetch(`http://localhost:5000/fetchProblems/${position.coords.latitude}/${position.coords.longitude}/${filterParams.proximity}/${filterParams.category}/${filterParams.priority}/${filterParams.status}`, {credentials: "include"})
            .then((response) => {
                response.json().then((problems) => {
                    //setIssues(problems)
                    updateIssues(problems)
                    
                    refreshCard === true ? setRefreshCard(false) : setRefreshCard(true)
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

    }, [filter])


    return (
        
        <div>
            
            <Navbar activeElement="home">
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
           {!isLoadingHome && <ProfileNav/> } 
           <div className="col-md-9">
                {!isLoadingHome && <div>
                {
                issues.map((issue, index) => {
                    console.log(issue.status)
                    return <div key={index}>
                        
                        <ProblemCard title={issue.title} description={issue.description} 
                        priority={issue.priority} status={issue.status} category={issue.category} location={issue.location} problemId={issue._id} images={issue.images} refreshCard={refreshCard}></ProblemCard>
                        
                    </div>
                })}
            
            </div>}
            </div>
            <div className="col-md-3" style = {{position:"sticky",top:"0",alignSelf:"right"}}>
           <RightCard updateFilterParams={(params)=>updateFilterParams(params)} updateFilter={()=>updateFilter()} updateIssues={(problems)=>updateIssues(problems)} loaderHome={() => setLoadingHome()}/>
            
            </div>
            </div> 
            
            <div>
            </div>

            </Navbar>
            
        </div>
        )
};
export default Homepage;