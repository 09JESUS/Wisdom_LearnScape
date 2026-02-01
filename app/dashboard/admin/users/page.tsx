import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsappButton } from "@/components/whatsapp-button"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"
import { ManageUsersContent } from "@/components/manage-users-content"

export default function ManageUsersPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-5xl font-bold text-secondary md:text-6xl">Manage Users</h1>
            <Link href="/dashboard/admin">
              <Button variant="outline" className="text-lg bg-transparent">
                Back to Dashboard
              </Button>
            </Link>
          </div>

          <Suspense fallback={<div>Loading users...</div>}>
            <ManageUsersContent />
          </Suspense>
        </div>
      </main>
      <Footer />
      <WhatsappButton />
    </div>
  )
}
