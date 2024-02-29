import React, { useCallback, useEffect, useState } from 'react';
import { OutForDeliveryItemDeleteAsync, SelectOutForDelivery, getCurrentDeliveryItemAsync, getNotificationsPostAsync, getOrderDataAsync, getOutForDeliveryAsync, getUpdateNewDeliverAsync, getUpdateOrderStatusAsync, getUpdateOutForDeliveryAsync, selectOderData, selectPreviousUserData, selectcurrentDeliveryData, selectlatitude, selectlongitude, setLongiLatitAsync } from './counter/counterSlice';
import { useDispatch, useSelector } from 'react-redux';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from "leaflet";
import "../features/counter/impMap.css"
import RefreshBar from './counter/RefreshBar';
import Swal from 'sweetalert2';


let runStop = true;

function openGoogleMaps(destinationLat, destinationLng) {
  const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  const isAndroid = /Android/.test(navigator.userAgent);

  let navigationUrl;

  if (isiOS) {
    navigationUrl = `http://maps.apple.com/?daddr=${destinationLat},${destinationLng}&dirflg=d`;
  } else if (isAndroid) {
    navigationUrl = `google.navigation:q=${destinationLat},${destinationLng}&mode=d`;
  } else {
    // For other platforms (including Windows), open Google Maps in the default browser
    navigationUrl = `https://www.google.com/maps/dir/?api=1&destination=${destinationLat},${destinationLng}&dir_mode=driving&dir_action=drive`;
  }

  // Attempt to open the URL in the app or default browser
  window.open(navigationUrl, '_blank');
}

