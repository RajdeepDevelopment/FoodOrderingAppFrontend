import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRestaurantsDataAsync,
  getUserMessegePostAsync,
  selectRestaurantsState,
  selectuser,
} from "../features/counter/counterSlice";

import {
  getDatabase,
  ref,
  push,
  set,
  onChildAdded,
  off,
} from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { useForm } from "react-hook-form";

export function formatMessageTime(timestamp) {
  const currentTimestamp = Date.now();
  const timeDifference = Math.abs(currentTimestamp - timestamp);

  const seconds = Math.floor(timeDifference / 1000);

  if (seconds < 60) {
    return `${seconds} second${seconds !== 1 ? "s" : ""} ${
      timestamp > currentTimestamp ? "from now" : "ago"
    }`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ${
      timestamp > currentTimestamp ? "from now" : "ago"
    }`;
  } else if (seconds < 86400) {
    const hours = Math.floor(seconds / 3600);
    return `${hours} hour${hours !== 1 ? "s" : ""} ${
      timestamp > currentTimestamp ? "from now" : "ago"
    }`;
  } else {
    const days = Math.floor(seconds / 86400);
    return `${days} day${days !== 1 ? "s" : ""} ${
      timestamp > currentTimestamp ? "from now" : "ago"
    }`;
  }
}
const firebaseConfig2 = {
  apiKey: "AIzaSyBnRmzMYKzMNISo7SNC0h7rYZxTP1KDvFQ",
  authDomain: "foodorder-b8d8f.firebaseapp.com",
  projectId: "foodorder-b8d8f",
  storageBucket: "foodorder-b8d8f.appspot.com",
  messagingSenderId: "506665840229",
  appId: "1:506665840229:web:04a10ef3f3a57ce0e9208c",
  measurementId: "G-SK4N3BV1FD",
};
const app2 = initializeApp(firebaseConfig2, "app2");
function ChatBox({ popBarsize }) {
  const [messagess, setMessages] = useState([]); // Declare and initialize 'messages'
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm();
  const currentUser = useSelector(selectuser);
  const auth = getAuth(app2); // Access the Firebase Authentication object
  const db = getDatabase(app2); // Access the Firebase Database
  const [receverId, setReceverId] = useState("temp");
  const [helperIndex, sethelperIndex] = useState("gg");
  function containsSpecialCharacters(inputString) {
    const pattern = /[^a-zA-Z0-9]/;

    if (pattern.test(inputString)) {
      return true;
    }

    return false;
  }

  const scrollableElementRef = useRef(null);

  const scrollToMaxScroll = () => {
    if (scrollableElementRef.current) {
      setTimeout(() => {
        scrollableElementRef.current.scrollTop =
          scrollableElementRef.current.scrollHeight;
      }, 100);
    }
  };

  function removeSpecialCharacters(inputString) {
    if (containsSpecialCharacters(inputString)) {
      const pattern = /[^a-zA-Z0-9]/g;

      const result = inputString.replace(pattern, "");

      return result;
    }

    return inputString;
  }
  const handleSendMessage = (textmsg) => {
    const postListRef = ref(db, helperIndex);
    const newPostRef = push(postListRef);
    const messageData = {
      text: textmsg,
      sender: removeSpecialCharacters(currentUser.uid),
      receiver: receverId.uid,
      logo: currentUser.photoURL,
      name: currentUser.displayName,
      time: Date.now(),
    };

    const messageDatafor = {
      for: receverId.uid,
      uid: removeSpecialCharacters(currentUser.uid),
      name: currentUser.displayName,
      logo: currentUser.photoURL,
      time: Date.now(),
      dbAdd: helperIndex,
    };
    if (messagess.length === 0) {
      dispatch(getUserMessegePostAsync(messageDatafor));
    }

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

    const databaseRef = ref(db, helperIndex);

    onChildAdded(databaseRef, onChildAddedHandler);
    dispatch(getRestaurantsDataAsync(currentUser.uid));
    return () => {
      // Remove the event listener
      off(databaseRef, "child_added", onChildAddedHandler);
    };
  }, [receverId]);
  const dispatch = useDispatch();
  const RestaurantsData = useSelector(selectRestaurantsState);
  useEffect(() => {
    dispatch(getRestaurantsDataAsync(currentUser.uid));
  }, [dispatch]);

  return (
    <>
      <section style={{ backgroundColor: "#eee", height: "20%" }}>
        <div className="container py-5">
          <div className="row">
            <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
              <h5 className="font-weight-bold mb-3 text-center text-lg-start">
                Member
              </h5>
              <div className="card">
                <div className="card-body">
                  {RestaurantsData && (
                    <ul className="list-unstyled mb-0">
                      <div
                        style={{
                          height: "530px",
                          width: "100%",
                          overflowY: "auto",
                        }}
                      >
                        {RestaurantsData.map((restaurantsMap, index) => (
                          <li
                            key={index + 56 * 3}
                            className="p-2 border-bottom"
                            style={{ backgroundColor: "#eee" }}
                            onClick={() => {
                              setMessages([]);
                              setReceverId(restaurantsMap);
                              sethelperIndex(restaurantsMap.dbAdd);
                            }}
                          >
                            <div className="d-flex flex-row">
                              <img
                                src={restaurantsMap.logo}
                                alt="avatar"
                                className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                                width={60}
                              />
                              <div className="pt-1">
                                <p className="fw-bold mb-0">
                                  {restaurantsMap.name}
                                </p>
                                <p className="small text-muted">
                                  {restaurantsMap.cuisine}
                                </p>
                              </div>
                            </div>
                            <div className="pt-1">
                              <p className="small text-muted mb-1">Just now</p>
                              <span className="badge bg-danger float-end">
                                1
                              </span>
                            </div>
                          </li>
                        ))}
                      </div>
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-7 col-xl-8">
              {receverId === "temp" ? (
                <ul className="list-unstyled">
                  <h1>Chat Support</h1>
                </ul>
              ) : (
                <>
                  <div
                    ref={scrollableElementRef}
                    data-bs-spy="scroll"
                    data-bs-target="#navbar-example3"
                    data-bs-smooth-scroll="true"
                    className="scrollspy-example-2 custom-bg"
                    style={{ height: "400px", overflowY: "auto" }}
                    tabIndex={0}
                  >
                    <ul className="list-unstyled">
                      {messagess.map((data, index) => (
                        <div
                          key={index + data.logo}
                          className={`mb-4 d-flex chat-message ${
                            currentUser.uid === data.sender
                              ? "justify-content-end"
                              : "justify-content-start"
                          }`}
                        >
                          <li
                            className={`d-flex mb-4 ${
                              currentUser.uid === data.sender
                                ? "flex-row-reverse"
                                : ""
                            }`}
                          >
                            <img
                              src={data.logo}
                              alt="avatar"
                              className="rounded-circle me-3 shadow-1-strong"
                              width={30}
                              height={30}
                            />
                            <div className="card m-1">
                              <div className="card-header d-flex justify-content-between p-1">
                                <p
                                  className={`fw-bold mb-0 mx-2 ${
                                    currentUser.uid === data.sender
                                      ? "message-sender"
                                      : "message-receiver"
                                  }`}
                                >
                                  {data.name}
                                  {currentUser.uid === data.sender ? (
                                    <span className="me-tag">(Me)</span>
                                  ) : null}
                                </p>
                                <p className="text-muted small mb-0">
                                  <i className="far fa-clock" />{" "}
                                  {formatMessageTime(data.time)}
                                </p>
                              </div>
                              <div className="card-body p-0">
                                <p className="mb-0 m-1">{data.text}</p>
                              </div>
                            </div>
                          </li>
                        </div>
                      ))}
                    </ul>
                  </div>

                  <form
                    onSubmit={handleSubmit((data) => {
                      handleSendMessage(data.textMsg);
                      reset();
                      scrollToMaxScroll();
                    })}
                    onKeyDown={(e) => {
                      if (e.key == "Enter") {
                        handleSubmit((data) => {
                          handleSendMessage(data.textMsg);
                          reset();
                        });
                      }
                    }}
                  >
                    <li className="bg-white mb-3 mt-3 mx-1">
                      <div className="form-outline">
                        <textarea
                          className="form-control "
                          id="textMsg"
                          {...register("textMsg", { required: true })}
                          rows={4}
                        />
                        <label
                          className="form-label"
                          htmlFor="textAreaExample2"
                        >
                          Message
                        </label>
                      </div>
                    </li>
                    <button
                      type="submit"
                      className="btn btn-info btn-rounded float-end"
                    >
                      Send
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ChatBox;
