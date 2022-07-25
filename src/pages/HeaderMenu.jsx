import React from "react";
import { Link } from "react-router-dom";


import "./HeaderMenu.css";

const HeaderMenu = () => {
  return (
    <div className="list_containar">
      <ul className="list_ul">
      <Link to={`/`}>
        <li>
        <button className="btn">Main Manu</button>
        </li>
      </Link>
      <Link to={`/mylist`}>
        <li>
        <button className="btn">My list</button>
        </li>
        
      </Link>
      </ul>
   
    </div>
  );
};

export default HeaderMenu;
