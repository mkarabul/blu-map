const Report = require("../models/Report");

const ReportController = {
  async createReport(req, res) {
    try {
      const { reporterUserID, reportedUserName, header, description, reportType } = req.body;
      const newReport = await Report.create({
        reporterUserID,
        reportedUserName,
        header,
        description,
        reportType
      });
      res.status(201).json({ message: "Report created successfully", report: newReport });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },


  async getAllReports(req, res) {
    try {
      const reports = await Report.findAll();
      if (reports) {
        res.status(200).json(reports);
      } else {
        res.status(404).json({ message: "No reports found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  

  async deleteReportById(req, res) {
    try {
      const { reportId } = req.params;
      const report = await Report.destroy({
        where: { reportId },
      });
      if (report) {
        res.status(200).json({ message: "Report deleted successfully" });
      } else {
        res.status(404).json({ error: "Report not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getReportById(req, res) {
    try {
      const { reportId } = req.params;
      const report = await Report.findOne({
        where: { reportId },
      });
      if (report) {
        res.status(200).json(report);
      } else {
        res.status(404).json({ error: "Report not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getAllReportsByReportedUserName(req, res) {
    try {
      const { reportedUserName } = req.params;
      const reports = await Report.findAll({
        where: { reportedUserName },
      });
      if (reports) {
        res.status(200).json(reports);
      } else {
        res.status(404).json({ error: "No reports found for the given user ID" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },


};

module.exports = ReportController;
