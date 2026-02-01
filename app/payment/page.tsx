import { Navigation } from "@/components/navigation"
import { PaymentContent } from "@/components/payment-content"
import { Suspense } from "react"

export default function PaymentPage() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<div className="min-h-screen" />}>
        <PaymentContent />
      </Suspense>
    </>
  )
}
