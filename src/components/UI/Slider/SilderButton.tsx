export const leftArrow = (
  <svg style={{ width: "2rem", height: "2rem" }}>
    <use href="/assets/icons/icons.svg#icon-arrow-left"></use>
  </svg>
);
export const rightArrow = (
  <svg style={{ width: "2rem", height: "2rem" }}>
    <use href="/assets/icons/icons.svg#icon-arrow-right"></use>
  </svg>
);

export default function SilderButton({
  direction,
  moveSlide,
}: {
  direction: string;
  moveSlide: () => void;
}) {
  return (
    <div
      onClick={moveSlide}
      className={
        direction === "next" ? "btn-slide next-page" : "btn-slide prev-page"
      }
      children={direction === "next" ? rightArrow : leftArrow}
    />
  );
}
