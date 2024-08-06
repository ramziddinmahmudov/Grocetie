import { TeamMemberTypes } from "../../utils/types";
import SocialAppsIcons from "../UI/SocialAppsIcons";

const TeamMember = ({ image, name, position }: TeamMemberTypes) => {
  return (
    <div className="team__member">
      <div className="team__member--img">
        <img src={image} alt="" />
        <div className="team__member--social">
          <SocialAppsIcons />
        </div>
      </div>
      <div className="team__member--info">
        <h5>{name}</h5>
        <span>{position}</span>
      </div>
    </div>
  );
};

export default TeamMember;
