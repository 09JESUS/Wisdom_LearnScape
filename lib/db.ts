// MySQL Database Schema for Wisdom Learnscape
// This file defines the complete database structure
// Connect to MySQL Workbench using your connection string

export const DATABASE_SCHEMA = `
-- Users Table (for authentication)
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('learner', 'parent', 'tutor', 'admin') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_role (role)
);

-- Learners Table
CREATE TABLE IF NOT EXISTS learners (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  grade INT NOT NULL,
  school VARCHAR(255),
  profile_picture VARCHAR(255),
  date_of_birth DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)
);

-- Parents Table
CREATE TABLE IF NOT EXISTS parents (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(10),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id)
);

-- Parent-Learner Relationship
CREATE TABLE IF NOT EXISTS parent_learner (
  id INT PRIMARY KEY AUTO_INCREMENT,
  parent_id INT NOT NULL,
  learner_id INT NOT NULL,
  relationship VARCHAR(50),
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES parents(id) ON DELETE CASCADE,
  FOREIGN KEY (learner_id) REFERENCES learners(id) ON DELETE CASCADE,
  INDEX idx_parent (parent_id),
  INDEX idx_learner (learner_id)
);

-- Tutors Table
CREATE TABLE IF NOT EXISTS tutors (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  bio TEXT,
  profile_picture VARCHAR(255),
  hourly_rate DECIMAL(10, 2),
  subjects JSON,
  available_hours JSON,
  qualifications TEXT,
  experience_years INT,
  status ENUM('active', 'inactive', 'pending') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user_id (user_id),
  INDEX idx_status (status)
);

-- Subscription Plans
CREATE TABLE IF NOT EXISTS subscription_plans (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'ZAR',
  duration_months INT DEFAULT 1,
  features JSON,
  max_learners INT,
  max_sessions_per_week INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Learning Groups (Automatically created based on subscription plan)
CREATE TABLE IF NOT EXISTS learning_groups (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  subject VARCHAR(100) NOT NULL,
  grade INT NOT NULL,
  plan_id INT NOT NULL,
  tutor_id INT,
  max_members INT NOT NULL,
  current_members INT DEFAULT 0,
  group_type ENUM('standard', 'premium', 'personalized') NOT NULL,
  status ENUM('active', 'inactive', 'full') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (plan_id) REFERENCES subscription_plans(id),
  FOREIGN KEY (tutor_id) REFERENCES tutors(id) ON DELETE SET NULL,
  INDEX idx_subject (subject),
  INDEX idx_plan (plan_id),
  INDEX idx_tutor (tutor_id),
  INDEX idx_status (status)
);

-- Group Members (Links learners to their groups)
CREATE TABLE IF NOT EXISTS group_members (
  id INT PRIMARY KEY AUTO_INCREMENT,
  group_id INT NOT NULL,
  learner_id INT NOT NULL,
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status ENUM('active', 'inactive') DEFAULT 'active',
  FOREIGN KEY (group_id) REFERENCES learning_groups(id) ON DELETE CASCADE,
  FOREIGN KEY (learner_id) REFERENCES learners(id) ON DELETE CASCADE,
  UNIQUE KEY unique_group_learner (group_id, learner_id),
  INDEX idx_group (group_id),
  INDEX idx_learner (learner_id)
);

-- Group Chat Messages (For group communication)
CREATE TABLE IF NOT EXISTS group_chat_messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  group_id INT NOT NULL,
  sender_id INT NOT NULL,
  message TEXT NOT NULL,
  message_type ENUM('text', 'file', 'announcement', 'system') DEFAULT 'text',
  file_url VARCHAR(255),
  is_pinned BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (group_id) REFERENCES learning_groups(id) ON DELETE CASCADE,
  FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_group (group_id),
  INDEX idx_created (created_at)
);

-- Sessions (Tutoring Sessions)
CREATE TABLE IF NOT EXISTS sessions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  learner_id INT NOT NULL,
  tutor_id INT NOT NULL,
  subject VARCHAR(100) NOT NULL,
  topic VARCHAR(255),
  scheduled_date DATE NOT NULL,
  scheduled_time TIME NOT NULL,
  duration_minutes INT DEFAULT 60,
  status ENUM('scheduled', 'completed', 'cancelled', 'pending_approval') DEFAULT 'pending_approval',
  attendance ENUM('present', 'absent', 'late') DEFAULT NULL,
  session_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (learner_id) REFERENCES learners(id) ON DELETE CASCADE,
  FOREIGN KEY (tutor_id) REFERENCES tutors(id) ON DELETE CASCADE,
  INDEX idx_learner (learner_id),
  INDEX idx_tutor (tutor_id),
  INDEX idx_date (scheduled_date),
  INDEX idx_status (status)
);

-- Attendance Records
CREATE TABLE IF NOT EXISTS attendance (
  id INT PRIMARY KEY AUTO_INCREMENT,
  session_id INT NOT NULL,
  learner_id INT NOT NULL,
  status ENUM('present', 'absent', 'late') NOT NULL,
  check_in_time TIMESTAMP,
  notes TEXT,
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE,
  FOREIGN KEY (learner_id) REFERENCES learners(id) ON DELETE CASCADE,
  INDEX idx_session (session_id),
  INDEX idx_learner (learner_id)
);

-- Goals
CREATE TABLE IF NOT EXISTS goals (
  id INT PRIMARY KEY AUTO_INCREMENT,
  learner_id INT NOT NULL,
  subject VARCHAR(100) NOT NULL,
  goal_title VARCHAR(255) NOT NULL,
  description TEXT,
  target_date DATE,
  status ENUM('in_progress', 'achieved', 'not_started') DEFAULT 'not_started',
  progress_percentage INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (learner_id) REFERENCES learners(id) ON DELETE CASCADE,
  INDEX idx_learner (learner_id),
  INDEX idx_status (status)
);

-- Engagement Tracking
CREATE TABLE IF NOT EXISTS engagement (
  id INT PRIMARY KEY AUTO_INCREMENT,
  session_id INT NOT NULL,
  learner_id INT NOT NULL,
  participation_score DECIMAL(3, 2),
  focus_level ENUM('excellent', 'good', 'fair', 'poor'),
  questions_asked INT DEFAULT 0,
  tutor_notes TEXT,
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE,
  FOREIGN KEY (learner_id) REFERENCES learners(id) ON DELETE CASCADE,
  INDEX idx_session (session_id),
  INDEX idx_learner (learner_id)
);

-- Homework/Tasks
CREATE TABLE IF NOT EXISTS tasks (
  id INT PRIMARY KEY AUTO_INCREMENT,
  learner_id INT NOT NULL,
  tutor_id INT,
  subject VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  due_date DATE NOT NULL,
  status ENUM('completed', 'pending', 'overdue', 'not_yet_started') DEFAULT 'not_yet_started',
  submission_date TIMESTAMP NULL,
  grade VARCHAR(10),
  feedback TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (learner_id) REFERENCES learners(id) ON DELETE CASCADE,
  FOREIGN KEY (tutor_id) REFERENCES tutors(id) ON DELETE SET NULL,
  INDEX idx_learner (learner_id),
  INDEX idx_status (status),
  INDEX idx_due_date (due_date)
);

-- Weekly Reports
CREATE TABLE IF NOT EXISTS weekly_reports (
  id INT PRIMARY KEY AUTO_INCREMENT,
  learner_id INT NOT NULL,
  tutor_id INT NOT NULL,
  week_start_date DATE NOT NULL,
  week_end_date DATE NOT NULL,
  topics_covered TEXT,
  strengths_observed TEXT,
  areas_to_focus TEXT,
  effort_rating INT CHECK (effort_rating BETWEEN 1 AND 5),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (learner_id) REFERENCES learners(id) ON DELETE CASCADE,
  FOREIGN KEY (tutor_id) REFERENCES tutors(id) ON DELETE CASCADE,
  INDEX idx_learner (learner_id),
  INDEX idx_week (week_start_date)
);

-- Monthly Parent Reports
CREATE TABLE IF NOT EXISTS parent_reports (
  id INT PRIMARY KEY AUTO_INCREMENT,
  learner_id INT NOT NULL,
  parent_id INT NOT NULL,
  report_month DATE NOT NULL,
  attendance_percentage DECIMAL(5, 2),
  participation_summary TEXT,
  goals_achieved INT,
  tutor_comments TEXT,
  recommended_next_steps TEXT,
  pdf_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (learner_id) REFERENCES learners(id) ON DELETE CASCADE,
  FOREIGN KEY (parent_id) REFERENCES parents(id) ON DELETE CASCADE,
  INDEX idx_learner (learner_id),
  INDEX idx_month (report_month)
);

-- Meetings (Parent-Tutor, Parent-Admin)
CREATE TABLE IF NOT EXISTS meetings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  meeting_type ENUM('parent_tutor', 'parent_admin') NOT NULL,
  parent_id INT NOT NULL,
  tutor_id INT,
  admin_id INT,
  learner_id INT,
  scheduled_date DATE NOT NULL,
  scheduled_time TIME NOT NULL,
  duration_minutes INT DEFAULT 30,
  status ENUM('scheduled', 'completed', 'cancelled', 'pending_approval') DEFAULT 'pending_approval',
  meeting_link VARCHAR(255),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES parents(id) ON DELETE CASCADE,
  FOREIGN KEY (tutor_id) REFERENCES tutors(id) ON DELETE SET NULL,
  FOREIGN KEY (learner_id) REFERENCES learners(id) ON DELETE CASCADE,
  INDEX idx_parent (parent_id),
  INDEX idx_date (scheduled_date),
  INDEX idx_status (status)
);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  type ENUM('session_completed', 'task_reminder', 'attendance_alert', 'meeting_scheduled', 'announcement', 'report_ready') NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  link VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user (user_id),
  INDEX idx_read (is_read),
  INDEX idx_created (created_at)
);

-- Chat Messages
CREATE TABLE IF NOT EXISTS chat_messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  sender_id INT NOT NULL,
  recipient_id INT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  is_encrypted BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (recipient_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_sender (sender_id),
  INDEX idx_recipient (recipient_id),
  INDEX idx_created (created_at)
);

-- Announcements
CREATE TABLE IF NOT EXISTS announcements (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category ENUM('class_changes', 'fees', 'exam_prep', 'general') DEFAULT 'general',
  target_audience ENUM('all', 'learners', 'parents', 'tutors') DEFAULT 'all',
  is_active BOOLEAN DEFAULT TRUE,
  created_by INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES users(id),
  INDEX idx_active (is_active),
  INDEX idx_audience (target_audience)
);

-- Payment Transactions
CREATE TABLE IF NOT EXISTS payment_transactions (
  id INT PRIMARY KEY AUTO_INCREMENT,
  parent_id INT NOT NULL,
  subscription_id INT,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'ZAR',
  transaction_type ENUM('subscription', 'registration', 'session_booking') NOT NULL,
  payment_method ENUM('card', 'bank_transfer', 'cash') NOT NULL,
  status ENUM('completed', 'pending', 'failed', 'refunded') DEFAULT 'pending',
  transaction_reference VARCHAR(255),
  payment_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES parents(id) ON DELETE CASCADE,
  FOREIGN KEY (subscription_id) REFERENCES subscriptions(id) ON DELETE SET NULL,
  INDEX idx_parent (parent_id),
  INDEX idx_status (status)
);

-- Settings
CREATE TABLE IF NOT EXISTS user_settings (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  dark_mode BOOLEAN DEFAULT FALSE,
  email_notifications BOOLEAN DEFAULT TRUE,
  sms_notifications BOOLEAN DEFAULT TRUE,
  whatsapp_notifications BOOLEAN DEFAULT TRUE,
  language VARCHAR(10) DEFAULT 'en',
  timezone VARCHAR(50) DEFAULT 'Africa/Johannesburg',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user (user_id)
);

-- Reports/Concerns
CREATE TABLE IF NOT EXISTS reports (
  id INT PRIMARY KEY AUTO_INCREMENT,
  reporter_id INT NOT NULL,
  report_type ENUM('concern', 'technical_issue', 'tutor_behaviour', 'other') NOT NULL,
  subject VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  status ENUM('open', 'in_review', 'resolved', 'closed') DEFAULT 'open',
  priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
  resolved_by INT,
  resolution_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMP NULL,
  FOREIGN KEY (reporter_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_reporter (reporter_id),
  INDEX idx_status (status)
);

-- Insert default subscription plans
INSERT INTO subscription_plans (name, price, currency, features, max_learners, max_sessions_per_week) VALUES
('Standard', 415.00, 'ZAR', '["Up to 20 learners per group", "1 weekly group session", "Recorded lessons & basic notes", "Basic past paper library", "Monthly mock test (auto-marked)", "WhatsApp announcements", "Uni & Bursary webinars"]', 20, 1),
('Premium', 765.00, 'ZAR', '["Up to 10 learners per group", "2 weekly group sessions", "Recorded lessons & full notes", "Full past paper library", "Monthly mock test (tutor-marked)", "WhatsApp group Q&A", "Semi-custom study plan"]', 10, 2),
('Personalized', 1450.00, 'ZAR', '["Full customised 1-on-1 sessions", "Full diagnostic & learning plan", "1-3 weekly sessions", "Recorded lessons & personalised notes", "Dedicated academic manager", "Monthly parent progress meetings"]', 1, 3);

-- Create default learning groups for each plan and subject
INSERT INTO learning_groups (name, subject, grade, plan_id, max_members, group_type) VALUES
-- Standard Plan Groups (20 learners max)
('Mathematics Grade 12 - Standard Group A', 'Mathematics', 12, 1, 20, 'standard'),
('Physical Sciences Grade 12 - Standard Group A', 'Physical Sciences', 12, 1, 20, 'standard'),
-- Premium Plan Groups (10 learners max)
('Mathematics Grade 12 - Premium Group A', 'Mathematics', 12, 2, 10, 'premium'),
('Physical Sciences Grade 12 - Premium Group A', 'Physical Sciences', 12, 2, 10, 'premium');
`

