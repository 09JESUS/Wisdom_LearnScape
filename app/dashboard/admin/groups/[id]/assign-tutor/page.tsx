"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsappButton } from "@/components/whatsapp-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

export default function AssignTutorPage() {
  const params = useParams()
  const router = useRouter()
  const [selectedTutor, setSelectedTutor] = useState("")

  // Mock data - replace with actual database query
  const group = {
    id: params.id,
    name: "Mathematics Grade 12 - Premium Group A",
    subject: "Mathematics",
    grade: 12,
    currentTutor: "None assigned",
  }

  const tutors = [
    { id: 1, name: "David Le Roux", subjects: ["Mathematics"], experience: "10 years" },
    { id: 2, name: "Sarah Ndlovu", subjects: ["Physical Sciences", "Mathematics"], experience: "8 years" },
    { id: 3, name: "Phumi Nkosi", subjects: ["Mathematics", "Life Sciences"], experience: "5 years" },
  ]

  const handleAssign = () => {
    console.log("[v0] Assigning tutor:", selectedTutor, "to group:", params.id)

    // In production, execute:
    // UPDATE learning_groups SET tutor_id = ? WHERE id = ?

    // Send notifications to all group members
    // INSERT INTO notifications (user_id, type, title, message, link)
    // SELECT learner_id, 'announcement', 'New Tutor Assigned', ?, ?
    // FROM group_members WHERE group_id = ?

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

          <h1 className="mb-12 text-5xl font-bold text-secondary md:text-6xl">Assign Tutor</h1>

          <Card className="border-2 mb-6">
            <CardHeader>
              <CardTitle className="text-3xl">Group Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-lg text-muted-foreground">Group Name</p>
                <p className="text-2xl font-semibold">{group.name}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-lg text-muted-foreground">Subject</p>
                  <p className="text-xl font-semibold">{group.subject}</p>
                </div>
                <div>
                  <p className="text-lg text-muted-foreground">Grade</p>
                  <p className="text-xl font-semibold">Grade {group.grade}</p>
                </div>
              </div>
              <div>
                <p className="text-lg text-muted-foreground">Current Tutor</p>
                <p className="text-xl font-semibold">{group.currentTutor}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-3xl">Select Tutor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="tutor" className="text-xl">
                    Available Tutors
                  </Label>
                  <Select value={selectedTutor} onValueChange={setSelectedTutor}>
                    <SelectTrigger className="mt-2 text-lg h-12">
                      <SelectValue placeholder="Select a tutor" />
                    </SelectTrigger>
                    <SelectContent>
                      {tutors
                        .filter((tutor) => tutor.subjects.includes(group.subject))
                        .map((tutor) => (
                          <SelectItem key={tutor.id} value={tutor.id.toString()} className="text-lg">
                            <div className="flex flex-col py-2">
                              <span className="font-semibold">{tutor.name}</span>
                              <span className="text-sm text-muted-foreground">
                                {tutor.subjects.join(", ")} • {tutor.experience}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground mt-2">
                    Only tutors qualified to teach {group.subject} are shown
                  </p>
                </div>

                <div className="flex gap-4 pt-6">
                  <Button onClick={handleAssign} size="lg" className="flex-1 text-lg" disabled={!selectedTutor}>
                    Assign Tutor
                  </Button>
                  <Link href="/dashboard/admin/groups" className="flex-1">
                    <Button type="button" variant="outline" size="lg" className="w-full text-lg bg-transparent">
                      Cancel
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
      <WhatsappButton />
    </div>
  )
}
