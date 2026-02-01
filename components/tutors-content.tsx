"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsappButton } from "@/components/whatsapp-button"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

const tutors = [
  {
    id: 1,
    name: "Jane Doe",
    subject: "Mathematics",
    bio: "I am passionate about helping students succeed and pursuing a career in education. My aim is to provide supportive and personalized tutoring for each student.",
    availability: "Monday and Wednesday: 3:00 PM - 6:00 PM",
    price: 100,
    image: "/professional-female-tutor.png",
  },
  {
    id: 2,
    name: "David Smith",
    subject: "Mathematics",
    bio: "Teaching is more than a job for me, it's a calling. My goal is to inspire students to love science and to think critically about the world.",
    availability: "Tuesday and Thursday: 4:00 PM - 7:00 PM",
    price: 100,
    image: "/professional-male-tutor.png",
  },
  {
    id: 3,
    name: "Sarah Johnson",
    subject: "Science",
    bio: "Education has the power to uplift and transform. I am dedicated to providing my students with the tools and encouragement they need to reach their full potential.",
    availability: "Monday and Friday: 2:00 PM - 5:00 PM",
    price: 100,
    image: "/professional-tutor-smiling.jpg",
  },
]

export function TutorsContent() {
  const searchParams = useSearchParams()
  const subject = searchParams.get("subject") || ""

  const filteredTutors = subject ? tutors.filter((t) => t.subject.toLowerCase() === subject.toLowerCase()) : tutors

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-6xl">
            <h1 className="mb-12 text-center text-5xl font-bold text-secondary md:text-6xl">
              Available Tutors - {subject ? subject.charAt(0).toUpperCase() + subject.slice(1) : "All Subjects"}
            </h1>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredTutors.map((tutor) => (
                <Card key={tutor.id} className="overflow-hidden border-2 transition-shadow hover:shadow-lg">
                  <CardContent className="p-0">
                    <div className="relative h-64">
                      <Image src={tutor.image || "/placeholder.svg"} alt={tutor.name} fill className="object-cover" />
                      <div className="absolute right-4 top-4 rounded-lg bg-primary px-4 py-2 text-white">
                        <div className="text-2xl font-bold">R{tutor.price}</div>
                        <div className="text-sm">per session</div>
                        <div className="text-xs">(1h30 session)</div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="mb-2 text-2xl font-bold text-secondary">{tutor.name}</h3>
                      <p className="mb-4 text-lg leading-relaxed text-muted-foreground">{tutor.bio}</p>
                      <div className="mb-6">
                        <p className="font-semibold text-lg text-secondary">Available hours:</p>
                        <p className="text-lg text-muted-foreground">{tutor.availability}</p>
                      </div>
                      <Link href={`/booking?tutor=${tutor.id}&name=${encodeURIComponent(tutor.name)}`}>
                        <Button className="w-full text-lg" size="lg">
                          Booking & Payment
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsappButton />
    </div>
  )
}
