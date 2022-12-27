import { NavLink } from 'react-router-dom'

import style from './NavLink.module.css'
//import "./NavLink.css"

// export default function NavLinks(props) {
//   return (
//     <div className='nav_box'>
//       <div className={style.nav_item}>
//         <NavLink
//           to="/"
//           className={obj=> obj.isActive ? style.link + ' ' + style.active : style.link}
//           activeclassname={style.active}
//           style={{ textDecoration: "none" }}
//         >
//           Home
//         </NavLink>
//       </div>
//       <div className={style.nav_item}>
//         <NavLink
//           to="/trends"
//           className={obj=> obj.isActive ? style.link + ' ' + style.active : style.link}
//           activeclassname={style.active}
//           style={{ textDecoration: "none" }}
//         >
//           Trends
//         </NavLink>
//       </div>
//       <div className={style.nav_item}>
//         <NavLink
//           to="/summary"
//           className={obj=> obj.isActive ? style.link + ' ' + style.active : style.link}
//           activeclassname={style.active}
//           style={{ textDecoration: "none" }}
//         >
//           Summary
//         </NavLink>
//       </div>
//       <div className={style.nav_item}>
//         <NavLink
//           to="/reports"
//           className={obj=> obj.isActive ? style.link + ' ' + style.active : style.link}
//           activeclassname={style.active}
//           style={{ textDecoration: "none" }}
//         >
//           Reports
//         </NavLink>
//       </div>
//       <div className={style.nav_item}>
//         <NavLink
//           to="/signup"
//           className={obj=> obj.isActive ? style.link + ' ' + style.active : style.link}
//           activeclassname={style.active}
//           style={{ textDecoration: "none" }}
//         >
//           Signup
//         </NavLink>
//       </div>
//       <div className={style.nav_item}>
//         <NavLink
//           to="/login"
//           className={obj=> obj.isActive ? style.link + ' ' + style.active : style.link}
//           activeclassname={style.active}
//           style={{ textDecoration: "none" }}
//         >
//           Login
//         </NavLink>
//       </div>
//       <div className={style.nav_item}>
//         <NavLink
//           to="/login"
//           className={obj=> obj.isActive ? style.link + ' ' + style.active : style.link}
//           activeclassname={style.active}
//           style={{ textDecoration: "none" }}
//         >
//           Logout
//         </NavLink>
//       </div>
//     </div>
//   );
// }

// obj =>{
//   console.log(obj.isActive);
//   if(obj.isActive){
//     console.log(obj.isActive);
//     return style.link + ' ' + style.active
//   }else{
//     console.log("Bleh");
//     return style.link
//   }
// }

export default function NavLinks(props) {
    return (
        <div className={style.nav_box}>
            <div className={style.nav_item}>
                <NavLink
                    to="/"
                    className={(obj) =>
                        obj.isActive
                            ? style.link + ' ' + style.active
                            : style.link
                    }
                    activeclassname={style.active}
                    style={{ textDecoration: 'none' }}>
                    Home
                </NavLink>
            </div>
            <div className={style.nav_item}>
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
            </div>
            <div className={style.nav_item}>
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
            </div>
            <div className={style.nav_item}>
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
            </div>
            <div className={style.nav_item}>
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
            </div>
            <div className={style.nav_item}>
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
            </div>
            <div className={style.nav_item}>
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
            </div>
        </div>
    )
}
