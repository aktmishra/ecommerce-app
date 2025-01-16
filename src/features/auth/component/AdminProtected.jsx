import React from 'react'
import { useSelector } from 'react-redux'
import { selectLoggedInUser } from '../authSlice'
import { Navigate } from 'react-router';

function AdminProtected({children}) {
 const loggedInUser = useSelector(selectLoggedInUser)


 if (!loggedInUser) {
    return <Navigate to="/login" replace={true}></Navigate>;
  }

 if (loggedInUser && loggedInUser.role === "admin") {
    return <Navigate to="/admin" replace = {true}></Navigate>
 } 

  return children;
}

export default AdminProtected
