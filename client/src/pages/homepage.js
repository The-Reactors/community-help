import React, { useEffect, useState } from "react";
import "../assets/css/style.css"
import {Modal,Button} from 'react-bootstrap'
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
    const [profileName, setProfileName] = useState()

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

    const getName = (name) =>{
        setProfileName(name)
    }

    return (
        
        <div>
            
            <Navbar activeElement="home">
            <Modal show={isModalOpen}
            animation={false}
      
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
                <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
        <h2>Location Error</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{textAlign:"center"}}>
          <br/>
         <h3> Please allow the access to your location to see nearby tickets<br/>
                    Please follow the instructions from the
                    <a href="https://support.google.com/chrome/answer/142065?hl=ena" target="_blank"> Link </a>
                    and then refresh the page.</h3>
        <br/>
        </div>
      </Modal.Body>
      <Modal.Footer>
        
        <Button onClick = {() =>{setIsModalOpen(false)}}>Ok</Button>
      </Modal.Footer>
            
                </Modal>

                
                
            <div id="content" className="p-4 p-md-5 pt-5">
            {isLoadingHome && <Loader/>}
           {!isLoadingHome && <ProfileNav getName={(name)=>getName(name)}/> } 
           <div className="col-md-9">
                {!isLoadingHome && <div>
                {
                issues.map((issue, index) => {
                    console.log(issue.status)
                    return <div key={index}>
                        
                        <ProblemCard title={issue.title} description={issue.description} 
                        priority={issue.priority} status={issue.status} category={issue.category} location={issue.location} problemId={issue._id} images={issue.images} refreshCard={refreshCard} creatorId={issue.creatorId} profileName={profileName}></ProblemCard>
                        
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