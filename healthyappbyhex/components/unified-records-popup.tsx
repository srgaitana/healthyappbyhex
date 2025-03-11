import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FileText, Lock, Share2, ArrowRight } from "lucide-react"
import Link from "next/link"

interface UnifiedRecordsPopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UnifiedRecordsPopup({ open, onOpenChange }: UnifiedRecordsPopupProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>El Futuro de las Historias Clínicas en Colombia</DialogTitle>
          <DialogDescription>
            Healthy está trabajando para revolucionar el acceso y manejo de historias clínicas en todo el país.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold">Acceso Centralizado</h4>
              <p className="text-sm text-muted-foreground">
                Toda tu información médica en un solo lugar, accesible desde cualquier parte de Colombia.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold">Seguridad y Privacidad</h4>
              <p className="text-sm text-muted-foreground">
                Protección de datos de última generación para mantener tu información segura.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <Share2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h4 className="font-semibold">Compartir Controlado</h4>
              <p className="text-sm text-muted-foreground">
                Tú decides qué información compartir y con quién, manteniendo el control de tus datos médicos.
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button asChild>
            <Link href="/unified-records">
              Más información <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

