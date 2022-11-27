import React from 'react'
import ReactDOM  from 'react-dom'
import { CSSTransition } from 'react-transition-group'

import './SideDrawer.css'

export default function SideDrawer(props) {
  const drawer = (
    <CSSTransition
    in={props.show}
    timeout={500}
    classNames="slide-in-left"
    mountOnEnter
    unmountOnExit
    >
      <aside className='side-drawer' onClick={props.onClick}>
        {props.children}
      </aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(drawer, document.getElementById('drawer-hook'));
}
