import jwt from "jsonwebtoken"

interface DecodedToken {
  id: string
  role: string
  email: string
}

export async function getUserFromToken(req: Request) {
  const authHeader = req.headers.get("authorization")
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.warn("No Authorization header or invalid format")
    return null
  }

  const token = authHeader.split(" ")[1]

  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not defined in environment variables")
    return null
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as DecodedToken

    console.log("TOKEN:", token)
    console.log("DECODED:", decoded)

    return {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email,
    }
  } catch (err) {
    console.error("Invalid token", err)
    return null
  }
}
