"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsappButton } from "@/components/whatsapp-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Users, MessageSquare, Video, BookOpen } from "lucide-react"
import Link from "next/link"

export default function LearnerGroupsPage() {
  // Mock data - will be fetched from database
  const groups = [
    {
      id: 1,
      name: "Mathematics Grade 12 - Premium Group A",
      subject: "Mathematics",
      grade: 12,
      planName: "Premium",
      planType: "premium",
      price: "R765",
      tutorName: "David Le Roux",
      tutorImage: "/images/screenshot-29-12-2025-91246.jpeg",
      memberCount: 8,
      maxMembers: 10,
      sessionsPerWeek: 2,
      unreadMessages: 3,
      features: ["2 weekly group sessions", "Full notes & resources", "Tutor-marked tests"],
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h1 className="mb-4 text-5xl font-bold text-secondary md:text-6xl">My Learning Groups</h1>
            <p className="text-xl text-muted-foreground">Connect with your tutors and fellow learners</p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {groups.map((group) => (
              <Card key={group.id} className="border-2">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl mb-2">{group.name}</CardTitle>
                      <div className="flex gap-2 items-center">
                        <Badge className="text-base">{group.planName} Plan</Badge>
                        <span className="text-lg font-semibold text-primary">{group.price}/month</span>
                      </div>
                    </div>
                    {group.unreadMessages > 0 && (
                      <Badge variant="destructive" className="text-base">
                        {group.unreadMessages} new
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Tutor Info */}
                  <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={group.tutorImage || "/placeholder.svg"} />
                      <AvatarFallback>TU</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-lg font-semibold">Tutor: {group.tutorName}</p>
                      <p className="text-base text-muted-foreground">{group.subject} Specialist</p>
                    </div>
                  </div>

                  {/* Plan Features */}
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-base font-semibold mb-2">Your Plan Benefits:</p>
                    <ul className="space-y-1">
                      {group.features.map((feature, idx) => (
                        <li key={idx} className="text-base text-muted-foreground">
                          ✓ {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Group Stats */}
                  <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <span className="text-lg">
                        {group.planType === "personalized"
                          ? "1-on-1 Session"
                          : `${group.memberCount}/${group.maxMembers} Members`}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3">
                    <Link href={`/dashboard/learner/groups/${group.id}/chat`}>
                      <Button className="w-full text-base" size="lg">
                        <MessageSquare className="mr-2 h-5 w-5" />
                        Group Chat
                      </Button>
                    </Link>
                    <Link href={`/dashboard/learner/groups/${group.id}/sessions`}>
                      <Button variant="outline" className="w-full text-base bg-transparent" size="lg">
                        <Video className="mr-2 h-5 w-5" />
                        Sessions
                      </Button>
                    </Link>
                  </div>

                  <Link href={`/dashboard/learner/groups/${group.id}/resources`}>
                    <Button variant="secondary" className="w-full text-base" size="lg">
                      <BookOpen className="mr-2 h-5 w-5" />
                      Group Resources
                    </Button>
                  </Link>
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
