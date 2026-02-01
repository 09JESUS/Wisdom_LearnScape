"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsappButton } from "@/components/whatsapp-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail } from "lucide-react"
import Link from "next/link"

// Mock data - in real implementation, this would be fetched based on logged-in tutor
const mockStudents = [
  {
    id: 1,
    name: "John Smith",
    grade: 12,
    subject: "Mathematics",
    email: "john.smith@example.com",
    phone: "+27 82 123 4567",
    attendance: "92%",
    lastSession: "2025-01-02",
  },
  {
    id: 2,
    name: "Mary Johnson",
    grade: 12,
    subject: "Mathematics",
    email: "mary.johnson@example.com",
    phone: "+27 82 234 5678",
    attendance: "88%",
    lastSession: "2025-01-02",
  },
  {
    id: 3,
    name: "Peter Williams",
    grade: 11,
    subject: "Mathematics",
    email: "peter.williams@example.com",
    phone: "+27 82 345 6789",
    attendance: "95%",
    lastSession: "2025-01-03",
  },
]

export default function TutorStudentsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <Link
            href="/dashboard/tutor"
            className="inline-flex items-center gap-2 text-lg text-primary hover:underline mb-6"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Tutor Dashboard
          </Link>

          <h1 className="mb-12 text-5xl font-bold text-secondary md:text-6xl">My Students</h1>

          <div className="grid gap-6">
            {mockStudents.map((student) => (
              <Card key={student.id} className="border-2">
                <CardHeader>
                  <CardTitle className="text-3xl">{student.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-5 gap-6">
                    <div>
                      <p className="text-lg text-muted-foreground mb-1">Grade</p>
                      <p className="text-xl font-semibold">Grade {student.grade}</p>
                    </div>
                    <div>
                      <p className="text-lg text-muted-foreground mb-1">Subject</p>
                      <p className="text-xl font-semibold">{student.subject}</p>
                    </div>
                    <div>
                      <p className="text-lg text-muted-foreground mb-1">Attendance</p>
                      <p className="text-xl font-semibold text-primary">{student.attendance}</p>
                    </div>
                    <div>
                      <p className="text-lg text-muted-foreground mb-1">Last Session</p>
                      <p className="text-xl font-semibold">{student.lastSession}</p>
                    </div>
                    <div className="flex items-end gap-2">
                      <Button variant="outline" size="sm" className="text-lg bg-transparent">
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Button>
                      <Link href={`/dashboard/tutor/students/${student.id}`}>
                        <Button className="text-lg">View Profile</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsappButton />
    </div>
  )
}
