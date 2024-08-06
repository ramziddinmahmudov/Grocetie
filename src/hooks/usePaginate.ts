import { useEffect, useState } from "react";

const usePaginate = (items: any) => {
  const [currentItems, setCurrentItems] = useState(() => []);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, items, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return {
    currentItems,
    pageCount,
    handlePageClick,
  };
};

export default usePaginate;
