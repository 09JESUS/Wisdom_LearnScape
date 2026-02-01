import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function ExplorePage() {
  const subjects = [
    {
      id: "mathematics",
      name: "Mathematics",
      grade: "Grade 12",
    },
    {
      id: "physical-sciences",
      name: "Physical Sciences",
      grade: "Grade 12",
    },
  ]

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <h1 className="mb-6 text-center text-4xl font-bold text-foreground md:text-5xl">Select Your Subject</h1>

            <p className="mb-12 text-center text-xl leading-relaxed text-muted-foreground md:text-2xl">
              This gives you the opportunity to join the program full-time, with a simple monthly subscription that
              unlocks weekly tutorial sessions, high-quality study content and so much more — all designed to ensure
              you're fully equipped for every test and exam.
            </p>

            <div className="grid gap-8 md:grid-cols-2">
              {subjects.map((subject) => (
                <Card
                  key={subject.id}
                  className="flex flex-col items-center justify-center border-2 border-foreground p-12 text-center transition-all hover:border-primary hover:shadow-lg"
                >
                  <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">{subject.name}</h2>
                  <p className="mb-8 text-2xl text-muted-foreground">{subject.grade}</p>
                  <Link href={`/pricing?subject=${subject.id}`} className="w-full">
                    <Button size="lg" className="w-full text-lg">
                      Select the monthly subscription plan
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
