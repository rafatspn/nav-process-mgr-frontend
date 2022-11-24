import { useState } from "react";
import { NavLink } from "react-router-dom";

import NavLinks from "./NavLinks";
import useWindowDimensions from "../../hooks/window-dimension";
import SideDrawer from "../Elements/SideDrawer";

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

  return (
    <nav>
      {windowWidth < 670 ? (
        <SideDrawer show={sideDrawerIsOpen} onClick={sideDrawerCloseHandler}>
          <NavLinks />
        </SideDrawer>
      ) : (
        <NavLinks />
      )}
      <button className={style.nav_menu__button} onClick={sideDrawerOpenHandler}>
        <span />
        <span />
        <span />
      </button>
      {/* <header className={styles.header}>
        <button className={styles.navMenuBtn} onClick={sideDrawerOpenHandler}>
          <span />
          <span />
          <span />
        </button>
        <div className={styles.logo}>
          <NavLink to="/">SmartBiz</NavLink>
        </div>
        {windowWidth > 670 && (
          <nav>
            <NavLinks />
          </nav>
        )}
      </header>
      {windowWidth <= 670 && (
        <SideDrawer show={sideDrawerIsOpen} onClick={sideDrawerCloseHandler}>
          <NavLinks />
        </SideDrawer>
      )} */}
    </nav>
  );
}
