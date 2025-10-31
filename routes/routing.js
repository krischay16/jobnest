const express = require('express');
const router = express.Router();
const serviceModel = require('../service/service');
const bcrypt = require('bcryptjs');
const loginService=require('../service/authservice')
/* --- JOBSEEKER ROUTES --- */
router.post('/login',async(req,res,next)=>{
  try
  {let token=await loginService.login(req.body.email,req.body.password);
  res.json(token);}
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
router.get('/jobseeker/:id', async (req, res, next) => {
 try {
   let data = await serviceModel.getJobseeker(req.params.id);
   res.json(data);
 } catch (err) {
   next(err);
 }
});
router.put('/jobseeker/:id', async (req, res, next) => {
 try {
   let data = await serviceModel.updateJobseeker(req.params.id, req.body);
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
   res.json({ message: "Employer deleted" });
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
router.get('/job', async (req, res, next) => {
 try {
   let jobs = await serviceModel.getJob();
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
   let app = await serviceModel.createApplication(req.body);
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
// router.post('/quiz/add', async (req, res, next) => {
//  try {
//    let quiz = await serviceModel.createQuiz(req.body);
//    res.status(201).json({ message: "Quiz added", quiz });
//  } catch (err) {
//    next(err);
//  }
// });
// router.get('/quiz', async (req, res, next) => {
//  try {
//    let quizzes = await serviceModel.listQuizzes();
//    res.json(quizzes);
//  } catch (err) {
//    next(err);
//  }
// });
// router.put('/quiz/:id', async (req, res, next) => {
//  try {
//    let quiz = await serviceModel.updateQuiz(req.params.id, req.body);
//    res.json({ message: "Quiz updated", quiz });
//  } catch (err) {
//    next(err);
//  }
// });
// router.delete('/quiz/:id', async (req, res, next) => {
//  try {
//    await serviceModel.deleteQuiz(req.params.id);
//    res.json({ message: "Quiz deleted" });
//  } catch (err) {
//    next(err);
//  }
// });
module.exports = router;