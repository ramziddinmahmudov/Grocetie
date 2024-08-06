import { useContext, useEffect, useLayoutEffect, useState } from "react";
import AddNewsModal from "../components/modals/AddNewsModal";
import NewsImagesSlider from "../components/UI/Slider/NewsImagesSlider";
import SocialShareModal from "../components/modals/SocialShareModal";
import { getNewsItem } from "../api/news";
import { NewsActionKind, NewsContext } from "../store/NewsContext";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { UserContext } from "../store/UserContext";
import { formatDate } from "../utils/helperFunctions";
import EmptyOrErrorContainer from "../components/EmptyOrErrorContainer";

const NewsDetails = () => {
  const { newsId } = useParams();
  const [shareModal, setShareModal] = useState(() => false);
  const [addNewsModal, setAddNewsModal] = useState(() => false);
  const {
    state: { user },
  } = useContext(UserContext);
  const {
    state: { newsItem, newsItemLoading, error },
    dispatch,
  } = useContext(NewsContext);

  useLayoutEffect(() => {
    dispatch({ type: NewsActionKind.GET_NEWSITEM_START });
  }, [dispatch]);

  useEffect(() => {
    (async () => await getNewsItem(dispatch, newsId!))();
  }, [dispatch, newsId]);

  if (newsItemLoading) return <LoadingSpinner />;

  return (
    <>
      {shareModal && (
        <SocialShareModal
          text="news"
          closeModal={() => setShareModal(false)}
          url={`${window.location.origin}/news/${newsItem?._id}`}
        />
      )}
      {addNewsModal && newsItem && (
        <AddNewsModal
          text="Edit News"
          closeModal={() => setAddNewsModal(false)}
          images={newsItem.images}
          news={newsItem}
        />
      )}
      <div className="section-sm">
        <div className="container">
          {newsItem && (
            <div className="news">
              <div className="news__header">
                <h4>
                  <svg>
                    <use href="/assets/icons/icons.svg#icon-bell"></use>
                  </svg>
                  News
                </h4>
                <span>{formatDate(newsItem.createdAt)}</span>
              </div>
              <NewsImagesSlider images={newsItem?.images!} />
              <div className="news__title">
                <h5>{newsItem?.title}</h5>
                <img
                  onClick={() => setShareModal(!shareModal)}
                  className="news__share"
                  src="/assets/icons/share-icon.svg"
                  alt=""
                />
              </div>
              <div className="news__text">
                <div dangerouslySetInnerHTML={{ __html: newsItem?.text }} />

                {user && user.role !== "user" && (
                  <button
                    className="button edit-news"
                    onClick={() => setAddNewsModal(true)}
                    children="Edit News"
                  />
                )}
              </div>
            </div>
          )}

          {error && <EmptyOrErrorContainer error={error} />}
        </div>
      </div>
    </>
  );
};

export default NewsDetails;
