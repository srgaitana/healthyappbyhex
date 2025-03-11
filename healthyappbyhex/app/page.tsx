"use client"

import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  ArrowRight,
  Calendar,
  FileText,
  Search,
  ChevronRight,
  Check,
  X,
  Mail,
  Clock,
  Users,
  Zap,
  Smartphone,
  Laptop,
} from "lucide-react"
import Link from "next/link"
import { Logo } from "@/components/logo"
import ConnectedHexagonBackground from "@/components/connected-hexagon-background"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      <ConnectedHexagonBackground />
      <div className="relative z-10">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="py-20">
            <div className="container">
              <div className="max-w-4xl mx-auto text-center">
                <Logo className="mx-auto mb-4" color="hsl(196 100% 47%)" size={80} />
                <motion.h1
                  className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Healthy
                </motion.h1>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                  ¿Te imaginas un sistema de salud en Colombia sin largas esperas y con toda tu información médica al
                  alcance?
                </h2>
                <p className="text-xl md:text-2xl text-muted-foreground mb-8">
                  Healthy está revolucionando el acceso a la atención médica en Colombia, centralizando la gestión de
                  citas y unificando las historias clínicas. Únete a nosotros para hacer realidad este cambio.
                </p>
                <Button size="lg" asChild>
                  <Link href="/welcome" className="flex items-center">
                    Descubre el futuro de la salud
                    <ArrowRight className="ml-2 h-5 w-5 animate-bounce" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* New Demo Section */}
          <section className="py-16 bg-gradient-to-r from-primary to-blue-600 text-white">
            <div className="container">
              <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      Experimenta el futuro de la salud en Colombia
                    </h2>
                    <p className="text-xl mb-6">
                      Prueba nuestra demo interactiva y descubre cómo Healthy está transformando la atención médica.
                    </p>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="lg"
                        className="bg-white text-primary hover:bg-primary-foreground hover:text-primary font-bold py-3 px-6 rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
                        asChild
                      >
                        <Link href="/welcome" className="flex items-center">
                          Probar demo ahora
                          <ArrowRight className="ml-2 h-5 w-5 animate-bounce" />
                        </Link>
                      </Button>
                    </motion.div>
                  </div>
                  <div className="relative">
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary to-blue-600 opacity-20 rounded-lg"></div>
                    <Card className="bg-white/10 backdrop-blur-sm border-none shadow-xl">
                      <CardContent className="p-6">
                        <h3 className="text-2xl font-semibold mb-4">Características de la demo:</h3>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <Check className="mr-2 h-5 w-5 text-green-400" />
                            Agenda citas médicas en segundos
                          </li>
                          <li className="flex items-center">
                            <Check className="mr-2 h-5 w-5 text-green-400" />
                            Explora perfiles de profesionales
                          </li>
                          <li className="flex items-center">
                            <Check className="mr-2 h-5 w-5 text-green-400" />
                            Gestiona tu historial médico
                          </li>
                          <li className="flex items-center">
                            <Check className="mr-2 h-5 w-5 text-green-400" />
                            Recibe recordatorios automáticos
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                    <div className="absolute -bottom-6 -right-6 transform rotate-12">
                      <Smartphone className="h-16 w-16 text-white/80" />
                    </div>
                    <div className="absolute -top-6 -left-6 transform -rotate-12">
                      <Laptop className="h-16 w-16 text-white/80" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Team Section */}
          <section className="py-20 bg-muted">
            <div className="container">
              <h2 className="text-3xl font-bold text-center mb-12">Nuestro Equipo</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="w-32 h-32 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                      <span className="text-4xl font-bold text-primary">SG</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Dr. Sebastián Gaitán</h3>
                    <p className="text-muted-foreground mb-4">Cofundador y CEO</p>
                    <p className="text-sm">
                      Médico colombiano con una visión para transformar el acceso a la salud en el país.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="w-32 h-32 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                      <span className="text-4xl font-bold text-primary">SR</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Samuel Rueda</h3>
                    <p className="text-muted-foreground mb-4">Cofundador y CTO</p>
                    <p className="text-sm">
                      Desarrollador apasionado por la tecnología y su potencial para mejorar la atención médica.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Founder Section */}
          <section className="py-20 bg-muted">
            <div className="container">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">Nuestra Historia</h2>
                <p className="text-xl mb-8">
                  Fundada por el Dr. Sebastián Gaitán, médico colombiano, Healthy nace de la necesidad de mejorar el
                  acceso y la eficiencia en el sistema de salud de Colombia.
                </p>
                <blockquote className="italic text-lg">
                  "Como médico, he visto de primera mano los desafíos que enfrentan pacientes y profesionales de la
                  salud en nuestro país. Healthy es mi visión para un sistema de salud más accesible y eficiente para
                  todos los colombianos."
                </blockquote>
                <p className="mt-4 font-semibold">- Dr. Sebastián Gaitán, Fundador de Healthy</p>
              </div>
            </div>
          </section>

          {/* New Interactive Section with Particle Effect */}
          <section className="py-20 bg-gradient-to-b from-background to-muted relative overflow-hidden">
            <ParticleEffect />
            <div className="container relative z-10">
              <h2 className="text-4xl font-bold text-center mb-12">Explora el Ecosistema de Salud Digital</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <InteractiveCard
                  icon={<Calendar className="h-10 w-10 text-primary" />}
                  title="Gestión de Citas"
                  description="Agenda y gestiona tus citas médicas con facilidad."
                />
                <InteractiveCard
                  icon={<FileText className="h-10 w-10 text-primary" />}
                  title="Historial Unificado"
                  description="Accede a tu historial médico completo en un solo lugar."
                />
                <InteractiveCard
                  icon={<Users className="h-10 w-10 text-primary" />}
                  title="Red de Profesionales"
                  description="Conecta con los mejores especialistas de Colombia."
                />
              </div>
            </div>
          </section>

          {/* Problems vs Solutions Section */}
          <section className="py-20 bg-gradient-to-b from-background to-muted">
            <div className="container">
              <h2 className="text-4xl font-bold text-center mb-12">Transformando la Salud en Colombia</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-center text-red-500 flex items-center justify-center">
                    <X className="mr-2" /> Problemas Actuales
                  </h3>
                  <div className="space-y-6">
                    <ProblemCard
                      icon={<Clock className="h-8 w-8 text-red-500" />}
                      title="Largas Esperas"
                      description="Pacientes esperan semanas o meses para conseguir citas médicas."
                    />
                    <ProblemCard
                      icon={<FileText className="h-8 w-8 text-red-500" />}
                      title="Historiales Fragmentados"
                      description="Información médica dispersa entre diferentes EPS e IPS."
                    />
                    <ProblemCard
                      icon={<Users className="h-8 w-8 text-red-500" />}
                      title="Difícil Acceso a Especialistas"
                      description="Encontrar y agendar con especialistas es un proceso complicado y lento."
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-6 text-center text-green-500 flex items-center justify-center">
                    <Check className="mr-2" /> Soluciones Healthy
                  </h3>
                  <div className="space-y-6">
                    <SolutionCard
                      icon={<Zap className="h-8 w-8 text-green-500" />}
                      title="Agendamiento Instantáneo"
                      description="Reserva citas médicas en minutos, no en semanas."
                    />
                    <SolutionCard
                      icon={<FileText className="h-8 w-8 text-green-500" />}
                      title="Historial Unificado"
                      description="Toda tu información médica en un solo lugar, accesible cuando la necesites."
                    />
                    <SolutionCard
                      icon={<Search className="h-8 w-8 text-green-500" />}
                      title="Búsqueda Inteligente"
                      description="Encuentra el especialista ideal rápidamente, basado en tus necesidades específicas."
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 bg-muted">
            <div className="container">
              <h2 className="text-3xl font-bold text-center mb-12">Características principales</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard
                  icon={<Calendar className="h-10 w-10 text-primary" />}
                  title="Agenda fácilmente"
                  description="Encuentra y reserva citas con profesionales de la salud en Colombia de manera eficiente."
                />
                <FeatureCard
                  icon={<FileText className="h-10 w-10 text-primary" />}
                  title="Historial unificado"
                  description="Accede a tu historial médico completo desde un solo lugar, independientemente de tu EPS."
                />
                <FeatureCard
                  icon={<Search className="h-10 w-10 text-primary" />}
                  title="Búsqueda inteligente"
                  description="Encuentra el especialista adecuado según tus necesidades específicas en toda Colombia."
                />
              </div>
            </div>
          </section>

          {/* Value Statements Section */}
          <section className="py-20">
            <div className="container">
              <h2 className="text-3xl font-bold text-center mb-12">Nuestra visión para Colombia</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-lg font-medium">
                      "Agendar una cita médica en Colombia debería ser tan fácil como pedir un domicilio."
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-lg font-medium">
                      "Imagina un sistema de salud colombiano donde tu información médica esté siempre a tu alcance, sin
                      importar en qué ciudad te encuentres."
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Pilot Program Section */}
          <section className="py-20 bg-muted">
            <div className="container">
              <div className="bg-primary text-primary-foreground p-8 rounded-lg max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-4">¿Eres médico o paciente en Colombia?</h2>
                <p className="text-xl mb-6">
                  Participa en nuestro programa piloto y ayuda a dar forma al futuro de la salud en nuestro país.
                </p>
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/waitlist">
                    Quiero colaborar <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>

          {/* Social Impact Section */}
          <section className="py-20">
            <div className="container">
              <h2 className="text-3xl font-bold text-center mb-12">Nuestro impacto potencial en Colombia</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <Card>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-semibold mb-2">Acceso mejorado</h3>
                    <p>
                      Buscamos facilitar el acceso a la atención médica para todos los colombianos, sin importar su
                      ubicación.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-semibold mb-2">Eficiencia del sistema</h3>
                    <p>
                      Aspiramos a optimizar los recursos del sistema de salud colombiano, reduciendo tiempos de espera y
                      mejorando la atención.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-semibold mb-2">Prevención</h3>
                    <p>
                      Queremos promover la atención preventiva y el seguimiento continuo, mejorando la salud general de
                      la población colombiana.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20 bg-muted">
            <div className="container">
              <h2 className="text-3xl font-bold text-center mb-12">Preguntas frecuentes</h2>
              <div className="max-w-3xl mx-auto space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">¿Cómo funcionará Healthy en Colombia?</h3>
                    <p>
                      Healthy te permitirá buscar y agendar citas médicas en línea con profesionales y centros de salud
                      en toda Colombia, acceder a tu historial médico unificado y encontrar el especialista adecuado
                      para tus necesidades de salud, todo desde una sola plataforma.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">¿Será compatible con mi EPS?</h3>
                    <p>
                      Estamos trabajando para integrar Healthy con las principales EPS de Colombia. Nuestro objetivo es
                      que puedas usar Healthy sin importar tu afiliación, facilitando la coordinación entre diferentes
                      entidades de salud.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">¿Cuándo estará disponible Healthy en Colombia?</h3>
                    <p>
                      Estamos en fase de desarrollo y pruebas, enfocándonos inicialmente en las principales ciudades de
                      Colombia. Únete a nuestra lista de espera para ser de los primeros en probarlo y recibir
                      actualizaciones sobre el desarrollo y lanzamiento en tu región.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-primary text-primary-foreground">
            <div className="container text-center">
              <h2 className="text-3xl font-bold mb-6">Únete a la evolución de la salud digital en Colombia</h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Sé parte de los primeros usuarios en probar Healthy y ayúdanos a dar forma al futuro de la atención
                médica en nuestro país.
              </p>
              <div className="max-w-md mx-auto mb-8">
                <form className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Tu correo electrónico"
                    className="bg-primary-foreground text-primary"
                  />
                  <Button variant="secondary">Unirme</Button>
                </form>
              </div>
              <p className="text-sm">Únete a nuestra lista de espera y sé parte del cambio en la salud colombiana</p>
            </div>
          </section>
        </main>

        <footer className="border-t py-8 bg-background/80">
          <div className="container text-center">
            <p className="text-muted-foreground mb-4">© 2025 Healthy. Todos los derechos reservados.</p>
            <div className="flex justify-center items-center gap-2">
              <Mail className="h-4 w-4" />
              <a href="mailto:contacto@healthybyhex.co" className="text-primary hover:underline">
                contacto@healthybyhex.co
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

