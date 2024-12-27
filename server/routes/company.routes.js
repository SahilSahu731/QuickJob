import express from 'express';
import { changeJobApplicationStatus, changeVisiblity, getCompanyData, getCompanyJobApplicant, getCompanyPostedJobs, loginCompany, postJob, registerCompany } from '../controllers/company.controller.js';
import upload from '../config/multer.js';
import { protectCompany } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/register', upload.single('image'), registerCompany)

router.post('/login', loginCompany)

router.get('/company',protectCompany, getCompanyData)

router.post('/post-job',protectCompany, postJob)

router.get('/applicants',protectCompany, getCompanyJobApplicant)

router.get('/list-jobs',protectCompany, getCompanyPostedJobs)

router.post('/change-status',protectCompany, changeJobApplicationStatus)

router.post('/change-visiblity',protectCompany, changeVisiblity)

export default router;
