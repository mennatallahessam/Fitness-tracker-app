import { fileURLToPath } from 'url'
import { seed as seedUsers } from '../models/users'
import { seed as seedExerciseTypes } from '../models/exerciseTypes'
import { seed as seedActivities } from '../models/activities'

export async function seed() {
  try {
    console.log('Starting Database Seeding...')

    // Seed independent tables first
    await seedUsers()
    await seedExerciseTypes()

    // Seed dependent tables
    await seedActivities()

    console.log('Seeding Completed Successfully!')
  } catch (error) {
    console.error('Error during seeding:', error)
    throw error
  }
}

// Allow running directly via `tsx server/db/seed.ts`
const isMain = process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]
if (isMain) {
  seed()
    .then(() => process.exit(0))
    .catch(() => process.exit(1))
}
