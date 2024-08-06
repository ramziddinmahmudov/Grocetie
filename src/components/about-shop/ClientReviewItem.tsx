import RatingsStars from "../UI/RatingsStars";

const ClientReviewItem = () => {
  return (
    <div className="client-review">
      <img src="/assets/icons/quote-icon.svg" alt="" />
      <p>
        Malesuada tellus arcu sociis lobortis adipiscing hendrerit etiam in
        inceptos. Congue mus sociis platea suscipit torquent commodo. Adipiscing
        malesuada dictumst.
      </p>
      <div className="client-review__user">
        <div className="client-review__user--info">
          <img src="/assets/images/users/default.jpg" alt="" />
          <div className="client-review__user--info-details">
            <h2>Dianne Russell</h2>
            <span>Customer</span>
          </div>
        </div>
        <div className="client-review__ratings">
          <RatingsStars ratingsAverage={5} notRatingsQuantity={true} />
        </div>
      </div>
    </div>
  );
};

export default ClientReviewItem;
