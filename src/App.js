import logo from './logo.svg';
import './App.css';
import {React, useState} from 'react'

import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom"
import HomePage from './Home/HomePage';
import ProductOverview from './ProductOverviewPage/component/ProductOverview';
import Cart from './features/counter/Cart';
import Login from './features/Login';
import ForgotPassword from './features/counter/ForgotPassword';
import Signup from './features/counter/Signup';
import OrderDetails from './OrderDetails/OrderDetrails';
import UserProfile from './UserProfile/Userprofile';
import OrderCart from './OrderDetails/orderCart';
import ProductoverviewPage from './ProductOverviewPage/ProductOverviewPage'
import ChatBox from './Chats/chatBox';
import RestaurantChatBox from './features/counter/RestaurantsChatBox';
import AllAdminOrders from './Admin/AllOrdersAdmin/AllAdminOrders';
import Navbar from './features/counter/Navbar';
import Delivery from './features/Delivery';
import AllUser from './features/counter/AllUser';
import BrowseRestaurant from './BrowseRestaunant/BrowseRestaunant';
import Career from './features/Career';
import AppliedJob from './Admin/JobAppliedAdmin/AppliedJob';
import RequestDelivery from './features/counter/RequestDelivery';
import AssignTaskForDelivery from './features/counter/AssignTask';
import ProtectedUser from './features/ProtectedUser';
import Meeting from './Meetings/Meeting';
import TestComponent from './features/TestComponent';
import AdminPretected from './Components/RoutesProtect/AdminProtected';
import TargetRestaurent from './features/counter/TargetRestaurent';
import { useSelector } from 'react-redux';
import { selectNotificationActiveBar } from './features/counter/counterSlice';
import TestCom from './features/TestCom';
import Test from './features/counter/infinitScroll';
import AmChartTimeFrame from './Components/AmCharts/AmChartTimeFrame';
import UserActivity from './features/counter/UserActivity';
import Searchtarget from './features/TestCom';

function App() {
  const NotificationActiveBar = useSelector(selectNotificationActiveBar)
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage></HomePage>
    },
    {
      path: "productOverview/:slug",
      element: <ProductoverviewPage></ProductoverviewPage>
    },
    {
      path: "cart",
      element: <ProtectedUser> <Cart></Cart> </ProtectedUser> 
    },
    {
      path: "forgotpassword",
      element:  <ForgotPassword></ForgotPassword>
    },
    {
      path: "login",
      element: <Login></Login>
    },
    {
      path: "signup",
      element: <Signup></Signup>
    },
    {
      path: "OrderDetails",
      element:<ProtectedUser>  <OrderDetails></OrderDetails> </ProtectedUser>
    },
    {
      path: "UserProfile",
      element: <UserProfile></UserProfile>
    },
    {
      path: "OrderCart",
      element: <>  <ProtectedUser> <Navbar></Navbar>  <OrderCart></OrderCart>  </ProtectedUser> </> 
    },{
      path: "ChatBox",
      element:      <ProtectedUser><ChatBox></ChatBox> </ProtectedUser> 
    },
    {
      path: "RestaurantChatBox",
      element:      <ProtectedUser>  <RestaurantChatBox></RestaurantChatBox> </ProtectedUser> 
    },{
      path: "AllAdminOrders",
      element: <> <AdminPretected> <ProtectedUser> <Navbar> </Navbar> <AllAdminOrders> </AllAdminOrders>  </ProtectedUser></AdminPretected>   </>  
    },
    {
      path: "Delivery",
      element:   <>   <ProtectedUser> <Navbar></Navbar> <Delivery></Delivery> </ProtectedUser> </>  
    },
    {
      path: "AllUser",
      element: <> <AdminPretected>  <ProtectedUser>  <Navbar></Navbar> <AllUser></AllUser> </ProtectedUser> </AdminPretected> </>  
    },{
      path: "BrowseRestaurant",
      element: <>  <ProtectedUser> <Navbar></Navbar> <BrowseRestaurant></BrowseRestaurant> </ProtectedUser>  </>  
    }, 
    {
      path: "Career",
      element: <> <ProtectedUser>  <Navbar></Navbar> <Career></Career> </ProtectedUser>  </>  
    },{
      path: "AppliedJob",
      element: <> <AdminPretected> <ProtectedUser> <Navbar></Navbar> <AppliedJob></AppliedJob></ProtectedUser> </AdminPretected> </>  
    },{
      path: "RequestDelivery",
      element: <>  <ProtectedUser>  <Navbar></Navbar> <RequestDelivery></RequestDelivery></ProtectedUser>  </>  
    },
    {
      path: "AssignTaskForDelivery",
      element: <> <ProtectedUser> <Navbar></Navbar> <AssignTaskForDelivery></AssignTaskForDelivery> </ProtectedUser>  </>  
    },
    {
      path: "Meeting",
      element: <> <AdminPretected>  <ProtectedUser> <Navbar></Navbar> <Meeting></Meeting> </ProtectedUser> </AdminPretected> </>  
    }, 
    {
      path: "TestComponent",
      element: <>   <Navbar> </Navbar><TestComponent> </TestComponent></>  
    },
    {
      path: "TargetRestaurent",
      element: <>   <Navbar> </Navbar><TargetRestaurent> </TargetRestaurent></>  
    },
    {
      path: "userActivity",
      element: <>   <Navbar> </Navbar><UserActivity> </UserActivity></>  
    },
    {
      path: "Searchtarget",
      element: <>   <Searchtarget> </Searchtarget></>  
    }, 
    {
      path: "InfinitScroll",
      element: <>   <Test> </Test></>  
    }, 
    {
      path: "amChartTimeFrame",
      element: <>   <AmChartTimeFrame> </AmChartTimeFrame></>  
    }
  ]);  
  return (
   <>
     <RouterProvider router={router} />
        
       

   </>
  );
}

export default App;
