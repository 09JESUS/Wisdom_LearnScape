"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsappButton } from "@/components/whatsapp-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, MessageSquare, Video, BookOpen, Calendar } from "lucide-react"
import Link from "next/link"

export default function TutorGroupsPage() {
  // Mock data - will be fetched from database
  const groups = [
    {
      id: 1,
      name: "Mathematics Grade 12 - Premium Group A",
      subject: "Mathematics",
      grade: 12,
      planName: "Premium",
      memberCount: 8,
      maxMembers: 10,
      unreadMessages: 5,
      nextSession: "Today, 10:00 AM",
    },
    {
      id: 2,
      name: "Physical Sciences Grade 12 - Standard Group A",
      subject: "Physical Sciences",
      grade: 12,
      planName: "Standard",
      memberCount: 18,
      maxMembers: 20,
      unreadMessages: 0,
      nextSession: "Tomorrow, 14:00 PM",
    },
    {
      id: 3,
      name: "John Smith - Personalized Session",
      subject: "Mathematics",
      grade: 12,
      planName: "Personalized",
      memberCount: 1,
      maxMembers: 1,
      unreadMessages: 2,
      nextSession: "Today, 16:00 PM",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h1 className="mb-4 text-5xl font-bold text-secondary md:text-6xl">My Teaching Groups</h1>
            <p className="text-xl text-muted-foreground">Manage your students and group sessions</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {groups.map((group) => (
              <Card key={group.id} className="border-2">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge className="text-base">{group.planName} Plan</Badge>
                    {group.unreadMessages > 0 && (
                      <Badge variant="destructive" className="text-base">
                        {group.unreadMessages} new
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-2xl">{group.name}</CardTitle>
                  <p className="text-lg text-muted-foreground">
                    {group.subject} • Grade {group.grade}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Group Stats */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" />
                        <span className="text-base font-medium">Students</span>
                      </div>
                      <span className="text-base font-semibold">
                        {group.memberCount}/{group.maxMembers}
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-primary" />
                        <span className="text-base font-medium">Next Session</span>
                      </div>
                      <span className="text-base font-semibold">{group.nextSession}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <Link href={`/dashboard/tutor/groups/${group.id}/chat`}>
                      <Button className="w-full text-base" size="lg">
                        <MessageSquare className="mr-2 h-5 w-5" />
                        Group Chat
                      </Button>
                    </Link>

                    <div className="grid grid-cols-2 gap-2">
                      <Link href={`/dashboard/tutor/groups/${group.id}/members`}>
                        <Button variant="outline" className="w-full text-base bg-transparent" size="lg">
                          <Users className="mr-2 h-5 w-5" />
                          Members
                        </Button>
                      </Link>
                      <Link href={`/dashboard/tutor/groups/${group.id}/sessions`}>
                        <Button variant="outline" className="w-full text-base bg-transparent" size="lg">
                          <Video className="mr-2 h-5 w-5" />
                          Sessions
                        </Button>
                      </Link>
                    </div>

                    <Link href={`/dashboard/tutor/groups/${group.id}/resources`}>
                      <Button variant="secondary" className="w-full text-base" size="lg">
                        <BookOpen className="mr-2 h-5 w-5" />
                        Share Resources
                      </Button>
                    </Link>
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
