import { useEffect, useState,CSSProperties  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { CheckReviewDataAsync, getCreateCartAsync, getEventObjectDataAsync, getPreParamsAsync, getResetSpinerAsync, getResetTargetProductAsync, getReviewDataAsync, getSimilerProductAsync, getTargetProductAsync, getUpdateEventObjectDataAsync, getUpdateReviewBoxAsync, getUpdateTargetProductMainAsync, getUserMessToResDataAsync, getUserMessegePostAsync, getreviewPostAsync, selectPreviousUserData, selectReview, selectSimilerData, selectTargetProduct, selectUserMessToResData, selectcheckReview, selecteventObjectData, selectspinerState, selectuser } from "../../features/counter/counterSlice";
import { useForm } from 'react-hook-form';
import Swal from "sweetalert2";
import { HashLoader } from "react-spinners";
import StarRatings from 'react-star-ratings';

import AOS from "aos";

import "aos/dist/aos.css";
AOS.init({duration:500});
AOS.refresh({duration:2000});

function handleClick() {
  window.scrollTo({ top: 0, behavior: 'smooth' }); 
}
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
 //product Details View

 const handleMouseMove = (e, link, num) => { 

  const containerBoundingRect = e.currentTarget.getBoundingClientRect(); 
  const offsetX = e.clientX - containerBoundingRect.left; 
  const offsetY = e.clientY - containerBoundingRect.top; 
 
  const xPercent = (offsetX / containerBoundingRect.width) * 100; 
  const yPercent = (offsetY / containerBoundingRect.height) * 100; 
 
  const zoomedImage = document.querySelector('.zoomed-image'); 
  const sizeBarHide = document.querySelector('#size');
  if (zoomedImage) { 
    // Apply common styles 
    zoomedImage.style.display = 'block'; 
    zoomedImage.style.backgroundPosition = `${xPercent}% ${yPercent}%`; 
    zoomedImage.style.maxWidth = '100%'; 
    zoomedImage.style.position = "fixed"; 
    zoomedImage.style.width = '600px'; 
    zoomedImage.style.maxHeight = '100%'; 
    zoomedImage.style.height = '600px'; 
    zoomedImage.style.backgroundImage = `url(${link})`; 
    zoomedImage.style.backgroundSize = '2000px 1500px'; 
    zoomedImage.style.curser= "pointer";
    zoomedImage.style.zIndex = 9999;

    zoomedImage.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)'; 

    // Adjust position based on num 
    if (num === 0 || num===1) { 
      sizeBarHide.style.display= "none";
      zoomedImage.style.right = '10px'; 
       zoomedImage.style.left ="auto"; 
    } else if (num === 2) { 
      zoomedImage.style.left = '10px'; 
      zoomedImage.style.right = 'auto'; 

      delete zoomedImage.style.right; 
       
    } 
 
    zoomedImage.style.top = '20px'; 
  } 
}; 
 
const handleMouseLeave = async() => { 
  const zoomedImage = document.querySelector('.zoomed-image'); 
  const sizeBarHide = document.querySelector('#size');

  sizeBarHide.style.display = 'block'; 

  if (zoomedImage) { 
    delete zoomedImage.style.left; 
    zoomedImage.style.display = 'none'; 
    

  } 
};


// productTest DAta 
const productData = {
  location: {
    city: "Another City",
    state: "Another State",
    country: "Another Country",
  },
  availability: "Dine-in, Takeout",
  hoursOfOperation: {
    monday: "11:00 AM - 9:00 PM",
    tuesday: "11:00 AM - 9:00 PM",
    wednesday: "11:00 AM - 9:00 PM",
    thursday: "11:00 AM - 9:00 PM",
    friday: "11:00 AM - 10:00 PM",
    saturday: "12:00 PM - 10:00 PM",
    sunday: "Closed",
  },
  contactInformation: {
    phone: "+123-789-4567",
    email: "info@pastaparadise.com",
    website: "www.pastaparadise.com",
  },
};

 //product Details View

