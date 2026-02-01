"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsappButton } from "@/components/whatsapp-button"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

export function SessionConfirmationContent() {
  const searchParams = useSearchParams()
  const learnerName = searchParams.get("learner") || "Learner"
  const tutorName = searchParams.get("tutor") || "Tutor"

  return (
    <div className="flex min-h-screen flex-col bg-muted/20">
      <Navigation />
      <main className="flex-1 flex items-center justify-center py-16">
        <Card className="mx-4 w-full max-w-md border-2 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-primary/10">
                <Image
                  src="/images/screenshot-29-12-2025-94421.jpeg"
                  alt="Wisdom Learnscape Logo"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>
            </div>

            <h1 className="mb-4 text-3xl font-bold text-secondary">Welcome to the tutoring program!</h1>

            <p className="mb-6 text-4xl font-bold text-primary">{learnerName}</p>

            <Button className="mb-8 text-lg" size="lg">
              THANK YOU
            </Button>

            <div className="space-y-4 text-left text-lg text-muted-foreground">
              <p className="font-semibold text-secondary">Dear Parent,</p>

              <p className="leading-relaxed">
                Thank you for enrolling your child. We sincerely appreciate your partnership as we embark on this
                educational journey together.
              </p>

              <p className="mt-6">
                <span className="font-semibold text-secondary">Regards,</span>
                <br />
                Wisdom Learnscape
              </p>

              <div className="mt-8 rounded-lg bg-primary/5 p-4 text-center">
                <p className="font-semibold text-primary">Confirmation sent via:</p>
                <p className="text-base">Email • SMS • WhatsApp</p>
              </div>
            </div>

            <Link href="/" className="mt-8 block">
              <Button variant="outline" className="w-full text-lg bg-transparent" size="lg">
                Back to Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
      <Footer />
      <WhatsappButton />
    </div>
  )
}
