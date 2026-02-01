import { Suspense } from "react"
import { SessionConfirmationContent } from "@/components/session-confirmation-content"

export default function SessionConfirmationPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SessionConfirmationContent />
    </Suspense>
  )
}
