import { useEffect, useRef, useState } from "react";

const FilterOptions = ({
  options,
  title,
  onSelect,
  defaultValue,
  query,
  clearOption,
  addSelectedNotAllowed,
}: FilterOptionsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  // If there is query in state, we remember it and show the 'before set query' option when the user comes back to it again.
  defaultValue = query
    ? options.find((i) => i._id === query)?.name
    : defaultValue;
  const [option, setOption] = useState<string | null>(defaultValue || title);

  const setOptionHandler = (name: string, id: string) => {
    if (!addSelectedNotAllowed) setOption(name);
    onSelect(id);
    setIsOpen(false);
  };

  // If there is query, we show the 'Clear' option (in OrderHistory and Customers pages).
  if (clearOption)
    options = options.slice(0, query ? options.length : options.length - 1);

  const onToggleHandler = () => setIsOpen((prev) => !prev);

  // Close the options when ouside click is detected
  useEffect(() => {
    const outsideClickHandler = (e: MouseEvent) => {
      e.stopPropagation();
      const eventTarget = e.target as HTMLDivElement;
      if (!boxRef.current!.contains(eventTarget)) setIsOpen(false);
    };

    document.addEventListener("mousedown", outsideClickHandler);
    return () => document.removeEventListener("mousedown", outsideClickHandler);
  });

  return (
    <div className={`choose${isOpen ? " options-open" : ""}`} ref={boxRef}>
      <div className="chosen" onClick={onToggleHandler}>
        {option}
        <img src="/assets/icons/arrow-down-icon.svg" alt="" />
      </div>
      <ul className="options">
        {options.map((item) => (
          <li
            key={item._id}
            className="options__item"
            onClick={setOptionHandler.bind(null, item.name, item._id)}
            children={item.name}
          />
        ))}
      </ul>
    </div>
  );
};

interface FilterOptionsProps {
  options: { name: string; _id: string }[];
  title: string;
  onSelect: (id: string) => void;
  defaultValue?: string;
  query?: string;
  clearOption?: boolean;
  addSelectedNotAllowed?: boolean;
}

export default FilterOptions;
