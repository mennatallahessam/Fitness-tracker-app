import type { Activity } from '../types'

/** Format distance: show in km with 1 decimal */
export function formatDistance(km: number): string {
  if (km === 0) return '0 km'
  return km.toFixed(1) + ' km'
}

/** Format duration in MM:SS or HH:MM */
export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h > 0 ? `${h}h ${m}m` : `${m} min`
}

/** Average pace in km per hour */
export function formatPace(totalDistance: number, totalDuration: number): string {
  if (totalDuration === 0) return '0 km/h'
  const kmh = totalDistance / (totalDuration / 60)
  return kmh.toFixed(1) + ' km/h'
}

/** Sum up a stat field across activities */
export function sumStat(list: Activity[], field: keyof Activity): number {
  return list.reduce((acc, a) => acc + ((a[field] as number) || 0), 0)
}

