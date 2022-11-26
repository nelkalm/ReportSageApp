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
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
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
  isEditing: false,
  editReportId: "",
  programSubTypeOptions: [
    "EcoArts",
    "Summer Youth Program",
    "Youngstown Arts",
    "Restoration",
    "Wetlands",
    "Restorative Justice",
    "Environmental Justice",
    "Resident Services",
    "Family Connections & Youth Development",
  ],
  programSubType: "EcoArts",
  programName: "",
  eventName: "",
  programStatusOptions: ["new", "ongoing", "completed"],
  programStatus: "new",
  eventDate: "",
  eventSite: "",
  totalEventHours: 0,
  totalParticipantsServed: 0,
  totalYouthServed: 0,
  totalNewParticipants: 0,
  totalNewYouth: 0,
  totalTeachingArtists: 0,
  demographicBreakdown: "",
  programSummary: "",
  expectationEvalStaffOptions: [1, 2, 3, 4, 5],
  expectationEvalStaff: 1,
  successDescription: "",
  challengeDescription: "",
  qualitativeFeedback: "",
  marketingLinks: "",
  numLearnedSkills: 0,
  numProgramSatisfaction: 0,
  numBetterOff: 0,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Set up an axios instance to restrict sending bearer token
  const authFetch = axios.create({
    baseURL: "api/v1",
  });

  // AXIOS INTERCEPTORS - control error response, keep track error response
  // and make decisions based on error response
  // Add axios request interceptor - set up 1 logic for multiple error response
  authFetch.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Add axios response interceptor
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.response);
      // if bearer token is missing/expires (401) then log out user
      if (error.response.status === 401) {
        logOutUser();
      }
      return Promise.reject(error);
    }
  );

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

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });

    try {
      const { data } = await authFetch.patch("/auth/update", currentUser);
      const { user, programType, token } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, programType, token },
      });

      addUserToLocalStorage({ user, programType, token });
    } catch (error) {
      // console.log(error.response);
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }

      clearAlert();
    }
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
        updateUser,
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
