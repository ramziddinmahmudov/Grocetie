import { useContext } from "react";
import axios from "../../api/axios";
import { AuthContext } from "../../store/AuthContext";
import { UserAction, UserActionKind } from "../../store/UserContext";

const useRefreshToken = (dispatch: React.Dispatch<UserAction>) => {
  const { setAuth } = useContext(AuthContext);

  const refresh = async () => {
    try {
      const { data } = await axios.get("/users/new-access-token");
      setAuth({ accessToken: data.accessToken });
      return data.accessToken;
    } catch (err) {
      dispatch({ type: UserActionKind.GETME_FAILURE });
      window.location.reload();
    }
  };

  return refresh;
};

export default useRefreshToken;
