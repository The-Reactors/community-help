import React, { useState } from 'react'

const Login = () => {
    const [userEnteredData, setuserEnteredData] = useState({
        phone: "",
        password: ""
    })
    const handleInput = (event) =>
    {
        const name = event.target.name;
        const value = event.target.value;

        setuserEnteredData({...userEnteredData, [name]:value })

    }
    return (
        <div>
           <form action="">
               <label htmlFor="phone">Phone</label>
               <input
                   type = "number"
                   name = "phone"
                   value = {userEnteredData.phone}
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
           </form> 
        </div>
    )
}

export default Login
