// Imports.
const router = require('express').Router();

// Middlewares.
const { uploads } = require('../../middlewares/v1/upload');

// Controllers.
const { addEvent, getEvents } = require('../../controllers/v1/event');
const { getPeople } = require('../../controllers/v1/person');

// ***********************
// ***** ROUTERS MAP *****
// ***********************

// router.get('/demo', (req, res) => {
//   res.send({
//     status: 'success',
//     message: 'Your router is working.',
//   });
// });

// Route for person.
router.get('/users', getPeople);

// Route for event.
router.get('/events', getEvents);
router.post('/event', uploads([{ name: 'image', maxCount: 1 }]), addEvent);

module.exports = router;
