// Imports.
const Joi = require('joi');
const { Event, PersonInEvent, Person } = require('../../../models');

// Req. upload middleware.
// Form data characteristic.
exports.addEvent = async (req, res) => {
  const { body, files } = req;
  const participants = JSON.parse(body.participants);

  // Validation.
  const schema = Joi.object({
    title: Joi.string().required(),
    location: Joi.string().required(),
    note: Joi.string().min(50).required(),
    date: Joi.date().required(),
    participants: Joi.array().items(Joi.string()).min(1),
  });
  const { error } = schema.validate({ ...body, participants });

  if (error) {
    return res.status(422).send({
      status: 'invalid',
      message: error.details[0].message,
    });
  }
  try {
    // Create new event.
    const event = await Event.create({
      ...body,
      image: files.image[0].filename,
    });

    // Create unique person.
    for (let i = 0; i < participants.length; i++) {
      let person = await Person.findOne({ where: { name: participants[i] } });
      if (!person) {
        person = await Person.create({ name: participants[i] });
      }
      await PersonInEvent.create({
        eventId: event.id,
        personId: person.id,
      });
    }

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

    // Refactor.
    for (let i = 0; i < events.length; i++) {
      events[i].dataValues['image'] =
        process.env.UPLOADS_URL + events[i].dataValues['image'];
    }

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
