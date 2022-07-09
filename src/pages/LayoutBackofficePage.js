import React, {useState} from "react";
import BackofficeUser from "../components/Backoffice/BackoficeUser";
import BackofficeAdmin from "../components/Backoffice/BackofficeAdmin";





const LayoutBackofficePage =() =>{

  const [status, setStatus] = useState(false)

  const authAdmin = ()=>{
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
  
   var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
   };
  
   fetch(process.env.REACT_APP_SERVER_BASE_URL +"/auth/me", requestOptions)
    .then(response => response.json())
    .then(result => {
      if(result.roleId ===1){
        setStatus(true)
      }
    })
    .catch(error => console.log('error', error));
  }
  
  authAdmin()

  
  
   if(status === false){
    return(
      <BackofficeUser></BackofficeUser>

    )
   }else{
    return(
      <BackofficeAdmin></BackofficeAdmin>
    )
   }
}

export default LayoutBackofficePage;