function Delivery() {
  const [refresh, setRefresh] = useState(false);
 const dispatch = useDispatch();
 const currentUser = useSelector(selectPreviousUserData)

 const OutForDelivery = useSelector(SelectOutForDelivery); 
 const [RouterManger, setRouterManger] = useState(false)

 useEffect(()=>{

  if(currentUser?.length !=0){
  dispatch(getOutForDeliveryAsync(currentUser[0]?.userid));
       setTimeout(()=>{
        setRouterManger(true)
       },1000) 
  }
},[dispatch])

 



const handleStatusChangeForDelivered = (orderDataPatch ) => {

let tempObject = { id: orderDataPatch.DeliveryId , "status": "Delivered" }
   dispatch(getUpdateOrderStatusAsync(tempObject)); 
   Swal.fire({
    title: "Order Status Updated",
    text: "You clicked the button!",
    icon: "success"
  });


  dispatch(OutForDeliveryItemDeleteAsync( orderDataPatch.id))
  const objectForNotification = {messege: `Your Order is Successfully Delivered`, for: orderDataPatch.Address[0].userid, time: Date.now(), logo: orderDataPatch?.logo, status: "unRead"}; 

  dispatch(getNotificationsPostAsync(objectForNotification));
  dispatch(getUpdateNewDeliverAsync({}))


};



  const handleStatusChange = (orderDataPatch, longiData, latiData) => {

    let tempObject = { id: orderDataPatch.DeliveryId , deliLongitide: longiData, deliLatitude: latiData, "status": "Out for Delivery", currentDelivery: true  }

     dispatch(getUpdateOrderStatusAsync(tempObject));
     
     const objectForNotification = {messege: `Your Order is Out for Delivery`, for: orderDataPatch.Address[0].userid, time: Date.now(), logo: orderDataPatch?.logo, status: "unRead"}; 
     setTimeout(()=>{
       dispatch(getNotificationsPostAsync(objectForNotification));
     },3000)
  };
  const Delebar = useSelector(selectcurrentDeliveryData)

        
  useEffect(()=>{
     
   return ()=>{
    setRouterManger(false)
   }
  }, [Delebar, refresh])

  const longi = useSelector(selectlongitude);
  const lati = useSelector(selectlatitude)

  const getCurrentUserLocation = useCallback(() => {
                  
  
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
         
         let  lg = latitude;
        let  lo = longitude;
    
          const passdata = { longitude: lo, latitude: lg };
          dispatch(setLongiLatitAsync(passdata));
        });
      }

    
  }, [dispatch]);
  const order = useSelector(SelectOutForDelivery); 


  useEffect(()=>{
    dispatch(getCurrentDeliveryItemAsync(currentUser[0]?.userid))
      dispatch(getOutForDeliveryAsync(currentUser[0]?.userid));

  }, [dispatch])





  useEffect(()=>{
    if(OutForDelivery.length !==0){
     // setDeleBar([OutForDelivery[0]])
    }  
    
    }, [OutForDelivery])

  getCurrentUserLocation();
  return (
    <>
     
      {longi != -1 &&  lati!= -1 &&
      <>
      <RefreshBar state={refresh} Setstate = {setRefresh} > </RefreshBar>

      <div>
         <h1 className='display-4 bhag'> Maps </h1><hr></hr>
         </div>
    <div className='m-2'> 

    <div className='row mt-5'> 
    <div class="col-12 col-sm-8 col-xl-8 shadow  rounded"> 

      <MapContainer center={[lati, longi]} zoom= {13}>
       
       <TileLayer
           attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
       
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
       
       />  
       
      {(RouterManger && Delebar.length !==0 )? <> 
        < RouteMap2  order = {[{"hu":87}]} startPoint={{
                                   name: "Start Point",
                                   latitude:  lati ,
                                   longitude:  longi ,
                                }} 
                                endPoint={  {
                                  name: "End Point",
                                  latitude:   Delebar[0].latitude,
                                  longitude:  Delebar[0].longititu,
                                }} />
      </>
       : <> </>}  

          
      
         </MapContainer>
      </div>
      <div class="col-12 col-md-3 mt-2  bhag">     
      
      <h3 className='display-4  mx-3 '> Get Direction From Google Maps</h3>
      <div className='mx-4'> 
      <div className='' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' /* Add other necessary styles */ }}>


       <svg  style={{height:"70%", width: "70%" }}
  xmlns="http://www.w3.org/2000/svg"
  data-name="Layer 1"
  width="721.11239"
  height="582.53467"
  viewBox="0 0 721.11239 582.53467"
  xmlnsXlink="http://www.w3.org/1999/xlink"
>
  <path
    d="M719.63469,741.26733l-.153-.01452L480.3662,719.04034,262.93028,739.239a21.49791,21.49791,0,0,1-23.39415-19.41735q-.09207-.99134-.09215-1.988V200.70651a21.40162,21.40162,0,0,1,19.50937-21.40539l221.41288-20.56845.153.01452,239.11545,22.21245L937.06956,160.761a21.49792,21.49792,0,0,1,23.39429,19.41721q.0921.99142.09216,1.98819V699.29309a21.40186,21.40186,0,0,1-19.50927,21.40576Z"
    transform="translate(-239.4438 -158.73267)"
    fill="#3f3d56"
  />
  <path
    d="M572.76414,350.0441c-46.28643-33.7103-94.98727-65.67591-144.73815-95.00394l-2.49707-1.47175v99.46885H576.87376Zm-143.92791-.31421V259.36456c47.32852,27.9968,93.67273,58.37488,137.86749,90.36536Zm378.18,204.73386q-30.02664-31.21739-61.60767-61.01252Q736.702,485.22838,727.888,477.1377q-53.79025-49.412-111.11915-93.98694l-.44653-.34726H425.52892V557.26672H809.712Zm-378.18-.50434V386.11087H615.18938q55.27881,42.99975,107.5639,90.81186,9.07855,8.29728,18.03345,16.727,31.3038,29.419,61.14459,60.30969Zm378.18.50434q-30.02664-31.21739-61.60767-61.01252Q736.702,485.22838,727.888,477.1377q-53.79025-49.412-111.11915-93.98694l-.44653-.34726H425.52892V557.26672H809.712Zm-378.18-.50434V386.11087H615.18938q55.27881,42.99975,107.5639,90.81186,9.07855,8.29728,18.03345,16.727,31.3038,29.419,61.14459,60.30969ZM572.76414,350.0441c-46.28643-33.7103-94.98727-65.67591-144.73815-95.00394l-2.49707-1.47175v99.46885H576.87376Zm-143.92791-.31421V259.36456c47.32852,27.9968,93.67273,58.37488,137.86749,90.36536Zm143.92791.31421c-46.28643-33.7103-94.98727-65.67591-144.73815-95.00394l-2.49707-1.47175v99.46885H576.87376Zm-143.92791-.31421V259.36456c47.32852,27.9968,93.67273,58.37488,137.86749,90.36536Zm378.18,204.73386q-30.02664-31.21739-61.60767-61.01252Q736.702,485.22838,727.888,477.1377q-53.79025-49.412-111.11915-93.98694l-.44653-.34726H425.52892V557.26672H809.712Zm-378.18-.50434V386.11087H615.18938q55.27881,42.99975,107.5639,90.81186,9.07855,8.29728,18.03345,16.727,31.3038,29.419,61.14459,60.30969ZM261.83113,587.033v3.30737H392.45531v47.95673H261.83113v3.30737H395.76265V587.033Zm163.69779,84.33771v33.51184l3.30737-.306V674.678H938.16978v-3.30737Zm512.64086-81.03034V587.033H425.52892v54.57147H938.16978v-3.30737H428.83626V590.34033Zm-308.866-240.6105A1613.79575,1613.79575,0,0,0,428.83626,217.6422v-33.487l-3.30738.30592v33.74622l2.54673,2.80012A1610.4861,1610.4861,0,0,1,627.73247,352.69l.44653.34726H938.16978v-3.30737Zm-236.84851,0H261.83113v3.30737H395.76265V187.22276l-3.30737.30593ZM938.16978,382.8035H665.65166l3.56372,2.927q50.32928,41.41231,98.832,87.84354,6.896,6.59811,13.74219,13.30383,34.08224,33.301,66.83355,68.77655l2.72663,1.61236h86.82v-3.30737H851.55821q-32.39565-35.12421-66.1969-68.21429-6.75906-6.623-13.56817-13.155-47.45271-45.53-96.93085-86.47922H938.16978ZM261.83113,671.37067V674.678H392.45531v33.272l3.30737-.30591V671.37067Zm0-288.56717v3.30737H392.45531V553.95941H261.83113v3.30737H395.76265V382.8035Zm310.933-32.7594c-46.28643-33.7103-94.98727-65.67591-144.73815-95.00394l-2.49707-1.47175v99.46885H576.87376Zm-143.92791-.31421V259.36456c47.32852,27.9968,93.67273,58.37488,137.86749,90.36536Zm378.18,204.73386q-30.02664-31.21739-61.60767-61.01252Q736.702,485.22838,727.888,477.1377q-53.79025-49.412-111.11915-93.98694l-.44653-.34726H425.52892V557.26672H809.712Zm-378.18-.50434V386.11087H615.18938q55.27881,42.99975,107.5639,90.81186,9.07855,8.29728,18.03345,16.727,31.3038,29.419,61.14459,60.30969ZM572.76414,350.0441c-46.28643-33.7103-94.98727-65.67591-144.73815-95.00394l-2.49707-1.47175v99.46885H576.87376Zm-143.92791-.31421V259.36456c47.32852,27.9968,93.67273,58.37488,137.86749,90.36536Zm378.18,204.73386q-30.02664-31.21739-61.60767-61.01252Q736.702,485.22838,727.888,477.1377q-53.79025-49.412-111.11915-93.98694l-.44653-.34726H425.52892V557.26672H809.712Zm-378.18-.50434V386.11087H615.18938q55.27881,42.99975,107.5639,90.81186,9.07855,8.29728,18.03345,16.727,31.3038,29.419,61.14459,60.30969Z"
    transform="translate(-239.4438 -158.73267)"
    fill="#fff"
  />
  <path
    d="M608.77959,376.37775c0,41.88122-75.83267,135.18-75.83267,135.18s-75.83267-93.29876-75.83267-135.18a75.83267,75.83267,0,0,1,151.66534,0Z"
    transform="translate(-239.4438 -158.73267)"
    fill="#6c63ff"
  />
  <path
    d="M567.61419,373.08068a34.66638,34.66638,0,1,1-34.66638-34.66638A34.65047,34.65047,0,0,1,567.61419,373.08068Z"
    transform="translate(-239.4438 -158.73267)"
    fill="#fff"
    style={{ isolation: "isolate" }}
  />
  <circle cx="293.50312" cy="387.1146" r="20.44185" fill="#6c63ff" />
  <circle cx="489.36398" cy="100.27214" r="30.22324" fill="#ff6584" />
  <path
    d="M823.58447,352.14173H675.31834a3.02384,3.02384,0,0,1-.55407-.0439l70.12308-121.46324a4.90981,4.90981,0,0,1,8.54664,0l47.06138,81.51127,2.25462,3.90031Z"
    transform="translate(-239.4438 -158.73267)"
    fill="#fff"
  />
  <polygon
    points="584.141 193.409 533.519 193.409 558.369 157.313 560.157 154.713 561.052 153.413 563.306 157.313 584.141 193.409"
    opacity="0.2"
    style={{ isolation: "isolate" }}
  />
  <path
    d="M906.138,352.14173H777.9l24.85-36.09556,1.78829-2.60022,32.38181-47.03945c2.12294-3.08293,7.23007-3.27491,9.726-.58148a5.853,5.853,0,0,1,.46631.58148Z"
    transform="translate(-239.4438 -158.73267)"
    fill="#fff"
  />
  <circle cx="676.20989" cy="349.33488" r="15.2965" fill="#fff" />
  <polygon
    points="677.685 395.409 674.552 395.409 675.98 347.031 677.685 395.409"
    fill="#cbcbcb"
  />
  <polygon
    points="676.256 356.2 679.62 351.546 676.21 357.352 675.842 356.707 676.256 356.2"
    fill="#cbcbcb"
  />
  <polygon
    points="675.888 360.899 672.524 356.246 675.934 362.051 676.302 361.406 675.888 360.899"
    fill="#cbcbcb"
  />
  <circle cx="632.71557" cy="327.36152" r="22.59163" fill="#fff" />
  <polygon
    points="634.893 395.409 630.266 395.409 632.376 323.959 634.893 395.409"
    fill="#cbcbcb"
  />
  <polygon
    points="632.784 337.5 637.751 330.628 632.716 339.202 632.172 338.249 632.784 337.5"
    fill="#cbcbcb"
  />
  <polygon
    points="632.24 344.441 627.272 337.569 632.308 346.142 632.852 345.19 632.24 344.441"
    fill="#cbcbcb"
  />
  <circle cx="108.20989" cy="349.33488" r="15.2965" fill="#fff" />
  <polygon
    points="109.685 395.409 106.552 395.409 107.98 347.031 109.685 395.409"
    fill="#cbcbcb"
  />
  <polygon
    points="108.256 356.2 111.62 351.546 108.21 357.352 107.842 356.707 108.256 356.2"
    fill="#cbcbcb"
  />
  <polygon
    points="107.888 360.899 104.524 356.246 107.934 362.051 108.302 361.406 107.888 360.899"
    fill="#cbcbcb"
  />
  <circle cx="64.71557" cy="327.36152" r="22.59163" fill="#fff" />
  <polygon
    points="66.893 395.409 62.266 395.409 64.376 323.959 66.893 395.409"
    fill="#cbcbcb"
  />
  <polygon
    points="64.784 337.5 69.751 330.628 64.716 339.202 64.172 338.249 64.784 337.5"
    fill="#cbcbcb"
  />
  <polygon
    points="64.24 344.441 59.272 337.569 64.308 346.142 64.852 345.19 64.24 344.441"
    fill="#cbcbcb"
  />
</svg> </div>
<div className='bhag'> 

<button class="btn btn-primary mt-4  btn-sm " onClick={()=>{
  if(Delebar.length !==0){

    openGoogleMaps( Delebar[0]?.latitude ,  Delebar[0]?.longititu)
  }
}}>Open Google Map</button>
</div>

</div>

      </div>

      <div className='col-3'> 

      </div>
    </div>

    <div class="row g-0">
  <div class="col-sm-6 col-md-8">
 {Delebar.length !=0  && Delebar[0]?.id? 
  <section className=" mt-3 p-2" style={{}}>
  <div className="container h-100">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col">
        <p>
          <span className="display-6">Current Delivery Details</span>
          <span className="h4">(1 item in your cart)</span>
        </p>
        <div className="card mb-4 shadow">
          <div className="card-body p-4">
            <div className="row align-items-center">
              <div className="col-md-2">
                <img
                  src= {Delebar[0].Address[0].logo}
                  className="img-fluid"
                  alt="Food placeholder image"
                />
              </div>
              <div className="col-md-2 d-flex justify-content-center">
                <div>
                  <p className="small text-muted mb-4 pb-2">Order Placed Timing  : {Delebar[0].OrderPlacedTime}</p>
                  <p className="lead fw-normal mb-0 bhag">{{...Delebar[0].Address[0]}["First-name"]}{"   "} {{...Delebar[0].Address[0]}["Last-name"]}</p>
                </div>
              </div>
              <div className="col-md-2 d-flex justify-content-center bhag">
                <div>
                  <p className="small text-muted mb-4 pb-2 bhag">Phone No :</p>
                  <p className="lead fw-normal mb-0 bhag">
                    
                    <i
                      className="fas fa-circle me-2"
                      style={{ color: "#fdd8d2" }}
                    />
                    {{...Delebar[0].Address[0]}.phone}
                  </p>
                </div>
              </div>
              <div className="col-md-2 d-flex justify-content-center">
                <div>
                  <p className="small text-muted mb-4 pb-2 bhag">Address</p>
                  <p className="lead fw-normal mb-0">{{...Delebar[0].Address[0]}["city"]} { ", "}{{...Delebar[0].Address[0]}["address-1"]}  </p>
                </div>
              </div>
              <div className="col-md-2 d-flex justify-content-center">
                <div>
                  <p className="small text-muted mb-4 pb-2">State</p>
                  <p className="lead fw-normal mb-0">{{...Delebar[0].Address[0]}["state2"]} </p>
                </div>
              </div>
              <div className="col-md-2 d-flex justify-content-center">
                <div>
                  <p className="small text-muted mb-4 pb-2">Pin-Code :</p>
                  <p className="lead fw-normal mb-0">{{...Delebar[0].Address[0]}["pin-code"]}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="">
          <div className="card-body p-2">
            <div className="float-end">
              <p className="mb-0 me-5 d-flex align-items-center">
                <span className="small text-muted me-2">Order total:</span>{" "}
                <span className="lead fw-normal p-3">{Delebar[0].totalAmount}</span>
              </p>
            </div>
          </div>
        </div>
        </div>
       
       
        <div className="d-flex justify-content-end">
          <button type="button" className="btn btn-light btn-sm me-2">
           Cancel Delivery
          </button>
          <button type="button" className="btn btn-primary btn-sm" onClick={()=>{
            const argument = Delebar[0]; 
                   handleStatusChangeForDelivered(argument); 
                 
          }}>
            Delivered
          </button  >
        </div>
      </div>
    </div>
  </div>
</section> : <div className='display-5 bhag mt-5'>  
       Add Delivery Item </div>
 
 }



  </div>
  <div class="col-12 col-md-4 p-4">
          <h2 className='display-6'> UpComming Deliverys </h2>
         {OutForDelivery.map((element, index)=>( 
          element.id !==(Delebar.length !==0?  Delebar[0]?.id : -1) ?   <div  key = {index+element.OrderPlacedTime } className="bg-white card mb-4 order-list shadow-sm">
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
                  <div className="btn btn-sm btn-outline-primary" onClick={()=> openGoogleMaps(element.latitude, element.longititu)
                  
                  }>
                    <i className="icofont-headphone-alt mx-1 bhag" /> Check Location On Map
                  </div>
                  <div className="btn btn-sm btn-primary" onClick={()=>{

                    dispatch(getUpdateNewDeliverAsync(element))
                 
                     dispatch(getUpdateOutForDeliveryAsync({id: element.id, currentDelivery: true }))
                  dispatch(getUpdateOrderStatusAsync({id: element.DeliveryId, status: "Out for Delivery"} )) ; 
                  
                  const objectForNotification = {messege: `Your Order is Out for Delivery`, for: element.Address[0].userid, time: Date.now(), logo: element.logo,  status: "unRead",
                link: "/OrderCart", buttonData: "Track Order"
                
                }; 

                  dispatch(getNotificationsPostAsync(objectForNotification));
                  }}>
                    <i className="icofont-refresh" /> Start Delivery
                  </div>
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
        </div> :<></>
         ))}
  </div>
</div>
    </div>
       
      </>
      }
    </>
  );
}

