import { createContext, useState } from "react";

//localstorage
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => {},
  logout: () => {},
  app: null,
  getDb: () => {},
  saveDb: (val) => {},
});

const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState();
  const [db, setDb] = useState();

  const authenticate = (token) => {
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
  };

  const logout = () => {
    setAuthToken(null);
    AsyncStorage.removeItem("token");
  };

  const saveDb = (val) => {
    setDb(val);
  };

  const getDb = () => {
    return db;
  };

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    saveDb,
    getDb
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
