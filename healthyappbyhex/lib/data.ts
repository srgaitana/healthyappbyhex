export interface Doctor {
  id: string
  name: string
  specialty: string
  location: string
  address: string
  rating: number
  reviewCount: number
  insuranceTypes: string[]
  availability: {
    date: string
    slots: string[]
  }[]
  image: string
}

export interface Specialty {
  id: string
  name: string
  icon: string
  count: number
}

export const specialties: Specialty[] = [
  { id: "cardiology", name: "Cardiología", icon: "heart", count: 24 },
  { id: "dermatology", name: "Dermatología", icon: "scan", count: 18 },
  { id: "neurology", name: "Neurología", icon: "brain", count: 15 },
  { id: "pediatrics", name: "Pediatría", icon: "baby", count: 32 },
  { id: "ophthalmology", name: "Oftalmología", icon: "eye", count: 12 },
  { id: "orthopedics", name: "Ortopedia", icon: "bone", count: 20 },
  { id: "psychiatry", name: "Psiquiatría", icon: "brain-circuit", count: 16 },
  { id: "gynecology", name: "Ginecología", icon: "stethoscope", count: 22 },
]

export const locations = [
  "Santiago Centro",
  "Providencia",
  "Las Condes",
  "Ñuñoa",
  "La Florida",
  "Vitacura",
  "Maipú",
  "Conchalí",
]

export const insuranceTypes = [
  "Fonasa",
  "Isapre Banmédica",
  "Isapre Cruz Blanca",
  "Isapre Colmena",
  "Isapre Vida Tres",
  "Particular",
]

// Generate dates for the next 14 days
const generateDates = () => {
  const dates = []
  const today = new Date()

  for (let i = 0; i < 14; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    dates.push(date.toISOString().split("T")[0])
  }

  return dates
}

const dates = generateDates()

// Generate random time slots
const generateTimeSlots = () => {
  const slots = []
  const count = Math.floor(Math.random() * 5) + 1 // 1-5 slots

  const possibleSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
    "18:00",
    "18:30",
  ]

  const selectedIndexes = new Set()
  while (selectedIndexes.size < count) {
    const index = Math.floor(Math.random() * possibleSlots.length)
    selectedIndexes.add(index)
  }

  return Array.from(selectedIndexes)
    .map((index) => possibleSlots[index])
    .sort()
}

// Generate availability for each date
const generateAvailability = () => {
  return dates.map((date) => ({
    date,
    slots: Math.random() > 0.3 ? generateTimeSlots() : [], // 30% chance of no availability
  }))
}

export const doctors: Doctor[] = [
  {
    id: "1",
    name: "Dra. Ana Martínez",
    specialty: "Cardiología",
    location: "Providencia",
    address: "Av. Providencia 1208, Providencia",
    rating: 4.8,
    reviewCount: 124,
    insuranceTypes: ["Fonasa", "Isapre Banmédica", "Isapre Cruz Blanca"],
    availability: generateAvailability(),
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: "2",
    name: "Dr. Carlos Rodríguez",
    specialty: "Dermatología",
    location: "Las Condes",
    address: "Av. Apoquindo 4501, Las Condes",
    rating: 4.6,
    reviewCount: 98,
    insuranceTypes: ["Isapre Banmédica", "Isapre Colmena", "Particular"],
    availability: generateAvailability(),
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: "3",
    name: "Dr. Javier Morales",
    specialty: "Neurología",
    location: "Santiago Centro",
    address: "Alameda 1340, Santiago",
    rating: 4.9,
    reviewCount: 156,
    insuranceTypes: ["Fonasa", "Isapre Cruz Blanca", "Isapre Vida Tres"],
    availability: generateAvailability(),
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: "4",
    name: "Dra. Valentina Soto",
    specialty: "Pediatría",
    location: "Ñuñoa",
    address: "Irarrázaval 3412, Ñuñoa",
    rating: 4.7,
    reviewCount: 203,
    insuranceTypes: ["Fonasa", "Isapre Banmédica", "Isapre Colmena"],
    availability: generateAvailability(),
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: "5",
    name: "Dr. Matías González",
    specialty: "Oftalmología",
    location: "Providencia",
    address: "Los Leones 220, Providencia",
    rating: 4.5,
    reviewCount: 87,
    insuranceTypes: ["Isapre Cruz Blanca", "Isapre Vida Tres", "Particular"],
    availability: generateAvailability(),
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: "6",
    name: "Dra. Camila Vargas",
    specialty: "Ortopedia",
    location: "Las Condes",
    address: "Manquehue Norte 1407, Las Condes",
    rating: 4.8,
    reviewCount: 112,
    insuranceTypes: ["Fonasa", "Isapre Banmédica", "Isapre Colmena"],
    availability: generateAvailability(),
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: "7",
    name: "Dr. Felipe Rojas",
    specialty: "Psiquiatría",
    location: "Vitacura",
    address: "Vitacura 4380, Vitacura",
    rating: 4.9,
    reviewCount: 94,
    insuranceTypes: ["Isapre Banmédica", "Isapre Vida Tres", "Particular"],
    availability: generateAvailability(),
    image: "/placeholder.svg?height=150&width=150",
  },
  {
    id: "8",
    name: "Dra. Daniela Muñoz",
    specialty: "Ginecología",
    location: "La Florida",
    address: "Vicuña Mackenna 7110, La Florida",
    rating: 4.7,
    reviewCount: 178,
    insuranceTypes: ["Fonasa", "Isapre Cruz Blanca", "Isapre Colmena"],
    availability: generateAvailability(),
    image: "/placeholder.svg?height=150&width=150",
  },
]

export const upcomingAppointments = [
  {
    id: "a1",
    patientName: "Juan Pérez",
    date: "2025-03-01",
    time: "10:00",
    type: "Consulta",
    status: "Confirmada",
  },
  {
    id: "a2",
    patientName: "María González",
    date: "2025-03-01",
    time: "11:30",
    type: "Control",
    status: "Confirmada",
  },
  {
    id: "a3",
    patientName: "Pedro Soto",
    date: "2025-03-02",
    time: "09:00",
    type: "Consulta",
    status: "Pendiente",
  },
  {
    id: "a4",
    patientName: "Ana Silva",
    date: "2025-03-02",
    time: "16:30",
    type: "Examen",
    status: "Confirmada",
  },
]

