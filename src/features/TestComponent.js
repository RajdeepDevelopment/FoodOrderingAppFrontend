import React, { useEffect } from 'react';
import 'react-notifications-component/dist/theme.css';
import 'animate.css';
import { useSelector } from 'react-redux';
import { getNotificationsDeletetAsync, getNotificationsUpdateAsync, getNotifitationDataAsync, selectPreviousUserData, selectnotificationData } from './counter/counterSlice';
import { useDispatch } from 'react-redux';
import { formatMessageTime } from '../Chats/chatBox';
import {useNavigate } from 'react-router-dom';


const TestComponent = () => {
const dispatch = useDispatch()
  const prevUser = useSelector(selectPreviousUserData); 
  const navigate = useNavigate()
  const notificationData = useSelector(selectnotificationData); 
  useEffect(()=>{
    if(prevUser.length !==0){
      dispatch(getNotifitationDataAsync(prevUser[0]?.userid))
    }
  }, [prevUser])
  
  return (
    
     
<> 

<div className="mx-2" style={{ height: '600px', width: "96%"  }}>
      <div className="box shadow-sm rounded bg-white mb-3">
        <div className="box-title border-bottom p-3">
          <h6 className="m-0">Notifications</h6>
        </div>
        <div className="box-body p-0">
        { notificationData.map((element, index)=>(

<div key={index+35*48}
  className={`row p-2 d-flex align-items-center osahan-post-header shadow-sm mt-2 mx-3`}
  style={element.status=="unRead" ? { backgroundColor: '#E6F7FF' } : {}} onClick={()=>{
    dispatch(getNotificationsUpdateAsync({_id: element._id, status: "Read"}))
  }}
>
     {element?.logo.length !=0 && element?.logo?.map((logoData, index)=>(
      <div key={index+logoData} className="dropdown-list-image mr-3 col-md-3" style={{ display: 'inline', margin: '-10px', maxWidth: "30px" }}>
            <img
  className="rounded-circle"
  src={logoData}
  alt=""
  
/>
            </div>
     ))}
            
            
            <div className="font-weight-bold mr-3 mx-4 col-md-6 ">
             {element?.Lable && <h5> {element.Lable}</h5>}  
              <div className="mb-2">
               {element.messege}
              </div>

              {element?.link && 
              
              <button type="button" className="btn btn-outline-success btn-sm" onClick={()=>{
            navigate(element?.link)
            }}>
               
               {element?.buttonData}
              
              </button>

              }
            </div>

            <span className="ml-auto mb-auto col-md-3">
              <div className="btn-group bhag">
              <select className='bhag'
  style={{
    padding: '0px',
    fontSize: '10px',
    borderRadius: '10px',
    outline: 'none', // Remove the default focus outline
    width: '30px', // Set your desired width
  }} onChange={(e)=>{
    dispatch(getNotificationsDeletetAsync(element._id))

  }}
>
  <option className='bhag' disabled selected hidden style={{ backgroundColor: '#fff', color: '#333', fontSize: '16px' }}>
    <h1> ...</h1>
  </option>
  <option style={{ backgroundColor: '#fff', color: '#333', fontSize: '14px' }}>Delete</option>
  <option style={{ backgroundColor: '#fff', color: '#333', fontSize: '14px' }}>Turn Off</option>
</select>
              
              </div>
              <br />
              <div className="text-right text-muted pt-1"> {   formatMessageTime(element.time)}</div>
            </span>
          </div>
        ))}
          
        </div>
      </div>
      
    </div>


</>

      
  
  );
};

export default TestComponent;
