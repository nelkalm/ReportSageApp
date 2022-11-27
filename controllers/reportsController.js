import Report from "../models/Report.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
import mongoose from "mongoose";

const createReport = async (req, res) => {
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
  } = req.body;

  console.log(req.body);

  if (!reportProgramType || !programName || !programSubType) {
    throw new BadRequestError(
      "Please select the program type and add the program name"
    );
  }

  req.body.createdBy = req.user.userId;

  const report = await Report.create(req.body);
  res.status(StatusCodes.CREATED).json({ report });
};

const deleteReport = async (req, res) => {
  const { id: reportId } = req.params;
  const report = await Report.findOne({ _id: reportId });

  if (!report) {
    throw new NotFoundError(`No report with id: ${reportId}`);
  }

  checkPermissions(req.user, report.createdBy);

  await report.remove();

  res.status(StatusCodes.OK).json({ msg: "Report successfully deleted." });
};

const getAllReports = async (req, res) => {
  const reports = await Report.find({ createdBy: req.user.userId });
  res
    .status(StatusCodes.OK)
    .json({ reports, totalReports: reports.length, numPages: 1 });
};

const updateReport = async (req, res) => {
  const { id: reportId } = req.params;
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
  } = req.body;

  if (!reportProgramType || !programName || !programSubType) {
    throw new BadRequestError(
      "Please select the program type and add the program name"
    );
  }

  const report = await Report.findOne({ _id: reportId });

  if (!report) {
    throw new NotFoundError(`No report with id: ${reportId}`);
  }

  // check permission - only allow user with specific id to edit
  // reports created by the user
  // console.log(typeof req.user.userId); // this is a string
  // console.log(typeof report.createdBy); // this is an object

  checkPermissions(req.user, report.createdBy);

  const updatedReport = await Report.findOneAndUpdate(
    { _id: reportId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ updatedReport });
};

const showStats = async (req, res) => {
  let stats = await Report.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    {
      // total participants served by subprogram
      $group: {
        _id: "$reportProgramType",
        count: { $sum: "$totalParticipantsServed" },
      },
    },
  ]);

  stats = stats.reduce((accumulator, currentItem) => {
    const { _id: programType, count } = currentItem;
    accumulator[programType] = count;
    return accumulator;
  }, {});

  const defaultProgramStats = {
    art: stats.Art || 0,
    nature: stats.Nature || 0,
    neighborhood: stats.Neighborhood || 0,
  };

  let monthlyParticipantsServed = [];

  res
    .status(StatusCodes.OK)
    .json({ defaultProgramStats, monthlyParticipantsServed });
};

export { createReport, deleteReport, getAllReports, updateReport, showStats };
