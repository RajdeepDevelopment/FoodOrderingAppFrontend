import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {BsMoonStars} from 'react-icons/bs';

import {
  getCartDataAsync,
  getCreateUserAddressAsync,
  getCurrentLocationAsync,
  getLogoutAsync,
  getProductDataAsync,
  getSearchResultAsync,
  getUpdateNotificationxAsync,
  getUpdateUserAddressAsync,
  getsearchdataResetAsync,
  selectCurrentCity,
  selectNotificationActiveBar,
  selectPreviousUserData,
  selectProducts,
  selectnotificationData,
  selectsearchdata,
  selectunReadNotificationData,
  selectuser,
} from "./counterSlice";
import {HiSun} from 'react-icons/hi';

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import img from "../../assets/food8239850.png";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import TestComponent from "../TestComponent";

function Navbar() {
  const NotificationActiveBar = useSelector(selectNotificationActiveBar);

  const searchResults = useSelector(selectsearchdata);
  const products = useSelector(selectProducts);
  const UnReadnotificationData = useSelector(selectunReadNotificationData);
 const city = useSelector(selectCurrentCity)
  const { slug } = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectuser);
  const [darkMode, setDarkMode] = useState(true);
  const preUserData = useSelector(selectPreviousUserData);

  const handleSearch = (event) => {
    dispatch(getUpdateNotificationxAsync(false));
    const newSearchTerm = event ? event.toLowerCase().trim() : "";
    if (newSearchTerm == "") {
      dispatch(getsearchdataResetAsync());
    } else {
      dispatch(getSearchResultAsync(newSearchTerm));
    }
  };
  const [stopReload, setstopReload] = useState(true);

  useEffect(() => {
    if (currentUser !== null) {
      dispatch(getCartDataAsync(currentUser.uid));
    }
  }, [dispatch, preUserData]);
  const [toggleSwitchValue, setToggleSwitch] = useState(true);
  const [lati, setlati] = useState(-1);
  const [longi, setlongi] = useState(-1);
  function getCurrentUserLocation() {
    if (stopReload) {
      setstopReload(false);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
            setlati(latitude);
            setlongi(longitude);
            fetch(apiUrl)
              .then((response) => response.json())
              .then((data) => {
                setTimeout(() => {
                  if (preUserData.length !== 0) {
                    const postData = {
                      _id: preUserData[0]._id,
                      city: data.address?.city,
                      "address-1":
                        data.address.suburb +
                        " " +
                        data.address.city_district +
                        " " +
                        data.address?.city +
                        " " +
                        data.address.state,
                      "address-2": data.address.city_district,
                      country: data.address.country,
                      "pin-code": data.address.postcode,
                      state: data.address.state,
                    };
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Address Successfully Updated",
                      text: "Thanks for your response.",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                    dispatch(getUpdateUserAddressAsync(postData));
                  } else {
                    const postData = {
                      "First-name": currentUser.displayName.split(" ")[0],
                      "Last-name": currentUser.displayName.split(" ")[1],
                      phone: "06296940213",
                      "address-1":
                        data.address.suburb +
                        " " +
                        data.address.city_district +
                        " " +
                        data.address?.city +
                        " " +
                        data.address.state,
                      "address-2": data.address.city_district,
                      city: data.address?.city,
                      country: data.address.country,
                      "pin-code": data.address.postcode,
                      state: data.address.state,
                      state2: data.address.state,
                      userid: currentUser.uid,
                    };
                    dispatch(getCreateUserAddressAsync(postData));

                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "Address Successfully Added",
                      text: "Thanks for your response.",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  }
                }, 100);
              })
              .catch((error) => {
                console.error("Error while fetching location data:", error);
              });
          },
          function (error) {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                console.error("User denied the request for Geolocation.");
                break;
              case error.POSITION_UNAVAILABLE:
                console.error("Location information is unavailable.");
                break;
              case error.TIMEOUT:
                console.error("The request to get user location timed out.");
                break;
              case error.UNKNOWN_ERROR:
                console.error("An unknown error occurred.");
                break;
              default:
                console.error("An error occurred while getting user location.");
                break;
            }
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    }
  }
  const toggleSwitchHandler = e => {
    e.stopPropagation();
    if (toggleSwitchValue) {
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
    } else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    }
    setToggleSwitch(!toggleSwitchValue);
  };
  const customIconn = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/2838/2838912.png",
    iconSize: [38, 38],
  });
  const containerStyle = {
    position: "fixed",
    top: "80px",
    right: "20px",
    width: "24%",
    height: "auto",
    backgroundColor: "#f0f0f0",
    zIndex: "9999",
    overflowY: "auto",
  };
  useEffect(()=>{
    dispatch(getCurrentLocationAsync());
  },[])

  return (
    <>
      {NotificationActiveBar && (
        <div className="shadow" style={containerStyle}>
          <TestComponent> </TestComponent>
        </div>
      )}
      <nav className="navbar navbar-expand-lg navbar-light bg-warning">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>
            <img src={img} height="50px" width="50px" alt="" />
            Your Food Delivery
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to={"/"}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/BrowseRestaurant"}>
                  Browse Restaurants
                </Link>
              </li>
              {currentUser &&
                preUserData.length != 0 &&
                preUserData[0]?.Access != "Admin" &&
                preUserData[0]?.Access !== "Delivery" && (
                  <li className="nav-item">
                    <Link className="nav-link" to={"/Cart"}>
                      Cart
                    </Link>
                  </li>
                )}

              {!currentUser && slug == null && (
                <li className="nav-item">
                  <Link className="nav-link" to={"/login"}>
                    LogIn
                  </Link>
                </li>
              )}

              {currentUser && (
                <>
                  <li className="nav-item dropdown mx-1">
                    <div
                      className="nav-link dropdown-toggle"
                      role="button"
                      id="userDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {preUserData.length != 0
                        ? preUserData[0]["First-name"] +
                          " " +
                          preUserData[0]["Last-name"]
                        : currentUser.displayName}
                    </div>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="userDropdown"
                    >
                      <li>
                        <Link className="dropdown-item" to="/UserProfile">
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to={"/OrderCart"}>
                          Order History
                        </Link>
                      </li>
                      <li></li>

                      <li className="dropdown-divider" />
                      <li
                        className="dropdown-item"
                        onClick={() => {
                          handleLogout();
                        }}
                      >
                        Sign Out
                      </li>

                      <li>
                        <Link className="dropdown-item" to={"/ChatBox"}>
                          User Chat Bar
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to={"/Career"}>
                          Career
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li></li>{" "}
                </>
              )}

              {currentUser ?(
                <>
                  {preUserData.length != 0 && (
                    <li
                      className="nav-item dropdown mx-1"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <div
                        onClick={() => getCurrentUserLocation()}
                        className="nav-link dropdown-toggle"
                        role="button"
                        id="userDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {preUserData[0]?.city}
                      </div>

                      <ul
                        className="dropdown-menu"
                        aria-labelledby="userDropdown"
                      >
                        <div className="dropdown-item shadow-lg">
                          <div className="row justify-content-center">
                            <div className="card mt-12 ">
                              <div className="card-header bg-primary text-white">
                                <h4 className="d-inline">
                                  User Address Information
                                </h4>

                                <div
                                  className="mx-4 d-inline btn btn-dark pb-2 bhag"
                                  onClick={() => getCurrentUserLocation()}
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="#FF7E8B"
                                    width="30"
                                    height="30"
                                    viewBox="0 0 20 20"
                                    aria-labelledby="icon-svg-title- icon-svg-desc-"
                                    role="img"
                                    className="sc-rbbb40-0 iRDDBk"
                                  >
                                    <title>location-fill</title>
                                    <path d="M10.2 0.42c-4.5 0-8.2 3.7-8.2 8.3 0 6.2 7.5 11.3 7.8 11.6 0.2 0.1 0.3 0.1 0.4 0.1s0.3 0 0.4-0.1c0.3-0.2 7.8-5.3 7.8-11.6 0.1-4.6-3.6-8.3-8.2-8.3zM10.2 11.42c-1.7 0-3-1.3-3-3s1.3-3 3-3c1.7 0-3 1.3-3 3s-1.3 3-3 3z"></path>
                                  </svg>
                                  <h6 className="d-inline bhag ">
                                    {" "}
                                    Get Live location
                                  </h6>
                                </div>
                                <Link
                                  to="/UserProfile"
                                  className="d-inline mx-4"
                                >
                                  <button className="btn btn-dark ">
                                    Edit
                                  </button>
                                </Link>
                              </div>
                              <div className="card-body">
                                <ul className="list-group">
                                  <li className="list-group-item">
                                    <strong>First Name:</strong>{" "}
                                    {preUserData[0]["First-name"]}
                                  </li>
                                  <li className="list-group-item">
                                    <strong>Last Name:</strong>{" "}
                                    {preUserData[0]["Last-name"]}
                                  </li>
                                  <li className="list-group-item">
                                    <strong>Phone:</strong>{" "}
                                    {preUserData[0]["phone"]}
                                  </li>
                                  <li className="list-group-item">
                                    <strong>Address Line 1:</strong>{" "}
                                    {preUserData[0]["address-1"]}
                                  </li>
                                  <li className="list-group-item">
                                    <strong>Address Line 2:</strong>{" "}
                                    {preUserData[0]["address-2"]}
                                  </li>
                                  <li className="list-group-item">
                                    <strong>City:</strong>{" "}
                                    {preUserData[0]["city"]}
                                  </li>
                                  <li className="list-group-item">
                                    <strong>Country:</strong>{" "}
                                    {preUserData[0]["country"]}
                                  </li>
                                  <li className="list-group-item">
                                    <strong>Pin Code:</strong>{" "}
                                    {preUserData[0]["pin-code"]}
                                  </li>
                                  <li className="list-group-item">
                                    <strong>State 1:</strong>{" "}
                                    {preUserData[0]["state"]}
                                  </li>
                                  <li className="list-group-item">
                                    <strong>State 2:</strong>{" "}
                                    {preUserData[0]["state2"]}
                                  </li>
                                </ul>
                              </div>

                              {longi !== -1 && lati != -1 && (
                                <MapContainer center={[lati, longi]} zoom={13}>
                                  <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                                  />

                                  <Marker
                                    position={[lati, longi]}
                                    icon={customIconn}
                                  ></Marker>
                                </MapContainer>
                              )}
                            </div>
                          </div>
                        </div>
                      </ul>
                    </li>
                  )}
                </>
              ): <>   
              <li className="nav-item">
              <Link className="nav-link" to={"/"}>
              {city}
              </Link>
               
                </li> </>}
         
              {
                currentUser &&
                  preUserData.length != 0 &&
                  preUserData[0]?.Access === "Admin" && (
                    <>
                      <li className="nav-item">
                        <Link className=" nav-link" to={"/AllAdminOrders"}>
                          Admin Order
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link className=" nav-link" to={"/AllUser"}>
                          Permissions
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link className=" nav-link" to={"/AppliedJob"}>
                          Jobs
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link className=" nav-link" to={"/Meeting"}>
                          Meetings
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className=" nav-link" to={"/userActivity"}>
                          User Activity
                        </Link>
                      </li>
                    </>
                  )

                //userActivity
              }

              {
                currentUser &&
                  preUserData.length != 0 &&
                  preUserData[0]?.Access === "Delivery" && (
                    <>
                      <li className="nav-item">
                        <Link className=" nav-link" to={"/RequestDelivery"}>
                          Get Delivery
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link
                          className=" nav-link"
                          to={"/AssignTaskForDelivery"}
                        >
                          Task TimeLine
                        </Link>
                      </li>

                      <li className="nav-item">
                        <Link className=" nav-link" to={"/Delivery"}>
                          Delivery Map
                        </Link>
                      </li>
                    </>
                  )

                //AssignTaskForDelivery
              }
               <div className="mode-toggle mx-3"  >
            <label className="switch">
                  <input type="checkbox" 
                  checked={toggleSwitchValue}
                  onChange={toggleSwitchHandler}
                  />
                <span style={{width: "40px", height: "20px"}} className="slider"></span>
                </label>

              </div>
            </ul>
            <div
              className="mx-2"
              onClick={() => {
                dispatch(getUpdateNotificationxAsync(!NotificationActiveBar));
              }}
            >
              <p className="" style={{ margin: "-9px" }}>
                {UnReadnotificationData.length}
              </p>
              <svg
                style={{ margin: "-25px" }}
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                fill={` ${NotificationActiveBar ? "white" : "currentColor"}`}
                class="bi bi-bell-fill"
                viewBox="0 0 16 16"
              >
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
              </svg>

            </div>
            

            {slug == null && (
              <form
                className="d-flex"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSearch(e.target.value);
                }}
              >
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search for food"
                  aria-label="Search"
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <button
                  className="btn btn-outline-dark w-25 mx-2"
                  type="submit"
                >
                  Search
                </button>
              </form>
            )}
          </div>
        </div>
      </nav>{" "}
    </>
  );

  function toggleDarkMode() {
    if (darkMode) {
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
    } else {
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    }
    setDarkMode(!darkMode);
  }

  function handleLogout() {
    Swal.fire({
      title: `${
        currentUser.displayName.split(" ")[0]
      } are you sure to Sign Out?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Sign Out!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(getLogoutAsync());
        dispatch(getProductDataAsync());
        Swal.fire("Sign Out!", "success");
      }
    });
  }

  function DarkModeIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="currentColor"
        className="bi bi-moon-fill"
        viewBox="0 0 16 16"
      >
        <path d="M8 1.8a6.2 6.2 0 0 0 0 12.4 6.2 6.2 0 0 0 0-12.4z" />
      </svg>
    );
  }

  function LightModeIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="30"
        fill="currentColor"
        className="bi bi-sun-fill" // Replace with the actual class for your light mode icon
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M8 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm0 2a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm1-11a1 1 0 0 1 0 2H9a1 1 0 0 1 0-2v-1a1 1 0 0 1 2 0z"
        />
      </svg>
    );
  }
}

export default Navbar;