function ProblemCard({ icon, title, description }) {
  return (
    <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
      <CardContent className="p-6">
        <div className="flex items-start">
          <div className="mr-4 mt-1">{icon}</div>
          <div>
            <h4 className="text-lg font-semibold mb-2">{title}</h4>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SolutionCard({ icon, title, description }) {
  return (
    <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
      <CardContent className="p-6">
        <div className="flex items-start">
          <div className="mr-4 mt-1">{icon}</div>
          <div>
            <h4 className="text-lg font-semibold mb-2">{title}</h4>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card>
      <CardContent className="p-6 text-center">
        <div className="mb-4 flex justify-center">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

function InteractiveCard({ icon, title, description }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 cursor-pointer"
    >
      <div className="flex flex-col items-center text-center">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </motion.div>
  )
}

function ParticleEffect() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const createParticle = () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 5 + 1,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2,
    })

    setParticles(Array.from({ length: 50 }, createParticle))

    const animateParticles = () => {
      setParticles((prevParticles) =>
        prevParticles.map((particle) => ({
          ...particle,
          x: (particle.x + particle.speedX + window.innerWidth) % window.innerWidth,
          y: (particle.y + particle.speedY + window.innerHeight) % window.innerHeight,
        })),
      )
    }

    const intervalId = setInterval(animateParticles, 50)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="absolute inset-0">
      {particles.map((particle, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-primary"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: `${particle.x}px`,
            top: `${particle.y}px`,
          }}
          animate={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
          }}
          transition={{
            duration: 0.05,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

