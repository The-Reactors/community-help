import React, { useEffect, useState } from "react"
import {Card, CardColumns} from "react-bootstrap"
import swal from 'sweetalert';
import Carousel from "./carousel";
import RightCard from "./rightCard";


const ProblemCard = (props) => {
  const[upVotes,setUpVotes] = useState()
  const[downVotes,setDownVotes] = useState()
  const[image,setImage]=useState([])
  const[status,setStatus] = useState()


 
  const getProblemStatus = () =>{
    
    fetch(`http://localhost:5000/problemStatus/${props.problemId}`)
    .then(async response => {
        if(response.ok){
          
            return response.json().then(data => {
             console.log("sdfsfsf",data)
              setStatus(data)
            });
         }
        else{
            throw response.json();
        }
      })
      .catch(async (error) => {
        const errorMessage = await error;
        console.log(errorMessage)
      })
  }




  const noOfUpAndDownVotesUpdate = () =>{
    fetch(`http://localhost:5000/noOfUpAndDownVotes/${props.problemId}`)
    .then(async response => {
        if(response.ok){
            
            response.json().then(data => {
              setUpVotes(data[0])
              setDownVotes(data[1])
            });
         }
        else{
            throw response.json();
        }
      })
      .catch(async (error) => {
        const errorMessage = await error;
        console.log(errorMessage)
      })
  }




useEffect(() => {
  
  noOfUpAndDownVotesUpdate()
  
  if(props.showStatusButton == true){
    getProblemStatus()
  }
  
  console.log("Images",props.images) 
  let imagesInitial = props.images
  //imagesInitial.map(image => {new Buffer(image).toString("base64")})

  

  let imagesFinal = []

  if(props.images !== undefined){

    for(let i = 0; i < props.images.length; i++){
      imagesFinal[i] = new Buffer(imagesInitial[i]).toString("base64")
    }
  
    setImage(imagesFinal)
  }
  
  
},[])

const upvoteProblem = () => {

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify({
        'problemId':props.problemId,
    }),  
    credentials: "include"
    };
    fetch(`http://localhost:5000/upvotesUpdate`, requestOptions )
            .then(async response => {
                if(response.ok){
                  noOfUpAndDownVotesUpdate()
                    response.json().then(data => {
              
                    });
                    swal({
                      title: "Success!",
                      text: "Upvoted Successfully",
                      icon: "success",
                    });
                 }
                else{
                  swal({
                    title: "Unauthorized !",
                    text: "Please Login To Continue",
                    icon: "error",
                  });
                    throw response.json();
                }
              })
              .catch(async (error) => {
                const errorMessage = await error;
                console.log(errorMessage)
              })

}

const downvoteProblem = () => {

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify({
        'problemId':props.problemId,
    }),  
    credentials: "include"
    };
    fetch(`http://localhost:5000/downvotesUpdate`, requestOptions )
            .then(async response => {
                if(response.ok){
                  noOfUpAndDownVotesUpdate()
                    response.json().then(data => {

                      // console.log(data)
                      
                    });
                    swal({
                      title: "Success!",
                      text: "Downvoted Successfully",
                      icon: "success",
                    });
                 }
                else{
                  swal({
                    title: "Failed!",
                    text: "Login Credentials Could Not Be Verified",
                    icon: "error",
                  });
                    throw response.json();
                }
              })
              .catch(async (error) => {
                const errorMessage = await error;
                console.log(errorMessage)
              })

}



  const updateStatus = () => {
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body:JSON.stringify({
          'problemId':props.problemId,
      }),  
      credentials: "include"
      };
      fetch(`http://localhost:5000/updateStatus`, requestOptions )
            .then(async response => {
                if(response.ok){
                  getProblemStatus()
                    response.json().then(data => {

                      // console.log(data)
                      
                    });
                    swal({
                      title: "Success!",
                      text: "Updated Successfully",
                      icon: "success",
                    });
                 }
                else{
                  swal({
                    title: "Failed!",
                    text: "Login Credentials Could Not Be Verified",
                    icon: "error",
                  });
                    throw response.json();
                }
              })
              .catch(async (error) => {
                const errorMessage = await error;
                console.log(errorMessage)
              })
  }

  const statusButton = (props.showStatusButton == true && status == "pending") ? <a onClick={updateStatus}><span className="fa fa-check mr-3"></span>Mark as Solved</a> : null



    return <div>
      
            <Card className="card-spacing">   
            <Carousel carouselId={props.problemId} images={image}/>
      <Card.Body>
        <Card.Title style={{textAlign:"center"}}>{props.title}</Card.Title>
        <Card.Text>
          {props.description}
        </Card.Text>
        <Card.Text>
          {props.category}
        </Card.Text>
        <Card.Text>
          {props.priority}
        </Card.Text>
        <Card.Text>
          {status}
        </Card.Text>
        <Card.Text>
          {props.location}
        </Card.Text>
        <a style={{margin:"20px", cursor:"pointer"}} onClick={upvoteProblem}><span className="fa fa-thumbs-up mr-3"></span> {upVotes}</a>
        <a style={{cursor:"pointer", marginRight : "10px"}}onClick={downvoteProblem}><span className="fa fa-thumbs-down mr-3"></span> {downVotes}</a>
        {statusButton}
      </Card.Body>
    </Card>
    </div>
}

export default ProblemCard