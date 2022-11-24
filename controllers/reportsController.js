const createReport = async (req, res) => {
  res.send("create report");
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
