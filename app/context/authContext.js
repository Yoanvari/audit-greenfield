import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "my-jwt";
export const API_URL = "http://192.168.1.7:3000";
const AuthContext = createContext({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: null,
    authenticated: null,
    user: null,
  });

  useEffect(() => {
    const loadToken = async () => {
      const token = await SecureStore.getItemAsync(TOKEN_KEY);
      const userId = await SecureStore.getItemAsync("userId");
      console.log("stored", token);
      console.log("stored", userId);

      if (token && userId) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const response = await axios.get(`${API_URL}/api/users/${userId}`);
        setAuthState({
          token: token,
          authenticated: true,
          user: response.data,
        });
      }
    };
    loadToken();
  }, []);

  const register = async (name, email, password, role) => {
    try {
      const response = await axios.post(`${API_URL}/api/users`, {
        name,
        email,
        password,
        role,
      });
      console.log("Register response:", response);
      return response;
    } catch (e) {
      return { error: true, msg: e.response.data.msg };
    }
  };

  const login = async (email, password) => {
    try {
      const result = await axios.post(`${API_URL}/api/auth`, {
        email,
        password,
      });

      console.log(result);

      setAuthState({
        token: result.data.token,
        authenticated: true,
        user: result.data.data,
      });

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${result.data.token}`;

      await SecureStore.setItemAsync(TOKEN_KEY, result.data.token);
      await SecureStore.setItemAsync("userId", String(result.data.data.id));

      return result;
    } catch (e) {
      return { error: true, msg: e.response.data.msg };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync("userId");

    axios.defaults.headers.common["Authorization"] = "";

    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const value = {
    onRegister: register,
    onLogin: login,
    onLogout: logout,
    authState,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
