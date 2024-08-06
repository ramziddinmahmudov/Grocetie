import ReactDOM from "react-dom";
import FaceBookIcon from "../UI/Icons/FaceBookIcon";
import WhatsappIcon from "../UI/Icons/WhatsappIcon";
import LinkedinIcon from "../UI/Icons/LinkedinIcon";
import TelegramIcon from "../UI/Icons/TelegramIcon";
import TwitterIcon from "../UI/Icons/TwitterIcon";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from "react-share";
import { SocialShareTypes } from "../../utils/types";

const Backdrop = ({ closeModal }: { closeModal: () => void }) => {
  return <div className="modal-container" onClick={closeModal} />;
};

const SocialShareOverlay = ({ text, url, closeModal }: SocialShareTypes) => {
  const hideModalHandler = (e: React.MouseEvent) => {
    if ((e.target as HTMLDivElement).className !== "social-share__buttons")
      closeModal();
  };

  return (
    <div className="social-share">
      <h2>Share this {text}</h2>
      <div className="social-share__buttons" onClick={hideModalHandler}>
        <FacebookShareButton url={url}>
          <div className="share-icon-box">
            <FaceBookIcon />
          </div>
        </FacebookShareButton>
        <TwitterShareButton url={url}>
          <div className="share-icon-box">
            <TwitterIcon />
          </div>
        </TwitterShareButton>
        <LinkedinShareButton url={url}>
          <div className="share-icon-box">
            <LinkedinIcon />
          </div>
        </LinkedinShareButton>
        <WhatsappShareButton url={url}>
          <div className="share-icon-box">
            <WhatsappIcon />
          </div>
        </WhatsappShareButton>
        <TelegramShareButton url={url}>
          <div className="share-icon-box">
            <TelegramIcon />
          </div>
        </TelegramShareButton>
      </div>
      <p>We appreciate your sharing!</p>
    </div>
  );
};

const SocialShareModal = ({ text, closeModal, url }: SocialShareTypes) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop closeModal={closeModal} />,
        document.getElementById("backdrop-root")!
      )}
      {ReactDOM.createPortal(
        <SocialShareOverlay text={text} closeModal={closeModal} url={url} />,
        document.getElementById("modal-root")!
      )}
    </>
  );
};

export default SocialShareModal;
