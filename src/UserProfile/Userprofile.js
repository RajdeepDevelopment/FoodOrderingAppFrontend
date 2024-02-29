import { useDispatch, useSelector } from "react-redux";
import { getCreateUserAddressAsync, getCurrentUserAddressDataAsync, getNotificationsPostAsync, getUpdateUserAddressAsync, selectPreParams, selectPreviousUserData, selectuser, selectuserAddress } from "../features/counter/counterSlice";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import UserIcon from "./img/UserIcons";



function UserProfile(){
  const navigate = useNavigate();
  const prevParamsData = useSelector(selectPreParams);
    const currentUser = useSelector(selectuser);
    const previousUserdata = useSelector(selectPreviousUserData)
    const [editButton, seteditButton] = useState(false)
    // const haveAddress = useSelector(selectuserAddress)
    const dispatch = useDispatch();
    const {
      register,
      handleSubmit,setValue,
      formState: { errors },
    } = useForm();
    
    function setAllPrevValue(){
      setValue("First-name", previousUserdata[0]['First-name']);
      setValue("Last-name", previousUserdata[0]['Last-name']);
      setValue("phone", previousUserdata[0].phone);
      setValue("address-1", previousUserdata[0]['address-1']);
      setValue("address-2", previousUserdata[0]['address-2']);
      setValue("pin-code", previousUserdata[0]['pin-code']);
      setValue("state", previousUserdata[0].state);
      setValue("city", previousUserdata[0].city);
      setValue("country", previousUserdata[0].country);
      
      setValue("state2", previousUserdata[0].state2);

    }
    useEffect(()=>{
      if(previousUserdata.length===0){
        seteditButton(true)
      }
    },[])

    useEffect(()=>{},[])
    useEffect(()=>{
      if(previousUserdata.length!==0){

        setAllPrevValue()
      }
      // dispatch(getCurrentUserAddressDataAsync(currentUser.uid))
    }, [dispatch,previousUserdata])
    return(
        <>


<div className="container rounded bg-white  mb-5">
  <div className="row mt-4">
    <div className="col-md-5 border-right bhag">
      <div className="d-flex flex-column align-items-center text-center p-3 py-5">
        <h1 className="display-2"> Your Profile</h1>
        <img
          className="rounded-circle mt-5"
          width="150px"
          src= {currentUser?.photoURL ? currentUser?.photoURL : "https://static.thenounproject.com/png/750588-200.png" }
          />
        <span className="font-weight-bold">{previousUserdata.length !=0 ? previousUserdata[0]["First-name"] : <h3> Create Profile</h3>  }</span>
        <span className="text-black-50">{ previousUserdata.length !=0 && currentUser.email}</span>
        {editButton===false && 
     <div className="bhag mt-4" onClick={()=>{
       seteditButton(true)
      }}>
  <button className="btn btn-primary custom-button">Edit Address</button>
</div>

    }
      </div>
      
    </div>
    
                 {editButton &&  
    <div className="col-md-6 mx-5 border-right">
     
       
    <form  onSubmit={handleSubmit((data)=>{
      if(previousUserdata.length !==0){
        const postData = {...data, _id: previousUserdata[0]._id}
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your response has been saved',
          showConfirmButton: false,
          timer: 1500
        })
   dispatch(getUpdateUserAddressAsync(postData))
   const objectForNotification = {messege: `Your Profile Successfully Updated`, for: currentUser.uid, time: Date.now(), logo: [previousUserdata[0].logo], status: "unRead"}; 
dispatch(getNotificationsPostAsync(objectForNotification))
  } 
  else{
    const postData = {...data, userid: currentUser.uid}
    dispatch(getCreateUserAddressAsync(postData));
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Address Successfully Added',
      text: 'Thanks for your response.',
      showConfirmButton: false,
      timer: 1500
    });
    if(prevParamsData===null){
      navigate(`/`)
      
    } else{
      navigate(`/ProductOverview/${prevParamsData}`)

    }
  }
      seteditButton(false)

    })}>

      <div className="p-3 py-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="text-right">Profile Information</h4>
        </div>
        
        <div className="row mt-2">
          <div className="col-md-6">
            <label className="labels">First Name</label>
            <input
            {...register('First-name', {require: true })}
              type="text"
              className="form-control"
              placeholder="First name"
              defaultValue=""
            />
          </div>
          <div className="col-md-6">
            <label className="labels">Last Name</label>
            <input
         {...register('Last-name', {require: true })}

              type="text"
              className="form-control"
              defaultValue=""
              placeholder="Last name"
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <label className="labels">Phone Number</label>
            <input
            {...register('phone', {require: true })}

              type="text"
              className="form-control"
              placeholder="Enter phone number"
              defaultValue=""
            />
          </div>
          <div className="col-md-12">
            <label className="labels">Address Line 1</label>
            <input
           {...register('address-1', {require: true })}

              type="text"
              className="form-control"
              placeholder="Enter address line 1"
              defaultValue=""
            />
          </div>
          <div className="col-md-12">
            <label className="labels">Address Line 2</label>
            <input
           {...register('address-2', {require: true })}

              type="text"
              className="form-control"
              placeholder="Enter address line 2"
              defaultValue=""
            />
          </div>
          <div className="col-md-12">
            <label className="labels">Postal Code</label>
            <input
            {...register('pin-code', {require: true })}
              type="text"
              className="form-control"
              placeholder="Enter pin code"
              defaultValue=""
            />
          </div>
          <div className="col-md-12">
            <label className="labels">State/Province</label>
            <input
         {...register('state', {require: true })}

              type="text"
              className="form-control"
              placeholder="Enter state/province"
              defaultValue=""
            />
          </div>
          <div className="col-md-12">
            <label className="labels">City/Area</label>
            <input
            {...register('city', {require: true })}
              type="text"
              className="form-control"
              placeholder="Enter city/area"
              defaultValue=""
            />
          </div>
      
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <label className="labels">Country</label>
            <input
             {...register('country', {require: true })}

              type="text"
              className="form-control"
              placeholder="Enter country"
              defaultValue=""
            />
          </div>
          <div className="col-md-6">
            <label className="labels">State/Region</label>
            <input
            {...register('state2', {require: true })}
              type="text"
              className="form-control"
              defaultValue=""
              placeholder="Enter state/region"
            />
          </div>
        </div>
        <div className="mt-5 text-center">
          <button className="btn btn-primary profile-button" type="submit">
            Save Profile
          </button>
        </div>
      </div>
      </form> 

    </div> }
       <div className="col-md-6 p-0 bhag"> 
      {UserIcon()}
       </div>
    {
      previousUserdata?.length !=0 && 
      <div className= {!editButton ?"":"col-md-6" }>
      <div className="row justify-content-center">
       
          <div className="card mt-12">
            <div className="card-header bg-primary text-white">
              <h4>User Address Information</h4>
            </div>
            <div className="card-body">
              <ul className="list-group">
                <li className="list-group-item">
                  <strong>First Name:</strong> {previousUserdata[0]["First-name"]}
                </li>
                <li className="list-group-item">
                  <strong>Last Name:</strong> {previousUserdata[0]["Last-name"]}
                </li>
                <li className="list-group-item">
                  <strong>Phone:</strong> {previousUserdata[0]["phone"]}
                </li>
                <li className="list-group-item">
                  <strong>Address Line 1:</strong> {previousUserdata[0]["address-1"]}
                </li>
                <li className="list-group-item">
                  <strong>Address Line 2:</strong> {previousUserdata[0]["address-2"]}
                </li>
                <li className="list-group-item">
                  <strong>City:</strong> {previousUserdata[0]["city"]}
                </li>
                <li className="list-group-item">
                  <strong>Country:</strong> {previousUserdata[0]["country"]}
                </li>
                <li className="list-group-item">
                  <strong>Pin Code:</strong> {previousUserdata[0]["pin-code"]}
                </li>
                <li className="list-group-item">
                  <strong>State 1:</strong> {previousUserdata[0]["state"]}
                </li>
                <li className="list-group-item">
                  <strong>State 2:</strong> {previousUserdata[0]["state2"]}
                </li>
              
              </ul>
            </div>
          
        </div>
      </div>
    </div>
          
      
    }
       
  </div>
</div> 


        </>
    )
}

export default UserProfile;