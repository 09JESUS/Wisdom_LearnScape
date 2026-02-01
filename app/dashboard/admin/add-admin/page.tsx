"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Copy, Check } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AddAdminPage() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
  })
  const [generatedCode, setGeneratedCode] = useState("")
  const [copied, setCopied] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const generateAdminCode = () => {
    // Generate a unique admin code: WLA-XXXXX (Wisdom Learnscape Admin)
    const code = `WLA-${Math.random().toString(36).substring(2, 7).toUpperCase()}`
    return code
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const code = generateAdminCode()
    setGeneratedCode(code)
    setSubmitted(true)

    // In production, this would save to database
    console.log("[v0] New admin added:", { ...formData, adminCode: code })
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto max-w-2xl">
        <Link href="/dashboard/admin/settings">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Settings
          </Button>
        </Link>

        <Card className="border-2 shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-secondary">Add New Admin</CardTitle>
            <p className="text-muted-foreground mt-2">Create a new administrator account with a unique access code</p>
          </CardHeader>
          <CardContent>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-lg">
                    First Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter first name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-2 text-lg h-12"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="surname" className="text-lg">
                    Surname
                  </Label>
                  <Input
                    id="surname"
                    placeholder="Enter surname"
                    value={formData.surname}
                    onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                    className="mt-2 text-lg h-12"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-lg">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@wisdomlearnscape.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-2 text-lg h-12"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-lg">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="0XX XXX XXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-2 text-lg h-12"
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full text-lg">
                  Generate Admin Code
                </Button>
              </form>
            ) : (
              <div className="space-y-6">
                <Alert className="bg-green-50 border-green-200">
                  <AlertDescription className="text-lg">Admin account created successfully!</AlertDescription>
                </Alert>

                <div className="bg-gray-50 p-6 rounded-lg border-2 border-primary">
                  <Label className="text-lg font-semibold mb-3 block">Admin Details</Label>
                  <div className="space-y-2 text-base">
                    <p>
                      <span className="font-semibold">Name:</span> {formData.name} {formData.surname}
                    </p>
                    <p>
                      <span className="font-semibold">Email:</span> {formData.email}
                    </p>
                    <p>
                      <span className="font-semibold">Phone:</span> {formData.phone}
                    </p>
                  </div>
                </div>

                <div className="bg-primary/10 p-6 rounded-lg border-2 border-primary">
                  <Label className="text-lg font-semibold mb-3 block">Generated Admin Code</Label>
                  <div className="flex items-center gap-3">
                    <Input value={generatedCode} readOnly className="text-2xl font-mono font-bold text-primary h-14" />
                    <Button onClick={copyToClipboard} size="lg" variant="outline">
                      {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3">
                    Share this code with the new admin. They will use it to set up their account.
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({ name: "", surname: "", email: "", phone: "" })
                      setGeneratedCode("")
                    }}
                    variant="outline"
                    size="lg"
                    className="flex-1 text-lg"
                  >
                    Add Another Admin
                  </Button>
                  <Link href="/dashboard/admin/settings" className="flex-1">
                    <Button size="lg" className="w-full text-lg">
                      Back to Settings
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
