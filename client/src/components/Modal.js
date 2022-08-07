import { useRef, useState } from "react";

const Modal = ({ modalClass, ModalBox }) => {
  const [show, setShow] = useState(false);
  const currentChild = useRef();
  const clickHandler = (e) => {
    let pointoncontainer = PointerOnContainer(
      currentChild.current.getBoundingClientRect(),
      e
    );
    if (!pointoncontainer) setShow(false);
  };

  return (
    <>
      <button className="btn-pri" onClick={() => setShow(true)}>
        Open The Modal
      </button>

      {show && (
        <div
          className={`modal ${modalClass ? modalClass : ""}`}
          onClick={clickHandler}
        >
          <div ref={currentChild}>
            <ModalBox closeModal={() => setShow(false)} />
          </div>
        </div>
      )}
    </>
  );
};

const PointerOnContainer = (client, event) => {
  if (client.left > event.clientX || client.right < event.clientX) {
    return false;
  } else if (client.top > event.clientY || client.bottom < event.clientY) {
    return false;
  } else return true;
};

export default Modal;
