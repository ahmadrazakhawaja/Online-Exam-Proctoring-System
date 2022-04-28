import React from "react";
import { Outlet, useOutletContext, useMatch, useParams } from "react-router";


const VerifyAdmin = (props) => {
    const [socket, setSocket] = useOutletContext();
    const { id } = useParams();
    
    const checkRoom = () => {
          if (localStorage.getItem("room-info")) {
            let tmp = JSON.parse(localStorage.getItem("room-info"));
            if(tmp.adminID){
                
                if( id === tmp._id){
                    return true;
                }
            }
            return false;
          }
          return false;
         
        };
        
    

const admin = checkRoom();
if(admin === true){
    return <Outlet {...props} context={[socket, setSocket]} />;
}
else{
    return 'Access Not Allowed';
}
};

export default VerifyAdmin;