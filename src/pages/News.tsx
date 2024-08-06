import { useContext, useEffect, useLayoutEffect } from "react";
import NewsCard from "../components/newsCard/NewsCard";
import NewsFilter from "../components/newsCard/NewsFilter";
import LoginFirst from "../components/LoginFirst";
import { NewsActionKind, NewsContext } from "../store/NewsContext";
import { UserContext } from "../store/UserContext";
import NewsItemSkeleton from "../skeletons/NewsItemSkeleton";
import EmptyOrErrorContainer from "../components/EmptyOrErrorContainer";
import { getAllNews } from "../api/news";

const NewsPage = () => {
  const { state } = useContext(UserContext);
  const {
    state: { news, newsLoading, error, searchedNews },
    dispatch,
  } = useContext(NewsContext);

  useLayoutEffect(() => {
    if (state.user && !news) dispatch({ type: NewsActionKind.GET_NEWS_START });
  }, [dispatch, news, state.user]);

  useEffect(() => {
    if (state.user) (async () => await getAllNews(dispatch))();
  }, [dispatch, state.user]);

  const newsArr = searchedNews ? searchedNews : news;

  if (state.user === null) return <LoginFirst />;

  return (
    <div className="section-md news-page">
      <div className="container">
        <NewsFilter />

        <div className="all-news">
          {newsLoading && (
            <>
              {Array.from({ length: 20 }).map((_, i) => (
                <NewsItemSkeleton key={i} />
              ))}
            </>
          )}

          {newsArr?.map((item) => (
            <NewsCard newsItem={item} key={item._id} />
          ))}
        </div>

        {newsArr?.length === 0 && !error && (
          <EmptyOrErrorContainer text="Sorry, we couldn't find any news." />
        )}

        {error && !newsLoading && <EmptyOrErrorContainer error={error} />}
      </div>
    </div>
  );
};

export default NewsPage;
