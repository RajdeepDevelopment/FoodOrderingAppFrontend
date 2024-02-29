import {  selectRestaurantsState, selectuser } from "./counterSlice";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDatabase, ref, push, set, onChildAdded, off } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { getUserMessegePost } from './counterAPI';
const firebaseConfig2 = {
    apiKey: "AIzaSyBnRmzMYKzMNISo7SNC0h7rYZxTP1KDvFQ",
    authDomain: "foodorder-b8d8f.firebaseapp.com",
    projectId: "foodorder-b8d8f",
    storageBucket: "foodorder-b8d8f.appspot.com",
    messagingSenderId: "506665840229",
    appId: "1:506665840229:web:04a10ef3f3a57ce0e9208c",
    measurementId: "G-SK4N3BV1FD"
  };
  const app2 = initializeApp(firebaseConfig2, "app3");

function RestaurantChatBox(){
     const currentUser = useSelector(selectuser)
     const [messagess, setMessages] = useState([]); // Declare and initialize 'messages'
     const { register, handleSubmit,reset,  watch, setValue,  formState: { errors } } = useForm();
     const auth = getAuth(app2); // Access the Firebase Authentication object
     const db = getDatabase(app2); // Access the Firebase Database
     const [receverId, setReceverId]= useState("temp")
 
     const handleSendMessage = (textmsg) => { 
         const postListRef = ref(db, "restaurant2"+receverId); 
         const newPostRef = push(postListRef); 
         const messageData = { 
             text: textmsg, 
             sender: currentUser.uid, 
             receiver: "Sushmita", 
             time: Date.now(), 
         }; 
          
 
         set(newPostRef, messageData)
             .then(() => { 
                 console.log("Message sent successfully."); 
             }) 
             .catch((error) => { 
                 console.error("Error sending message:", error); 
             }); 
     };
 
     useEffect(() => { 
         const onChildAddedHandler = (data) => { 
             setMessages((messagess) => [...messagess, data.val()]); 
         }; 
 
         const databaseRef = ref(db, "restaurant2"+receverId); 
 
         // Add the event listener 
         onChildAdded(databaseRef, onChildAddedHandler); 
 
         // Cleanup function to remove the event listener 
         return () => { 
             // Remove the event listener 
             off(databaseRef, 'child_added', onChildAddedHandler); 
         }; 
     }, [receverId]);
      const dispatch = useDispatch();
      const RestaurantsData = useSelector(selectRestaurantsState)
    
 
     function formatMessageTime(timestamp) { 
         const currentTimestamp = Date.now(); 
         const timeDifference = currentTimestamp - timestamp; 
 
         const seconds = Math.floor(timeDifference / 1000); 
 
         if (seconds < 60) { 
             return `${seconds} second${seconds !== 1 ? 's' : ''} ago`; 
         } else if (seconds < 3600) { 
             const minutes = Math.floor(seconds / 60); 
             return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`; 
         } else if (seconds < 86400) { 
             const hours = Math.floor(seconds / 3600); 
             return `${hours} hour${hours !== 1 ? 's' : ''} ago`; 
         } else { 
             const days = Math.floor(seconds / 86400); 
             return `${days} day${days !== 1 ? 's' : ''} ago`; 
         } 
     }
   
    return(<>

<h1> Hello User</h1>
       {messagess.length!=0 && messagess.length}

       <section style={{ backgroundColor: "#eee" }}>
  <div className="container py-5">
    <div className="row">
      <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
        <h5 className="font-weight-bold mb-3 text-center text-lg-start">
          Member
        </h5>
        <div className="card">
          <div className="card-body">

            {RestaurantsData&& 
            <ul className="list-unstyled mb-0">
          
            </ul>
      }
          </div>
        </div>
      </div>
      <div className="col-md-6 col-lg-7 col-xl-8">
        {receverId==="temp"?<ul className="list-unstyled">
          <h1>Chat Support</h1>
        </ul> :
        <ul className="list-unstyled">
        {messagess.map((data, index)=>(
          <li  key={index+data.time} className="d-flex justify-content-between mb-4">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
              alt="avatar"
              className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
              width={60}
            />
            <div className="card">
              <div className="card-header d-flex justify-content-between p-3">
                <p className="fw-bold mb-0">Brad Pitt</p>
                <p className="text-muted small mb-0">
                  <i className="far fa-clock" /> {formatMessageTime(data.time)}
                </p>
              </div>
              <div className="card-body">
                <p className="mb-0">
                {data.text}
                </p>
              </div>
            </div>
          </li>
        ))}
          
         <form onSubmit={handleSubmit((data)=>{
                 handleSendMessage(data.textMsg)
         })}>

          <li className="bg-white mb-3">
            <div className="form-outline">
              <textarea
                className="form-control"
                id="textMsg"
                {...register("textMsg",{required: true})}
                rows={4}
              />
              <label className="form-label" htmlFor="textAreaExample2">
                Message
              </label>
            </div>
          </li>
          <button type="submit" className="btn btn-info btn-rounded float-end">
            Send
          </button>

         </form>
        </ul>
        }
        
      </div>
    </div>
  </div>
</section>
    </>)
}

export default RestaurantChatBox;