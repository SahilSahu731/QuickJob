import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Applications from "./pages/Applications"
import ApplyJob from "./pages/ApplyJob"
import RecruiterLogin from "./components/RecruiterLogin"
import { useContext } from "react"
import { AppContext } from "./context/AppContext"
import Dashboard from "./pages/Dashboard"
import ManageJobs from "./pages/ManageJobs"
import ViewApplications from "./pages/ViewApplications"
import AddJobs from "./pages/AddJobs"
import 'quill/dist/quill.snow.css'

function App() {
  
  const { showRecruiterLogin} = useContext(AppContext)

  return (
    <main>
      {showRecruiterLogin && 
      <RecruiterLogin />}
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/applications" element={<Applications/>} />
            <Route path="/apply-job/:id" element={<ApplyJob/>} />
            <Route path="/dashboard" element={<Dashboard/>}>
                <Route path="manage-jobs" element={<ManageJobs/>} />
                <Route path="view-applications" element={<ViewApplications/>} />
                <Route path="add-job" element={<AddJobs/>} />
            </Route>
           
        </Routes>
    </main>
  )
}

export default App
