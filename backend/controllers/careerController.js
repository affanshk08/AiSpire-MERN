const Career = require('../models/Career');

const addCareer = async (req, res) => {
    try {
        const career = new Career(req.body);
        await career.save();
        res.status(201).json(career);
    } catch (error) {
        res.status(400).json({ message: 'Error adding career', error });
    }
};

const getCareers = async (req, res) => {
  try {
    const careers = await Career.find({});
    res.status(200).json(careers);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

const getCareerById = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) {
      return res.status(404).json({ message: 'Career not found' });
    }
    res.status(200).json(career);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  addCareer,
  getCareers,
  getCareerById,
};