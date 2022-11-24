import { NavLink } from "react-router-dom";

import NavLinks from "./NavLinks";
// import SideDrawer from "../Elements/SideDrawer";
import useWindowDimensions from "../../hooks/window-dimension";

import styles from "./Navigator.module.css";
import { useState } from "react";

export default function Navigator() {
  const windowWidth = useWindowDimensions();
  const [sideDrawerIsOpen, setSideDrawerIsOpen] = useState(false);

  const sideDrawerOpenHandler = () => {
    setSideDrawerIsOpen(true);
    console.log(sideDrawerIsOpen);
  };
  const sideDrawerCloseHandler = () => {
    console.log("Side drawer is closed");
  };

  return (
    <>
      <header className={styles.header}>
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
      {/* {windowWidth <=670 && <SideDrawer show={sideDrawerIsOpen} />} */}
    </>
  );
}
