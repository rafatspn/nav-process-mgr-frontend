import { NavLink } from "react-router-dom";

import style from "./NavLink.module.css";

export default function NavLinks(props) {
  return (
    <div className={style.nav_box}>
      <div className={style.nav_item}>
        <NavLink
          to="/"
          className="link"
          activeclassname="active"
          style={{ textDecoration: "none" }}
        >
          Home
        </NavLink>
      </div>
      <div className={style.nav_item}>
        <NavLink
          to="/trends"
          className="link"
          activeclassname="active"
          style={{ textDecoration: "none" }}
        >
          Trends
        </NavLink>
      </div>
      <div className={style.nav_item}>
        <NavLink
          to="/summary"
          className="link"
          activeclassname="active"
          style={{ textDecoration: "none" }}
        >
          Summary
        </NavLink>
      </div>
      <div className={style.nav_item}>
        <NavLink
          to="/reports"
          className="link"
          activeclassname="active"
          style={{ textDecoration: "none" }}
        >
          Reports
        </NavLink>
      </div>
      <div className={style.nav_item}> 
        <NavLink
          to="/signup"
          className="link"
          activeclassname="active"
          style={{ textDecoration: "none" }}
        >
          Signup
        </NavLink>
      </div>
      <div className={style.nav_item}>
        <NavLink
          to="/login"
          className="link"
          activeclassname="active"
          style={{ textDecoration: "none" }}
        >
          Login
        </NavLink>
      </div>
      <div className={style.nav_item}>
        <NavLink
          to="/login"
          className="link"
          activeclassname="active"
          style={{ textDecoration: "none" }}
        >
          Logout
        </NavLink>
      </div>
    </div>
  );
}
