"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsappButton } from "@/components/whatsapp-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock, Mail, Phone, FileText } from "lucide-react"
import Link from "next/link"

export default function ApplicationsPage() {
  // Mock data - replace with real database queries
  const applications = [
    {
      id: 1,
      name: "Thandiwe Mkhize",
      email: "thandiwe@example.com",
      phone: "0823334455",
      subject: "Mathematics",
      experience: "5 years",
      qualifications: "BSc Mathematics Education",
      status: "Pending",
      date: "2025-01-02",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael@example.com",
      phone: "0817778899",
      subject: "Physical Sciences",
      experience: "3 years",
      qualifications: "BSc Physics, PGCE",
      status: "Pending",
      date: "2025-01-01",
    },
    {
      id: 3,
      name: "Lerato Dlamini",
      email: "lerato@example.com",
      phone: "0841112233",
      subject: "Life Sciences",
      experience: "7 years",
      qualifications: "MSc Biology, Teaching Diploma",
      status: "Approved",
      date: "2024-12-30",
    },
  ]

  const handleApprove = (id: number) => {
    // Implement approval logic
    alert(`Application ${id} approved! Redirect to Add Tutor page to complete setup.`)
  }

  const handleReject = (id: number) => {
    // Implement rejection logic
    alert(`Application ${id} rejected.`)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-5xl font-bold text-secondary md:text-6xl">Tutor Applications</h1>
            <Link href="/dashboard/admin">
              <Button variant="outline" className="text-lg bg-transparent">
                Back to Dashboard
              </Button>
            </Link>
          </div>

          <div className="grid gap-6">
            {applications.map((app) => (
              <Card key={app.id} className="border-2 transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl">{app.name}</CardTitle>
                      <div className="mt-2">
                        <Badge
                          variant={
                            app.status === "Pending" ? "outline" : app.status === "Approved" ? "default" : "destructive"
                          }
                          className="text-sm"
                        >
                          <Clock className="mr-1 h-3 w-3" />
                          {app.status}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">Applied: {app.date}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-primary" />
                      <span className="text-lg">{app.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-primary" />
                      <span className="text-lg">{app.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-primary" />
                      <span className="text-lg">
                        <span className="font-semibold">Subject:</span> {app.subject}
                      </span>
                    </div>
                    <div className="text-lg">
                      <span className="font-semibold">Experience:</span> {app.experience}
                    </div>
                    <div className="text-lg">
                      <span className="font-semibold">Qualifications:</span> {app.qualifications}
                    </div>
                  </div>

                  {app.status === "Pending" && (
                    <div className="flex gap-4">
                      <Button className="flex-1 text-lg" onClick={() => handleApprove(app.id)}>
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Approve
                      </Button>
                      <Button variant="destructive" className="flex-1 text-lg" onClick={() => handleReject(app.id)}>
                        <XCircle className="mr-2 h-5 w-5" />
                        Reject
                      </Button>
                    </div>
                  )}
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
