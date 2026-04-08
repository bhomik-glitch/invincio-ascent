import './App.css'
import Footer from './components/Footer'
import HeroSection from './components/HeroSection'
import Mentors from './components/Mentors'
import MissionVission from './components/MissionVission'
import Navbar from './components/Navbar'
import Partnership from './components/Partnership'
import Popup from './components/Popup'
import Projects from './components/Projects'
import SecondSection from './components/SecondSection'
import Services from './components/Services'
import StickySocail from './components/StickySocail'
import SuccessStories from './components/SuccessStories'
import Tagline from './components/Tagline'
import WhySection from './components/WhySection'
import WisdomWellSection from './components/WisdomWellSection'
import RecentUpdates from './components/RecentUpdates'
import { useState } from 'react'

function App() {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (<>
    <div className="poppins">
      <StickySocail />
      <Popup />
      <Navbar onServiceSelect={setSelectedService} />
      <Tagline />
      <RecentUpdates />
      <Projects id="projects" />
      <SuccessStories />
      <MissionVission />
      <Services id="services" selectedService={selectedService} />
      <Partnership />
      <Mentors id="mentors" />
      <SecondSection />
      <WisdomWellSection />
      <HeroSection />
      <WhySection />
      <Footer />
    </div>
  </>

  )
}

export default App
