import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SCHEDULES } from "@/constants/classData"

export default function CalendarPage() {
  const days = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab"]
  const currentDay = "Kam"

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Kalender Kelas</h1>
        <div className="flex items-center gap-2 p-1 glass-card rounded-xl">
           <button className="p-1 hover:bg-white/50 rounded-lg transition-colors"><ChevronLeft className="w-4 h-4" /></button>
           <span className="text-xs font-bold px-2">April 2026</span>
           <button className="p-1 hover:bg-white/50 rounded-lg transition-colors"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>

      <div className="flex justify-between gap-1 p-2 glass-card rounded-2xl bg-white/40">
        {days.map((day) => (
          <div key={day} className={cn(
            "flex flex-col items-center gap-2 p-2 rounded-xl flex-1 transition-all duration-300",
            day === currentDay ? "bg-primary text-primary-foreground shadow-lg scale-105" : "text-muted-foreground hover:bg-white/50"
          )}>
            <span className="text-[10px] font-bold uppercase">{day}</span>
            <span className="text-sm font-bold">{day === "Kam" ? "16" : "15"}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider px-1">Jadwal Kuliah Kamis</h3>
        
        <div className="relative pl-4 border-l border-dashed border-primary/30 flex flex-col gap-6">
          {SCHEDULES.map((item, idx) => (
            <div key={idx} className="relative">
              <div className="absolute -left-[21px] top-2 w-3 h-3 rounded-full bg-primary border-4 border-background shadow-[0_0_8px_rgba(30,64,175,0.4)]"></div>
              <Card className="glass-card border-none bg-white/50">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-primary">{item.time}</span>
                    <Badge variant="outline" className="text-[9px] border-primary/20">{item.sks} SKS</Badge>
                  </div>
                  <h4 className="font-bold text-sm mb-2">{item.name}</h4>
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-medium">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {item.room}
                    </span>
                    <span>•</span>
                    <span>{item.lecturer}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ")
}
