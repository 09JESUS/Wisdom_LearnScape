"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface Notification {
  id: number
  type: string
  title: string
  message: string
  link: string
  is_read: boolean
  created_at: string
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    // Fetch notifications from API
    fetchNotifications()

    // Poll for new notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchNotifications = async () => {
    // Mock data - replace with actual API call
    const mockNotifications: Notification[] = [
      {
        id: 1,
        type: "new_message",
        title: "New Message",
        message: "You have a new message from David Le Roux",
        link: "/dashboard/learner/messages",
        is_read: false,
        created_at: new Date().toISOString(),
      },
      {
        id: 2,
        type: "group_message",
        title: "New Group Message",
        message: "New message in Mathematics Grade 12 group",
        link: "/dashboard/learner/groups/1/chat",
        is_read: false,
        created_at: new Date().toISOString(),
      },
    ]

    setNotifications(mockNotifications)
    setUnreadCount(mockNotifications.filter((n) => !n.is_read).length)
  }

  const markAsRead = async (id: number) => {
    // Update notification as read in database
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)))
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-6 w-6" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-lg">Notifications</h3>
        </div>
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">No new notifications</div>
        ) : (
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="p-0">
                <Link
                  href={notification.link}
                  onClick={() => markAsRead(notification.id)}
                  className={`w-full p-4 hover:bg-muted ${!notification.is_read ? "bg-muted/50" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <p className="font-semibold text-base">{notification.title}</p>
                      <p className="text-sm text-muted-foreground">{notification.message}</p>
                    </div>
                    {!notification.is_read && <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-2" />}
                  </div>
                </Link>
              </DropdownMenuItem>
            ))}
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
