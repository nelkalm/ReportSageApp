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
} from "./actions";

import { initialState } from "./appContext";

const reducer = (state, action) => {
  if (action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: "danger",
      alertText: "Please provide all values.",
    };
  }
  if (action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: "",
      alertText: "",
    };
  }
  if (action.type === REGISTER_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userProgramType: action.payload.programType,
      reportProgramType: action.payload.programType,
      showAlert: true,
      alertType: "success",
      alertText: "User created. Redirecting...",
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === LOGIN_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userProgramType: action.payload.programType,
      reportProgramType: action.payload.programType,
      showAlert: true,
      alertType: "success",
      alertText: "Login successful. Redirecting...",
    };
  }
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }
  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
      userProgramType: "",
      reportProgramType: "",
    };
  }
  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userProgramType: action.payload.programType,
      reportProgramType: action.payload.programType,
      showAlert: true,
      alertType: "success",
      alertText: "User profile successfully updated.",
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    };
  }
  if (action.type === CLEAR_VALUES) {
    const initialStates = {
      isEditing: false,
      editReportId: "",
      reportProgramType: state.userProgramType,
      programSubType: "EcoArts",
      programName: "",
      eventName: "",
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
      expectationEvalStaff: "1 (Not at all - improvements needed)",
      successDescription: "",
      challengeDescription: "",
      qualitativeFeedback: "",
      marketingLinks: "",
      numLearnedSkills: 0,
      numProgramSatisfaction: 0,
      numBetterOff: 0,
    };

    return {
      ...state,
      ...initialState,
    };
  }
  throw new Error(`no such action: ${action.type}`);
};

export default reducer;
