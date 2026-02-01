"use client"

import type React from "react"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Search, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// Mock data - replace with actual database queries
const mockTutors = [
  {
    id: 1,
    name: "David Le Roux",
    email: "david@wisdomlearnscape.co.za",
    subject: "Mathematics",
    profilePicture: "/images/screenshot-29-12-2025-91246.jpeg",
    lastMessage: "Great work on your last assignment!",
    lastMessageTime: "2 hours ago",
    unreadCount: 1,
  },
  {
    id: 2,
    name: "Sarah Ndlovu",
    email: "sarah@wisdomlearnscape.co.za",
    subject: "Physical Sciences",
    profilePicture: "/images/screenshot-29-12-2025-91246.jpeg",
    lastMessage: "Don't forget about tomorrow's session",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
  },
]

const mockMessages = [
  {
    id: 1,
    senderId: 1,
    senderName: "David Le Roux",
    message: "Hi! How are you finding the calculus topics we covered last week?",
    timestamp: "2:15 PM",
    isMe: false,
  },
  {
    id: 2,
    senderId: "learner",
    senderName: "You",
    message: "Hi Mr. Le Roux! I'm understanding most of it, but I'm still struggling with the chain rule.",
    timestamp: "2:18 PM",
    isMe: true,
  },
  {
    id: 3,
    senderId: 1,
    senderName: "David Le Roux",
    message:
      "That's completely normal! The chain rule takes practice. I've prepared some extra exercises for you. Would you like me to go through them in our next session?",
    timestamp: "2:20 PM",
    isMe: false,
  },
  {
    id: 4,
    senderId: "learner",
    senderName: "You",
    message: "Yes please! That would be really helpful.",
    timestamp: "2:22 PM",
    isMe: true,
  },
  {
    id: 5,
    senderId: 1,
    senderName: "David Le Roux",
    message: "Great work on your last assignment!",
    timestamp: "2:25 PM",
    isMe: false,
  },
]

export function LearnerMessagesContent() {
  const [selectedTutor, setSelectedTutor] = useState(mockTutors[0])
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [showTutorList, setShowTutorList] = useState(true)

  const filteredTutors = mockTutors.filter(
    (tutor) =>
      tutor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutor.subject.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        senderId: "learner",
        senderName: "You",
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isMe: true,
      }
      setMessages([...messages, message])
      setNewMessage("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <main className="flex-1 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center gap-4">
          <Link href="/dashboard/learner">
            <Button variant="outline" size="lg" className="text-lg bg-transparent">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-secondary md:text-5xl">Messages</h1>
        </div>

        <Card className="border-2 shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-[350px_1fr] h-[700px]">
            {/* Tutor List */}
            <div className={`border-r bg-muted/20 flex flex-col ${!showTutorList && "hidden md:flex"}`}>
              <CardHeader className="border-b bg-background">
                <CardTitle className="text-2xl">My Tutors</CardTitle>
                <div className="relative mt-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="Search tutors..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 text-lg h-12"
                  />
                </div>
              </CardHeader>
              <div className="flex-1 overflow-y-auto">
                {filteredTutors.map((tutor) => (
                  <button
                    key={tutor.id}
                    onClick={() => {
                      setSelectedTutor(tutor)
                      setShowTutorList(false)
                    }}
                    className={`w-full p-4 flex items-start gap-3 hover:bg-muted/50 transition-colors text-left border-b ${
                      selectedTutor.id === tutor.id ? "bg-muted" : ""
                    }`}
                  >
                    <Avatar className="h-12 w-12 flex-shrink-0">
                      <AvatarImage src={tutor.profilePicture || "/placeholder.svg"} alt={tutor.name} />
                      <AvatarFallback className="text-lg">
                        {tutor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-lg truncate">{tutor.name}</h3>
                        <span className="text-sm text-muted-foreground flex-shrink-0 ml-2">
                          {tutor.lastMessageTime}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{tutor.subject}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground truncate">{tutor.lastMessage}</p>
                        {tutor.unreadCount > 0 && <Badge className="ml-2 flex-shrink-0">{tutor.unreadCount}</Badge>}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className={`flex flex-col ${showTutorList && "hidden md:flex"}`}>
              {/* Chat Header */}
              <div className="border-b bg-background p-4 flex items-center gap-3">
                <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setShowTutorList(true)}>
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedTutor.profilePicture || "/placeholder.svg"} alt={selectedTutor.name} />
                  <AvatarFallback>
                    {selectedTutor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{selectedTutor.name}</h2>
                  <p className="text-sm text-muted-foreground">{selectedTutor.subject} Tutor</p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-muted/10">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
                    <div className={`flex gap-3 max-w-[80%] ${msg.isMe ? "flex-row-reverse" : "flex-row"}`}>
                      <Avatar className="h-10 w-10 flex-shrink-0">
                        {msg.isMe ? (
                          <AvatarFallback className="bg-secondary text-secondary-foreground">L</AvatarFallback>
                        ) : (
                          <>
                            <AvatarImage
                              src={selectedTutor.profilePicture || "/placeholder.svg"}
                              alt={msg.senderName}
                            />
                            <AvatarFallback>
                              {msg.senderName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </>
                        )}
                      </Avatar>
                      <div>
                        <div
                          className={`rounded-2xl px-4 py-3 ${
                            msg.isMe
                              ? "bg-primary text-primary-foreground rounded-tr-sm"
                              : "bg-background border-2 rounded-tl-sm"
                          }`}
                        >
                          <p className="text-base leading-relaxed">{msg.message}</p>
                        </div>
                        <p className={`text-xs text-muted-foreground mt-1 ${msg.isMe ? "text-right" : "text-left"}`}>
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="border-t bg-background p-4">
                <div className="flex gap-3">
                  <Textarea
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="min-h-[60px] max-h-[120px] text-lg resize-none"
                    rows={1}
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="lg"
                    className="h-[60px] px-6 flex-shrink-0"
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Press Enter to send, Shift+Enter for new line</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </main>
  )
}
