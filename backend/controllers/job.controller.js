import { Job } from "../models/job.model.js";

//For Admin
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        console.log("require",requirements.split(","))
        const userId = req.id;
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({ message: "All fields are required.", success: false });
        };

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });
        res.status(201).json({
            message: "New Job created successfully",
            job,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

//For Student
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } }
            ]
        };
        const jobs = await Job.find(query).populate({
            path:"company"
        }).sort({createdAt : -1});
        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            })
        }

        return res.status(200).json({
            message: "Jobs List",
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}

//For Student
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(400).json({
                message: "No Job Found",
                success: false
            })
        }

        return res.status(200).json({
            message: "Job Data",
            job,
            success: true
        });

    } catch (error) {

    }
}

//Job List per admin
export const getAdminJobs = async(req,res)=>{
    try {
        const adminId = req.id;
        const jobs = await Job.find({created_by:adminId});
        if(!jobs){
            return res.status(400).json({
                message: "No Job Found",
                success: false
            })
        }

         return res.status(200).json({
            message: "Job List",
            jobs,
            success: true
        });
    } catch (error) {
        
    }
}