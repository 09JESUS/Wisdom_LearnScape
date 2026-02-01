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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CreateGroupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    subject: "",
    grade: "",
    planId: "",
    tutorId: "",
    groupName: "",
  })

  // Mock data - replace with actual database queries
  const subjects = ["Mathematics", "Physical Sciences", "Life Sciences", "English", "Afrikaans"]
  const grades = [10, 11, 12]
  const plans = [
    { id: 1, name: "Standard", maxMembers: 20 },
    { id: 2, name: "Premium", maxMembers: 10 },
    { id: 3, name: "Personalized", maxMembers: 1 },
  ]
  const tutors = [
    { id: 1, name: "David Le Roux", subjects: ["Mathematics"] },
    { id: 2, name: "Sarah Ndlovu", subjects: ["Physical Sciences"] },
    { id: 3, name: "Phumi Nkosi", subjects: ["Mathematics", "Physical Sciences"] },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Creating group:", formData)
    // Here you would insert into learning_groups table
    router.push("/dashboard/admin/groups")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link
            href="/dashboard/admin/groups"
            className="inline-flex items-center gap-2 text-lg text-primary hover:underline mb-6"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Groups
          </Link>

          <h1 className="mb-12 text-5xl font-bold text-secondary md:text-6xl">Create New Group</h1>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-3xl">Group Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="groupName" className="text-xl">
                    Group Name
                  </Label>
                  <Input
                    id="groupName"
                    placeholder="e.g., Mathematics Grade 12 - Premium Group B"
                    value={formData.groupName}
                    onChange={(e) => setFormData({ ...formData, groupName: e.target.value })}
                    className="mt-2 text-lg h-12"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="subject" className="text-xl">
                    Subject
                  </Label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) => setFormData({ ...formData, subject: value })}
                  >
                    <SelectTrigger className="mt-2 text-lg h-12">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject} className="text-lg">
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="grade" className="text-xl">
                    Grade
                  </Label>
                  <Select value={formData.grade} onValueChange={(value) => setFormData({ ...formData, grade: value })}>
                    <SelectTrigger className="mt-2 text-lg h-12">
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {grades.map((grade) => (
                        <SelectItem key={grade} value={grade.toString()} className="text-lg">
                          Grade {grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="plan" className="text-xl">
                    Subscription Plan
                  </Label>
                  <Select
                    value={formData.planId}
                    onValueChange={(value) => setFormData({ ...formData, planId: value })}
                  >
                    <SelectTrigger className="mt-2 text-lg h-12">
                      <SelectValue placeholder="Select plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {plans.map((plan) => (
                        <SelectItem key={plan.id} value={plan.id.toString()} className="text-lg">
                          {plan.name} (Max {plan.maxMembers} members)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="tutor" className="text-xl">
                    Assign Tutor
                  </Label>
                  <Select
                    value={formData.tutorId}
                    onValueChange={(value) => setFormData({ ...formData, tutorId: value })}
                  >
                    <SelectTrigger className="mt-2 text-lg h-12">
                      <SelectValue placeholder="Select tutor" />
                    </SelectTrigger>
                    <SelectContent>
                      {tutors.map((tutor) => (
                        <SelectItem key={tutor.id} value={tutor.id.toString()} className="text-lg">
                          {tutor.name} - {tutor.subjects.join(", ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-4 pt-6">
                  <Button type="submit" size="lg" className="flex-1 text-lg">
                    Create Group
                  </Button>
                  <Link href="/dashboard/admin/groups" className="flex-1">
                    <Button type="button" variant="outline" size="lg" className="w-full text-lg bg-transparent">
                      Cancel
                    </Button>
                  </Link>
                </div>
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
