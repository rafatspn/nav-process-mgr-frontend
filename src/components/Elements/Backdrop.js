import ReactDOM from 'react-dom'

import './Backdrop.css'

export default function Backdrop(props) {
    return ReactDOM.createPortal(
        <div className="backdrop" onClick={props.onClick}>
            {props.children}
        </div>,
        document.getElementById('backdrop-hook')
    )
}
