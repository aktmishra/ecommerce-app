import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOutAsync, selectLoggedInUser } from "../authSlice";
import { Navigate } from "react-router";

function Logout() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector(selectLoggedInUser);
   const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  useEffect(() => {
    const logout = async () => {
      try {
        setLoading(true);
        dispatch(logOutAsync());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    logout();
  }, [dispatch]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  // but useEffect runs after render, so we have to delay navigate part
  return <>{!loggedInUser && <Navigate to="/login" replace={true}></Navigate>}</>;
}

export default Logout;
