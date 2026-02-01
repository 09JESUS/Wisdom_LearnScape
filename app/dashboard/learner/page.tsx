"use client"

import { useState } from "react"
import { Footer } from "@/components/footer"
import { WhatsappButton } from "@/components/whatsapp-button"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Users,
  BookOpen,
  Calendar,
  MessageSquare,
  FileText,
  User,
  LogOut,
  BookOpenIcon,
  Bell,
  CheckCircle,
  Clock,
  TrendingUp,
  Award,
} from "lucide-react"
import Link from "next/link"
import { NotificationBell } from "@/components/notification-bell"

export default function LearnerDashboard() {
  const [learnerName] = useState("John Smith")
  const [learnerGrade] = useState("Grade 12")
  const [subscriptionPlan] = useState("Premium")

  // Mock data for dashboard stats
  const todaySession = {
    subject: "Mathematics",
    time: "10:00 AM",
    tutor: "Jane Doe",
  }

  const attendanceSummary = {
    thisMonth: 88,
    thisWeek: "2/3",
  }

  const engagementScore = 4.2
  const progressIndicator = "Improving"

  const homeworkStatus = {
    completed: 5,
    pending: 2,
    overdue: 1,
  }

  const announcements = [
    "Class changes",
    "Fees reminders",
    "Exam prep workshops",
  ]

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-72 bg-[#1e3a5f] text-white fixed h-full overflow-y-auto">
        <div className="p-6">
          {/* Profile Section */}
          <div className="flex flex-col items-center mb-8 pb-6 border-b border-white/20">
            <div className="w-24 h-24 rounded-full bg-primary/30 mb-4 flex items-center justify-center overflow-hidden border-4 border-primary/50">
              <User className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-xl font-bold text-center">{learnerName}</h2>
            <p className="text-sm text-white/70 text-center">{learnerGrade}</p>
            <span className="mt-2 px-3 py-1 bg-primary/30 rounded-full text-xs font-medium">
              {subscriptionPlan} Plan
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            <Link href="/dashboard/learner">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-primary/20 bg-primary/10 text-base">
                <BookOpenIcon className="mr-3 h-5 w-5" />
                Home Dashboard
              </Button>
            </Link>
            <Link href="/dashboard/learner/attendance">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10 text-base">
                <Calendar className="mr-3 h-5 w-5" />
                Attendance & Schedule
              </Button>
            </Link>
            <Link href="/dashboard/learner/progress">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10 text-base">
                <TrendingUp className="mr-3 h-5 w-5" />
                Progress & Reports
              </Button>
            </Link>
            <Link href="/dashboard/learner/homework">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10 text-base">
                <FileText className="mr-3 h-5 w-5" />
                Homework & Tasks
              </Button>
            </Link>
            <Link href="/dashboard/learner/messages">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10 text-base">
                <MessageSquare className="mr-3 h-5 w-5" />
                Communication
              </Button>
            </Link>
            <Link href="/dashboard/learner/groups">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10 text-base">
                <Users className="mr-3 h-5 w-5" />
                My Groups
              </Button>
            </Link>
            <Link href="/dashboard/learner/profile">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10 text-base">
                <User className="mr-3 h-5 w-5" />
                Account & Settings
              </Button>
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-72">
        {/* Header */}
        <header className="bg-[#3b5a7d] text-white sticky top-0 z-40 border-b border-white/20">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-3">
              <BookOpenIcon className="h-8 w-8 text-white" strokeWidth={2.5} />
              <h1 className="text-2xl font-bold">Learner Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <NotificationBell />
              <Link href="/login">
                <Button variant="outline" className="text-white border-white hover:bg-white/10 bg-transparent">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Dashboard Content */}
        <main className="p-8 bg-gray-50 min-h-[calc(100vh-80px)]">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-secondary mb-2">Home Dashboard</h2>
          </div>

          {/* Top Row - Today's Session & Attendance */}
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            {/* Today's Session Card */}
            <Card className="border-2 bg-primary text-white overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 opacity-90">Today&apos;s Session</h3>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="text-2xl font-bold">{todaySession.subject}</p>
                    <p className="text-lg opacity-90">{todaySession.time}</p>
                    <p className="text-base opacity-80">Tutor: {todaySession.tutor}</p>
                  </div>
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                    <User className="h-8 w-8" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Attendance Summary Card */}
            <Card className="border-2 bg-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-secondary mb-4">Attendance Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">This Month</span>
                    <span className="text-3xl font-bold text-primary">{attendanceSummary.thisMonth}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">This Week</span>
                    <span className="text-xl font-semibold text-secondary">{attendanceSummary.thisWeek} sessions attended</span>
                  </div>
                  <Link href="/dashboard/learner/attendance">
                    <Button className="w-full mt-2">View Details</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Middle Row - Engagement & Progress */}
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            {/* Engagement Score */}
            <Card className="border-2 bg-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-secondary mb-4">Engagement Score</h3>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="text-4xl font-bold text-primary">{engagementScore}/5</p>
                    <p className="text-base text-muted-foreground">Actively participating</p>
                  </div>
                  <div className="w-full max-w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${(engagementScore / 5) * 100}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* General Progress Indicator */}
            <Card className="border-2 bg-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-secondary mb-4">General Progress Indicator</h3>
                <div className="flex items-center gap-4">
                  <TrendingUp className="h-12 w-12 text-primary" />
                  <div>
                    <p className="text-2xl font-bold text-secondary">{progressIndicator}</p>
                    <p className="text-muted-foreground">Keep up the great work!</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Row - Homework & Announcements */}
          <div className="grid gap-6 md:grid-cols-2 mb-6">
            {/* Homework Status */}
            <Card className="border-2 bg-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-secondary mb-4">Homework Status</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-muted-foreground">Completed</span>
                    <span className="ml-auto font-semibold">{homeworkStatus.completed}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-yellow-500" />
                    <span className="text-muted-foreground">Pending</span>
                    <span className="ml-auto font-semibold">{homeworkStatus.pending}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-red-500" />
                    <span className="text-muted-foreground">Overdue</span>
                    <span className="ml-auto font-semibold">{homeworkStatus.overdue}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Announcements */}
            <Card className="border-2 bg-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-secondary mb-4">Announcements</h3>
                <ul className="space-y-2">
                  {announcements.map((announcement, index) => (
                    <li key={index} className="flex items-center gap-2 text-muted-foreground">
                      <Award className="h-4 w-4 text-primary" />
                      {announcement}
                    </li>
                  ))}
                </ul>
                <Button variant="link" className="mt-2 p-0 h-auto text-primary">
                  more
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Access Cards */}
          <h3 className="text-2xl font-bold text-secondary mb-4">Quick Access</h3>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Link href="/dashboard/learner/groups">
              <Card className="border-2 transition-all hover:shadow-lg hover:scale-105 cursor-pointer h-full bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <Users className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-secondary mb-2">My Groups</h3>
                      <p className="text-base text-muted-foreground">Access your learning groups and chat.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/dashboard/learner/sessions">
              <Card className="border-2 transition-all hover:shadow-lg hover:scale-105 cursor-pointer h-full bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <BookOpen className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-secondary mb-2">My Sessions</h3>
                      <p className="text-base text-muted-foreground">View and manage your upcoming sessions.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/dashboard/learner/messages">
              <Card className="border-2 transition-all hover:shadow-lg hover:scale-105 cursor-pointer h-full bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-100 rounded-lg relative">
                      <MessageSquare className="h-8 w-8 text-purple-600" />
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        3
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-secondary mb-2">Messages</h3>
                      <p className="text-base text-muted-foreground">Chat with your tutors.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/dashboard/learner/resources">
              <Card className="border-2 transition-all hover:shadow-lg hover:scale-105 cursor-pointer h-full bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <FileText className="h-8 w-8 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-secondary mb-2">Resources</h3>
                      <p className="text-base text-muted-foreground">Access study materials and notes.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/dashboard/learner/profile">
              <Card className="border-2 transition-all hover:shadow-lg hover:scale-105 cursor-pointer h-full bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <User className="h-8 w-8 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-secondary mb-2">Profile</h3>
                      <p className="text-base text-muted-foreground">Update your personal information.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/dashboard/learner/attendance">
              <Card className="border-2 transition-all hover:shadow-lg hover:scale-105 cursor-pointer h-full bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-teal-100 rounded-lg">
                      <Calendar className="h-8 w-8 text-teal-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-secondary mb-2">Schedule</h3>
                      <p className="text-base text-muted-foreground">Check your learning schedule.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </main>

        <Footer />
      </div>

      <WhatsappButton />
    </div>
  )
}
