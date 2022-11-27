import { useState } from "react";
import { NavLink } from "react-router-dom";

import NavLinks from "./NavLinks";
import useWindowDimensions from "../../hooks/window-dimension";
import SideDrawer from "../Elements/SideDrawer";
import Avatar from "../Elements/Avatar";

import style from "./Navigator.module.css";

export default function Navigator() {
  const windowWidth = useWindowDimensions();
  const [sideDrawerIsOpen, setSideDrawerIsOpen] = useState(false);

  const sideDrawerOpenHandler = () => {
    setSideDrawerIsOpen(true);
  };
  const sideDrawerCloseHandler = () => {
    setSideDrawerIsOpen(false);
  };

  const avatarHandler = () => {}

  return (
    <nav>
      <div className="logo">
        <NavLink to="/">
          <Avatar
            image="/assets/logo.jpg"
            height="50px"
            click={avatarHandler}
          ></Avatar>
        </NavLink>
      </div>
      {width < 670 && sideDrawerIsOpen ? (
        <BackDrop onClick={sideDrawerCloseHandler} />
      ) : null}
      {windowWidth < 670 && sideDrawerIsOpen ? (
        <SideDrawer show={sideDrawerIsOpen} onClick={sideDrawerCloseHandler}>
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
