"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsappButton } from "@/components/whatsapp-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || "Login failed")
        return
      }

      // ✅ Save JWT token in localStorage
      localStorage.setItem("token", data.token)

      // ✅ Redirect based on role
      switch (data.user.role) {
        case "learner":
          router.push("/dashboard/learner")
          break
        case "tutor":
          router.push("/dashboard/tutor")
          break
        case "admin":
          router.push("/dashboard/admin")
          break
        default:
          router.push("/")
          break
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong")
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 flex items-center justify-center py-16">
        <Card className="w-full max-w-md border-2 shadow-xl mx-4">
          <CardHeader>
            <CardTitle className="text-center text-5xl font-bold text-secondary">
              LOG IN
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {error && <p className="text-red-600 text-lg">{error}</p>}

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

              <Button type="submit" className="w-full text-lg" size="lg">
                LOG IN
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
      <Footer />
      <WhatsappButton />
    </div>
  )
}
