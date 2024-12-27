import Job from "../models/job.model.js"


export const getJobs = async (req,res) => {

    try {

        const jobs = await Job.find({visible: true})
        .populate({path: 'companyId', select: '-password'})

        res.json({success: true, jobs})
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message: "Internal Server Error" + error.message})
    }
    
}

export const getJobById = async (req,res) => {
    try {

        const {id} = req.params

        const job = await Job.findById(id).populate({path: 'companyId', select: '-password'})

        if(!job) {
            return res.json({
                success:false,
                message: "Job not found"
            })
        }

        res.json({
            success:true , job
        })
        
    } catch (error) {
        console.log(error)
        res.json({success:false, message: "Internal Server Error" + error.message})
    }
}