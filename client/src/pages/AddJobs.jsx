import { useEffect, useRef, useState } from "react"
import Quill from 'quill'
import { JobCategories, JobLocations } from "../assets/assets"
import JobListing from "../components/JobListing"

const AddJobs = () => {

    const [title,setTitle] = useState('')
    const [location,setLocation] = useState('Bangalore')
    const [category,setCategory] = useState('Programming')
    const [level,setLevel] = useState('Beginner Level')
    const [salary, setSalary] = useState(0)

    const editorRef = useRef(null)
    const quillRef = useRef(null)

    useEffect(()=> {
        // inmitiate quil only once
        if(!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
            })
        }
    },[])

  return (
    <form className="container p-4 flex flex-col w-full items-start gap-3">

        <div className="w-full">
            <p className="mb-2">Job Title</p>
            <input 
            type="text" 
            className="w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded"
            placeholder="Type here"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
            />
        </div>

        <div className="w-full max-w-lg">
            <p className="my-2">Job Description</p>
            <div className="border border-gray-300" ref={editorRef}>

            </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
            <div>
                <p className="mb-2">Job Category</p>
                <select className="w-full px-3 py-2 border-2 border-gray-300 rounded" onChange={(e)=> setCategory(e.target.value)} >
                    {JobCategories.map((category, index)=> (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <p className="mb-2">Job Location</p>
                <select className="w-full px-3 py-2 border-2 border-gray-300 rounded" onChange={(e)=> setLocation(e.target.value)} >
                    {JobLocations.map((location, index)=> (
                        <option key={index} value={location}>
                            {location}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <p className="mb-2">Job Level</p>
                <select  className="w-full px-3 py-2 border-2 border-gray-300 rounded" onChange={(e)=> setLevel(e.target.value)} >
                    <option value="Beginner level">Beginner level</option>
                    <option value="Intermediate level">Intermediate level</option>
                    <option value="Senior level">Senior level</option>
                </select>
            </div>
        </div>

        <div>
            <p className="mb-2">Job Salary</p>
            <input 
            type="number" 
            className="w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]"
            placeholder="25000" 
            min={0}
            onChange={(e) => setSalary(e.target.value)}
            // value={salary}
            />
        </div>

        <button className="px-10 py-3 mt-4 bg-black text-white rounded transition-all duration-500 hover:px-14">ADD</button>

    </form>
  )
}

export default AddJobs
