import jwt from "jsonwebtoken"

export interface DecodedToken {
  id: string
  role: string
  email: string
}

/**
 * Extracts and verifies JWT token from request headers.
 * Returns decoded user info or null if invalid/absent.
 */
export async function getUserFromToken(req: Request): Promise<DecodedToken | null> {
  const authHeader = req.headers.get("authorization")

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.warn("No Authorization header or invalid format")
    return null
  }

  const token = authHeader.split(" ")[1]

  const secret = process.env.JWT_SECRET
  if (!secret) {
    console.error("JWT_SECRET is not defined in environment variables")
    return null
  }

  try {
    const decoded = jwt.verify(token, secret) as DecodedToken

    console.log("✅ TOKEN:", token)
    console.log("✅ DECODED:", decoded)

    return {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email,
    }
  } catch (err: any) {
    console.error("❌ Invalid token:", err.message)
    return null
  }
}
