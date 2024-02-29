import { useSelector } from "react-redux";
import { getAllUserDataAsync, getAllUserSearchDatatAsync, getEventObjectTargetUserDataAsync, getUpdateEventObjectDataAsync, selectAllUser, selectProducts, selectTargetUserEventObjectData, selecteventObjectData } from "./counterSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import TimeLineAmChart from "./TimeLineAmChart";
import * as am4core from "@amcharts/amcharts4/core";
import { convertTime } from "./AssignTask";
import './AllUser.css'
import { formatMessageTime } from "../../Chats/chatBox";
import Draggable from "react-draggable";
import { ScrollTotop } from "../../ProductGrids/ProductGrid";


export function scrollToBottom() {
  const totalHeight = document.body.scrollHeight;
  window.scrollTo({ top: totalHeight, behavior: 'smooth' });
}
let searchBarData= "";
const containerStyle = {
  backgroundColor: "white",
  position: 'fixed',
  top: '150x', 
  left: '20px', 
  width: '40%', 
  height: '50%', 
  padding: '5px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
  zIndex: 9999,
  overflow: "auto",
};

function UserActivity(){
      const dispatch = useDispatch(); 
    const TargetUserEventObjectData = useSelector(selectTargetUserEventObjectData)
    const [mapData,setmapData] = useState([])
    const [timeShifthour, settimeShifthour] = useState(0); 
    const [timeShiftday, settimeShiftday] = useState(0); 
    const [timeShiftmonth, settimeShiftmonth] = useState(0); 
    const [starDate, setstarDate] = useState(0); 
    const [endDate, setendDate] = useState(0); 
    const [zoom, setZoom] = useState(0); 
    const [uniqueCityData, setuniqueCityData] = useState([])

    const products = useSelector(selectProducts)

    const [ActiveIndex, setActiveIndex] = useState(-1)
    function getStartEndTime(starDate, endDate){
        setstarDate(starDate); 
        setendDate(endDate)
       }
    //    
    const AllUserData = useSelector(selectAllUser)
          useEffect(()=>{
                dispatch(getAllUserDataAsync())      
          }, [dispatch])
          useEffect(()=>{
            if(products.length !==0){
             const citySet = new Set();
             const cityCount = {}
             let uniqueCity = [];
             products.forEach(element => {
               if( !citySet.has(element.city)){
                 citySet.add(element.city)  
               }
          
              });
         
              products.forEach(element => {
               if (!cityCount.hasOwnProperty(element.city)) {
                 cityCount[element.city] = 1;
               } else {
                 cityCount[element.city]++;
               }
             });
         
             uniqueCity = Array.from(citySet);
             setuniqueCityData(uniqueCity)
            }
        
         }, [])


 
    useEffect(()=>{
      if(TargetUserEventObjectData?.actions?.length ){ 
      
        let colorSet = new am4core.ColorSet();
            
        const dataa=  TargetUserEventObjectData?.actions.map((element, index)=>{
                     const start = convertTime(element.Time, 0)
                     const end = convertTime(element.Time, 0);
                   
          return   {
                 "category": "",
                 "start":  start,
                 "end": end,
                 "color": colorSet.getIndex(index),
                 "icon": element.details.otherInfo,
                 "text": `${element.actionType} : ${element.details.itemName}`
             }
         })
        
             if(dataa.length !==0){
 
                 setmapData(dataa)
             }
     } else{
        setmapData([])
     }
    }, [TargetUserEventObjectData])
   
    return(< > 
    {TargetUserEventObjectData?.actions?.length && 
    
   <Draggable> 
       <div style={containerStyle}>
        <div className="bhag">  
          
         <h4 className=""> 
           {TargetUserEventObjectData.id}
          </h4> 
          </div>
          


        <section style={{ backgroundColor: "#eee" }}>
        
          <div className=" justify-content-center ">
      {TargetUserEventObjectData?.actions && TargetUserEventObjectData?.actions.map((event, index) => (
            
            <div  key ={index+event.Time }className="col-md-12">
              <div className="card shadow-0 border rounded-3">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12 col-lg-3 col-xl-3 mb-4 mb-lg-0">
                      <div className="bg-image hover-zoom ripple rounded ripple-surface">
                        <img
                          src={event.details.otherInfo}
                          className="w-100"
                        />
                        <a href="#!">
                          <div className="hover-overlay">
                            <div
                              className="mask"
                              style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}
                            />
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-6 col-xl-6">
                      <h5 className="text-success">{event.actionType}</h5>
                      <div className="d-flex flex-row">
                        <div className="text-danger mb-1 me-2">
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                          <i className="fa fa-star" />
                        </div>
                        <span >Time: {event.Time}</span>
                      </div>
                      <div className="mt-1 mb-0 text-muted small">
                        <span>100% cotton</span>
                        <span className="text-primary"> • </span>
                        <span>Light weight</span>
                        <span className="text-primary"> • </span>
                        <span>
                          Best finish
                          <br />
                        </span>
                      </div>
                      <div className="mb-2 text-muted small">
                        <span>Unique design</span>
                        <span className="text-primary"> • </span>
                        <span>For men</span>
                        <span className="text-primary"> • </span>
                        <span>
                          Casual
                          <br />
                        </span>
                      </div>
                      <p className="text-truncate mb-4 mb-md-0">
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have suffered alteration in some
                        form, by injected humour, or randomised words which don't look
                        even slightly believable.
                      </p>
                    </div>
                    <div className="col-md-6 col-lg-3 col-xl-3 border-sm-start-none border-start">
                      <div className="d-flex flex-row align-items-center mb-1">
                        <h4 className="mb-1 me-1">ID: {event.details.itemId}</h4>
                        <span className="text-danger">
                          <s>$20.99</s>
                        </span>
                      </div>
                      <h6 className="text-success">{event.details.itemName}</h6>
                      <div className="d-flex flex-column mt-4">
                        <button className="btn btn-primary btn-sm" type="button">
                          Push Notification Ads
                        </button>
                        <button
                          className="btn btn-outline-primary btn-sm mt-2"
                          type="button"
                        >
                          Email Ads
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

))}
          
        
        </div>
      </section>
      

 
         
       <div>
    </div>
       
       

    </div>
    </Draggable>
    }
      <div style={{width: "95%"}} className="container btn-group bhag mt-3" role="group" aria-label="Basic example">
       
  <button type="button" className="btn btn-primary btn-sm mx-1" onClick={()=>{
        settimeShifthour(timeShifthour+1);
       }}>
    + Hour
  </button>
  <button type="button" className="btn btn-primary btn-sm mx-1"  onClick={()=>{
        settimeShifthour(timeShifthour-1);
       }}>
    - Hour
  </button>
  <button type="button" className="btn btn-primary btn-sm mx-1" onClick={()=>{
        settimeShiftday(timeShiftday+1);
       }}>
    + Day
  </button>
  <button type="button" className="btn btn-primary btn-sm mx-1" onClick={()=>{
        settimeShiftday(timeShiftday-1);
       }}>
  - Day

  </button>
  <button type="button" className="btn btn-primary btn-sm mx-1 "  onClick={()=>{
        settimeShiftmonth(timeShiftmonth+1);
       }}>
    + Month
  </button>
  <button type="button" className="btn btn-primary btn-sm mx-1"onClick={()=>{
        settimeShiftmonth(timeShiftmonth-1);
       }}>
  - Month

  </button>
</div>


<div className="bhag"> 

<h4 className="mt-3 shadow d-inline-block text-center p-3 ">
 Time: { formatMessageTime(starDate)} {"    to    "} {formatMessageTime(endDate)}</h4>
 <button type="button" className="btn btn-primary btn-sm mx-1"onClick={()=>{
        setZoom(zoom-1);
       }}>
     Zoom +

  </button>
  <button type="button" className="btn btn-primary btn-sm mx-1"onClick={()=>{
        setZoom(zoom+1);
       }}>
     Zoom -

  </button>
  <button type="button" className="btn btn-primary btn-sm mx-1" onClick={()=>{
        settimeShifthour(0);
        settimeShiftday(0);
        settimeShiftmonth(0); 
        setZoom(0);

       }}>
    Reset
  </button>

  <button className="h2" onClick={()=>{
      "" 
  }}>  
  AI
  </button>
</div>
  <div onMouseEnter={()=>{
        ScrollTotop()
       }}> 
   


{mapData.length ? 


<TimeLineAmChart zoom= {zoom} TargetUserEventObjectData= {TargetUserEventObjectData} getStartEndTime= {getStartEndTime} timeShifthour={timeShifthour} timeShiftmonth={timeShiftmonth} timeShiftday=
  {timeShiftday} mapData= {mapData} nameChart={"ghjghj"}> </TimeLineAmChart> : <div style={{height: "500px", width: "95%"}} className="display-4 bhag shadow-lg p-3 mb-5 bg-body rounded m-3">  No Data Found</div>
}


  </div>
  <div className="card search-form ">
        <div className="card-body p-0">
          <form id="search-form" >
            <div className="row">
              <div className="col-12">
                <div className="row no-gutters">
                  <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                      onChange={(e)=>{
                        if(e.target.value ==="Location"){
                          dispatch(getAllUserDataAsync());
                        } else{

                          dispatch(getAllUserSearchDatatAsync(e.target.value))
                        }
                      }}
                    >   <option > Location </option>

                      {uniqueCityData.map((element, index)=>(
                        <option key={index+element}> {element} </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-lg-8 col-md-6 col-sm-12 p-0">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="form-control"
                      id="search"
                      name="search"
                      onChange={(e)=>{
                        searchBarData = e.target.value;
                        dispatch(getAllUserSearchDatatAsync(e.target.value))

                      }}
                    />
                  </div>
                  <div className="col-lg-1 col-md-3 col-sm-12 p-0 bhag" onClick={()=>{
                  dispatch(getAllUserSearchDatatAsync(searchBarData)); 
                  }}>
                  <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-search"
                      >
                        <circle cx={11} cy={11} r={8} />
                        <line x1={21} y1={21} x2="16.65" y2="16.65" />
                      </svg>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    <div className="mb-3 " style={{ height: '600px', width: '100%', overflowY: 'auto' }}> 
    <div className="container p-1 bhag">
    <div className="row" style={{height: "40%", width: "100%"}} onMouseEnter={()=>{
      scrollToBottom()
    }}>
{AllUserData.map((element, index)=>(

 
  <div key={index+"card user-card"} className="col-md-4" onClick={()=>{
     dispatch(getEventObjectTargetUserDataAsync(element?.userid)); 
     settimeShifthour(0);
     settimeShiftday(0);
     settimeShiftmonth(0);
     setActiveIndex(index);
     
  }}>
      <div className= {`card user-card ${ index=== ActiveIndex ? "bg-dark":""}`}>
        <div className="card-header">
          <h5>Profile</h5>
        </div>
        <div className="card-block">
          <div className="user-image">
            <img
              src={ element.logo}
              className="img-radius"
              alt="User-Profile-Image"
            />
          </div>
          <h6 className="f-w-600 m-t-25 m-b-10">{element["First-name"]} {" "} {element["Last-name"]}</h6>
          <p className="text-muted">Active | Male | Born 23.05.1992</p>
          <hr />
          <p className="text-muted m-t-15">Activity Level: 87%</p>
          <ul className="list-unstyled activity-leval">
            <li className="active" />
            <li className="active" />
            <li className="active" />
            <li />
            <li />
          </ul>
          <div className="bg-c-blue counter-block m-t-10 p-20">
            <div className="row">
              <div className="col-4">
                <i className="fa fa-comment" />
                <p>1256</p>
              </div>
              <div className="col-4">
                <i className="fa fa-user" />
                <p>8562</p>
              </div>
              <div className="col-4">
                <i className="fa fa-suitcase" />
                <p>189</p>
              </div>
            </div>
          </div>
          <p className="m-t-15 text-muted">
           {element.ValidEmail}
          </p>
          <hr />
          <div className="row justify-content-center user-social-link">
            <div className="col-auto">
              <a href="#!">
                <i className="fa fa-facebook text-facebook" />
              </a>
            </div>
            <div className="col-auto">
              <a href="#!">
                <i className="fa fa-twitter text-twitter" />
              </a>
            </div>
            <div className="col-auto">
              <a href="#!">
                <i className="fa fa-dribbble text-dribbble" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
))}
</div>
</div>

     </div>

    </>)
}

export default UserActivity; 



