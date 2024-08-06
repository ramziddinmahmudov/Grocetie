import EmptyStateIcon from "./UI/Icons/EmptyStateIcon";
import SadMoodIcon from "./UI/Icons/SadMoodIcon";

const EmptyOrErrorContainer = ({
  text,
  error,
}: {
  text?: string;
  error?: string;
}) => {
  return (
    <div className={`${text ? "empty" : "error"}-container`}>
      {text ? <EmptyStateIcon /> : <SadMoodIcon />}
      <h1>{text ? text : error}</h1>
    </div>
  );
};

export default EmptyOrErrorContainer;
