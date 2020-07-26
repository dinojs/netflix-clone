import React, { useState, useEffect } from "react";
import "./Nav.css";

function Navbar() {
  const [show, handleShow] = useState(false);

  // Scroll listener
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        handleShow(true);
      } else handleShow(false);
    });
    //Every time useEffect fires up, remove the listener
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    //If show is true, append nav_balck
    <div className={`nav ${show && "nav_black"}`}>
      <img
        className="nav_logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png"
        alt="Netflix Logo"
      />
      <img
        className="nav_avatar"
        src="https://occ-0-300-1167.1.nflxso.net/dnm/api/v6/Z-WHgqd_TeJxSuha8aZ5WpyLcX8/AAAABYCq-HPaBmwWzyEo8UjC3jQ7a2mKJhU4uPbQwFrauKbu9_-6GpfPccnQh3UWZvsGLQ1MwLo_4YZ-kuTiAsqpq0oEdPXS.png?r=f71"
        alt="Avatar"
      />
    </div>
  );
}

export default Navbar;
