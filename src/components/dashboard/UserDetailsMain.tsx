import { memo, useRef } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const UserDetailsMain = ({
  photo,
  name,
  username,
  phoneNumber,
  email,
  edit = false,
}: UserDetailsMainProps) => {
  const emailRef = useRef<HTMLParagraphElement>(null);

  // Copy email to clipboard
  const copyEmailHandler = async () => {
    const email = emailRef.current?.textContent;
    if ((await navigator.clipboard.readText()) === email) return;
    navigator.clipboard.writeText(email!);
    toast.success("Email copied.");
  };

  return (
    <div className="user__details--left">
      <img src={photo} alt="" />
      <div className="user__details--info">
        <h5>{name}</h5>
        <p>{username}</p>
        {phoneNumber && <p>{phoneNumber}</p>}
        <p ref={emailRef}>
          <ContentCopyIcon onClick={copyEmailHandler} />
          {email}
        </p>
        {edit && (
          <div className="user__details--edit">
            <Link to="/settings">Edit Profile </Link>
          </div>
        )}
      </div>
    </div>
  );
};

interface UserDetailsMainProps {
  edit?: boolean;
  photo: string;
  name: string;
  username: string;
  phoneNumber: string;
  email: string;
}

export default memo(UserDetailsMain);
