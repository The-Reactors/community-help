import "../assets/css/carousel.css"
const Carousel = (props) => {

  return(
    <div className="container">
  <h2>Carousel Example</h2>  
  <div style={{backgroundColor:"white"}} id={"myCarousel"+props.carouselId} className="carousel slide shadow" data-ride="carousel">
  
    <ol className="carousel-indicators">
      <li data-target={"#myCarousel"+props.carouselId} data-slide-to="0" className="active"></li>
      <li data-target={"#myCarousel"+props.carouselId} data-slide-to="1"></li>
      <li data-target={"#myCarousel"+props.carouselId} data-slide-to="2"></li>
    </ol>

   
    <div className="carousel-inner">
      <div className="item active">
        <img src="http://www.adobewordpress.com/wp-content/uploads/2014/02/wallpaper-thumb-941.jpg" alt="Los Angeles" style={{width:"100%"}}/>
      </div>

      <div className="item">
        <img src="http://www.adobewordpress.com/wp-content/uploads/2014/02/wallpaper-thumb-101.jpg" alt="Chicago" style={{width:"100%"}}/>
      </div>
    
      <div className="item">
        <img src="http://www.adobewordpress.com/wp-content/uploads/2014/02/wallpaper-thumb-1051.jpg" alt="New york" style={{width:"100%"}}/>
      </div>
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