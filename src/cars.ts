import { L } from './lang'

export type Body = 'sedan' | 'van' | 'bigsuv' | 'sport' | 'limo' | 'cross'
export type Brand = 'Chevrolet' | 'BYD' | 'GAZ'

export type RealCar = {
  id: string
  brand: Brand
  name: string
  body: Body
  type: string
  engine: string
  hp: number
  seats: number
  accent: string
  ev?: boolean
}

/** Cars popular in Uzbekistan, drawn as top-down 3D-style models (components/TopCar). */
export const CARS: RealCar[] = [
  { id: 'cobalt', brand: 'Chevrolet', name: 'Chevrolet Cobalt', body: 'sedan', type: L('Sedan'), engine: '1.5 L', hp: 106, seats: 5, accent: '#f1f5f9' },
  { id: 'gentra', brand: 'Chevrolet', name: 'Chevrolet Gentra', body: 'sedan', type: L('Sedan'), engine: '1.5 L', hp: 107, seats: 5, accent: '#dc2626' },
  { id: 'damas', brand: 'Chevrolet', name: 'Chevrolet Damas', body: 'van', type: L('Mikroavtobus'), engine: '0.8 L', hp: 38, seats: 7, accent: '#e2e8f0' },
  { id: 'tracker', brand: 'Chevrolet', name: 'Chevrolet Tracker', body: 'cross', type: L('Krossover'), engine: '1.2 L Turbo', hp: 132, seats: 5, accent: '#16a34a' },
  { id: 'malibu', brand: 'Chevrolet', name: 'Chevrolet Malibu', body: 'sedan', type: L('Biznes sedan'), engine: '1.5 L Turbo', hp: 163, seats: 5, accent: '#1e293b' },
  { id: 'tahoe', brand: 'Chevrolet', name: 'Chevrolet Tahoe', body: 'bigsuv', type: L('Yo‘ltanlamas'), engine: '6.2 L V8', hp: 420, seats: 7, accent: '#111827' },
  { id: 'chazor', brand: 'BYD', name: 'BYD Chazor', body: 'sedan', type: L('Gibrid sedan'), engine: '1.5 L DM-i', hp: 180, seats: 5, accent: '#0ea5e9' },
  { id: 'song', brand: 'BYD', name: 'BYD Song Plus', body: 'cross', type: L('Gibrid krossover'), engine: '1.5 L DM-i', hp: 197, seats: 5, accent: '#9ca3af' },
  { id: 'han', brand: 'BYD', name: 'BYD Han EV', body: 'sedan', type: L('Elektromobil'), engine: L('Elektr, 4×4'), hp: 494, seats: 5, accent: '#7f1d1d', ev: true },
  { id: 'seal', brand: 'BYD', name: 'BYD Seal', body: 'sport', type: L('Elektr sport-sedan'), engine: L('Elektr'), hp: 313, seats: 5, accent: '#2563eb', ev: true },
  { id: 'chayka', brand: 'GAZ', name: 'GAZ-14 Chayka', body: 'limo', type: L('Limuzin'), engine: '5.5 L V8', hp: 220, seats: 7, accent: '#0a0a0a' },
]

export const BRANDS: Brand[] = ['Chevrolet', 'BYD', 'GAZ']
export const BRAND_LABEL: Record<Brand, string> = { Chevrolet: 'Chevrolet', BYD: 'BYD', GAZ: 'Chayka' }

export const PAINTS = ['#f1f5f9', '#111827', '#dc2626', '#2563eb', '#16a34a', '#f59e0b', '#9ca3af', '#7c3aed', '#ec4899', '#0ea5e9']
