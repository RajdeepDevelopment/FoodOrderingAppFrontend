import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SelectMeetingData,
  currentMeetingResetAsync,
  getAllAddedToEmailBoxUserAsync,
  getAllNotAddedToEmailBoxUserAsync,
  getAllUserNotAddedOnEmailSearchDataAsync,
  getMeetingDataAsync,
  getNewMeetPosttAsync,
  getUpdateAllUserDataAsync,
  getUpdateAllUserDataForPushAsync,
  getUpdateUserAddressAsync,
  selectAllUser,
  selectaddedToEmailBox,
  selectcurrentMeetingLink,
} from "../features/counter/counterSlice";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import emailjs from "emailjs-com";
import { PuffLoader } from "react-spinners";

const getStatusStyle = (status) => {
  switch (status) {
    case "Admin":
      return {
        width: "80%",
        borderRadius: 16,
        backgroundColor: "#00FF00",
      };
    case "Delivery":
      return {
        width: "50%",
        borderRadius: 16,
        backgroundColor: "#0000FF",
      };
    case "Restarunent":
      return {
        width: "60%",
        borderRadius: 16,
        backgroundColor: "#0000FF",
      };

    default:
      return {
        width: "30%",
        borderRadius: 16,
        backgroundColor: "#808080",
      };
  }
};
function openPopUp(url, windowName, width, height) {
  const left = (window.screen.width - width) / 2;
  const top = (window.screen.height - height) / 2;

  // Construct window features
  const features = `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`;

  // Open the pop-up window
  window.open(url, windowName, features);
}

