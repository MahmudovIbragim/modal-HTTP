import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import style from "../modal/Style.module.css";

const Modal = ({ open, onClose, children }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = open && (
    <div className={style.modalOverlay}>
      <div className={style.modal}>
        <button className={style.closeButton} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );

  return isBrowser
    ? ReactDOM.createPortal(
        modalContent,
        document.getElementById("portal-root")
      )
    : null;
};

export default Modal;
