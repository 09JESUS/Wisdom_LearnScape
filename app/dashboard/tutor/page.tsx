"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsappButton } from "@/components/whatsapp-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Calendar, FileText, Settings, BookOpen, MessageSquare } from "lucide-react"
import Link from "next/link"

export default function TutorDashboard() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <h1 className="mb-12 text-5xl font-bold text-secondary md:text-6xl">Tutor Dashboard</h1>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-2 transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Users className="h-8 w-8 text-primary" />
                  My Students
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground mb-4">Manage your assigned students</p>
                <Link href="/dashboard/tutor/students">
                  <Button className="w-full text-lg">View Students</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Calendar className="h-8 w-8 text-primary" />
                  Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground mb-4">View and manage sessions</p>
                <Link href="/dashboard/tutor/schedule">
                  <Button className="w-full text-lg">View Schedule</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <BookOpen className="h-8 w-8 text-primary" />
                  My Subjects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground mb-4">View subjects you teach</p>
                <Link href="/dashboard/tutor/subjects">
                  <Button className="w-full text-lg">View Subjects</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <FileText className="h-8 w-8 text-primary" />
                  Materials
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground mb-4">Upload teaching materials</p>
                <Link href="/dashboard/tutor/materials">
                  <Button className="w-full text-lg">Manage Materials</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <MessageSquare className="h-8 w-8 text-primary" />
                  Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground mb-4">Chat with students and parents</p>
                <Link href="/dashboard/tutor/messages">
                  <Button className="w-full text-lg">View Messages</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Settings className="h-8 w-8 text-primary" />
                  Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-muted-foreground mb-4">Update your availability</p>
                <Link href="/dashboard/tutor/settings">
                  <Button className="w-full text-lg">Settings</Button>
                </Link>
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
