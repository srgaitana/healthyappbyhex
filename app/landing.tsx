import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Heart } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1">
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
                Gestión de citas médicas simplificada
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                Agenda citas médicas fácilmente. Historia clínica unificada (próximamente).
              </p>
              <Button size="lg" asChild>
                <Link href="/dashboard">
                  Probar demo ahora <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <p className="mt-4 text-sm text-muted-foreground">No requiere registro</p>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Búsqueda inteligente</h3>
                <p className="text-muted-foreground">
                  Encuentra profesionales por especialidad, ubicación y disponibilidad.
                </p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Agendamiento fácil</h3>
                <p className="text-muted-foreground">Reserva citas en minutos con confirmación instantánea.</p>
              </div>
              <div className="bg-card p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold mb-3">Historia unificada</h3>
                <p className="text-muted-foreground">
                  Próximamente: Accede a tu historial médico desde cualquier institución.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">¿Cómo funciona?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Nuestra plataforma conecta pacientes con profesionales de la salud de forma sencilla y eficiente.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <span className="text-primary font-bold">1</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Busca especialistas</h3>
                <p className="text-muted-foreground">Filtra por especialidad, ubicación y disponibilidad.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <span className="text-primary font-bold">2</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Selecciona horario</h3>
                <p className="text-muted-foreground">Elige el día y hora que mejor se adapte a tu agenda.</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <span className="text-primary font-bold">3</span>
                </div>
                <h3 className="text-lg font-medium mb-2">Confirma tu cita</h3>
                <p className="text-muted-foreground">Recibe confirmación instantánea por email o SMS.</p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Button size="lg" asChild>
                <Link href="/dashboard">
                  Probar demo ahora <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Próximamente</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Estamos trabajando en nuevas funcionalidades para mejorar la experiencia de pacientes y profesionales.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div className="bg-card p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-3">Historia clínica unificada</h3>
                  <p className="text-muted-foreground">
                    Acceso a tu historial médico desde cualquier institución con permisos controlados por el paciente.
                  </p>
                </div>
                <div className="bg-card p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold mb-3">Telemedicina integrada</h3>
                  <p className="text-muted-foreground">
                    Consultas virtuales con tus médicos de confianza desde cualquier lugar.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <Button variant="outline" asChild>
                  <Link href="/waitlist">Unirse a la lista de espera</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Heart className="h-5 w-5 text-primary" fill="currentColor" />
              <span className="font-medium">HealthConnect Pro</span>
            </div>
            <p className="text-sm text-muted-foreground">Demo con datos ficticios - Producto en desarrollo</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

