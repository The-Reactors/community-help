

import React, { useState } from 'react'
import "../assets/css/rightCard.css"
import {Card} from "react-bootstrap"
import RangeSlider from 'react-bootstrap-range-slider'
import { Dropdown } from 'react-bootstrap'
import {Button} from 'react-bootstrap'


const RightCard = (props) => {
    const [ value, setValue ] = useState(0);

    

    return (
        <div>
        <div>
        <Card style = {{ width: '18rem' }}>
            <Card.Body>
                <Card.Title style = {{alignContent:"centre",padding:"2rem"}} ><i className="fa fa-filter"></i> Filters</Card.Title>
            
                     
                <Button variant="secondary" style = {{marginLeft:"1rem"}}>
                     
                     proximity
                 
                 </Button>
                 <br />
                 <RangeSlider
                 value={value}
                 step = "5"
                 min = "10"
                 max = "50"
                 onChange={changeEvent => setValue(changeEvent.target.value)}/> 
                                                
               
                    <Button variant="secondary" style = {{marginLeft:"1rem",marginBottom:"1rem"}}>
                     
                         Upvotes
                     
                     </Button>
                     <Dropdown style = {{padding:"1rem"}}>
                     <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                         Categories
                     </Dropdown.Toggle>
                     <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">land issue</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">water issue</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">public health</Dropdown.Item>
                        <Dropdown.Item href="#/action-4">sanitation</Dropdown.Item>
                        <Dropdown.Item href="#/action-5">Pollution</Dropdown.Item>
                        <Dropdown.Item href="#/action-6">healthcare issue</Dropdown.Item>
                        <Dropdown.Item href="#/action-7">Electricity</Dropdown.Item>
                        <Dropdown.Item href="#/action-9">Road Blockage</Dropdown.Item>
                        <Dropdown.Item href="#/action-10">waste management</Dropdown.Item>
                     </Dropdown.Menu>
                     </Dropdown>
                     
                     <Dropdown style = {{padding:"1rem"}}>
                     <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                         Urgency
                     </Dropdown.Toggle>
                     <Dropdown.Menu>
                        <Dropdown.Item href="#/action1">emergency</Dropdown.Item>
                        <Dropdown.Item href="#/action2">urgent</Dropdown.Item>
                        <Dropdown.Item href="#/action3">not urgent</Dropdown.Item>
                        <Dropdown.Item href="#/action4">baad mein karwalenge</Dropdown.Item>
                     </Dropdown.Menu>
                     </Dropdown>
            </Card.Body>
        </Card>
        </div>
        </div>
    )
}




export default RightCard
