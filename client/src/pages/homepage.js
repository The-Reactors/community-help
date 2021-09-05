import React, { useEffect, useState } from "react";
import "../assets/css/style.css"
import Navbar from "../components/navbar";

const Homepage = () => {

    const [refresh, setRefresh] = useState(false)
    const [issues, setIssues] = useState()

    let issuesList = []

    useEffect(() =>{

        fetch("http://localhost:5000/problems", {credentials: "include"})
        .then((response) => {
            response.json().then((problems) => {
                setIssues(problems)
                for(let i = 0; i < problems.length; i++){

                    issuesList.push(problems[i].title)
                }

                console.log(issuesList)
                
                
            })
        })

    }, [refresh])

    
    

    // const test = () =>{
    //     console.log("here",problems)
        
    //     // setProblemsList(problemList)
    //     // console.log("there",problemsList)
    // }

    return (
        <div>
            <Navbar>
              
                
            <div id="content" className="p-4 p-md-5 pt-5">
                <h2 className="mb-4">Sidebar #05</h2>
                <p>Lorem ipsums dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </div> 
            <div>
            
            
            </div>

            </Navbar>
        </div>
        )
};
export default Homepage;