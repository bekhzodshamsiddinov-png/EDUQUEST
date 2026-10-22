import { L } from './lang'

const fp = (file: string, w = 640) => `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${w}`

export type RealCar = {
  id: string
  name: string
  photo: string
  page: string
  type: string
  engine: string
  hp: number
  seats: number
  accent: string
}

/** Real cars popular in Uzbekistan. Photos: Wikimedia Commons (CC licences, see `page`). */
export const CARS: RealCar[] = [
  { id: 'cobalt', name: 'Chevrolet Cobalt', photo: fp('Chevrolet Cobalt 2013 in Russia.JPG'), page: 'https://commons.wikimedia.org/wiki/File:Chevrolet_Cobalt_2013_in_Russia.JPG', type: L('Sedan'), engine: '1.5 L', hp: 106, seats: 5, accent: '#3b82f6' },
  { id: 'damas', name: 'Chevrolet Damas', photo: fp('Chevrolet Damas Deluxe in Bukhara, front right.jpg'), page: 'https://commons.wikimedia.org/wiki/File:Chevrolet_Damas_Deluxe_in_Bukhara,_front_right.jpg', type: L('Mikroavtobus'), engine: '0.8 L', hp: 38, seats: 7, accent: '#94a3b8' },
  { id: 'gentra', name: 'Chevrolet Gentra', photo: fp('Ravon Gentra.jpg'), page: 'https://commons.wikimedia.org/wiki/File:Ravon_Gentra.jpg', type: L('Sedan'), engine: '1.5 L', hp: 107, seats: 5, accent: '#e11d48' },
  { id: 'tracker', name: 'Chevrolet Tracker', photo: fp('2022 Chevrolet Tracker 1.2 Turbo LS.jpg'), page: 'https://commons.wikimedia.org/wiki/File:2022_Chevrolet_Tracker_1.2_Turbo_LS.jpg', type: L('Krossover'), engine: '1.2 L Turbo', hp: 132, seats: 5, accent: '#22c55e' },
  { id: 'malibu', name: 'Chevrolet Malibu', photo: fp('2019 Chevrolet Malibu (facelift) LT, front 10.19.19.jpg'), page: 'https://commons.wikimedia.org/wiki/File:2019_Chevrolet_Malibu_(facelift)_LT,_front_10.19.19.jpg', type: L('Biznes sedan'), engine: '1.5 L Turbo', hp: 163, seats: 5, accent: '#f59e0b' },
  { id: 'tahoe', name: 'Chevrolet Tahoe High Country', photo: fp('2021 Chevrolet Tahoe High Country, front 12.24.20.jpg'), page: 'https://commons.wikimedia.org/wiki/File:2021_Chevrolet_Tahoe_High_Country,_front_12.24.20.jpg', type: L('Yo‘ltanlamas'), engine: '6.2 L V8', hp: 420, seats: 7, accent: '#a855f7' },
]
