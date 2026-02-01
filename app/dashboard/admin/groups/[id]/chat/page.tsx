"use client"

import type React from "react"
import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsappButton } from "@/components/whatsapp-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Paperclip, Users, ArrowLeft, Pin } from "lucide-react"
import { useParams } from "next/navigation"
import Link from "next/link"

export default function AdminGroupChatPage() {
  const params = useParams()
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState<"text" | "announcement">("text")

  // Mock data - will be fetched from database
  const group = {
    id: params.id,
    name: "Mathematics Grade 12 - Premium Group A",
    memberCount: 8,
    tutor: "David Le Roux",
  }

  const messages = [
    {
      id: 1,
      sender: "David Le Roux",
      senderRole: "tutor",
      message: "Good morning everyone! Today we'll be covering calculus.",
      time: "09:00 AM",
      isPinned: false,
    },
    {
      id: 2,
      sender: "Admin",
      senderRole: "admin",
      message: "Reminder: Monthly fees are due by the end of this week. Please ensure payment to avoid disruption.",
      time: "09:30 AM",
      messageType: "announcement",
      isPinned: true,
    },
    {
      id: 3,
      sender: "Student A",
      senderRole: "learner",
      message: "Thank you! I have a question about yesterday's homework.",
      time: "09:45 AM",
      isPinned: false,
    },
  ]

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Admin sending message:", { message, messageType })
    // Here you would send to group_chat_messages table
    setMessage("")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-5xl">
          <Link
            href="/dashboard/admin/groups"
            className="inline-flex items-center gap-2 text-lg text-primary hover:underline mb-6"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Groups
          </Link>

          {/* Group Header */}
          <Card className="mb-6 border-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-3xl mb-2">{group.name}</CardTitle>
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      <span className="text-lg">{group.memberCount} members</span>
                    </div>
                    <span className="text-lg">Tutor: {group.tutor}</span>
                  </div>
                </div>
                <Badge variant="secondary" className="text-base">
                  Admin View
                </Badge>
              </div>
            </CardHeader>
          </Card>

          {/* Chat Area */}
          <Card className="border-2">
            <CardContent className="p-0">
              {/* Messages */}
              <div className="h-[500px] overflow-y-auto p-6 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className="relative">
                    {msg.isPinned && (
                      <div className="flex items-center gap-2 mb-2 text-sm text-muted-foreground">
                        <Pin className="h-4 w-4" />
                        <span>Pinned Message</span>
                      </div>
                    )}
                    <div className="flex gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{msg.sender[0]}</AvatarFallback>
                      </Avatar>
                      <div className="max-w-[70%]">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-base font-semibold">{msg.sender}</span>
                          <Badge
                            variant={msg.senderRole === "admin" ? "default" : "secondary"}
                            className="text-xs capitalize"
                          >
                            {msg.senderRole}
                          </Badge>
                        </div>
                        <div
                          className={`p-4 rounded-lg text-base ${
                            msg.messageType === "announcement"
                              ? "bg-yellow-100 dark:bg-yellow-900/20 border-2 border-yellow-500"
                              : "bg-muted"
                          }`}
                        >
                          {msg.message}
                        </div>
                        <span className="text-sm text-muted-foreground mt-1">{msg.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="border-t p-4 space-y-3">
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={messageType === "text" ? "default" : "outline"}
                    onClick={() => setMessageType("text")}
                    className="text-base"
                  >
                    Normal Message
                  </Button>
                  <Button
                    type="button"
                    variant={messageType === "announcement" ? "default" : "outline"}
                    onClick={() => setMessageType("announcement")}
                    className="text-base"
                  >
                    📢 Announcement
                  </Button>
                </div>
                <form onSubmit={handleSendMessage} className="flex gap-3">
                  <Button type="button" variant="outline" size="icon" className="h-12 w-12 bg-transparent">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={
                      messageType === "announcement"
                        ? "Type an announcement (will be highlighted)..."
                        : "Type your message..."
                    }
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
