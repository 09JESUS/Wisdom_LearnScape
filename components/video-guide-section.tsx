import { Card } from "@/components/ui/card"
import { Play } from "lucide-react"

export function VideoGuideSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Discover How We Help You Succeed
          </h2>
          <p className="mb-12 text-pretty text-lg leading-relaxed text-muted-foreground">
            Watch this guide to learn about the transformative programs and support we offer to help you thrive
            academically and personally.
          </p>

          <Card className="group relative overflow-hidden bg-muted/50">
            <div className="aspect-video w-full bg-gradient-to-br from-primary/20 to-accent/20">
              <div className="flex h-full items-center justify-center">
                <button className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110">
                  <Play className="ml-1 h-8 w-8" fill="currentColor" />
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
