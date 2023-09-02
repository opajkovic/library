import "./modal.css";
export default function Modal({ component, setModalClose, className }) {
  // In file were we call Modal, ModalBox shoud be set: position: relative
  // because we set modal position to absolute!!

  return (
    <div>
      <div onClick={setModalClose} className="closeModal"></div>
      <div className={className ? className : "modal"}>{component}</div>
    </div>
  );
}
