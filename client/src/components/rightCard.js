

import React, { useState } from 'react'
import "../assets/css/rightCard.css"
import {Card} from "react-bootstrap"
import RangeSlider from 'react-bootstrap-range-slider'
import { Dropdown } from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import "../assets/css/filterCard.css"


const RightCard = (props) => {
    const [ proximity, setProximity ] = useState(10);
    const [ filterData, setFilterData ] = useState({
        category : "none",
        priority : "none",
        status : "none"
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
      const selectpriorityHandler = (e) => {
        setFilterData((prev) => {
          return {
            ...prev,
            priority : e.target.value,
          };
        });
      };
      const selectStatusHandler = (e) => {
        setFilterData((prev) => {
          return{
            ...prev,
            status : e.target.value,
          }
        });
      };

      const fileSubmitHandler = (e) => {
          e.preventDefault()

          props.updateFilterParams({
            proximity:proximity,
            category:filterData.category,
            priority:filterData.priority,
            status:filterData.status
          })

          props.updateFilter()


      }

    return (
        <div>
        <div className = "card text-center text-white bg-info mb-3 filter-data-card" >
        <form action="">
            <title>filter tickets</title>
            <label htmlFor="proximity">based on proxitmity</label>
            <RangeSlider
                 value={proximity}
                 step = "5"
                 min = "10"
                 max = "50"
                 onChange={changeEvent => setProximity(changeEvent.target.value)}
                //  onSubmit = {handleInput}
                 />
                <label htmlFor="category">Select your category:
               <select onChange={(e) => selectCategoryHandler(e)} style = {{color:"black"}}>
               <option className = "active">none</option>
                <option value = "land issue" name = "category">land issue</option>
                <option value = "water issue" name = "category">water issue</option>
                <option value = "public health" name = "category">public health</option>
                <option value = "sanitation" name = "category">sanitation</option>
                <option value = "pollution" name = "category">Pollution</option>
                <option value = "healthcare issue" name = "category">healthcare issue</option>
                <option value = "electricity" name = "category">Electricity</option>
                <option value = "road blockage" name = "category">Road Blockage</option>
                <option value = "waste management" name = "category">waste management</option>
                </select>
                </label>
                <label htmlFor="priority">Select your priority:
                <select onChange={(e) => selectpriorityHandler(e)} style = {{color:"black" , alignContent:"flex-start"}}>
                <option className = "active">none</option>
                <option value="emergency" name = "priority">emergency</option>
                <option value="urgent" name = "priority">urgent</option>
                <option value="not urgent" name = "priority">not urgent</option>
                {/* <option value="least urgent" name = "priority">least urgent</option> */}
                </select>
                </label>
                <label htmlFor="status">Status of the ticket:
                <select onChange={(e) => selectStatusHandler(e)} style = {{color:"black" , alignContent:"flex-start"}}>
                <option className = "active">none</option>
                <option value="Solved" name = "status">solved</option>
                <option value="pending" name = "status">pending</option>
                {/* <option value="least urgent" name = "priority">least urgent</option> */}
                </select>
                </label>
                <a>
                <button className = "btn btn-primary" onClick = {fileSubmitHandler}>Upload</button>
                </a>
            

        </form>
        </div>
        </div>
    )
}



export default RightCard
