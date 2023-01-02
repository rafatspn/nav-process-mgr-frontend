import React, { useContext, useEffect } from "react";

import { AuthContext } from "../context/AuthContext";

export default function Logout() {
  let auth = useContext(AuthContext)
  useEffect(()=>{
    auth.logout()
  },[])
  
  return (
    <>
     <div style={{textAlign:'center'}}>Logging out...</div>
    </>
  );
}
