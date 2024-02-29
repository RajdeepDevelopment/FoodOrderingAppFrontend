import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { AdminFilterOrderUpdateAsync, SelectAppliedForDelivery, SelectOrderReq, SelectOutForDelivery, getDeliveryAppliedReqAsync, getDeliveryAppliedReqUpdatePushAsync, getDeliveryAppliedReqUpdateRemoveAsync, getOrderDataforDeliveryBoyAsync, getOutForDeliveryAsync, getSetOrderReqAsync, getUpdateOrderStatusAsync, selectPreviousUserData, selectlatitude, selectlongitude } from "./counterSlice";
import { Icon } from "leaflet";
import Swal from "sweetalert2";
import * as am4core from "@amcharts/amcharts4/core";

import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import RefreshBar from "./RefreshBar";
const getStatusStyle = (status) => {
    switch (status) {
      case 'Prepraing':
        return {
          width: '30%',
          borderRadius: 16,
          backgroundColor: '#FFFF00',
        };
      case 'Cooking':
        return {
          width: '40%',
          borderRadius: 16,
          backgroundColor: '#a8729a',
        };
      case 'Out for Delivery':
        return {
          width: '60%',
          borderRadius: 16,
          backgroundColor: '#0000FF',
        };
      case 'Delivered':
        return {
          width: '100%',
          borderRadius: 16,
          backgroundColor: '#008000',
        };
      case 'Cancelled':
        return {
          width: '100%', // Adjust as needed
          borderRadius: 16,
          backgroundColor: '#FF0000',
        };
      case 'On Hold':
        return {
          width: '10%', // Adjust as needed
          borderRadius: 16,
          backgroundColor: '#A52A2A',
        };
      default:
        return {
          width: '0',
          borderRadius: 16,
          backgroundColor: '#808080',
        };
    }
  };

  
  const customIconn = new Icon ({
    iconUrl: "https://w1.pngwing.com/pngs/546/859/png-transparent-food-icon-delivery-icon-sushi-pizza-delivery-scooter-courier-food-delivery-text.png",
    iconSize: [38,38]
  });

  const NoOrderIcon = new Icon ({
    iconUrl: "https://img.freepik.com/premium-vector/no-shopping-great-design-any-purposes-cartoon-vector-illustration-vector-design-isolated_100456-4481.jpg?size=338&ext=jpg&ga=GA1.1.1826414947.1699747200&semt=ais",
    iconSize: [150,150]
  });


  const OrderLimitIcon = new Icon ({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/6007/6007714.png",
    iconSize: [150,150]
  });
  //
