import React from "react";
import { FormRow, Alert, FormRowSelect, FormTextArea } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const AddReport = () => {
  const {
    isEditing,
    showAlert,
    displayAlert,
    reportProgramType,
    programTypeOptions,
    programSubType,
    programSubTypeOptions,
    programName,
    eventName,
    programStatusOptions,
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
    expectationEvalStaffOptions,
    expectationEvalStaff,
    successDescription,
    challengeDescription,
    qualitativeFeedback,
    marketingLinks,
    numLearnedSkills,
    numProgramSatisfaction,
    numBetterOff,
  } = useAppContext();

  const handleReportInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(`${name}: ${value}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!programName || !programSubType || !programSummary) {
      displayAlert();
      return;
    }
    console.log("create report");
  };

  return (
    <Wrapper>
      <form action="" className="form">
        <h3>{isEditing ? "edit report" : "create report"}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          {/* Program Name */}
          <FormRow
            type="text"
            name="programName"
            value={programName}
            labelText="Program Name"
            placeholder="Enter program name"
            handleChange={handleReportInput}
          />
          {/* Event Name */}
          <FormRow
            type="text"
            name="eventName"
            value={eventName}
            labelText="Event Name"
            placeholder="Enter event name"
            handleChange={handleReportInput}
          />
          {/* Program Type/Department */}
          <FormRowSelect
            name="reportProgramType"
            labelText="Program Department"
            value={reportProgramType}
            handleChange={handleReportInput}
            list={programTypeOptions}
          />
          {/* Program SubType */}
          <FormRowSelect
            name="programSubType"
            labelText="Program"
            value={programSubType}
            handleChange={handleReportInput}
            list={programSubTypeOptions}
          />
          {/* Program Status */}
          <FormRowSelect
            name="programStatus"
            labelText="Program Status"
            value={programStatus}
            handleChange={handleReportInput}
            list={programStatusOptions}
          />
          {/* Event Date */}
          <FormRow
            type="date"
            name="eventDate"
            value={eventDate}
            labelText="Event Date"
            placeholder="Enter event date"
            handleChange={handleReportInput}
          />
          {/* Event Site(s) */}
          <FormRow
            type="text"
            name="eventSite"
            value={eventSite}
            labelText="Event Site"
            placeholder="Enter event site(s)"
            handleChange={handleReportInput}
          />
          {/* Event Hours */}
          <FormRow
            type="number"
            name="totalEventHours"
            value={totalEventHours}
            labelText="Duration of program event (in hours)"
            handleChange={handleReportInput}
          />
          {/* Total participants served */}
          <FormRow
            type="number"
            name="totalParticipantsServed"
            value={totalParticipantsServed}
            labelText="Total participants served"
            handleChange={handleReportInput}
          />
          {/* Total youth served */}
          <FormRow
            type="number"
            name="totalYouthServed"
            value={totalYouthServed}
            labelText="Total youth served"
            handleChange={handleReportInput}
          />
          {/* New participants served */}
          <FormRow
            type="number"
            name="totalNewParticipants"
            value={totalNewParticipants}
            labelText="Total new participants"
            handleChange={handleReportInput}
          />
          {/* New youth served */}
          <FormRow
            type="number"
            name="totalNewYouth"
            value={totalNewYouth}
            labelText="Total new youth"
            handleChange={handleReportInput}
          />
          {/* Teaching Artists served */}
          <FormRow
            type="number"
            name="totalTeachingArtists"
            value={totalTeachingArtists}
            labelText="Teaching artists engaged"
            handleChange={handleReportInput}
          />
          {/* Demographic Breakdown */}
          <FormTextArea
            name={demographicBreakdown}
            id={demographicBreakdown}
            labelText="Enter Demographic Breakdown"
            placeholder="If you have data on demographic breakdown, please enter them here. Demographic data includes race, age, gender, etc."
            value={demographicBreakdown}
            handleChange={handleReportInput}
          />
          {/* Program Summary */}
          <FormTextArea
            name={programSummary}
            id={programSummary}
            labelText="Enter Program Summary"
            placeholder="Please describe the program activities. Also, please describe program outcomes that was used to measure the last 3 fields."
            value={programSummary}
            handleChange={handleReportInput}
          />
          {/* Program Expectation */}
          <FormRowSelect
            name="expectationEvalStaff"
            labelText="Did this program meet your expectations?"
            value={expectationEvalStaff}
            handleChange={handleReportInput}
            list={expectationEvalStaffOptions}
          />
          {/* Program/Event successes */}
          <FormTextArea
            name={successDescription}
            id={successDescription}
            labelText="Program/event successes"
            placeholder="List 1-3 things that were successful with the program. Bullet points or short sentences are okay."
            value={successDescription}
            handleChange={handleReportInput}
          />
          {/* Program/Event challenges */}
          <FormTextArea
            name={challengeDescription}
            id={challengeDescription}
            labelText="Program/event challenges"
            placeholder="List 1-3 things that were challenging with the program. Bullet points or short sentences are okay."
            value={challengeDescription}
            handleChange={handleReportInput}
          />
          {/* Program/Event qualitative feedback */}
          <FormTextArea
            name={qualitativeFeedback}
            id={qualitativeFeedback}
            labelText="Program/event qualitative feedback"
            placeholder="Describe any memorable parts of the program. (Stories from the program are helpful for grant reports. Was there a participant who had a memorable experience? Were connections made during the program?...etc.)  "
            value={qualitativeFeedback}
            handleChange={handleReportInput}
          />
          {/* Program/Event marketing links */}
          <FormTextArea
            name={marketingLinks}
            id={marketingLinks}
            labelText="Marketing/media"
            placeholder="Please provide link(s) to Program/Event pictures, videos, and/or marketing material (fliers/social media graphics). "
            value={marketingLinks}
            handleChange={handleReportInput}
          />
          {/* Number of participants reported new skills learned or knowledge gained */}
          <FormRow
            type="number"
            name="numLearnedSkills"
            value={numLearnedSkills}
            labelText="Number of participants reported new skills learned or knowledge gained"
            handleChange={handleReportInput}
          />
          {/* Number of participants reported satisfied with program/event */}
          <FormRow
            type="number"
            name="numProgramSatisfaction"
            value={numProgramSatisfaction}
            labelText="Number of participants reported satisfied with program/event"
            handleChange={handleReportInput}
          />
          {/* Number of participants reported increased in positive outcomes */}
          <FormRow
            type="number"
            name="numBetterOff"
            value={numBetterOff}
            labelText="Number of participants reported increased in positive outcomes"
            handleChange={handleReportInput}
          />
          <div className="btn-container">
            <button
              className="btn btn-block"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default AddReport;
