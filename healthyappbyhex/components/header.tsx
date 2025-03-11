"use client"

import Link from "next/link"
import { useRole } from "@/components/role-context"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Logo } from "@/components/logo"

export function Header() {
  const { role } = useRole()

  return (
    <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Logo
              className="h-6 w-6"
              color={role === "professional" ? "hsl(142 76% 36%)" : "hsl(196 100% 47%)"}
              size={24}
            />
            <span className="font-bold text-xl">Healthy</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Button variant="outline" asChild>
            <Link href="/welcome">Probar demo</Link>
          </Button>
          <Button variant="default" asChild>
            <Link href="/waitlist">Unirse a la lista de espera</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}

