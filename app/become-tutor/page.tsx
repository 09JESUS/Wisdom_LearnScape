"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsappButton } from "@/components/whatsapp-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"

export default function BecomeTutorPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subjects: "",
    qualifications: "",
    experience: "",
    availability: "",
    motivation: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In production, this would send data to backend
    alert("Application submitted successfully! We will review your application and contact you soon.")
    router.push("/")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <h1 className="mb-6 text-center text-5xl font-bold text-secondary md:text-6xl">Become a Tutor</h1>
            <p className="mb-12 text-center text-xl text-muted-foreground">
              Join our team of dedicated educators and make a difference in students' lives
            </p>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-3xl">Tutor Application Form</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="fullName" className="text-lg">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Smith"
                      className="mt-2 text-lg h-12"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-lg">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john.smith@example.com"
                      className="mt-2 text-lg h-12"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-lg">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+27 12 345 6789"
                      className="mt-2 text-lg h-12"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="subjects" className="text-lg">
                      Subjects You Can Teach
                    </Label>
                    <Input
                      id="subjects"
                      name="subjects"
                      value={formData.subjects}
                      onChange={handleChange}
                      placeholder="e.g., Mathematics, Physical Sciences"
                      className="mt-2 text-lg h-12"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="qualifications" className="text-lg">
                      Qualifications
                    </Label>
                    <Textarea
                      id="qualifications"
                      name="qualifications"
                      value={formData.qualifications}
                      onChange={handleChange}
                      placeholder="List your degrees, certifications, and relevant qualifications"
                      className="mt-2 text-lg min-h-24"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="experience" className="text-lg">
                      Teaching Experience
                    </Label>
                    <Textarea
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="Describe your teaching experience"
                      className="mt-2 text-lg min-h-24"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="availability" className="text-lg">
                      Availability
                    </Label>
                    <Input
                      id="availability"
                      name="availability"
                      value={formData.availability}
                      onChange={handleChange}
                      placeholder="e.g., Monday and Wednesday: 3:00 PM - 6:00 PM"
                      className="mt-2 text-lg h-12"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="motivation" className="text-lg">
                      Why do you want to become a tutor at Wisdom Learnscape?
                    </Label>
                    <Textarea
                      id="motivation"
                      name="motivation"
                      value={formData.motivation}
                      onChange={handleChange}
                      placeholder="Share your motivation and teaching philosophy"
                      className="mt-2 text-lg min-h-32"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full text-lg" size="lg">
                    Submit Application
                  </Button>
                </form>
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
