const mongoose=require('mongoose')

const userschema= new mongoose.Schema({

    fullname:{type:String,required:true},

    email:{type:String,required:true,unique:true},

    password:{type:String,required:true},

    skill:{type:[String],required:true},

    jobpreference:{type:[String],required:true},

    test:{type:Boolean},

    score:{type:[{String:Number}]},

    experience:{type:String},

    resume:{type:String},

    phoneNumber:{type:String,required:true},

    userType:{type:String,required:true}

},{collection:"jobseeker"})

const employeeschema= new mongoose.Schema({

    fullname:{type:String,required:true},

    email:{type:String,required:true,unique:true},

    password:{type:String,required:true},

    phoneNumber:{type:String,required:true},

    description: {type:String,required:true},

  companyicon: {type:String,required:true},

  industry: {type:String,required:true}

},{collection:"employer"})

const jobschema= new mongoose.Schema({

    jobtitle:{type:String,required:true},

    salary:{type:String,required:true},

    skill:{type:[String],required:true},

    description:{type:String,required:true},

    preference:{type:String,required:true},

    experience:{type:String,required:true},

    location:{type:String,required:true},

    score:{type:[{String,Number}],required:true},

    employer:{type:mongoose.Schema.Types.ObjectId,ref:"employer",required:true},

    // applications:[{type:mongoose.Schema.Types.ObjectId,ref:"jobseeker",required:true}]

},{collection:"jobpost"})

const quizschema=new mongoose.Schema({

    skill:{type:String,required:true},

    question:{type:String,required:true},

    options:{type:[String],required:true},

    answerIndex:{type:Number,required:true}

},{collection:"quiz"})

const applicationschema=new mongoose.Schema({

    job:{type:mongoose.Schema.Types.ObjectId,ref:"job",required:true},

    user:{type:mongoose.Schema.Types.ObjectId,ref:"jobseeker",required:true},

    status:{type:String}

},{collection:"application"})


 

const dbModel={}

dbModel.connect=async()=>{

await mongoose.connect('mongodb://127.0.0.1:27017/jobnest',{useNewUrlParser:true,useUnifiedTopology:true}).then((res)=>{

    console.log('mango connected')

})}

dbModel.jobseeker=async ()=>{

    const model=await mongoose.model("jobseeker",userschema)

    return model

}

dbModel.employee=async()=>{

    const model=await mongoose.model(employer,employeeschema)

    return model

}

dbModel.job=async()=>{

    const model=await mongoose.model(jobpost,jobschema)

    return model

}

dbModel.quiz=async()=>{

    const model=await mongoose.model("quiz",quizschema)

    return model

}

dbModel.application=async()=>{

    const model=await mongoose.model(application,applicationschema)

    return model

}

module.exports=dbModel


