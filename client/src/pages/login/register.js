import React, {useState} from 'react'

const Register = () => {

    const [userEnteredData, setuserEnteredData] = useState({
        username: " ",
        email: " ",
        phone: " ",
        password: " "
    })

    const handleInput = (event) =>
    {
        const name = event.target.name;
        const value = event.target.value;

        setuserEnteredData({...userEnteredData, [name]:value })

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
                <button type = "submit">Register</button>
            </form>
            </div>
    )
}

export default Register
