import React, { useState } from 'react'
import swal from "sweetalert"
const Login = () => {
    const [userEnteredData, setuserEnteredData] = useState({
        email: "",
        password: ""
    })
    const handleInput = (event) =>
    {
        const name = event.target.name;
        const value = event.target.value;

        setuserEnteredData({...userEnteredData, [name]:value })

    }

    const submitHandler = (event) =>
    {
        event.preventDefault()
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify({
                'email':userEnteredData.email,
                'password':userEnteredData.password
            }),  
            credentials: "include"
            };
            fetch(`http://localhost:5000/localusers/login`, requestOptions )
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

    return (
        <div>
           <div id="content" className="p-4 p-md-5 pt-5">
           <form action="">
               <label htmlFor="phone">Email Address</label>
               <input
                   type = "String"
                   name = "email"
                   value = {userEnteredData.email}
                   onChange = {handleInput}
               />
               <label htmlFor="password">Password</label>
                <input 
                type="password" 
                autoComplete = "off"
                value = {userEnteredData.password}
                onChange = {handleInput}
                name = "password"
                />
                <button onClick={submitHandler}>Submit</button>
           </form> 
           <a href = "http://localhost:5000/login/google">
           <button type = "submit">
             google sign in
           </button>
           </a>
        </div>
        </div>
    )
}

export default Login
