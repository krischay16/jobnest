const dbModel = require("./model/dbModel"); // adjust path if needed
const mongoose = require("mongoose");

async function seedDatabase() {
  try {
    await dbModel.connect();

    // 🔹 Clear old data
    await Promise.all([
      dbModel.jobseeker.deleteMany({}),
      dbModel.employer.deleteMany({}),
      dbModel.job.deleteMany({}),
      dbModel.quiz.deleteMany({}),
      dbModel.application.deleteMany({})
    ]);
    console.log("✅ Old data cleared.");

    // 🔹 Employers
    const employers = await dbModel.employer.insertMany([
      {
        companyname: "TechNova Solutions",
        email: "hr@technova.com",
        password: "hashedpassword123",
        phoneNumber: "9876543210",
        description: "Innovative software solutions for businesses.",
        companyicon: "https://example.com/technova.png",
        industry: "Software Development",
        userType: "employer"
      },
      {
        companyname: "GreenCore Industries",
        email: "jobs@greencore.com",
        password: "hashedpassword456",
        phoneNumber: "9123456780",
        description: "Eco-friendly manufacturing and sustainable tech.",
        companyicon: "https://example.com/greencore.png",
        industry: "Manufacturing",
        userType: "employer"
      }
    ]);

    // 🔹 Jobseekers
    const jobseekers = await dbModel.jobseeker.insertMany([
      {
        fullname: "Karthik R",
        email: "karthik@gmail.com",
        password: "secure123",
        skill: ["JavaScript", "React", "Node.js"],
        jobpreference: ["Frontend Developer", "Fullstack Developer"],
        test: false,
        experience: "0-2",
        resume: "https://example.com/resume_karthik.pdf",
        phoneNumber: "9998887776",
        userType: "jobseeker",
        linkedin: "https://linkedin.com/in/karthikr",
        github: "https://github.com/karthikr",
        leetcode: "https://leetcode.com/karthikr"
      },
      {
        fullname: "Sarah J",
        email: "sarah@gmail.com",
        password: "secure123",
        skill: ["Python", "Django", "Machine Learning"],
        jobpreference: ["Backend Developer", "ML Engineer"],
        test: false,
        experience: "2-4",
        resume: "https://example.com/resume_sarah.pdf",
        phoneNumber: "8887776665",
        userType: "jobseeker",
        linkedin: "https://linkedin.com/in/sarahj",
        github: "https://github.com/sarahj",
        leetcode: "https://leetcode.com/sarahj"
      }
    ]);

    // 🔹 Jobs (8 total)
    const jobs = await dbModel.job.insertMany([
      {
        title: "Frontend Developer",
        salaryRange: "5-7 LPA",
        skills: ["React", "JavaScript", "CSS"],
        description: "Build modern UI components using React.",
        type: "Full-Time",
        experience: "0-2",
        location: "Bangalore",
        score: [{ skill: "React", value: 80 }],
        company: employers[0].companyname,
        employer: employers[0]._id,
        id: "JOB001"
      },
      {
        title: "Backend Developer",
        salaryRange: "6-9 LPA",
        skills: ["Node.js", "MongoDB", "Express"],
        description: "Develop and maintain RESTful APIs.",
        type: "Full-Time",
        experience: "1-3",
        location: "Chennai",
        company: employers[0].companyname,
        employer: employers[0]._id,
        id: "JOB002"
      },
      {
        title: "Machine Learning Engineer",
        salaryRange: "10-14 LPA",
        skills: ["Python", "TensorFlow", "ML"],
        description: "Train and deploy ML models for automation.",
        type: "Full-Time",
        experience: "2-4",
        location: "Hyderabad",
        company: employers[1].companyname,
        employer: employers[1]._id,
        id: "JOB003"
      },
      {
        title: "Data Analyst",
        salaryRange: "5-8 LPA",
        skills: ["Python", "SQL", "Pandas"],
        description: "Analyze business data and generate insights.",
        type: "Full-Time",
        experience: "1-3",
        location: "Pune",
        company: employers[1].companyname,
        employer: employers[1]._id,
        id: "JOB004"
      },
      {
        title: "Java Developer",
        salaryRange: "6-10 LPA",
        skills: ["Java", "Spring Boot", "MySQL"],
        description: "Build enterprise applications with Java.",
        type: "Full-Time",
        experience: "2-4",
        location: "Delhi",
        company: employers[0].companyname,
        employer: employers[0]._id,
        id: "JOB005"
      },
      {
        title: "Full Stack Developer",
        salaryRange: "7-12 LPA",
        skills: ["React", "Node.js", "MongoDB"],
        description: "Develop full-stack web applications.",
        type: "Full-Time",
        experience: "1-3",
        location: "Bangalore",
        company: employers[0].companyname,
        employer: employers[0]._id,
        id: "JOB006"
      },
      {
        title: "Python Developer",
        salaryRange: "6-9 LPA",
        skills: ["Python", "Flask", "Django"],
        description: "Develop scalable Python backend services.",
        type: "Full-Time",
        experience: "0-2",
        location: "Kochi",
        company: employers[1].companyname,
        employer: employers[1]._id,
        id: "JOB007"
      },
      {
        title: "Software Tester",
        salaryRange: "4-6 LPA",
        skills: ["Selenium", "Java", "Automation"],
        description: "Automate and test web applications.",
        type: "Full-Time",
        experience: "0-2",
        location: "Chandigarh",
        company: employers[1].companyname,
        employer: employers[1]._id,
        id: "JOB008"
      }
    ]);

    // 🔹 Quiz (15 total)
    const quizzes = await dbModel.quiz.insertMany([
      // React (5)
      { skill: "React", question: "What does JSX stand for?", options: ["JavaScript XML", "JSON X", "JS Extension", "None"], answerIndex: 0 },
      { skill: "React", question: "Which hook is used for side effects?", options: ["useState", "useEffect", "useRef", "useMemo"], answerIndex: 1 },
      { skill: "React", question: "What is used to manage state in React?", options: ["Props", "Components", "Hooks", "Render"], answerIndex: 2 },
      { skill: "React", question: "Virtual DOM improves what?", options: ["Performance", "Security", "Styling", "Storage"], answerIndex: 0 },
      { skill: "React", question: "Which library is used for routing?", options: ["react-router-dom", "axios", "redux", "bootstrap"], answerIndex: 0 },

      // Python (5)
      { skill: "Python", question: "Which keyword defines a function?", options: ["func", "function", "def", "define"], answerIndex: 2 },
      { skill: "Python", question: "Which is immutable?", options: ["List", "Set", "Tuple", "Dictionary"], answerIndex: 2 },
      { skill: "Python", question: "Which library is used for data analysis?", options: ["numpy", "matplotlib", "pandas", "flask"], answerIndex: 2 },
      { skill: "Python", question: "How do you print in Python?", options: ["echo", "console.log", "print()", "display"], answerIndex: 2 },
      { skill: "Python", question: "What is PEP 8?", options: ["Style guide", "Compiler", "Interpreter", "Package"], answerIndex: 0 },

      // Java (5)
      { skill: "Java", question: "Which is not a Java keyword?", options: ["class", "int", "goto", "define"], answerIndex: 3 },
      { skill: "Java", question: "Which method starts execution?", options: ["main()", "start()", "run()", "init()"], answerIndex: 0 },
      { skill: "Java", question: "What is JVM?", options: ["Virtual Machine", "Variable Manager", "Java Manager", "None"], answerIndex: 0 },
      { skill: "Java", question: "Which keyword is used for inheritance?", options: ["this", "super", "extends", "import"], answerIndex: 2 },
      { skill: "Java", question: "Which collection allows duplicates?", options: ["Set", "Map", "List", "TreeSet"], answerIndex: 2 }
    ]);

    // 🔹 Applications (sample)
    await dbModel.application.insertMany([
      { job: jobs[0]._id, user: jobseekers[0]._id, employer: employers[0]._id, status: "applied" },
      { job: jobs[3]._id, user: jobseekers[1]._id, employer: employers[1]._id, status: "applied" }
    ]);

    console.log("🌱 Database seeded successfully with 8 jobs and 15 quizzes!");
  } catch (err) {
    console.error("❌ Error seeding database:", err);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 MongoDB disconnected.");
  }
}

seedDatabase();
