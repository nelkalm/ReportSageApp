import React, { useReducer, useContext, useEffect } from "react";
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
  HANDLE_CHANGE,
  CLEAR_VALUES,
  CREATE_REPORT_BEGIN,
  CREATE_REPORT_SUCCESS,
  CREATE_REPORT_ERROR,
  GET_REPORTS_BEGIN,
  GET_REPORTS_SUCCESS,
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

  // User related states
  user: user ? JSON.parse(user) : null,
  token: token,
  userProgramType: userProgramType || "",

  // Report edit related states
  reportProgramType: userProgramType || "",
  programTypeOptions: ["Art", "Nature", "Neighborhood", "Admin"],
  showSidebar: false,
  isEditing: false,
  editReportId: "",

  // Report creation related states
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
  programStatusOptions: ["New", "Ongoing", "Completed"],
  programStatus: "New",
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
  expectationEvalStaffOptions: [
    "1 (Not at all - improvements needed)",
    "2",
    "3",
    "4",
    "5 (Exceeded expectations)",
  ],
  expectationEvalStaff: "1 (Not at all - improvements needed)",
  successDescription: "",
  challengeDescription: "",
  qualitativeFeedback: "",
  marketingLinks: "",
  numLearnedSkills: 0,
  numProgramSatisfaction: 0,
  numBetterOff: 0,

  // Reports related states
  reports: [],
  totalReports: 0,
  numOfPages: 1,
  page: 1,
};

const AppContext = React.createContext();

/**
 * A context provider function for page components to access
 * @param {any} {children}
 * @returns {any}
 */
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

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } });
  };

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  const createReport = async () => {
    dispatch({ type: CREATE_REPORT_BEGIN });
    try {
      const {
        reportProgramType,
        programSubType,
        programName,
        eventName,
        programStatus,
        eventDate,
        eventSite,
        totalEventHours,
        totalParticipantsServed,
        totalYouthServed,
        totalNewParticipants,
        totalNewYouth,
        totalTeachingArtists,
        demographicBreakdown,
        programSummary,
        expectationEvalStaff,
        successDescription,
        challengeDescription,
        qualitativeFeedback,
        marketingLinks,
        numLearnedSkills,
        numProgramSatisfaction,
        numBetterOff,
      } = state;

      await authFetch.post("/reports", {
        reportProgramType,
        programSubType,
        programName,
        eventName,
        programStatus,
        eventDate,
        eventSite,
        totalEventHours,
        totalParticipantsServed,
        totalYouthServed,
        totalNewParticipants,
        totalNewYouth,
        totalTeachingArtists,
        demographicBreakdown,
        programSummary,
        expectationEvalStaff,
        successDescription,
        challengeDescription,
        qualitativeFeedback,
        marketingLinks,
        numLearnedSkills,
        numProgramSatisfaction,
        numBetterOff,
      });

      dispatch({ type: CREATE_REPORT_SUCCESS });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status == 401) return;
      dispatch({
        type: CREATE_REPORT_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getReports = async () => {
    let url = `/reports`;

    dispatch({ type: GET_REPORTS_BEGIN });

    try {
      const { data } = await authFetch(url);
      const { reports, totalReports, numOfPages } = data;
      dispatch({
        type: GET_REPORTS_SUCCESS,
        payload: { reports, totalReports, numOfPages },
      });
    } catch (error) {
      console.log(error.response);
    }

    clearAlert();
  };

  const setEditReport = (id) => {
    console.log(`set edit report: ${id}`);
  };

  const deleteReport = (id) => {
    console.log(`set delete report: ${id}`);
  };

  // useEffect(() => {
  //   getReports();
  // }, []);

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
        handleChange,
        clearValues,
        createReport,
        getReports,
        setEditReport,
        deleteReport,
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
