"use client"

import { Footer } from "@/components/footer"
import { WhatsappButton } from "@/components/whatsapp-button"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Users,
  UserPlus,
  FileText,
  BarChart,
  DollarSign,
  BookOpen,
  Calendar,
  Settings,
  LogOut,
  BookOpenIcon,
  Bell,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { NotificationBell } from "@/components/notification-bell"

export default function AdminDashboard() {
  const [adminName] = useState("Admin User")
  const [adminRole] = useState("Admin - Management")

  return (
    <div className="flex min-h-screen">
      <aside className="w-72 bg-[#1e3a5f] text-white fixed h-full overflow-y-auto">
        <div className="p-6">
          {/* Profile Section */}
          <div className="flex flex-col items-center mb-8 pb-6 border-b border-white/20">
            <div className="w-24 h-24 rounded-full bg-white/10 mb-4 flex items-center justify-center overflow-hidden">
              <img src="/professional-admin-portrait.png" alt={adminName} className="w-full h-full object-cover" />
            </div>
            <h2 className="text-xl font-bold text-center">{adminName}</h2>
            <p className="text-sm text-white/70 text-center">{adminRole}</p>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            <Link href="/dashboard/admin/add-tutor">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10 text-base">
                <UserPlus className="mr-3 h-5 w-5" />
                Add Tutors
              </Button>
            </Link>
            <Link href="/dashboard/admin/users">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10 text-base">
                <Users className="mr-3 h-5 w-5" />
                Manage Users
              </Button>
            </Link>
            <Link href="/dashboard/admin/groups">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10 text-base">
                <BookOpen className="mr-3 h-5 w-5" />
                Manage Groups
              </Button>
            </Link>
            <Link href="/dashboard/admin/pricing">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10 text-base">
                <DollarSign className="mr-3 h-5 w-5" />
                Pricing Plans
              </Button>
            </Link>
            <Link href="/dashboard/admin/create-session">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10 text-base">
                <Calendar className="mr-3 h-5 w-5" />
                Create Sessions
              </Button>
            </Link>
            <Link href="/dashboard/admin/notifications">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10 text-base">
                <Bell className="mr-3 h-5 w-5" />
                Send Notifications
              </Button>
            </Link>
            <Link href="/dashboard/admin/applications">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10 text-base">
                <FileText className="mr-3 h-5 w-5" />
                Applications
              </Button>
            </Link>
            <Link href="/dashboard/admin/reports">
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:bg-primary/20 bg-primary/10 text-base"
              >
                <BarChart className="mr-3 h-5 w-5" />
                Reports
              </Button>
            </Link>
            <Link href="/dashboard/admin/settings">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10 text-base">
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </Button>
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-72">
        <header className="bg-[#3b5a7d] text-white sticky top-0 z-40 border-b border-white/20">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center gap-3">
              <BookOpenIcon className="h-8 w-8 text-white" strokeWidth={2.5} />
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
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

        <main className="p-8 bg-gray-50 min-h-[calc(100vh-80px)]">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-secondary mb-2">Welcome, {adminName}</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
            <Link href="/dashboard/admin/add-tutor">
              <Card className="border-2 transition-all hover:shadow-lg hover:scale-105 cursor-pointer h-full bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <UserPlus className="h-8 w-8 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-secondary mb-2">Add Tutors</h3>
                      <p className="text-base text-muted-foreground">Add new tutors to the system.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/dashboard/admin/users">
              <Card className="border-2 transition-all hover:shadow-lg hover:scale-105 cursor-pointer h-full bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg relative">
                      <Users className="h-8 w-8 text-blue-600" />
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        1
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-secondary mb-2">Manage Users</h3>
                      <p className="text-base text-muted-foreground">View all learners and tutors.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/dashboard/admin/groups">
              <Card className="border-2 transition-all hover:shadow-lg hover:scale-105 cursor-pointer h-full bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <BookOpen className="h-8 w-8 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-secondary mb-2">Manage Groups</h3>
                      <p className="text-base text-muted-foreground">Manage subject groups.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/dashboard/admin/pricing">
              <Card className="border-2 transition-all hover:shadow-lg hover:scale-105 cursor-pointer h-full bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-orange-100 rounded-lg">
                      <DollarSign className="h-8 w-8 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-secondary mb-2">Pricing Plans</h3>
                      <p className="text-base text-muted-foreground">Manage subscription pricing.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/dashboard/admin/create-session">
              <Card className="border-2 transition-all hover:shadow-lg hover:scale-105 cursor-pointer h-full bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-teal-100 rounded-lg">
                      <Calendar className="h-8 w-8 text-teal-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-secondary mb-2">Create Sessions</h3>
                      <p className="text-base text-muted-foreground">Schedule tutor sessions.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/dashboard/admin/notifications">
              <Card className="border-2 transition-all hover:shadow-lg hover:scale-105 cursor-pointer h-full bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-yellow-100 rounded-lg">
                      <Bell className="h-8 w-8 text-yellow-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-secondary mb-2">Send Notifications</h3>
                      <p className="text-base text-muted-foreground">Alert students and groups.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/dashboard/admin/applications">
              <Card className="border-2 transition-all hover:shadow-lg hover:scale-105 cursor-pointer h-full bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gray-100 rounded-lg relative">
                      <FileText className="h-8 w-8 text-gray-600" />
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        3
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-secondary mb-2">Applications</h3>
                      <p className="text-base text-muted-foreground">Review tutor applications.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/dashboard/admin/reports">
              <Card className="border-2 transition-all hover:shadow-lg hover:scale-105 cursor-pointer h-full bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <BarChart className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-secondary mb-2">Reports</h3>
                      <p className="text-base text-muted-foreground">View system analytics.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/dashboard/admin/settings">
              <Card className="border-2 transition-all hover:shadow-lg hover:scale-105 cursor-pointer h-full bg-white">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <Settings className="h-8 w-8 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-secondary mb-2">Settings</h3>
                      <p className="text-base text-muted-foreground">System configuration.</p>
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