// Database connection helper (you'll need to configure this)
export interface DatabaseConfig {
  host: string
  port: number
  user: string
  password: string
  database: string
}

// Example queries for common operations
export const QUERIES = {
  // Get learner dashboard data
  getLearnerDashboard: `
    SELECT 
      l.*,
      u.email,
      (SELECT COUNT(*) FROM sessions WHERE learner_id = l.id AND status = 'completed' AND MONTH(scheduled_date) = MONTH(CURRENT_DATE())) as sessions_this_month,
      (SELECT COUNT(*) FROM sessions WHERE learner_id = l.id AND status = 'completed' AND WEEK(scheduled_date) = WEEK(CURRENT_DATE())) as sessions_this_week,
      (SELECT AVG(participation_score) FROM engagement WHERE learner_id = l.id) as avg_engagement
    FROM learners l
    JOIN users u ON l.user_id = u.id
    WHERE l.id = ?
  `,

  // Get today's session
  getTodaySession: `
    SELECT 
      s.*,
      t.first_name as tutor_first_name,
      t.last_name as tutor_last_name,
      t.profile_picture as tutor_picture
    FROM sessions s
    JOIN tutors t ON s.tutor_id = t.id
    WHERE s.learner_id = ? 
    AND DATE(s.scheduled_date) = CURDATE()
    AND s.status = 'scheduled'
    ORDER BY s.scheduled_time
    LIMIT 1
  `,

  // Get attendance summary
  getAttendanceSummary: `
    SELECT 
      COUNT(*) as total_sessions,
      SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) as present_count,
      (SUM(CASE WHEN a.status = 'present' THEN 1 ELSE 0 END) / COUNT(*) * 100) as attendance_percentage
    FROM attendance a
    JOIN sessions s ON a.session_id = s.id
    WHERE a.learner_id = ?
    AND MONTH(s.scheduled_date) = MONTH(CURRENT_DATE())
  `,

  // Get homework status
  getHomeworkStatus: `
    SELECT 
      status,
      COUNT(*) as count
    FROM tasks
    WHERE learner_id = ?
    GROUP BY status
  `,

  // Get recent notifications
  getNotifications: `
    SELECT *
    FROM notifications
    WHERE user_id = ?
    ORDER BY created_at DESC
    LIMIT 10
  `,

  // Get upcoming sessions
  getUpcomingSessions: `
    SELECT 
      s.*,
      t.first_name as tutor_first_name,
      t.last_name as tutor_last_name
    FROM sessions s
    JOIN tutors t ON s.tutor_id = t.id
    WHERE s.learner_id = ?
    AND s.scheduled_date >= CURDATE()
    AND s.status = 'scheduled'
    ORDER BY s.scheduled_date, s.scheduled_time
    LIMIT 5
  `,

  // Get goals
  getGoals: `
    SELECT *
    FROM goals
    WHERE learner_id = ?
    ORDER BY 
      CASE 
        WHEN status = 'in_progress' THEN 1
        WHEN status = 'not_started' THEN 2
        WHEN status = 'achieved' THEN 3
      END,
      target_date
  `,
}

