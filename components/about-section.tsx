import { Card, CardContent } from "@/components/ui/card"

export function AboutSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-balance text-center text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            About Us (Our Vision Our Goal)
          </h2>

          <Card className="border-border/50 bg-card">
            <CardContent className="p-8 md:p-12">
              <div className="space-y-8">
                <div>
                  <p className="mb-4 text-lg leading-relaxed text-card-foreground">
                    Wisdom Learnscape isn't just another academic support program — It's a transformative journey
                    designed to prepare high school students not only for exams, but for life. Rooted in a powerful
                    vision of holistic, future-focused learning, Wisdom Learnscape bridges the gap between high school
                    and university in revolutionary ways.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-bold text-foreground">Reimagining the High School Experience</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    At academic achievement alone is not enough—students need to understand how a{" "}
                    <span className="font-semibold italic text-foreground">why learn</span>, and what lies ahead.
                    Through uniquely structured tutorials that simulate university-style learning environments, learners
                    become comfortable with self-directed study, time management, and academic independence—long before
                    they ever set foot on a university campus. Learners don't just survive first year—they—thrive,
                    because we've already developed first year—
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-bold text-foreground">Supporting the Whole Person</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Wisdom Learnscape goes beyond academic support—it's built on the principlelic that true education
                    must develop <span className="font-semibold italic text-foreground">*the—whole</span> person.
                    Amental wellness support, including workshops on stress management, confidence building, and
                    mindfulness. Personal mentorship where students are paired with mentors who not only help academic
                    help and motivation letters, and preparing for interviews and entrance tests. Peer-to-peer networks
                    that build community and accountability.
                  </p>
                </div>

                <div>
                  <h3 className="mb-3 text-xl font-bold text-foreground">A Vision that Transforms</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    Wisdom Learnscape envisions a South Africa where every young person, regardless of background, steps
                    into higher education—and into life—with confidence, clarity, and purpose. It's{" "}
                    <span className="font-semibold italic text-foreground">not just</span> about results on a report
                    card, it's about raising a generation that is mentally strong, socially aware, academically
                    equipped, and deeply empowered. In every learner it serves, Wisdom Learnscape ignites potential—not
                    just for success in school.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
