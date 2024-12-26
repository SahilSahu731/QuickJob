import { assets } from "../assets/assets"

const Footer = () => {
  return (
    <div className="container border-t border-gray-300 bg-slate-100 px-4 2xl:px-20 mx-auto flex items-center justify-between gap-4 py-3 mt-20">
        <img width={160} src={assets.logo} alt="" />
        <p className="flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden">Copyright @QuickJobs | All Rights Reserved.</p>
        <div className="flex gap-3">
            <img width={38} src={assets.facebook_icon} alt="" />
            <img width={38} src={assets.twitter_icon} alt="" />
            <img width={38} src={assets.instagram_icon} alt="" />
        </div>
    </div>
  )
}

export default Footer