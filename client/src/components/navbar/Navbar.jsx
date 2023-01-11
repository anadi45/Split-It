import React from "react";
import { Link } from "react-router-dom";
import {useCookies} from "react-cookie";

const Navbar = () => {
  const [cookie, setCookie] = useCookies(["token"]);

  return (
    <div className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">
          <Link to="/" style={{textDecoration: "none", color: "white"}}>Split It</Link>
        </span>
        {cookie.token === undefined && <Link to="/entry" style={{textDecoration: "none"}}>
          <div className="entry-link" style={{ color: "white"}}>SignUp Login</div>
        </Link> }
        {cookie.token !== undefined && <Link to="/logout" style={{textDecoration: "none"}}>
          <div className="entry-link" style={{ color: "white"}}>LogOut</div>
        </Link> }
      </div>
    </div>
  );
};

export default Navbar;
