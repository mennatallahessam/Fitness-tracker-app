import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'fittrack-super-secret-key-2026'

export function signToken(user: Record<string, any>): string {
  const { password, iat, exp, ...payload } = user
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '30d' })
}

export function protect(req: any, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ status: 'fail', message: 'Not authorized, no token provided' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch (error) {
    return res.status(401).json({ status: 'fail', message: 'Invalid or expired token' })
  }
}

export function restrictTo(...roles: string[]) {
  return (req: any, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role)) {
      return res.status(403).json({ status: 'fail', message: 'You do not have permission to perform this action' })
    }
    next()
  }
}
