"use client"

import { motion } from "framer-motion"
import { Heart, Book, Image, MessageCircle, Gift, Clock } from "lucide-react"

interface DiaryNavigationProps {
  activeSection: string
  onNavigate: (section: string) => void
}

const navItems = [
  { id: "home", label: "Home", icon: Heart },
  { id: "timeline", label: "Timeline", icon: Clock },
  { id: "gallery", label: "Gallery", icon: Image },
  { id: "notes", label: "Notes", icon: MessageCircle },
  { id: "letter", label: "Letter", icon: Gift },
]

export function DiaryNavigation({ activeSection, onNavigate }: DiaryNavigationProps) {
  return (
    <motion.nav
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div className="bg-card/90 backdrop-blur-lg rounded-full px-4 py-3 shadow-2xl border border-love/20">
        <ul className="flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id

            return (
              <li key={item.id}>
                <motion.button
                  onClick={() => onNavigate(item.id)}
                  className={`relative flex flex-col items-center px-3 py-2 rounded-full transition-colors ${
                    isActive
                      ? "text-love"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 bg-love/10 rounded-full"
                      layoutId="activeNav"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon className={`w-5 h-5 relative z-10 ${isActive ? "fill-love/30" : ""}`} />
                  <span className="text-xs mt-1 relative z-10 hidden md:block">{item.label}</span>
                </motion.button>
              </li>
            )
          })}
        </ul>
      </div>
    </motion.nav>
  )
}
