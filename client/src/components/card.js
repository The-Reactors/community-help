import React from "react"
import {Card} from "react-bootstrap"
import Button from 'react-bootstrap/Button';

const ProblemCard = (props) => {
    return <div style={{marginBottom:"10px"}}>
        <Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title style={{textAlign:"center"}}>{props.title}</Card.Title>
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
    <a style={{margin:"20px"}}href="/"><span className="fa fa-thumbs-up mr-3"></span> Upvote</a>
    <a href="/"><span className="fa fa-thumbs-down mr-3"></span> Downvote</a>
  </Card.Body>
</Card>
    </div>
}

export default ProblemCard