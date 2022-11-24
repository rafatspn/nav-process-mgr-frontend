import { NavLink } from "react-router-dom";

import NavLinks from "./NavLinks";
import SideDrawer from "../Elements/SideDrawer";
import useWindowDimensions from "../../hooks/window-dimension";

import styles from "./Navigator.module.css";

export default function Navigator() {
  const windowWidth = useWindowDimensions();
  console.log(windowWidth);
  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <NavLink to="/">SmartBiz</NavLink>
        </div>
        <nav>
          <NavLinks />
        </nav>
      </header>
      <SideDrawer/>
    </>
  );
}
