import Link from "next/link"
import { BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="h-10 w-10 text-primary" strokeWidth={2.5} />
          <span className="text-2xl font-bold text-foreground">
            WISDOM <span className="text-primary">LEARNSCAPE</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/dashboard/learner"
            className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            href="/contact"
            className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Contact Us
          </Link>
          <Link
            href="/become-tutor"
            className="text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Becoming a Tutor
          </Link>
          <Button variant="default" size="lg" asChild className="text-lg">
            <Link href="/login">Log In</Link>
          </Button>
        </nav>

        <Button variant="ghost" size="sm" className="md:hidden text-lg">
          Menu
        </Button>
      </div>
    </header>
  )
}
