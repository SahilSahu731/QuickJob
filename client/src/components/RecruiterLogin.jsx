import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RecruiterLogin = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate()

  const [image, setImage] = useState(false);

  const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);

  const { setShowRecruiterLogin, backendUrl, setCompanyData, setCompanyToken} = useContext(AppContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    if(state === "Sign Up" && !isTextDataSubmitted){
        return setIsTextDataSubmitted(true)
    }

    try {
      if(state === "Login"){
        const {data} = await axios.post(`${backendUrl}/api/company/login`, {
          email, password
        })
        if(data.success){
          // console.log(data)
          setCompanyData(data.company)
          setCompanyToken(data.token)
          localStorage.setItem('companyToken', data.token);
          toast.success(data.message)   
          setShowRecruiterLogin(false)
          navigate('/dashboard')
        } else {
          toast.error("Invalid email or password")
        }
      
      } else {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('image', image)
        const {data} = await axios.post(`${backendUrl}/api/company/register`, formData)
        if(data.success){
          setCompanyData(data.company)
          setCompanyToken(data.token)
          localStorage.setItem('companyToken', data.token);
          toast.success(data.message)   
          setShowRecruiterLogin(false)
          navigate('/dashboard')
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }

  }

  useEffect(()=> {
    document.body.style.overflow = "hidden"
    return () => {
        document.body.style.overflow = "unset"
    }
  },[])

  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center ">
      <form onSubmit={onSubmitHandler} className="relative bg-white p-10 rounded-xl text-slate-500">
        <h1 className="text-center text-2xl text-neutral-700 font-medium">
          Recruiter {state}
        </h1>
        <p className="text-sm">Welcome back! Please sign in to continue </p>
        {state === "Sign Up" && isTextDataSubmitted ? (
          <>
            <div className="flex items-center gap-4 my-10">
                <label htmlFor="image">
                    <img className="w-16 rounded-full cursor-pointer" src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" hidden id="image" />
                </label>
                <p>Upload Company <br /> Logo</p>
            </div>
          </>
        ) : (
          <>
            {state !== "Login" && (
              <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
                <img src={assets.person_icon} alt="" />
                <input
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  placeholder="Company Name"
                  className="outline-none text-sm"
                  required
                />
              </div>
            )}
            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.email_icon} alt="" />
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="E-mail Id"
                className="outline-none text-sm"
                required
              />
            </div>
            <div className="border px-4 py-2 flex items-center gap-2 rounded-full mt-5">
              <img src={assets.lock_icon} alt="" />
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="outline-none text-sm"
                placeholder="Password"
                required
              />
            </div>

            {state === "Login" && (
              <p className="text-sm text-blue-600 mt-4 cursor-pointer ml-2">
                Forgot Password?
              </p>
            )}
          </>
        )}

        <button type="submit" className="bg-blue-600 mt-5 w-full text-white py-2 rounded-full">
          {state === "Login" ? "Login" : isTextDataSubmitted ? "Create Account" : "Next"}
        </button>
        {state === "Login" ? (
          <p className="mt-3 text-sm text-center">
            Don&apos;t have an Account?{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => setState("Sign Up")}
            >
              Sign Up
            </span>
          </p>
        ) : (
          <p className="mt-3 text-sm text-center">
            Already have an Account?{" "}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={() => setState("Login")}
            >
              Login
            </span>
          </p>
        )}

        <img src={assets.cross_icon} className="absolute top-5 right-5 cursor-pointer" onClick={() => setShowRecruiterLogin(false)} alt="" />

      </form>
    </div>
  );
};

export default RecruiterLogin;
