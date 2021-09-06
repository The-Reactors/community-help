import React, { useEffect, useState } from "react"
import {Card} from "react-bootstrap"
import swal from 'sweetalert';


const ProblemCard = (props) => {

  const[upVotes,setUpVotes] = useState()
  const[downVotes,setDownVotes] = useState()
  const[image,setImage]=useState()

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
  console.log("Images",props.images[0]) 
  setImage(new Buffer(props.images[0]).toString("base64"))
  console.log(image)
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

    return <div style={{marginBottom:"10px"}}>
        <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={`data:image/png;base64,${image}`} />
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
      {props.status}
    </Card.Text>
    <Card.Text>
      {props.location}
    </Card.Text>
    <a style={{margin:"20px", cursor:"pointer"}} onClick={upvoteProblem}><span className="fa fa-thumbs-up mr-3"></span> {upVotes}</a>
    <a style={{cursor:"pointer"}}onClick={downvoteProblem}><span className="fa fa-thumbs-down mr-3"></span> {downVotes}</a>
  </Card.Body>
</Card>
    </div>
}

export default ProblemCard