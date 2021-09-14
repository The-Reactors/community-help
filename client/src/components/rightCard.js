

import React, { useState } from 'react'
import "../assets/css/rightCard.css"
import {Card} from "react-bootstrap"
import RangeSlider from 'react-bootstrap-range-slider'
import { Dropdown } from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import "../assets/css/filterCard.css"


const RightCard = (props) => {
    const [ value, setValue ] = useState(10);
    const [ filterData, setFilterData ] = useState({
        proximity : "",
        category : "",
        urgency : "",
    })
    
    const handleInput = (event) =>
    {
        const name = event.target.name;
        const value = event.target.value;

        setFilterData({...filterData, [name]:value })

    }
    const selectCategoryHandler = (e) => {
        setFilterData((prev) => {
          return {
            ...prev,
            category : e.target.value,
          };
        });
      };
      const selectUrgencyHandler = (e) => {
        setFilterData((prev) => {
          return {
            ...prev,
            urgency : e.target.value,
          };
        });
      };

      const fileSubmitHandler = (e) => {
        let data = new FormData()
          data.append('proximity',filterData.proximity)
          data.append('category',filterData.category)
          data.append('urgency',filterData.urgency)
      }

    return (
        <div>
        <div className = "card text-center text-white bg-info mb-3 filter-data-card" >
        <form action="">
            <title>filter tickets</title>
            <label htmlFor="proximity">based on proxitmity</label>
            <RangeSlider
                 value={value}
                 step = "5"
                 min = "10"
                 max = "50"
                 onChange={changeEvent => setValue(changeEvent.target.value)}
                 onSubmit = {handleInput}
                 />
                <label htmlFor="category">Select your category:
               <select onChange={(e) => selectCategoryHandler(e)} style = {{color:"black"}}>
               <option className = "active">select category</option>
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
                <label htmlFor="urgency">Select your Urgency:
                <select onChange={(e) => selectUrgencyHandler(e)} style = {{color:"black" , alignContent:"flex-start"}}>
                <option className = "active">select urgency</option>
                <option value="emergency" name = "urgency">emergency</option>
                <option value="urgent" name = "urgency">urgent</option>
                <option value="not urgent" name = "urgency">not urgent</option>
                {/* <option value="least urgent" name = "urgency">least urgent</option> */}
                </select>
                </label>
                <a href="">
                <button className = "btn" onClick = {fileSubmitHandler}>Upload</button>
                </a>
            

        </form>
        </div>
        </div>
    )
}



export default RightCard
