"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function ConfirmationPage() {
  const [learnerName, setLearnerName] = useState("Student")

  useEffect(() => {
    const storedName = sessionStorage.getItem("learnerName")
    if (storedName) {
      setLearnerName(storedName)
    }
  }, [])

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl">
            <Card className="border-2 p-12 text-center">
              <div className="mb-8 flex justify-center">
                <Image
                  src="/images/screenshot-29-12-2025-94421.jpeg"
                  alt="Wisdom Learnscape Logo"
                  width={200}
                  height={80}
                  className="object-contain"
                />
              </div>

              <h1 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Welcome to the tutoring program!</h1>

              <h2 className="mb-8 text-4xl font-bold text-foreground md:text-5xl">{learnerName}</h2>

              <Button size="lg" className="mb-12 text-lg">
                THANK YOU
              </Button>

              <div className="space-y-6 text-left text-lg leading-relaxed text-foreground">
                <p>Dear Parent,</p>

                <p>
                  Thank you for enrolling your child. We sincerely appreciate your partnership as we embark on this
                  educational journey together.
                </p>

                <p className="font-semibold">
                  Regards,
                  <br />
                  Wisdom Learnscape
                </p>
              </div>

              <div className="mt-12 space-y-4">
                <p className="text-lg font-semibold text-foreground">A confirmation has been sent via:</p>
                <div className="flex flex-wrap justify-center gap-4 text-base">
                  <span className="rounded-full bg-primary/10 px-6 py-2 font-medium text-primary">Email</span>
                  <span className="rounded-full bg-primary/10 px-6 py-2 font-medium text-primary">SMS</span>
                  <span className="rounded-full bg-primary/10 px-6 py-2 font-medium text-primary">WhatsApp</span>
                </div>
              </div>

              <div className="mt-12">
                <Link href="/">
                  <Button size="lg" variant="outline" className="text-lg bg-transparent">
                    Return to Homepage
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </>
  )
}
