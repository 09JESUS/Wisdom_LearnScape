// Helper functions for automatic group assignment
// These functions handle the logic of assigning learners to appropriate groups

export interface GroupAssignmentData {
  learnerId: number
  planType: "standard" | "premium" | "personalized"
  subject: string
  grade: number
  parentId: number
}

export interface GroupAssignmentResult {
  groupId: number
  groupName: string
  tutorId: number
  tutorName: string
  success: boolean
  message: string
}

/**
 * Auto-assigns a learner to the appropriate group based on their subscription plan
 *
 * Logic:
 * - Standard Plan: Assigns to group with up to 20 learners
 * - Premium Plan: Assigns to group with up to 10 learners
 * - Personalized Plan: Creates a dedicated 1-on-1 group
 *
 * @param data - Learner and subscription information
 * @returns Promise with assignment result
 */
export async function autoAssignLearnerToGroup(data: GroupAssignmentData): Promise<GroupAssignmentResult> {
  const { learnerId, planType, subject, grade, parentId } = data

  console.log("[v0] Starting auto-assignment for learner:", learnerId)

  try {
    if (planType === "personalized") {
      // Create a dedicated 1-on-1 group for personalized plan
      return await createPersonalizedGroup(learnerId, subject, grade, parentId)
    } else {
      // Find and assign to existing group with available space
      return await assignToExistingGroup(learnerId, planType, subject, grade)
    }
  } catch (error) {
    console.error("[v0] Error in auto-assignment:", error)
    return {
      groupId: 0,
      groupName: "",
      tutorId: 0,
      tutorName: "",
      success: false,
      message: "Failed to assign learner to group",
    }
  }
}

/**
 * Creates a personalized 1-on-1 group for a learner
 */
async function createPersonalizedGroup(
  learnerId: number,
  subject: string,
  grade: number,
  parentId: number,
): Promise<GroupAssignmentResult> {
  console.log("[v0] Creating personalized group for learner:", learnerId)

  // In production, execute this query:
  // INSERT INTO learning_groups (name, subject, grade, plan_id, max_members, group_type)
  // VALUES (?, ?, ?, 3, 1, 'personalized')

  const groupName = `${subject} Grade ${grade} - Personalized Session (Learner ${learnerId})`
  const mockGroupId = Math.floor(Math.random() * 1000) + 100

  // Then assign learner to the group:
  // INSERT INTO group_members (group_id, learner_id) VALUES (?, ?)

  // Admin will assign tutor later through dashboard
  // UPDATE learning_groups SET tutor_id = ? WHERE id = ?

  // Send welcome notification
  await sendGroupAssignmentNotification(learnerId, parentId, mockGroupId, groupName, "TBA")

  return {
    groupId: mockGroupId,
    groupName,
    tutorId: 0, // Will be assigned by admin
    tutorName: "To Be Assigned",
    success: true,
    message: "Personalized group created successfully. A tutor will be assigned shortly.",
  }
}

/**
 * Assigns learner to an existing group with available space
 */
async function assignToExistingGroup(
  learnerId: number,
  planType: "standard" | "premium",
  subject: string,
  grade: number,
): Promise<GroupAssignmentResult> {
  console.log("[v0] Finding existing group for:", { planType, subject, grade })

  // In production, execute this query:
  // SELECT lg.*, t.first_name, t.last_name
  // FROM learning_groups lg
  // LEFT JOIN tutors t ON lg.tutor_id = t.id
  // WHERE lg.subject = ? AND lg.grade = ?
  //   AND lg.group_type = ? AND lg.status = 'active'
  //   AND lg.current_members < lg.max_members
  // ORDER BY lg.current_members ASC
  // LIMIT 1

  const planId = planType === "standard" ? 1 : 2
  const maxMembers = planType === "standard" ? 20 : 10

  // Mock data - in production, fetch from database
  const mockGroupId = Math.floor(Math.random() * 1000) + 100
  const groupName = `${subject} Grade ${grade} - ${planType.charAt(0).toUpperCase() + planType.slice(1)} Group A`
  const tutorName = "David Le Roux"
  const tutorId = 1

  // Insert learner into group:
  // INSERT INTO group_members (group_id, learner_id) VALUES (?, ?)

  // Update group member count:
  // UPDATE learning_groups
  // SET current_members = current_members + 1,
  //     status = CASE WHEN current_members + 1 >= max_members THEN 'full' ELSE 'active' END
  // WHERE id = ?

  // Send welcome notification
  await sendGroupAssignmentNotification(learnerId, 0, mockGroupId, groupName, tutorName)

  // Send system message to group chat
  await sendWelcomeMessageToGroup(mockGroupId, learnerId, tutorName)

  return {
    groupId: mockGroupId,
    groupName,
    tutorId,
    tutorName,
    success: true,
    message: `Successfully assigned to ${groupName}`,
  }
}

/**
 * Sends notifications about group assignment
 */
async function sendGroupAssignmentNotification(
  learnerId: number,
  parentId: number,
  groupId: number,
  groupName: string,
  tutorName: string,
): Promise<void> {
  console.log("[v0] Sending group assignment notifications")

  // In production, execute these inserts:
  // INSERT INTO notifications (user_id, type, title, message, link)
  // VALUES (?, 'announcement', ?, ?, ?)

  const learnerNotification = {
    userId: learnerId,
    type: "new_group",
    title: "Welcome to Your Learning Group!",
    message: `You've been added to ${groupName}. Your tutor is ${tutorName}. Check the Groups page to start learning!`,
    link: `/dashboard/learner/groups/${groupId}`,
  }

  if (parentId > 0) {
    const parentNotification = {
      userId: parentId,
      type: "announcement",
      title: "Child Assigned to Learning Group",
      message: `Your child has been assigned to ${groupName} with tutor ${tutorName}.`,
      link: `/dashboard/learner/groups/${groupId}`,
    }
    console.log("[v0] Parent notification:", parentNotification)
  }

  console.log("[v0] Learner notification:", learnerNotification)
}

/**
 * Sends a welcome message to the group chat
 */
async function sendWelcomeMessageToGroup(groupId: number, learnerId: number, tutorName: string): Promise<void> {
  console.log("[v0] Sending welcome message to group:", groupId)

  // In production, execute:
  // INSERT INTO group_chat_messages (group_id, sender_id, message, message_type)
  // VALUES (?, 0, ?, 'system')

  const welcomeMessage = {
    groupId,
    senderId: 0, // System message
    message: `A new learner has joined the group! Welcome to our learning community with ${tutorName} as your tutor. 🎉`,
    messageType: "system",
  }

  console.log("[v0] Welcome message:", welcomeMessage)
}

/**
 * Retrieves group information for a learner
 */
export async function getLearnerGroups(learnerId: number) {
  console.log("[v0] Fetching groups for learner:", learnerId)

  // In production, execute:
  // SELECT lg.*, t.first_name, t.last_name, sp.name as plan_name
  // FROM group_members gm
  // JOIN learning_groups lg ON gm.group_id = lg.id
  // LEFT JOIN tutors t ON lg.tutor_id = t.id
  // JOIN subscription_plans sp ON lg.plan_id = sp.plan_id
  // WHERE gm.learner_id = ? AND gm.status = 'active'

  return []
}

/**
 * Checks if a learner can be added to a specific group
 */
export async function canJoinGroup(groupId: number): Promise<boolean> {
  console.log("[v0] Checking if group has space:", groupId)

  // In production, execute:
  // SELECT current_members, max_members, status
  // FROM learning_groups
  // WHERE id = ?

  // Return current_members < max_members AND status = 'active'
  return true
}
