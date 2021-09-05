import React, {useState} from 'react'
import swal from "sweetalert"



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
        <h2>Registration Portal</h2>
        <form action="">
            <div>
                <label htmlFor="username">Full Name</label>
                <input 
                type="text" 
                autoComplete = "off"
                value = {userEnteredData.username}
                onChange = {handleInput}
                name = "username"
                />
            </div>
            <div>
                <label htmlFor="email">E-mail</label>
                <input 
                type="email" 
                autoComplete = "off"
                value = {userEnteredData.email}
                onChange = {handleInput}
                name = "email"
                />
            </div>
            <div>
                <label htmlFor="phone">Phone</label>
                <input 
                type="number" 
                autoComplete = "off"
                value = {userEnteredData.phone}
                onChange = {handleInput}
                name = "phone"
                />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input 
                type="password" 
                autoComplete = "off"
                value = {userEnteredData.password}
                onChange = {handleInput}
                name = "password"
                />
            </div>
                <button type = "submit" onClick={submitHandler}>Register</button>
            </form>
            <p>OR</p>
                <a href = "/login">
                <button >Login</button>
                </a>
            </div>
    )
}

export default Register
