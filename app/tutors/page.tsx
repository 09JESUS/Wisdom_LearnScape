import { Suspense } from "react"
import { TutorsContent } from "@/components/tutors-content"

export default function TutorsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TutorsContent />
    </Suspense>
  )
}
