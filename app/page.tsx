import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { VideoGuideSection } from "@/components/video-guide-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { GoalsSection } from "@/components/goals-section"
import { TutorsSection } from "@/components/tutors-section"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"
import { WhatsappButton } from "@/components/whatsapp-button"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <VideoGuideSection />
      <TestimonialsSection />
      <GoalsSection />
      <TutorsSection />
      <AboutSection />
      <Footer />
      <WhatsappButton />
    </main>
  )
}
