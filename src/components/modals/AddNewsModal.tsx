import { ChangeEvent, useContext, useRef, useState } from "react";
import ReactDOM from "react-dom";
import ModalActions from "./ModalActions";
import UploadImagesInput from "./components/UploadImagesInput";
import TextInput from "../UI/Inputs/TextInput";
import { ImageItemTypes, NewsItemTypes } from "../../utils/user-types";
import { ActionTypeProps } from "../../utils/types";
import { NewsContext } from "../../store/NewsContext";
import UploadedImages from "./components/UploadedImages";
import {
  removeImagesHandler,
  setImagesHandler,
} from "../../utils/helperFunctions";
import { addNews, deleteNews, updateNews } from "../../api/news";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toolbarOptions } from "../../data/helperData";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";

const Backdrop = (props: { closeModal: () => void }) => {
  return <div className="modal-container" onClick={props.closeModal} />;
};

const AddNewsOverlay = ({
  images,
  text,
  closeModal,
  news,
}: AddNewsModalTypes) => {
  const navigate = useNavigate();
  const [newText, setNewText] = useState<string | undefined>(news?.text);
  const titleRef = useRef<HTMLInputElement>(null);
  const [imagesForClient, setImagesForClient] = useState<ImageItemTypes[] | []>(
    images || []
  );
  const [imagesForServer, setImagesForServer] = useState<FileList | []>([]);
  const { state, dispatch } = useContext(NewsContext);
  const axiosPrivate = useAxiosPrivate();

  /// This function remove the image from states which are for client and server
  const onRemoveImages = (img: ImageItemTypes): void => {
    removeImagesHandler(img, setImagesForServer, setImagesForClient);
  };

  /// This function sets uploade images to states which are for client and server
  const onSetImages = (e: ChangeEvent<HTMLInputElement>): void => {
    setImagesHandler(e, setImagesForServer, setImagesForClient);
  };

  ////////////////////////////////////////////////////////////////
  const onAddUpdateDeleteNews = async (actionType: ActionTypeProps) => {
    const formData = new FormData();
    formData.append("title", titleRef.current?.value as string);
    formData.append("text", newText || "");

    switch (actionType) {
      case "add":
        await addNews(
          dispatch,
          formData,
          imagesForServer,
          closeModal,
          axiosPrivate
        );
        break;
      case "update":
        await updateNews(
          dispatch,
          formData,
          imagesForServer,
          imagesForClient,
          closeModal,
          news,
          axiosPrivate
        );
        break;
      case "delete":
        await deleteNews(
          dispatch,
          news?._id,
          closeModal,
          navigate,
          axiosPrivate
        );
        break;
      default:
        break;
    }
  };

  return (
    <div className="add-product-form add-news-form">
      <div className="address-form__header">{text}</div>
      <div className="address-form__main">
        <div className="form-inputs">
          <TextInput
            label="News title*"
            placeholder="Title"
            ref={titleRef}
            defaultValue={news?.title}
          />
        </div>
        <ReactQuill
          theme="snow"
          placeholder="Write news content..."
          value={newText}
          onChange={setNewText}
          modules={{ toolbar: toolbarOptions }}
        />

        <UploadImagesInput onChange={onSetImages} />
        <UploadedImages
          images={imagesForClient}
          onRemoveImages={onRemoveImages}
        />
      </div>

      {state.addUpdateDeleteError && !state.addUpdateDeleteLoading && (
        <div className="error-container">
          <h1>{state.addUpdateDeleteError}</h1>
        </div>
      )}
      <ModalActions
        closeModal={closeModal}
        text={text}
        onAddHandler={onAddUpdateDeleteNews.bind(null, "add")}
        onDeleteHandler={onAddUpdateDeleteNews.bind(null, "delete")}
        onUpdateHandler={onAddUpdateDeleteNews.bind(null, "update")}
        loading={state.addUpdateDeleteLoading}
      />
    </div>
  );
};

const AddNewsModal = (props: AddNewsModalTypes) => {
  const { clearError } = useContext(NewsContext);

  const closeModalHandler = () => {
    props.closeModal();
    clearError();
  };
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop closeModal={closeModalHandler} />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <AddNewsOverlay
          closeModal={closeModalHandler}
          images={props.images}
          text={props.text}
          news={props.news}
        />,
        document.getElementById("modal-root")!
      )}
    </>
  );
};

interface AddNewsModalTypes {
  closeModal: () => void;
  images?: ImageItemTypes[];
  text: string;
  news?: NewsItemTypes;
}

export default AddNewsModal;
