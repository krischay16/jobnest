const dbModel = require('./dbModel');

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

// Update Jobseeker
const updateJobseeker = async (id, updateData) => {
  const model = dbModel.jobseeker;
  return await model.findByIdAndUpdate(id, updateData, { new: true });
};

// Employer
const createEmployer = async (data) => {
  const model = dbModel.employer;
  return await model.create(data);
};

const getEmployer = async (query) => {
  const model = dbModel.employer;
  return await model.find(query);
};

const updateEmployer = async (id, updatedData) => {
  const model = dbModel.employer;
  return await model.findByIdAndUpdate(id, updatedData, { new: true });
};

// Job
const createJob = async (data) => {
  const model = dbModel.job;
  return await model.create(data);
};

const getJob = async () => {
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
  return await model.create(data);
};

const getApplication = async (email) => {
  const model = dbModel.application;
  return await model.find({"user.email":email});
};

const updateApplication = async (id, updatedData) => {
  const model = dbModel.application;
  return await model.findByIdAndUpdate(id, updatedData, { new: true });
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
};
