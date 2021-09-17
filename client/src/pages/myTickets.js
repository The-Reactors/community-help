import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import "../assets/css/style.css"
import ProblemCard from "../components/card";
import LoaderGeneral from "../components/loaderGeneral";
import ProfileNav from '../components/profileNav';

const MyTickets = () => {

    const [issues, setIssues] = useState([])
    const [isLoading,setIsloading] = useState(true)
    const getName = (name) => {
        const Names=name
      }
    let AOS;
    useEffect(() => {
        const AOS = require("aos");
        AOS.init({
          once: true,
        });
      }, []);
    
      useEffect(() => {
        if (AOS) {
          AOS.refresh();
        }
      });

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
                setIsloading(false)
                
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
             {!isLoading && <ProfileNav getName={(name)=>getName(name)}/>}
            {isLoading && <LoaderGeneral/>}
            {!isLoading && <div>
                <h1 data-aos="fade-up" data-aos-delay="300" style={{textAlign:"center"}}>My Tickets</h1>
                {
                    
                issues.map((issue, index) => {
                    return <div className="col-md-12" key={index}>
                        <ProblemCard  title={issue.title} description={issue.description} 
                        priority={issue.priority} status={issue.status} category={issue.category} location={issue.location} problemId={issue._id} images={issue.images} showStatusButton = {true}></ProblemCard>
                    </div>
                })}
            </div> }

            </div>
        </div>
        )
};
export default MyTickets;