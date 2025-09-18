import axios from 'axios';

// The new base URL for your PHP API
const API_URL = 'http://localhost/careercounsel/api/';

const getCareers = async () => {
  // GET request to get-careers.php
  const response = await axios.get(API_URL + 'get-careers.php');
  return response.data;
};

const getCareerById = async (id) => {
  // GET request to get-career.php with id as a query parameter
  const response = await axios.get(`${API_URL}get-career.php?id=${id}`);
  return response.data;
};

const careerService = {
  getCareers,
  getCareerById,
};

export default careerService;