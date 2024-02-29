import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AdminFilterOrderUpdateAsync, OutForDeliveryItemDeleteAsync, SelectAppliedForDelivery, SelectDeliveryBoy, SelectOrderReq, getAllOrderDataAsync, getAllOrderDataByFilterAsync, getDeliveryUserDataAsync, getNotificationsPostAsync, getOutForDeliveryPostAsync, getUpdateOrderStatusAsync, selectOderData, selectPreviousUserData, selectlatitude, selectlongitude, selectuser } from '../../features/counter/counterSlice';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import Draggable from 'react-draggable';
import { useMediaQuery } from 'react-responsive';
import Swal from 'sweetalert2';
import { PropagateLoader } from "react-spinners";
import RefreshBar from '../../features/counter/RefreshBar';
import { getStatusStyle } from '../../features/counter/AllUser';
import { scrollToBottom } from '../../features/counter/UserActivity';
import { ScrollTotop } from '../../ProductGrids/ProductGrid';

let runStop = true;
const override = {
  display: "block",
  margin: "10 auto",
  borderColor: "red",
  
};

const orderStatuses = [
  'Prepraing',
  'Cooking',
  'Out for Delivery',
  'Delivered',
  'Cancelled',
  'On Hold',
];

    
  
  const containerStyle = {
    position: 'fixed',
    top: '80px', 
    left: '40px', 
    width: '30%', 
    height: '72vh', 
    backgroundColor: '#f0f0f0',
    border: '1px solid #999',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    zIndex: 9999
  };
