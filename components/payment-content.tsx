"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useSearchParams, useRouter } from "next/navigation"
import { useState } from "react"

export function PaymentContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const plan = searchParams.get("plan") || "standard"
  const subject = searchParams.get("subject") || "Mathematics"

  const [bankingDetails, setBankingDetails] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    cardholderName: "",
    agreeToTerms: false,
  })

  const [depositDetails, setDepositDetails] = useState({
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    cardholderName: "",
    agreeToTerms: false,
  })

  const [subscriptionComplete, setSubscriptionComplete] = useState(false)

  const autoAssignToGroup = async (learnerId: number, planType: string, subject: string, grade: number) => {
    console.log("[v0] Auto-assigning learner to group:", { learnerId, planType, subject, grade })

    // For Personalized plan (R1450), create a dedicated 1-on-1 group
    if (planType === "personalized") {
      const personalizedGroup = {
        name: `${subject} Grade ${grade} - Personalized Session`,
        subject: subject,
        grade: grade,
        planId: 3, // Personalized plan ID
        tutorId: null, // Will be assigned by admin based on availability
        maxMembers: 1,
        groupType: "personalized",
      }
      console.log("[v0] Creating personalized 1-on-1 group:", personalizedGroup)
      // INSERT INTO learning_groups (name, subject, grade, plan_id, tutor_id, max_members, group_type)
      // VALUES (?, ?, ?, 3, NULL, 1, 'personalized')

      // Add learner to their personal group
      // INSERT INTO group_members (group_id, learner_id) VALUES (LAST_INSERT_ID(), ?)

      console.log("[v0] Personalized group created - admin will assign dedicated tutor")
    } else if (planType === "premium") {
      // For Premium plan (R765), find/create group with max 10 learners
      console.log("[v0] Finding Premium group (max 10 members) for:", { subject, grade })
      // SELECT id FROM learning_groups
      // WHERE subject = ? AND grade = ? AND plan_id = 2
      // AND current_members < 10 AND status = 'active'
      // ORDER BY current_members ASC LIMIT 1

      // INSERT INTO group_members (group_id, learner_id) VALUES (?, ?)
      // UPDATE learning_groups SET current_members = current_members + 1 WHERE id = ?

      console.log("[v0] Learner assigned to Premium group with 2 weekly sessions")
    } else {
      // For Standard plan (R415), find/create group with max 20 learners
      console.log("[v0] Finding Standard group (max 20 members) for:", { subject, grade })
      // SELECT id FROM learning_groups
      // WHERE subject = ? AND grade = ? AND plan_id = 1
      // AND current_members < 20 AND status = 'active'
      // ORDER BY current_members ASC LIMIT 1

      // INSERT INTO group_members (group_id, learner_id) VALUES (?, ?)
      // UPDATE learning_groups SET current_members = current_members + 1 WHERE id = ?

      console.log("[v0] Learner assigned to Standard group with 1 weekly session")
    }

    // Send welcome message to group chat
    const welcomeMessage = {
      groupId: 1, // Will be the created/assigned group ID
      senderId: 0, // System message
      message: `Welcome to the ${subject} learning group! ${planType === "personalized" ? "Your dedicated tutor will be assigned shortly." : "Your tutor will introduce themselves and share the schedule."}`,
      messageType: "system",
    }
    console.log("[v0] Sending welcome message:", welcomeMessage)
    // INSERT INTO group_chat_messages (group_id, sender_id, message, message_type)
    // VALUES (?, 0, ?, 'system')
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()

    console.log("[v0] Processing subscription payment for plan:", plan)

    // Get registration data
    const registrationData = sessionStorage.getItem("registrationData")
    if (registrationData) {
      const data = JSON.parse(registrationData)
      console.log("[v0] Registration data:", data)

      // Create subscription record in database
      const subscriptionRecord = {
        parentId: 1, // Will be fetched from users table
        planId: plan === "standard" ? 1 : plan === "premium" ? 2 : 3,
        status: "active",
        paymentStatus: "paid",
        startDate: new Date().toISOString(),
      }
      console.log("[v0] Creating subscription:", subscriptionRecord)
      // INSERT INTO subscriptions
    }

    setSubscriptionComplete(true)
  }

  const handlePayDeposit = async (e: React.FormEvent) => {
    e.preventDefault()

    console.log("[v0] Processing deposit payment")

    const registrationData = sessionStorage.getItem("registrationData")
    if (registrationData) {
      const data = JSON.parse(registrationData)
      sessionStorage.setItem("learnerName", data.learnerData.name + " " + data.learnerData.surname)

      // Create payment transaction record
      const paymentTransaction = {
        parentId: 1,
        amount: 100, // Registration fee
        transactionType: "registration",
        paymentMethod: "card",
        status: "completed",
      }
      console.log("[v0] Creating payment transaction:", paymentTransaction)
      // INSERT INTO payment_transactions

      // Auto-assign learner to appropriate group
      const learnerId = 1 // Will be fetched from database
      const grade = 12 // From registration data
      await autoAssignToGroup(learnerId, plan, subject, grade)

      // Create notification for parent and learner
      const notifications = [
        {
          userId: 1, // Parent user ID
          type: "announcement",
          title: "Registration Complete!",
          message: `Welcome to Wisdom Learnscape! Your child has been assigned to their ${subject} group.`,
        },
        {
          userId: 2, // Learner user ID
          type: "announcement",
          title: "Welcome to Your Learning Group!",
          message: `You've been added to ${subject} Grade ${grade}. Check your Groups page to meet your tutor and classmates.`,
        },
      ]
      console.log("[v0] Creating notifications:", notifications)
      // INSERT INTO notifications

      // Send WhatsApp/SMS/Email confirmations
      console.log("[v0] Sending confirmation via WhatsApp, SMS, and Email")
    }

    router.push("/confirmation")
  }

  return (
    <main className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <h1 className="mb-4 text-center text-5xl font-bold text-foreground md:text-6xl">Payment Details</h1>
          <p className="mb-12 text-center text-xl text-muted-foreground">
            Complete payment to join your {subject} learning group
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-2 p-8">
              <h2 className="mb-6 text-3xl font-bold text-foreground">BANKING DETAILS</h2>
              <p className="mb-4 text-lg text-muted-foreground">Monthly Subscription Payment</p>

              <form onSubmit={handleSubscribe} className="space-y-6">
                <div>
                  <Label htmlFor="bank-card" className="text-lg font-semibold">
                    Card Number
                  </Label>
                  <Input
                    id="bank-card"
                    value={bankingDetails.cardNumber}
                    onChange={(e) => setBankingDetails({ ...bankingDetails, cardNumber: e.target.value })}
                    required
                    disabled={subscriptionComplete}
                    className="mt-2 text-lg h-12"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="bank-exp" className="text-lg font-semibold">
                      Expiration Date
                    </Label>
                    <Input
                      id="bank-exp"
                      placeholder="MM/YY"
                      value={bankingDetails.expirationDate}
                      onChange={(e) => setBankingDetails({ ...bankingDetails, expirationDate: e.target.value })}
                      required
                      disabled={subscriptionComplete}
                      className="mt-2 text-lg h-12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bank-cvv" className="text-lg font-semibold">
                      CVV
                    </Label>
                    <Input
                      id="bank-cvv"
                      value={bankingDetails.cvv}
                      onChange={(e) => setBankingDetails({ ...bankingDetails, cvv: e.target.value })}
                      required
                      disabled={subscriptionComplete}
                      className="mt-2 text-lg h-12"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="bank-name" className="text-lg font-semibold">
                    Cardholder Name
                  </Label>
                  <Input
                    id="bank-name"
                    value={bankingDetails.cardholderName}
                    onChange={(e) => setBankingDetails({ ...bankingDetails, cardholderName: e.target.value })}
                    required
                    disabled={subscriptionComplete}
                    className="mt-2 text-lg h-12"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="bank-terms"
                    checked={bankingDetails.agreeToTerms}
                    onCheckedChange={(checked) =>
                      setBankingDetails({ ...bankingDetails, agreeToTerms: checked === true })
                    }
                    disabled={subscriptionComplete}
                  />
                  <Label htmlFor="bank-terms" className="text-lg">
                    I agree to the subscription terms
                  </Label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-xl"
                  disabled={subscriptionComplete || !bankingDetails.agreeToTerms}
                >
                  {subscriptionComplete ? "✓ Subscription Complete" : "Subscribe"}
                </Button>
              </form>
            </Card>

            <Card className="border-2 p-8">
              <h2 className="mb-6 text-3xl font-bold text-foreground">PAY DEPOSIT</h2>
              <p className="mb-4 text-lg text-muted-foreground">One-time Registration Fee</p>

              <form onSubmit={handlePayDeposit} className="space-y-6">
                <div>
                  <Label htmlFor="deposit-card" className="text-lg font-semibold">
                    Card Number
                  </Label>
                  <Input
                    id="deposit-card"
                    value={depositDetails.cardNumber}
                    onChange={(e) => setDepositDetails({ ...depositDetails, cardNumber: e.target.value })}
                    required
                    disabled={!subscriptionComplete}
                    className="mt-2 text-lg h-12"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="deposit-exp" className="text-lg font-semibold">
                      Expiration Date
                    </Label>
                    <Input
                      id="deposit-exp"
                      placeholder="MM/YY"
                      value={depositDetails.expirationDate}
                      onChange={(e) => setDepositDetails({ ...depositDetails, expirationDate: e.target.value })}
                      required
                      disabled={!subscriptionComplete}
                      className="mt-2 text-lg h-12"
                    />
                  </div>
                  <div>
                    <Label htmlFor="deposit-cvv" className="text-lg font-semibold">
                      CVV
                    </Label>
                    <Input
                      id="deposit-cvv"
                      value={depositDetails.cvv}
                      onChange={(e) => setDepositDetails({ ...depositDetails, cvv: e.target.value })}
                      required
                      disabled={!subscriptionComplete}
                      className="mt-2 text-lg h-12"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="deposit-name" className="text-lg font-semibold">
                    Cardholder Name
                  </Label>
                  <Input
                    id="deposit-name"
                    value={depositDetails.cardholderName}
                    onChange={(e) => setDepositDetails({ ...depositDetails, cardholderName: e.target.value })}
                    required
                    disabled={!subscriptionComplete}
                    className="mt-2 text-lg h-12"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="deposit-terms"
                    checked={depositDetails.agreeToTerms}
                    onCheckedChange={(checked) =>
                      setDepositDetails({ ...depositDetails, agreeToTerms: checked === true })
                    }
                    disabled={!subscriptionComplete}
                  />
                  <Label htmlFor="deposit-terms" className="text-lg">
                    I agree to the terms
                  </Label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-xl"
                  disabled={!subscriptionComplete || !depositDetails.agreeToTerms}
                >
                  Pay & Complete Registration
                </Button>
              </form>
            </Card>
          </div>

          {!subscriptionComplete && (
            <div className="mt-8 rounded-lg bg-muted p-6">
              <p className="text-center text-lg text-muted-foreground">
                📋 <strong>Step 1:</strong> Complete the subscription payment first
                <br />
                <strong>Step 2:</strong> Then proceed with the registration deposit
                <br />✨ After payment, you'll be automatically added to your learning group!
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
