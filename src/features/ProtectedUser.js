import { useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom";
import { selectAllUser, selectPreviousUserData } from "./counter/counterSlice";

function ProtectedUser({children}){
 const currectUser = useSelector(selectPreviousUserData);
     const navigate = useNavigate();
    if(currectUser?.length!==0){

         return  children
     }
     else{

        return  <Navigate to={"/login"}> </Navigate>
     }
       

}

export default ProtectedUser;