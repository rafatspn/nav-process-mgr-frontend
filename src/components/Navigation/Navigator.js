import { useState } from "react";
import { NavLink } from "react-router-dom";

import NavLinks from "./NavLinks";
import useWindowDimensions from "../../hooks/window-dimension";
import SideDrawer from "../Elements/SideDrawer";
import Avatar from "../Elements/Avatar";
import Backdrop from "../Elements/BackDrop";

import style from "./Navigator.module.css";

export default function Navigator() {
  const windowWidth = useWindowDimensions();
  const [sideDrawerIsOpen, setSideDrawerIsOpen] = useState(false);

  const sideDrawerOpenHandler = () => {
    console.log("Inside side drawer open");
    setSideDrawerIsOpen((prev)=> !prev);
  };
  const sideDrawerCloseHandler = () => {
    setSideDrawerIsOpen(false);
  };

  const avatarHandler = () => {}

  return (
    <nav>
      <div className={style.logo}>
        <NavLink to="/">
          <Avatar
            image="/assets/logo.jpg"
            height="50px"
            click={avatarHandler}
          ></Avatar>
        </NavLink>
      </div>
      {windowWidth < 670 && sideDrawerIsOpen ? (
        <Backdrop onClick={sideDrawerCloseHandler} />
      ) : null}
      {windowWidth < 670 ? (
        <SideDrawer show={sideDrawerIsOpen}>
          <NavLinks />
        </SideDrawer>
      ) : (
        <NavLinks />
      )}
      <button
        className={style.nav_menu__button}
        onClick={sideDrawerOpenHandler}
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}