function RequestDelivery (){
  const [refresh, setRefresh] = useState(false);

 const dispatch = useDispatch();
 const orders = useSelector(SelectOrderReq)
 const  latitude = useSelector(selectlatitude); 
 const longitide = useSelector(selectlongitude);
 const currentUser = useSelector(selectPreviousUserData)
        const OutForDelivery = useSelector(SelectOutForDelivery); 
        const AppliedForDelivery = useSelector(SelectAppliedForDelivery)
useEffect(()=>{
 dispatch( getOrderDataforDeliveryBoyAsync())
 if(currentUser?.length !=0){
      dispatch(getDeliveryAppliedReqAsync(currentUser[0]?.userid))
 }
}, [dispatch, currentUser,refresh]);

useEffect(()=>{

  if(currentUser?.length !=0){
  dispatch(getOutForDeliveryAsync(currentUser[0]?.userid));

  }
},[dispatch, orders,currentUser, AppliedForDelivery,refresh])


useEffect(()=>{
  am4core.useTheme(am4themes_animated);
// Themes end

let capacity = 4 *1000;
let value = OutForDelivery.length * 1000;
let circleSize = 0.8;

let component = am4core.create("DeliveryPerDay", am4core.Container)
component.width = am4core.percent(100);
component.height = am4core.percent(100);
  component.logo.disabled = true
let chartContainer = component.createChild(am4core.Container);
chartContainer.x = am4core.percent(50)
chartContainer.y = am4core.percent(50)

let circle = chartContainer.createChild(am4core.Circle);
circle.fill = am4core.color("#dadada");


let circleMask = chartContainer.createChild(am4core.Circle);

let waves = chartContainer.createChild(am4core.WavedRectangle);
waves.fill = am4core.color("#34a4eb");
if(capacity< value){
  waves.fill = am4core.color("#ff0000");
}

waves.mask = circleMask;
waves.horizontalCenter = "middle";
waves.waveHeight = 10;
waves.waveLength = 30;
waves.y = 500;
circleMask.y = -500;

component.events.on("maxsizechanged", function(){
  let smallerSize = Math.min(component.pixelWidth, component.pixelHeight);  
  let radius = smallerSize * circleSize / 2;

  circle.radius = radius;
  circleMask.radius = radius;
  waves.height = smallerSize;
  waves.width = Math.max(component.pixelWidth, component.pixelHeight);  

  //capacityLabel.y = radius;

  let labelRadius = radius + 20

  capacityLabel.path = am4core.path.moveTo({x:-labelRadius, y:0}) + am4core.path.arcToPoint({x:labelRadius, y:0}, labelRadius, labelRadius);
  capacityLabel.locationOnPath = 0.5;

  setValue(value);
})


function setValue(value){
   let y = - circle.radius - waves.waveHeight + (1 - value / capacity) * circle.pixelRadius * 2;
   waves.animate([{property:"y", to:y}, {property:"waveHeight", to:10, from:15}, {property:"x", from:-50, to:0}], 5000, am4core.ease.elasticOut);
   circleMask.animate([{property:"y", to:-y},{property:"x", from:50, to:0}], 5000, am4core.ease.elasticOut);
}


let label = chartContainer.createChild(am4core.Label)
let formattedValue = component.numberFormatter.format(value, "#.#a");
formattedValue = formattedValue.replace(/k$/, '');
formattedValue = formattedValue.toUpperCase();

label.text = formattedValue + " Orders";
label.fill = am4core.color("#fff");
label.fontSize = 30;
label.horizontalCenter = "middle";


let capacityLabel = chartContainer.createChild(am4core.Label)

let formattedCapacity = component.numberFormatter.format(capacity, "#.#a").toUpperCase();
 formattedCapacity =  formattedCapacity.replace(/K$/, '');
capacityLabel.text = formattedCapacity+  " Order's At a Time";
capacityLabel.fill = am4core.color("#34a4eb");
capacityLabel.fontSize = 20;
capacityLabel.textAlign = "middle";
capacityLabel.padding(0,0,0,0);

}, [orders,AppliedForDelivery,OutForDelivery,refresh ])

function ApplyOrderReq(orderData, userData) {
  let check = true;
  let tempObject = {
    ...orderData,
    DeliveryReq: [...orderData.DeliveryReq, ...userData] , DeliveryReqBy: userData[0].userid 
  };

  const temp = orderData.DeliveryReq.filter(
    (element) => element.id === userData[0].id
  );

  const updateData = orders.filter(
    (element) => element.id !== orderData.id
  );

  if (temp.length !== 0) {
    check = false;
  }

  if (check) {
    dispatch(getUpdateOrderStatusAsync(tempObject));
    dispatch(getDeliveryAppliedReqUpdatePushAsync(tempObject))
    dispatch(getSetOrderReqAsync(updateData));
  }
}

function removeReq(  orderData){

  Swal.fire({
    title: "Are you sure?",
    text: "Request Will Be Remove Form The Order",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Remove it!"
  }).then((result) => {
    if (result.isConfirmed) {

      let tempObject = {...orderData, DeliveryReq: [], DeliveryReqBy: " " }
      dispatch(getUpdateOrderStatusAsync(tempObject))

      const updatedOrders = orders.map((order) => {
  
        if (order.id === orderData.id) {
          return { ...order,  DeliveryReq: [ ], DeliveryReqBy: " ", AcceptStatus: "" };
        }
        return order;
      });


      const updatedAppliedOrders = AppliedForDelivery.filter((order) => {
  
                   return  order.id !== orderData.id
      
      });
      dispatch(AdminFilterOrderUpdateAsync(updatedOrders))

      dispatch(getDeliveryAppliedReqUpdateRemoveAsync(updatedAppliedOrders))
      Swal.fire({
        title: "Removed!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }
  });
 


}

    return (<> 
      <div className="row mt-3"  >   

      <RefreshBar state={refresh} Setstate = {setRefresh} > </RefreshBar>

        <div className="col-5 bhag m-0 p-0"> 
            <h2 className="display-6 "> Get Your Delivery Orders</h2>
        </div>

       
      </div>
   
   <div className=" mx-3 mt-0 "> 
<div className="shadow-lg  mb-5 bg-body rounded"> 
   <MapContainer center={[latitude, longitide]} zoom= {13}>
       
       <TileLayer
           attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
       
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
       
       />  {OutForDelivery.length <=4 ?  <> 
               {orders.length !=0 ? 
                orders.map((order, indexxx)=>(
         <div key={indexxx+"openstreetmap"}>   

 
         <Marker  
       position={[order.latitude, order.longititu] }
        icon={customIconn}
> 



<Popup> 
 
  <div className="card-body p-1 gradient-custom" style={{ height: '200px', width: '300px', overflowY: 'auto' }} key={indexxx}>

  
                           
                         
                     <div className="d-flex justify-content-between align-items-center mb-4" >
                  
                     <button className='btn-primery mx-2' onClick={()=>{
                      ApplyOrderReq(order, currentUser)
                     }}> Apply For Delivery </button>

                       <p className="lead fw-normal mb-0" style={{ color: "#a8729a" }}>
                         Order Number: 1KAU9-84UIL
                       </p>
                       <p className="small text-muted mb-0">
                         Order Number: 1KAU9-84UIL
                       </p>
                     </div>
                     {order.OrderProducts.map((ordata, index) => (
                       <div className="card shadow-0 border mb-4" key={index+ordata.item.name}>
                         <div className="card-body">
                           <div className="row">
                             <div className="col-md-3">
                               <img
                                 src={ordata.item.thumbnail}
                                 className="img-fluid"
                                 alt="Food Item"
                               />
                             </div>
                             <div className="col-md-3 text-center d-flex justify-content-center align-items-center">
                               <p className="text-muted mb-0">{ordata.item.name}</p>
                             </div>
                             <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                               <p className="text-muted mb-0 small">Quantity: {ordata.quantity}</p>
                             </div>
                             <div className="col-md-2 text-center d-flex justify-content-center align-items-center">
                               <p className="text-muted mb-0 small">${ordata.item.price}</p>
                             </div>
                           </div>
                           <hr
                             className="mb-4"
                             style={{ backgroundColor: "#e0e0e0", opacity: 1 }}
                           />
                           <div className="row d-flex align-items-center">
                             <div className="col-md-2">
                               <p className="text-muted mb-0 small">Order Status</p>
                             </div>
                             <div className="col-md-10">
                               <div
                                 className="progress"
                                 style={{ height: 7, borderRadius: 16 }}
                               >
                                 <div
                                   className="progress-bar"
                                   role="progressbar"
                                   style={getStatusStyle(order.status)}
                                   aria-valuenow={65}
                                   aria-valuemin={0}
                                   aria-valuemax={100}
                                 />
                               </div>
                            
                             </div>
                           </div>
                          
                         </div>
                       </div>
                     ))}
                     <div className="d-flex justify-content-between pt-2">
                       <p className="fw-bold mb-0">Order Details</p>
                       <p className="text-muted mb-0">
                         <span className="fw-bold me-4" >Total</span> ${order.totalAmount}
                       </p>
                     </div>
                     <div className="d-flex justify-content-between pt-2">
                       <p className="text-muted mb-0">Order Date: {order.OrderPlacedTime}</p>
                       <p className="text-muted mb-0">
                         <span className="fw-bold me-4">Delivery Charges</span> Free
                       </p>
                     </div>
                     <div
                       className="card-footer border-0 px-4 py-5"
                       style={{
                         backgroundColor: "#a8729a",
                         borderBottomLeftRadius: 10,
                         borderBottomRightRadius: 10,
                       }}
                     >
                       <p className="d-flex align-items-center justify-content-end text-white text-center text-uppercase mb-0">
                         Total Amount: <span className="h2 mb-0 ms-2 ">{Math.round(order.totalAmount) }</span>
                       </p>
                     </div>
                   </div> 
                   
                   
                   </Popup>

                   

</Marker>

</div>
           )) : <> <Marker position={[latitude, longitide] }
           icon={NoOrderIcon}> </Marker></>}
        </> : <> 
        <Marker position={[latitude, longitide] }
           icon={OrderLimitIcon}> </Marker>
        
        </> }
      
         </MapContainer>
         </div>
       <> 
       <div class="">
  <div class="row">
    <div class="col-lg-4 col-md-6 col-sm-12">
      <h1 className="display-6 bhag">  Your Profile
        </h1>

        <>
  <link
    rel="stylesheet"
    href="https://allyoucan.cloud/cdn/icofont/1.0.1/icofont.css"
    integrity="sha384-jbCTJB16Q17718YM9U22iJkhuGbS0Gd2LjaWb4YJEZToOPmnKDjySVa323U+W7Fv"
    crossOrigin="anonymous"
  />
     <div className="osahan-account-page-left shadow-sm bg-white ">
          <div className="border-bottom p-4">
            <div className="osahan-user text-center">
              <div className="osahan-user-media">
                <img
                  className="mb-3 rounded-pill shadow-sm mt-1"
                  src= {currentUser[0]?.logo}
                  alt="gurdeep singh osahan"
                />
                <div className="osahan-user-media-body">
                  <h6 className="mb-2">{{...currentUser[0]}["First-name"]} {"  "} {{...currentUser[0]}["Last-name"]}</h6>
                  <p className="mb-1">{currentUser[0].phone}</p>
                  <p>{currentUser[0].userid}</p>
                  <p className="mb-0 text-black font-weight-bold">
                    <a
                      className="text-primary mr-3"
                      data-toggle="modal"
                      data-target="#edit-profile-modal"
                      href="#"
                    >
                      <i className="icofont-ui-edit" /> EDIT
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <ul
            className="nav nav-tabs flex-column border-0 pt-4 pl-4 pb-4"
            id="myTab"
            role="tablist"
          >
            <li className="nav-item">
             <div id="DeliveryPerDay" style={{height: "200px"}}> </div>
            </li>
          </ul>
        </div>
</>


    </div>

    <div class="col-lg-4 col-md-6 col-sm-12 "> 
    <h4 className="display-6"> Request Accepted</h4>
    <svg style={{height: "30%", width: "100%" , padding: "2%"}}
  xmlns="http://www.w3.org/2000/svg"
  data-name="Layer 1"
  width={829}
  height="364.82907"
  viewBox="0 0 829 364.82907"
  xmlnsXlink="http://www.w3.org/1999/xlink"
>
  <path
    d="M432.12988,567.97449c-2.85009,22.33-13.33008,42.76-24.51025,62.44-.36963.67-.75,1.33-1.13965,2H290.27979c-2.3501-.61-4.66993-1.28-6.98-2a127.02725,127.02725,0,0,1-36.68994-18.05c-42.75-30.8-59.20019-89-51.77-141.15,4.62012-32.4,18.83985-65.48,46.52979-82.93,14.62012-9.23,33.3999-12.23,50.23-8.8.44043.08.88037.18,1.33008.27,14.48,3.26,27.37988,11.36,34.72021,24.41,13.19971,23.45,5.33985,52.5-1.1499,78.6-6.47021,26.1-9.98047,57.34,8.7998,76.59-6.20019-18.25-.08007-40.02,14.73-52.36,11.18994-9.31,26.77-12.8,40.98-9.91,1.35986.29,2.70019.62,4.02,1.02a44.59846,44.59846,0,0,1,9.16992,3.84C426.34961,514.31452,435.31982,542.80451,432.12988,567.97449Z"
    transform="translate(-185.5 -267.58547)"
    fill="#f2f2f2"
  />
  <path
    d="M363.23,630.4145c3.21973.75,6.44971,1.41,9.69971,2H355.35986c-2.30029-.62-4.59033-1.28-6.85986-2q-7.48534-2.34-14.74023-5.37c-19.39991-8.14-37.27-20.36-50.79-36.62a103.37091,103.37091,0,0,1-16.02-26.17,118.85639,118.85639,0,0,1-8.19971-33.49c-2.4502-23.6.0498-47.85,4.71973-71.03a296.45051,296.45051,0,0,1,23.16015-69.47q1.905-3.97494,3.93994-7.9a1.54158,1.54158,0,0,1,1.02979-.88,1.77741,1.77741,0,0,1,1.33008.27,2.1062,2.1062,0,0,1,.83008,2.78,293.03874,293.03874,0,0,0-24.58008,66.96c-5.31983,22.67-8.33985,46.39-7.31006,69.7.98,21.78,6.67041,43.2,19.58008,61.00994,11.79,16.26,28.06982,29.08,46.08008,37.81A169.131,169.131,0,0,0,363.23,630.4145Z"
    transform="translate(-185.5 -267.58547)"
    fill="#fff"
  />
  <path
    d="M401.79,632.4145h-5.18018c-.58007-.66-1.14013-1.33-1.68994-2a110.41123,110.41123,0,0,1-23.24023-49.66,107.73445,107.73445,0,0,1,9.29-67.05,110.2407,110.2407,0,0,1,10.04-16.62c1.35986.29,2.70019.62,4.02,1.02a106.05621,106.05621,0,0,0-19.77,45.34A105.09492,105.09492,0,0,0,400,630.4145C400.57959,631.08448,401.17969,631.75452,401.79,632.4145Z"
    transform="translate(-185.5 -267.58547)"
    fill="#fff"
  />
  <path
    d="M868.42938,615.40764c.75219,5.8933,3.51805,11.28515,6.4687,16.47906.09755.17682.19794.351.30078.52783h30.66735c.62024-.161,1.23248-.33782,1.84215-.52783a33.52491,33.52491,0,0,0,9.68315-4.76373c11.2825-8.12868,15.624-23.48872,13.663-37.25207-1.21933-8.55094-4.97218-17.28137-12.28006-21.88674a18.43729,18.43729,0,0,0-13.25661-2.32248c-.11624.02112-.23235.0475-.351.07126a13.67963,13.67963,0,0,0-9.1633,6.44224c-3.48365,6.18889-1.40929,13.85571.30348,20.744,1.70761,6.88828,2.634,15.13308-2.32243,20.21351a12.64393,12.64393,0,0,0-14.70288-16.4342c-.35889.07655-.71263.16363-1.061.26921a11.77068,11.77068,0,0,0-2.42011,1.01345C869.9549,601.24579,867.58749,608.76482,868.42938,615.40764Z"
    transform="translate(-185.5 -267.58547)"
    fill="#f2f2f2"
  />
  <path
    d="M886.61332,631.8867c-.84974.19794-1.70219.37211-2.55993.52783h4.637c.60709-.16362,1.21147-.33782,1.81044-.52783q1.97553-.61758,3.89022-1.41724a34.90012,34.90012,0,0,0,13.40442-9.66469,27.28163,27.28163,0,0,0,4.228-6.90674,31.36842,31.36842,0,0,0,2.164-8.83864,62.85793,62.85793,0,0,0-1.24562-18.7461,78.23849,78.23849,0,0,0-6.11239-18.33442q-.50277-1.04906-1.03982-2.08494a.40684.40684,0,0,0-.27178-.23225.46908.46908,0,0,0-.351.07126.55587.55587,0,0,0-.21908.73369,77.33813,77.33813,0,0,1,6.48714,17.672,68.02194,68.02194,0,0,1,1.92926,18.39511,29.3506,29.3506,0,0,1-5.16755,16.10164,32.4858,32.4858,0,0,1-12.16137,9.97875A44.6366,44.6366,0,0,1,886.61332,631.8867Z"
    transform="translate(-185.5 -267.58547)"
    fill="#fff"
  />
  <path
    d="M876.43662,632.41453h1.36714c.15309-.17418.3009-.351.446-.52783a29.13962,29.13962,0,0,0,6.13352-13.10618,28.43312,28.43312,0,0,0-2.45181-17.69573,29.095,29.095,0,0,0-2.64975-4.38633c-.35889.07655-.71263.16363-1.061.26921a27.99,27.99,0,0,1,5.21767,11.96606,27.73652,27.73652,0,0,1-6.5294,22.953C876.75608,632.06352,876.5977,632.24035,876.43662,632.41453Z"
    transform="translate(-185.5 -267.58547)"
    fill="#fff"
  />
  <path
    d="M592.00977,480.0937h-95.981L495.01123,450.583a8.85956,8.85956,0,0,1,9.93091-9.09863l55.85449,6.83936h.00684a31.29061,31.29061,0,0,1,31.2063,31.27Z"
    transform="translate(-185.5 -267.58547)"
    fill="#6c63ff"
  />
  <path
    d="M549.23082,375.4145H482.28871a6.77712,6.77712,0,0,0-6.77894,6.77894v66.94211a6.77713,6.77713,0,0,0,6.77894,6.77895h66.94211a6.77714,6.77714,0,0,0,6.779-6.77895V382.19344A6.77713,6.77713,0,0,0,549.23082,375.4145Z"
    transform="translate(-185.5 -267.58547)"
    fill="#ccc"
  />
  <path
    d="M534.15445,425.47126l-31.60628,6.15492a7.2107,7.2107,0,0,1-8.44659-5.69307L491.672,413.45694a7.21069,7.21069,0,0,1,5.69307-8.44658l31.60628-6.15491a7.21069,7.21069,0,0,1,8.44659,5.69307l2.42957,12.47616A7.21068,7.21068,0,0,1,534.15445,425.47126Z"
    transform="translate(-185.5 -267.58547)"
    fill="#3f3d56"
  />
  <path
    d="M527.831,410.73188l-24.12058,4.69717a1.69474,1.69474,0,0,1-.64789-3.327l24.12059-4.69717a1.69474,1.69474,0,0,1,.64788,3.327Z"
    transform="translate(-185.5 -267.58547)"
    fill="#fff"
  />
  <path
    d="M523.14259,417.68789l-12.47616,2.42957a1.69474,1.69474,0,0,1-.64789-3.327l12.47617-2.42957a1.69474,1.69474,0,1,1,.64788,3.327Z"
    transform="translate(-185.5 -267.58547)"
    fill="#fff"
  />
  <path
    d="M556.00977,382.19344v8.89737h-80.5v-8.89737a6.77712,6.77712,0,0,1,6.77894-6.77894h66.94211A6.77713,6.77713,0,0,1,556.00977,382.19344Z"
    transform="translate(-185.5 -267.58547)"
    fill="#b3b3b3"
  />
  <path
    d="M716.76052,393.87705a10.74267,10.74267,0,0,0-15.19331-6.3648l-92.09655-33.04273-4.05633,23.00726,91.8034,25.2454a10.80091,10.80091,0,0,0,19.54279-8.84513Z"
    transform="translate(-185.5 -267.58547)"
    fill="#ffb8b8"
  />
  <path
    d="M716.76052,393.87705a10.74267,10.74267,0,0,0-15.19331-6.3648l-92.09655-33.04273-4.05633,23.00726,91.8034,25.2454a10.80091,10.80091,0,0,0,19.54279-8.84513Z"
    transform="translate(-185.5 -267.58547)"
    opacity="0.2"
  />
  <path
    d="M625.81732,358.66188l-8.69674,22.72023a4.81688,4.81688,0,0,1-6.86086,2.47581l-21.13624-11.89627a13.37737,13.37737,0,0,1,9.63746-24.95856l23.6022,5.23464a4.81686,4.81686,0,0,1,3.45418,6.42415Z"
    transform="translate(-185.5 -267.58547)"
    fill="#6c63ff"
  />
  <path
    d="M724.00977,414.9145l-33,15,4.33259,16.311a253.73547,253.73547,0,0,1,6.53976,96.64985v0l24.12766,5.03915,20-51-7-58Z"
    transform="translate(-185.5 -267.58547)"
    fill="#6c63ff"
  />
  <path
    d="M788.75977,490.4145c-21.68213,0-39.35157,15.762-40.209,35.5h80.418C828.11133,506.17646,810.44189,490.4145,788.75977,490.4145Z"
    transform="translate(-185.5 -267.58547)"
    fill="#3f3d56"
  />
  <path
    d="M771.88135,493.81605c-1.12842-89.09839-51.87158-80.90155-51.87158-80.90155s.94921,27.73333,1.40527,28.59582c32.33545,61.17957-21.03027,132.90381-88.96,119.70886q-1.92114-.37317-3.69141-.75714a34.5813,34.5813,0,0,1-27.16328-38.76284c6.69158-53.73562-26.59062-52.7847-26.59062-52.7847H526.34326l-25.27335-22.7459a7.3469,7.3469,0,0,0-11.80868,2.92095l-3.25146,8.825s-48,5-44,52h14.83984a29.96684,29.96684,0,0,0,.16016,4l110.75092-.90044c6.49187-.05278,12.22225,5.20768,12.249,11.69971a11.75308,11.75308,0,0,1-12.14443,11.79594l-17.85546-.59521c-5.5,24.5,8,41,22.875,51.375a83.1484,83.1484,0,0,0,47.61766,14.625h48.50734c63,0,74-53,74-53C776.00977,534.9145,771.88135,493.81605,771.88135,493.81605Z"
    transform="translate(-185.5 -267.58547)"
    fill="#3f3d56"
  />
  <circle cx="600.25977" cy="307.07903" r="56.25" fill="#3f3d56" />
  <circle cx="600.25977" cy="307.07903" r="13.78676" fill="#fff" />
  <circle cx="316.25977" cy="298.57903" r="64.75" fill="#3f3d56" />
  <circle cx="316.25977" cy="298.57903" r="15.8701" fill="#fff" />
  <path
    d="M691.10352,434.34663,679.23,402.09711a13.63843,13.63843,0,0,1,8.08691-17.51074l34.04-12.53125a23.99761,23.99761,0,0,1,30.812,14.22705,23.84491,23.84491,0,0,1,1.481,8.29248,24.1887,24.1887,0,0,1-8.98779,18.73,23.81344,23.81344,0,0,1-6.72022,3.78907Z"
    transform="translate(-185.5 -267.58547)"
    fill="#3f3d56"
  />
  <path
    d="M753.1499,394.57447a23.54938,23.54938,0,0,1-8.80029,18.34,29.98827,29.98827,0,0,1-19.69971-41.3,23.50519,23.50519,0,0,1,28.5,22.96Z"
    transform="translate(-185.5 -267.58547)"
    fill="#6c63ff"
  />
  <ellipse cx="265.00977" cy="231.82903" rx={14} ry={17} fill="#6c63ff" />
  <polygon
    points="450.071 292.005 462.331 292.005 468.164 260.208 450.069 260.209 450.071 292.005"
    fill="#ffb8b8"
  />
  <path
    d="M632.44363,555.58794l24.1438-.001h.001a15.38605,15.38605,0,0,1,15.38648,15.38623v.5l-39.53052.00146Z"
    transform="translate(-185.5 -267.58547)"
    fill="#2f2e41"
  />
  <path
    d="M649.80136,546.54q-.21423,0-.43018-.02051l-16.96655-1.23535a4.49992,4.49992,0,0,1-3.80932-6.0293l22.70654-51.01464a3.49812,3.49812,0,0,0-.19629-2.79883,3.45084,3.45084,0,0,0-2.21118-1.75977c-10.67725-2.791-38.072-10.22265-61.78638-18.918-10.15991-3.72558-16.55884-9.10937-19.0188-16.00195-3.24316-9.08691,1.55469-17.374,1.7605-17.72168l.16089-.27246,22.3147,2.02832,24.19116,2.05762,53.01343,28.42773a20.086,20.086,0,0,1,8.8186,25.78418L653.90756,543.873A4.49689,4.49689,0,0,1,649.80136,546.54Z"
    transform="translate(-185.5 -267.58547)"
    fill="#2f2e41"
  />
  <circle cx="410.70532" cy="39.7202" r="24.56103" fill="#ffb8b8" />
  <polygon
    points="443.071 295.005 455.331 295.005 461.164 263.208 443.069 263.209 443.071 295.005"
    fill="#ffb8b8"
  />
  <path
    d="M625.44363,558.58794l24.1438-.001h.001a15.38605,15.38605,0,0,1,15.38648,15.38623v.5l-39.53052.00146Z"
    transform="translate(-185.5 -267.58547)"
    fill="#2f2e41"
  />
  <path
    d="M642.80136,549.54q-.21423,0-.43018-.02051l-16.96655-1.23535a4.49992,4.49992,0,0,1-3.80932-6.0293l22.70654-51.01464a3.49812,3.49812,0,0,0-.19629-2.79883,3.45084,3.45084,0,0,0-2.21118-1.75977c-10.67725-2.791-38.072-10.22265-61.78638-18.918-10.15991-3.72558-16.55884-9.10937-19.0188-16.00195-3.24316-9.08691,1.55469-17.374,1.7605-17.72168l.16089-.27246,22.3147,2.02832,24.19116,2.05762,53.01343,28.42773a20.086,20.086,0,0,1,8.8186,25.78418L646.90756,546.873A4.49689,4.49689,0,0,1,642.80136,549.54Z"
    transform="translate(-185.5 -267.58547)"
    fill="#2f2e41"
  />
  <path
    d="M603.78012,345.79386l-26-9s-16.322,12.54-8.481,43.64856a77.01209,77.01209,0,0,1-3.40009,48.32025,49.7787,49.7787,0,0,1-2.61889,5.53119s29,35,56,9l-10.5-50.5S625.28012,359.29386,603.78012,345.79386Z"
    transform="translate(-185.5 -267.58547)"
    fill="#6c63ff"
  />
  <path
    d="M599.25474,332.702c-3.49562-5.23231-6.25435-12.48756-2.40565-17.46591,3.79907-4.91416,11.29215-4.19018,17.11054-6.36466,8.104-3.02867,12.80409-12.5493,11.33824-21.07564s-8.31031-15.59442-16.46405-18.48645-17.34839-1.95148-25.33312,1.37887c-9.82931,4.0997-18.26115,12.03028-21.79686,22.07625s-1.6456,22.10808,5.68929,29.82963c7.86381,8.27834,20.20556,10.48454,31.62276,10.35067"
    transform="translate(-185.5 -267.58547)"
    fill="#2f2e41"
  />
  <path
    d="M576.40785,288.06942c-4.40484,3.58587-11.12527,1.99318-15.8536-1.15387s-8.56507-7.62825-13.681-10.09566c-9.01922-4.34995-19.92379-1.45825-28.70171,3.36009s-16.55916,11.475-25.83124,15.25617-21.10393,3.96808-28.12484-3.17161a25.732,25.732,0,0,0,37.7101,30.37145c10.1594-6.18839,15.77105-19.1637,27.16592-22.57933,6.3055-1.89008,13.07632-.36777,19.44917,1.28106s13.01783,3.43041,19.44912,2.02674,12.447-7.18312,11.6288-13.71475Z"
    transform="translate(-185.5 -267.58547)"
    fill="#2f2e41"
  />
  <path
    d="M715.53838,392.87666a10.74265,10.74265,0,0,0-15.86252-4.44158L604.2061,367.00792l-1.18664,23.33194,94.21678,13.72558a10.80091,10.80091,0,0,0,18.30214-11.18878Z"
    transform="translate(-185.5 -267.58547)"
    fill="#ffb8b8"
  />
  <path
    d="M620.94513,369.15135l-5.827,23.61966a4.81688,4.81688,0,0,1-6.503,3.3034l-22.44252-9.19753a13.37737,13.37737,0,0,1,6.48437-25.957l24.06772,2.28255a4.81687,4.81687,0,0,1,4.22042,5.94888Z"
    transform="translate(-185.5 -267.58547)"
    fill="#6c63ff"
  />
  <circle cx="519.00977" cy="136.82903" r={7} fill="#6c63ff" />
  <path
    d="M1014.5,631.4145a1.00308,1.00308,0,0,1-1,1h-827a1,1,0,0,1,0-2h827A1.00308,1.00308,0,0,1,1014.5,631.4145Z"
    transform="translate(-185.5 -267.58547)"
    fill="#3f3d56"
  />
</svg>
     <div className="osahan-account-page-right shadow-sm bg-white p-4 ">
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane  fade  active show"
              id="orders"
              role="tabpanel"
              aria-labelledby="orders-tab"
            >
           
              <div className="card-body p-1 gradient-custom" style={{ height: '700px', width: '100%', overflowY: 'auto' }}>
              
              {OutForDelivery.length !=0 && OutForDelivery.map((element, index)=>(
           
    
           <>
           <div key={index+element.OrderPlacedTime} className="bg-white card mb-4 order-list shadow-sm">
                <div className="gold-members p-4">
                  <a href="#"></a>
                  <div className="media">
                    <a href="#">
                      <img
                        className="mr-4"
                        src= {element.Address[0].logo}
                        alt="Generic placeholder image"
                      />
                    </a>
                    <div className="media-body">
                      <a href="#">
                        <span className="float-right text-info">
                          Ordered on {" "} {element.OrderPlacedTime}
                          <i className="icofont-check-circled text-success" />
                        </span>
                      </a>
                      <h6 className="mb-2">
                        <a href="#" />
                        <a href="#" className="text-black">
                         {element.customerName}
                        </a>
                      </h6>
                      <p className="text-gray mb-1">
                        <i className="icofont-location-arrow" />
                        {{...element.Address[0]}["address-1"]}
                      </p>
                      <p className="text-gray mb-3">
                        <i className="icofont-list" /> ORDER #25102589748{" "}
                        <i className="icofont-clock-time ml-2" /> Mon, Nov 12,
                        6:26 PM
                      </p>
                      <p className="text-dark">
                         {{...element.Address[0]}["state"]} ,{{...element.Address[0]}["city"]}, {{...element.Address[0]}["pin-code"]} , {{...element.Address[0]}["country"]}
                      </p>
                      <hr />
                      <div className="float-right">
                        <a className="btn btn-sm btn-outline-primary" href="#">
                          <i className="icofont-headphone-alt" /> HELP
                        </a>
                        <a className="btn btn-sm btn-primary" href="#">
                          <i className="icofont-refresh" /> REORDER
                        </a>
                      </div>
                      <p className="mb-0 text-black text-primary pt-2">
                        <span className="text-black font-weight-bold">
                          {" "}
                          Total Paid:
                        </span>{" "}
                        {element.totalAmount}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
         
           </>
              
               
             ))}
              
              </div>
             
            </div>
          </div>
        </div>
  
 
      

    </div>
    <div class="col-lg-4 col-md-6 col-sm-12">
    <h1 className="display-6"> Delivery Request</h1>
    <svg  style={{height: "26%", width: "100%" , padding: "2%"}}
  xmlns="http://www.w3.org/2000/svg"
  data-name="Layer 1"
  width="735.51954"
  height="394.61806"
  viewBox="0 0 735.51954 394.61806"
  xmlnsXlink="http://www.w3.org/1999/xlink"
>
  <path
    d="M843.68017,378.38905c-.71.79-1.40966,1.57995-2.10009,2.38l-.00977.01a270.64211,270.64211,0,0,0-25.75977,34.77c-.60009.95-1.19043,1.91-1.7705,2.87a280.854,280.854,0,0,0-36.5,96.59c-.00977.06-.01953.11-.02979.17q-2.03979,11.505-3.08008,23.16-.8247,9.045-1.02,18.14c-.56006,25.38,1.47022,53.66-15.04,72.94-6.1997,7.24-14.4497,12.3-23.46972,15.49a72.13891,72.13891,0,0,1-8.3003,2.38H682.48047c-.6001-.08-1.2002-.17-1.81006-.26-3.71-.55-7.41016-1.16-11.10987-1.77l-.21045-.03-.52978.17-3.22022,1.05c0-.1-.00976-.2-.00976-.3-.01025-.18-.02-.37-.02-.55q-.01466-.345-.03027-.69c-.00977-.23-.01953-.45-.01953-.68-.02-.38-.04-.77-.04-1.16-2.14014-59.42,3.93994-120.89,32.3999-173.02a191.85352,191.85352,0,0,1,36.6499-47.45c29.1001-27.41,66.64014-45.21,106.10986-44.31C841.65039,378.309,842.66015,378.339,843.68017,378.38905Z"
    transform="translate(-232.24023 -252.69097)"
    fill="#f0f0f0"
  />
  <path
    d="M843.79342,379.65149c-44.2863,22.26995-81.74478,58.83231-104.36366,103.02443-4.89014,9.55423-9.01931,19.67182-10.71272,30.32321-1.69418,10.65614-.20786,20.74631,3.59509,30.77384,3.47666,9.16718,8.09449,18.1416,9.28221,27.99427,1.25191,10.38523-2.40794,20.17912-9.16511,28.0186-8.26759,9.59182-19.48861,15.64093-30.66742,21.17512-12.41192,6.14465-25.40138,12.33038-34.07392,23.54811-1.05079,1.35919-3.09835-.35077-2.04914-1.7079,15.08872-19.51694,41.42367-23.59176,59.461-39.41523,8.41654-7.38353,14.659-17.34821,14.05474-28.88727-.52835-10.09041-5.28239-19.349-8.8828-28.60053-3.7805-9.71427-5.7514-19.51339-4.63635-29.95922,1.14064-10.6855,4.88294-20.98585,9.50738-30.6232a231.24418,231.24418,0,0,1,41.50813-59.16609,242.579,242.579,0,0,1,66.23524-49.00711c1.52979-.76928,2.42716,1.74472.90736,2.509Z"
    transform="translate(-232.24023 -252.69097)"
    fill="#fff"
  />
  <path
    d="M746.02414,467.92357a35.76044,35.76044,0,0,1-11.56758-44.83793c.75455-1.54158,3.18552-.44147,2.43,1.10215A33.11339,33.11339,0,0,0,747.732,465.87443c1.40759.98238-.30837,3.0259-1.7079,2.04914Z"
    transform="translate(-232.24023 -252.69097)"
    fill="#fff"
  />
  <path
    d="M729.93714,539.357a68.92534,68.92534,0,0,0,43.20325-25.62442c1.05558-1.35542,3.10345.35412,2.04914,1.7079a71.69268,71.69268,0,0,1-45.0111,26.57315c-1.698.27313-1.93011-2.385-.24129-2.65663Z"
    transform="translate(-232.24023 -252.69097)"
    fill="#fff"
  />
  <path
    d="M797.14742,409.41558a20.24214,20.24214,0,0,0,18.20074,6.13657c1.69374-.29451,1.924,2.364.24129,2.65663a22.683,22.683,0,0,1-20.14993-6.74406,1.3786,1.3786,0,0,1-.17062-1.87852,1.34051,1.34051,0,0,1,1.87852-.17062Z"
    transform="translate(-232.24023 -252.69097)"
    fill="#fff"
  />
  <path
    d="M966.71045,542.279c-1.0503.21-2.08008.41-3.13037.65-.00977,0-.02979.01-.04.01a267.16467,267.16467,0,0,0-41.46,12.23l-.00977.01c-1.0498.38-2.10986.79-3.14014,1.2h-.00976a281.14744,281.14744,0,0,0-87.25,55.13c-.0503.05-.1001.09-.1499.13995-.01026.02-.03028.03-.04.04-.03028.03-.07032.06-.1001.09a274.07465,274.07465,0,0,0-28,30.4q-1.06494,1.35-2.12988,2.73c-.62012.79-1.23,1.58-1.8501,2.38h-135c.21972-.32.46972-.65.68994-.97,0-.01.00976-.01.00976-.02.16016-.23.32032-.45.4502-.67.01025-.01.02-.02.02-.03.0498-.06.1001-.13.14014-.17.10986-.19.23974-.35.33984-.52a.427.427,0,0,0,.06006-.07995c2.39014-3.36005,4.79-6.72,7.25-10.06v-.01a.18021.18021,0,0,0,.04-.05005c.00976-.02.00976-.02.02978-.03,18.79-25.58,39.87012-49.81,63.97022-70.07.71972-.61,1.4497-1.24,2.21972-1.83a260.743,260.743,0,0,1,34.78028-24.42c.00976-.01.02-.01.02978-.02q10.03491-5.82,20.66992-10.67a191.58725,191.58725,0,0,1,57.74024-15.79c.06982-.01.12988-.01.19971-.02.05029-.01.10009-.01.15039-.02,39.66992-4.3,80.27,4.11,111.16992,28.54C965.15039,541.009,965.92041,541.629,966.71045,542.279Z"
    transform="translate(-232.24023 -252.69097)"
    fill="#f0f0f0"
  />
  <path
    d="M689.75049,644.909c4.98.56,9.96,1.46,14.9497,2.38h-18.1997c-1.94-.16-3.88038-.26-5.83008-.26a54.108,54.108,0,0,0-6.23.26h-10.04c0,.01-.01026.01-.01026.02v-.02a1.2426,1.2426,0,0,1,.7002-.97,1.09238,1.09238,0,0,1,.27-.11005c.08008-.02.1499-.04.23-.06,1.08008-.29,2.1499-.54,3.23-.75.25-.05.49023-.1.74023-.13995.71973-.14,1.44-.25,2.14991-.35A71.19124,71.19124,0,0,1,689.75049,644.909Z"
    transform="translate(-232.24023 -252.69097)"
    fill="#fff"
  />
  <path
    d="M966.04,543.359c-.81983-.15-1.63965-.29-2.46-.43a238.50277,238.50277,0,0,0-52.58985-3.06q-1.33521.06-2.66992.15a236.64173,236.64173,0,0,0-71.23,15.61.03147.03147,0,0,1-.02.01,7.32672,7.32672,0,0,0-.73.29h-.01025q-7.94971,3.12-15.64991,6.85c-9.6499,4.69-19.04,10.28-26.81006,17.77a57.035,57.035,0,0,0-14.1499,22.16c-.31006.83-.6001,1.68006-.87988,2.53-.21.68-.41992,1.36-.62012,2.04-2.75,9.41-4.46,19.36005-9.4497,27.94a33.58612,33.58612,0,0,1-8.47022,9.69,37.30167,37.30167,0,0,1-3.47021,2.38h-5.92969a36.09513,36.09513,0,0,0,4.73-2.38,30.01245,30.01245,0,0,0,9.5498-8.98c5.64991-8.37,7.43018-18.63,10.13037-28.18.46-1.62.94971-3.2,1.5-4.76a59.82663,59.82663,0,0,1,12.82959-21.95c7.3501-7.85,16.54-13.82,26.03028-18.73,6.1001-3.15,12.37988-6,18.79-8.55.82959-.33,1.65966-.66,2.5-.98a243.45166,243.45166,0,0,1,127.3999-12.4c.83008.13,1.6499.28,2.46973.43C968.51025,541.119,967.71045,543.659,966.04,543.359Z"
    transform="translate(-232.24023 -252.69097)"
    fill="#fff"
  />
  <path
    d="M834.83207,554.9741A35.76044,35.76044,0,0,1,852.59154,512.209c1.53059-.77657,2.80925,1.56542,1.27662,2.343a33.11339,33.11339,0,0,0-16.4387,39.8142c.53241,1.63184-2.068,2.23035-2.59739.60784Z"
    transform="translate(-232.24023 -252.69097)"
    fill="#fff"
  />
  <path
    d="M778.97964,602.32422a68.92535,68.92535,0,0,0,49.923,5.55168c1.65887-.4467,2.26472,2.15123.60784,2.59739a71.69277,71.69277,0,0,1-51.93771-5.88262c-1.52023-.80426-.10516-3.06634,1.40682-2.26645Z"
    transform="translate(-232.24023 -252.69097)"
    fill="#fff"
  />
  <path
    d="M910.877,539.03849a20.24216,20.24216,0,0,0,10.83763,15.85782c1.52967.78459.11289,3.04593-1.40682,2.26644a22.683,22.683,0,0,1-12.0282-17.51641,1.3786,1.3786,0,0,1,.99477-1.60262,1.34053,1.34053,0,0,1,1.60262.99477Z"
    transform="translate(-232.24023 -252.69097)"
    fill="#fff"
  />
  <path
    d="M691.28711,453.05347a14.618,14.618,0,0,1-1.55323-.083L574.75317,440.69312a6.99926,6.99926,0,0,1-6.21728-7.70361l1.62011-15.17334.01734.002a7.00834,7.00834,0,0,1,7.633-5.72168l114.98072,12.27735a14.38062,14.38062,0,0,1-1.5,28.67968Z"
    transform="translate(-232.24023 -252.69097)"
    fill="#6c63ff"
  />
  <path
    d="M705.50634,645.98853H690.74658a7.00786,7.00786,0,0,1-7-7V515.97437a7.00787,7.00787,0,0,1,7-7h14.75976a7.00786,7.00786,0,0,1,7,7V638.98853A7.00785,7.00785,0,0,1,705.50634,645.98853Z"
    transform="translate(-232.24023 -252.69097)"
    fill="#6c63ff"
  />
  <path
    d="M670.314,645.98853H655.5542a7.00785,7.00785,0,0,1-7-7V515.97437a7.00786,7.00786,0,0,1,7-7H670.314a7.00786,7.00786,0,0,1,7,7V638.98853A7.00785,7.00785,0,0,1,670.314,645.98853Z"
    transform="translate(-232.24023 -252.69097)"
    fill="#6c63ff"
  />
  <circle cx="461.82291" cy="77.40466" r={51} fill="#6c63ff" />
  <path
    d="M666.02561,351.50457c-3.30591-.0918-7.42029-.20654-10.59-2.522a8.13276,8.13276,0,0,1-3.20007-6.07276,5.47084,5.47084,0,0,1,1.86035-4.49315c1.65552-1.39894,4.073-1.72706,6.67822-.96144l-2.69921-19.72558,1.98144-.27149,3.17322,23.18994-1.65466-.75927c-1.91834-.87989-4.55164-1.32764-6.188.05517a3.51516,3.51516,0,0,0-1.15271,2.89551,6.14683,6.14683,0,0,0,2.38122,4.52783c2.46668,1.80176,5.74622,2.03418,9.46582,2.13819Z"
    transform="translate(-232.24023 -252.69097)"
    fill="#2f2e41"
  />
  <rect x="405.26389" y="66.73987" width="10.77161" height={2} fill="#2f2e41" />
  <rect x="439.26389" y="66.73987" width="10.77161" height={2} fill="#2f2e41" />
  <path
    d="M577.82959,522.239H248.231a15.21778,15.21778,0,0,1-15.20068-15.20068V346.4397A15.21778,15.21778,0,0,1,248.231,331.239H577.82959a15.21786,15.21786,0,0,1,15.20068,15.20068V507.03834A15.21786,15.21786,0,0,1,577.82959,522.239Z"
    transform="translate(-232.24023 -252.69097)"
    fill="#cacaca"
  />
  <path
    d="M543.80151,433.739H275.62207a8.44665,8.44665,0,0,1-7.94019-5.59912L237.329,342.98316a8.42971,8.42971,0,0,1,7.92834-11.25976l335.22876-.46778h.01172a8.42952,8.42952,0,0,1,7.7478,11.75l-.45947-.19677.45947.19677-36.69629,85.62451A8.41944,8.41944,0,0,1,543.80151,433.739Z"
    transform="translate(-232.24023 -252.69097)"
    fill="#e4e4e4"
  />
  <path
    d="M351.65014,499.56666H259.17431a8.59131,8.59131,0,0,1,0-17.18262h92.47583a8.59131,8.59131,0,0,1,0,17.18262Z"
    transform="translate(-232.24023 -252.69097)"
    fill="#f2f2f2"
  />
  <path
    d="M718.29394,551.239H642.7666a13.75191,13.75191,0,0,1-13.73633-13.73633V497.739a102.61611,102.61611,0,0,1,102.5-102.5h.5V537.50269A13.75191,13.75191,0,0,1,718.29394,551.239Z"
    transform="translate(-232.24023 -252.69097)"
    fill="#2f2e41"
  />
  <path
    d="M591.34326,502.83717a7.01658,7.01658,0,0,1-6.38941-4.13868l-6.04126-13.4663a7.00773,7.00773,0,0,1,3.522-9.25147l105.50464-47.33008a14.37956,14.37956,0,1,1,11.77124,26.23975L594.20581,502.22A6.93884,6.93884,0,0,1,591.34326,502.83717Z"
    transform="translate(-232.24023 -252.69097)"
    fill="#6c63ff"
  />
  <path
    d="M696.28859,323.99976a10.5778,10.5778,0,0,0-1.16886-10.99824,15.41364,15.41364,0,0,0-10.549-6.34162c-10.09169-1.45329-19.88422,4.73778-29.9109,2.43091-9.172-2.11023-12.11694-12.30109-8.75535-20.33085,3.47052-8.29,11.811-14.12851,20.11856-16.857a39.70485,39.70485,0,0,1,28.87986,1.457c1.078.50145,2.6715-.34535,2.2035-1.694-1.38476-3.99039.36135-8.22383,3.354-10.99445,3.33274-3.08554,8.1174-4.24119,12.514-4.69167a61.28762,61.28762,0,0,1,24.72076,2.7c16.12775,5.12878,30.09867,16.57546,37.57585,31.83671A64.65218,64.65218,0,0,1,777.35,341.821c-6.80446,17.39913-25.08035,32.27376-21.31421,52.68833a24.765,24.765,0,0,0,14.9304,18.07644,24.40684,24.40684,0,0,0,23.53941-3.19224,23.94221,23.94221,0,0,0,4.44925-4.29043c1.18731-1.49731-.92177-3.63406-2.12132-2.12132a21.31958,21.31958,0,0,1-38.01327-9.899c-1.51427-9.83228,3.2222-19.42037,8.26891-27.50762,5.18561-8.30983,10.91747-16.192,14.10337-25.55586a67.70445,67.70445,0,0,0-3.68373-51.7246c-7.78842-15.37546-22.01787-26.89287-38.29678-32.27457a64.28371,64.28371,0,0,0-25.01175-3.14976c-8.47882.65961-18.61268,4.07733-20.37541,13.63182a11.60585,11.60585,0,0,0,.38872,5.96126l2.2035-1.694c-16.593-7.7182-38.68082-3.73546-49.99292,11.211-5.396,7.12966-7.0579,17.3618-1.16307,24.754,6.47629,8.12136,17.73409,5.81424,26.4933,3.94542,5.51368-1.17637,12.16838-2.52075,17.29195.62826,3.58,2.20033,6.78626,6.96269,4.65188,11.17733-.87025,1.71844,1.717,3.23879,2.59041,1.51416Z"
    transform="translate(-232.24023 -252.69097)"
    fill="#2f2e41"
  />
  <path
    d="M881.92041,646.099a1.1866,1.1866,0,0,1-1.18994,1.19H233.43017a1.19,1.19,0,0,1,0-2.38h647.3003A1.18664,1.18664,0,0,1,881.92041,646.099Z"
    transform="translate(-232.24023 -252.69097)"
    fill="#3f3d56"
  />
  <circle cx="180.29004" cy="181.04805" r={21} fill="#3f3d56" />
</svg>

   
    <div className="card-body p-1 gradient-custom m-1" style={{ height: '750px', width: '100%', overflowY: 'auto' }}>

     
      {AppliedForDelivery.map((element, index)=>(

<div key={index+element.OrderPlacedTime} className="bg-white card mb-4 order-list shadow-sm">
<div className="gold-members p-4">
  <a href="#"></a>
  <div className="media">
    <a href="#">
      <img
        className="mr-4"
        src= {element.Address[0].logo}
        alt="Generic placeholder image"
      />
    </a>
    <div className="media-body">
      <a href="#">
        <span className="float-right text-info">
          Ordered on {" "} {element.OrderPlacedTime}
          <i className="icofont-check-circled text-success" />
        </span>
      </a>
      <h6 className="mb-2">
        <a href="#" />
        <a href="#" className="text-black">
         {element.customerName}
        </a>
      </h6>
      <p className="text-gray mb-1">
        <i className="icofont-location-arrow" />
        {{...element.Address[0]}["address-1"]}
      </p>
      <p className="text-gray mb-3">
        <i className="icofont-list" /> ORDER #25102589748{" "}
        <i className="icofont-clock-time ml-2" /> Mon, Nov 12,
        6:26 PM
      </p>
      <p className="text-dark">
         {{...element.Address[0]}["state"]} ,{{...element.Address[0]}["city"]}, {{...element.Address[0]}["pin-code"]} , {{...element.Address[0]}["country"]}
      </p>
      <hr />
      <div className="float-right">
      
        <button className="btn btn-sm btn-primary" href="#" onClick={()=>{
          removeReq(element)
        }}>
           Cancel Request
        </button>
      </div>
      <p className="mb-0 text-black text-primary pt-2">
        <span className="text-black font-weight-bold">
          {" "}
          Total Paid:
        </span>{" "}
        {element.totalAmount}
      </p>
    </div>
  </div>
</div>
</div>
      ))}
       </div>
    </div>
  </div>
</div>
       
       
       </>


   </div> 
    </>)
}

export  default RequestDelivery; 