import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Thabo Malema",
    grade: "Grade 12",
    content:
      "Wisdom Learnscape transformed my approach to learning. The tutors don't just teach—they inspire. I went from struggling in Maths to scoring in the 80s!",
    rating: 5,
  },
  {
    name: "Lerato Sibeko",
    grade: "Grade 11",
    content:
      "The support here is incredible. They prepared me not just for exams, but for life. I feel confident about my university applications now.",
    rating: 5,
  },
  {
    name: "Mandla Dlamini",
    grade: "Grade 10",
    content:
      "I was nervous about high school, but Wisdom Learnscape made the transition smooth. The mentorship program helped me build real confidence.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  return (
    <section className="border-t bg-muted/30 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            What Our Learners Say
          </h2>
          <p className="mb-12 text-pretty text-lg leading-relaxed text-muted-foreground">
            Real stories from students who've transformed their academic journey with us.
          </p>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="relative border-border/50 bg-card transition-shadow hover:shadow-md">
                <CardContent className="p-6">
                  <Quote className="mb-4 h-8 w-8 text-primary/30" />
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="mb-6 text-left leading-relaxed text-card-foreground">"{testimonial.content}"</p>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.grade}</p>
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
