import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsappButton } from "@/components/whatsapp-button"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"

export default function RequestPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <h1 className="mb-4 text-center text-5xl font-bold text-secondary md:text-6xl">
              Request Individual Sessions
            </h1>
            <p className="mb-12 text-center text-xl text-muted-foreground md:text-2xl">
              This feature lets you personalise your learning by selecting your subject, tutor, topic, and the number of
              sessions required to achieve your goals.
            </p>

            <div className="mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-6 w-6 -translate-y-1/2 text-muted-foreground" />
                <Input type="text" placeholder="Search" className="h-16 border-2 border-primary pl-14 text-xl" />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-2 border-secondary transition-shadow hover:shadow-lg">
                <CardContent className="p-8 text-center">
                  <h2 className="mb-3 text-4xl font-bold text-secondary">Mathematics</h2>
                  <p className="mb-6 text-2xl text-muted-foreground">Grade 12</p>
                  <Link href="/tutors?subject=mathematics">
                    <Button className="w-full text-lg" size="lg">
                      View all available tutors
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border-2 border-secondary transition-shadow hover:shadow-lg">
                <CardContent className="p-8 text-center">
                  <h2 className="mb-3 text-4xl font-bold text-secondary">Science</h2>
                  <p className="mb-6 text-2xl text-muted-foreground">Grade 12</p>
                  <Link href="/tutors?subject=science">
                    <Button className="w-full text-lg" size="lg">
                      View all available tutors
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsappButton />
    </div>
  )
}
