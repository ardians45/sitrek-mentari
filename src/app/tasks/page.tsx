import { Search, Filter, ClipboardList, AlertCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { SCHEDULES } from "@/constants/classData"

export default function TasksPage() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Tugas Kuliah</h1>
        <Badge variant="outline" className="border-primary/20 text-primary">8 Matkul</Badge>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Cari tugas atau mata kuliah..." className="pl-10 glass-card border-none bg-white/50 h-12" />
      </div>

      <div className="flex flex-col gap-4">
        {SCHEDULES.map((course, idx) => (
          <Card key={idx} className="glass-card border-none bg-white/40 overflow-hidden">
            <CardContent className="p-0">
              <div className="p-4 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary shrink-0">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm leading-tight mb-1">{course.name}</h3>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{course.lecturer}</p>
                </div>
              </div>
              
              <div className="bg-primary/5 p-3 flex items-center justify-between border-t border-primary/5">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-[10px] font-bold text-amber-600">Terdekat: Laporan Minggu Depan</span>
                </div>
                <Badge variant="secondary" className="bg-white/80 text-[9px] px-1.5 h-5">Detail</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
