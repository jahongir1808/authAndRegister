import React from "react";
import { NavLink } from "react-router-dom";
import { Links } from "../pages";
import "./Navbar.scss";
import { TOKEN } from "../const";

const Navbar = () => {
  const token = localStorage.getItem(TOKEN);
  return (
    <nav className="nav">
      <div className="container navbar">
        <div className="navbar-menus">
          <NavLink to={"/about"}>About Us</NavLink>
          {token ? <NavLink to={"/home"}>Profile</NavLink> : null}
        </div>
        <Links />
      </div>
    </nav>
  );
};

export default Navbar;
