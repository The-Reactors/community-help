import React, { useState } from 'react'

const TicketCreationPage = () => {
    const [userEnteredData, setuserEnteredData] = useState({
        title : "",
        description : "",
        priority: "",
        status : "",
        category : "",
        kind : "",
        image : ""
    })
    const [imageState, setimageState] = useState()
    const handleInput = (event) =>
    {
        const name = event.target.name;
        const value = event.target.value;

        setuserEnteredData({...userEnteredData, [name]:value })

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
      const data = new FormData()
      for(var x = 0; x<imageState.length; x++) {
        data.append('file', imageState[x])
        console.log("h")
        
   }
      console.log(data)
      console.log(imageState) 
      
    }


    return (
        <div>
           <form action="" encType = "multipart/form-data">
               <label htmlFor="title">Title</label>
               <input
                   type = "text"
                   name = "title"
                   value = {userEnteredData.title}
                   onChange = {handleInput}
               />
               <label htmlFor="description">Description</label>
                <input 
                type="text" 
                autoComplete = "off"
                value = {userEnteredData.description}
                onChange = {handleInput}
                name = "description"
                />
                <label htmlFor="priority">Select your Ticket Priority
               <select onChange = {handleInput}>
                <option value="emergency" name = " emergency">emergency</option>
                <option value="urgent" name = " urgent ">urgent</option>
                <option value="not urgent" name = " not urgent ">not urgent</option>
                <option value="baad mein karwalenge" name = " baad mein karwalenge">baad mein karwalenge</option>
                </select>
                </label>
                <label htmlFor="category">Select your category:
               <select onChange = {handleInput}>
               <option value = " land issue " name = " land issue ">land issue</option>
                <option value = " water issue " name = " water issue">water issue</option>
                <option value = " public health " name = " public health ">public health</option>
                <option value = " sanitation " name = " sanitation ">sanitation</option>
                <option value = " pollution " name = " pollution ">Pollution</option>
                <option value = " healthcare issue " name = " healthcare issue ">healthcare issue</option>
                <option value = " electricity " name = " electricity ">Electricity</option>
                <option value = " road blockage " name = " road blockage ">Road Blockage</option>
                <option value = " waste management " name = " waste management ">waste management</option>
                </select>
                </label>
                <p>
                <label htmlFor="uploads">
                Choose the images you want to upload:
                </label>
                <input type="file" id="uploads" name="uploads" accept=".jpg, .jpeg, .png, .svg, .gif" multiple onChange = {fileHandler} />
                <button onClick = {fileSubmitHandler}>Upload</button>
                </p>
                
           </form> 
        </div>
    )
}

export default TicketCreationPage