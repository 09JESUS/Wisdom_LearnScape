import { Suspense } from "react"
import { LearnerMessagesContent } from "@/components/learner-messages-content"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsappButton } from "@/components/whatsapp-button"

export default function LearnerMessagesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <Suspense
        fallback={
          <div className="flex-1 py-8">
            <div className="container mx-auto px-4">
              <p>Loading messages...</p>
            </div>
          </div>
        }
      >
        <LearnerMessagesContent />
      </Suspense>
      <Footer />
      <WhatsappButton />
    </div>
  )
}
