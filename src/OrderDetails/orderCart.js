import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDataAsync, selectOderData, selectlatitude, selectlongitude, selectuser } from "../features/counter/counterSlice";
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { Icon } from 'leaflet';
import "leaflet/dist/leaflet.css";
import 'leaflet-routing-machine';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import RefreshBar from "../features/counter/RefreshBar";
import { getStatusStyle } from "./Hooks";
import { RouteMap } from "./components/RouteMap";
function OrderCart() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectuser);
  const orderData = useSelector(selectOderData);
  const longitide = useSelector(selectlongitude)
  const latitude = useSelector(selectlatitude)
  const navigate=useNavigate()
  const [refresh, setRefresh] = useState(false);
  const [renderCount, setRenderCount] = useState(1);
 
  useEffect(()=>{
    dispatch(getOrderDataAsync(currentUser?.uid));

  }, [refresh])
  return (
    <>
      {orderData.length !== 0 && (
        
        <section className="h-100 gradient-custom">
         
         <RefreshBar state={refresh} Setstate = {setRefresh} > </RefreshBar>

          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-lg-10 col-xl-8">
                <div className="card" style={{ borderRadius: 10 }}>
                  <div className="card-header px-4 py-5">
                    <h5 className="text-muted mb-0">
                      Your Order Details,{" "}
                      <span style={{ color: "#a8729a" }}>{currentUser.displayName}</span>!
                    </h5>
                  </div>
                  {orderData.map((order, index) => (
                    <div className="card-body p-4 gradient-custom" key={index+ "Order Number: 1KAU9-84UIL"}>
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <p className="lead fw-normal mb-0" style={{ color: "#a8729a" }}>
                          Order Number: 1KAU9-84UIL
                        </p>
                        <p className="small text-muted mb-0">
                          Order Number: 1KAU9-84UIL
                        </p>
                      </div>
                      {order?.deliLongitide && order?.deliLatitude  &&
                        <>
                       

                        {latitude != -1 && longitide !=-1 && 
                        <MapContainer   center={[latitude, longitide]} zoom= {13}>

                        <TileLayer
                            attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        
                           url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                                   
                        />        
                        
                         
                         <RouteMap runState ={renderCount}  order = {orderData} startPoint={{
                             name: "Start Point",
                             latitude: order.length !=0 ? order.deliLatitude : "77.56546" ,
                             longitude:  order.length !=0 ? order.deliLongitide : "15.8575",
                          }} 
                          endPoint={  {
                            name: "End Point",
                            latitude:  order.length !=0? order?.latitude : "45.7876",
                            longitude: order.length !=0? order?.longititu : "75.9753",
                          }} /> 
                        
                          </MapContainer>  
                        }
  </> 

                      }
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
    Cancelled
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
                          <span className="fw-bold me-4">Total</span> ${order.totalAmount}
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
                        <h5 className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0">
                          Total Amount: <span className="h2 mb-0 ms-2">{order.totalAmount}</span>
                        </h5>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default OrderCart;






