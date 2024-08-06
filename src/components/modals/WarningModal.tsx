import ReactDOM from "react-dom";
import CloseIcon from "../UI/Icons/CloseIcon";
import { useState } from "react";
import LoadingButtonSpinner from "../UI/Icons/LoadingButtonSpinner";

const Backdrop = (props: { closeModal: () => void }) => {
  return <div className="modal-container" onClick={props.closeModal} />;
};

const WarningOverlay = ({
  closeModal,
  text,
  actionHandler,
}: WarningModalProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="warning">
      <div className="warning__header">
        <h3>Confirm</h3>
        <div className="warning__close" onClick={closeModal}>
          <CloseIcon />
        </div>
      </div>
      <h2>{text}</h2>
      <div className="warning__bottom">
        <button
          className="button"
          onClick={() => actionHandler(setLoading)}
          disabled={loading && true}
          children={loading ? <LoadingButtonSpinner /> : "Confirm"}
        />
        <button className="button" onClick={closeModal}>
          No, thanks
        </button>
      </div>
    </div>
  );
};

const WarningModal = ({
  closeModal,
  text,
  actionHandler,
}: WarningModalProps) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop closeModal={closeModal} />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <WarningOverlay
          closeModal={closeModal}
          text={text}
          actionHandler={actionHandler}
        />,
        document.getElementById("modal-root")!
      )}
    </>
  );
};

interface WarningModalProps {
  closeModal: () => void;
  text: string;
  actionHandler: (fn: (arg: boolean) => void) => Promise<void>;
}

export default WarningModal;
