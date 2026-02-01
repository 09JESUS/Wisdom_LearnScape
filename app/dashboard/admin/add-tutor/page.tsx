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
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AddTutorPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    bio: "",
    hourlyRate: "",
    subjects: "",
    experienceYears: "",
    qualifications: "",
    availableHours: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In real implementation, this would call your API
    console.log("[v0] Tutor data to be saved:", formData)
    alert("Tutor added successfully! Credentials sent to " + formData.email)
    router.push("/dashboard/admin")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/dashboard/admin"
            className="inline-flex items-center gap-2 text-lg text-primary hover:underline mb-6"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Admin Dashboard
          </Link>

          <h1 className="mb-12 text-5xl font-bold text-secondary md:text-6xl">Add New Tutor</h1>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-3xl">Tutor Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-lg">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                      className="text-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-lg">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                      className="text-lg"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-lg">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-lg">
                    Initial Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                    className="text-lg"
                    placeholder="Tutor will be asked to change on first login"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subjects" className="text-lg">
                    Subjects (comma-separated)
                  </Label>
                  <Input
                    id="subjects"
                    value={formData.subjects}
                    onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
                    placeholder="e.g., Mathematics, Physical Sciences, Life Sciences"
                    required
                    className="text-lg"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="hourlyRate" className="text-lg">
                      Hourly Rate (ZAR)
                    </Label>
                    <Input
                      id="hourlyRate"
                      type="number"
                      value={formData.hourlyRate}
                      onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                      required
                      className="text-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experienceYears" className="text-lg">
                      Years of Experience
                    </Label>
                    <Input
                      id="experienceYears"
                      type="number"
                      value={formData.experienceYears}
                      onChange={(e) => setFormData({ ...formData, experienceYears: e.target.value })}
                      required
                      className="text-lg"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="qualifications" className="text-lg">
                    Qualifications
                  </Label>
                  <Textarea
                    id="qualifications"
                    value={formData.qualifications}
                    onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                    rows={3}
                    required
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio" className="text-lg">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={4}
                    required
                    className="text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="availableHours" className="text-lg">
                    Available Hours
                  </Label>
                  <Textarea
                    id="availableHours"
                    value={formData.availableHours}
                    onChange={(e) => setFormData({ ...formData, availableHours: e.target.value })}
                    placeholder="e.g., Monday and Wednesday: 3:00 PM - 6:00 PM"
                    rows={3}
                    required
                    className="text-lg"
                  />
                </div>

                <Button type="submit" className="w-full text-xl py-6">
                  Add Tutor to System
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
      <WhatsappButton />
    </div>
  )
}
