import { 
  Bell, 
  Search, 
  ChevronRight, 
  ArrowUpRight,
  Plus,
  StickyNote,
  GraduationCap,
  BookOpen,
  ClipboardList
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { SCHEDULES, STUDENTS, CLASS_ID } from "@/constants/classData"

export default function DashboardPage() {
  const currentStudent = STUDENTS[18]
  
  return (
    <div className="max-w-[1600px] mx-auto animate-in fade-in duration-700">
      {/* Top Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <p className="text-sm font-medium text-zinc-400">Welcome back,</p>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-500 dark:from-white dark:to-zinc-400">
            {currentStudent.name.split(' ').map(n => n.charAt(0) + n.slice(1).toLowerCase()).join(' ')}
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 group-focus-within:text-primary transition-colors" />
            <Input 
              placeholder="Search anything..." 
              className="pl-10 h-11 bg-white/50 dark:bg-zinc-900/50 border-none shadow-sm rounded-xl focus-visible:ring-primary/20" 
            />
          </div>
          <button className="p-3 bg-white dark:bg-zinc-900 rounded-xl shadow-sm text-zinc-500 hover:text-primary transition-colors relative border border-zinc-100 dark:border-zinc-800">
            <Bell className="w-5 h-5" />
            <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-900"></span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Main Content Area (8 Columns) */}
        <div className="xl:col-span-8 flex flex-col gap-8">
          
          {/* Hero Section */}
          <div className="relative h-64 rounded-3xl overflow-hidden bg-[#2D4F3E] text-white p-8 flex items-center group">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent pointer-events-none"></div>
            <div className="relative z-10 max-w-md">
              <h2 className="text-3xl font-bold mb-3 leading-tight">Learn today, <br />succeed tomorrow!</h2>
              <p className="text-white/70 text-sm mb-6 max-w-xs">
                Sistem tracking perkuliahan cerdas untuk membantu Anda memantau akademik di kelas {CLASS_ID}.
              </p>
              <button className="px-6 py-2.5 bg-white text-[#2D4F3E] font-bold rounded-xl hover:bg-zinc-100 transition-all active:scale-95">
                Cek Jadwal
              </button>
            </div>
            {/* Mock 3D Illustration using CSS/Icons */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block scale-150 opacity-20 lg:opacity-100 transition-transform duration-700 group-hover:scale-[1.6]">
               <div className="w-40 h-40 bg-white/20 blur-3xl rounded-full absolute -top-10 -right-10"></div>
               <GraduationCap className="w-32 h-32 text-white/90 drop-shadow-2xl" />
            </div>
          </div>

          {/* Quick Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <StatCard 
              icon={Plus} 
              label="New tasks" 
              value="+2" 
              trend="+40%" 
              caption="2 new tasks posted" 
              color="bg-[#FBC02D]"
            />
            <StatCard 
              icon={BookOpen} 
              label="Attendance" 
              value="85%" 
              trend="+12%" 
              caption="Your class attendance" 
              color="bg-[#4285F4]"
            />
            <StatCard 
              icon={ClipboardList} 
              label="Assignments" 
              value="8/12" 
              trend="+10%" 
              caption="Based on recent weeks" 
              color="bg-[#9C27B0]"
            />
          </div>

          {/* Active Courses (Horizontal Scroll or Grid) */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold">Mata Kuliah Aktif</h2>
                <Badge variant="secondary" className="bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 font-bold px-3">8 Matkul</Badge>
              </div>
              <button className="text-zinc-400 hover:text-primary transition-colors flex items-center gap-1 text-sm font-bold">
                View all <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SCHEDULES.slice(0, 3).map((item, idx) => (
                <CourseCard 
                  key={idx}
                  title={item.name}
                  instructor={item.lecturer}
                  progress={idx === 0 ? 35 : idx === 1 ? 55 : 40}
                  lessons={`${idx+10}/25 lessons`}
                  color={idx === 0 ? "bg-pink-500" : idx === 1 ? "bg-orange-500" : "bg-purple-500"}
                  icon={idx === 0 ? BookOpen : idx === 1 ? GraduationCap : ClipboardList}
                />
              ))}
            </div>
          </section>

        </div>

        {/* Right Sidebar Area (4 Columns) */}
        <div className="xl:col-span-4 flex flex-col gap-8">
          
          {/* Calendar Widget */}
          <Card className="glass-card border-none p-6 bg-white/70 dark:bg-zinc-900/70">
            <div className="flex p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl mb-6">
              <button className="flex-1 py-1.5 text-xs font-bold bg-white dark:bg-zinc-700 shadow-sm rounded-lg">Weekly</button>
              <button className="flex-1 py-1.5 text-xs font-bold text-zinc-400">Monthly</button>
            </div>
            
            <h3 className="text-2xl font-bold text-center mb-6">September 22</h3>
            
            <div className="flex justify-between gap-1 mb-8">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
                <div key={day} className={cn(
                  "flex flex-col items-center gap-2 p-2 rounded-xl flex-1 transition-all",
                  day === 'Thu' ? "bg-[#2D4F3E] text-white shadow-lg" : "text-zinc-400"
                )}>
                  <span className="text-[10px] uppercase font-bold">{day}</span>
                  <span className="text-sm font-bold">{idx + 1}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
               <button className="w-full py-3 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl flex items-center justify-center gap-2 text-zinc-400 hover:text-primary hover:border-primary/50 transition-all group">
                 <StickyNote className="w-4 h-4" />
                 <span className="text-xs font-bold">Add a note</span>
               </button>
               <button className="w-full py-3 bg-[#2D4F3E] text-white rounded-2xl flex items-center justify-center gap-2 font-bold hover:shadow-lg hover:shadow-[#2D4F3E]/20 transition-all active:scale-95">
                 <Plus className="w-4 h-4" />
                 <span className="text-xs">New event</span>
               </button>
            </div>
          </Card>

          {/* Homework Progress Widget */}
          <Card className="glass-card border-none p-6 bg-white/70 dark:bg-zinc-900/70">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold">Homework progress</h3>
              <button className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">View all</button>
            </div>
            
            <div className="space-y-6">
               <HomeworkItem 
                title="JavaScript lesson 1"
                deadline="Deadline: september 24"
                progress={35}
               />
               <HomeworkItem 
                title="HTML basics lesson 13"
                deadline="Deadline: september 28"
                progress={65}
               />
            </div>
          </Card>

        </div>
      </div>
    </div>
  )
}

function StatCard({ icon: Icon, label, value, trend, caption, color }: any) {
  return (
    <Card className="glass-card border-none bg-white/70 dark:bg-zinc-900/70 p-5 overflow-hidden group">
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg", color)}>
        <Icon className="w-5 h-5" />
      </div>
      <p className="text-xs font-medium text-zinc-400 mb-1">{label}</p>
      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-2xl font-bold">{value}</span>
        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 flex items-center gap-0.5">
           <ArrowUpRight className="w-3 h-3" /> {trend}
        </span>
      </div>
      <p className="text-[10px] text-zinc-400">{caption}</p>
    </Card>
  )
}

function CourseCard({ title, instructor, progress, lessons, color, icon: Icon }: any) {
  return (
    <Card className="glass-card border-none bg-white/70 dark:bg-zinc-900/70 p-6 flex flex-col group h-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-bold text-sm mb-1 line-clamp-1">{title}</h4>
          <p className="text-[10px] text-zinc-400 font-medium">{lessons}</p>
        </div>
        <button className="p-2 bg-zinc-50 dark:bg-zinc-800 rounded-lg text-zinc-400 hover:text-primary transition-colors group-hover:rotate-45 duration-300">
           <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center py-6 relative">
          {/* Abstract 3D shape replacement */}
          <div className={cn("w-20 h-20 rounded-full opacity-10 absolute blur-2xl", color)}></div>
          <Icon className={cn("w-12 h-12 relative z-10 opacity-80", color.replace('bg-', 'text-'))} />
      </div>

      <div className="mt-auto space-y-2">
        <div className="flex justify-between items-center text-[10px] font-bold">
           <span className="text-zinc-400">{progress}% complete</span>
        </div>
        <Progress value={progress} className="h-1.5 bg-zinc-100 dark:bg-zinc-800" indicatorClassName={cn(color)} />
      </div>
    </Card>
  )
}

function HomeworkItem({ title, deadline, progress }: any) {
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h4 className="text-xs font-bold leading-tight group-hover:text-primary transition-colors cursor-pointer">{title}</h4>
          <p className="text-[10px] text-zinc-400 font-medium">{deadline}</p>
        </div>
        <button className="text-zinc-300 group-hover:text-primary transition-colors">
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1">
          {/* Custom segmented progress bar style */}
          <div className="flex gap-1">
             <div className={cn("h-1.5 flex-1 rounded-full", progress > 10 ? "bg-[#2D4F3E]" : "bg-zinc-100 dark:bg-zinc-800")}></div>
             <div className={cn("h-1.5 flex-1 rounded-full", progress > 40 ? "bg-[#2D4F3E]" : "bg-zinc-100 dark:bg-zinc-800")}></div>
             <div className={cn("h-1.5 flex-1 rounded-full", progress > 70 ? "bg-[#2D4F3E]" : "bg-zinc-100 dark:bg-zinc-800")}></div>
          </div>
        </div>
        <span className="text-[10px] font-bold">{progress}%</span>
      </div>
    </div>
  )
}