export default Delivery;

const RouteMap2 = ({ startPoint, endPoint, mapProjection }) => {
  const map2 = useMap();
   const [map, setMap] = useState(map2)
  useEffect(() => {
    try{

      if ( map?.removeLayer!=null) {
   

        if (map && startPoint && endPoint ) {
          map?.eachLayer((layer) => {
            if (layer instanceof L.Marker || layer instanceof L.Polyline) {
              map?.removeLayer(layer);
            }else{
              //  navigate('/OrderCart')
            }
          });
  
          const waypoints = [
            L.Routing.waypoint(
              L.latLng(startPoint.latitude, startPoint.longitude),
              startPoint.name
            ),
            L.Routing.waypoint(
              L.latLng(endPoint.latitude, endPoint.longitude),
              endPoint.name
            ),
          ];
  
          const startIcon = L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/651/651110.png',
            iconSize: [32, 32],
          });
  
          const endIcon = L.icon({
            iconUrl: 'https://p1.hiclipart.com/preview/962/554/474/pizza-logo-food-delivery-meal-delivery-service-pizza-restaurant-pizza-delivery-online-food-ordering-zomato-png-clipart.jpg',
            iconSize: [32, 32],
          });
  
          L.Routing.control({
            waypoints,
            createMarker: (i, wp, nWps) => {
              if (i === 0) {
               
                return L.marker(wp.latLng, { icon: startIcon });
              } else if (i === nWps - 1) {
            
                return L.marker(wp.latLng, { icon: endIcon });
              } else {
                const intermediateIcon = L.icon({
                  iconUrl: 'https://png.pngtree.com/png-vector/20190419/ourmid/pngtree-vector-location-icon-png-image_956422.jpg', // Replace with the actual URL
                  iconSize: [32, 32],
                });
                return L.marker(wp.latLng, { icon: intermediateIcon });
              }
            },
          }).addTo(map);
        
      }
  
      return()=>{
        runStop = false
  
      }
    }
    }  catch{
      runStop = false
    }
    
  }, [startPoint, endPoint, mapProjection]);

};