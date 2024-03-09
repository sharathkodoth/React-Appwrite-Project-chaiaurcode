import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout } from "../../features/authSlice";

function LogoutBtn() {
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    setLoggingOut(true);
    try {
      await authService.logout();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // handling logout error
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <button
      className={`inline-block px-6 py-2 duration-200 rounded-full ${
        loggingOut ? "cursor-not-allowed opacity-50" : "hover:text-neutral-400"
      }`}
      onClick={logoutHandler}
      disabled={loggingOut}
    >
      {loggingOut ? "Logging out..." : "Logout"}
    </button>
  );
}

export default LogoutBtn;
