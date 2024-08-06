import { Link } from "react-router-dom";
import RightArrowIcon from "../UI/Icons/RightArrowIcon";
import { NewsItemTypes } from "../../utils/user-types";

const NewsCard = ({ newsItem }: { newsItem: NewsItemTypes }) => {
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    new Date(newsItem.createdAt)
  );
  const date = new Date(newsItem.createdAt).getDate();

  return (
    <Link to={`/news/${newsItem._id}`} className="news-card">
      <div className="news-card__img-box">
        <img
          className="news-card__img"
          src={newsItem.images[0].imageUrl}
          alt=""
        />
        <div className="date">
          <h3>{date}</h3>
          <span>{month}</span>
        </div>
      </div>
      <div className="news-card__content">
        <p>{newsItem.title}</p>
        <div className="view-all">
          Read More
          <RightArrowIcon />
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
