const express = require('express');
const {
  getAll,
  getOne,
  bookTestDrive,
  submitInquiry,
  getBookings,
  getLeads,
} = require('../controllers/vehicle.controller');

const router = express.Router();

router.get('/', getAll);
router.get('/bookings', getBookings);
router.get('/leads', getLeads);
router.get('/:id', getOne);
router.post('/test-drive', bookTestDrive);
router.post('/inquiry', submitInquiry);

module.exports = router;