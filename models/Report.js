import mongoose from "mongoose";

const ReportSchema = mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    reportProgramType: {
      type: String,
      required: [true, "Please select a program type"],
      enum: ["Art", "Nature", "Neighborhood", "Admin"],
    },
    programSubType: {
      type: String,
      required: [true, "Please select a program"],
      enum: [
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
    },
    programName: {
      type: String,
      required: [true, "Please enter the name of program"],
    },
    eventName: {
      type: String,
      required: [false, "Please enter the name of program event"],
    },
    programStatus: {
      type: String,
      required: true,
      enum: ["New", "Ongoing", "Completed"],
    },
    eventDate: {
      type: String,
      required: [true, "Please enter the date of program event"],
    },
    eventSite: {
      type: String,
      required: [true, "Please enter the site of program event"],
    },
    totalEventHours: {
      type: Number,
      required: [true, "Please enter the program duration"],
    },
    totalParticipantsServed: {
      type: Number,
      required: [true, "Please enter the total number of participants served"],
    },
    totalYouthServed: {
      type: Number,
      required: [true, "Please enter the total number of youth served"],
    },
    totalNewParticipants: {
      type: Number,
      required: [true, "Please enter the number of new participants"],
    },
    totalNewYouth: {
      type: Number,
      required: [true, "Please enter the number of new youth"],
    },
    totalTeachingArtists: {
      type: Number,
      required: [true, "Please enter the number of teaching artists"],
    },
    demographicBreakdown: {
      type: String,
      required: [false, "Please describe demographic breakdown"],
    },
    programSummary: {
      type: String,
      required: [true, "Please describe the program activities"],
    },
    expectationEvalStaff: {
      type: Number,
      required: [true, "Did this program/event meet your expectations?"],
      enum: [1, 2, 3, 4, 5],
    },
    successDescription: {
      type: String,
      required: [
        false,
        "List 1-3 things that were successful with the program",
      ],
    },
    challengeDescription: {
      type: String,
      required: [false, "List 1-3 challenges with the program"],
    },
    qualitativeFeedback: {
      type: String,
      required: [false, "Input qualitative feedback: stories, quotes, etc."],
    },
    marketingLinks: {
      type: String,
      required: [false, "Link to photos, videos, galleries"],
    },
    numLearnedSkills: {
      type: Number,
      required: [
        false,
        "Number of participants reported new skills learned or knowledge gained",
      ],
    },
    numProgramSatisfaction: {
      type: Number,
      required: [
        false,
        "Number of participants reported satisfied with program/event",
      ],
    },
    numBetterOff: {
      type: Number,
      required: [
        false,
        "Number of participants reported increased in positive outcomes",
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Report", ReportSchema);