// Admin queries for common operations
export const ADMIN_QUERIES = {
  // Get all tutors with their statistics
  getAllTutors: `
    SELECT 
      t.*,
      u.email,
      COUNT(DISTINCT s.learner_id) as total_students,
      COUNT(s.id) as total_sessions,
      AVG(e.participation_score) as avg_student_engagement
    FROM tutors t
    JOIN users u ON t.user_id = u.id
    LEFT JOIN sessions s ON t.id = s.tutor_id
    LEFT JOIN engagement e ON s.id = e.session_id
    GROUP BY t.id
    ORDER BY t.created_at DESC
  `,

  // Get all learners with their subscription info
  getAllLearners: `
    SELECT 
      l.*,
      u.email,
      p.first_name as parent_first_name,
      p.last_name as parent_last_name,
      sp.name as subscription_plan,
      sub.status as subscription_status
    FROM learners l
    JOIN users u ON l.user_id = u.id
    LEFT JOIN parent_learner pl ON l.id = pl.learner_id
    LEFT JOIN parents p ON pl.parent_id = p.id
    LEFT JOIN subscriptions sub ON p.id = sub.parent_id
    LEFT JOIN subscription_plans sp ON sub.plan_id = sp.id
    WHERE pl.is_primary = TRUE OR pl.is_primary IS NULL
    ORDER BY l.created_at DESC
  `,

  // Get all groups (subjects with assigned tutors)
  getAllGroups: `
    SELECT 
      s.subject,
      s.grade,
      COUNT(DISTINCT s.learner_id) as student_count,
      t.first_name as tutor_first_name,
      t.last_name as tutor_last_name,
      t.id as tutor_id,
      sp.name as plan_name,
      sp.price
    FROM sessions s
    JOIN tutors t ON s.tutor_id = t.id
    JOIN learners l ON s.learner_id = l.id
    JOIN parent_learner pl ON l.id = pl.learner_id
    JOIN parents par ON pl.parent_id = par.id
    JOIN subscriptions sub ON par.id = sub.parent_id
    JOIN subscription_plans sp ON sub.plan_id = sp.id
    WHERE s.status IN ('scheduled', 'completed')
    GROUP BY s.subject, s.grade, t.id, sp.id
    ORDER BY s.subject, s.grade
  `,

  // Get tutor applications
  getTutorApplications: `
    SELECT 
      t.*,
      u.email,
      u.created_at as application_date
    FROM tutors t
    JOIN users u ON t.user_id = u.id
    WHERE t.status = 'pending'
    ORDER BY u.created_at DESC
  `,

  // Assign students to tutor
  assignStudentToTutor: `
    INSERT INTO sessions (learner_id, tutor_id, subject, scheduled_date, scheduled_time, status)
    VALUES (?, ?, ?, ?, ?, 'scheduled')
  `,

  // Update subscription plan
  updateSubscriptionPlan: `
    UPDATE subscription_plans
    SET name = ?, price = ?, features = ?, max_learners = ?, max_sessions_per_week = ?
    WHERE id = ?
  `,

  // Approve tutor
  approveTutor: `
    UPDATE tutors
    SET status = 'active'
    WHERE id = ?
  `,

  // Create group session
  createGroupSession: `
    INSERT INTO sessions (learner_id, tutor_id, subject, topic, scheduled_date, scheduled_time, duration_minutes, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'scheduled')
  `,
}

