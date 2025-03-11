"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Plus,
  Edit,
  Trash2,
  Calendar,
  Activity,
  Users,
  DollarSign,
  Clock,
  ChevronRight,
  CheckCircle,
  TrendingUp,
  User,
  Star,
  BarChart4,
  CalendarClock,
  Search,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Logo } from "@/components/logo"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function ProfessionalDashboard() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showAppointmentDetailsDialog, setShowAppointmentDetailsDialog] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const { toast } = useToast()
  const router = useRouter()

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date)
  }

  const handleAppointmentAction = (action: string) => {
    setShowAppointmentDetailsDialog(false)
    toast({
      title: `Cita ${action}`,
      description: `La cita ha sido ${action} exitosamente.`,
      duration: 3000,
    })
  }

  const generateAppointments = (startDate: Date, numDays: number) => {
    const appointments = []
    const patients = ["Ana García", "Carlos Rodríguez", "María López", "Juan Martínez", "Laura Sánchez"]
    const types = ["Consulta", "Control", "Examen"]
    const statuses = ["Confirmada", "Pendiente"]
    const fees = [50000, 60000, 75000, 100000] // Tarifas en pesos colombianos

    for (let i = 0; i < numDays; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      const numAppointments = Math.floor(Math.random() * 5) + 1 // 1 a 5 citas por día

      for (let j = 0; j < numAppointments; j++) {
        appointments.push({
          id: `${date.toISOString()}-${j}`,
          patientName: patients[Math.floor(Math.random() * patients.length)],
          date: date.toISOString().split("T")[0],
          time: `${Math.floor(Math.random() * 8) + 9}:${Math.random() < 0.5 ? "00" : "30"}`,
          type: types[Math.floor(Math.random() * types.length)],
          status: statuses[Math.floor(Math.random() * statuses.length)],
          fee: fees[Math.floor(Math.random() * fees.length)],
        })
      }
    }

    return appointments
  }

  const [appointments, setAppointments] = useState(() => generateAppointments(new Date(), 30))

  const confirmedAppointments = appointments.filter((app) => app.status === "Confirmada")
  const totalEarnings = confirmedAppointments.reduce((sum, app) => sum + app.fee, 0)

  return (
    <div className="container py-6 px-4 sm:px-6">
      <div className="mb-8 text-center">
        <Logo className="mx-auto mb-6" color="hsl(142 76% 36%)" size={64} />
        <h1 className="text-3xl sm:text-4xl font-bold mb-2">Bienvenido a Healthy</h1>
        <p className="text-xl text-muted-foreground">Panel del Profesional</p>
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
          <TabsTrigger value="patients" className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            <span>Pacientes</span>
          </TabsTrigger>
          <TabsTrigger value="finances" className="flex items-center gap-1.5">
            <DollarSign className="h-4 w-4" />
            <span>Finanzas</span>
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>Horarios</span>
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
              <OverviewTab
                confirmedAppointments={confirmedAppointments}
                totalEarnings={totalEarnings}
                formatDate={formatDate}
              />
            </TabsContent>

            <TabsContent value="appointments">
              <AppointmentsTab
                appointments={appointments}
                onAppointmentClick={(appointment) => {
                  setSelectedAppointment(appointment)
                  setShowAppointmentDetailsDialog(true)
                }}
                formatDate={formatDate}
              />
            </TabsContent>

            <TabsContent value="patients">
              <PatientsTab />
            </TabsContent>

            <TabsContent value="finances">
              <FinancesTab />
            </TabsContent>

            <TabsContent value="schedule">
              <ScheduleTab />
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>

      <Dialog open={showAppointmentDetailsDialog} onOpenChange={setShowAppointmentDetailsDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Detalles de la cita</DialogTitle>
          </DialogHeader>
          {selectedAppointment && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Paciente
                </Label>
                <div id="name" className="col-span-3">
                  {selectedAppointment.patientName}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Fecha
                </Label>
                <div id="date" className="col-span-3">
                  {formatDate(selectedAppointment.date)}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="time" className="text-right">
                  Hora
                </Label>
                <div id="time" className="col-span-3">
                  {selectedAppointment.time}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Tipo
                </Label>
                <div id="type" className="col-span-3">
                  {selectedAppointment.type}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Estado
                </Label>
                <div id="status" className="col-span-3">
                  <Badge variant={selectedAppointment.status === "Confirmada" ? "default" : "secondary"}>
                    {selectedAppointment.status}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fee" className="text-right">
                  Tarifa
                </Label>
                <div id="fee" className="col-span-3">
                  {new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(selectedAppointment.fee)}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => handleAppointmentAction("reprogramada")}>
              <Edit className="h-4 w-4 mr-2" />
              Reprogramar
            </Button>
            <Button variant="destructive" onClick={() => handleAppointmentAction("cancelada")}>
              <Trash2 className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function OverviewTab({ confirmedAppointments, totalEarnings, formatDate }) {
  return (
    <div className="space-y-6">
      {/* Tarjetas de estadísticas principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Citas Confirmadas</p>
                <h3 className="text-3xl font-bold">{confirmedAppointments.length}</h3>
                <p className="text-sm text-muted-foreground mt-1">Este mes</p>
              </div>
              <div className="h-12 w-12 bg-primary/20 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Ingresos Totales</p>
                <h3 className="text-3xl font-bold">
                  {new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(totalEarnings)}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  <span className="text-green-500 font-medium">↑ 12%</span> vs. mes anterior
                </p>
              </div>
              <div className="h-12 w-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Pacientes Nuevos</p>
                <h3 className="text-3xl font-bold">8</h3>
                <p className="text-sm text-muted-foreground mt-1">Últimos 30 días</p>
              </div>
              <div className="h-12 w-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-blue-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Valoración</p>
                <h3 className="text-3xl font-bold">4.8</h3>
                <div className="flex items-center mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${i < 4 ? "text-amber-500 fill-amber-500" : "text-amber-500/30 fill-amber-500/30"}`}
                    />
                  ))}
                </div>
              </div>
              <div className="h-12 w-12 bg-amber-500/20 rounded-full flex items-center justify-center">
                <Star className="h-6 w-6 text-amber-500" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de ingresos */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <BarChart4 className="h-5 w-5 text-primary" />
            Ingresos Mensuales
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline">Este año</Badge>
            <Button variant="ghost" size="sm">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-[200px] w-full flex items-end justify-between gap-2 px-2">
            {Array.from({ length: 12 }).map((_, i) => {
              const height = Math.floor(Math.random() * 80) + 20
              const isCurrentMonth = i === new Date().getMonth()
              return (
                <div key={i} className="relative flex flex-col items-center">
                  <div
                    className={`w-12 rounded-t-md ${isCurrentMonth ? "bg-primary" : "bg-primary/20"}`}
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="text-xs text-muted-foreground mt-2">
                    {new Date(0, i).toLocaleString("default", { month: "short" })}
                  </span>
                  {isCurrentMonth && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                      Actual
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Próximas citas */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <CalendarClock className="h-5 w-5 text-primary" />
            Próximas Citas
          </CardTitle>
          <Button variant="outline" size="sm">
            Ver todas
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {confirmedAppointments.slice(0, 3).map((appointment, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {appointment.patientName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{appointment.patientName}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {formatDate(appointment.date)}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {appointment.time}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Badge>{appointment.type}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Acciones rápidas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="hover:border-primary/50 transition-colors">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Plus className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium mb-2">Nueva Cita</h3>
            <p className="text-sm text-muted-foreground mb-4">Agenda una nueva cita con un paciente</p>
            <Button className="w-full">Agendar Cita</Button>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-colors">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium mb-2">Ver Agenda</h3>
            <p className="text-sm text-muted-foreground mb-4">Consulta tu calendario de citas</p>
            <Button variant="outline" className="w-full">
              Ver Agenda
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-colors">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium mb-2">Mis Pacientes</h3>
            <p className="text-sm text-muted-foreground mb-4">Gestiona tu lista de pacientes</p>
            <Button variant="outline" className="w-full">
              Ver Pacientes
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function AppointmentsTab({ appointments, onAppointmentClick, formatDate }) {
  const [filter, setFilter] = useState("all")

  const filteredAppointments = filter === "all" ? appointments : appointments.filter((app) => app.status === filter)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2">
          <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
            Todas
          </Button>
          <Button
            variant={filter === "Confirmada" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("Confirmada")}
          >
            Confirmadas
          </Button>
          <Button
            variant={filter === "Pendiente" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("Pendiente")}
          >
            Pendientes
          </Button>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nueva Cita
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Citas {filter !== "all" ? filter + "s" : ""}
          </CardTitle>
          <CardDescription>
            {filteredAppointments.length} citas {filter !== "all" ? filter.toLowerCase() + "s" : ""} en total
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors duration-200"
                onClick={() => onAppointmentClick(appointment)}
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {appointment.patientName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{appointment.patientName}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {formatDate(appointment.date)}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {appointment.time}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {appointment.type}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={appointment.status === "Confirmada" ? "default" : "secondary"}>
                    {appointment.status}
                  </Badge>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            {filteredAppointments.length === 0 && (
              <div className="text-center py-8">
                <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">
                  No hay citas {filter !== "all" ? filter.toLowerCase() + "s" : ""}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {filter !== "all"
                    ? `No tienes citas ${filter.toLowerCase()}s en este momento.`
                    : "No tienes citas programadas en este momento."}
                </p>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Agendar nueva cita
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function PatientsTab() {
  const patients = [
    { id: 1, name: "Ana García", lastVisit: "2025-02-15", condition: "Hipertensión", status: "Activo" },
    { id: 2, name: "Carlos Rodríguez", lastVisit: "2025-01-20", condition: "Diabetes Tipo 2", status: "Activo" },
    { id: 3, name: "María López", lastVisit: "2024-12-10", condition: "Asma", status: "Activo" },
    { id: 4, name: "Juan Martínez", lastVisit: "2024-11-05", condition: "Artritis", status: "Inactivo" },
    { id: 5, name: "Laura Sánchez", lastVisit: "2024-10-22", condition: "Migraña", status: "Activo" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar pacientes..."
            className="w-full pl-9 pr-4 py-2 rounded-md border border-input bg-background"
          />
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nuevo Paciente
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Mis Pacientes
          </CardTitle>
          <CardDescription>Gestiona tu lista de pacientes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {patients.map((patient) => (
              <div
                key={patient.id}
                className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {patient.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{patient.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        Última visita: {new Date(patient.lastVisit).toLocaleDateString()}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {patient.condition}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={patient.status === "Activo" ? "default" : "secondary"}>{patient.status}</Badge>
                  <Button variant="ghost" size="icon">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function FinancesTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Ingresos Totales</p>
                <h3 className="text-3xl font-bold">$4,250,000</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  <span className="text-green-500 font-medium">↑ 12%</span> vs. mes anterior
                </p>
              </div>
              <div className="h-12 w-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Citas Facturadas</p>
                <h3 className="text-3xl font-bold">42</h3>
                <p className="text-sm text-muted-foreground mt-1">Este mes</p>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Promedio por Cita</p>
                <h3 className="text-3xl font-bold">$101,190</h3>
                <p className="text-sm text-muted-foreground mt-1">Este mes</p>
              </div>
              <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <BarChart4 className="h-5 w-5 text-primary" />
            Ingresos por Mes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full flex items-end justify-between gap-2 px-2">
            {Array.from({ length: 12 }).map((_, i) => {
              const height = Math.floor(Math.random() * 80) + 20
              const isCurrentMonth = i === new Date().getMonth()
              return (
                <div key={i} className="relative flex flex-col items-center">
                  <div
                    className={`w-12 rounded-t-md ${isCurrentMonth ? "bg-primary" : "bg-primary/20"}`}
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="text-xs text-muted-foreground mt-2">
                    {new Date(0, i).toLocaleString("default", { month: "short" })}
                  </span>
                  {isCurrentMonth && (
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                      Actual
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-primary" />
            Últimas Transacciones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {["AG", "CR", "ML", "JM", "LS"][i]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {["Ana García", "Carlos Rodríguez", "María López", "Juan Martínez", "Laura Sánchez"][i]}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {["Consulta", "Control", "Examen", "Consulta", "Control"][i]} -{" "}
                      {new Date(2025, 2, 15 - i * 2).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="font-medium">
                  {new Intl.NumberFormat("es-CO", {
                    style: "currency",
                    currency: "COP",
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format([120000, 80000, 150000, 100000, 90000][i])}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ScheduleTab() {
  const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]
  const timeSlots = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"]

  // Horario de ejemplo
  const schedule = {
    Lunes: ["8:00", "9:00", "10:00", "11:00", "15:00", "16:00", "17:00"],
    Martes: ["8:00", "9:00", "10:00", "11:00", "15:00", "16:00", "17:00"],
    Miércoles: ["8:00", "9:00", "10:00", "11:00", "15:00", "16:00", "17:00"],
    Jueves: ["8:00", "9:00", "10:00", "11:00", "15:00", "16:00", "17:00"],
    Viernes: ["8:00", "9:00", "10:00", "11:00"],
    Sábado: ["9:00", "10:00", "11:00"],
    Domingo: [],
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Mi Horario de Atención
          </CardTitle>
          <CardDescription>Configura tus horas disponibles para citas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-8 gap-2 mb-4">
                <div className="font-medium text-center p-2"></div>
                {daysOfWeek.map((day) => (
                  <div key={day} className="font-medium text-center p-2 bg-muted rounded-md">
                    {day}
                  </div>
                ))}
              </div>

              {timeSlots.map((time) => (
                <div key={time} className="grid grid-cols-8 gap-2 mb-2">
                  <div className="font-medium text-center p-2 bg-muted rounded-md">{time}</div>
                  {daysOfWeek.map((day) => {
                    const isAvailable = schedule[day]?.includes(time)
                    return (
                      <div
                        key={`${day}-${time}`}
                        className={`p-2 rounded-md text-center cursor-pointer transition-colors ${
                          isAvailable
                            ? "bg-primary/20 hover:bg-primary/30 text-primary-foreground"
                            : "bg-muted/30 hover:bg-muted/50"
                        }`}
                      >
                        {isAvailable ? "Disponible" : ""}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="ml-auto">Editar Horario</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

