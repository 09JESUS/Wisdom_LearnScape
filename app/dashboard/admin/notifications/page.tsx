"use client"

import { useState } from "react"
import { Footer } from "@/components/footer"
import { WhatsappButton } from "@/components/whatsapp-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  ArrowLeft,
  Bell,
  Send,
  Users,
  User,
  Search,
  CheckCircle,
  BookOpenIcon,
  LogOut,
  UserPlus,
  BookOpen,
  DollarSign,
  Calendar,
  FileText,
  BarChart,
  Settings,
} from "lucide-react"
import Link from "next/link"
import { NotificationBell } from "@/components/notification-bell"

// Mock student data
const mockStudents = [
  { id: 1, name: "John Smith", email: "john@test.com", grade: "Grade 12", plan: "Premium", group: "Mathematics Premium" },
  { id: 2, name: "Sarah Johnson", email: "sarah@test.com", grade: "Grade 11", plan: "Standard", group: "Mathematics Standard" },
  { id: 3, name: "Michael Brown", email: "michael@test.com", grade: "Grade 12", plan: "Personalized", group: "Mathematics 1-on-1" },
  { id: 4, name: "Emily Davis", email: "emily@test.com", grade: "Grade 10", plan: "Premium", group: "Science Premium" },
  { id: 5, name: "David Wilson", email: "david@test.com", grade: "Grade 12", plan: "Standard", group: "Science Standard" },
  { id: 6, name: "Lisa Anderson", email: "lisa@test.com", grade: "Grade 11", plan: "Standard", group: "Mathematics Standard" },
  { id: 7, name: "James Taylor", email: "james@test.com", grade: "Grade 12", plan: "Premium", group: "Science Premium" },
  { id: 8, name: "Jennifer Martinez", email: "jennifer@test.com", grade: "Grade 10", plan: "Standard", group: "Mathematics Standard" },
]

// Mock sent notifications
const mockSentNotifications = [
  { id: 1, title: "Exam Schedule Update", recipients: "All Students", date: "2025-01-28", type: "all" },
  { id: 2, title: "Fee Reminder", recipients: "John Smith, Sarah Johnson", date: "2025-01-27", type: "specific" },
  { id: 3, title: "Holiday Notice", recipients: "All Students", date: "2025-01-25", type: "all" },
  { id: 4, title: "Session Rescheduled", recipients: "Michael Brown", date: "2025-01-24", type: "specific" },
]

