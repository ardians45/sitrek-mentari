"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Calendar, ClipboardList, User } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { icon: Home, label: "Beranda", href: "/dashboard" },
  { icon: Calendar, label: "Kalender", href: "/calendar" },
  { icon: ClipboardList, label: "Tugas", href: "/tasks" },
  { icon: User, label: "Profil", href: "/profile" },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/10 px-4 pb-safe pb-4 pt-2 md:hidden">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 transition-all duration-300",
                isActive 
                  ? "text-primary scale-110" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className={cn("w-6 h-6", isActive && "fill-primary/20")} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
