"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"

export function RegisterContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const plan = searchParams.get("plan") || "standard"
  const subject = searchParams.get("subject") || "mathematics"

  const [learnerData, setLearnerData] = useState({
    name: "",
    surname: "",
    email: "",
    school: "",
    password: "",
  })

  const [parentData, setParentData] = useState({
    title: "",
    initialsAndSurname: "",
    contactDetails: "",
    password: "",
  })

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault()
    sessionStorage.setItem("registrationData", JSON.stringify({ learnerData, parentData, plan, subject }))
    router.push(`/payment?plan=${plan}&subject=${subject}`)
  }

  return (
    <main className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-12 text-center text-4xl font-bold text-foreground md:text-5xl">Registration</h1>

          <form onSubmit={handleContinue}>
            <div className="grid gap-8 md:grid-cols-2">
              <Card className="border-2 p-8">
                <h2 className="mb-6 text-2xl font-bold text-foreground">Registration of a learner</h2>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="learner-name" className="text-base font-semibold">
                      Name
                    </Label>
                    <Input
                      id="learner-name"
                      value={learnerData.name}
                      onChange={(e) => setLearnerData({ ...learnerData, name: e.target.value })}
                      required
                      className="mt-2 text-base"
                    />
                  </div>

                  <div>
                    <Label htmlFor="learner-surname" className="text-base font-semibold">
                      Surname
                    </Label>
                    <Input
                      id="learner-surname"
                      value={learnerData.surname}
                      onChange={(e) => setLearnerData({ ...learnerData, surname: e.target.value })}
                      required
                      className="mt-2 text-base"
                    />
                  </div>

                  <div>
                    <Label htmlFor="learner-email" className="text-base font-semibold">
                      Contact details
                      <br />
                      Email
                    </Label>
                    <Input
                      id="learner-email"
                      type="email"
                      value={learnerData.email}
                      onChange={(e) => setLearnerData({ ...learnerData, email: e.target.value })}
                      required
                      className="mt-2 text-base"
                    />
                  </div>

                  <div>
                    <Label htmlFor="learner-school" className="text-base font-semibold">
                      School you attend(ed) at
                    </Label>
                    <Input
                      id="learner-school"
                      value={learnerData.school}
                      onChange={(e) => setLearnerData({ ...learnerData, school: e.target.value })}
                      required
                      className="mt-2 text-base"
                    />
                  </div>

                  <div>
                    <Label htmlFor="learner-password" className="text-base font-semibold">
                      Password
                    </Label>
                    <Input
                      id="learner-password"
                      type="password"
                      value={learnerData.password}
                      onChange={(e) => setLearnerData({ ...learnerData, password: e.target.value })}
                      required
                      className="mt-2 text-base"
                    />
                  </div>
                </div>
              </Card>

              <Card className="border-2 p-8">
                <h2 className="mb-6 text-2xl font-bold text-foreground">Registration of the parent</h2>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="parent-title" className="text-base font-semibold">
                      Mr/Mrs/Miss/Ms
                    </Label>
                    <Input
                      id="parent-title"
                      value={parentData.title}
                      onChange={(e) => setParentData({ ...parentData, title: e.target.value })}
                      required
                      className="mt-2 text-base"
                    />
                  </div>

                  <div>
                    <Label htmlFor="parent-initials" className="text-base font-semibold">
                      Initials and surname
                    </Label>
                    <Input
                      id="parent-initials"
                      value={parentData.initialsAndSurname}
                      onChange={(e) => setParentData({ ...parentData, initialsAndSurname: e.target.value })}
                      required
                      className="mt-2 text-base"
                    />
                  </div>

                  <div>
                    <Label htmlFor="parent-contact" className="text-base font-semibold">
                      Contact details
                    </Label>
                    <Input
                      id="parent-contact"
                      value={parentData.contactDetails}
                      onChange={(e) => setParentData({ ...parentData, contactDetails: e.target.value })}
                      required
                      className="mt-2 text-base"
                    />
                  </div>

                  <div>
                    <Label htmlFor="parent-password" className="text-base font-semibold">
                      Password
                    </Label>
                    <Input
                      id="parent-password"
                      type="password"
                      value={parentData.password}
                      onChange={(e) => setParentData({ ...parentData, password: e.target.value })}
                      required
                      className="mt-2 text-base"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full text-lg">
                    Continue
                  </Button>
                </div>
              </Card>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
