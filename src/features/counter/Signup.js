import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useForm } from "react-hook-form";
import {  useNavigate  } from "react-router-dom";
import Swal from "sweetalert2";
import { getCreateUserAsync, selectPreParams } from "./counterSlice";
import { useDispatch, useSelector } from "react-redux";
import emailjs from 'emailjs-com'; 

const sendEmail = async (sendto, name ) => { 
  try { 
    const templateParams = { 
      sendmailto: sendto, 
      UserName: name,
      from_name: 'FOOD ORDERING APP', 
      message: 'Body of the email', 
    }; 

    const response = await emailjs.send( 
      'service_uh907e9', 
      'template_cgaki9q', 
      templateParams, 
      '4szVTNZYlCCrUrsiO' 
    ); 
  } catch (error) { 
    console.error('Error sending email:', error); 
  } 
}; 
function Signup() {
  const prevparamsdata = useSelector(selectPreParams)

  const [ValidEmail, setValidEmail] = useState(null)
 
  const dispatch = useDispatch();
  

  const firebaseConfig = {
    apiKey: "AIzaSyBnRmzMYKzMNISo7SNC0h7rYZxTP1KDvFQ",
    authDomain: "foodorder-b8d8f.firebaseapp.com",
    projectId: "foodorder-b8d8f",
    storageBucket: "foodorder-b8d8f.appspot.com",
    messagingSenderId: "506665840229",
    appId: "1:506665840229:web:04a10ef3f3a57ce0e9208c",
    measurementId: "G-SK4N3BV1FD"
  };
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth(app);

  let nn= auth.currentUser;


  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const handleSignup = (data) => {   
    const verifyEmail = async () => {
          
      const apiKey = '7d24d78caa6648a3b78c1dc730f5745a';
      const apiUrl = `https://api.zerobounce.net/v2/validate?api_key=${apiKey}&email=${data.email}`;
      try {
        const response = await fetch(apiUrl);
        const dataa = await response.json();
        console.log("handleSignup function dataa"  + dataa.status)

        // Check the API response to determine email validity
        if (dataa && dataa.status === 'valid') {
          createUserWithEmailAndPassword(auth, data.email, data.password)
          .then((userData) => {
            const user = auth.currentUser;
            updateProfile(user, {
              displayName: data.name,
    
            })

            sendEmail(data.email, data.name)
             
                Swal.fire({
                  icon: 'success',
                  title: 'Created!',
                  text: 'Account Created Successfully!',
                }).then(() => {
                  navigate('/login', { replace: true }); 
                         
              })
              .catch((error) => {
    
              });
      
          })
          .catch((error) => {
            console.error("Registration Error:", error);
      
            if (error.code === "auth/invalid-email") {
              console.error("Invalid email format");
            } else if (error.code === "auth/weak-password") {
              console.error("Weak password");
            } else {
              console.error("Other registration error");
             
            }
          });

        } else {
          setValidEmail(true)

        }
      } catch (error) {
        console.error('Error verifying email:', error);
      }
    };
             
    const handleInputChange = (event) => {
      const { value } = event.target;
    };
  
    const handleVerify = () => {
      verifyEmail();
    };
    verifyEmail();
    
  };
  



  const navigate = useNavigate();

  const handleGoogleSignup = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch(getCreateUserAsync(result.user));

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
      })
      .catch((error) => {
        console.error(error);
        // Handle Google sign-in error.
      });
  };


  return (
    
    <section className="container py-5">

      <div className="row justify-content-center align-items-center">
        <div className="col-md-6">
          <h1 className="mb-4">Join Our Food Ordering Service</h1>
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit((data)=>{
            
                
              
                handleSignup(data)})}>
                  <div className="form-group mb-4">
                  <label htmlFor="text">Enter Your Name</label>
                  <input
                    type="text"
                    className={`form-control `}
                    id="name"
                    {...register("name", {
                      required: "Email is required",
                     
                    })}
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email format",
                      },
                    })}
                  />
                { ValidEmail ?  <> 
                  <p  className="text-danger mt-2">( Enter a Valid Email Address for Sign in)</p>
                  
                  
                </>  : <> </>}

                  {errors.email && (
                    <div className="invalid-feedback">{errors.email.message}</div>
                  )}
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password.message}</div>
                  )}
                </div>
                <div className="form-check mb-4 bhag">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="subscribe"
                    
                  />
                  <label htmlFor="subscribe" className="form-check-label">
                    Subscribe to our newsletter
                  </label>
                </div>
                <div className="bhag">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-3 text-center"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
              <div className="text-center">
                <button
                  onClick={handleGoogleSignup}
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
