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
  SET_EDIT_REPORT,
  DELETE_REPORT_BEGIN,
  DELETE_REPORT_ERROR,
  EDIT_REPORT_BEGIN,
  EDIT_REPORT_SUCCESS,
  EDIT_REPORT_ERROR,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  CLEAR_FILTERS,
  CHANGE_PAGE,
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
      page: 1,
      [action.payload.name]: action.payload.value,
    };
  }
  if (action.type === CLEAR_VALUES) {
    const initialState = {
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
  if (action.type === CREATE_REPORT_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === CREATE_REPORT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "New report created successfully.",
    };
  }
  if (action.type === CREATE_REPORT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === GET_REPORTS_BEGIN) {
    return { ...state, isLoading: true, showAlert: false };
  }
  if (action.type === GET_REPORTS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      reports: action.payload.reports,
      totalReports: action.payload.totalReports,
      numOfPages: action.payload.numOfPages,
    };
  }
  if (action.type === SET_EDIT_REPORT) {
    // Retrieve the report from the state if report matches report id
    const report = state.reports.find(
      (report) => report._id === action.payload.id
    );

    const {
      _id,
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
    } = report;

    return {
      ...state,
      isEditing: true,
      editReportId: _id,
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
    };
  }
  if (action.type === DELETE_REPORT_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === DELETE_REPORT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === EDIT_REPORT_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === EDIT_REPORT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "success",
      alertText: "Report successfully updated!",
    };
  }
  if (action.type === EDIT_REPORT_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: "danger",
      alertText: action.payload.msg,
    };
  }
  if (action.type === SHOW_STATS_BEGIN) {
    return {
      ...state,
      isLoading: true,
      showAlert: false,
    };
  }
  if (action.type === SHOW_STATS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      stats: action.payload.stats,
      monthlyParticipantsServed: action.payload.monthlyParticipantsServed,
      monthlyYouthServed: action.payload.monthlyYouthServed,
    };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      search: "",
      searchProgramSubType: "All",
      sort: "Last submission",
    };
  }
  if (action.type === CHANGE_PAGE) {
    return {
      ...state,
      page: action.payload.page,
    };
  }
  throw new Error(`no such action: ${action.type}`);
};

export default reducer;
