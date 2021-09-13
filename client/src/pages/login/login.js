import React, { useState } from 'react'
import swal from "sweetalert"
import "../../assets/css/bootstrap.min.css"
import "../../assets/css/login.css"

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
           <div class="wrapper">
    <div class="container">
      <div class="col-left">
        <div class="login-text">
          <h2>Logo</h2>
          <p>
           Take a step forward and be an active citizen. 
           Report anything by simply raising tickets
          </p>
        </div>
      </div>
      <div class="col-right">
        <div class="login-form">
          <h2 style = {{textAlign: "center"}}>Login</h2>
          <form>
            <p>
              <label htmlFor="phone">Email Address</label>
              <input 
              type = "String"
              
              name = "email"
              value = {userEnteredData.email}
              onChange = {handleInput}
              required /> 
            </p>
            <p>
              <label htmlFor="password">Password</label>
              <input 
              type="password"
              autoComplete = "off"
              value = {userEnteredData.password}
              onChange = {handleInput}
              name = "password"
              required />
            </p>
            <p>
              <a href = "http://localhost:5000/login/google">
              <input class="btn" type="submit" value="Sing In" />
              </a>
            </p>
            <p>
              <a href="">Forget password?</a>
              <a href="/register">Create an account.</a>
            </p>
          </form>
          <div style = {{textAlign:"center"}}>
            <button type = "submit" class = "btn btn-googleSignIn">
              google sign in
            </button>
          </div>
        </div>
      </div>
    </div>
    
  </div>
           </div>
           
        </div>
    )
}

export default Login