const AllAdminOrders = () => {

  
  const [refresh, setRefresh] = useState(false);



  const AppliedForDelivery = useSelector(SelectAppliedForDelivery)

 
  const isLargeScreen = !useMediaQuery({ maxWidth: 768 });

  const dispatch = useDispatch();
  const currentUser = useSelector(selectuser);
  const orders = useSelector(selectOderData)
const deliveryBoy = useSelector(SelectDeliveryBoy);
const OrderReq = useSelector(SelectOrderReq)
const prevUserData = useSelector(selectPreviousUserData)

const longitide = useSelector(selectlongitude)
 const latitude = useSelector(selectlatitude)
const [r, setOrders] = useState([]);
const [mapProjection, setmapProjection] = useState(false); 

useEffect(()=>{
    dispatch(getAllOrderDataAsync())
},[ refresh ])

useEffect(()=>{
  dispatch(getDeliveryUserDataAsync("Delivery"))
}, [AppliedForDelivery,refresh])



  const handleStatusChange = async (orderDataPatch, newStatus) => {
    const updatedOrders = orders.map((order, index) => {
      if (order._id === orderDataPatch._id) {
        if(newStatus== "Cooking"){
          return { ...order, status: newStatus, DeliveryReq: order?.DeliveryReq?.length?  [...order?.DeliveryReq] : [] };
        }
        else{
          return { ...order, status: newStatus };
        }
      
      }
      return order;
    });
    let tempObject = {...orderDataPatch, status: newStatus}
    if(newStatus== "Cooking"){
      tempObject.DeliveryReq = []
    }
          const  logoArray = await orderDataPatch.OrderProducts.map((element, index)=>{
            return element.item.thumbnail
          })
    const objectForNotification = {messege: `Your Order is ${newStatus}`, for: orderDataPatch.Address[0].userid, time: Date.now(), logo: logoArray, Lable: `Order Status:${newStatus}`, status: "unRead"}; 

     dispatch(getNotificationsPostAsync(objectForNotification));
     dispatch(getUpdateOrderStatusAsync(tempObject))
     dispatch(AdminFilterOrderUpdateAsync(updatedOrders))
  };


  const customIconn = new Icon ({
    iconUrl: "https://png.pngtree.com/png-clipart/20230123/original/pngtree-flat-red-location-sign-png-image_8927579.png",
    iconSize: [38,38]
  });
    
  const [Delebar , setDeleBar] = useState(null )

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

        let tempObject = {...orderData, DeliveryReq: [ ] , DeliveryReqBy: "", AcceptStatus: "" }
        dispatch(getUpdateOrderStatusAsync(tempObject))
        dispatch(OutForDeliveryItemDeleteAsync( orderData._id))

        const updatedOrders = orders.map((order) => {
    
          if (order._id === orderData._id) {
            return { ...order,  DeliveryReq: [ ], DeliveryReqBy: "", AcceptStatus: "" };
          }
          return order;
        });
        dispatch(AdminFilterOrderUpdateAsync(updatedOrders))
        Swal.fire({
          title: "Removed!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
   


  }

  async function AcceptRequestForDelivery ( order){

        dispatch(getUpdateOrderStatusAsync({...order, AcceptStatus: "Accepted", DeliveryReqBy: ""})); 
        const updatedOrders = orders.map((orderElement) => {
    
          if (orderElement._id === order._id) {
            return { ...orderElement,   AcceptStatus: "Accepted" };
          } else {
            return orderElement;
          }
         
        });
        dispatch(AdminFilterOrderUpdateAsync(updatedOrders))

        const logoArray= await order.OrderProducts.map((element)=>{
          return element.item.thumbnail
        })

           const postData = { for: order.DeliveryReq[0].userid, DeliveryId: order._id, Address: order.Address,longititu : order.longititu, latitude: order.latitude, totalAmount: order.totalAmount , OrderPlacedTime: order.OrderPlacedTime, customerName: order.name,currentDelivery: false, logo: logoArray 
          };
      
    dispatch(getOutForDeliveryPostAsync( postData))
  }
  
  return (
    
    <>
{isLargeScreen ?<div className=" mt-3 shadow">


<RefreshBar state={refresh} Setstate = {setRefresh} > </RefreshBar>


      {/* Your component content */}
     
     


    
 
      { latitude !=1 &&  longitide !=1  && 
          
      <div className='containter' onMouseEnter={()=>{
        ScrollTotop();
      }}> 
       
          <Draggable> 
       <div style={containerStyle}>
       <MapContainer center={[latitude, longitide]} zoom= {11}>
       
       <TileLayer
           attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
       
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
       
       />
            { Delebar?.deliLongitide &&  Delebar?.deliLatitude &&  mapProjection && 
         
                   
  
         < RouteMap  order = {Delebar} startPoint={{
                                   name: "Start Point",
                                   latitude: Delebar.length !=0 ? Delebar.deliLatitude : "77.56546" ,
                                   longitude:  Delebar.length !=0 ? Delebar.deliLongitide : "12.8575",
                                }} 
                                endPoint={  {
                                  name: "End Point",
                                  latitude:  Delebar.length !=0? Delebar?.latitude : "45.7876",
                                  longitude: Delebar.length !=0? Delebar?.longititu : "75.9753",
                                }} />
                                
                                 }

                                 
      
         </MapContainer>
         
         <div className="d-flex justify-content-between pt-2">
                        <p className="fw-bold mb-0">Order Details</p>
                        <p className="text-muted mb-0">
                          <span className="fw-bold me-4" >Total</span> ${Delebar?.totalAmount}
                        </p>
                      </div>
                      <div className="d-flex justify-content-between pt-2">
                        <p className="text-muted mb-0">Order Date: {Delebar?.OrderPlacedTime}</p>
                        <p className="text-muted mb-0">
                          <span className="fw-bold me-4">Delivery Charges</span> Free
                        </p>
                      </div>
                      <div
                        className="card-footer border-0"
                        style={{
                          backgroundColor: "#a8729a",
                        
                          border: 10,
                          height: "10%",
                          width: "100%"
                        }}
                      >
                        <p className="d-flex align-items-center justify-content-end text-white text-center text-uppercase mb-0">
                          Total Amount: <span className="h2 mb-0 ms-2 ">{Math.round(Delebar?.totalAmount) }</span>
                        </p>
                      </div>
       
       

    </div>
    </Draggable>
    <div className='shadow-lg bg-body rounded mx-1' > 
        <MapContainer center={[latitude, longitide]} zoom= {13}>
       
        <TileLayer
            attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        
           url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        
        />
              {orders.map((order, index)=>(
          <>   
 
  
          <Marker  key={index}
        position={[order.latitude, order.longititu] }
         icon={customIconn}
> 



 <Popup> 
 <div key={index*3*7} style={{ height: '200px', width: '100%', overflowY: 'auto' }}>

   <div className="card-body p-1 gradient-custom"  key={index}>

   
                            
                          
                      <div className="d-flex justify-content-between align-items-center mb-4">
                      { order?.deliLongitide &&  order?.deliLatitude ?
                      <button onClick={()=>{
                              setmapProjection(true)
                              setDeleBar(order)
                            }} className='btn-primery mx-2'> Check delivery location</button> : <></>}


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
                                <div className="d-flex justify-content-around mb-1">
  {order.status === 'Prepraing' && (
    <p className="text-muted mt-1 mb-0 small ms-xl-5">
      Prepraing
    </p>
  )}
  {order.status === 'Cooking' && (
    <p className="text-muted mt-1 mb-0 small ms-xl-5">
      Cooking
    </p>
  )}
  {order.status === 'Out for Delivery' && (
    <p className="text-muted mt-1 mb-0 small ms-xl-5">
      Out for Delivery
    </p>
  )}
  {order.status === 'Delivered' && (
    <p className="text-muted mt-1 mb-0 small ms-xl-5">
      Delivered
    </p>
  )}
  {order.status === 'On Hold' && (
    <p className="text-muted mt-1 mb-0 small ms-xl-5">
      {order.status}
    </p>
  )}
  {order.status === 'Cancelled' && (
    <p className="text-muted mt-1 mb-0 small ms-xl-5">
      {order.state}
    </p>
  )}
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
                    </div>
                    
                    </Popup>

                    

</Marker>

</>
            ))}
        
       
          </MapContainer>
          </div>
          </div> 
      }
          
       
      <table className="table table-bordered main mt-3" onMouseEnter={()=>{
        scrollToBottom()
      }}>
                         <div className=''  style={{   height: '700px',
    width: '100%',
    overflowY: 'auto',
    top: 0, }}> 

        <thead className='mb-4' style={{  
    position: 'sticky',
    top: "0px",
    width: "100%",
    zIndex: "999" }} >
          <tr>
            <th>Total Amount</th>
            <th className='bhag'> Status
            <select  style={{height: "100%", width: "60%"}}
                      className="form-control m-2"
                      id="exampleFormControlSelect1"
                      onChange={(e)=>{
                        if(e.target.value == "Select Stutus"){
                          dispatch(getAllOrderDataAsync()); 
                        } else{
                          dispatch(getAllOrderDataByFilterAsync(e.target.value))
                        }
                        
                      }}
                    > 

                    <option> Select Stutus</option>
                       {orderStatuses.map((element, index)=>(
                        <option key={index+element}> {element}</option>
                       ))} 
                    </select>

            </th>
            <th>Order Products</th>
            <th>Order Placed Time</th>
            <th>Address</th>
            <th>Belongs To</th>
            <th>Name</th>
          </tr>
        </thead>
      
        <tbody  className='mb-3'  >
          {orders.length !=0 && orders.map((order) => (
            <tr key={order._id}  >
              
              <td>{order.totalAmount}</td>
              <td>
              <div className="dropdown">
  <button
    className={`btn btn-sm ${order.status === 'Authorized' ? 'btn-primary' : 'btn-success'} dropdown-toggle`}
    type="button"
    data-bs-toggle="dropdown"
  >
    {order.status}
  </button>
  <ul className="dropdown-menu" aria-labelledby={`status${order._id}`}>
    
    <li>
      <a
        className={`dropdown-item ${order.status === 'Prepraing' ? 'active' : ''}`}
        href="#"
        onClick={() => handleStatusChange(order, 'Prepraing')}
      >
        Prepraing
      </a>
    </li>
    <li>
      <a
        className={`dropdown-item ${order.status === 'Cooking' ? 'active' : ''}`}
        href="#"
        onClick={() => handleStatusChange(order, 'Cooking')}
      >
Cooking       </a>
    </li>
    <li>
      <a
        className={`dropdown-item ${order.status === 'Out for Delivery' ? 'active' : ''}`}
        href="#"
        onClick={() => handleStatusChange(order, 'Out for Delivery')}
      >
        Out for Delivery
      </a>
    </li>
    <li>
      <a
        className={`dropdown-item ${order.status === 'Delivered' ? 'active' : ''}`}
        href="#"
        onClick={() => handleStatusChange(order, 'Delivered')}
      >
        Delivered
      </a>
    </li>
    <li>
      <a
        className={`dropdown-item ${order.status === 'Cancelled' ? 'active' : ''}`}
        href="#"
        onClick={() => handleStatusChange(order, 'Cancelled')}
      >
        Cancelled
      </a>
    </li>
    <li>
      <a
        className={`dropdown-item ${order.status === 'On Hold' ? 'active' : ''}`}
        href="#"
        onClick={() => handleStatusChange(order, 'On Hold')}
      >
       On Hold
      </a>
    </li>
  </ul>
</div> 

       <div className='mt-3'> 
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
        {order.status ==="Cooking" ? 
       <> {  order?.DeliveryReq?.length !=0? <h4> Delivery Boys</h4> :<>
<div className='mt-3' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>


  <PropagateLoader     
  color={"#c3d636"} 
  loading={order?.DeliveryReq?.length === 0}
  cssOverride={{
    height: "30px",  // Set your desired height
    width: "50px",   // Set your desired width
  }}
  size={20}
  aria-label="Loading Spinner"
  data-testid="loader"
/>
</div>

<div className='bhag'> 

<h5 className=''> Waiting For Accept Delivery Request....</h5>
</div>
       </>}</> 
       : <> 
       
       </>  } 
       
       
       <div className='mt-3'  style={{ height: '120px', width: '100%', overflowY: 'auto' }} >
             
          { order?.DeliveryReq?.length ? 
               order?.DeliveryReq.map((data, index)=>(
                <tr key={index +data.title}>
                <td>
                  <div className="widget-26-job-emp-img">
                    <img style={{height: "55px"}}
                      src= {data.logo}
                      alt="Company"
                    />
                  </div>
                </td>
                <td>
                  <div className="widget-26-job-title bhag">
                    <a href="#">
                     {data.title}
                    </a>
                    <p className="mx-2 ">
                      <a href="#" className="employer-name">
                      {data["First-name"]} {" "} {data["Last-name"]}
                      </a>{" "}
                     
                    </p>
                  </div>
                </td>
                <td>
                  <div className="widget-26-job-info">
                   
                    <p className="text-muted m-0">
                      in <span className="location">{data.location}</span>
                    </p>
                  </div>
                </td>
                <td>
                  <div className="widget-26-job-salary">{data.salary}</div>
                </td>
                <td>
                  <div className="widget-26-job-category bg-soft-base">
                    <i className="indicator bg-base" />
                    <span>{data.title}</span>
                  </div>
                </td>
                <td>
                <div className="widget-26-job-starred d-flex">
                  {order?.AcceptStatus != "Accepted" ? 
                  <> 
                  
                  <button
    type="button"
    className="btn btn-danger mx-3 btn-sm"
    onClick={() => {
      AcceptRequestForDelivery(order)    }}
  >
    Accept
  </button>
  <button
    type="button"
    className="btn btn-primary mx-3 btn-sm"
    onClick={() => {
      removeReq(order);
    }}
  >
    Remove
  </button>
                  </> 
  
  
  : <></> }


 
</div>
               
               
                </td>
               </tr>
           )): <></>
                    

          }

       </div>
              </td>
              <td>
                <ul>
                <div style={{ maxHeight: '200px', overflowY: 'auto' }}>

                  {order.OrderProducts.map((product, index) => (
                    <li key={product._id +index}>
                      <strong>Size:</strong> {product.Size}
                      <br />
                      <strong>User ID:</strong> {product.userid}
                      <br />
                      <strong>Spic:</strong> {product.spic}
                      <br />
                      <strong>Cheese:</strong> {product.Cheese}
                      <br />
                      <strong>Quantity:</strong> {product.quantity}
                      <br />
                      <strong>Time:</strong> {product.time}
                      <br />
                      <strong>Item ID:</strong> {product.item._id}
                      <br />
                      <strong>Item Name:</strong> {product.item.name}
                      <br />
                      <strong>Item Description:</strong> {product.item.description}
                    </li>
                  ))} </div>
                </ul>
              </td>
              <td>{order.OrderPlacedTime}
              
              </td>
              <td>
                <ul>
                <div style={{ maxHeight: '200px', overflowY: 'auto' }}>

                  {order.Address.map((address, index) => (
                    <li key={address._id +index}>
                      <strong>First Name:</strong> {address["First-name"]}
                      <br />
                      <strong>Last Name:</strong> {address["Last-name"]}
                      <br />
                      <strong>Phone:</strong> {address.phone}
                      <br />
                      <strong>Address 1:</strong> {address["address-1"]}
                      <br />
                      <strong>Address 2:</strong> {address["address-2"]}
                      <br />
                      <strong>City:</strong> {address.city}
                      <br />
                      <strong>Country:</strong> {address.country}
                      <br />
                      <strong>Pin Code:</strong> {address["pin-code"]}
                      <br />
                      <strong>State:</strong> {address.state}
                      <br />
                      <strong>State 2:</strong> {address.state2}
                      <br />
                      <strong>User ID:</strong> {address.userid}
                    </li>
                  ))} </div>
                </ul>
              </td>
              <td>{order.belngto}</td>
              <td>{order.name}</td>
            </tr>  
          ))}
        </tbody>
        </div>
      </table> 
       

      
      </div> :  <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="alert alert-warning text-center">
            <h4 className="alert-heading">Switch to Desktop Mode</h4>
            <p>This page is best viewed on a larger screen. Please switch to desktop mode for an optimal experience.</p>
          </div>
        </div>
      </div>
    </div>
    
    
    }
      </>
  );
};



export default AllAdminOrders;


const RouteMap = ({ startPoint, endPoint, mapProjection }) => {
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