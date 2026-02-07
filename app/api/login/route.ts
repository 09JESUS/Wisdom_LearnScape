import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { db } from "@/lib/db"

const JWT_SECRET = process.env.JWT_SECRET || "supersecret"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    if (!email || !password) {
      return NextResponse.json({ message: "Email and password are required" }, { status: 400 })
    }

    // Find user in users table
    const [userResult]: any = await db.query(
      `SELECT id, email, phone, password_hash, role, admin_code, name, surname
       FROM users WHERE email = ? OR phone = ?`,
      [email, email]
    )

    let user = userResult?.[0]

    // If not found, check parents table
    if (!user) {
      const [parentResult]: any = await db.query(
        `SELECT u.id, u.email, u.phone, u.password_hash, u.role, u.admin_code, u.name, u.surname
         FROM users u INNER JOIN parents p ON u.id=p.user_id
         WHERE p.contact_number=?`,
        [email]
      )
      user = parentResult?.[0]
    }

    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 })

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password_hash)
    if (!validPassword) return NextResponse.json({ message: "Invalid password" }, { status: 401 })

    // Generate admin_code if missing
    let adminCode = user.admin_code
    if (user.role === "admin" && !adminCode) {
      adminCode = `ADM-${user.id}`
      await db.query("UPDATE users SET admin_code=? WHERE id=?", [adminCode, user.id])
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, admin_code: adminCode },
      JWT_SECRET,
      { expiresIn: "7d" }
    )

    console.log(`User logged in: ${user.email}`)

    return NextResponse.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        surname: user.surname,
        email: user.email,
        role: user.role,
        admin_code: adminCode || null,
      },
    })
  } catch (err: any) {
    console.error("Login API Error:", err)
    return NextResponse.json({ message: "Login failed", error: err.message }, { status: 500 })
  }
}
