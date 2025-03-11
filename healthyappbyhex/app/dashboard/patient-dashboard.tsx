"use client"
import { useState } from "react"
import {
  Search,
  MapPin,
  Shield,
  Plus,
  FileText,
  Calendar,
  Bell,
  MessageSquare,
  Activity,
  Pill,
  Heart,
  ChevronRight,
  Clock,
  CheckCircle,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { specialties, doctors, insuranceTypes } from "@/lib/data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Logo } from "@/components/logo"
import { motion, AnimatePresence } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { Star } from "lucide-react"

export function PatientDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("")
  const [selectedInsurance, setSelectedInsurance] = useState<string>("")
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const { toast } = useToast()
  const [selectedAppointment, setSelectedAppointment] = useState(null)

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

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment)
    setShowAppointmentDetails(true)
  }

  return (
    <div className="container py-6 px-4 sm:px-6">
      <div className="mb-8 text-center">
        <Logo className="mx-auto mb-6" color="hsl(196 100% 47%)" size={64} />
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Bienvenido a Healthy</h1>
        <p className="text-xl text-muted-foreground">Tu salud, simplificada</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="w-full justify-start overflow-x-auto p-1 bg-muted/50 rounded-lg">
          <TabsTrigger value="overview" className="flex items-center gap-1.5">
            <Activity className="h-4 w-4" />
            <span>Resumen</span>
          </TabsTrigger>
          <TabsTrigger value="appointments" className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span>Citas</span>
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>Historial</span>
          </TabsTrigger>
          <TabsTrigger value="records" className="flex items-center gap-1.5">
            <FileText className="h-4 w-4" />
            <span>Expediente</span>
          </TabsTrigger>
          <TabsTrigger value="messages" className="flex items-center gap-1.5">
            <MessageSquare className="h-4 w-4" />
            <span>Mensajes</span>
          </TabsTrigger>
          <TabsTrigger
            value="search"
            className="flex items-center gap-1.5 bg-primary/10 text-primary hover:bg-primary/20 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Search className="h-4 w-4" />
            <span>Buscar Profesional</span>
          </TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <TabsContent value="overview">
              <OverviewTab formatDate={formatDate} onAppointmentClick={handleAppointmentClick} />
            </TabsContent>

            <TabsContent value="appointments">
              <AppointmentsTab formatDate={formatDate} onAppointmentClick={handleAppointmentClick} />
            </TabsContent>

            <TabsContent value="history">
              <AppointmentHistoryTab formatDate={formatDate} />
            </TabsContent>

            <TabsContent value="records">
              <MedicalRecordsTab />
            </TabsContent>

            <TabsContent value="messages">
              <MessagesTab />
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
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Detalles de la cita</DialogTitle>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt={selectedAppointment.doctor} />
                  <AvatarFallback>
                    {selectedAppointment.doctor.split(" ")[1][0]}
                    {selectedAppointment.doctor.split(" ")[0][0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{selectedAppointment.doctor}</h3>
                  <p className="text-muted-foreground">{selectedAppointment.specialty}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted p-3 rounded-md">
                  <p className="text-sm text-muted-foreground">Fecha</p>
                  <p className="font-medium">{formatDate(selectedAppointment.date)}</p>
                </div>
                <div className="bg-muted p-3 rounded-md">
                  <p className="text-sm text-muted-foreground">Hora</p>
                  <p className="font-medium">{selectedAppointment.time}</p>
                </div>
                <div className="bg-muted p-3 rounded-md">
                  <p className="text-sm text-muted-foreground">Tipo</p>
                  <p className="font-medium">{selectedAppointment.type || "Consulta"}</p>
                </div>
                <div className="bg-muted p-3 rounded-md">
                  <p className="text-sm text-muted-foreground">Modalidad</p>
                  <p className="font-medium">{selectedAppointment.modality || "Presencial"}</p>
                </div>
              </div>

              <div className="bg-muted p-3 rounded-md">
                <p className="text-sm text-muted-foreground">Dirección</p>
                <p className="font-medium">{selectedAppointment.address || "Av. Providencia 1208, Providencia"}</p>
              </div>

              <div className="bg-muted p-3 rounded-md">
                <p className="text-sm text-muted-foreground">Notas</p>
                <p className="font-medium">
                  {selectedAppointment.notes || "Traer resultados de exámenes previos si los tiene."}
                </p>
              </div>
            </div>
          )}
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="flex-1" onClick={() => setShowAppointmentDetails(false)}>
              Volver
            </Button>
            <Button variant="outline" className="flex-1">
              <MessageSquare className="h-4 w-4 mr-2" />
              Contactar
            </Button>
            <Button variant="destructive" className="flex-1" onClick={handleCancelAppointment}>
              Cancelar cita
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function OverviewTab({ formatDate, onAppointmentClick }) {
  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dra. Ana Martínez",
      specialty: "Cardiología",
      date: "2025-03-15",
      time: "10:00 AM",
      modality: "Presencial",
    },
    {
      id: 2,
      doctor: "Dr. Carlos Rodríguez",
      specialty: "Dermatología",
      date: "2025-03-22",
      time: "3:30 PM",
      modality: "Virtual",
    },
  ]

  const medications = [
    { id: 1, name: "Atorvastatina", dosage: "20mg", frequency: "1 vez al día", time: "Noche", remaining: 10 },
    { id: 2, name: "Losartán", dosage: "50mg", frequency: "1 vez al día", time: "Mañana", remaining: 15 },
  ]

  const healthMetrics = [
    { name: "Presión arterial", value: "120/80", status: "normal", lastUpdated: "Hace 2 días" },
    { name: "Glucosa", value: "95 mg/dL", status: "normal", lastUpdated: "Hace 1 semana" },
    { name: "Peso", value: "75 kg", status: "normal", lastUpdated: "Hace 3 días" },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-primary" />
              Próxima cita
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingAppointments.length > 0 ? (
              <div
                className="cursor-pointer hover:bg-accent p-2 rounded-md transition-colors"
                onClick={() => onAppointmentClick(upcomingAppointments[0])}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=30&width=30" alt={upcomingAppointments[0].doctor} />
                    <AvatarFallback>
                      {upcomingAppointments[0].doctor.split(" ")[1][0]}
                      {upcomingAppointments[0].doctor.split(" ")[0][0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{upcomingAppointments[0].doctor}</p>
                    <p className="text-xs text-muted-foreground">{upcomingAppointments[0].specialty}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm mt-2">
                  <Badge variant="outline" className="bg-primary/10">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(upcomingAppointments[0].date)}
                  </Badge>
                  <Badge variant="outline" className="bg-primary/10">
                    <Clock className="h-3 w-3 mr-1" />
                    {upcomingAppointments[0].time}
                  </Badge>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">No tienes citas programadas</p>
            )}
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" size="sm" className="w-full" asChild>
              <Link href="#" onClick={() => document.querySelector('[data-value="appointments"]')?.click()}>
                Ver todas las citas
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Pill className="h-5 w-5 mr-2 text-primary" />
              Medicamentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {medications.map((med) => (
                <div
                  key={med.id}
                  className="flex justify-between items-center p-2 hover:bg-accent rounded-md transition-colors"
                >
                  <div>
                    <p className="font-medium">
                      {med.name} {med.dosage}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {med.frequency} ({med.time})
                    </p>
                  </div>
                  <Badge variant={med.remaining <= 5 ? "destructive" : "outline"}>{med.remaining} restantes</Badge>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" size="sm" className="w-full">
              Ver todos los medicamentos
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Activity className="h-5 w-5 mr-2 text-primary" />
              Métricas de salud
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {healthMetrics.map((metric, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-2 hover:bg-accent rounded-md transition-colors"
                >
                  <div>
                    <p className="font-medium">{metric.name}</p>
                    <p className="text-xs text-muted-foreground">{metric.lastUpdated}</p>
                  </div>
                  <Badge variant={metric.status === "normal" ? "outline" : "destructive"} className="bg-primary/10">
                    {metric.value}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button variant="outline" size="sm" className="w-full">
              Ver todas las métricas
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Heart className="h-5 w-5 mr-2 text-primary" />
              Resumen de salud
            </CardTitle>
            <CardDescription>Tu progreso hacia tus objetivos de salud</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Actividad física</span>
                  <span className="text-sm text-muted-foreground">70%</span>
                </div>
                <Progress value={70} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Nutrición</span>
                  <span className="text-sm text-muted-foreground">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Sueño</span>
                  <span className="text-sm text-muted-foreground">60%</span>
                </div>
                <Progress value={60} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Adherencia a medicamentos</span>
                  <span className="text-sm text-muted-foreground">95%</span>
                </div>
                <Progress value={95} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Bell className="h-5 w-5 mr-2 text-primary" />
              Recordatorios y notificaciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-2 rounded-md bg-primary/5">
                <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Recordatorio de cita</p>
                  <p className="text-sm text-muted-foreground">Cita con Dra. Ana Martínez mañana a las 10:00 AM</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-2 rounded-md bg-primary/5">
                <Pill className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Tomar medicamento</p>
                  <p className="text-sm text-muted-foreground">Atorvastatina 20mg hoy a las 9:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-2 rounded-md bg-primary/5">
                <FileText className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-medium">Resultados disponibles</p>
                  <p className="text-sm text-muted-foreground">
                    Tus resultados de laboratorio están listos para revisar
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              Ver todas las notificaciones
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

function AppointmentsTab({ formatDate, onAppointmentClick }) {
  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dra. Ana Martínez",
      specialty: "Cardiología",
      date: "2025-03-15",
      time: "10:00 AM",
      modality: "Presencial",
      address: "Av. Providencia 1208, Providencia",
      notes: "Traer resultados de exámenes previos.",
    },
    {
      id: 2,
      doctor: "Dr. Carlos Rodríguez",
      specialty: "Dermatología",
      date: "2025-03-22",
      time: "3:30 PM",
      modality: "Virtual",
      address: "Enlace de videollamada",
      notes: "Tener buena iluminación para la consulta.",
    },
    {
      id: 3,
      doctor: "Dra. Laura Sánchez",
      specialty: "Neurología",
      date: "2025-04-05",
      time: "11:15 AM",
      modality: "Presencial",
      address: "Av. Las Condes 12345, Las Condes",
      notes: "Traer historial médico completo.",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl">Próximas Citas</CardTitle>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Agendar nueva cita
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors duration-200"
              onClick={() => onAppointmentClick(appointment)}
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt={appointment.doctor} />
                  <AvatarFallback>
                    {appointment.doctor.split(" ")[1][0]}
                    {appointment.doctor.split(" ")[0][0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{appointment.doctor}</p>
                  <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs bg-primary/5">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatDate(appointment.date)}
                    </Badge>
                    <Badge variant="outline" className="text-xs bg-primary/5">
                      <Clock className="h-3 w-3 mr-1" />
                      {appointment.time}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={appointment.modality === "Presencial" ? "default" : "secondary"}>
                  {appointment.modality}
                </Badge>
                <Button variant="ghost" size="icon">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function AppointmentHistoryTab({ formatDate }) {
  const pastAppointments = [
    {
      id: 1,
      doctor: "Dr. Juan Pérez",
      specialty: "Medicina General",
      date: "2025-02-10",
      time: "09:00 AM",
      diagnosis: "Resfriado común",
      prescription: "Paracetamol 500mg",
    },
    {
      id: 2,
      doctor: "Dra. María López",
      specialty: "Oftalmología",
      date: "2025-01-20",
      time: "2:00 PM",
      diagnosis: "Astigmatismo leve",
      prescription: "Lentes correctivos",
    },
    {
      id: 3,
      doctor: "Dr. Pedro Gómez",
      specialty: "Traumatología",
      date: "2024-12-05",
      time: "11:30 AM",
      diagnosis: "Esguince de tobillo",
      prescription: "Reposo y antiinflamatorios",
    },
    {
      id: 4,
      doctor: "Dra. Ana Martínez",
      specialty: "Cardiología",
      date: "2024-11-15",
      time: "10:00 AM",
      diagnosis: "Hipertensión leve",
      prescription: "Losartán 50mg",
    },
    {
      id: 5,
      doctor: "Dr. Carlos Rodríguez",
      specialty: "Dermatología",
      date: "2024-10-22",
      time: "3:30 PM",
      diagnosis: "Dermatitis",
      prescription: "Crema hidrocortisona",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Historial de Citas</CardTitle>
        <CardDescription>Registro de tus consultas médicas anteriores</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pastAppointments.map((appointment) => (
            <div key={appointment.id} className="border rounded-lg overflow-hidden">
              <div className="flex items-center justify-between p-4 bg-muted/50">
                <div className="flex items-center gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=40&width=40" alt={appointment.doctor} />
                    <AvatarFallback>
                      {appointment.doctor.split(" ")[1][0]}
                      {appointment.doctor.split(" ")[0][0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{appointment.doctor}</p>
                    <p className="text-sm text-muted-foreground">{appointment.specialty}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{formatDate(appointment.date)}</p>
                  <p className="text-xs text-muted-foreground">{appointment.time}</p>
                </div>
              </div>
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Diagnóstico</p>
                  <p className="font-medium">{appointment.diagnosis}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Prescripción</p>
                  <p className="font-medium">{appointment.prescription}</p>
                </div>
              </div>
              <div className="p-4 pt-0 flex justify-end">
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" /> Ver detalles completos
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function MedicalRecordsTab() {
  const medicalRecords = [
    {
      id: 1,
      type: "Laboratorio",
      name: "Hemograma completo",
      date: "15/02/2025",
      provider: "Laboratorio Central",
      status: "Completado",
    },
    {
      id: 2,
      type: "Imagen",
      name: "Radiografía de tórax",
      date: "20/01/2025",
      provider: "Centro de Imágenes Médicas",
      status: "Completado",
    },
    {
      id: 3,
      type: "Consulta",
      name: "Evaluación cardiológica",
      date: "10/02/2025",
      provider: "Dra. Ana Martínez",
      status: "Completado",
    },
    {
      id: 4,
      type: "Laboratorio",
      name: "Perfil lipídico",
      date: "15/02/2025",
      provider: "Laboratorio Central",
      status: "Pendiente",
    },
  ]

  const conditions = [
    { name: "Hipertensión arterial", since: "2023", status: "Controlada" },
    { name: "Astigmatismo", since: "2020", status: "Controlada" },
  ]

  const allergies = [
    { name: "Penicilina", severity: "Alta", notes: "Reacción alérgica severa" },
    { name: "Polen", severity: "Media", notes: "Rinitis alérgica estacional" },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Expediente Médico</CardTitle>
          <CardDescription>Accede a tu historial médico completo</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Exámenes y Procedimientos Recientes</h3>
              <div className="space-y-3">
                {medicalRecords.map((record) => (
                  <div
                    key={record.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{record.type}</Badge>
                        <p className="font-medium">{record.name}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm text-muted-foreground">{record.date}</p>
                        <span className="text-muted-foreground">•</span>
                        <p className="text-sm text-muted-foreground">{record.provider}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={record.status === "Completado" ? "default" : "secondary"}>{record.status}</Badge>
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4 mr-2" /> Ver
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">Condiciones Médicas</h3>
                {conditions.length > 0 ? (
                  <div className="space-y-3">
                    {conditions.map((condition, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <p className="font-medium">{condition.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-sm text-muted-foreground">Desde {condition.since}</p>
                          <Badge variant="outline">{condition.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No hay condiciones médicas registradas</p>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Alergias</h3>
                {allergies.length > 0 ? (
                  <div className="space-y-3">
                    {allergies.map((allergy, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{allergy.name}</p>
                          <Badge variant={allergy.severity === "Alta" ? "destructive" : "outline"}>
                            {allergy.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{allergy.notes}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No hay alergias registradas</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <FileText className="h-4 w-4 mr-2" /> Descargar historial médico completo
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function MessagesTab() {
  const conversations = [
    {
      id: 1,
      doctor: "Dra. Ana Martínez",
      specialty: "Cardiología",
      lastMessage: "Gracias por enviar tus resultados. Todo se ve bien, continuaremos con el mismo tratamiento.",
      time: "Hace 2 días",
      unread: false,
    },
    {
      id: 2,
      doctor: "Dr. Carlos Rodríguez",
      specialty: "Dermatología",
      lastMessage: "Por favor, envíame fotos de cómo ha evolucionado la lesión con el tratamiento.",
      time: "Hace 5 horas",
      unread: true,
    },
    {
      id: 3,
      doctor: "Dra. Laura Sánchez",
      specialty: "Neurología",
      lastMessage: "Recuerda tomar el medicamento según lo indicado y reportar cualquier efecto secundario.",
      time: "Hace 1 semana",
      unread: false,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Mensajes</CardTitle>
        <CardDescription>Comunícate con tus profesionales de salud</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors ${conversation.unread ? "border-primary" : ""}`}
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt={conversation.doctor} />
                  <AvatarFallback>
                    {conversation.doctor.split(" ")[1][0]}
                    {conversation.doctor.split(" ")[0][0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{conversation.doctor}</p>
                    {conversation.unread && <Badge className="h-2 w-2 rounded-full p-0 bg-primary" />}
                  </div>
                  <p className="text-sm text-muted-foreground">{conversation.specialty}</p>
                  <p className="text-sm line-clamp-1 mt-1">{conversation.lastMessage}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <p className="text-xs text-muted-foreground">{conversation.time}</p>
                <Button variant="ghost" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" /> Responder
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">
          <Plus className="h-4 w-4 mr-2" /> Nuevo mensaje
        </Button>
      </CardFooter>
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
    <div className="space-y-6">
      {/* Hero section with prominent search button */}
      <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-6 md:p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Encuentra tu especialista ideal</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Busca entre los mejores profesionales de la salud y agenda tu cita en minutos
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Buscar por nombre, especialidad o síntoma..."
                className="pl-10 h-12 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Especialidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Todas las especialidades</SelectItem>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty.id} value={specialty.name}>
                      {specialty.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedInsurance} onValueChange={setSelectedInsurance}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Previsión" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Todas las previsiones</SelectItem>
                  {insuranceTypes.map((insurance) => (
                    <SelectItem key={insurance} value={insurance}>
                      {insurance}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full h-12 text-base font-medium mt-2 bg-primary hover:bg-primary/90 transition-all shadow-md hover:shadow-lg">
              <Search className="mr-2 h-5 w-5" /> Buscar citas disponibles
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Popular specialties section */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Especialidades populares</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {specialties.slice(0, 8).map((specialty) => (
            <Button
              key={specialty.id}
              variant="outline"
              className="h-auto py-3 justify-start gap-2 hover:bg-primary/5 hover:border-primary/30"
              onClick={() => setSelectedSpecialty(specialty.name)}
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary text-sm">{specialty.name.charAt(0)}</span>
              </div>
              <div className="text-left">
                <span className="block text-sm font-medium">{specialty.name}</span>
                <span className="text-xs text-muted-foreground">{specialty.count} profesionales</span>
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Results section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Profesionales disponibles</h3>
          <p className="text-sm text-muted-foreground">{filteredDoctors.length} resultados</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="overflow-hidden hover:border-primary/50 transition-colors">
              <div className="p-4">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={doctor.image} alt={doctor.name} />
                    <AvatarFallback>
                      {doctor.name.split(" ")[1][0]}
                      {doctor.name.split(" ")[0][0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{doctor.name}</h3>
                    <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(doctor.rating)
                                ? "text-yellow-500 fill-yellow-500"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">({doctor.reviewCount})</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{doctor.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
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
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1 bg-primary hover:bg-primary/90">
                    <Calendar className="mr-2 h-4 w-4" /> Ver disponibilidad
                  </Button>
                  <Button variant="outline" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="px-4 py-3 bg-muted/50 border-t">
                <p className="text-sm font-medium">Próxima disponibilidad:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {doctor.availability
                    .filter((day) => day.slots.length > 0)
                    .slice(0, 1)
                    .map((day) => (
                      <div key={day.date} className="flex items-center gap-1">
                        <Badge variant="outline" className="text-xs bg-primary/5">
                          {new Date(day.date).toLocaleDateString("es-ES", { day: "numeric", month: "short" })}
                        </Badge>
                        <Badge variant="outline" className="text-xs bg-primary/5">
                          {day.slots[0]}
                        </Badge>
                      </div>
                    ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredDoctors.length > 0 && (
          <div className="text-center mt-6">
            <Button variant="outline">
              Ver más profesionales
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}

        {filteredDoctors.length === 0 && (
          <Card className="p-8 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No se encontraron resultados</h3>
            <p className="text-muted-foreground mb-4">Intenta con otros términos de búsqueda o ajusta los filtros</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchQuery("")
                setSelectedSpecialty("")
                setSelectedInsurance("")
              }}
            >
              Limpiar filtros
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}

