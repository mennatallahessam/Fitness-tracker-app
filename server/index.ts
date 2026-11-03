import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path'

import authController from './controllers/auth'
import usersController from './controllers/users'
import activitiesController from './controllers/activities'
import exerciseTypesController from './controllers/exerciseTypes'
import { seed as runSeeding } from './db/seed'
import { protect, restrictTo } from './middleware/auth'

const app = express()
const PORT = process.env.PORT || 3000

// ── Middleware ──────────────────────────────────────────────────────────────
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

// ── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/v1/auth', authController)
app.use('/api/v1/users', protect, usersController)
app.use('/api/v1/activities', protect, activitiesController)
app.use('/api/v1/exercise-types', exerciseTypesController) // public

// ── On-demand Database Seed Endpoint (Admin only) ───────────────────────────
app.post('/api/v1/seed', protect, restrictTo('admin'), async (req, res, next) => {
  try {
    await runSeeding()
    res.json({ status: 'success', message: 'Database seeded successfully' })
  } catch (err) {
    next(err)
  }
})

// ── Health check ────────────────────────────────────────────────────────────
app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'success', message: 'FitTrack API is running 🏃' })
})

// ── Serve Frontend ──────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, '../client/dist')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'))
})

// ── Global error handler ────────────────────────────────────────────────────
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(err.status || 500).json({ status: 'error', message: err.message || 'Something went wrong' })
})

// ── Start ───────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ FitTrack server running at http://localhost:${PORT}`)
})
