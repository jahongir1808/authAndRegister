import React from "react";
import { NavLink } from "react-router-dom";
import { TOKEN } from "../const";
import { deleteData } from "../server/common";
import { toast } from "react-toastify";

const Links = () => {
  const token = localStorage.getItem(TOKEN);
  const handleLogOut = () => {
    deleteData("auth/logout").then((res) => {
      toast.info("You are logged out of your profile");
      localStorage.removeItem(TOKEN);
      window.location = "/login";
    });
  };
  return (
    <div className="navbar-links">
      {token ? (
        <NavLink onClick={handleLogOut}>Logout</NavLink>
      ) : (
        <NavLink to={"/login"}>Sign in</NavLink>
      )}
      <NavLink to={"/register"}>Sign up</NavLink>
    </div>
  );
};

export default Links;
