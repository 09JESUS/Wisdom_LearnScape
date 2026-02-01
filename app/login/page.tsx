"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsappButton } from "@/components/whatsapp-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // Demo role-based routing
    // In production, this would validate credentials with backend
    if (email.includes("admin")) {
      router.push("/dashboard/admin")
    } else if (email.includes("tutor")) {
      router.push("/dashboard/tutor")
    } else {
      router.push("/dashboard/learner")
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 flex items-center justify-center py-16">
        <Card className="w-full max-w-md border-2 shadow-xl mx-4">
          <CardHeader>
            <CardTitle className="text-center text-5xl font-bold text-secondary">LOG IN</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-xl">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 text-lg h-12"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-xl">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 text-lg h-12"
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label htmlFor="remember" className="text-lg leading-none">
                  Forget Password
                </label>
              </div>

              <p className="text-lg text-muted-foreground">
                <span className="font-semibold">NB:</span> Use the Home page to register
              </p>

              <Button type="submit" className="w-full text-lg" size="lg">
                LOG IN
              </Button>

              <div className="text-center text-lg">
                <p className="text-muted-foreground">
                  Demo credentials:
                  <br />
                  learner@test.com (Learner Dashboard)
                  <br />
                  tutor@test.com (Tutor Dashboard)
                  <br />
                  admin@test.com (Admin Dashboard)
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
      <WhatsappButton />
    </div>
  )
}
