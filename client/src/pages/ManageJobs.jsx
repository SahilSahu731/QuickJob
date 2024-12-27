import moment from "moment"
import { useNavigate } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import { toast } from "react-toastify"
import axios from "axios"

const ManageJobs = () => {

    const navigate = useNavigate()
      const { backendUrl,companyToken} = useContext(AppContext);
    
    const [jobs, setJobs] = useState([])
    
    // function to fetch company job
    const fetchCompanyJobs = async () => {
        try {
            const {data} = await axios.get(`${backendUrl}/api/company/list-jobs`,{headers: {token: companyToken}})
            if(data.success){
                setJobs(data.jobsData.reverse())
                // console.log(data.jobsData)

            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }

    // function to change job visiblity
    const changeJobVisiblity = async (id) => {
        try {
            const {data} = await axios.post(`${backendUrl}/api/company/change-visiblity`,{id},{headers: {token: companyToken}})

            if(data.success){
                toast.success(data.message)
                fetchCompanyJobs()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }

    useEffect(()=> {
        if(companyToken){
            fetchCompanyJobs()
        }
    },[companyToken])  //eslint-disable-line

  return (
    <div className="container p-4 max-w-5xl ">
        <div className="overflow-x-auto ">
            <table className="min-w-full bg-white border border-gray-200 max-sm:text-sm">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b text-left max-sm:hidden">#</th>
                        <th className="py-2 px-4 border-b text-left">Job Title</th>
                        <th className="py-2 px-4 border-b text-left max-sm:hidden">Date</th>
                        <th className="py-2 px-4 border-b text-left max-sm:hidden">Location</th>
                        <th className="py-2 px-4 border-b text-center">Applicants</th>
                        <th className="py-2 px-4 border-b text-left">Visible</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map((job,index)=> (
                        <tr className="text-gray-700" key={index}>
                            <td className="py-2 border-b px-4 max-sm:hidden">{index+1}</td>
                            <td className="py-2 border-b px-4">{job.title}</td>
                            <td className="py-2 border-b px-4 max-sm:hidden">{moment(job.date).format('ll')}</td>
                            <td className="py-2 border-b px-4 max-sm:hidden">{job.location}</td>
                            <td className="py-2 border-b px-4 text-center">{job.applicants}</td>
                            <td className="py-2 border-b px-4">
                                <input onChange={()=> changeJobVisiblity(job._id)} className="scale-125 ml-4" checked={job.visible} type="checkbox" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="mt-4 flex justify-end">
            <button onClick={() => navigate('/dashboard/add-job')} className="bg-black text-white py-2 px-4 rounded transition-all duration-500 hover:px-10">Add New Job</button>
        </div>
    </div>
  )
}

export default ManageJobs
