import { createContext, useState } from "react";

export interface AuthInitialStateTypes {
  accessToken: string | null;
  error?: string | null;
}

const INITIAL_STATE: AuthInitialStateTypes = {
  accessToken: null,
  error: null,
};

export interface AuthContextTypes {
  auth: AuthInitialStateTypes;
  setAuth: React.Dispatch<React.SetStateAction<AuthInitialStateTypes>>;
}

export const AuthContext = createContext<AuthContextTypes>({
  auth: INITIAL_STATE,
  setAuth: () => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [auth, setAuth] = useState<AuthInitialStateTypes>(INITIAL_STATE);

  const values = {
    auth,
    setAuth,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
