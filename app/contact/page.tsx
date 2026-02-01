"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsappButton } from "@/components/whatsapp-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Thank you for contacting us! We will get back to you soon.")
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4">
          <h1 className="mb-6 text-center text-5xl font-bold text-secondary md:text-6xl">Contact Us</h1>
          <p className="mb-12 text-center text-xl text-muted-foreground md:text-2xl">
            We'd love to hear from you. Get in touch with us today!
          </p>

          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-3xl">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-lg">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="mt-2 text-lg h-12"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-lg">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="mt-2 text-lg h-12"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-lg">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+27 12 345 6789"
                      className="mt-2 text-lg h-12"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-lg">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is this about?"
                      className="mt-2 text-lg h-12"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-lg">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you"
                      className="mt-2 text-lg min-h-32"
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full text-lg" size="lg">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="border-2">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <Mail className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-2xl font-bold text-secondary mb-2">Email</h3>
                      <p className="text-lg text-muted-foreground">info@wisdomlearnscape.co.za</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <Phone className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-2xl font-bold text-secondary mb-2">Phone</h3>
                      <p className="text-lg text-muted-foreground">062 617 1130</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-2xl font-bold text-secondary mb-2">Address</h3>
                      <p className="text-lg text-muted-foreground">
                        1 Taylor Place
                        <br />
                        Douglas, East London, 2191
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 bg-primary/5">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-secondary mb-4">Office Hours</h3>
                  <div className="space-y-2 text-lg text-muted-foreground">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 9:00 AM - 2:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
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
