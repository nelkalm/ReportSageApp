import Report from "../models/Report.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";

const createReport = async (req, res) => {
  const {
    programType,
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
  } = req.body;

  if (!programType || !programName || !programSubType) {
    throw new BadRequestError(
      "Please select the program type and add the program name"
    );
  }

  req.body.createdBy = req.user.userId;

  const report = await Report.create(req.body);
  res.status(StatusCodes.CREATED).json({ report });
};

const deleteReport = async (req, res) => {
  res.send("delete report");
};

const getAllReports = async (req, res) => {
  res.send("get all reports");
};

const updateReport = async (req, res) => {
  res.send("update report");
};

const showStats = async (req, res) => {
  res.send("show stats");
};

export { createReport, deleteReport, getAllReports, updateReport, showStats };
