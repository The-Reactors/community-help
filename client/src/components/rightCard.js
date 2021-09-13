

import React, { useState } from 'react'
import "../assets/css/rightCard.css"
import {Card} from "react-bootstrap"
import RangeSlider from 'react-bootstrap-range-slider'
import { Dropdown } from 'react-bootstrap'
import {Button} from 'react-bootstrap'


const RightCard = (props) => {
    const [ value, setValue ] = useState(10);

    

    return (
        <div>
        <div>
        <Card style = {{ width: '18rem' }}>
            <Card.Body>
                <Card.Title style = {{textAlign:"center",padding:"2rem"}} ><i className="fa fa-filter"></i> Filters</Card.Title>
            
                     
                <div style={{fontSize:"15px",padding:"0.5rem",fontWeight:"bold"}}> Filter By Proximity </div>
                 <br />
                 <RangeSlider
                 value={value}
                 step = "5"
                 min = "10"
                 max = "50"
                 onChange={changeEvent => setValue(changeEvent.target.value)}/> 
                     <Dropdown >
                        <div style={{fontSize:"15px",padding:"0.5rem",fontWeight:"bold"}}> Choose A Category </div>
                     <Dropdown.Toggle variant="primary" id="dropdown-basic">
                         Categories
                     </Dropdown.Toggle>
                     <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Land issue</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Water issue</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Public health</Dropdown.Item>
                        <Dropdown.Item href="#/action-4">Sanitation</Dropdown.Item>
                        <Dropdown.Item href="#/action-5">Pollution</Dropdown.Item>
                        <Dropdown.Item href="#/action-6">Healthcare issue</Dropdown.Item>
                        <Dropdown.Item href="#/action-7">Electricity</Dropdown.Item>
                        <Dropdown.Item href="#/action-9">Road Blockage</Dropdown.Item>
                        <Dropdown.Item href="#/action-10">Waste management</Dropdown.Item>
                     </Dropdown.Menu>
                     </Dropdown>
                     <div style={{fontSize:"15px",padding:"0.5rem",fontWeight:"bold"}}> Choose Priority </div>
                     <Dropdown >
                     <Dropdown.Toggle variant="primary" id="dropdown-basic">
                         Urgency
                     </Dropdown.Toggle>
                     <Dropdown.Menu>
                        <Dropdown.Item href="#/action1">Emergency</Dropdown.Item>
                        <Dropdown.Item href="#/action2">Urgent</Dropdown.Item>
                        <Dropdown.Item href="#/action3">Not urgent</Dropdown.Item>
                     </Dropdown.Menu>
                     </Dropdown>
            <Button style={{marginTop:"10px"}} variant="success">Filter Results</Button>
            </Card.Body>
        </Card>
        </div>
        </div>
    )
}




export default RightCard
