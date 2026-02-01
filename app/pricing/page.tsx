import { Navigation } from "@/components/navigation"
import { PricingContent } from "@/components/pricing-content"
import { Suspense } from "react"

export default function PricingPage() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<div className="min-h-screen" />}>
        <PricingContent />
      </Suspense>
    </>
  )
}
