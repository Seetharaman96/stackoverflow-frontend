import { Link } from "react-router-dom";
import "./Navbar.css";
import React from "react";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="title">
        <img
          className="stackoverflow"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Stack_Overflow_icon.svg/1200px-Stack_Overflow_icon.svg.png"
          alt="stackoverflow.img"
        />
        <Link to="/">Stackoverflow</Link>
      </div>
      <div className="sub-title">
        <Link to="/questions">Questions</Link>
        <Link to="/users">Users</Link>
        {/* <Link to="/companies">Companies</Link> */}
      </div>
    </div>
  );
};

export default Navbar;
