"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Shield, Calendar, ArrowLeft, CheckCircle, Video } from "lucide-react"
import { doctors } from "@/lib/data"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RoleSwitcherButton } from "@/components/role-switcher-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DoctorPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [appointmentType, setAppointmentType] = useState<"Presencial" | "Virtual">("Presencial")
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)
  const [waitlistEmail, setWaitlistEmail] = useState("")
  const [roleInterest, setRoleInterest] = useState("paciente")
  const [currentStep, setCurrentStep] = useState(1)

  const doctor = doctors.find((d) => d.id === params.id)

  if (!doctor) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container py-12 text-center">
          <h1 className="text-2xl font-bold mb-4">Profesional no encontrado</h1>
          <Button onClick={() => router.push("/dashboard")}>Volver al inicio</Button>
        </main>
      </div>
    )
  }

  const handleConfirmAppointment = () => {
    setIsConfirmOpen(false)

    toast({
      title: "Cita agendada con éxito",
      description: `Tu cita ${appointmentType} con ${doctor.name} ha sido confirmada para el ${formatDate(selectedDate!)} a las ${selectedTime}.`,
      duration: 5000,
    })

    // Show waitlist dialog after successful appointment
    setTimeout(() => {
      setIsWaitlistOpen(true)
    }, 1500)
  }

  const handleJoinWaitlist = () => {
    setIsWaitlistOpen(false)

    toast({
      title: "¡Gracias por unirte a nuestra lista de espera!",
      description: "Te enviaremos actualizaciones sobre el lanzamiento de Healthy.",
      duration: 5000,
    })

    // Redirect to dashboard after a delay
    setTimeout(() => {
      router.push("/dashboard")
    }, 2000)
  }

  // Format date to display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date)
  }

  // Group availability by week
  const weeks: { [key: string]: typeof doctor.availability } = {}
  doctor.availability.forEach((day) => {
    const date = new Date(day.date)
    const weekNumber = Math.floor(date.getDate() / 7)
    const weekKey = `week-${weekNumber}`

    if (!weeks[weekKey]) {
      weeks[weekKey] = []
    }

    weeks[weekKey].push(day)
  })

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-6">
      <div className="flex items-center">
        <div
          className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
        >
          1
        </div>
        <div className={`h-1 w-12 ${currentStep >= 2 ? "bg-primary" : "bg-muted"}`}></div>
        <div
          className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
        >
          2
        </div>
        <div className={`h-1 w-12 ${currentStep >= 3 ? "bg-primary" : "bg-muted"}`}></div>
        <div
          className={`h-8 w-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
        >
          3
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 container py-6">
        <Button variant="ghost" className="mb-6" onClick={() => router.push("/dashboard")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver a resultados
        </Button>

        {renderStepIndicator()}

        {currentStep === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="h-32 w-32 rounded-full overflow-hidden bg-muted mb-4">
                      <img
                        src={doctor.image || "/placeholder.svg"}
                        alt={doctor.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <h1 className="text-2xl font-bold">{doctor.name}</h1>
                    <p className="text-muted-foreground">{doctor.specialty}</p>

                    <div className="flex items-center gap-1 mt-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium">{doctor.rating}</span>
                      <span className="text-muted-foreground">({doctor.reviewCount} reseñas)</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Ubicación</span>
                      </div>
                      <p className="text-sm text-muted-foreground pl-6">{doctor.address}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Previsiones aceptadas</span>
                      </div>
                      <div className="flex flex-wrap gap-1 pl-6">
                        {doctor.insuranceTypes.map((insurance) => (
                          <Badge key={insurance} variant="outline" className="text-xs">
                            {insurance}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button className="w-full" onClick={() => setCurrentStep(2)}>
                      Seleccionar este profesional
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="md:col-span-2">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Calendar className="h-5 w-5 text-primary" />
                    <h2 className="text-xl font-bold">Información del profesional</h2>
                  </div>

                  <div className="space-y-4">
                    <p>
                      El Dr. {doctor.name.split(" ")[1]} es especialista en {doctor.specialty} con amplia experiencia en
                      el diagnóstico y tratamiento de pacientes.
                    </p>

                    <div>
                      <h3 className="font-medium mb-2">Formación académica</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Universidad de Chile, Facultad de Medicina</li>
                        <li>Especialidad en {doctor.specialty}, Hospital Clínico Universidad de Chile</li>
                        <li>Diplomado en Gestión de Salud</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Servicios</h3>
                      <ul className="list-disc pl-5 space-y-1 text-sm">
                        <li>Consulta médica</li>
                        <li>Telemedicina</li>
                        <li>Seguimiento de tratamientos</li>
                        <li>Emisión de certificados médicos</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">Selecciona fecha y hora</h2>
              </div>

              <Tabs defaultValue="calendar">
                <TabsList className="mb-4">
                  <TabsTrigger value="calendar">Calendario</TabsTrigger>
                  <TabsTrigger value="type">Tipo de consulta</TabsTrigger>
                </TabsList>

                <TabsContent value="calendar">
                  <div className="space-y-8">
                    {Object.entries(weeks).map(([weekKey, days]) => (
                      <div key={weekKey}>
                        <h3 className="font-medium mb-4">
                          {formatDate(days[0].date)} - {formatDate(days[days.length - 1].date)}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {days.map((day) => (
                            <Card
                              key={day.date}
                              className={`border ${selectedDate === day.date ? "border-primary" : ""}`}
                            >
                              <CardContent className="p-4">
                                <div className="font-medium mb-2">{formatDate(day.date)}</div>

                                {day.slots.length > 0 ? (
                                  <div className="grid grid-cols-2 gap-2">
                                    {day.slots.map((time) => (
                                      <Button
                                        key={`${day.date}-${time}`}
                                        variant={
                                          selectedDate === day.date && selectedTime === time ? "default" : "outline"
                                        }
                                        size="sm"
                                        className="w-full"
                                        onClick={() => {
                                          setSelectedDate(day.date)
                                          setSelectedTime(time)
                                        }}
                                      >
                                        {time}
                                      </Button>
                                    ))}
                                  </div>
                                ) : (
                                  <p className="text-sm text-muted-foreground text-center py-2">
                                    No hay horarios disponibles
                                  </p>
                                )}
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="type">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                    <Card
                      className={`cursor-pointer hover:border-primary transition-colors ${
                        appointmentType === "Presencial" ? "border-primary" : ""
                      }`}
                      onClick={() => setAppointmentType("Presencial")}
                    >
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                          <MapPin className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-medium mb-1">Consulta Presencial</h3>
                        <p className="text-sm text-muted-foreground">Visita al profesional en su consulta</p>
                      </CardContent>
                    </Card>

                    <Card
                      className={`cursor-pointer hover:border-primary transition-colors ${
                        appointmentType === "Virtual" ? "border-primary" : ""
                      }`}
                      onClick={() => setAppointmentType("Virtual")}
                    >
                      <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                          <Video className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-medium mb-1">Consulta Virtual</h3>
                        <p className="text-sm text-muted-foreground">Videollamada con el profesional</p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-8 flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  Volver
                </Button>
                <Button disabled={!selectedDate || !selectedTime} onClick={() => setCurrentStep(3)}>
                  Continuar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {currentStep === 3 && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <CheckCircle className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">Confirmar cita</h2>
              </div>

              <div className="max-w-2xl mx-auto">
                <div className="bg-muted p-6 rounded-lg mb-6">
                  <h3 className="font-medium mb-4">Resumen de la cita</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Profesional</p>
                      <p className="font-medium">{doctor.name}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Especialidad</p>
                      <p className="font-medium">{doctor.specialty}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Fecha</p>
                      <p className="font-medium">{selectedDate ? formatDate(selectedDate) : ""}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Hora</p>
                      <p className="font-medium">{selectedTime}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Tipo de consulta</p>
                      <p className="font-medium">{appointmentType}</p>
                    </div>

                    <div>
                      <p className="text-sm text-muted-foreground">Dirección</p>
                      <p className="font-medium">
                        {appointmentType === "Presencial" ? doctor.address : "Videollamada"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      placeholder="tu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      placeholder="+56 9 1234 5678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep(2)}>
                    Volver
                  </Button>
                  <Button onClick={handleConfirmAppointment}>Confirmar cita</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      <RoleSwitcherButton />

      <Dialog open={isWaitlistOpen} onOpenChange={setIsWaitlistOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¡Únete a nuestra lista de espera!</DialogTitle>
            <DialogDescription>
              Recibe actualizaciones sobre el lanzamiento de Healthy y sé el primero en acceder a todas las
              funcionalidades.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="waitlist-email">Email</Label>
              <Input
                id="waitlist-email"
                placeholder="tu@email.com"
                value={waitlistEmail}
                onChange={(e) => setWaitlistEmail(e.target.value)}
              />
            </div>

            <div>
              <Label>Me interesa usar Healthy como:</Label>
              <div className="flex gap-4 mt-2">
                <Button
                  type="button"
                  variant={roleInterest === "paciente" ? "default" : "outline"}
                  onClick={() => setRoleInterest("paciente")}
                  className="flex-1"
                >
                  Paciente
                </Button>
                <Button
                  type="button"
                  variant={roleInterest === "profesional" ? "default" : "outline"}
                  onClick={() => setRoleInterest("profesional")}
                  className="flex-1"
                >
                  Profesional
                </Button>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsWaitlistOpen(false)}>
              Ahora no
            </Button>
            <Button onClick={handleJoinWaitlist}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Unirme a la lista
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <footer className="border-t py-4">
        <div className="container">
          <p className="text-sm text-muted-foreground text-center">Demo con datos ficticios - Producto en desarrollo</p>
        </div>
      </footer>
    </div>
  )
}

