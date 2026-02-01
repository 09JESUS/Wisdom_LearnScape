"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsappButton } from "@/components/whatsapp-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, BookOpen, DollarSign, Download } from "lucide-react"
import Link from "next/link"

export default function ReportsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-5xl font-bold text-secondary md:text-6xl">System Reports</h1>
            <Link href="/dashboard/admin">
              <Button variant="outline" className="text-lg bg-transparent">
                Back to Dashboard
              </Button>
            </Link>
          </div>

          {/* Overview Stats */}
          <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Users className="h-6 w-6 text-primary" />
                  Total Learners
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-primary">156</p>
                <p className="text-sm text-muted-foreground mt-2">+12 this month</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Users className="h-6 w-6 text-primary" />
                  Active Tutors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-primary">24</p>
                <p className="text-sm text-muted-foreground mt-2">All active</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <BookOpen className="h-6 w-6 text-primary" />
                  Active Groups
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-primary">18</p>
                <p className="text-sm text-muted-foreground mt-2">Across all subjects</p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <DollarSign className="h-6 w-6 text-primary" />
                  Monthly Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-primary">R124,500</p>
                <p className="text-sm text-muted-foreground mt-2">+18% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Reports */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Subscription Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-lg">Standard Plan</span>
                      <span className="text-lg font-semibold">68 learners</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-primary h-3 rounded-full" style={{ width: "44%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-lg">Premium Plan</span>
                      <span className="text-lg font-semibold">52 learners</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-primary h-3 rounded-full" style={{ width: "33%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-lg">Personalized Plan</span>
                      <span className="text-lg font-semibold">36 learners</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-primary h-3 rounded-full" style={{ width: "23%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Attendance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg">Average Attendance Rate</span>
                    <span className="text-3xl font-bold text-primary">87%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg">Total Sessions This Month</span>
                    <span className="text-3xl font-bold text-primary">342</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-lg">Completed Sessions</span>
                    <span className="text-3xl font-bold text-primary">298</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Export Options */}
          <Card className="border-2 mt-8">
            <CardHeader>
              <CardTitle className="text-2xl">Export Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Button className="text-lg">
                  <Download className="mr-2 h-5 w-5" />
                  Export User Data
                </Button>
                <Button className="text-lg">
                  <Download className="mr-2 h-5 w-5" />
                  Export Financial Report
                </Button>
                <Button className="text-lg">
                  <Download className="mr-2 h-5 w-5" />
                  Export Attendance Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
      <WhatsappButton />
    </div>
  )
}
