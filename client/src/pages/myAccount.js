import React, { useState } from 'react'
import swal from 'sweetalert';
import { useEffect } from 'react';
import URL from '../URL';
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { Card, CardContent, Typography,CardMedia, Input } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const MyAccount = () =>{
    


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

    const [imageState, setimageState] = useState()
    const [updatedName, setUpdatedName] = useState()
    const [updatedPhoneNo, setUpdatedPhoneNo] = useState()
    const [disabledName,setDisabledName] = useState(true)
    const [disabledNumber, setDisabledNumber] = useState(true)
    const [disabledImage,setdisabledImage] = useState(false)

    const handleEditName = () => {
        setDisabledName(false)
       
    }
    const handleEditNumber  = ( ) => {
        setDisabledNumber(false)
        
    }
    const handleEditImage = () => {
      setdisabledImage(true)
    }

    const handleInputName = (event) =>
    {
       
        const value = event.target.value;

        setUpdatedName(value)

    }
    const handleInputPhoneNo = (event) =>
    {
       
        const value = event.target.value;

        setUpdatedPhoneNo(value)

    }

    const fileUpdateNameHandler = (event) =>{
        event.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({
                'name':updatedName
            }),  
            credentials: "include"
            };

            fetch(`${URL}/updateUserName`, requestOptions )
            .then(async response => {
                if(response.ok){
                    console.log("Response Is Succesfully Done! ")
                    response.json().then(data => {
                        console.log(data);
                      });
                    swal({
                      title: "Success!",
                      text: "Logged in Successfully",
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
    const fileUpdatePhoneNoHandler = (event) =>{
        event.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({
                'phoneNo':updatedPhoneNo
            }),  
            credentials: "include"
            };

            fetch(`${URL}/updateUserPhoneNo`, requestOptions )
            .then(async response => {
                if(response.ok){
                    console.log("Response Is Succesfully Done! ")
                    response.json().then(data => {
                        console.log(data);
                      });
                    swal({
                      title: "Success!",
                      text: "Logged in Successfully",
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

    const fileHandler = (event) =>
    {
      console.log(event.target.files)
      const file = event.target.files;
      setimageState(file)

    }


    const fileSubmitHandler = (event) =>{

        event.preventDefault()
        let data = new FormData()

        if(imageState !== undefined)
        {
            
            data.append('profilePic', imageState[0])
           
        }

    const requestOptions = {
        method: 'POST',
        body:data,  
        credentials: "include"
        };
        fetch(`${URL}/updateProfilePic`, requestOptions )
        .then(async response => {

         
            if(response.ok){
                console.log("Response Is Succesfully Done! ")
                swal({
                  title: "Success!",
                  text: "Ticket Raised Successfully",
                  icon: "success",
                })
               
                  
                
             }
             else if(response.status === 401){
              swal({
                title: "Unauthorised!",
                text: "Please Login",
                icon: "error",
              });
              
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
                 
                }
              }
            }
           
          }) 

    }
    return <div>
      <div id="content" className="p-4 p-md-5 pt-5">
        <form data-aos="fade-up" data-aos-delay="300"  action="" encType = "multipart/form-data">
              
        {/* <label htmlFor="name">Name</label>
                <input 
                type="text" 
                autoComplete = "off"
                value = {updatedName}
                onChange = {handleInputName}
                name = "description"
                />
                <button onClick = {fileUpdateNameHandler}>Update</button>
        <label htmlFor="phoneNo">Phone Number</label>
                <input 
                type="text" 
                autoComplete = "off"
                value = {updatedPhoneNo}
                onChange = {handleInputPhoneNo}
                name = "description"
                />
                <button onClick = {fileUpdatePhoneNoHandler}>Update</button> */}
              {/* <p>
                <label htmlFor="uploads">
                Update Your Profile Picture
                </label>
                <input type="file" id="uploads" name="uploads" accept=".jpg, .jpeg, .png, .svg, .gif" onChange = {fileHandler} />
                <button onClick = {fileSubmitHandler}>Upload</button>
                </p> */}
                
           </form> 
         <Card>
         <CardContent>
         <Typography style = {{fontWeight:"bolder"}} color="textDark" gutterBottom variant="h2">
        My Account
        </Typography>
         
        <TextField
          disabled = {disabledName}
          id="outlined-disabled"
          label="Name"
          defaultValue={updatedName}
          autoComplete = "off"
          value = {updatedName}
          onChange = {handleInputName}
          name = "description"
          helperText = "click on the edit icon to update your name"
        />
        <IconButton onClick = {handleEditName}>
          <EditIcon />
        </IconButton>
        <TextField
          disabled = {disabledNumber}
          id="outlined-number"
          label="number"
          defaultValue={updatedPhoneNo}
          type="number"
          autoComplete = "off"
          value = {updatedPhoneNo} 
          onChange = {handleInputPhoneNo}
          name = "description"
          helperText = "click on the edit icon to update your number"
        />
        <IconButton onClick = {handleEditNumber}>
          <EditIcon />
        </IconButton>
        <Typography>
        <Button hidden = {disabledName} variant = "contained" color = 'secondarary' onClick = {fileUpdateNameHandler} style = {{marginRight:'11rem'}}>Change Name</Button>
        <Button hidden = {disabledNumber} variant = "contained" color = 'secondarary' onClick = {fileUpdatePhoneNoHandler}>Change Number</Button>
        </Typography>
        <br />
        <br />
        <hr />
        <CardMedia
            alt="profile picture"
            component="img"
            title="Profile Picture"
            height = '450'
            image=
"https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_960_720.png"
          />
        
                <Typography htmlFor="uploads">
                Update Your Profile Picture by clicking on the edit icon
                </Typography>
                <IconButton onClick = {handleEditImage}>
                <EditIcon />
                </IconButton>
                {disabledImage && <div><Typography align = "center"><Input type="file" id="uploads" name="uploads" accept=".jpg, .jpeg, .png, .svg, .gif" onChange = {fileHandler} />
                <Button variant = "contained" color = "primary" onClick = {fileSubmitHandler}>Upload</Button></Typography></div>}
                
                
                </CardContent>
          </Card>

           </div>
           <div>
           {/* <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" }
      }}
      noValidate
      autoComplete="off"
    > */}
        
    {/* </Box> */}
           </div>
    </div>
}

export default MyAccount;