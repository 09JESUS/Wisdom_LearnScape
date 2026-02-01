"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsappButton } from "@/components/whatsapp-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

const initialPlans = [
  {
    id: 1,
    name: "Standard",
    price: "415",
    features:
      "Up to 20 learners per group\n1 weekly group session\nRecorded lessons & basic notes\nBasic past paper library\nMonthly mock test (auto-marked)\nWhatsApp announcements\nUni & Bursary webinars",
    maxLearners: 20,
    maxSessions: 1,
  },
  {
    id: 2,
    name: "Premium",
    price: "765",
    features:
      "Up to 10 learners per group\n2 weekly group sessions\nRecorded lessons & full notes\nFull past paper library\nMonthly mock test (tutor-marked)\nWhatsApp group Q&A\nSemi-custom study plan",
    maxLearners: 10,
    maxSessions: 2,
  },
  {
    id: 3,
    name: "Personalized",
    price: "1450",
    features:
      "Full customised 1-on-1 sessions\nFull diagnostic & learning plan\n1-3 weekly sessions\nRecorded lessons & personalised notes\nDedicated academic manager\nMonthly parent progress meetings",
    maxLearners: 1,
    maxSessions: 3,
  },
]

export default function ManagePricingPage() {
  const [plans, setPlans] = useState(initialPlans)
  const [editingId, setEditingId] = useState<number | null>(null)

  const handleSave = (id: number) => {
    // In real implementation, this would call your API
    console.log(
      "[v0] Saving plan:",
      plans.find((p) => p.id === id),
    )
    setEditingId(null)
    alert("Pricing plan updated successfully!")
  }

  const updatePlan = (id: number, field: string, value: string | number) => {
    setPlans(plans.map((plan) => (plan.id === id ? { ...plan, [field]: value } : plan)))
  }

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

          <h1 className="mb-12 text-5xl font-bold text-secondary md:text-6xl">Manage Pricing Plans</h1>

          <div className="grid gap-6">
            {plans.map((plan) => (
              <Card key={plan.id} className="border-2">
                <CardHeader>
                  <CardTitle className="text-3xl">{plan.name} Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor={`price-${plan.id}`} className="text-lg">
                          Monthly Price (ZAR)
                        </Label>
                        <Input
                          id={`price-${plan.id}`}
                          type="number"
                          value={plan.price}
                          onChange={(e) => updatePlan(plan.id, "price", e.target.value)}
                          disabled={editingId !== plan.id}
                          className="text-lg"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`maxLearners-${plan.id}`} className="text-lg">
                            Max Learners
                          </Label>
                          <Input
                            id={`maxLearners-${plan.id}`}
                            type="number"
                            value={plan.maxLearners}
                            onChange={(e) => updatePlan(plan.id, "maxLearners", Number.parseInt(e.target.value))}
                            disabled={editingId !== plan.id}
                            className="text-lg"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`maxSessions-${plan.id}`} className="text-lg">
                            Sessions/Week
                          </Label>
                          <Input
                            id={`maxSessions-${plan.id}`}
                            type="number"
                            value={plan.maxSessions}
                            onChange={(e) => updatePlan(plan.id, "maxSessions", Number.parseInt(e.target.value))}
                            disabled={editingId !== plan.id}
                            className="text-lg"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`features-${plan.id}`} className="text-lg">
                        Features (one per line)
                      </Label>
                      <Textarea
                        id={`features-${plan.id}`}
                        value={plan.features}
                        onChange={(e) => updatePlan(plan.id, "features", e.target.value)}
                        disabled={editingId !== plan.id}
                        rows={8}
                        className="text-lg"
                      />
                    </div>

                    <div className="flex gap-4">
                      {editingId === plan.id ? (
                        <>
                          <Button onClick={() => handleSave(plan.id)} className="text-lg">
                            Save Changes
                          </Button>
                          <Button onClick={() => setEditingId(null)} variant="outline" className="text-lg">
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Button onClick={() => setEditingId(plan.id)} className="text-lg">
                          Edit Plan
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
      <WhatsappButton />
    </div>
  )
}
