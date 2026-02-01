"use client"

import type React from "react"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsappButton } from "@/components/whatsapp-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Paperclip, Users } from "lucide-react"
import { useParams } from "next/navigation"
import Link from "next/link"

export default function GroupChatPage() {
  const params = useParams()
  const [message, setMessage] = useState("")

  // Mock data - will be fetched from database
  const group = {
    id: params.id,
    name: "Mathematics Grade 12 - Premium Group A",
    memberCount: 8,
  }

  const messages = [
    {
      id: 1,
      sender: "David Le Roux",
      senderRole: "tutor",
      message: "Good morning everyone! Today we'll be covering calculus. Please review the notes I shared yesterday.",
      time: "09:00 AM",
      avatar: "/images/screenshot-29-12-2025-91246.jpeg",
    },
    {
      id: 2,
      sender: "You",
      senderRole: "learner",
      message: "Thank you! I have a question about the homework from last week.",
      time: "09:15 AM",
    },
    {
      id: 3,
      sender: "David Le Roux",
      senderRole: "tutor",
      message: "Of course! Please share your question and I'll help you during our session today.",
      time: "09:20 AM",
      avatar: "/images/screenshot-29-12-2025-91246.jpeg",
    },
  ]

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Sending message:", message)
    // Here you would send to database
    setMessage("")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Group Header */}
          <Card className="mb-6 border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-3xl mb-2">{group.name}</CardTitle>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-5 w-5" />
                    <span className="text-lg">{group.memberCount} members</span>
                  </div>
                </div>
                <Link href={`/dashboard/learner/groups/${group.id}/members`}>
                  <Button variant="outline" size="lg" className="text-base bg-transparent">
                    View Members
                  </Button>
                </Link>
              </div>
            </CardHeader>
          </Card>

          {/* Chat Area */}
          <Card className="border-2">
            <CardContent className="p-0">
              {/* Messages */}
              <div className="h-[500px] overflow-y-auto p-6 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-3 ${msg.sender === "You" ? "flex-row-reverse" : ""}`}>
                    {msg.sender !== "You" && (
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={msg.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{msg.sender[0]}</AvatarFallback>
                      </Avatar>
                    )}
                    <div className={`max-w-[70%] ${msg.sender === "You" ? "items-end" : ""}`}>
                      <div className="flex items-center gap-2 mb-1">
                        {msg.sender !== "You" && (
                          <>
                            <span className="text-base font-semibold">{msg.sender}</span>
                            {msg.senderRole === "tutor" && (
                              <Badge variant="secondary" className="text-xs">
                                Tutor
                              </Badge>
                            )}
                          </>
                        )}
                      </div>
                      <div
                        className={`p-4 rounded-lg text-base ${
                          msg.sender === "You" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        {msg.message}
                      </div>
                      <span className="text-sm text-muted-foreground mt-1">{msg.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="border-t p-4">
                <form onSubmit={handleSendMessage} className="flex gap-3">
                  <Button type="button" variant="outline" size="icon" className="h-12 w-12 bg-transparent">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="text-lg h-12"
                  />
                  <Button type="submit" size="icon" className="h-12 w-12">
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
      <WhatsappButton />
    </div>
  )
}
