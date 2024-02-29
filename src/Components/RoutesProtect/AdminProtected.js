import { Navigate } from "react-router-dom";
import { selectPreviousUserData } from "../../features/counter/counterSlice";
import { useSelector } from "react-redux";


function AdminPretected({children}){
    const currectUser = useSelector(selectPreviousUserData);
    const prevUser = useSelector(selectPreviousUserData)
   
       if(currectUser?.length!==0 && prevUser[0].Access==="Admin" ){
           
            return  children
        }
        else{
   
           return  <Navigate to={"/"}> </Navigate>
        }
          
   
   }

export default AdminPretected; 