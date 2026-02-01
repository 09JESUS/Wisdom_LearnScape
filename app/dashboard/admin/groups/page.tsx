"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsappButton } from "@/components/whatsapp-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Users, Plus } from "lucide-react"
import Link from "next/link"

// Mock data - replace with actual database queries
const mockGroups = [
  {
    id: 1,
    subject: "Mathematics",
    grade: 12,
    tutor: "David Le Roux",
    tutorId: 1,
    studentCount: 15,
    maxMembers: 20,
    plan: "Standard",
    planType: "standard",
    price: "R415",
  },
  {
    id: 2,
    subject: "Physical Sciences",
    grade: 12,
    tutor: "Sarah Ndlovu",
    tutorId: 2,
    studentCount: 8,
    maxMembers: 10,
    plan: "Premium",
    planType: "premium",
    price: "R765",
  },
  {
    id: 3,
    subject: "Mathematics",
    grade: 12,
    tutor: "Phumi Nkosi",
    tutorId: 3,
    studentCount: 1,
    maxMembers: 1,
    plan: "Personalized",
    planType: "personalized",
    price: "R1450",
  },
  {
    id: 4,
    subject: "Physical Sciences",
    grade: 11,
    tutor: "David Le Roux",
    tutorId: 1,
    studentCount: 18,
    maxMembers: 20,
    plan: "Standard",
    planType: "standard",
    price: "R415",
  },
]

export default function ManageGroupsPage() {
  const [groups] = useState(mockGroups)
  const standardGroups = groups.filter((g) => g.planType === "standard")
  const premiumGroups = groups.filter((g) => g.planType === "premium")
  const personalizedGroups = groups.filter((g) => g.planType === "personalized")

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <Link
            href="/dashboard/admin"
            className="inline-flex items-center gap-2 text-lg text-primary hover:underline mb-6"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Admin Dashboard
          </Link>

          <div className="flex justify-between items-center mb-12">
            <h1 className="text-5xl font-bold text-secondary md:text-6xl">Manage Groups</h1>
            <Link href="/dashboard/admin/groups/create">
              <Button className="text-xl">
                <Plus className="h-5 w-5 mr-2" />
                Create New Group
              </Button>
            </Link>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-primary mb-6">Standard Plan Groups (R415/month)</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Up to 20 learners per group • 1 weekly session • Basic resources
            </p>
            <div className="grid gap-6">
              {standardGroups.map((group) => (
                <Card key={group.id} className="border-2 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-3xl flex items-center justify-between">
                      <span>
                        {group.subject} - Grade {group.grade}
                      </span>
                      <span className="text-2xl text-primary">{group.price}/month</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-6">
                      <div>
                        <p className="text-lg text-muted-foreground mb-1">Tutor</p>
                        <p className="text-xl font-semibold">{group.tutor}</p>
                      </div>
                      <div>
                        <p className="text-lg text-muted-foreground mb-1">Students</p>
                        <p className="text-xl font-semibold flex items-center gap-2">
                          <Users className="h-5 w-5" />
                          {group.studentCount}/{group.maxMembers}
                        </p>
                      </div>
                      <div>
                        <p className="text-lg text-muted-foreground mb-1">Plan Type</p>
                        <p className="text-xl font-semibold">{group.plan}</p>
                      </div>
                      <div className="flex items-end gap-2">
                        <Link href={`/dashboard/admin/groups/${group.id}/students`}>
                          <Button variant="outline" className="text-lg bg-transparent">
                            View Students
                          </Button>
                        </Link>
                        <Link href={`/dashboard/admin/groups/${group.id}/assign-tutor`}>
                          <Button variant="outline" className="text-lg bg-transparent">
                            Assign Tutor
                          </Button>
                        </Link>
                        <Link href={`/dashboard/admin/groups/${group.id}/chat`}>
                          <Button className="text-lg">Group Chat</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-accent mb-6">Premium Plan Groups (R765/month)</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Up to 10 learners per group • 2 weekly sessions • Full resources & tutor-marked tests
            </p>
            <div className="grid gap-6">
              {premiumGroups.map((group) => (
                <Card key={group.id} className="border-2 border-accent/20">
                  <CardHeader>
                    <CardTitle className="text-3xl flex items-center justify-between">
                      <span>
                        {group.subject} - Grade {group.grade}
                      </span>
                      <span className="text-2xl text-accent">{group.price}/month</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-6">
                      <div>
                        <p className="text-lg text-muted-foreground mb-1">Tutor</p>
                        <p className="text-xl font-semibold">{group.tutor}</p>
                      </div>
                      <div>
                        <p className="text-lg text-muted-foreground mb-1">Students</p>
                        <p className="text-xl font-semibold flex items-center gap-2">
                          <Users className="h-5 w-5" />
                          {group.studentCount}/{group.maxMembers}
                        </p>
                      </div>
                      <div>
                        <p className="text-lg text-muted-foreground mb-1">Plan Type</p>
                        <p className="text-xl font-semibold">{group.plan}</p>
                      </div>
                      <div className="flex items-end gap-2">
                        <Link href={`/dashboard/admin/groups/${group.id}/students`}>
                          <Button variant="outline" className="text-lg bg-transparent">
                            View Students
                          </Button>
                        </Link>
                        <Link href={`/dashboard/admin/groups/${group.id}/assign-tutor`}>
                          <Button variant="outline" className="text-lg bg-transparent">
                            Assign Tutor
                          </Button>
                        </Link>
                        <Link href={`/dashboard/admin/groups/${group.id}/chat`}>
                          <Button className="text-lg">Group Chat</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-secondary mb-6">Personalized Plan Groups (R1450/month)</h2>
            <p className="text-lg text-muted-foreground mb-6">
              1-on-1 dedicated sessions • Custom learning plans • Personal academic manager
            </p>
            <div className="grid gap-6">
              {personalizedGroups.map((group) => (
                <Card key={group.id} className="border-2 border-secondary/20">
                  <CardHeader>
                    <CardTitle className="text-3xl flex items-center justify-between">
                      <span>
                        {group.subject} - Grade {group.grade}
                      </span>
                      <span className="text-2xl text-secondary">{group.price}/month</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-4 gap-6">
                      <div>
                        <p className="text-lg text-muted-foreground mb-1">Tutor</p>
                        <p className="text-xl font-semibold">{group.tutor}</p>
                      </div>
                      <div>
                        <p className="text-lg text-muted-foreground mb-1">Learner</p>
                        <p className="text-xl font-semibold flex items-center gap-2">
                          <Users className="h-5 w-5" />
                          1-on-1 Session
                        </p>
                      </div>
                      <div>
                        <p className="text-lg text-muted-foreground mb-1">Plan Type</p>
                        <p className="text-xl font-semibold">{group.plan}</p>
                      </div>
                      <div className="flex items-end gap-2">
                        <Link href={`/dashboard/admin/groups/${group.id}/students`}>
                          <Button variant="outline" className="text-lg bg-transparent">
                            View Learner
                          </Button>
                        </Link>
                        <Link href={`/dashboard/admin/groups/${group.id}/assign-tutor`}>
                          <Button variant="outline" className="text-lg bg-transparent">
                            Assign Tutor
                          </Button>
                        </Link>
                        <Link href={`/dashboard/admin/groups/${group.id}/chat`}>
                          <Button className="text-lg">Private Chat</Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsappButton />
    </div>
  )
}
