const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  skill: { type: [String], required: true },
  jobpreference: { type: [String], required: true },
  test: { type: Boolean },
  score: [{ skill: String, value: Number }],
  experience: { type: String },
  resume: { type: String },
  phoneNumber: { type: String },
  userType: { type: String, required: true }
}, { collection: "jobseeker" });

const employeeschema = new mongoose.Schema({
  companyname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  description: { type: String, required: true },
  companyicon: { type: String },
  industry: { type: String, required: true },
  userType: { type: String, required: true }
}, { collection: "employer" });

const jobschema = new mongoose.Schema({
  jobtitle: { type: String, required: true },
  salaryRange: { type: String, required: true },
  skills: { type: [String], required: true },
  description: { type: String, required: true },
  preference: { type: String, required: true },
  experience: { type: String, required: true },
  location: { type: String, required: true },
  score: [{ skill: String, value: Number }],
  employer: { type: mongoose.Schema.Types.ObjectId, ref: "employer", required: true },
}, { collection: "jobpost" });

const quizschema = new mongoose.Schema({
  skill: { type: String, required: true },
  question: { type: String, required: true },
  options: { type: [String], required: true },
  answerIndex: { type: Number, required: true }
}, { collection: "quiz" });

const applicationschema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: "jobpost", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "jobseeker", required: true },
  status: { type: String }
}, { collection: "application" });

const MessageSchema = new mongoose.Schema({
  roomId: { type: String, required: true },
  senderId: { type: mongoose.Schema.Types.ObjectId, required: true },
  senderName: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const dbModel = {};

dbModel.connect = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/jobnest', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('MongoDB connected successfully ✅');
};

dbModel.jobseeker = mongoose.model("jobseeker", userschema);
dbModel.employer = mongoose.model("employer", employeeschema);
dbModel.job = mongoose.model("jobpost", jobschema);
dbModel.quiz = mongoose.model("quiz", quizschema);
dbModel.application = mongoose.model("application", applicationschema);


module.exports = dbModel;