export default function AdminNotificationsPage() {
  const [adminName] = useState("Admin User")
  const [adminRole] = useState("Admin - Management")
  const [notificationType, setNotificationType] = useState<"all" | "specific">("all")
  const [selectedStudents, setSelectedStudents] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [notificationTitle, setNotificationTitle] = useState("")
  const [notificationMessage, setNotificationMessage] = useState("")
  const [sendSuccess, setSendSuccess] = useState(false)

  const filteredStudents = mockStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.grade.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.plan.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const toggleStudent = (studentId: number) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId) ? prev.filter((id) => id !== studentId) : [...prev, studentId]
    )
  }

  const selectAllStudents = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([])
    } else {
      setSelectedStudents(filteredStudents.map((s) => s.id))
    }
  }

  const handleSendNotification = () => {
    if (!notificationTitle || !notificationMessage) {
      alert("Please fill in all fields")
      return
    }

    if (notificationType === "specific" && selectedStudents.length === 0) {
      alert("Please select at least one student")
      return
    }

    // In production, this would send the notification via API
    setSendSuccess(true)
    setTimeout(() => {
      setSendSuccess(false)
      setNotificationTitle("")
      setNotificationMessage("")
      setSelectedStudents([])
    }, 3000)
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
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
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-primary/20 bg-primary/10 text-base">
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
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10 text-base">
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
        {/* Header */}
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

        {/* Main Content */}
        <main className="p-8 bg-gray-50 min-h-[calc(100vh-80px)]">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/dashboard/admin">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h2 className="text-4xl font-bold text-secondary">Send Notifications</h2>
              <p className="text-muted-foreground">Send notifications to all students or specific individuals</p>
            </div>
          </div>

          {sendSuccess && (
            <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <span className="text-green-800 font-medium">Notification sent successfully!</span>
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-2">
            {/* Compose Notification */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Bell className="h-6 w-6 text-primary" />
                  Compose Notification
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Recipient Type Selection */}
                <div className="space-y-3">
                  <Label className="text-lg font-semibold">Send To</Label>
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant={notificationType === "all" ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => setNotificationType("all")}
                    >
                      <Users className="mr-2 h-5 w-5" />
                      All Students
                    </Button>
                    <Button
                      type="button"
                      variant={notificationType === "specific" ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => setNotificationType("specific")}
                    >
                      <User className="mr-2 h-5 w-5" />
                      Specific Students
                    </Button>
                  </div>
                </div>

                {/* Notification Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-lg">
                    Notification Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="Enter notification title..."
                    value={notificationTitle}
                    onChange={(e) => setNotificationTitle(e.target.value)}
                    className="text-base h-12"
                  />
                </div>

                {/* Notification Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-lg">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Enter your notification message..."
                    value={notificationMessage}
                    onChange={(e) => setNotificationMessage(e.target.value)}
                    className="text-base min-h-32"
                  />
                </div>

                {/* Send Button */}
                <Button className="w-full text-lg h-12" onClick={handleSendNotification}>
                  <Send className="mr-2 h-5 w-5" />
                  Send Notification
                </Button>
              </CardContent>
            </Card>

            {/* Student Selection (for specific notifications) */}
            {notificationType === "specific" && (
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Users className="h-6 w-6 text-primary" />
                    Select Students
                    {selectedStudents.length > 0 && (
                      <span className="ml-auto text-base font-normal text-muted-foreground">
                        {selectedStudents.length} selected
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Search students..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 text-base h-12"
                    />
                  </div>

                  {/* Select All */}
                  <div className="flex items-center gap-3 pb-3 border-b">
                    <Checkbox
                      id="select-all"
                      checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                      onCheckedChange={selectAllStudents}
                    />
                    <label htmlFor="select-all" className="font-medium cursor-pointer">
                      Select All ({filteredStudents.length} students)
                    </label>
                  </div>

                  {/* Student List */}
                  <div className="max-h-80 overflow-y-auto space-y-2">
                    {filteredStudents.map((student) => (
                      <div
                        key={student.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedStudents.includes(student.id)
                            ? "bg-primary/10 border-primary"
                            : "hover:bg-gray-50"
                        }`}
                        onClick={() => toggleStudent(student.id)}
                      >
                        <Checkbox
                          checked={selectedStudents.includes(student.id)}
                          onCheckedChange={() => toggleStudent(student.id)}
                        />
                        <div className="flex-1">
                          <p className="font-medium">{student.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {student.grade} | {student.plan} | {student.group}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Recent Notifications */}
            {notificationType === "all" && (
              <Card className="border-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <FileText className="h-6 w-6 text-primary" />
                    Recent Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockSentNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="flex items-start gap-4 p-4 rounded-lg border hover:bg-gray-50 transition-colors"
                      >
                        <div
                          className={`p-2 rounded-full ${
                            notification.type === "all" ? "bg-blue-100" : "bg-orange-100"
                          }`}
                        >
                          {notification.type === "all" ? (
                            <Users className="h-5 w-5 text-blue-600" />
                          ) : (
                            <User className="h-5 w-5 text-orange-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold">{notification.title}</h4>
                          <p className="text-sm text-muted-foreground">To: {notification.recipients}</p>
                          <p className="text-xs text-muted-foreground mt-1">{notification.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>

        <Footer />
      </div>

      <WhatsappButton />
    </div>
  )
}
