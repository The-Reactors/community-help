import React, { useEffect, useRef, useState } from 'react'

import {Modal} from "react-bootstrap"
import swal from 'sweetalert';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input"
import FormHelperText from "@material-ui/core/FormHelperText"

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = 'pk.eyJ1IjoiYXN1ciIsImEiOiJja3Q2ZXhkYW4waHJwMm5xbHVrZnE2YjZ2In0.pQ-92peoEdKmKFJAi6DoSg';

const useStyles = makeStyles({
  root: {
    display:"inline-block"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  heading: {
    fontWeight: "bolder"
  },
  formEntry: {
    marginRight: "2rem"
  },
  helper: {
    fontSize: 10,
    color: "grey"
  }
});

const TicketCreationPage = () => {
    const [userEnteredData, setuserEnteredData] = useState({
        title : "",
        description : "",
        priority: "emergency",
        status : "pending",
        category : "land issue",
        location:"",
        kind : "issue",
    })
    const [imageState, setimageState] = useState()
    const [latitude, setLatitude] = useState(30.3420432)
    const [longitude, setLongitude] = useState(76.2895914)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
  

    let map = useRef(null);
    let mapContainer = useRef(null);

    const handleInput = (event) =>
    {
        const name = event.target.name;
        const value = event.target.value;

        setuserEnteredData({...userEnteredData, [name]:value })

    }
    const selectCategoryHandler = (e) => {
      setuserEnteredData((prev) => {
        return {
          ...prev,
          category : e.target.value,
        };
      });
    };
    const selectPriorityHandler = (e) => {
      setuserEnteredData((prev) => {
        return {
          ...prev,
          priority : e.target.value,
        };
      });
    };


    const getLocation =  () =>{
      fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${userEnteredData.location}&apiKey=Bt-4s3hG9VlkF87RkELvh2Z1FVO3ih1i8GQ-keKlie8`, {credentials: "include"})
      .then((response) => {
        response.json().then((locationData) =>{
          console.log("lat", locationData.items[0].position.lat)


          setLongitude(locationData.items[0].position.lng)
          setLatitude(locationData.items[0].position.lat)

          setIsModalOpen(true)
          map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [locationData.items[0].position.lng,locationData.items[0].position.lat],
            zoom: 15
            });

            if(userEnteredData.title === ""||
            userEnteredData.description === ""||
            userEnteredData.location === "" ){

              swal({
                title: "Error!",
                text: "Please fill the required fields",
                icon: "error",
              });
              setIsModalOpen(false)
              return new Error()
            }
        })
      })
      
    }
      
    const fileHandler = (event) =>
    {
      console.log(event.target.files)
      const file = event.target.files;
      setimageState(file)
    }

    const fileSubmitHandler = (e) =>
    {
      e.preventDefault();

      getLocation()
      
    }
    const ticketConfirmHandler = (e) =>
    {


      let data = new FormData()
      console.log("here",data)
        data.append('title',userEnteredData.title)
        data.append('description',userEnteredData.description)
        data.append('priority',userEnteredData.priority)
        data.append('status',userEnteredData.status)
        data.append('location',userEnteredData.location)
        data.append('latitude',latitude)
        data.append('longitude',longitude)
        data.append('category',userEnteredData.category)
        data.append('kind',userEnteredData.kind)
        if(imageState !== undefined)
        {
            for(var x = 0; x<imageState.length; x++) {
              data.append('problemImage', imageState[x])
            }
        }
        console.log("sdfsfsf",data.title)
        console.log(imageState) 
        console.log(userEnteredData.category)
        



      const requestOptions = {
        method: 'POST',
        body:data,  
        credentials: "include"
        };
        fetch(`http://localhost:5000/problems`, requestOptions )
        .then(async response => {

         
            if(response.ok){
                console.log("Response Is Succesfully Done! ")
                swal({
                  title: "Success!",
                  text: "Ticket Raised Successfully",
                  icon: "success",
                })
                setIsModalOpen(false)
                  
                
             }
             else if(response.status === 401){
              swal({
                title: "Unauthorised!",
                text: "Please Login",
                icon: "error",
              });
              setIsModalOpen(false)
             }
            else{
                throw response.json();
            }
          })
          .catch(async (error) => {
            const errorMessage = await error;
            console.log(errorMessage)
            if( errorMessage.error !== undefined)
            {
              if(!(typeof errorMessage.error.code === 'string') && !(errorMessage.error.code instanceof String))  
              {
                swal({
                  title: "Error!",
                  text: "Unknown Error Has Occured !",
                  icon: "error",
                });
                setIsModalOpen(false)
              }
              else
              {
                if((errorMessage.error.code.localeCompare("LIMIT_FILE_SIZE") === 0) ||(errorMessage.error.code.localeCompare("LIMIT_UNEXPECTED_FILE") === 0) )
                {
                  swal({
                    title: "Error!",
                    text: "Maximumm Number Of 3 Images Can Be Uploaded",
                    icon: "error",
                  });
                  setIsModalOpen(false)
                }
              }
            }
           
          }) 




      
    }
    // const url="https://maps.google.com/maps?q=30.15787,84.20479&hl=es;z=14&amp;output=embed"
    return (
        <div>
           <div id="content" className="p-4 p-md-5 pt-5">
          {/* <iframe width="800" height="570" src = "https://maps.google.com/maps?q=30.15787,84.20479&hl=es;z=14&amp;output=embed" ></iframe> */}
          <Modal show = {isModalOpen}
          animation={false}
      
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered>

<Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
        <h2>Confirm Ticket</h2>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{textAlign:"center"}}>
          <br/>
          <div className= "col-md-6" style={{overflow:"hidden"}}>
              <div ref={mapContainer} style={{height:"400px",width:"400px"}} />
            </div>
            <div className= "col-md-6" >
            <p style= {{textAlign:"left", marginLeft:"30px",fontSize:"20px"}}>
            <b>Title</b> : {userEnteredData.title} <br/>
            <b>Decription</b> : {userEnteredData.description}<br/>
            <b>Location</b> : {userEnteredData.location}<br/>
            <b>Status</b> : {userEnteredData.status}<br/>
            <b>Priority</b> : {userEnteredData.priority}<br/>
            <b>Category</b> : {userEnteredData.category}<br/>
            </p>
            </div>
        <br/>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick = {ticketConfirmHandler}>Accept</Button>
        <Button onClick = {() =>{setIsModalOpen(false)}}>Reject</Button>
      </Modal.Footer>
            
          
            {/* <button onClick = {ticketConfirmHandler}>Confirm</button>
            <button onClick = {() =>{setIsModalOpen(false)}}>Reject</button> */}
            </Modal>
            

            {/* raise a ticket card */}

            <div className = "col-md-10">
            <Card className={classes.root}>
      <CardContent>
        <Typography className = {classes.heading} color="textDark" gutterBottom variant="h4">
        <u> Raise a Ticket</u>
        </Typography>
        <br />
        <hr/>
        <Typography htmlFor="personal information" component="h2" >
          Personal Information
        </Typography>
        <Typography align = "center">
        <FormControl>
        <InputLabel  htmlFor="name">Name</InputLabel>
        <Input className = {classes.formEntry} id="component-simple"/>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="phone number">Phone Number</InputLabel>
        <Input
          id="component-helper"
          aria-describedby="component-helper-text"
          type = "number"

        />
        <FormHelperText id="component-helper-text">Enter the number of the Point of Contact</FormHelperText>
      </FormControl>
      </Typography>
      <br/>
      <hr/>
        <Typography htmlFor="proximity" component="h2" >
          Ticket Information
        </Typography>
        <Typography align = "center">
        <FormControl>
        <InputLabel  htmlFor="component-simple">Title</InputLabel>
        <Input 
        className = {classes.formEntry} 
        id="component-simple"  
        type = "text"
        name = "title"
        value = {userEnteredData.title}
        onChange = {handleInput}/>
        <br/>
        </FormControl>
        <FormControl>
        <InputLabel  htmlFor="component-simple">Description</InputLabel>
        <Input 
        className = {classes.formEntry} 
        id="component-simple"
        type="text" 
        autoComplete = "off"
        value = {userEnteredData.description}
        onChange = {handleInput}
        name = "description"/>
      </FormControl>
      </Typography>
      <br/>
      <Typography align = "center">
      <FormControl>
        <InputLabel  htmlFor="component-simple">Location</InputLabel>
        <Input 
        className = {classes.formEntry} 
        id="component-simple"
        type="text" 
        autoComplete = "off"
        onChange = {handleInput}
        value = {userEnteredData.location}
        name = "location"/>
      </FormControl>
      </Typography>
      <br/>
        <Typography align = "center">
        {/* <Typography htmlFor="category" component="h2" align="center">
          Select the Category
        </Typography> */}
        <br />
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel htmlFor="category">Select Category</InputLabel>
          <Select
            native
            onChange={(e) => selectCategoryHandler(e)}
            align="center"
          >
            <option aria-label="None" value="" />
            <option value="land issue" name="category">
              Land Issue
            </option>
            <option value="water issue" name="category">
              Water Issue
            </option>
            <option value="public health" name="category">
              Public Health
            </option>
            <option value="sanitation" name="category">
              Sanitation
            </option>
            <option value="pollution" name="category">
              Pollution
            </option>
            <option value="healthcare issue" name="category">
              Healthcare Issue
            </option>
            <option value="electricity" name="category">
              Electricity
            </option>
            <option value="road blockage" name="category">
              Road Blockage
            </option>
            <option value="waste management" name="category">
              Waste Management
            </option>
          </Select>
          <br />
        </FormControl>
        </Typography>
        <br />
        <Typography align = "center">
        {/* <Typography htmlFor="priority" component="h2" align="center">
          Select Priority
        </Typography> */}
    
        <FormControl variant="filled" className={classes.formControl}>
          <InputLabel htmlFor="priority">Priority</InputLabel>
          <Select
            native
            onChange={(e) => selectPriorityHandler(e)}
            align="center"
          >
            <option aria-label="None" value="" />
            <option value="emergency" name="priority">
              Emergency
            </option>
            <option value="urgent" name="priority">
              Urgent
            </option>
            <option value="not urgent" name="priority">
              Not Urgent
            </option>
          </Select>
          <br />
        </FormControl>
        </Typography>
        <br/>
        <Typography align = "center">
          <formControl>
            <form encType = "multipart/form-data">
            <Input type="file" id="uploads" name="uploads" accept=".jpg, .jpeg, .png, .svg, .gif" multiple onChange = {fileHandler} />
            </form>
          <Typography className = {classes.helper}>upload upto 3 images</Typography>
          </formControl>
        </Typography>
        <hr/> 
      </CardContent>
      <CardActions>
        <Typography align = "center">
          <Button
            color="primary"
            size="large"
            type="submit"
            variant="contained"
            onClick={fileSubmitHandler}
          >
            Raise the ticket
          </Button>
        </Typography>
      </CardActions>
    </Card>
    </div>
           </div>
        </div>
    )
}

export default TicketCreationPage