import React, { useState } from 'react'
import swal from 'sweetalert';

const MyAccount = () =>{
    

    const [imageState, setimageState] = useState()
    const [updatedName, setUpdatedName] = useState()
    const [updatedPhoneNo, setUpdatedPhoneNo] = useState()

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

            fetch(`http://localhost:5000/updateUserName`, requestOptions )
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

            fetch(`http://localhost:5000/updateUserPhoneNo`, requestOptions )
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
        //console.log("haha",imageState[0])


    const requestOptions = {
        method: 'POST',
        body:data,  
        credentials: "include"
        };
        fetch(`http://localhost:5000/updateProfilePic`, requestOptions )
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
        <form action="" encType = "multipart/form-data">
              
        <label htmlFor="name">Name</label>
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
                <button onClick = {fileUpdatePhoneNoHandler}>Update</button>
              <p>
                <label htmlFor="uploads">
                Choose the images you want to upload:
                </label>
                <input type="file" id="uploads" name="uploads" accept=".jpg, .jpeg, .png, .svg, .gif" onChange = {fileHandler} />
                <button onClick = {fileSubmitHandler}>Upload</button>
                </p>
                
           </form> 

    </div>
}

export default MyAccount;