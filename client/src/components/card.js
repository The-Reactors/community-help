import React, { useEffect, useState } from "react"
import {Card, CardColumns} from "react-bootstrap"
import swal from 'sweetalert';
import Carousel from "./carousel";
import ConfirmModal from './confirmModal'

const ProblemCard = (props) => {
  const[upVotes,setUpVotes] = useState()
  const[downVotes,setDownVotes] = useState()
  const[image,setImage]=useState([])
  const[status,setStatus] = useState(props.status)
  const[showModal,setShowModal] = useState(false)
  const [upStatus,setUpStatus]= useState(false)
  const [downStatus,setDownStatus]= useState(false)


  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);


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

  const statusOfUpAndDownVotes = () =>{
    fetch(`http://localhost:5000/statusOfUpAndDownVotes/${props.problemId}`,{
      method:"GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache': 'no-cache'
      },
      credentials: 'include'
    })
    .then(async response => {
        if(response.ok){
            
            response.json().then(data => {
              console.log("Status",data)
              setUpStatus(data[0])
              setDownStatus(data[1])
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

  const getStatus = () =>{
    fetch(`http://localhost:5000/getStatus/${props.problemId}`,{
      method:"GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        
      },
      credentials: 'include'
    })
    .then(async response => {
        
      //console.log(response.json())
            response.json().then(data => {
              console.log("jajaja")
              setStatus(data.status)
            });
         
        
      })
      .catch(async (error) => {
        const errorMessage = await error;
        console.log(errorMessage)
      })
  }


useEffect(() => {
  console.log("inside card")
  noOfUpAndDownVotesUpdate()
  statusOfUpAndDownVotes()
  getStatus()
  
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
  
  
},[props.refreshCard])

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
                  statusOfUpAndDownVotes()
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
                  statusOfUpAndDownVotes()
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

    console.log("updating status")
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
                  
                  console.log("yepppy")
                  setStatus("Solved")
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
              handleClose()
  }

  const statusButton = (props.showStatusButton == true && status == "pending") ? <a onClick={handleShow}><span className="fa fa-check mr-3"></span>Mark as Solved</a> : null



    return <div>

      <ConfirmModal showModal={showModal} closeModal={()=>handleClose()} proceedingFxn={()=>updateStatus()}></ConfirmModal>
    
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
         {upStatus?<a style={{margin:"20px", cursor:"pointer",color:"blue"}} onClick={upvoteProblem}><span className="fa fa-thumbs-up mr-3"></span> {upVotes}</a>:<a style={{margin:"20px", cursor:"pointer"}} onClick={upvoteProblem}><span className="fa fa-thumbs-up mr-3"></span> {upVotes}</a>}
        {downStatus?<a style={{cursor:"pointer", marginRight : "10px",color:"blue"}} onClick={downvoteProblem}><span className="fa fa-thumbs-down mr-3"></span> {downVotes}</a>:<a style={{cursor:"pointer", marginRight : "10px"}}onClick={downvoteProblem}><span className="fa fa-thumbs-down mr-3"></span> {downVotes}</a>}
        {statusButton}
      </Card.Body>
    </Card>
    </div>
}

export default ProblemCard