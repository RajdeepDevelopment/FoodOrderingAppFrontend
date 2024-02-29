import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobDataAsync, getJobDataPostAsync, selectPreviousUserData, selectjobOpenings } from "./counter/counterSlice";
import { useNavigate } from "react-router-dom";



  

function Career (){
    const dispatch = useDispatch()
   const jobOpenings = useSelector(selectjobOpenings);
   const prevUser = useSelector(selectPreviousUserData); 
    useEffect(()=>{

   dispatch(getJobDataAsync())

    }, [])
 const navigate = useNavigate()

  function jobPostfunction(job , user) {

    const postData = {...job, ...user, time: Date.now(), status: "pending" }
    dispatch(getJobDataPostAsync(postData))
  }
if(prevUser?.length===0){
    navigate("/")
}
    return(

        <>

<div className="container mt-5">
  <div className="text-center mb-5">
    <h3>Jobs openning</h3>
    <p className="lead">
      Eros ante urna tortor aliquam nisl magnis quisque hac
    </p>
  </div>

  <div  style={{ height: '600px', width: '100%', overflowY: 'auto' }}>  
   {  jobOpenings?.length !=0 && jobOpenings.map((job,index)=>(

<div key={index+job.title.charAt(0) } className="card mb-3">
    <div className="card-body">
      <div className="d-flex flex-column flex-lg-row">
        <span className="avatar avatar-text rounded-3 me-4 mb-2">{job.title.charAt(0)} </span>
        <div className="row flex-fill">
          <div className="col-sm-5">
            <h4 className="h5">{job.title}</h4>
            <span className="badge bg-secondary">{job.location}</span>{" "}
            <span className="badge bg-success">{job.salary}</span>
          </div>
          <div className="col-sm-4 py-2">

            {job.skills.map((skill, index)=>(
  <span key={index+ skill} className="badge bg-secondary">{skill}</span>
            ))}
          
          
          </div>
          <div className="col-sm-3 text-lg-end">
            
            <button  className="btn btn-primary stretched-link" onClick={()=>{
                jobPostfunction(job,{...prevUser[0]})
            }}>
              Apply
            </button>

          </div>
        </div>
      </div>
    </div>
  </div>

 ))}
  
</div> 
 
</div>

        </>
    )
}

export default Career; 