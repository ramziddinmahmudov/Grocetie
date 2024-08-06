import { useContext, useState } from "react";
import FilterOptions from "../UI/FilterOptions";
import AddNewsModal from "../modals/AddNewsModal";
import { UserContext } from "../../store/UserContext";
import { NewsContext } from "../../store/NewsContext";

export const sortOptions = [
  { name: "Sort by: Newest", _id: "newest" },
  { name: "Sort by: Latest", _id: "latest" },
];

const NewsFilter = () => {
  const [addNewsModal, setAddNewsModal] = useState<boolean>(false);
  const { state } = useContext(UserContext);
  const { sortNews, searchNews } = useContext(NewsContext);

  const onSortHandler = (val: string) => {
    sortNews(val);
  };

  return (
    <>
      {addNewsModal && (
        <AddNewsModal
          text="Add News"
          closeModal={() => setAddNewsModal(false)}
        />
      )}
      <div className="section__head">
        <div className="news__filter">
          <div className="header__search">
            <input
              type="text"
              placeholder="Search for news"
              onChange={(e) => searchNews(e.target.value)}
            />
            <img
              className="search-icon"
              src="/assets/icons/search-icon.svg"
              alt="Search Icon"
            />
          </div>
          <FilterOptions
            options={sortOptions}
            title="Sort By: Newest"
            onSelect={(id: string) => onSortHandler(id)}
          />

          {state.user && state.user.role !== "user" && (
            <button
              className="button add-button"
              onClick={() => setAddNewsModal(true)}
              children="Add News"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default NewsFilter;
