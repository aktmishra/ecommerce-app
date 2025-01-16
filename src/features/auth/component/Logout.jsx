import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutAsync, selectLoggedInUser } from "../authSlice";
import { Navigate } from "react-router";

function Logout() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);
  useEffect(() => {
    dispatch(logOutAsync());
  }, []);
  // but useEffect runs after render, so we have to delay navigate part
  return <>{!loggedInUser && <Navigate to="/login" replace={true}></Navigate>}</>;
}

export default Logout;
