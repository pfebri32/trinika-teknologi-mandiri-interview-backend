// Imports.
const Joi = require('joi');
const { Event, PersonInEvent, Person } = require('../../../models');

// Req. upload middleware.
// Form data characteristic.
exports.addEvent = async (req, res) => {
  const { body } = req;

  // Validation.
  const schema = Joi.object({
    title: Joi.string().required(),
    location: Joi.string().required(),
    note: Joi.string().min(51).required(),
    date: Joi.date().required(),
  });
  const { error } = schema.validate(body);

  if (error) {
    return res.status(422).send({
      status: 'invalid',
      message: error.details[0].message,
    });
  }
  try {
    // Create new event.
    const event = await Event.create(body);

    res.send({
      status: 'success',
      message: 'Adding event successfully.',
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'Your request has been failed.',
    });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.findAll({
      include: {
        model: Person,
        as: 'participants',
        through: {
          model: PersonInEvent,
          as: 'personInEvent',
          attributes: [],
        },
      },
    });

    res.send({
      status: 'success',
      message: 'Success for getting all events.',
      data: {
        events,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: 'failed',
      message: 'Your request has been failed.',
    });
  }
};
