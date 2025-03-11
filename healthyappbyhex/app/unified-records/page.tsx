import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, FileText, Lock, Share2 } from "lucide-react"
import Link from "next/link"

export default function UnifiedRecordsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 container py-12">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/welcome">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver a la página de bienvenida
          </Link>
        </Button>

        <h1 className="text-4xl font-bold mb-8">Gestión de Historias Clínicas Unificadas</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardContent className="p-6">
              <FileText className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Acceso Centralizado</h2>
              <p className="text-muted-foreground">
                Accede a tu historial médico completo desde cualquier institución de salud en un solo lugar.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Lock className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Seguridad y Privacidad</h2>
              <p className="text-muted-foreground">
                Tu información médica está protegida con los más altos estándares de seguridad y encriptación.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Share2 className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Compartir Controlado</h2>
              <p className="text-muted-foreground">
                Decide qué información compartir con cada profesional de la salud, manteniendo el control de tus datos.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <FileText className="h-12 w-12 text-primary mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Historial Completo</h2>
              <p className="text-muted-foreground">
                Desde consultas hasta resultados de laboratorio, toda tu información médica en un solo lugar.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">¿Listo para una atención médica más integrada?</h2>
          <Button size="lg" asChild>
            <Link href="/waitlist">Unirse a la lista de espera</Link>
          </Button>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container text-center text-muted-foreground">
          © 2025 Healthy. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  )
}

