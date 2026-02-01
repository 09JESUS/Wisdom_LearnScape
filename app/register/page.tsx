import { Navigation } from "@/components/navigation"
import { RegisterContent } from "@/components/register-content"
import { Suspense } from "react"

export default function RegisterPage() {
  return (
    <>
      <Navigation />
      <Suspense fallback={<div className="min-h-screen" />}>
        <RegisterContent />
      </Suspense>
    </>
  )
}
