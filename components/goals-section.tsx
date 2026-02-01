import { Card, CardContent } from "@/components/ui/card"
import { Target, Users, Sparkles } from "lucide-react"

const goals = [
  {
    number: "1",
    title: "High-Quality Tutoring",
    description:
      "We offer top-quality tutoring led by skilled, experienced tutors dedicated to helping every learner succeed. With clear guidance and personalized attention, learning becomes more effective.",
    icon: Target,
  },
  {
    number: "2",
    title: "Student-Centred Support",
    description:
      "This program is designed around you. We focus on your full learning journey, tailoring each lesson to your abilities while helping you build confidence, skills, and long-term success.",
    icon: Users,
  },
  {
    number: "3",
    title: "Stress-Free Academic Support",
    description:
      "Our program helps you navigate the journey to varsity with ease. From applying to universities and bursaries to crafting strong motivation letters, we provide comprehensive support.",
    icon: Sparkles,
  },
]

export function GoalsSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-primary md:text-4xl">
            The Ultimate Goals
          </h2>
          <p className="mb-12 text-pretty text-lg leading-relaxed text-muted-foreground">
            Our mission is to empower every learner with the tools, support, and confidence they need to excel.
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {goals.map((goal) => {
              const Icon = goal.icon
              return (
                <Card key={goal.number} className="border-border/50 bg-card transition-shadow hover:shadow-md">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        <span className="text-2xl font-bold">{goal.number}</span>
                      </div>
                    </div>
                    <Icon className="mx-auto mb-4 h-8 w-8 text-primary" />
                    <h3 className="mb-3 text-xl font-bold text-foreground">{goal.title}</h3>
                    <p className="leading-relaxed text-muted-foreground">{goal.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
