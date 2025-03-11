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

export default function WaitlistPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [roleInterest, setRoleInterest] = useState("paciente")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
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

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Enviando..." : "Unirme a la lista de espera"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <RoleSwitcherButton />

      <footer className="border-t py-4">
        <div className="container">
          <p className="text-sm text-muted-foreground text-center">Demo con datos ficticios - Producto en desarrollo</p>
        </div>
      </footer>
    </div>
  )
}

