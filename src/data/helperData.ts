/// ADD PRODUCT MODAL HELPER DATA
export const weightOptions = [
  { name: "kg", _id: "kg" },
  { name: "g", _id: "g" },
  { name: "l", _id: "l" },
];

export const inStockOptions = [
  { name: "True", _id: "true" },
  { name: "False", _id: "false" },
];

/// SHOP FILTER OPTIONS HELPER DATA
export const productPriceOptions = [
  { name: "Min $5 - Max $10", _id: "5-10" },
  { name: "Min $10 - Max $20", _id: "10-20" },
  { name: "Min $20 - Max $30", _id: "20-30" },
  { name: "Min $30 - Max $40", _id: "30-40" },
  { name: "Min $40 - Max $50", _id: "40-50" },
];

export const orderPriceOptions = [
  { name: "Min $10 - Max $50", _id: "10-50" },
  { name: "Min $50 - Max $100", _id: "50-100" },
  { name: "Min $100 - Max $150", _id: "100-150" },
  { name: "Min $150 - Max $200", _id: "150-200" },
  { name: "Min $200 - Max ♾️", _id: "200-1000000" },
  { name: "Clear filter", _id: "" },
];

export const sortOptions = [
  { name: "Sort by: Latest", _id: "latest" },
  { name: "Sort by: Newest", _id: "newest" },
];
export const orderSortOptions = [
  { name: "Sort by: Paid", _id: "paid" },
  { name: "Sort by: On the way", _id: "on the way" },
  { name: "Sort by: Delivered", _id: "delivered" },
  { name: "Sort by: Cancelled", _id: "cancelled" },
  { name: "Clear sorting", _id: "" },
];

export const ratingOptions = [
  { name: "⭐⭐⭐⭐⭐", _id: "5" },
  { name: "⭐⭐⭐⭐", _id: "4" },
  { name: "⭐⭐⭐", _id: "3" },
  { name: "⭐⭐", _id: "2" },
  { name: "⭐", _id: "1" },
];

////////////////////////////////////////////////////////////////
export const toolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ["bold", "italic", "underline", "strike", "blockquote", "link", "image"], // toggled buttons
  [{ color: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  [{ direction: "rtl" }], // text direction

  // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],
];
