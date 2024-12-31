import React from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../authSlice'
import { Navigate } from 'react-router';

function AdminProtected({children}) {
 const user = useSelector(selectLoggedInUser)


 if (!user) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }

 if (user && user === "admin") {
    return <Navigate to="/" replace = {true}></Navigate>
 } 

  return children;
}

export default AdminProtected