function ProductOverview(){
let spiner = useSelector(selectspinerState)
const ActiveUserData = useSelector(selectUserMessToResData)



  const dispatch = useDispatch();
  const [rating, setRating] = useState(0);
const reviewsdata = useSelector(selectReview);
let getTargetProduct = useSelector(selectTargetProduct);
const currentUser = useSelector(selectuser);
 const [orderSize, setOrderSize] = useState("Regular");
 const [extraCharge, setextraCharge] = useState(1);
 const [SpicLevel, setSpicLevel] =  useState("NoSpicy")
 const [CheeseLevel, setCheeseLevel] = useState("Normal Cheese")
const [cartBoxindi, setcartBoxindi] = useState(null);
const EventObjectData = useSelector(selecteventObjectData)

const changeRating = (newRating) => {
  setRating(newRating);

       if(checkReview.length ===0){

        Swal.fire({
          title: "Comments?",
          text: "Write Some comments?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "No Continue"
        }).then((result) => {
          if (result.isConfirmed) {
            let count = getTargetProduct?.reviewCount + 1; 
                let RatingForUpdate =  ((getTargetProduct.rating * (count - 1)) + newRating) / count; 
                  let newRatingForUpdate = parseFloat(parseFloat(RatingForUpdate).toFixed(2) )       
             dispatch( getUpdateTargetProductMainAsync({ _id: getTargetProduct?._id , rating: newRatingForUpdate, "reviewCount" : count}) )
       
             const date = new Date();
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
              .replace(/\//g, '-') // Replace slashes with dashes
              .replace(',', '');
             
               dispatch(getreviewPostAsync({ reviewAtt: "",  name: currentUser.displayName, productId: slug, time: indianTime, img: currentUser.photoURL, postUser: currentUser.uid, RatingValue: newRating}));
            
            Swal.fire({
              title: "Review Added!",
              text: "......",
              icon: "success"
            });
          }
        }); 

        
        
      } else{
        dispatch(getUpdateReviewBoxAsync({id: checkReview[0].id, RatingValue: newRating }))
        Swal.fire({
          title: "Review Updated!",
          text: "Review Is updated With Your Comment!",
          icon: "success"
        });
      }
       
        
       
};
useEffect(()=>{
  if(currentUser && currentUser?.length !==0 ){
 dispatch(getEventObjectDataAsync(currentUser?.uid)); 

  }
}, [currentUser])

function containsSpecialCharacters(inputString) {
  const pattern = /[^a-zA-Z0-9]/;
  
  if (pattern.test(inputString)) {
    return true; 
  }
  
  return false; 
}

function removeSpecialCharacters(inputString) {
  if (containsSpecialCharacters(inputString)) {
    const pattern = /[^a-zA-Z0-9]/g;

    const result = inputString.replace(pattern, '');

    return result;
  }

  return inputString;
}
 function testFun(){
  const idd= removeSpecialCharacters(currentUser.uid);

  const date = new Date();
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
   .replace(/\//g, '-') // Replace slashes with dashes
   .replace(',', '');

  const data = {Size: orderSize,userid: idd, spic: SpicLevel, Cheese: CheeseLevel , quantity: 1, item:{...getTargetProduct, price: parseFloat(parseFloat( getTargetProduct?.price )  * extraCharge ).toFixed(2)} , time: indianTime}

      dispatch(getCreateCartAsync(data)); 
      dispatch(getUpdateEventObjectDataAsync({ _id: EventObjectData?._id?? "",  id: currentUser.uid, actions: [...EventObjectData.actions, {
        "actionType": "Add To Order",
        "timestamp": Date.now(),
         Time:indianTime,
        "details": {
          "itemId": getTargetProduct.id,
          "itemName": getTargetProduct.name,
          "otherInfo": getTargetProduct.thumbnail
        }}] 
      
      }))
 }

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
    const {slug} = useParams();
 
const checkReview = useSelector(selectcheckReview)

    useEffect(()=>{
      setTimeout(()=>{
        dispatch(getTargetProductAsync(slug));
        if(currentUser != null ){
    dispatch(CheckReviewDataAsync({id: slug, uid: currentUser?.uid}))
        }
      }, 200)
        dispatch(getPreParamsAsync(slug))
    

        return(()=>{
          spiner = true;
          dispatch(getResetSpinerAsync())
          dispatch(getResetTargetProductAsync());


        })
    }, [dispatch,slug]);

    useEffect(()=>{
      dispatch(getReviewDataAsync(slug));

    }, [dispatch,slug, checkReview])
    

    function previevPicture(imgLink1){
      Swal.fire({
        title: 'Order Details',
        width: 7000,
        height:1000,
        html: `
          <div class="order-details row justify-content-center gap-2 align-items-center">
            <div class="col-12" >
              <img src="${imgLink1}" alt="Food 1" class="img-fluid"/>
            </div>
            
          </div>
          <p class="text-center mt-3">Choose your delicious meal!</p>
        `,
        showCloseButton: true,
        showConfirmButton: false,
        customClass: {
          container: 'swal-container', // Add a custom class for the modal container
        },
      });
      
      

    }
    useEffect(()=>{
      handleClick()
    },[slug])

    useEffect(()=>{
      if(getTargetProduct?.length !=0 && currentUser?.length !=0){
         const idd= removeSpecialCharacters(currentUser?.uid);
        dispatch(getUserMessToResDataAsync(getTargetProduct.uid + idd))
    
      }
    },[dispatch, getTargetProduct])
      const PrevUserData = useSelector(selectPreviousUserData)
    useEffect(()=>{
      if(getTargetProduct.length!=0){
        if(PrevUserData.length!=0){
          dispatch(getSimilerProductAsync({cate: getTargetProduct.category, cityy: PrevUserData[0].city}))

        }else{

          dispatch(getSimilerProductAsync({cate: getTargetProduct.category, cityy: getTargetProduct.city}))
        }
      }
    },[getTargetProduct])
    const similerProductTarget = useSelector(selectSimilerData); 
    return(
    <>
     { spiner&&

<div className="loader">

<HashLoader
 color={"#c3d636"} 
 loading={spiner}
 cssOverride={override}
 size={200}
 aria-label="Loading Spinner"
 data-testid="loader"
/>
</div>

     }
     
      
    {getTargetProduct.length !=0 &&
    <div  className="container">

    <div  className="container" >

        
    <h1 className="mt-4 mb-4">{getTargetProduct.name}</h1>

      <div className="row">

        
        <div className="col-12 mt-5">
          <div className="max-w-2xl mx-auto px-6">

            <div className="row image-container" >

              <div className="col-lg-4 col-md-6 col-sm-12 my-1 "
                 onMouseMove={ (e) => handleMouseMove(e,getTargetProduct.images[0],0) } 
                 onMouseLeave={handleMouseLeave } 
              onClick={
              ()=>previevPicture(getTargetProduct.images[0])}>
                <img data-aos="zoom-out"
                  src={getTargetProduct.images[0]}
                  alt="Two each of gray, white, and black shirts laying flat."
                  className="img-fluid" style={{height: "300px", width: "100%"}}  
                />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 my-1 " 
                  onMouseMove={ (e) => handleMouseMove(e,getTargetProduct.images[1],1) } 
                  onMouseLeave={handleMouseLeave } 

              onClick={
                ()=>previevPicture(getTargetProduct.images[1])}>
                <img  data-aos="zoom-out"
                  src={getTargetProduct.images[1]}
                  alt=""
                  className="img-fluid"
                  style={{height: "300px", width: "100%"}}
                />
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12 my-1 "
                onMouseMove={ (e) => handleMouseMove(e,getTargetProduct.images[2], 2) } 
                onMouseLeave={handleMouseLeave } 
              onClick={
                ()=>previevPicture(getTargetProduct.images[2])}>
                <img style={{height: "300px", width: "100%"}} data-aos="zoom-out"
                                  src={getTargetProduct.images[2]}

                  alt="Model wearing plain white basic tee."
                  className="img-fluid"
                />
              </div>

            </div>

            <div  
            class="zoomed-image" > 
              
 
          
        
 
            </div> 
          </div>
        </div>
      </div>
    </div>

{/* rating price add nto bag */}

<div className="col-md-12">
  <div className="container">
    <div className="row ">
   
      <div className="col-md-9">
      <h2 className="text-3xl tracking-tight text-gray-900 mt-4 "> Price: { parseFloat(parseFloat( getTargetProduct?.price )  * extraCharge ).toFixed(2)
} $</h2>
          
      </div>

      <div className="col-md-3 mt-2"> 
    <StarRatings
        rating={getTargetProduct.rating} // Current rating value
        starRatedColor="gold" // Color of the selected stars
        numberOfStars={5} // Total number of stars to display
        name="rating" // Unique name for the rating input
        starDimension="25px" // Size of the stars
        starSpacing="5px" // Spacing between stars
      />
                    <p className="d-inline-flex m-3">{getTargetProduct.rating} ({getTargetProduct.reviewCount})</p>

  </div>
    
    </div>



            
    <form className="mt-4"  onSubmit={(e)=>{
      e.preventDefault();
      testFun();
      setcartBoxindi([]);
      const idd= removeSpecialCharacters(currentUser.uid);

      const messageDatafor = { 
        for: idd,
        uid: getTargetProduct.uid,
        name: getTargetProduct.restaurantName,
        logo: currentUser.photoURL,
        time: Date.now(),
         dbAdd: getTargetProduct.uid +idd,
        
    }
      if(ActiveUserData.length===0){
          
        dispatch(getUserMessegePostAsync(messageDatafor))

      }
      
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Food Added',
        showConfirmButton: false,
        timer: 700
      })

    }} >
      <div className="row">


        <div className="col-md-4">
          <h3 className="text-sm font-medium text-gray-900">Customization</h3>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="Extra Cheese" id="customization1"
             onClick={(e)=>{
              setCheeseLevel(e.target.value)
             }}
            />
            <label className="form-check-label" for="customization1">
              Extra Cheese
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="Spicy" id="customization2" 
             onClick={(e)=>{
             
              setSpicLevel(e.target.value)
             }}
            />
            <label className="form-check-label" for="customization2">
              Spicy
            </label>
          </div>
        </div>
     <div className="col-md-4 mt-2"> 
     <h2> Weight:  {getTargetProduct?.weight[orderSize]}</h2>
     </div>
        <div className="col-md-4 mt-2 justify-content-end">
        <div className="d-flex align-items-center">
          
          <h3 className="lg-mx-4 text-sm font-medium text-gray-900">Size: </h3>
         
          <div id="size" className="btn-group mx-4 " role="group" aria-label="Size">
            <button type="button" className={`btn ${orderSize ==="Small"? "btn-secondary": "" } `} value={"Small"}
              onClick={(e)=>{
                setextraCharge(0.8)
                setOrderSize(e.target.value)
              
                
              }}
            >
              Small 
            </button>
            <button type="button" className= {`btn ${orderSize ==="Regular"? "btn-secondary": "" } `} value={"Regular"}
              onClick={(e)=>{
                setextraCharge(1)
                setOrderSize(e.target.value); 
              }}
            >
              Regular
            </button>
            <button type="button" className={`btn ${orderSize ==="Large"? "btn-secondary": "" } `}  value={"Large"}
              onClick={(e)=>{
                setextraCharge(1.3)
                setOrderSize(e.target.value)

              }}
            >
              Large
            </button>
          </div>
        </div>
        </div>
      </div>
  {cartBoxindi == null &&
  <>
  {currentUser? 
      <button type="submit" className="btn btn-primary mt-4 w-100" >
        
        Add to Order
      
      </button>
      
      :  <Link to={'/login'}>
      <button type="" className="btn btn-primary mt-4 w-100">
        Add to Order
      </button>
      
      </Link>} 
      </>
      }
       {cartBoxindi && 
       <>
       <label> Product Added </label>
       <Link to={'/cart'}>
       <button type="" className="btn btn-dark mt-4 w-100">
        Go to Cart
      </button>
      </Link>
      
      </>}
    </form>
     </div>



     <div className="row mt-4">
  <div className="col-md-8">
    <h3 className="text-sm font-medium text-gray-900">Food Description</h3>
    <p className="text-base text-gray-900">
     {getTargetProduct.description}
    </p>
  </div>
  <div className="col-md-4">
    <h3 className="text-sm font-medium text-gray-900">Highlights</h3>
    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
        {getTargetProduct && getTargetProduct.highlights.map((highlight, index)=>(

<li key={index+"font-medium"} className="text-gray-400">
<span className="text-gray-600">{highlight} </span>
</li>
        ))}
    
      
    </ul>
  </div>
</div>
<div className="row mt-4">
  <div className="col-md-12">
    <h3 className="text-sm font-medium text-gray-900">Order Details</h3>
    <p className="text-sm text-gray-600">
     {getTargetProduct.description}
    </p>
  </div>
</div>
  </div>
{/* Write Review */}



<div className="container mt-5">

  {currentUser  ? 
  <> 
{(checkReview.length ===0 || checkReview[0]?.RatingValue ===0) ? 

<div className="bhag"> 
<StarRatings
       rating={rating} // Current rating value
       changeRating={changeRating} // Function to handle rating changes
       starRatedColor="gold" // Color of the selected stars
       numberOfStars={5} // Total number of stars to display
       name="rating" // Unique name for the rating input
       starDimension="40px" // Size of the stars
       starSpacing="5px" // Spacing between stars
     />
</div>

: <></> }

  {(checkReview?.length ===0 || checkReview[0]?.reviewAtt =="" )?
    <form onSubmit={handleSubmit((data)=>{
  
         if(checkReview.length ===0){
          let count = getTargetProduct?.reviewCount + 1; 
          let RatingForUpdate =  ((getTargetProduct.rating * (count - 1)) + rating) / count; 
            let newRatingForUpdate = parseFloat(parseFloat(RatingForUpdate).toFixed(2) ) 
       dispatch( getUpdateTargetProductMainAsync({ id: getTargetProduct.id , rating: newRatingForUpdate, "reviewCount" : count}) )
       const date = new Date();
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
        .replace(/\//g, '-') // Replace slashes with dashes
        .replace(',', '');
       
           dispatch(getreviewPostAsync({...data, name: currentUser.displayName, productId: slug, time: indianTime, img: currentUser.photoURL, postUser: currentUser.uid, RatingValue: rating}));

         } else{
           dispatch(getUpdateReviewBoxAsync({...data, id: checkReview[0].id, postUser: currentUser.uid }))
          //checkReview
         }



       reset()
   })}> 
  
  
       <div class="form-group">
         <label className=" mb-2" for="review">Write your review:</label>
         <textarea class="form-control" rows="5" id="review"
         {...register("reviewAtt", {require:true})}
         ></textarea>
       </div> 
  
       <div className="bhag mb-2">
       <button type="submit" class="btn btn-primary mt-3 ">Submit </button>
     
       </div>
     </form>
    
    : <> Already added Review </>} 
 </>


  : < div class= "bhag mb-4 display "> <h4  className="mx-4"> login to write Review</h4> 
  
  <Link to={'/login'}><button className="button"> Log-In</button> </Link> </div> }



  <h2 className="text-center">Customer Reviews</h2>

   {reviewsdata.length !=0 && 

  <div className="row">
    
    {reviewsdata.map((reviewElement, index)=>(
 
<div key={index+reviewElement.name} className="col-md-6 mb-4  mx-0  ">
  <div className="card p-1">
    <div className="d-flex align-items-center mb-3">
      <img
        src={reviewElement.img}
        alt="Customer"
        className="rounded-circle me-1"
        style={{ width: '80px', height: '80px' }}
      />
      <div>
        <h5 className="card-title mb-0">{reviewElement.name}</h5>
        {reviewElement?.RatingValue >0 ? 
        <StarRatings
        rating={reviewElement?.RatingValue} // Current rating value
        starRatedColor="gold" // Color of the selected stars
        numberOfStars={5} // Total number of stars to display
        name="rating" // Unique name for the rating input
        starDimension="25px" // Size of the stars
        starSpacing="5px" // Spacing between stars
      />
        : <> </>}
        
        <p className="text-muted">{reviewElement.time}</p>
      </div>
    </div>
    <hr className="mt-0"></hr>
    <p className="card-text">{reviewElement.reviewAtt}</p>
  </div>
</div>


    ))}
    

   
    
  </div> }
</div>

    </div>

}

<div className="container mb-4">
  <h5 className="card-title">Similar items</h5>
  <div className="px-0 border rounded-2 shadow-0">
    {similerProductTarget && (
      <div className="row">
        {similerProductTarget.map((smpt, index) => (
          <div key={index+"ProductOverview"} className="col-12 col-md-6 col-lg-4 col-xl-3 mb-3">
            <div className="card ">
            <div className="card-body">
  <Link to={`/ProductOverview/${smpt._id}`} className="me-3 d-inline">
    <img
      src={smpt.thumbnail}
      style={{ minWidth: 96, height: 96 }}
      className="img-md img-thumbnail d-inline"
      alt={smpt.name}
    />
  </Link>
  <div className="info d-inline d-inline-block">
    <Link to={`/ProductOverview/${smpt.id}`} className="nav-link mb-1">
      <div style={{ height: '30px', width: "100px", overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
        {smpt.name}
      </div>
    </Link>
    <strong className="text-dark">{smpt.price}</strong>
  </div>
</div>



            </div>
          </div>
        ))}
      </div>
    )}
  </div>
</div>


<div className="container product-details text-dark p-4 rounded shadow-lg" style={{ fontFamily: 'CustomFont' }}>
      <div className="product-additional-info">
        <div className="row">
          <div className="col-md-4">
            <h6>Social links</h6>
            <div className="social-links gap-2">
            <a className="mx-2" href="https://in.linkedin.com/company/zomato" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
</svg>
          </a>
              <a className="mx-2"href="https://www.instagram.com/zomato/" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-instagram" viewBox="0 0 16 16">
  <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
</svg>
              </a>
              <a className="mx-2" href="https://twitter.com/zomato" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-twitter" viewBox="0 0 16 16">
  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
</svg>
              </a>

              <a className="mx-2" href="https://www.youtube.com/zomato" target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-youtube" viewBox="0 0 16 16">
  <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z"/>
</svg>
              </a>
            </div>
          </div>

          <div className="col-md-4">
            <h6>Location</h6>
            <p>
              {productData.location.city}, {productData.location.state}, {productData.location.country}
            </p>
          </div>

          <div className="col-md-4">
            <h6>Availability</h6>
            <p>{productData.availability}</p>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4">
            <h6>Hours of Operation</h6>
            <ul className="hours-list list-unstyled">
              {Object.entries(productData.hoursOfOperation).map(([day, hours]) => (
                <li key={day}>
                  <strong>{day}:</strong> {hours}
                </li>
              ))}
            </ul>
          </div>

          <div className="col-md-4">
            <h6>Contact Information</h6>
            <p>
              Phone: <a href={`tel:${productData.contactInformation.phone}`}>{productData.contactInformation.phone}</a><br />
              Email: <a href={`mailto:${productData.contactInformation.email}`}>{productData.contactInformation.email}</a><br />
              Website: <a href={`https://${productData.contactInformation.website}`} target="_blank">{productData.contactInformation.website}</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    
</>

    
    )
}



export default ProductOverview;