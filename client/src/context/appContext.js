import React, { useReducer, useContext } from "react";
import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
} from "./actions";

import reducer from "./reducer";
import axios from "axios";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");
const userProgramType = localStorage.getItem("programType");

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userProgramType: userProgramType || "",
  reportProgramType: userProgramType || "",
  showSidebar: false,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  // persist user in local storage
  const addUserToLocalStorage = ({ user, token, programType }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("programType", programType);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("programType");
  };

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    console.log(currentUser);
    try {
      const response = await axios.post("/api/v1/auth/register", currentUser);
      // console.log(response);
      const { user, token, programType } = response.data;

      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, token, programType },
      });

      // persist user in local storage
      addUserToLocalStorage({ user, token, programType });
    } catch (error) {
      //  console.log(error.response);
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }

    clearAlert();
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    console.log(currentUser);
    try {
      const { data } = await axios.post("/api/v1/auth/login", currentUser);
      const { user, token, programType } = data;

      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token, programType },
      });

      // persist user in local storage
      addUserToLocalStorage({ user, token, programType });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }

    clearAlert();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logOutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        toggleSidebar,
        logOutUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
