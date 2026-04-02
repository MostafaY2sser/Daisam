
import AboutUs from '@components/landing/AboutUs'
import ContactSection from '@components/landing/ContactSection'
import HeroSection from '@components/landing/HeroSection'
import FeaturesSection from '../../components/landing/FeaturesSection'
import LicensedSection from '../../components/landing/LicensedSection'
import ServicesSection from '../../components/landing/ServicesSection'
import StatsSection from '../../components/landing/StatsSection'
import SuccessPartners from '../../components/landing/SuccessPartners'
import ProjectsSection from '../../components/landing/ProjectsSection'
import FAQSection from '../../components/landing/FAQSection'
import TestimonialsSection from '../../components/landing/TestimonialsSection'

const Home = () => {
  return (
    <div>
      <HeroSection />
      <AboutUs/>
      <StatsSection />
      <FeaturesSection/>
      <LicensedSection />
      <ServicesSection />
      <ProjectsSection/>
      <SuccessPartners/>  
      <FAQSection />
      <TestimonialsSection/>  
      <ContactSection />
    </div>
  )
}

export default Home