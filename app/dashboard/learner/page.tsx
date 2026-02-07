"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { Footer } from "@/components/footer"
import { WhatsappButton } from "@/components/whatsapp-button"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpenIcon, Calendar, MessageSquare, User, LogOut } from "lucide-react"
import Link from "next/link"
import { NotificationBell } from "@/components/notification-bell"

type DashboardData = {
  learner: {
    first_name: string
    last_name: string
    grade: string
  }
  subscriptionPlan: string
  attendance: {
    month: number
    week: number
  }
  homework: {
    completed: number
    pending: number
    overdue: number
  }
  engagementScore: number
  todaySession?: {
    subject: string
    start_time: string
    tutor_name: string
  } | null
  unreadMessages: number
}

export default function LearnerDashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true)
      setError(null)

      try {
        const token = localStorage.getItem("token")
        if (!token) {
          setError("Unauthorized: Please log in.")
          return
        }

        const res = await fetch("/api/learner/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        })

        const json = await res.json()

        if (!res.ok) {
          if (res.status === 401) setError("Unauthorized: Please log in.")
          else if (res.status === 403) setError("Forbidden: You cannot access this page.")
          else setError(json?.message || "Failed to fetch dashboard")
          return
        }

        // ✅ Ensure all fields exist to avoid undefined errors
        setData({
          learner: {
            first_name: json?.learner?.first_name || "Unknown",
            last_name: json?.learner?.last_name || "",
            grade: json?.learner?.grade || "N/A",
          },
          subscriptionPlan: json?.subscriptionPlan || "Free",
          attendance: {
            month: json?.attendance?.month ?? 0,
            week: json?.attendance?.week ?? 0,
          },
          homework: {
            completed: json?.homework?.completed ?? 0,
            pending: json?.homework?.pending ?? 0,
            overdue: json?.homework?.overdue ?? 0,
          },
          engagementScore: json?.engagementScore ?? 0,
          todaySession: json?.todaySession || null,
          unreadMessages: json?.unreadMessages ?? 0,
        })
      } catch (err: any) {
        console.error("Dashboard fetch error:", err)
        setError(err.message || "Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [router])

  if (loading) return <div className="p-10 text-center text-lg">Loading dashboard...</div>
  if (error) return <div className="p-10 text-center text-red-600">{error}</div>
  if (!data) return <div className="p-10 text-center">No dashboard data available.</div>

  const { learner, subscriptionPlan, attendance, homework, engagementScore, todaySession, unreadMessages } = data

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-72 bg-[#1e3a5f] text-white fixed h-full overflow-y-auto">
        <div className="p-6">
          {/* Profile */}
          <div className="flex flex-col items-center mb-8 pb-6 border-b border-white/20">
            <div className="w-24 h-24 rounded-full bg-primary/30 mb-4 flex items-center justify-center border-4 border-primary/50">
              <User className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-xl font-bold">
              {learner.first_name} {learner.last_name}
            </h2>
            <p className="text-sm text-white/70">{learner.grade}</p>
            <span className="mt-2 px-3 py-1 bg-primary/30 rounded-full text-xs">
              {subscriptionPlan} Plan
            </span>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            <Link href="/dashboard/learner">
              <Button variant="ghost" className="w-full justify-start bg-primary/10 text-white">
                <BookOpenIcon className="mr-3 h-5 w-5" />
                Home Dashboard
              </Button>
            </Link>
            <Link href="/dashboard/learner/attendance">
              <Button variant="ghost" className="w-full justify-start text-white">
                <Calendar className="mr-3 h-5 w-5" />
                Attendance & Schedule
              </Button>
            </Link>
            <Link href="/dashboard/learner/messages">
              <Button variant="ghost" className="w-full justify-start text-white">
                <MessageSquare className="mr-3 h-5 w-5" />
                Messages
              </Button>
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 ml-72">
        {/* Header */}
        <header className="bg-[#3b5a7d] text-white sticky top-0 z-40">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-3">
              <BookOpenIcon className="h-8 w-8" />
              <h1 className="text-2xl font-bold">Learner Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <NotificationBell count={unreadMessages} />
              <Link href="/login">
                <Button
                  variant="outline"
                  className="text-white border-white"
                  onClick={() => localStorage.removeItem("token")}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Log Out
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-8 bg-gray-50">
          {/* Today Session */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card className="bg-primary text-white">
              <CardContent className="p-6">
                <h3 className="mb-4 font-semibold">Today’s Session</h3>
                {todaySession ? (
                  <>
                    <p className="text-2xl font-bold">{todaySession.subject}</p>
                    <p>{todaySession.start_time}</p>
                    <p>Tutor: {todaySession.tutor_name}</p>
                  </>
                ) : (
                  <p>No session today</p>
                )}
              </CardContent>
            </Card>

            {/* Attendance */}
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 font-semibold">Attendance</h3>
                <p className="text-3xl font-bold text-primary">{attendance.month}%</p>
                <p>{attendance.week} sessions this week</p>
              </CardContent>
            </Card>
          </div>

          {/* Engagement & Homework */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 font-semibold">Engagement Score</h3>
                <p className="text-4xl font-bold text-primary">{engagementScore}/5</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="mb-4 font-semibold">Homework</h3>
                <p>✅ Completed: {homework.completed}</p>
                <p>⏳ Pending: {homework.pending}</p>
                <p>🚨 Overdue: {homework.overdue}</p>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>

      <WhatsappButton />
    </div>
  )
}
