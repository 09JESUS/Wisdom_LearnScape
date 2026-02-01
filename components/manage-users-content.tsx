"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Mail, Phone, UserX, Edit } from "lucide-react"
import { useState } from "react"

export function ManageUsersContent() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data - replace with real database queries
  const users = [
    {
      id: 1,
      name: "Sarah Ndlovu",
      email: "sarah@example.com",
      phone: "0821234567",
      role: "Tutor",
      subject: "Mathematics",
      status: "Active",
    },
    {
      id: 2,
      name: "John Smith",
      email: "john@example.com",
      phone: "0827654321",
      role: "Learner",
      grade: "12",
      status: "Active",
    },
    {
      id: 3,
      name: "David Le Roux",
      email: "david@example.com",
      phone: "0835551234",
      role: "Tutor",
      subject: "Physical Sciences",
      status: "Active",
    },
    {
      id: 4,
      name: "Phumi Nkosi",
      email: "phumi@example.com",
      phone: "0842223344",
      role: "Tutor",
      subject: "Mathematics",
      status: "Active",
    },
    {
      id: 5,
      name: "Emily Johnson",
      email: "emily@example.com",
      phone: "0849876543",
      role: "Learner",
      grade: "11",
      status: "Inactive",
    },
  ]

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <>
      {/* Search Bar */}
      <Card className="mb-8 border-2">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by name or email..."
              className="pl-10 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Users List */}
      <div className="grid gap-6">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="border-2 transition-shadow hover:shadow-lg">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{user.name}</CardTitle>
                  <div className="mt-2 flex gap-2">
                    <Badge variant={user.role === "Tutor" ? "default" : "secondary"} className="text-sm">
                      {user.role}
                    </Badge>
                    <Badge variant={user.status === "Active" ? "default" : "outline"} className="text-sm">
                      {user.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm">
                    <UserX className="h-4 w-4 mr-2" />
                    Deactivate
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="text-lg">{user.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="text-lg">{user.phone}</span>
                </div>
                {user.role === "Tutor" && user.subject && (
                  <div className="text-lg">
                    <span className="font-semibold">Subject:</span> {user.subject}
                  </div>
                )}
                {user.role === "Learner" && user.grade && (
                  <div className="text-lg">
                    <span className="font-semibold">Grade:</span> {user.grade}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <Card className="border-2">
          <CardContent className="py-12 text-center">
            <p className="text-xl text-muted-foreground">No users found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </>
  )
}
