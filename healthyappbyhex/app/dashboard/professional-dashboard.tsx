"use client"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash2, Calendar } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Logo } from "@/components/logo"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { motion, AnimatePresence } from "framer-motion"

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
        <TabsList className="w-full justify-start overflow-x-auto">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="appointments">Citas</TabsTrigger>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Citas Confirmadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-4">{confirmedAppointments.length} citas</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ingresos Totales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-4">
              {new Intl.NumberFormat("es-CO", {
                style: "currency",
                currency: "COP",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              }).format(totalEarnings)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Próximas Citas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {confirmedAppointments.slice(0, 3).map((appointment) => (
              <div key={appointment.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{appointment.patientName}</p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(appointment.date)} - {appointment.time}
                  </p>
                </div>
                <Badge>{appointment.type}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button className="w-full">
              <Plus className="mr-2 h-4 w-4" /> Nueva Cita
            </Button>
            <Button className="w-full" variant="outline">
              <Calendar className="mr-2 h-4 w-4" /> Ver Agenda
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function AppointmentsTab({ appointments, onAppointmentClick, formatDate }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl">Citas</CardTitle>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nueva Cita
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors duration-200"
              onClick={() => onAppointmentClick(appointment)}
            >
              <div>
                <p className="font-medium">{appointment.patientName}</p>
                <p className="text-sm text-muted-foreground">
                  {formatDate(appointment.date)} - {appointment.time}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant={appointment.status === "Confirmada" ? "default" : "secondary"}>
                  {appointment.status}
                </Badge>
                <Badge variant="outline">{appointment.type}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

