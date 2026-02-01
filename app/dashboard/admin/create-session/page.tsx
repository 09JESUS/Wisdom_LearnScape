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
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Mock data
const mockTutors = [
  { id: 1, name: "David Le Roux", subjects: ["Mathematics"] },
  { id: 2, name: "Sarah Ndlovu", subjects: ["Mathematics", "Physical Sciences"] },
  { id: 3, name: "Phumi Nkosi", subjects: ["Life Sciences", "Physical Sciences"] },
]

const mockLearners = [
  { id: 1, name: "John Smith", grade: 12 },
  { id: 2, name: "Mary Johnson", grade: 12 },
  { id: 3, name: "Peter Williams", grade: 11 },
]

export default function CreateSessionPage() {
  const router = useRouter()
  const [sessionData, setSessionData] = useState({
    tutorId: "",
    learnerIds: [] as string[],
    subject: "",
    topic: "",
    date: "",
    time: "",
    duration: "60",
    notes: "",
  })

  const selectedTutor = mockTutors.find((t) => t.id.toString() === sessionData.tutorId)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Session data to be created:", sessionData)
    alert(`Session created successfully! ${sessionData.learnerIds.length} students assigned.`)
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

          <h1 className="mb-12 text-5xl font-bold text-secondary md:text-6xl">Create Tutor Session</h1>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-3xl">Session Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="tutor" className="text-lg">
                    Select Tutor
                  </Label>
                  <Select
                    value={sessionData.tutorId}
                    onValueChange={(value) => setSessionData({ ...sessionData, tutorId: value, subject: "" })}
                  >
                    <SelectTrigger className="text-lg">
                      <SelectValue placeholder="Choose a tutor" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockTutors.map((tutor) => (
                        <SelectItem key={tutor.id} value={tutor.id.toString()} className="text-lg">
                          {tutor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedTutor && (
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-lg">
                      Select Subject
                    </Label>
                    <Select
                      value={sessionData.subject}
                      onValueChange={(value) => setSessionData({ ...sessionData, subject: value })}
                    >
                      <SelectTrigger className="text-lg">
                        <SelectValue placeholder="Choose a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedTutor.subjects.map((subject) => (
                          <SelectItem key={subject} value={subject} className="text-lg">
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label className="text-lg">Assign Learners (select multiple)</Label>
                  <div className="border-2 rounded-lg p-4 space-y-2 max-h-60 overflow-y-auto">
                    {mockLearners.map((learner) => (
                      <label
                        key={learner.id}
                        className="flex items-center gap-3 cursor-pointer hover:bg-accent p-2 rounded"
                      >
                        <input
                          type="checkbox"
                          checked={sessionData.learnerIds.includes(learner.id.toString())}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSessionData({
                                ...sessionData,
                                learnerIds: [...sessionData.learnerIds, learner.id.toString()],
                              })
                            } else {
                              setSessionData({
                                ...sessionData,
                                learnerIds: sessionData.learnerIds.filter((id) => id !== learner.id.toString()),
                              })
                            }
                          }}
                          className="h-5 w-5"
                        />
                        <span className="text-lg">
                          {learner.name} (Grade {learner.grade})
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="topic" className="text-lg">
                    Topic
                  </Label>
                  <Input
                    id="topic"
                    value={sessionData.topic}
                    onChange={(e) => setSessionData({ ...sessionData, topic: e.target.value })}
                    placeholder="e.g., Algebra Basics, Calculus"
                    required
                    className="text-lg"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-lg">
                      Date
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={sessionData.date}
                      onChange={(e) => setSessionData({ ...sessionData, date: e.target.value })}
                      required
                      className="text-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time" className="text-lg">
                      Time
                    </Label>
                    <Input
                      id="time"
                      type="time"
                      value={sessionData.time}
                      onChange={(e) => setSessionData({ ...sessionData, time: e.target.value })}
                      required
                      className="text-lg"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration" className="text-lg">
                      Duration (min)
                    </Label>
                    <Input
                      id="duration"
                      type="number"
                      value={sessionData.duration}
                      onChange={(e) => setSessionData({ ...sessionData, duration: e.target.value })}
                      required
                      className="text-lg"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-lg">
                    Session Notes (Optional)
                  </Label>
                  <Textarea
                    id="notes"
                    value={sessionData.notes}
                    onChange={(e) => setSessionData({ ...sessionData, notes: e.target.value })}
                    rows={4}
                    className="text-lg"
                  />
                </div>

                <Button type="submit" disabled={sessionData.learnerIds.length === 0} className="w-full text-xl py-6">
                  Create Session
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
