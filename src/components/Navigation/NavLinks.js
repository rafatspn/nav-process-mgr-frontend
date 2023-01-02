import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

import style from './NavLink.module.css'

export default function NavLinks(props) {
    const auth = useContext(AuthContext)
    return (
        <div className={style.nav_box}>
            {auth.isLoggedIn && <div className={style.nav_item}>
                <NavLink
                    to="/"
                    className={(obj) =>
                        obj.isActive
                            ? style.link + ' ' + style.active
                            : style.link
                    }
                    activeclassname={style.active}
                    style={{ textDecoration: 'none' }}>
                    Dashboard
                </NavLink>
            </div>}
            {auth.isLoggedIn && <div className={style.nav_item}>
                <NavLink
                    to="/trends"
                    className={(obj) =>
                        obj.isActive
                            ? style.link + ' ' + style.active
                            : style.link
                    }
                    activeclassname={style.active}
                    style={{ textDecoration: 'none' }}>
                    Trends
                </NavLink>
            </div>}
            {auth.isLoggedIn && <div className={style.nav_item}>
                <NavLink
                    to="/summary"
                    className={(obj) =>
                        obj.isActive
                            ? style.link + ' ' + style.active
                            : style.link
                    }
                    activeclassname={style.active}
                    style={{ textDecoration: 'none' }}>
                    Summary
                </NavLink>
            </div>}
            {auth.isLoggedIn && <div className={style.nav_item}>
                <NavLink
                    to="/reports"
                    className={(obj) =>
                        obj.isActive
                            ? style.link + ' ' + style.active
                            : style.link
                    }
                    activeclassname={style.active}
                    style={{ textDecoration: 'none' }}>
                    Reports
                </NavLink>
            </div>}
            {/* {!auth.isLoggedIn && <div className={style.nav_item}>
                <NavLink
                    to="/signup"
                    className={(obj) =>
                        obj.isActive
                            ? style.link + ' ' + style.active
                            : style.link
                    }
                    activeclassname={style.active}
                    style={{ textDecoration: 'none' }}>
                    Signup
                </NavLink>
            </div>} */}
            {!auth.isLoggedIn && <div className={style.nav_item}>
                <NavLink
                    to="/login"
                    className={(obj) =>
                        obj.isActive
                            ? style.link + ' ' + style.active
                            : style.link
                    }
                    activeclassname={style.active}
                    style={{ textDecoration: 'none' }}>
                    Login
                </NavLink>
            </div>}
            {auth.isLoggedIn && <div className={style.nav_item}>
                <NavLink
                    to="/login"
                    className={(obj) =>
                        obj.isActive
                            ? style.link + ' ' + style.active
                            : style.link
                    }
                    activeclassname={style.active}
                    style={{ textDecoration: 'none' }}>
                    Logout
                </NavLink>
            </div>}
        </div>
    )
}
