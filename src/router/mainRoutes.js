const express = require('express');
const router = express.Router();

const {
  homeView,
  aboutView,
  faqsView,
} = require('../controllers/mainControllers');


router.get('/contact', (req, res) => {
  
  res.redirect('https://linktr.ee/funkooshop');
});


router.get('/', homeView);
router.get('/about', aboutView);
router.get('/faqs', faqsView);

module.exports = router;
