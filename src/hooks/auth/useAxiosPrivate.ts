import { useContext, useEffect } from "react";
import { axiosPrivate } from "../../api/axios";
import useRefreshToken from "./useRefresh";
import { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { AuthContext } from "../../store/AuthContext";
import { UserContext } from "../../store/UserContext";

const useAxiosPrivate = () => {
  const { dispatch } = useContext(UserContext);
  const refresh = useRefreshToken(dispatch);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config: InternalAxiosRequestConfig<any>) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (error: any) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response: AxiosResponse<any, any>) => response,
      async (error: any) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth.accessToken, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
