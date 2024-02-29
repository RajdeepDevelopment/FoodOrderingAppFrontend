import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import { getCreateUserAsync, selectPreParams, selectPreviousUserData, selectuser } from "./counter/counterSlice";
import Swal from "sweetalert2";
const firebaseConfig4 = {
  apiKey: "AIzaSyBnRmzMYKzMNISo7SNC0h7rYZxTP1KDvFQ",
  authDomain: "foodorder-b8d8f.firebaseapp.com",
  projectId: "foodorder-b8d8f",
  storageBucket: "foodorder-b8d8f.appspot.com",
  messagingSenderId: "506665840229",
  appId: "1:506665840229:web:04a10ef3f3a57ce0e9208c",
  measurementId: "G-SK4N3BV1FD"
};
function Login() {
  const prevparamsdata = useSelector(selectPreParams)
  const [imageIndex, setImageIndex] = useState(0);

  const previousUserdata = useSelector(selectPreviousUserData)
  const {
    register,
    handleSubmit, setValue,
    formState: { errors },
  } = useForm();

const dispatch = useDispatch();
  // Firebase Configuration
  
  const app = initializeApp(firebaseConfig4);
  const analytics = getAnalytics(app);
  const navigate = useNavigate();

  const imgArray = [
    "https://www.kobesushi.co.nz/wp-content/uploads/2020/07/vege-resize.jpg",
    "https://b.zmtcdn.com/data/pictures/chains/7/19433477/b62a5cf0ae92446aef6425255d0b6890_o2_featured_v2.jpg?output-format=webp",
    "https://b.zmtcdn.com/data/pictures/7/18707517/15ee0e82b9a96a1f0661712bc840b80e_o2_featured_v2.jpg",
  ];


  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % imgArray.length);
    }, 2000);

    return () => clearInterval(interval);
    
  }, []);

  const imageLink = imgArray[imageIndex];

  let auth = getAuth();

  
  const handleGoogleSignIn = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then( async(result) => {
        
        dispatch(getCreateUserAsync(...result.user.providerData));
        Swal.fire({
          icon: 'success',
          title: 'Created!',
          text: 'Account Created Successfully!',
        }).then(() => {
          if(prevparamsdata ==null){
            navigate('/', { replace: true }); 

          }
          else{
            navigate( `/ProductOverview/${prevparamsdata}`, { replace: true }); 

          }

        });
      }).catch((error) => {
        // Handle errors, if any.
      });
  };

  const loginHandler = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userData) => {
       
        dispatch(getCreateUserAsync(...userData.user.providerData));

  
        Swal.fire({
          icon: 'success',
          title: 'Logged In!',
          text: 'You have successfully logged in.',
        }).then(() => {
          navigate('/', { replace: true }); 
          
        });
      })
      .catch((error) => {
        let { message } = error;
     
        Swal.fire({
          icon: 'error',
          title: `${message}`,
          text: 'Login failed. Please check your credentials.',
        });
      });
  };
  
  

  return (
    <section className="vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src={imageLink}
              className="img-fluid cool-image"
              alt="Phone image"
            />
          </div>
          <div className="col-md-4 col-lg-5 col-xl-5 offset-xl-1">
            <div className="bhag">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmT2Ex5SNycVPlUaMndI-xM2pR6HxmZMme3eyoVpnbzZN8v6uyXn4Uy-I&s=100"
                alt="Logo"
                className="mb-2"
                style={{ maxWidth: "150px" }}
              />
            </div>
            <form onSubmit={handleSubmit((data)=>{
        
           loginHandler(data);
            })}>
              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="email"
                  {...register('email',{required: true})}
                  className="form-control form-control-lg"
                  placeholder="Email address"
                />
              </div>
              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="password"
                  className="form-control form-control-lg"
                  placeholder="password"
                  {...register('password',{required: true})}
                />
              </div>
              <div className="bhag">
                <button
                  className="btn btn-primary btn-lg btn-block mb-4 mx-4"
                  width="20"
                  height="20"
                  type="submit"
                >
                  Log In
                </button>
                <div className="text-center bhag">
                <button
                  onClick={handleGoogleSignIn}
                  className="btn btn-light btn-block mb-3"
                >
                  <img
                    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                    alt="Google Logo"
                    width="20"
                    height="20"
                  />{" "}
                  Sign In with Google
                </button>
              </div>
              </div>
              <p className="mb-3 bhag">
                Don't have an account?
                <Link to="/signup"> Sign Up</Link>
              </p>
              <p className="bhag">
                <Link to="/forgotpassword">Forgot Password?</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
