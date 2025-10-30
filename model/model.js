const dbModel=require('./dbModel')


 

const createJobseeker=async(data)=>{

    const model=await dbModel.jobseeker();

    const doc=await model.create(data)

    return doc

}


 

const getJobseeker = async (email) => {
    const model = await dbModel.jobseeker();
    // use findOne to return a single user document (or null) for login
    return await model.findOne({ email: email });
}


 

const updateJobseeker=async(id,updateData)=>{

    const model=await dbModel.jobseeker()

    return await model.findByIdAndUpdate(id,updateData,{new:true})

}


 

const createEmployer=async(data)=>{

    const model=await dbModel.employee()

    return await model.create(data)

}


 

const getEmployer=async(query)=>{

    const model=await dbModel.employee()

    return await model.find(query)

}


 

const updateEmployer=async(id,updatedData)=>{

    const model=await dbModel.employee()

    return model.findByIdAndUpdate(id,updatedData,{new:true})

}


 

const createJob=async(data)=>{

    const model=await dbModel.job()

    return await model.create(data)

}


 

const getJob=async(query)=>{

    const model=await dbModel.job()

    return await model.find(query)

}


 

const updateJob=async(id,updatedData)=>{

    const model=await dbModel.job()

    return model.findByIdAndUpdate(id,updatedData,{new:true})

}


 

const createApplication=async(data)=>{

    const model=await dbModel.application()

    return await model.create(data)

}


 

const getApplication=async(query)=>{

    const model=await dbModel.application()

    return await model.find(query)

}


 

const updateApplication=async(id,updatedData)=>{

    const model=await dbModel.application()

    return model.findByIdAndUpdate(id,updatedData,{new:true})

}


 

module.exports={

    createApplication,createEmployer,createJob,createJobseeker,getApplication,

    getEmployer,getJob,getJobseeker,updateApplication,updateEmployer,updateJob,updateJobseeker

}



 