import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const navigate = useNavigate()
  const { setShowRecruiterLogin} = useContext(AppContext)

  return (
    <main className="shadow py-4 ">
      <div className="container px-4 2xl:px-20 mx-auto flex justify-between items-center ">
        <img onClick={()=> navigate('/')} className="cursor-pointer" src={assets.logo} alt="" />
        {user ? (
          <div className="flex items-center gap-3">
            <Link to='/applications'>Applied Jobs</Link>
            <p> | </p>
            <p className="max-sm:hidden">Hi, {user.firstName + " " + user.lastName}</p>
            <UserButton />
          </div>
        ) : (
          <div className="flex gap-3 max-sm:text-xs ">
            <button onClick={() => setShowRecruiterLogin(true)} className="px-4 py-0.5 hover:underline text-sm ">
              Recruiter Login
            </button>
            <button
              onClick={openSignIn}
              className="bg-blue-600 px-6 py-1.5 text-white border transition-all duration-500 hover:px-10 "
            >
              Login
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Navbar;
