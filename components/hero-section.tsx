import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-b from-background to-muted/20 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-block rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-lg font-medium text-primary">
            Grade 10 - 12
          </div>

          <h1 className="mb-6 text-balance font-bold leading-tight tracking-tight text-foreground">
            <span className="block text-7xl md:text-9xl">Dream. Do. Dominate.</span>
          </h1>

          <p className="mb-10 text-pretty text-2xl leading-relaxed text-muted-foreground md:text-3xl">
            Unlock your full potential with a learning experience designed around{" "}
            <span className="font-semibold text-foreground">YOU</span>. A supportive space to learn, improve, achieve,
            and feel proud of your progress.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/explore" className="w-full sm:w-auto">
              <Button size="lg" className="group w-full text-lg">
                Explore our tutorial services
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/request" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent text-lg">
                Request an individual session
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
