"use client"

import { motion } from "framer-motion"
import { Heart, MapPin, Calendar, Star } from "lucide-react"

export interface TimelineEvent {
  id: number
  title: string
  date: string
  description: string
  icon: "heart" | "star" | "pin"
}

interface JourneyTimelineProps {
  events: TimelineEvent[]
}

const iconMap = {
  heart: Heart,
  star: Star,
  pin: MapPin,
}

export function JourneyTimeline({ events }: JourneyTimelineProps) {
  return (
    <div className="py-8">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2
          className="text-3xl md:text-4xl mb-2"
          style={{ fontFamily: 'var(--font-dancing), cursive' }}
        >
          Our Love Story
        </h2>
        <p className="text-muted-foreground">
          The beautiful chapters of us 📖
        </p>
      </motion.div>

      <div className="relative max-w-2xl mx-auto">
        {/* Timeline Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-love/30 -translate-x-1/2" />

        {events.map((event, index) => {
          const Icon = iconMap[event.icon]
          const isLeft = index % 2 === 0

          return (
            <motion.div
              key={event.id}
              className={`relative flex items-center mb-12 ${
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              }`}
              initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              {/* Icon */}
              <motion.div
                className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10"
                whileHover={{ scale: 1.2 }}
              >
                <div className="w-12 h-12 rounded-full bg-love flex items-center justify-center shadow-lg">
                  <Icon className="w-6 h-6 text-white" fill="white" />
                </div>
              </motion.div>

              {/* Content Card */}
              <div
                className={`ml-20 md:ml-0 md:w-5/12 ${
                  isLeft ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"
                }`}
              >
                <motion.div
                  className="bg-card p-5 rounded-2xl shadow-lg border border-love/20"
                  whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(0,0,0,0.1)" }}
                >
                  <div className={`flex items-center gap-2 mb-2 ${isLeft ? "md:justify-end" : ""}`}>
                    <Calendar className="w-4 h-4 text-love" />
                    <span className="text-sm text-muted-foreground">{event.date}</span>
                  </div>
                  <h3
                    className="text-xl mb-2"
                    style={{ fontFamily: 'var(--font-dancing), cursive' }}
                  >
                    {event.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {event.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
