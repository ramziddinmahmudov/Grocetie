import ReactPaginate from "react-paginate";
import { leftArrow, rightArrow } from "./Slider/SilderButton";

const PaginationButtons = ({
  handlePageClick,
  pageCount,
}: {
  handlePageClick: (selectedItem: { selected: number }) => void;
  pageCount: number;
}) => {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel={rightArrow}
      onPageChange={handlePageClick}
      pageRangeDisplayed={1}
      marginPagesDisplayed={1}
      pageCount={pageCount}
      previousLabel={leftArrow}
      renderOnZeroPageCount={null}
      containerClassName="pagination"
      pageLinkClassName="page-num"
      previousLinkClassName="page-num"
      nextLinkClassName="page-num"
      activeLinkClassName="active-page"
    />
  );
};

export default PaginationButtons;
