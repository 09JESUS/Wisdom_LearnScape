"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsappButton } from "@/components/whatsapp-button"
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
const mockStudents = [
  {
    id: 1,
    name: "Thabo Molefe",
    email: "thabo@example.com",
    subject: "Mathematics",
    profilePicture: "/diverse-students-studying.png",
    lastMessage: "Thank you for the help!",
    lastMessageTime: "10:30 AM",
    unreadCount: 2,
  },
  {
    id: 2,
    name: "Lerato Dlamini",
    email: "lerato@example.com",
    subject: "Physical Sciences",
    profilePicture: "/diverse-students-studying.png",
    lastMessage: "I have a question about calculus",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
  },
  {
    id: 3,
    name: "Sipho Nkosi",
    email: "sipho@example.com",
    subject: "Mathematics",
    profilePicture: "/diverse-students-studying.png",
    lastMessage: "When is the next session?",
    lastMessageTime: "2 days ago",
    unreadCount: 1,
  },
]

const mockMessages = [
  {
    id: 1,
    senderId: 1,
    senderName: "Thabo Molefe",
    message: "Hi, I'm struggling with question 3 from the homework",
    timestamp: "10:15 AM",
    isMe: false,
  },
  {
    id: 2,
    senderId: "tutor",
    senderName: "You",
    message: "Hi Thabo! Let me help you with that. Which part specifically are you finding difficult?",
    timestamp: "10:18 AM",
    isMe: true,
  },
  {
    id: 3,
    senderId: 1,
    senderName: "Thabo Molefe",
    message: "I don't understand how to factorize the expression",
    timestamp: "10:20 AM",
    isMe: false,
  },
  {
    id: 4,
    senderId: "tutor",
    senderName: "You",
    message:
      "Let's break it down step by step. First, look for common factors. In this case, you can factor out 2x from both terms.",
    timestamp: "10:25 AM",
    isMe: true,
  },
  {
    id: 5,
    senderId: 1,
    senderName: "Thabo Molefe",
    message: "Thank you for the help!",
    timestamp: "10:30 AM",
    isMe: false,
  },
]

export default function TutorMessagesPage() {
  const [selectedStudent, setSelectedStudent] = useState(mockStudents[0])
  const [messages, setMessages] = useState(mockMessages)
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [showStudentList, setShowStudentList] = useState(true)

  const filteredStudents = mockStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.subject.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        senderId: "tutor",
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
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center gap-4">
            <Link href="/dashboard/tutor">
              <Button variant="outline" size="lg" className="text-lg bg-transparent">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-secondary md:text-5xl">Messages</h1>
          </div>

          <Card className="border-2 shadow-xl overflow-hidden">
            <div className="grid md:grid-cols-[350px_1fr] h-[700px]">
              {/* Student List */}
              <div className={`border-r bg-muted/20 flex flex-col ${!showStudentList && "hidden md:flex"}`}>
                <CardHeader className="border-b bg-background">
                  <CardTitle className="text-2xl">Students</CardTitle>
                  <div className="relative mt-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Search students..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 text-lg h-12"
                    />
                  </div>
                </CardHeader>
                <div className="flex-1 overflow-y-auto">
                  {filteredStudents.map((student) => (
                    <button
                      key={student.id}
                      onClick={() => {
                        setSelectedStudent(student)
                        setShowStudentList(false)
                      }}
                      className={`w-full p-4 flex items-start gap-3 hover:bg-muted/50 transition-colors text-left border-b ${
                        selectedStudent.id === student.id ? "bg-muted" : ""
                      }`}
                    >
                      <Avatar className="h-12 w-12 flex-shrink-0">
                        <AvatarImage src={student.profilePicture || "/placeholder.svg"} alt={student.name} />
                        <AvatarFallback className="text-lg">
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-semibold text-lg truncate">{student.name}</h3>
                          <span className="text-sm text-muted-foreground flex-shrink-0 ml-2">
                            {student.lastMessageTime}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{student.subject}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground truncate">{student.lastMessage}</p>
                          {student.unreadCount > 0 && (
                            <Badge className="ml-2 flex-shrink-0">{student.unreadCount}</Badge>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Area */}
              <div className={`flex flex-col ${showStudentList && "hidden md:flex"}`}>
                {/* Chat Header */}
                <div className="border-b bg-background p-4 flex items-center gap-3">
                  <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setShowStudentList(true)}>
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={selectedStudent.profilePicture || "/placeholder.svg"}
                      alt={selectedStudent.name}
                    />
                    <AvatarFallback>
                      {selectedStudent.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{selectedStudent.name}</h2>
                    <p className="text-sm text-muted-foreground">{selectedStudent.subject}</p>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-muted/10">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
                      <div className={`flex gap-3 max-w-[80%] ${msg.isMe ? "flex-row-reverse" : "flex-row"}`}>
                        <Avatar className="h-10 w-10 flex-shrink-0">
                          {msg.isMe ? (
                            <AvatarFallback className="bg-primary text-primary-foreground">T</AvatarFallback>
                          ) : (
                            <>
                              <AvatarImage
                                src={selectedStudent.profilePicture || "/placeholder.svg"}
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
      <Footer />
      <WhatsappButton />
    </div>
  )
}
