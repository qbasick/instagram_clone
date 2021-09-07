import "../../styles/modal.css";
import {useEffect} from "react";
export default function Modal({active, setActive, children, classStyle="modal-content"}) {

    return (
        <div className={active ? "modal active" : "modal"}
             onClick={() => setActive(false)}>
            <div className={active ? `${classStyle} active` : "modal-content"}
                 onClick={(event) => event.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}
