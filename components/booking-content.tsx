"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsappButton } from "@/components/whatsapp-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useSearchParams, useRouter } from "next/navigation"

const topics = ["Algebra", "Trigonometry", "Calculus", "Geometry", "Statistics", "Probability"]

export function BookingContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const tutorName = searchParams.get("name") || "Tutor"

  const [sessions, setSessions] = useState<number>(1)
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [showPayment, setShowPayment] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const pricePerSession = 100
  const totalAmount = sessions * pricePerSession

  const handleContinue = () => {
    if (selectedTopics.length === 0) {
      alert("Please select at least one topic")
      return
    }
    setShowPayment(true)
  }

  const handlePayment = () => {
    if (!agreed) {
      alert("Please agree to the terms")
      return
    }
    // Store booking details
    const bookingDetails = {
      tutorName,
      sessions,
      topics: selectedTopics,
      amount: totalAmount,
    }
    sessionStorage.setItem("bookingDetails", JSON.stringify(bookingDetails))
    router.push("/pending-sessions")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <h1 className="mb-12 text-center text-5xl font-bold text-secondary md:text-6xl">
            Book Session with {tutorName}
          </h1>

          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Choose number of days</CardTitle>
                <p className="text-lg text-muted-foreground">(you can select multiple days)</p>
              </CardHeader>
              <CardContent className="space-y-3">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    onClick={() => setSessions(num)}
                    className={`w-full rounded-lg border-2 p-4 text-xl transition-colors ${
                      sessions === num
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {num} session{num > 1 ? "s" : ""}
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Choose a topic</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {topics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => {
                      if (selectedTopics.includes(topic)) {
                        setSelectedTopics(selectedTopics.filter((t) => t !== topic))
                      } else {
                        setSelectedTopics([...selectedTopics, topic])
                      }
                    }}
                    className={`w-full rounded-lg border-2 p-4 text-xl transition-colors ${
                      selectedTopics.includes(topic)
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    {topic}
                  </button>
                ))}
              </CardContent>
            </Card>
          </div>

          <div className="mx-auto mt-8 max-w-6xl">
            <p className="mb-6 text-center text-2xl font-semibold">Amount due: R{totalAmount}</p>
            {!showPayment ? (
              <div className="text-center">
                <Button size="lg" onClick={handleContinue} className="text-lg px-12">
                  Continue
                </Button>
              </div>
            ) : (
              <Card className="mx-auto max-w-md border-2">
                <CardHeader>
                  <CardTitle className="text-3xl">PAYMENT</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber" className="text-lg">
                      Card Number
                    </Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="text-lg" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry" className="text-lg">
                        Expiration Date
                      </Label>
                      <Input id="expiry" placeholder="MM/YY" className="text-lg" />
                    </div>
                    <div>
                      <Label htmlFor="cvv" className="text-lg">
                        CVV
                      </Label>
                      <Input id="cvv" placeholder="123" className="text-lg" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="cardholderName" className="text-lg">
                      Cardholder Name
                    </Label>
                    <Input id="cardholderName" placeholder="John Smith" className="text-lg" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={agreed}
                      onCheckedChange={(checked) => setAgreed(checked as boolean)}
                    />
                    <label
                      htmlFor="terms"
                      className="text-lg leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the terms
                    </label>
                  </div>
                  <Button className="w-full text-lg" size="lg" onClick={handlePayment}>
                    Pay
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsappButton />
    </div>
  )
}
