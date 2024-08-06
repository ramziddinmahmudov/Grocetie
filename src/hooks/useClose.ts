import { useEffect, useState } from "react";

const useClose = (ref: React.RefObject<HTMLDivElement>) => {
  const [boxOpen, setBoxOpen] = useState<boolean>(false);

  useEffect(() => {
    // Alert if clicked on outside of element
    function handleClickOutside(event: PointerEvent) {
      if (
        ref.current &&
        !ref.current.contains(event.target as HTMLDivElement)
      ) {
        console.log("You clicked outside of me!");
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return {
    boxOpen,
    setBoxOpen,
  };
};

export default useClose;
