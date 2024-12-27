import Company from "../models/company.model.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import generateToken from "../utils/generateToken.js";
import Job from "../models/job.model.js";
import JobApplication from "../models/jobApplication.model.js";

// register a new company
export const registerCompany = async (req, res) => {
  const { name, email, password } = req.body;
  const imageFile = req.file;

  if (!name || !email || !password || !imageFile) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const companyExists = await Company.findOne({ email });

    if (companyExists) {
      return res.status(400).json({ message: "Company already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    // console.log(imageUpload)
    
    const company = await Company.create({
      name,
      email,
      password: hashedPassword,
      image: imageUpload.secure_url,
    });


    res.json({
      success: true,
      message: "Company registered successfully",
      company,
      token: generateToken(company._id),
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const loginCompany = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({success:false, message: "All fields are required" });
    }

    try {
        const company = await Company.findOne({ email });

        if (!company) {
            return res.status(401).json({success:false, message: "Company not found" });
        }

        const match = await bcrypt.compare(password, company.password);

        if (!match) {
            return res.status(401).json({ success:false, message: "Invalid email or password" });
        }

        res.json({
            success: true,
            message: "Company logged in successfully",
            company,
            token: generateToken(company._id),
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export const getCompanyData = async (req, res) => {
  try {

    const company = req.company

    res.json({ success: true, company });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const postJob = async (req, res) => {

    const { title, description, salary, location,level,category } = req.body;

    const companyId = req.company._id
    
    // if (!title || !description || !salary || || !location) {
    //     return res.status(400).json({success:false, error: "All fields are required" });
    // }

    try {

       const newJob = new Job({
        title,
        description, 
        salary, 
        level,
        category,
        date: Date.now(),
        location ,
        companyId
       })

       await newJob.save()

        res.json({ success: true, newJob });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }

};

export const getCompanyPostedJobs = async (req, res) => {
  try {

    const companyId = req.company._id

    const jobs = await Job.find({companyId})

    // Adding no of applicant data 
    const jobsData = await Promise.all(jobs.map(async (job) => {
      const applicants = await JobApplication.find({jobId: job._id})
      return {...job.toObject(), applicants: applicants.length}
    }))
 
    res.json({
      success:true,
      jobsData
    })
    
  } catch (error) {
    console.log(error)
    res.json({success:false, message: "Internal Server Error" + error.message})
  }
};


export const getCompanyJobApplicant = async (req, res) => {
    try {
      const companyId = req.company._id

      const applications = await JobApplication.find({companyId}) 
      .populate('userId', 'name image resume')
      .populate('jobId', 'title location category level salary')
      .exec()

      return res.json({success: true, applications})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Internal Server Error"})
    }
};

export const changeJobApplicationStatus = async (req, res) => {
  try {
    const {id , status} = req.body

    await JobApplication.findOneAndUpdate({_id:id}, {status})   

    return res.json({success: true, message: "Status Changed"})

  } catch (error) {
      console.log(error)
      res.json({success: false, message: "Internal Server Error"})
  }
};

export const changeVisiblity = async (req, res) => {
    try {

      const {id} = req.body
      const companyId = req.company._id

      const job = await Job.findById(id)

      if(companyId.toString() === job.companyId.toString()){
        job.visible = !job.visible
      }

      await job.save()

      res.json({
        success:true ,
        job
      })
      
    } catch (error) {
      console.log(error)
      res.json({success:false, message: "Internal Server Error" + error.message})
    }
};
