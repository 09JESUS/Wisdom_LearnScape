"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsappButton } from "@/components/whatsapp-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, Check } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PendingSessionsPage() {
  const router = useRouter()
  const [bookingDetails, setBookingDetails] = useState<any>(null)
  const [approved, setApproved] = useState(false)

  useEffect(() => {
    const details = sessionStorage.getItem("bookingDetails")
    if (details) {
      setBookingDetails(JSON.parse(details))
    }
  }, [])

  const handleApprove = () => {
    setApproved(true)
    // Simulate tutor approval and send confirmation
    setTimeout(() => {
      router.push(`/session-confirmation?learner=John Smith&tutor=${bookingDetails?.tutorName}`)
    }, 2000)
  }

  if (!bookingDetails) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <h1 className="mb-12 text-center text-5xl font-bold text-secondary md:text-6xl">Pending Sessions</h1>

          <div className="mx-auto max-w-3xl">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-3xl">
                  {approved ? (
                    <>
                      <Check className="h-8 w-8 text-primary" />
                      Session Approved!
                    </>
                  ) : (
                    <>
                      <Clock className="h-8 w-8 text-amber-500" />
                      Waiting for Tutor Approval
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-lg">
                <div className="rounded-lg bg-muted p-6 space-y-3">
                  <p>
                    <span className="font-semibold">Tutor:</span> {bookingDetails.tutorName}
                  </p>
                  <p>
                    <span className="font-semibold">Number of Sessions:</span> {bookingDetails.sessions}
                  </p>
                  <p>
                    <span className="font-semibold">Topics:</span> {bookingDetails.topics.join(", ")}
                  </p>
                  <p>
                    <span className="font-semibold">Total Amount:</span> R{bookingDetails.amount}
                  </p>
                </div>

                {!approved ? (
                  <div className="space-y-4">
                    <p className="text-muted-foreground text-center">
                      Your session request has been sent to the tutor. You will receive a confirmation once approved.
                    </p>
                    <div className="text-center">
                      <Button size="lg" onClick={handleApprove} className="text-lg">
                        Simulate Tutor Approval (Demo)
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-primary font-semibold">Redirecting to confirmation...</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsappButton />
    </div>
  )
}
