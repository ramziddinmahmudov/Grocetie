import TwitterIcon from "./Icons/TwitterIcon";
import FaceBookIcon from "./Icons/FaceBookIcon";
import TelegramIcon from "./Icons/TelegramIcon";
import WhatsappIcon from "./Icons/WhatsappIcon";

const SocialAppsIcons = () => {
  return (
    <div className="social__icon">
      <div className="social__icon--link">
        <FaceBookIcon />
      </div>
      <div className="social__icon--link">
        <TwitterIcon />
      </div>
      <div className="social__icon--link">
        <TelegramIcon />
      </div>
      <div className="social__icon--link">
        <WhatsappIcon />
      </div>
    </div>
  );
};

export default SocialAppsIcons;
