"use client"
import { useState } from "react"
import { Search, MapPin, Shield, Plus, FileText } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { specialties, doctors, insuranceTypes } from "@/lib/data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Logo } from "@/components/logo"
import { motion, AnimatePresence } from "framer-motion"

export function PatientDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("")
  const [selectedInsurance, setSelectedInsurance] = useState<string>("")
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(false)
  const [activeTab, setActiveTab] = useState("upcoming")
  const { toast } = useToast()

  const filteredDoctors = doctors
    .filter((doctor) => {
      const matchesSearch =
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesSpecialty = !selectedSpecialty || doctor.specialty === selectedSpecialty
      const matchesInsurance = !selectedInsurance || doctor.insuranceTypes.includes(selectedInsurance)

      return matchesSearch && matchesSpecialty && matchesInsurance
    })
    .slice(0, 6)

  const handleCancelAppointment = () => {
    setShowAppointmentDetails(false)
    toast({
      title: "Cita cancelada",
      description: "Tu cita ha sido cancelada exitosamente.",
      duration: 3000,
    })
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date)
  }

  return (
    <div className="container py-6 px-4 sm:px-6">
      <div className="mb-8 text-center">
        <Logo className="mx-auto mb-6" color="hsl(196 100% 47%)" size={64} />
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Bienvenido a Healthy</h1>
        <p className="text-xl text-muted-foreground">Gestiona tus citas médicas</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="upcoming">Próximas Citas</TabsTrigger>
          <TabsTrigger value="history">Historial de Citas</TabsTrigger>
          <TabsTrigger value="search">Buscar Profesional</TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TabsContent value="upcoming">
              <UpcomingAppointmentsTab
                formatDate={formatDate}
                onCancelAppointment={() => setShowAppointmentDetails(true)}
              />
            </TabsContent>

            <TabsContent value="history">
              <AppointmentHistoryTab formatDate={formatDate} />
            </TabsContent>

            <TabsContent value="search">
              <SearchTab
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedSpecialty={selectedSpecialty}
                setSelectedSpecialty={setSelectedSpecialty}
                selectedInsurance={selectedInsurance}
                setSelectedInsurance={setSelectedInsurance}
                filteredDoctors={filteredDoctors}
              />
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>

      <Dialog open={showAppointmentDetails} onOpenChange={setShowAppointmentDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancelar cita</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>¿Estás seguro de que deseas cancelar esta cita?</p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAppointmentDetails(false)}>
                Volver
              </Button>
              <Button variant="destructive" onClick={handleCancelAppointment}>
                Confirmar cancelación
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function UpcomingAppointmentsTab({ formatDate, onCancelAppointment }) {
  const upcomingAppointments = [
    { id: 1, doctor: "Dra. Ana Martínez", specialty: "Cardiología", date: "2025-03-15", time: "10:00 AM" },
    { id: 2, doctor: "Dr. Carlos Rodríguez", specialty: "Dermatología", date: "2025-03-22", time: "3:30 PM" },
    { id: 3, doctor: "Dra. Laura Sánchez", specialty: "Neurología", date: "2025-04-05", time: "11:15 AM" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Próximas Citas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingAppointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{appointment.doctor}</p>
                <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                <p className="text-sm">
                  {formatDate(appointment.date)} - {appointment.time}
                </p>
              </div>
              <Button variant="outline" size="sm" onClick={onCancelAppointment}>
                Cancelar
              </Button>
            </div>
          ))}
        </div>
        <Button className="w-full mt-6">
          <Plus className="mr-2 h-4 w-4" /> Agendar nueva cita
        </Button>
      </CardContent>
    </Card>
  )
}

function AppointmentHistoryTab({ formatDate }) {
  const pastAppointments = [
    { id: 1, doctor: "Dr. Juan Pérez", specialty: "Medicina General", date: "2025-02-10", time: "09:00 AM" },
    { id: 2, doctor: "Dra. María López", specialty: "Oftalmología", date: "2025-01-20", time: "2:00 PM" },
    { id: 3, doctor: "Dr. Pedro Gómez", specialty: "Traumatología", date: "2024-12-05", time: "11:30 AM" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Historial de Citas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pastAppointments.map((appointment) => (
            <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">{appointment.doctor}</p>
                <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                <p className="text-sm">
                  {formatDate(appointment.date)} - {appointment.time}
                </p>
              </div>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" /> Ver detalles
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function SearchTab({
  searchQuery,
  setSearchQuery,
  selectedSpecialty,
  setSelectedSpecialty,
  selectedInsurance,
  setSelectedInsurance,
  filteredDoctors,
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Encuentra tu especialista</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre o especialidad..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger>
                <SelectValue placeholder="Especialidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las especialidades</SelectItem>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty.id} value={specialty.name}>
                    {specialty.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedInsurance} onValueChange={setSelectedInsurance}>
              <SelectTrigger>
                <SelectValue placeholder="Previsión" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las previsiones</SelectItem>
                {insuranceTypes.map((insurance) => (
                  <SelectItem key={insurance} value={insurance}>
                    {insurance}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full overflow-hidden bg-muted">
                    <img
                      src={doctor.image || "/placeholder.svg"}
                      alt={doctor.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{doctor.name}</h3>
                    <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm mb-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{doctor.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm mb-4">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <div className="flex flex-wrap gap-1">
                    {doctor.insuranceTypes.slice(0, 2).map((insurance) => (
                      <Badge key={insurance} variant="secondary" className="text-xs">
                        {insurance}
                      </Badge>
                    ))}
                    {doctor.insuranceTypes.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{doctor.insuranceTypes.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
                <Button className="w-full">Ver disponibilidad</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

