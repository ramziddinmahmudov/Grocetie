import { useState } from "react";

const useShowHidePassword = () => {
  const [passShown, setPassShown] = useState<boolean>(false);

  const togglePassShown: () => void = () => setPassShown(!passShown);

  return {
    passShown,
    togglePassShown,
  };
};

export default useShowHidePassword;
