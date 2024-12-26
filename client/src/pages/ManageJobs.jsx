import moment from "moment"
import { manageJobsData } from "../assets/assets"
import { useNavigate } from "react-router-dom"

const ManageJobs = () => {

    const navigate = useNavigate()

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
                    {manageJobsData.map((job,index)=> (
                        <tr className="text-gray-700" key={index}>
                            <td className="py-2 border-b px-4 max-sm:hidden">{index+1}</td>
                            <td className="py-2 border-b px-4">{job.title}</td>
                            <td className="py-2 border-b px-4 max-sm:hidden">{moment(job.date).format('ll')}</td>
                            <td className="py-2 border-b px-4 max-sm:hidden">{job.location}</td>
                            <td className="py-2 border-b px-4 text-center">{job.applicants}</td>
                            <td className="py-2 border-b px-4">
                                <input className="scale-125 ml-4" type="checkbox" />
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