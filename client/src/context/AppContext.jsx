/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { jobsData } from "../assets/assets";

export const AppContext = createContext()

export const AppContextProvider = (props) => {

    const [searchFilter,setSearchFilter] = useState({
        title: "",
        location : ""
    })

    const [isSearched, setIsSearched] = useState(false)

    const [jobs, setJobs] = useState([])

    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)

    //function to fetch job data
    const fetchJobs = async () => {
        setJobs(jobsData)
    }

    useEffect(() => {
        fetchJobs()   
    },[]) //eslint-disable-lin


    const value = {
        searchFilter, setSearchFilter,
        jobs, setJobs,
        isSearched, setIsSearched,
        showRecruiterLogin, setShowRecruiterLogin
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}