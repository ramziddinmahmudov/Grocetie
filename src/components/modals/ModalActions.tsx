const ModalActions = ({
  closeModal,
  text,
  onUpdateHandler,
  onDeleteHandler,
  onAddHandler,
  loading,
}: ModalActionsProps) => {
  return (
    <div className="address-form__bottom">
      <button
        className="button button-md"
        onClick={text.includes("Edit") ? onUpdateHandler : onAddHandler}
        disabled={loading && true}
        children={text}
      />
      <div>
        {text.includes("Edit") && (
          <button
            className="button button-md delete-button"
            children="Delete"
            onClick={onDeleteHandler}
            disabled={loading && true}
          />
        )}
        <button
          className="button button-md"
          onClick={closeModal}
          disabled={loading && true}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

interface ModalActionsProps {
  closeModal: () => void;
  onUpdateHandler: () => Promise<void>;
  onAddHandler: () => Promise<void>;
  onDeleteHandler: () => Promise<void>;
  text: string;
  loading: boolean;
}

export default ModalActions;
