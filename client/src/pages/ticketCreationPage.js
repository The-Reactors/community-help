import React, { useEffect, useRef, useState } from 'react'
import URL from '../URL'
import Modal from 'react-modal'
import swal from 'sweetalert';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = 'pk.eyJ1IjoiYXN1ciIsImEiOiJja3Q2ZXhkYW4waHJwMm5xbHVrZnE2YjZ2In0.pQ-92peoEdKmKFJAi6DoSg';
const TicketCreationPage = () => {
    const [userEnteredData, setuserEnteredData] = useState({
        title : "",
        description : "",
        priority: "emergency",
        status : "pending",
        category : "land issue",
        location:"",
        kind : "issue",
    })
    const [imageState, setimageState] = useState()
    const [latitude, setLatitude] = useState(30.3420432)
    const [longitude, setLongitude] = useState(76.2895914)
    const [isModalOpen, setIsModalOpen] = useState(false)

    let map = useRef(null);
    let mapContainer = useRef(null);

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


    // const createMap = () =>
    // {
    //     map.current = new mapboxgl.Map({
    //     container: mapContainer.current,
    //     style: 'mapbox://styles/mapbox/streets-v11',
    //     center: [77.22955,28.61312],
    //     zoom: 12
    //     });
    // }
    // const firstMapUpdate= useRef(true)

    // useEffect(() => {
    //   if (map.current) return; // initialize map only once
    //   if(firstMapUpdate.current){
    //     firstMapUpdate.current =false 
    //     return
    //   }
     
    //   },[showMap]);


    
    
    const getLocation =  () =>{
      fetch(`https://geocode.search.hereapi.com/v1/geocode?q=${userEnteredData.location}&apiKey=Bt-4s3hG9VlkF87RkELvh2Z1FVO3ih1i8GQ-keKlie8`, {credentials: "include"})
      .then((response) => {
        response.json().then((locationData) =>{
          console.log("lat", locationData.items[0].position.lat)


          setLongitude(locationData.items[0].position.lng)
          setLatitude(locationData.items[0].position.lat)

          setIsModalOpen(true)
          map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [locationData.items[0].position.lng,locationData.items[0].position.lat],
            zoom: 15
            });

            if(userEnteredData.title == ""||
            userEnteredData.description == ""||
            userEnteredData.location == "" ){

              swal({
                title: "Error!",
                text: "Please fill the required fields",
                icon: "error",
              });
              setIsModalOpen(false)
              return new Error()
            }

        // let data = new FormData()
        // data.append('title',userEnteredData.title)
        // data.append('description',userEnteredData.description)
        // data.append('priority',userEnteredData.priority)
        // data.append('status',userEnteredData.status)
        // data.append('location',userEnteredData.location)
        // data.append('latitude',locationData.items[0].position.lat)
        // data.append('longitude',locationData.items[0].position.lng)
        // data.append('category',userEnteredData.category)
        // data.append('kind',userEnteredData.kind)
        // if(imageState !== undefined)
        // {
        //     for(var x = 0; x<imageState.length; x++) {
        //       data.append('problemImage', imageState[x])
        //     }
        // }
        // console.log("sdfsfsf",data.title)
        // console.log(imageState) 
        // console.log(userEnteredData.category)
        


        })
      })
      
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

      getLocation()
      
    }
    const ticketConfirmHandler = (e) =>
    {


      let data = new FormData()
      console.log("here",data)
        data.append('title',userEnteredData.title)
        data.append('description',userEnteredData.description)
        data.append('priority',userEnteredData.priority)
        data.append('status',userEnteredData.status)
        data.append('location',userEnteredData.location)
        data.append('latitude',latitude)
        data.append('longitude',longitude)
        data.append('category',userEnteredData.category)
        data.append('kind',userEnteredData.kind)
        if(imageState !== undefined)
        {
            for(var x = 0; x<imageState.length; x++) {
              data.append('problemImage', imageState[x])
            }
        }
        console.log("sdfsfsf",data.title)
        console.log(imageState) 
        console.log(userEnteredData.category)
        



      const requestOptions = {
        method: 'POST',
        body:data,  
        credentials: "include"
        };
        fetch(`http://localhost:5000/problems`, requestOptions )
        .then(async response => {

         
            if(response.ok){
                console.log("Response Is Succesfully Done! ")
                swal({
                  title: "Success!",
                  text: "Ticket Raised Successfully",
                  icon: "success",
                })
                setIsModalOpen(false)
                  
                
             }
             else if(response.status === 401){
              swal({
                title: "Unauthorised!",
                text: "Please Login",
                icon: "error",
              });
              setIsModalOpen(false)
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
                setIsModalOpen(false)
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
                  setIsModalOpen(false)
                }
              }
            }
           
          }) 




      
    }
    // const url="https://maps.google.com/maps?q=30.15787,84.20479&hl=es;z=14&amp;output=embed"
    return (
        <div>
          {/* <iframe width="800" height="570" src = "https://maps.google.com/maps?q=30.15787,84.20479&hl=es;z=14&amp;output=embed" ></iframe> */}
          <Modal isOpen = {isModalOpen}>
          <div>
              <div ref={mapContainer} style={{height:"400px",width:"400px"}} />
            </div>
            <p>
            title : {userEnteredData.title}
            decription : {userEnteredData.description}
            location : {userEnteredData.location}
            status : {userEnteredData.status}
            priority : {userEnteredData.priority}
            category : {userEnteredData.category}
            </p>
            <button onClick = {ticketConfirmHandler}>Confirm</button>
            <button onClick = {() =>{setIsModalOpen(false)}}>Reject</button>
            </Modal>
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
                <label htmlFor="location">Location</label>
                <input 
                type="text" 
                autoComplete = "off"
                onChange = {handleInput}
                value = {userEnteredData.location}
                name = "location"
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