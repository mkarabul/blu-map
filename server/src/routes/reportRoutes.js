const express = require('express');
const ReportController = require('../controllers/ReportController');
const router = express.Router();

router.post('/', ReportController.createReport);
router.delete('/:reportId', ReportController.deleteReportById);
router.get('/:reportId', ReportController.getReportById);
router.get('/all/:reportedUserName', ReportController.getAllReportsByReportedUserName);
router.get('/', ReportController.getAllReports);




module.exports = router;
