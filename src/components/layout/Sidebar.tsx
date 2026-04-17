"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  BookOpen, 
  ClipboardList, 
  Calendar, 
  Settings, 
  HelpCircle,
  GraduationCap,
  LogOut,
  User
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const sidebarItems = [
  { icon: LayoutDashboard, label: "Beranda", href: "/dashboard" },
  { icon: BookOpen, label: "Kurikulum", href: "#" },
  { icon: ClipboardList, label: "Tugas", href: "/tasks" },
  { icon: GraduationCap, label: "Akademik", href: "#" },
  { icon: Calendar, label: "Kalender", href: "/calendar" },
]

const bottomItems = [
  { icon: Settings, label: "Pengaturan", href: "#" },
  { icon: HelpCircle, label: "Bantuan", href: "#" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden md:flex flex-col fixed inset-y-0 left-0 w-20 lg:w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 transition-all duration-300 z-50">
      {/* Logo Section */}
      <div className="h-20 flex items-center justify-center lg:justify-start lg:px-6">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
          <GraduationCap className="w-6 h-6" />
        </div>
        <span className="hidden lg:block ml-3 font-bold text-xl tracking-tight text-primary">SITREK</span>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 px-3 mt-6">
        <ul className="space-y-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group",
                    isActive 
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/10" 
                      : "text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  )}
                >
                  <item.icon className={cn("w-5 h-5 grow-0 shrink-0", !isActive && "group-hover:text-primary")} />
                  <span className="hidden lg:block font-medium text-sm">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Bottom Section */}
      <div className="px-3 py-6 border-t border-zinc-100 dark:border-zinc-800 space-y-1">
        {bottomItems.map((item) => (
          <Link
            key={item.label}
            href={item.label}
            className="flex items-center gap-3 px-3 py-3 rounded-xl text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-200"
          >
            <item.icon className="w-5 h-5 grow-0 shrink-0" />
            <span className="hidden lg:block font-medium text-sm">{item.label}</span>
          </Link>
        ))}
        
        {/* User Profile */}
        <div className="mt-4 p-2 lg:p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl flex items-center gap-3">
          <Avatar className="w-10 h-10 border-2 border-white dark:border-zinc-700 shrink-0">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary/10 text-primary font-bold">AK</AvatarFallback>
          </Avatar>
          <div className="hidden lg:block overflow-hidden">
            <p className="text-xs font-bold truncate">Jidan Nugroho</p>
            <p className="text-[10px] text-zinc-400 font-medium truncate">Ketua Kelas</p>
          </div>
          <button className="hidden lg:block ml-auto text-zinc-400 hover:text-red-500 transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
