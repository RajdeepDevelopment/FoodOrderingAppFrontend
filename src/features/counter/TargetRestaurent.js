import { useSelector } from "react-redux";
import { getUpdateEventObjectDataAsync, selecteventObjectData, selecttargetRestauranrData, selectuser } from "./counterSlice";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { useDispatch } from "react-redux";

function TargetRestaurent(){
  const dispatch = useDispatch();
    const TargetRestaurentData = useSelector(selecttargetRestauranrData); 
  
    const currentUser  = useSelector(selectuser); 

    const EventObjectData = useSelector(selecteventObjectData)

    return(<> 
    <>

    
  <section className="hero-wrap shadow">
    <div className="home-slider owl-carousel js-fullheight">
      <div
        className="slider-item js-fullheight"
        style={{ backgroundImage: "url(https://cdn.britannica.com/02/239402-050-ACC075DB/plates-of-vegan-foods-ready-serve-restaurant-London.jpg)" }}
      >
        <div className="overlay" />
        <div className="container">
          <div className="row no-gutters slider-text js-fullheight align-items-center justify-content-center">
          <div
        className="slider-item js-fullheight"
        style={{ backgroundImage: "url()" }}
      >
        <div className="overlay" />
        <div className="container">
          <div className="row no-gutters slider-text js-fullheight align-items-center justify-content-center">
            <div className="col-md-12 ftco-animate">
              <div className="text w-100 mt-5 text-center">
                <span className="subheading">Taste.it Restaurant</span>
                {TargetRestaurentData.length !=0 && 
    
    
                <h1>{TargetRestaurentData[0]?.name}</h1>
  }


                <span className="subheading-2 sub">Food</span>
              </div>
            </div>
          </div>
        </div>
      </div>
          </div>
        </div>
      </div>
    
    </div>
  </section>
  <section className="ftco-section">
    <div className="container">
      <div className="row justify-content-center mb-5 pb-2">
        <div className="col-md-7 text-center heading-section ftco-animate">
          <h2 className="mb-4 display-4">Our Menu</h2>
        </div>
      </div>
      <div className="row">
      <div className="container-xxl py-5">
  <div className="container">
    <div className="row g-0 gx-5 align-items-end">
      <div className="col-lg-6">
        <div
          className="section-header text-start mb-5 wow fadeInUp"
          data-wow-delay="0.1s"
          style={{ maxWidth: 500 }}
        >
          <h1 className="display-5 mb-3">Our Products</h1>
          <p>
            Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam
            justo sed rebum vero dolor duo.
          </p>
        </div>
      </div>
      <div
        className="col-lg-6 text-start text-lg-end wow slideInRight"
        data-wow-delay="0.1s"
      >
        <ul className="nav nav-pills d-inline-flex justify-content-end mb-5">
          <li className="nav-item me-2">
            <a
              className="btn btn-outline-primary border-2 active"
              data-bs-toggle="pill"
              href="#tab-1"
            >
              Vegetable
            </a>
          </li>
          <li className="nav-item me-2">
            <a
              className="btn btn-outline-primary border-2"
              data-bs-toggle="pill"
              href="#tab-2"
            >
              Fruits{" "}
            </a>
          </li>
          <li className="nav-item me-0">
            <a
              className="btn btn-outline-primary border-2"
              data-bs-toggle="pill"
              href="#tab-3"
            >
              Fresh
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className="tab-content">
      <div id="tab-1" className="tab-pane fade show p-0 active">
        <div className="row g-4">

       {TargetRestaurentData.length!==0 && TargetRestaurentData[0].children.map((element, index)=>(
 
<div key={index+ "tab-pane fade show"}
className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp"
data-wow-delay="0.1s" onClick={()=>{
  const date = Date();
  const options = {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // Ensure 24-hour format
  };
   const indianTime = date.toLocaleString('en-IN', options)
    .replace(/\//g, '-')
    .replace(',', '');
  dispatch(getUpdateEventObjectDataAsync({_id: EventObjectData?._id, id: currentUser.uid, actions: [...EventObjectData.actions, {
    "actionType": "ProductsCheck",
    "timestamp": Date.now(),
     Time:indianTime,
    "details": {
      "itemId": element._id,
      "itemName": element.name,
      "otherInfo": element.img
    }}] 
  
  }))
}}
>

    <Link to={`/ProductOverview/${element._id}`}> 
    
<div className="product-item">
  <div className="position-relative bg-light overflow-hidden">
    <img style={{height: "250px"}}
      className="img-fluid w-100"
      src= {element.img}
      alt=""
    />
    <div className="bg-secondary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
      New
    </div>
  </div>
  <div className="text-center p-4">
    <a className="d-block h5 mb-2" href="">
     {element.name}
    </a>
    <StarRatings
        rating={element.rating} // Current rating value
        starRatedColor="gold" // Color of the selected stars
        numberOfStars={5} // Total number of stars to display
        name="rating" // Unique name for the rating input
        starDimension="25px" // Size of the stars
        starSpacing="5px" // Spacing between stars
      />
    <span className="text-primary me-1">${ parseFloat(element.price - (element.price * (element.discountPercentage / 100))).toFixed(2)
}</span>
    <span className="text-body text-decoration-line-through ">
      ${element.price}
    </span>
  </div>
  <div className="d-flex border-top">
    <small className="w-50 text-center border-end py-2">
      <a className="text-body" href="">
        <i className="fa fa-eye text-primary me-2" />
        View detail
      </a>
    </small>
    <small className="w-50 text-center py-2">
      <a className="text-body" href="">
        <i className="fa fa-shopping-bag text-primary me-2" />
        Add to cart
      </a>
    </small>
  </div>
</div>
    </Link>
</div>


       ))
}     
         
          
          <div
            className="col-12 text-center wow fadeInUp"
            data-wow-delay="0.1s"
          >
            <a className="btn btn-primary rounded-pill py-3 px-5" href="">
              Browse More Products
            </a>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</div>

       
      </div>
    </div>
  </section>


  <footer className="ftco-footer ftco-no-pb ftco-section">
    <div className="container">
      <div className="row mb-5">
        <div className="col-md-6 col-lg-3">
          <div className="ftco-footer-widget mb-4">
            <h2 className="ftco-heading-2">Taste.it</h2>
            <p>
              Far far away, behind the word mountains, far from the countries
              Vokalia and Consonantia, there live the blind texts. Separated
              they live in Bookmarksgrove
            </p>
            <ul className="ftco-footer-social list-unstyled float-md-left float-lft mt-3">
              <li className="ftco-animate">
                <a href="#">
                  <span className="fa fa-twitter" />
                </a>
              </li>
              <li className="ftco-animate">
                <a href="#">
                  <span className="fa fa-facebook" />
                </a>
              </li>
              <li className="ftco-animate">
                <a href="#">
                  <span className="fa fa-instagram" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="ftco-footer-widget mb-4">
            <h2 className="ftco-heading-2">Open Hours</h2>
            <ul className="list-unstyled open-hours">
              <li className="d-flex">
                <span>Monday</span>
                <span>9:00 - 24:00</span>
              </li>
              <li className="d-flex">
                <span>Tuesday</span>
                <span>9:00 - 24:00</span>
              </li>
              <li className="d-flex">
                <span>Wednesday</span>
                <span>9:00 - 24:00</span>
              </li>
              <li className="d-flex">
                <span>Thursday</span>
                <span>9:00 - 24:00</span>
              </li>
              <li className="d-flex">
                <span>Friday</span>
                <span>9:00 - 02:00</span>
              </li>
              <li className="d-flex">
                <span>Saturday</span>
                <span>9:00 - 02:00</span>
              </li>
              <li className="d-flex">
                <span>Sunday</span>
                <span> Closed</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="ftco-footer-widget mb-4">
            <h2 className="ftco-heading-2">Instagram</h2>
            <div className="thumb d-sm-flex">
              <a
                href="#"
                className="thumb-menu img"
                style={{ backgroundImage: "url(images/insta-1.jpg)" }}
              ></a>
              <a
                href="#"
                className="thumb-menu img"
                style={{ backgroundImage: "url(images/insta-2.jpg)" }}
              ></a>
              <a
                href="#"
                className="thumb-menu img"
                style={{ backgroundImage: "url(images/insta-3.jpg)" }}
              ></a>
            </div>
            <div className="thumb d-flex">
              <a
                href="#"
                className="thumb-menu img"
                style={{ backgroundImage: "url(images/insta-4.jpg)" }}
              ></a>
              <a
                href="#"
                className="thumb-menu img"
                style={{ backgroundImage: "url(images/insta-5.jpg)" }}
              ></a>
              <a
                href="#"
                className="thumb-menu img"
                style={{ backgroundImage: "url(images/insta-6.jpg)" }}
              ></a>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="ftco-footer-widget mb-4">
            <h2 className="ftco-heading-2">Newsletter</h2>
            <p>
              Far far away, behind the word mountains, far from the countries.
            </p>
            <form action="#" className="subscribe-form">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control mb-2 text-center"
                  placeholder="Enter email address"
                />
                <input
                  type="submit"
                  defaultValue="Subscribe"
                  className="form-control submit px-3"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div className="container-fluid px-0 bg-primary py-3">
      <div className="row no-gutters"></div>
    </div>
  </footer>
</>

    </>)
}

export default TargetRestaurent;