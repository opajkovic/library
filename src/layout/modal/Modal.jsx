import "./modal.css";

export default function Modal({ component, setModalClose, className }) {
  return (
    <div>
      <div
        onClick={() => {
          setModalClose();
        }}
        className="closeModal"
      ></div>
      <div className={className ? className : "modal"}>{component}</div>
    </div>
  );
}
