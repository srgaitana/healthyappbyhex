"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { RoleSwitcherButton } from "@/components/role-switcher-button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

export default function WaitlistPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [roleInterest, setRoleInterest] = useState("paciente")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [showTerms, setShowTerms] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!acceptedTerms) {
      toast({
        title: "Términos y condiciones requeridos",
        description: "Debes aceptar los términos y condiciones para continuar.",
        variant: "destructive",
        duration: 3000,
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      toast({
        title: "¡Gracias por unirte a nuestra lista de espera!",
        description: "Te enviaremos actualizaciones sobre el lanzamiento de Healthy.",
        duration: 5000,
      })

      // Reset form
      setEmail("")
      setRoleInterest("paciente")
      setMessage("")
      setAcceptedTerms(false)

      // Redirect after a delay
      setTimeout(() => {
        router.push("/")
      }, 3000)
    }, 1500)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 container py-12">
        <Button variant="ghost" className="mb-6" onClick={() => router.push("/")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver al inicio
        </Button>

        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Únete a nuestra lista de espera</CardTitle>
              <CardDescription>
                Recibe actualizaciones sobre el lanzamiento de Healthy y sé el primero en acceder a todas las
                funcionalidades.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSuccess ? (
                <div className="text-center py-6">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">¡Registro exitoso!</h3>
                  <p className="text-muted-foreground mb-4">
                    Te hemos agregado a nuestra lista de espera. Te notificaremos cuando Healthy esté disponible.
                  </p>
                  <Button onClick={() => router.push("/")}>Volver al inicio</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="tu@email.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Me interesa usar Healthy como:</Label>
                    <div className="flex gap-4">
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

                  <div className="space-y-2">
                    <Label htmlFor="message">Mensaje (opcional)</Label>
                    <Textarea
                      id="message"
                      placeholder="Cuéntanos qué te interesa de Healthy..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  <div className="flex items-start space-x-2 pt-2">
                    <Checkbox
                      id="terms"
                      checked={acceptedTerms}
                      onCheckedChange={(checked) => setAcceptedTerms(checked as boolean)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Acepto los{" "}
                        <button
                          type="button"
                          className="text-primary underline hover:text-primary/80 font-medium"
                          onClick={() => setShowTerms(true)}
                        >
                          términos y condiciones
                        </button>
                      </label>
                      <p className="text-xs text-muted-foreground">
                        Al registrarte, aceptas recibir comunicaciones sobre Healthy.
                      </p>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting || !acceptedTerms}>
                    {isSubmitting ? "Enviando..." : "Unirme a la lista de espera"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Dialog open={showTerms} onOpenChange={setShowTerms}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Términos y Condiciones</DialogTitle>
            <DialogDescription>
              Por favor, lee detenidamente los siguientes términos y condiciones antes de unirte a nuestra lista de
              espera.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 text-sm">
            <h3 className="text-lg font-semibold">1. Introducción</h3>
            <p>
              Estos Términos y Condiciones ("Términos") rigen tu participación en la lista de espera de Healthy ("el
              Servicio"), una plataforma de gestión de citas médicas y expedientes clínicos unificados. Al registrarte
              en nuestra lista de espera, aceptas cumplir con estos Términos.
            </p>

            <h3 className="text-lg font-semibold">2. Registro en la Lista de Espera</h3>
            <p>2.1. Para unirte a nuestra lista de espera, debes proporcionar información precisa y completa.</p>
            <p>2.2. Eres responsable de mantener la confidencialidad de tu información de contacto.</p>
            <p>
              2.3. Debes tener al menos 18 años para registrarte en la lista de espera o contar con el consentimiento de
              un padre o tutor legal.
            </p>

            <h3 className="text-lg font-semibold">3. Comunicaciones</h3>
            <p>
              3.1. Al registrarte en nuestra lista de espera, aceptas recibir comunicaciones relacionadas con Healthy,
              incluyendo actualizaciones sobre el desarrollo del producto, invitaciones a pruebas beta, y notificaciones
              de lanzamiento.
            </p>
            <p>
              3.2. Puedes optar por no recibir estas comunicaciones en cualquier momento siguiendo las instrucciones de
              cancelación de suscripción incluidas en cada comunicación.
            </p>

            <h3 className="text-lg font-semibold">4. Privacidad</h3>
            <p>
              4.1. La información que proporciones al registrarte en nuestra lista de espera está sujeta a nuestra
              Política de Privacidad.
            </p>
            <p>
              4.2. Nos comprometemos a proteger tu información personal y a utilizarla únicamente para los fines
              especificados en nuestra Política de Privacidad.
            </p>

            <h3 className="text-lg font-semibold">5. Acceso al Servicio</h3>
            <p>
              5.1. El registro en la lista de espera no garantiza el acceso al Servicio una vez que esté disponible.
            </p>
            <p>
              5.2. Nos reservamos el derecho de determinar quién tendrá acceso al Servicio durante las fases de prueba y
              lanzamiento.
            </p>
            <p>5.3. El acceso al Servicio puede estar sujeto a términos y condiciones adicionales.</p>

            <h3 className="text-lg font-semibold">6. Limitación de Responsabilidad</h3>
            <p>6.1. El Servicio se proporciona "tal cual" y "según disponibilidad", sin garantías de ningún tipo.</p>
            <p>
              6.2. No seremos responsables de ningún daño directo, indirecto, incidental, especial, consecuente o
              punitivo que resulte del uso o la imposibilidad de usar el Servicio.
            </p>

            <h3 className="text-lg font-semibold">7. Modificaciones</h3>
            <p>7.1. Nos reservamos el derecho de modificar estos Términos en cualquier momento.</p>
            <p>7.2. Las modificaciones entrarán en vigor inmediatamente después de su publicación.</p>
            <p>
              7.3. Tu uso continuado del Servicio después de la publicación de las modificaciones constituye tu
              aceptación de los Términos modificados.
            </p>

            <h3 className="text-lg font-semibold">8. Ley Aplicable</h3>
            <p>
              Estos Términos se regirán e interpretarán de acuerdo con las leyes de Colombia, sin tener en cuenta sus
              disposiciones sobre conflictos de leyes.
            </p>

            <h3 className="text-lg font-semibold">9. Contacto</h3>
            <p>Si tienes alguna pregunta sobre estos Términos, puedes contactarnos en: contacto@healthybyhex.co</p>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowTerms(false)}>
              Cerrar
            </Button>
            <Button
              onClick={() => {
                setAcceptedTerms(true)
                setShowTerms(false)
              }}
            >
              Aceptar términos
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <RoleSwitcherButton />

      <footer className="border-t py-4">
        <div className="container">
          <p className="text-sm text-muted-foreground text-center">Demo con datos ficticios - Producto en desarrollo</p>
        </div>
      </footer>
    </div>
  )
}

