import AppDownload from "../components/AppDownload"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import JobListing from "../components/JobListing"
import Navbar from "../components/Navbar"


const Home = () => {
  return (
    <main>
        <Navbar />
        <Hero />
        <JobListing />
        <AppDownload />
        <Footer />
    </main>
  )
}

export default Home
