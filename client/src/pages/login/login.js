import React, { useState } from 'react'
import swal from "sweetalert"
import "../../assets/css/bootstrap.min.css"
import "../../assets/css/login.css"
import google from "../../assets/images/Google.png"
import nayakShort from "../../assets/images/shortLogo.png"
import nayakLong from "../../assets/images/longLogo.png"
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
        <div className="background">
  
           <div id="content" className="p-4 p-md-5 pt-5 align-login" >
           <div class="login-wrapper shadow" >
    <div class="login-container">
      <div class="col-left">
        <div class="login-text">
          <span><img style={{maxWidth:"200px",maxHeight:"200px"}}src={nayakLong}/></span>
          <p>
           Take a step forward and be an active citizen. 
           Report anything by simply raising tickets and get your voice heard.<br/> <br/> <br/> <br/>  Sign In To Your  <span> <img style={{maxWidth:"20px",maxHeight:"20px"}} src={nayakShort}/></span>   Account To Start Raising Tickets.
          </p>
        </div>
      </div>
      <div class="col-right">
        <div class="login-form">
          <h2 style = {{textAlign: "center",lineHeight:"4rem"}}>Login To Your Account</h2>
          <form>
            <p>
              <label htmlFor="phone">Email Address</label>
              <input 
              type = "email"
              
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
              <a onClick={submitHandler}>
              <input class="btn1" type="submit" value="Sign In" />
              </a>
            </p>
            <p>
              <a href="">Forget password?</a>
              <a href="/register">Create an account.</a>
            </p>
          </form>
          <div style={{textAlign:"center",lineHeight:"3rem",fontSize:"15px",fontWeight:"bold"}}><hr/> OR </div>
          <div style = {{textAlign:"center"}}>
           <a href="http://localhost:5000/login/google">
           <button type = "submit" class = "btn1 btn1-googleSignIn">
             <span> Sign In With <img style= {{maxHeight:"20px",maxHeight:"20px"}}src={google}/></span>
            </button>
           </a>
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
