import React, {useState} from 'react'
import swal from "sweetalert"
import "../../assets/css/login.css"


const Register = () => {

    const [userEnteredData, setuserEnteredData] = useState({
        username: "",
        email: "",
        phone: "",
        password: ""
    })
    const [responseBody, setResponseBody] = useState()

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
                'password':userEnteredData.password,
                'name':userEnteredData.username,
                'phoneNo':userEnteredData.phone
            }),  
            credentials: "include"
            };
            fetch(`http://localhost:5000/users`, requestOptions )
            .then(async response => {
                response.json().then(data =>  {
                    console.log(data);
                    //setResponseBody(data)
                    if(response.ok){
                        console.log("User created successfully")
                        
                        swal({
                          title: "Success!",
                          text: "User Created Successfully",
                          icon: "success",
                        });
                     }
                    else{
                      swal({
                        title: "Failed!",
                        text: data._message === undefined ? "Already registered Email Address":data._message,
                        icon: "error",
                      });
                        //throw response.json();
                    }
                  });
                
              })
              .catch(async (error) => {
                const errorMessage = await error;
                console.log(errorMessage)
                
              })
    }

    return (
        <div>
    <div id="content" className="p-4 p-md-5 pt-5 align-login">
    <div class="login-wrapper">
<div class="login-container">
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
   <h2 style = {{textAlign: "center"}}>Registration Portal</h2>
   <form>
     <p>
       <label htmlFor="username">Full name</label>
       <input 
       type="text" 
       autoComplete = "off"
       value = {userEnteredData.username}
       onChange = {handleInput}
       name = "username"
       required/>
     </p>
     <p>
       <label htmlFor="email">E-mail</label>
       <input 
       type="email" 
       autoComplete = "off"
       value = {userEnteredData.email}
       onChange = {handleInput}
       name = "email"
       required />
     </p>
     <p>
      <label htmlFor="phone">Phone Number</label>
      <input 
      maxLength="10"
      type="number" 
      autoComplete = "off"
      value = {userEnteredData.phone}
      onChange = {handleInput}
      name = "phone"
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
       <input class="btn" type="submit" value="Sign Up" />
       </a>
     </p>
     <p>
       <a href=""></a>
       <a href=""></a>
     </p>
   </form>
   <div style={{textAlign:"center",lineHeight:"3rem",fontSize:"15px",fontWeight:"bold"}}>OR</div>
   <div style = {{textAlign:"center"}}>
    <a href = "/login">
      <button className = "btn btn-googleSignIn" >Login</button>
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

export default Register
