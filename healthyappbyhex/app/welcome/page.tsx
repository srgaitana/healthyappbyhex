"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { UserRound, Stethoscope, FileText, ArrowRight, Hospital, Database } from "lucide-react"
import { useRole } from "@/components/role-context"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { LoadingScreen } from "@/components/loading-screen"

export default function WelcomePage() {
  const router = useRouter()
  const { setRole } = useRole()
  const [isProfessional, setIsProfessional] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleRoleSelect = () => {
    const role = isProfessional ? "professional" : "patient"
    setRole(role)
    setIsLoading(true)

    // Simular un tiempo de carga
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 3000)
  }

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LoadingScreen />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen flex flex-col"
        >
          <header className="p-4 flex justify-between items-center">
            <Logo color={isProfessional ? "hsl(142 76% 36%)" : "hsl(196 100% 47%)"} size={32} />
            <ThemeToggle />
          </header>
          <div className="flex-grow flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-8 flex items-center justify-center bg-background">
              <RolePanel
                isProfessional={isProfessional}
                setIsProfessional={setIsProfessional}
                handleRoleSelect={handleRoleSelect}
              />
            </div>
            <motion.div
              animate={{
                backgroundColor: isProfessional ? "hsl(142 76% 36%)" : "hsl(196 100% 47%)",
              }}
              transition={{ duration: 0.5 }}
              className="w-full md:w-1/2 p-8 flex items-center justify-center"
            >
              <HealthyVision />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function RolePanel({ isProfessional, setIsProfessional, handleRoleSelect }) {
  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <Logo className="mx-auto mb-6" color="hsl(196 100% 47%)" size={64} />
        <h1 className="text-2xl font-bold mb-4">Bienvenido a Healthy</h1>
        <p className="text-muted-foreground mb-6">Gestión de citas médicas simple y eficiente</p>
        <Button variant="outline" asChild className="mb-8">
          <Link href="/waitlist">Unirse a la lista de espera</Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <UserRound size={20} />
                Modo Paciente
              </span>
              <Switch checked={isProfessional} onCheckedChange={setIsProfessional} />
              <span className="flex items-center gap-2">
                Modo Profesional
                <Stethoscope size={20} />
              </span>
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={handleRoleSelect}
              style={{
                backgroundColor: isProfessional ? "hsl(142 76% 36%)" : "hsl(196 100% 47%)",
                color: "white",
              }}
            >
              Ingresar como {isProfessional ? "Profesional" : "Paciente"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 text-center">
        <h3 className="text-lg font-semibold mb-2">Próximamente</h3>
        <p className="text-muted-foreground flex items-center justify-center gap-2 mb-4">
          <FileText size={16} />
          Gestión de historias clínicas unificadas
        </p>
        <Button variant="link" asChild>
          <Link href="/unified-records">
            Más información <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

function HealthyVision() {
  return (
    <div className="w-full max-w-md text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Nuestra Visión para Colombia</h2>
      <div className="space-y-6">
        <Card className="bg-white/10 backdrop-blur-sm border-none">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <Hospital className="h-8 w-8" />
              <h3 className="text-xl font-semibold">Conectando Pacientes y Hospitales</h3>
            </div>
            <p>
              Healthy busca crear una red integrada que conecte a los pacientes con los mejores profesionales y centros
              de salud en todo Colombia, mejorando el acceso y la calidad de la atención médica.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white/10 backdrop-blur-sm border-none">
          <CardContent className="p-6">
            <div className="flex items-center gap-4 mb-4">
              <Database className="h-8 w-8" />
              <h3 className="text-xl font-semibold">Historias Clínicas Unificadas</h3>
            </div>
            <p>
              Nuestro objetivo es crear un sistema de historias clínicas unificadas y accesibles en todo el territorio
              colombiano, mejorando la continuidad y eficiencia de la atención médica.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