function Meeting() {
  const currentMeetingLink = useSelector(selectcurrentMeetingLink);
  const addedToEmailBox = useSelector(selectaddedToEmailBox);
  const AllUserData = useSelector(selectAllUser);

  const [meetingDateTime, setMeetingDateTime] = useState(
    "2023-11-20T07:19:09Z"
  );
  const [meetingData, setMeetingData] = useState({
    topic: "",
    type: 2,
    start_time: "",
    duration: "",
    settings: {
      host_video: true,
      participant_video: true,
      join_before_host: true,
      mute_upon_entry: true,
      watermark: true,
      audio: "voip",
      auto_recording: "cloud",
    },
  });
  const [InvitePeaple, setInvitePeaple] = useState(addedToEmailBox);
  useEffect(() => {
    openPopUp("http://localhost:5000/authorize", "MyPopUp", 600, 400);
  }, []);

  useEffect(() => {
    setInvitePeaple(addedToEmailBox);
  }, [addedToEmailBox]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMeetingData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const MeetingDataGloble = useSelector(SelectMeetingData);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(getMeetingDataAsync());
    }, 4000);
  }, []);
  const [stopREpost, setstopREpost] = useState(true);

  useEffect(() => {
    dispatch(getAllNotAddedToEmailBoxUserAsync());
    dispatch(getAllAddedToEmailBoxUserAsync());
  }, []);

  //selectcurrentMeetingLink
  //currentMeetingResetAsync

  //Email Process
  const sendEmail = async (info, currentMeetingLinkk) => {
    try {
      const templateParams = {
        JobTitle: info.title,
        CompanyName: "Foodie Hub",
        InterviewDateTime: currentMeetingLinkk.start_time,
        InterviewerName: currentMeetingLinkk.host_email,
        InterviewLocation: "Online",
        UserName: info["First-name"],
        ZoomMeetingLink: currentMeetingLinkk.join_url,
        MeetingTiming: currentMeetingLinkk.start_time,
        sendmailto: info.ValidEmail,
      };

      const response = await emailjs.send(
        "service_uh907e9",
        "template_cgaki9q",
        templateParams,
        "4szVTNZYlCCrUrsiO"
      );

      console.log("Email sent successfully:", response);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  //Email Precess
  return (
    <>
      <div className="container mt-4">
        <div className="row ">
          <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
            {currentMeetingLink.length == 0 ? (
              <>
                <label className="display-6 mx-3">
                  {" "}
                  Shedule A New Meeting
                  <div className="bhag">
                    <img
                      src="https://www.freepnglogos.com/uploads/zoom-logo-png/zoom-png-logo-download-transparent-20.png"
                      style={{ height: "60%", width: "60%" }}
                    ></img>
                  </div>
                </label>
                <form
                  onSubmit={handleSubmit((data) => {
                    const newMeet = {
                      topic: data.topic,
                      type: 2,
                      start_time: data.start_time + "Z",
                      duration: data.duration,
                      settings: {
                        host_video: true,
                        participant_video: true,
                        join_before_host: true,
                        mute_upon_entry: "true",
                        watermark: "true",
                        audio: "voip",
                        auto_recording: "cloud",
                      },
                    };

                    dispatch(getNewMeetPosttAsync(newMeet));
                    reset();
                    // Swal.fire({
                    //   position: "top-end",
                    //   icon: "success",
                    //   title: "Meeting Sheduled",
                    //   showConfirmButton: false,
                    //   timer: 1000
                    // });
                  })}
                  className="meeting-form shadow p-3"
                >
                  <div className="form-group">
                    <label htmlFor="topic">Topic:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="topic"
                      {...register("topic")}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="start_time">Start Time:</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      id="start_time"
                      {...register("start_time")}
                      defaultValue={"2023-11-20T07:19:09"}
                      value={meetingDateTime.slice(0, -1)}
                      onChange={(e) => {
                        setMeetingDateTime(e.target.value + "Z");
                      }}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="duration">Duration (minutes):</label>
                    <input
                      type="number"
                      className="form-control"
                      id="duration"
                      {...register("duration")}
                      defaultValue={60}
                      value={meetingData.duration}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Checkboxes for settings */}
                  <div className="settings-checkboxes">
                    <label>
                      <input
                        className="bg-dark"
                        type="checkbox"
                        name="settings.host_video"
                        checked={meetingData.settings.host_video}
                        onChange={handleChange}
                      />
                      Host Video
                    </label>
                    {/* Add other settings checkboxes similarly */}
                  </div>
                  <div className="bhag">
                    <button type="submit" className="btn btn-primary btn-sm">
                      Shedule
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <div className="card-body shadow ">
                  <div className="">
                    <h5 className="card-title mx-2">
                      Meeting Topic: {currentMeetingLink[0]?.topic}
                    </h5>
                    <p className="card-text mx-2">
                      <strong>Meeting ID:</strong> {currentMeetingLink[0]?.id}
                    </p>
                    <p className="card-text mx-2">
                      <strong>Start Time:</strong>{" "}
                      {currentMeetingLink[0]?.start_time}
                    </p>
                    <p className="card-text mx-2">
                      <strong>Duration:</strong>{" "}
                      {currentMeetingLink[0]?.duration} minutes
                    </p>
                    <p className="card-text ">
                      <strong>Join URL:</strong>{" "}
                      <a
                        href={currentMeetingLink[0]?.join_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Join Meeting
                      </a>
                    </p>

                    <din className="bhag">
                      <button
                        className="btn btn-primary btn-lg "
                        onClick={() => {
                          InvitePeaple.forEach((user) => {
                            console.log(currentMeetingLink[0]);

                            sendEmail(user, currentMeetingLink[0]);
                          });
                          dispatch(currentMeetingResetAsync([]));

                          Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Meeting Has Sheduled",
                            showConfirmButton: false,
                            timer: 500,
                          });
                        }}
                      >
                        {" "}
                        Invite All
                      </button>
                    </din>
                  </div>{" "}
                </div>
              </>
            )}
          </div>

          <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
            <h1 className="display-5"> Added Members For Meeting</h1>
            {InvitePeaple.length !== 0 ? (
              <div
                className="p-3"
                style={{ height: "460px", width: "100%", overflowY: "auto" }}
              >
                {InvitePeaple.map((user, index) => (
                  <>
                    <div
                      key={index + "https://bootd"}
                      className="unit shadow p-2 mb-2  "
                      draggable
                    >
                      <div className="field name bhag">
                        <div className="m-2">
                          <img
                            src={
                              user?.logo
                                ? user.logo
                                : "https://bootdey.com/img/Content/avatar/avatar3.png"
                            }
                            alt="image"
                            className="avatar"
                          />{" "}
                          <div className="bhag">
                            {user["First-name"]}{" "}
                            {user["Last-name"] ? user["Last-name"] : ""}
                          </div>
                        </div>

                        <div className="lab mt-2">
                          <p>
                            <span
                              className="badge badge-outline badge-sm badge-info badge-pill mx-2"
                              onClick={() => {
                                let newHelperArray = [...InvitePeaple];
                                newHelperArray.splice(index, 1);
                                setInvitePeaple(newHelperArray);
                                dispatch(
                                  getUpdateUserAddressAsync({
                                    _id: user._id,
                                    EmailBox: "NotAdded",
                                  })
                                );
                                dispatch(
                                  getUpdateAllUserDataForPushAsync(user)
                                );
                              }}
                            >
                              Remove
                            </span>
                          </p>
                          <div className="field email">
                            {" "}
                            Email : {user.ValidEmail}
                          </div>
                        </div>
                      </div>
                      <div className="field phone">
                        {" "}
                        {user.phone ? user.phone : 9838843993}
                        <div className="progress progress-xs">
                          <div
                            className="progress-bar progress-bar-info"
                            role="progressbar"
                            aria-valuenow={20}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            style={getStatusStyle(user?.Access)}
                          >
                            <span className="">
                              {user.Access ? user.Access : "User"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            ) : (
              <> Add Members</>
            )}
          </div>

          <div className="col-sm-12 col-md-4 col-lg-4 col-xl-4">
            <h1 className="display-6 bhag"> All Users</h1>
            <div className="row p-4">
              <div className=" col-6">
                <input
                  type="text"
                  className=""
                  placeholder="Search"
                  style={{
                    width: "100%",
                    padding: "4px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    fontSize: "16px",
                    outline: "none" /* Remove default focus outline */,
                  }}
                  onChange={(e) => {
                    if (e.target.value == "") {
                      dispatch(getAllNotAddedToEmailBoxUserAsync());
                    } else {
                      dispatch(
                        getAllUserNotAddedOnEmailSearchDataAsync(e.target.value)
                      );
                    }
                  }}
                />
              </div>
              <div className="col-5 bg-dark"></div>
            </div>
            <div
              className="p-3"
              style={{ height: "440px", width: "100%", overflowY: "auto" }}
            >
              {AllUserData.map((user, index) => (
                <div
                  key={index + "m/img/Content/ava"}
                  className="unit shadow p-2 mb-2  "
                  draggable
                >
                  <div className="field name bhag">
                    <div className="m-2">
                      <img
                        src={
                          user?.logo
                            ? user.logo
                            : "https://bootdey.com/img/Content/avatar/avatar3.png"
                        }
                        alt="image"
                        className="avatar"
                      />{" "}
                      <div className="bhag">
                        {user["First-name"]}{" "}
                        {user["Last-name"] ? user["Last-name"] : ""}
                      </div>
                    </div>

                    <div className="lab mt-2">
                      <p>
                        <span
                          className="badge badge-outline badge-sm badge-info badge-pill mx-2"
                          onClick={() => {
                            setInvitePeaple([...InvitePeaple, user]);
                            dispatch(
                              getUpdateUserAddressAsync({
                                _id: user._id,
                                EmailBox: "Added",
                              })
                            );
                            dispatch(getUpdateAllUserDataAsync(index));
                          }}
                        >
                          Invite
                        </span>
                      </p>
                      <div className="field email">
                        {" "}
                        Email : {user.ValidEmail}
                      </div>
                    </div>
                  </div>
                  <div className="field phone">
                    {" "}
                    {user.phone ? user.phone : 9838843993}
                    <div className="progress progress-xs">
                      <div
                        className="progress-bar progress-bar-info"
                        role="progressbar"
                        aria-valuenow={20}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={getStatusStyle(user?.Access)}
                      >
                        <span className="">
                          {user.Access ? user.Access : "User"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-4">
        <h1 className="mb-4">Zoom Meeting List</h1>
        <div
          className="row"
          style={{ height: "600px", width: "100%", overflowY: "auto" }}
        >
          {MeetingDataGloble?.length !== 0 ? (
            <>
              {MeetingDataGloble.map((meeting, index) => (
                <div key={index + meeting.id} className="col-lg-4 col-md-6">
                  <div className="card shadow-sm mb-4">
                    <div className="card-body">
                      <h5 className="card-title">{meeting.topic}</h5>
                      <p className="card-text">
                        <strong>Meeting ID:</strong> {meeting.id}
                      </p>
                      <p className="card-text">
                        <strong>Start Time:</strong> {meeting.start_time}
                      </p>
                      <p className="card-text">
                        <strong>Duration:</strong> {meeting.duration} minutes
                      </p>
                      <p className="card-text">
                        <strong>Join URL:</strong>{" "}
                        <a
                          href={meeting.join_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Join Meeting
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <PuffLoader color="#00c9f6" size={75} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Meeting;
