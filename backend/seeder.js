const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const Career = require('./models/Career'); // Make sure the path is correct
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const careers = [
  {
    title: 'Software Developer',
    description: 'Designs, develops, and maintains software applications. Requires strong problem-solving skills and knowledge of programming languages.',
    averageSalary: 85000,
    requiredEducation: "Bachelor's Degree in Computer Science or related field.",
    skills: ['JavaScript', 'Python', 'React', 'Node.js', 'SQL'],
  },
  {
    title: 'Data Scientist',
    description: 'Analyzes complex data sets to identify trends and make predictions. Uses statistical methods and machine learning techniques.',
    averageSalary: 110000,
    requiredEducation: "Master's or PhD in Statistics, Math, or Computer Science.",
    skills: ['Python', 'R', 'Machine Learning', 'Statistics', 'Data Visualization'],
  },
  {
    title: 'UX/UI Designer',
    description: 'Focuses on creating user-friendly and visually appealing interfaces for websites and applications.',
    averageSalary: 75000,
    requiredEducation: "Bachelor's Degree in Design, HCI, or related field.",
    skills: ['Figma', 'Sketch', 'Adobe XD', 'User Research', 'Prototyping'],
  },
  {
    title: 'Digital Marketer',
    description: 'Promotes brands and products online using various digital channels like social media, SEO, and email marketing to reach a target audience.',
    averageSalary: 60000,
    requiredEducation: "Bachelor's Degree in Marketing or a related field.",
    skills: ['SEO', 'Social Media Marketing', 'Content Creation', 'Google Analytics'],
  },
  {
    title: 'Graphic Designer',
    description: 'Creates visual concepts, using computer software or by hand, to communicate ideas that inspire, inform, and captivate consumers.',
    averageSalary: 55000,
    requiredEducation: 'Bachelor\'s Degree in Graphic Design or a related art field.',
    skills: ['Adobe Photoshop', 'Adobe Illustrator', 'Typography', 'Branding'],
  },
  {
    title: 'Financial Analyst',
    description: 'Examines financial data to help companies make business decisions. They assess the performance of stocks, bonds, and other types of investments.',
    averageSalary: 82000,
    requiredEducation: "Bachelor's Degree in Finance, Economics, or a related field.",
    skills: ['Financial Modeling', 'Excel', 'Data Analysis', 'Accounting'],
  },
  {
    title: 'Web Developer',
    description: 'Creates and maintains websites and web applications, ensuring they are functional, user-friendly, and visually appealing across different devices.',
    averageSalary: 78000,
    requiredEducation: "Bachelor's Degree in Computer Science or a related field.",
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
  },
];

const importData = async () => {
  try {
    await Career.deleteMany(); // Clear existing careers
    await Career.insertMany(careers);
    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Career.deleteMany();
    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}