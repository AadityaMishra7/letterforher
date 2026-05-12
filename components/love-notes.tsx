"use client"

import { motion } from "framer-motion"
import { Heart, Quote, Sparkles } from "lucide-react"

export interface LoveNote {
  id: number
  title: string
  content: string
  date: string
  color: string
}

interface LoveNotesProps {
  notes: LoveNote[]
}

const noteColors = [
  "bg-love-light/30 border-love/30",
  "bg-gold/20 border-gold/30",
  "bg-cream border-accent/30",
  "bg-secondary border-primary/20",
]

export function LoveNotes({ notes }: LoveNotesProps) {
  return (
    <div className="py-8">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2
          className="text-3xl md:text-4xl mb-2"
          style={{ fontFamily: 'var(--font-dancing), cursive' }}
        >
          Love Notes
        </h2>
        <p className="text-muted-foreground">
          Little whispers from my heart to yours 💕
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {notes.map((note, index) => (
          <motion.div
            key={note.id}
            className={`relative p-6 rounded-2xl border-2 ${noteColors[index % noteColors.length]} shadow-lg`}
            initial={{ opacity: 0, y: 30, rotate: -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: index % 2 === 0 ? -1 : 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ scale: 1.02, rotate: 0 }}
          >
            {/* Decorative Pin */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <motion.div
                className="w-6 h-6 rounded-full bg-love shadow-md flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-3 h-3 text-white" fill="white" />
              </motion.div>
            </div>

            {/* Quote Icon */}
            <Quote className="w-8 h-8 text-love/30 mb-3" />

            {/* Content */}
            <h3
              className="text-xl mb-3 text-foreground"
              style={{ fontFamily: 'var(--font-dancing), cursive' }}
            >
              {note.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-4 italic">
              {note.content}
            </p>

            {/* Date */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{note.date}</span>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles className="w-5 h-5 text-gold" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
