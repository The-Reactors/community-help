import React, { useState } from 'react'
import URL from '../URL'

const TicketCreationPage = () => {
    const [userEnteredData, setuserEnteredData] = useState({
        title : "",
        description : "",
        priority: "emergency",
        status : "pending",
        category : "land issue",
        kind : "issue",
        image : ""
    })
    const [imageState, setimageState] = useState()
    const handleInput = (event) =>
    {
        const name = event.target.name;
        const value = event.target.value;

        setuserEnteredData({...userEnteredData, [name]:value })

    }
    const selectCategoryHandler = (e) => {
      setuserEnteredData((prev) => {
        return {
          ...prev,
          category : e.target.value,
        };
      });
    };
    const selectPriorityHandler = (e) => {
      setuserEnteredData((prev) => {
        return {
          ...prev,
          priority : e.target.value,
        };
      });
    };

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
        
      }
      console.log(data)
      console.log(imageState) 
      console.log(userEnteredData.category)
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
                    'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTJmZTEzNmJkMDM3NWEwNGNiMjg4OTgiLCJpYXQiOjE2MzA1Mjc3OTl9.G0d5jAINbQbCwUenBk0ZWlJIZla-X6Hwr6enAfZ_FhM'
                 },
        body: JSON.stringify({ 
          'title':userEnteredData.title,
          'description':userEnteredData.description,
          'priority':userEnteredData.priority,
          'status':userEnteredData.status,
          'category':userEnteredData.category,
          'kind':userEnteredData.kind
         }),
        credentials: "include"
        };
        fetch(`http://localhost:5000/problems`, requestOptions )
        .then(async response => {
            if(response.ok){
                console.log("Response Is Succesfully Done! ")
             }
            else{
                throw response.json();
            }
          })
          .catch(async (error) => {
              const errorMessage = await error;
              console.log(errorMessage);
          })
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
               <select onChange={(e) => selectPriorityHandler(e)}>
                <option value="emergency" name = "priority">emergency</option>
                <option value="urgent" name = "priority">urgent</option>
                <option value="not urgent" name = "priority">not urgent</option>
                <option value="baad mein karwalenge" name = "priority">baad mein karwalenge</option>
                </select>
                </label>
                <label htmlFor="category">Select your category:
               <select onChange={(e) => selectCategoryHandler(e)}>
                <option value = " land issue " name = "category">land issue</option>
                <option value = " water issue " name = "category">water issue</option>
                <option value = " public health " name = "category">public health</option>
                <option value = " sanitation " name = "category">sanitation</option>
                <option value = " pollution " name = "category">Pollution</option>
                <option value = " healthcare issue " name = "category">healthcare issue</option>
                <option value = " electricity " name = "category">Electricity</option>
                <option value = " road blockage " name = "category">Road Blockage</option>
                <option value = " waste management " name = "category">waste management</option>
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