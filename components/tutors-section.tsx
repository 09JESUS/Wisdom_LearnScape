import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const tutors = [
  {
    name: "Sarah Ndlovu",
    bio: "I have a passion for Mathematics and a proud background in engineering. Seeing my learners grow and succeed has been rewarding, and I strive to make abstract concepts more accessible for my students.",
    image: "/images/screenshot-29-12-2025-91246.jpeg",
  },
  {
    name: "David Le Roux",
    bio: "Teaching is more than a job for me, it's a calling. My goal is to inspire young minds to love the sciences and to think critically about the world. I have over ten years of experience in education.",
    image: "/images/screenshot-29-12-2025-91246.jpeg",
  },
  {
    name: "Phumi Nkosi",
    bio: "Education has the power to uplift and transform. I am dedicated to partnering with my students to provide them with the support and encouragement they need to reach their full potential.",
    image: "/images/screenshot-29-12-2025-91246.jpeg",
  },
]

export function TutorsSection() {
  return (
    <section className="border-t bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Get to know some tutors
          </h2>
          <p className="mb-12 text-pretty text-lg leading-relaxed text-muted-foreground">
            Meet the dedicated professionals committed to your academic success.
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {tutors.map((tutor, index) => (
              <Card key={index} className="border-border/50 bg-card transition-shadow hover:shadow-md">
                <CardContent className="p-0">
                  <div className="relative aspect-square overflow-hidden rounded-t-lg bg-muted">
                    <Image
                      src={`/placeholder.svg?height=400&width=400&query=professional+tutor+portrait`}
                      alt={tutor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-3 text-xl font-bold text-foreground">{tutor.name}</h3>
                    <p className="leading-relaxed text-muted-foreground">{tutor.bio}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
