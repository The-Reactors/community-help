import "../assets/css/carousel.css"
import {useState} from "react"
const Carousel = (props) => {

    let imageListOne = (props.images.length >= 1) ? <li data-target={"#myCarousel"+props.carouselId} data-slide-to="0" className="active"></li> : null
    let imageListTwo = (props.images.length >= 2) ? <li data-target={"#myCarousel"+props.carouselId} data-slide-to="1"></li> : null
    let imageListThree = (props.images.length >= 3) ? <li data-target={"#myCarousel"+props.carouselId} data-slide-to="2"></li> : null

    let imageDisplayOne = (imageListOne) ? <div className="item active">
    <img className="size" src={`data:image/png;base64,${props.images[0]}`} alt="Los Angeles" style={{width:"100%"}}/>
    </div> : null

    let imageDisplayTwo = (imageListTwo) ? <div className="item">
    <img className="size" src={`data:image/png;base64,${props.images[1]}`} alt="Chicago" style={{width:"100%"}}/>
    </div> : null

    let imageDisplayThree = (imageListThree) ? <div className="item">
    <img className="size" src={`data:image/png;base64,${props.images[2]}`} alt="Chicago" style={{width:"100%"}}/>
    </div> : null


  return(
    <div className="container">  
  <div style={{backgroundColor:"white"}} id={"myCarousel"+props.carouselId} className="carousel slide shadow" data-ride="carousel">
  
    <ol className="carousel-indicators">
      {imageListOne}
      {imageListTwo}
      {imageListThree}
    </ol>

   
    <div className="carousel-inner">
      
      {imageDisplayOne}
      {imageDisplayTwo}
      {imageDisplayThree}
    </div>

    <a className="left carousel-control" href={"#myCarousel"+props.carouselId} data-slide="prev">
      <span className="glyphicon glyphicon-chevron-left"></span>
      <span className="sr-only">Previous</span>
    </a>
    <a className="right carousel-control" href={"#myCarousel"+props.carouselId} data-slide="next">
      <span className="glyphicon glyphicon-chevron-right"></span>
      <span className="sr-only">Next</span>
    </a>
  </div>
</div>
  )


}
export default Carousel