"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export function PricingContent() {
  const searchParams = useSearchParams()
  const subject = searchParams.get("subject") || "mathematics"

  const plans = [
    {
      id: "standard",
      name: "STANDARD PRICE",
      price: "R415",
      features: [
        "Up to 20 learners per group",
        "1 weekly group session",
        "Recorded lessons & basic notes",
        "Basic past paper library",
        "Monthly mock test (auto-marked)",
        "WhatsApp announcements",
        "Uni & Bursary webinars",
      ],
    },
    {
      id: "premium",
      name: "PREMIUM PRICE",
      price: "R765",
      features: [
        "Up to 10 learners per group",
        "2 weekly group sessions",
        "Recorded lessons & full notes",
        "Full past paper library",
        "Monthly mock test (tutor-marked)",
        "WhatsApp group Q&A",
        "Semi-custom study plan",
      ],
      popular: true,
    },
    {
      id: "personalized",
      name: "PERSONALIZED PRICE",
      price: "R1450",
      features: [
        "Full customised 1-on-1 sessions",
        "Full diagnostic & learning plan",
        "1-3 weekly session",
        "Recorded lessons & personalised notes",
        "Dedicated academic manager",
        "Monthly parent progress meetings",
      ],
    },
  ]

  return (
    <main className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-16 text-center text-4xl font-bold text-foreground md:text-5xl">
            Finding your Perfect Plan
          </h1>

          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative flex flex-col border-2 p-8 ${
                  plan.popular ? "border-primary shadow-xl" : "border-border"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground">
                    Most Popular
                  </div>
                )}

                <h2 className="mb-6 text-center text-2xl font-bold text-foreground">{plan.name}</h2>

                <ul className="mb-8 flex-1 space-y-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-base">
                      <div className="mt-0.5 h-5 w-5 flex-shrink-0 rounded-full bg-primary/10 p-1">
                        <Check className="h-full w-full text-primary" />
                      </div>
                      <span className="text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto">
                  <div className="mb-6 text-center">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    <span className="text-xl text-muted-foreground"> per month</span>
                  </div>

                  <Link href={`/register?plan=${plan.id}&subject=${subject}`} className="w-full">
                    <Button size="lg" className="w-full text-lg" variant={plan.popular ? "default" : "outline"}>
                      Choose {plan.name.split(" ")[0]}
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
