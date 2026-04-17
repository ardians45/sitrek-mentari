import { User, Mail, Shield, BookOpen } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { STUDENTS, CLASS_ID } from "@/constants/classData"

export default function ProfilePage() {
  const currentStudent = STUDENTS[0] // Demo: ABDUL KHAMID

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-2xl font-bold">Profil Mahasiswa</h1>
      
      <Card className="glass-card border-none bg-gradient-to-br from-primary/10 to-accent/5 overflow-hidden">
        <CardContent className="p-6 flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4 border-4 border-white/50 shadow-inner">
            <User className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-center">{currentStudent.name}</h2>
          <p className="text-muted-foreground text-sm mb-4">{currentStudent.id}</p>
          <div className="flex gap-2">
            <Badge className="bg-primary/20 text-primary border-none">{CLASS_ID}</Badge>
            <Badge variant="outline" className="border-primary/20">Semester 6</Badge>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider px-1">Informasi Akademik</h3>
        
        <div className="grid gap-3">
          {[
            { icon: BookOpen, label: "Program Studi", value: "Teknik Informatika" },
            { icon: Shield, label: "Status", value: "Mahasiswa Aktif" },
            { icon: Mail, label: "Email", value: `${currentStudent.id}@student.unpam.ac.id` },
          ].map((item, idx) => (
            <Card key={idx} className="glass-card border-none bg-white/40">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-2 bg-primary/5 rounded-lg text-primary">
                  <item.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase">{item.label}</p>
                  <p className="text-sm font-bold">{item.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <button className="w-full py-4 glass-card border-none bg-red-500/5 text-red-600 font-bold hover:bg-red-500/10 transition-colors mt-4">
        Keluar Aplikasi
      </button>
    </div>
  )
}
