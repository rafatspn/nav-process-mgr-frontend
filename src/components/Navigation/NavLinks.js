import { NavLink } from "react-router-dom";

import styles from "./NavLink.module.css";

export default function NavLinks(props) {
  return (
    <>
      <ul>
        <li>
          <NavLink to="/" className={styles.navLink}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/trends" className={styles.navLink}>
            Trends
          </NavLink>
        </li>
        <li>
          <NavLink to="/summary" className={styles.navLink}>
            Summary
          </NavLink>
        </li>
        <li>
          <NavLink to="/reports" className={styles.navLink}>
            Reports
          </NavLink>
        </li>
        <li>
          <NavLink to="/signup" className={styles.navLink}>
            Signup
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.navLink}>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.navLink}>
            Logout
          </NavLink>
        </li>
      </ul>
    </>
  );
}
