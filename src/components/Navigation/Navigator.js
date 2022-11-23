import { NavLink } from "react-router-dom";

import NavLinks from "./NavLinks";

import styles from "./Navigator.module.css";

export default function Navigator() {
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
    </>
  );
}