// Group queries for managing learning groups and chat
export const GROUP_QUERIES = {
  // Auto-assign learner to appropriate group based on subscription plan
  autoAssignToGroup: `
    INSERT INTO group_members (group_id, learner_id)
    SELECT lg.id, ? as learner_id
    FROM learning_groups lg
    JOIN subscriptions sub ON lg.plan_id = sub.plan_id
    JOIN parent_learner pl ON sub.parent_id = pl.parent_id
    JOIN learners l ON pl.learner_id = l.id
    WHERE l.id = ?
    AND lg.subject = ?
    AND lg.grade = l.grade
    AND lg.current_members < lg.max_members
    AND lg.status = 'active'
    ORDER BY lg.current_members ASC
    LIMIT 1
  `,

  // Get learner's groups
  getLearnerGroups: `
    SELECT 
      lg.*,
      t.first_name as tutor_first_name,
      t.last_name as tutor_last_name,
      sp.name as plan_name,
      sp.price
    FROM learning_groups lg
    JOIN group_members gm ON lg.id = gm.group_id
    LEFT JOIN tutors t ON lg.tutor_id = t.id
    JOIN subscription_plans sp ON lg.plan_id = sp.plan_id
    WHERE gm.learner_id = ?
    AND gm.status = 'active'
  `,

  // Get tutor's groups
  getTutorGroups: `
    SELECT 
      lg.*,
      sp.name as plan_name,
      COUNT(gm.id) as member_count
    FROM learning_groups lg
    JOIN subscription_plans sp ON lg.plan_id = sp.plan_id
    LEFT JOIN group_members gm ON lg.id = gm.group_id AND gm.status = 'active'
    WHERE lg.tutor_id = ?
    GROUP BY lg.id
  `,

  // Get group members
  getGroupMembers: `
    SELECT 
      l.*,
      u.email,
      gm.joined_at
    FROM group_members gm
    JOIN learners l ON gm.learner_id = l.id
    JOIN users u ON l.user_id = u.id
    WHERE gm.group_id = ?
    AND gm.status = 'active'
    ORDER BY gm.joined_at
  `,

  // Get group chat messages
  getGroupMessages: `
    SELECT 
      gcm.*,
      u.email as sender_email,
      CASE 
        WHEN l.id IS NOT NULL THEN CONCAT(l.first_name, ' ', l.last_name)
        WHEN t.id IS NOT NULL THEN CONCAT(t.first_name, ' ', t.last_name)
        ELSE 'Admin'
      END as sender_name
    FROM group_chat_messages gcm
    JOIN users u ON gcm.sender_id = u.id
    LEFT JOIN learners l ON u.id = l.user_id
    LEFT JOIN tutors t ON u.id = t.user_id
    WHERE gcm.group_id = ?
    ORDER BY gcm.created_at DESC
    LIMIT 100
  `,

  // Send group message
  sendGroupMessage: `
    INSERT INTO group_chat_messages (group_id, sender_id, message, message_type)
    VALUES (?, ?, ?, ?)
  `,

  // Create personalized 1-on-1 group
  createPersonalizedGroup: `
    INSERT INTO learning_groups (name, subject, grade, plan_id, tutor_id, max_members, group_type)
    VALUES (?, ?, ?, 3, ?, 1, 'personalized')
  `,

  // Update group member count
  updateGroupMemberCount: `
    UPDATE learning_groups
    SET current_members = (
      SELECT COUNT(*) FROM group_members WHERE group_id = ? AND status = 'active'
    ),
    status = CASE 
      WHEN (SELECT COUNT(*) FROM group_members WHERE group_id = ? AND status = 'active') >= max_members THEN 'full'
      ELSE 'active'
    END
    WHERE id = ?
  `,

  // Assign tutor to group
  assignTutorToGroup: `
    UPDATE learning_groups
    SET tutor_id = ?
    WHERE id = ?
  `,

  // Get all groups for admin
  getAllGroupsAdmin: `
    SELECT 
      lg.*,
      sp.name as plan_name,
      sp.price,
      t.first_name as tutor_first_name,
      t.last_name as tutor_last_name,
      COUNT(gm.id) as member_count
    FROM learning_groups lg
    JOIN subscription_plans sp ON lg.plan_id = sp.plan_id
    LEFT JOIN tutors t ON lg.tutor_id = t.id
    LEFT JOIN group_members gm ON lg.id = gm.group_id AND gm.status = 'active'
    GROUP BY lg.id
    ORDER BY lg.created_at DESC
  `,

  // Create new group
  createGroup: `
    INSERT INTO learning_groups (name, subject, grade, plan_id, tutor_id, max_members, group_type)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `,
}
