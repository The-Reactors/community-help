import React from "react"
import {Card} from "react-bootstrap"
import Button from 'react-bootstrap/Button';

const ProblemCard = (props) => {
    return <div>
        <Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title>{props.title}</Card.Title>
    <Card.Text>
      {props.description}
    </Card.Text>
    <Card.Text>
      {props.category}
    </Card.Text>
    <Card.Text>
      {props.priority}
    </Card.Text>
    <Card.Text>
      {props.status}
    </Card.Text>
    <Card.Text>
      {props.location}
    </Card.Text>
    
    <i className="fas fa-thumbs-up"></i>
    
  </Card.Body>
</Card>
    </div>
}

export default ProblemCard