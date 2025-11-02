const express = require('express');
const router = express.Router();
const serviceModel = require('../service/service');
const bcrypt = require('bcryptjs');
const loginService=require('../service/authservice')
const Message = require('../model/message');


/* --- JOBSEEKER ROUTES --- */
var user;

router.get('/users', async (req, res, next) => {
  try {
    const jobseekers = await serviceModel.getJobseekers();
    const employers = await serviceModel.getEmployers();
    
    const allUsers = [
      ...jobseekers.map(u => ({
        _id: u._id,
        fullname: u.fullname,
        email: u.email,
        usertype: 'jobseeker'
      })),
      ...employers.map(u => ({
        _id: u._id,
        companyname: u.companyname,
        email: u.email,
        usertype: 'employer'
      }))
    ];
    
    res.json(allUsers);
  } catch (err) {
    next(err);
  }
});

// Get messages for a specific room
router.get('/messages/:roomId', async (req, res, next) => {
  try {
    const messages = await Message.find({ roomId: req.params.roomId })
      .sort({ timestamp: 1 })
      .limit(100); // Limit to last 100 messages
    res.json(messages);
  } catch (err) {
    next(err);
  }
});


router.use('/',(req,res,next)=>{
  user=req.user;
  next()
})
router.post('/login',async(req,res,next)=>{
  try
  {let {token,user}=await loginService.login(req.body.email,req.body.password);
  console.log(token,user);
  res.json({token,user});}
  catch(err){
    next(err)
  }
})
router.post('/jobseeker/signup', async (req, res, next) => {
 try {
   // hash password before saving
   let data = await serviceModel.createJobseeker(req.body);
   res.status(201).json({ message: "Account created successfully", data });
 } catch (err) {
   next(err);
 }
});
router.get(`/jobseeker`, async (req, res, next) => {
 try {
   let data = await serviceModel.getJobseeker(req.user.email);
   console.log(data);
   res.json(data);
 } catch (err) {
   next(err);
 }
});
router.put('/jobseeker', async (req, res, next) => {
 try {
   let data = await serviceModel.updateJobseeker(req.user.email, req.body);
   
   res.json({ message: "Updated successfully", data });
 } catch (err) {
   next(err);
 }
});
router.delete('/jobseeker/:id', async (req, res, next) => {
 try {
   await serviceModel.deleteJobseeker(req.params.id);
   res.json({ message: "Account deleted successfully" });
 } catch (err) {
   next(err);
 }
});
/* --- EMPLOYER ROUTES --- */
router.post('/employer/signup', async (req, res, next) => {
 try {
   let data = await serviceModel.createEmployer(req.body);
   res.status(201).json({ message: "Employer account created", data });
 } catch (err) {
   console.log(err.message);
   next(err);
 }
});
router.get('/employer', async (req, res, next) => {
 try {
   let data = await serviceModel.listEmployers();
   res.json(data);
 } catch (err) {
   next(err);
 }
});
router.put('/employer/:id', async (req, res, next) => {
 try {
   let data = await serviceModel.updateEmployer(req.params.id, req.body);
   res.json({ message: "Employer updated", data });
 } catch (err) {
   next(err);
 }
});
router.delete('/employer/:id', async (req, res, next) => {
 try {
   await serviceModel.deleteEmployer(req.params.id);
   res.json({ message: "Employer deleted"});
 } catch (err) {
   next(err);
 }
});
/* --- JOB ROUTES --- */
router.post('/job/post', async (req, res, next) => {
 try {
   let job = await serviceModel.createJob(req.body);
   res.status(201).json({ message: "Job posted successfully", job });
 } catch (err) {
   next(err);
 }
});
router.get('/jobs', async (req, res, next) => {
 try {
   let jobs = await serviceModel.getJobs();
   res.json(jobs);
 } catch (err) {
   next(err);
 }
});
router.get('/job/:id', async (req, res, next) => {
 try {
   let jobs = await serviceModel.getJob(req.params.id);
   res.json(jobs);
 } catch (err) {
   next(err);
 }
});

router.get('/jobbyid/:id', async (req, res, next) => {
 try {
   let jobs = await serviceModel.getJobById(req.params.id);
   res.json(jobs);
 } catch (err) {
   next(err);
 }
});




router.put('/job/:id', async (req, res, next) => {
 try {
   let job = await serviceModel.updateJob(req.params.id, req.body);
   res.json({ message: "Job updated", job });
 } catch (err) {
   next(err);
 }
});
router.delete('/job/:id', async (req, res, next) => {
 try {
   await serviceModel.deleteJob(req.params.id);
   res.json({ message: "Job deleted" });
 } catch (err) {
   next(err);
 }
});
/* --- APPLICATION ROUTES --- */
router.post('/application/apply', async (req, res, next) => {
 try {
  const {user,job,status}=req.body
  let app = await serviceModel.createApplication({user:user,job:job,status:status});
   res.status(201).json({ message: "Applied successfully", app });
 } catch (err) {
   next(err);
 }
});
router.get('/application/:email', async (req, res, next) => {
 try {
   let apps = await serviceModel.getApplication(req.params.email);
   res.json(apps);
 } catch (err) {
   next(err);
 }
});

router.get('/applications/:userId', async (req, res, next) => {
 try {
   let apps = await serviceModel.getApplicationsByUser(req.params.userId);  
    res.json(apps);
  } catch (err) {
    next(err);
  }
});

router.put('/application/:id', async (req, res, next) => {
 try {
   let app = await serviceModel.updateApplication(req.params.id, req.body);
   res.json({ message: "Application updated", app });
 } catch (err) {
   next(err);
 }
});
router.delete('/application/:id', async (req, res, next) => {
 try {
   await serviceModel.deleteApplication(req.params.id);
   res.json({ message: "Application deleted" });
 } catch (err) {
   next(err);
 }
});
/* --- QUIZ ROUTES --- */

router.get('/quiz', async (req, res, next) => {
 try {
   const questions = await serviceModel.questions();
   // model.questions() returns an array already; ensure we return an array
   res.json(Array.isArray(questions) ? questions : (questions ? [questions] : []));
 } catch (err) {
   next(err);
 }
});

router.post('/submit', async (req, res, next) => {
  try {
    const { answers } = req.body;
    const userId = req.user.email; // decoded from token

    const result = await serviceModel.submitQuiz(userId, answers);

    res.json({
      message: 'Assessment submitted successfully ✅',
      scores: result.scoreArray,
      user: result.updatedUser
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;