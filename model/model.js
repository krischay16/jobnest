const dbModel = require('./dbModel');

// ✅ Generate unique Job ID
const generateId = async () => {
  const model = dbModel.job;
  
  // Find the last job with ID starting with 'J'
  const lastJob = await model.findOne({ id: /^J/ }).sort({ id: -1 }).limit(1);
  
  if (!lastJob || !lastJob.id) {
    return 'J101';  // Starting ID
  }
  
  // Extract number from ID like "J105" → 105
  const lastNumber = parseInt(lastJob.id.substring(1));
  const nextNumber = lastNumber + 1;
  
  return 'J' + nextNumber;
};

// Create Jobseeker
const createJobseeker = async (data) => {
  const model = dbModel.jobseeker;
  const doc = await model.create(data);
  return doc;
};

// Get Jobseeker by email
const getJobseeker = async (email) => {
  const model = dbModel.jobseeker;
  return await model.findOne({ email });
};

const getJobseekerById = async (id) => {
  const model = dbModel.jobseeker;
  return await model.findById(id);
};

const getJobseekers = async () => {
  const model = dbModel.jobseeker;
  return await model.find({});
};

// Update Jobseeker
const updateJobseeker = async (id, updateData) => {
  const model = dbModel.jobseeker;
  return await model.updateOne({ email: id }, updateData, { new: true });
};

// Employer
const createEmployer = async (data) => {
  const model = dbModel.employer;
  return await model.create(data);
};

const getEmployer = async (id) => {
  const model = dbModel.employer;
  return await model.findById(id);
};

const getEmployers = async () => {
  const model = dbModel.employer;
  return await model.find({});
};

const updateEmployer = async (id, updatedData) => {
  const model = dbModel.employer;
  return await model.findByIdAndUpdate(id, updatedData, { new: true });
};

// Job
const createJob = async (data) => {
  const model = dbModel.job;
  const id = await generateId();  // ✅ Async call
  data.id = id;
  console.log(data);
  return await model.create(data);
};

const getJob = async (id) => {
  const model = dbModel.job;
  return await model.findOne({ id });
};

const getJobById = async (_id) => {
  const model = dbModel.job;
  return await model.findOne({ _id });
};

const deleteJob = async (id) => {
  const model = dbModel.job;
  return await model.findOneAndDelete({ id });
};

const getJobByEmployee = async (id) => {
  const model = dbModel.job;
  return await model.find({ employer: id });
};

const getJobs = async () => {
  const model = dbModel.job;
  return await model.find({});
};

const updateJob = async (id, updatedData) => {
  const model = dbModel.job;
  return await model.findByIdAndUpdate(id, updatedData, { new: true });
};

// Application
const createApplication = async (data) => {
  const model = dbModel.application;
  console.log(data);
  return await model.create(data);
};

const getApplication = async (id) => {
  const model = dbModel.application;
  return await model.findById(id);
};

const getApplicants = async (id) => {
  const model = dbModel.application;
  return await model.find({ employer: id });
};

const getApplicationsByUser = async (userId) => {
  const model = dbModel.application;
  return await model.find({ "user": userId });
};

const deleteApplication = async (id) => {
  const model = dbModel.application;
  return await model.findByIdAndDelete(id);
};

const updateApplication = async (id, updatedData) => {
  const model = dbModel.application;
  return await model.findByIdAndUpdate(id, updatedData, { new: true });
};

const questions = async () => {
  const model = dbModel.quiz;
  return await model.find({});
};

const submitQuiz = async (userId, answers) => {
  const quizModel = dbModel.quiz;
  const jobseekerModel = dbModel.jobseeker;

  const questions = await quizModel.find();

  if (!questions.length || questions.length !== answers.length) {
    throw new Error("Invalid quiz or answer count mismatch");
  }

  const skillScores = {};

  questions.forEach((q, i) => {
    const skill = q.skill;
    const correctAnswer = q.options[q.answerIndex];
    const userAnswer = answers[i];

    if (!skillScores[skill]) skillScores[skill] = 0;

    if (userAnswer === correctAnswer) {
      skillScores[skill]++;
    }
  });

  // 🧾 Convert object → array format for Mongo
  const scoreArray = Object.entries(skillScores).map(([skill, value]) => ({
    skill,
    value
  }));

  // 🧩 Update user's score in Jobseeker model
  const updatedUser = await jobseekerModel.updateOne(
    { "email": userId },
    { $set: { score: scoreArray } },
    { new: true }
  );

  return { scoreArray, updatedUser };
};

module.exports = {
  createJobseeker,
  getJobseeker,
  updateJobseeker,
  createEmployer,
  getEmployer,
  updateEmployer,
  createJob,
  getJob,
  updateJob,
  createApplication,
  getApplication,
  updateApplication,
  questions,
  submitQuiz,
  getJobs,
  getEmployers,
  getJobseekers,
  getJobById,
  getApplicationsByUser,
  deleteApplication,
  getJobByEmployee,
  deleteJob,
  getApplicants,
  getJobseekerById,
};
