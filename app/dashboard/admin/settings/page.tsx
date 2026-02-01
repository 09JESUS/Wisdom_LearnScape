"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { WhatsappButton } from "@/components/whatsapp-button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { UserPlus } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navigation />
      <main className="flex-1 py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-5xl font-bold text-secondary md:text-6xl">System Settings</h1>
            <Link href="/dashboard/admin">
              <Button variant="outline" className="text-lg bg-transparent">
                Back to Dashboard
              </Button>
            </Link>
          </div>

          {/* Admin Management */}
          <Card className="border-2 mb-6 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <UserPlus className="h-6 w-6 text-primary" />
                Admin Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg text-muted-foreground">
                Add new administrators to the system and generate unique access codes for them.
              </p>
              <Link href="/dashboard/admin/add-admin">
                <Button size="lg" className="text-lg">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Add New Admin
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* System Configuration */}
          <Card className="border-2 mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">System Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="system-name" className="text-lg">
                  System Name
                </Label>
                <Input id="system-name" defaultValue="Wisdom Learnscape" className="mt-2 text-lg" />
              </div>
              <div>
                <Label htmlFor="support-email" className="text-lg">
                  Support Email
                </Label>
                <Input
                  id="support-email"
                  type="email"
                  defaultValue="info@wisdomlearnscape.co.za"
                  className="mt-2 text-lg"
                />
              </div>
              <div>
                <Label htmlFor="support-phone" className="text-lg">
                  Support Phone
                </Label>
                <Input id="support-phone" type="tel" defaultValue="062 617 1130" className="mt-2 text-lg" />
              </div>
              <div>
                <Label htmlFor="whatsapp-number" className="text-lg">
                  WhatsApp Number
                </Label>
                <Input id="whatsapp-number" type="tel" defaultValue="0838576738" className="mt-2 text-lg" />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="border-2 mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-lg">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send email notifications to users</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-lg">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send SMS notifications to users</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-lg">WhatsApp Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send WhatsApp notifications to users</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* Session Settings */}
          <Card className="border-2 mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">Session Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="session-duration" className="text-lg">
                  Default Session Duration (minutes)
                </Label>
                <Input id="session-duration" type="number" defaultValue="90" className="mt-2 text-lg" />
              </div>
              <div>
                <Label htmlFor="max-group-size" className="text-lg">
                  Maximum Group Size
                </Label>
                <Input id="max-group-size" type="number" defaultValue="20" className="mt-2 text-lg" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-lg">Auto-approve Session Bookings</Label>
                  <p className="text-sm text-muted-foreground">Automatically approve learner session bookings</p>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button size="lg" className="text-lg px-8">
              Save All Settings
            </Button>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsappButton />
    </div>
  )
}
