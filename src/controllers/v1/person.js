// Imports.
const { Person } = require('../../../models');

exports.getPeople = async (req, res) => {
  try {
    const people = await Person.findAll();

    res.send({
      status: 'success',
      message: 'Get people has been success.',
      data: {
        people,
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
