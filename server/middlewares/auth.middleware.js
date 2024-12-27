import jwt from 'jsonwebtoken'
import Company from '../models/company.model.js'


export const protectCompany = async (req,res,next) => {

    const token = req.headers.token

    if(!token) {
        res.jsoon({success:false, message:"Not Authenticated."})
    }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // if(!decoded ) 

        req.company = await Company.findById(decoded.id).select('-password')

        next()

    } catch (error) {
        console.log(error)
        res.json({success:false, message: "Internal Server Error" + error.message})
    }

}