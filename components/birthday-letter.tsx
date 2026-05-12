"use client"

import { motion } from "framer-motion"
import { Heart, Star, Sparkles, Gift, Cake } from "lucide-react"

interface BirthdayLetterProps {
  partnerName: string
  letterContent: string
  yourName: string
}

export function BirthdayLetter({ partnerName, letterContent, yourName }: BirthdayLetterProps) {
  return (
    <div className="py-12">
      <motion.div
        className="max-w-2xl mx-auto relative"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {/* Decorative Elements */}
        <motion.div
          className="absolute -top-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="flex items-center gap-4">
            <Sparkles className="w-6 h-6 text-gold" />
            <Gift className="w-8 h-8 text-love" />
            <Cake className="w-8 h-8 text-love" />
            <Gift className="w-8 h-8 text-love" />
            <Sparkles className="w-6 h-6 text-gold" />
          </div>
        </motion.div>

        {/* Letter Container */}
        <motion.div
          className="bg-card rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-love/20 relative overflow-hidden"
          initial={{ y: 50 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            {[...Array(20)].map((_, i) => (
              <Heart
                key={i}
                className="absolute text-love"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                  width: `${20 + Math.random() * 20}px`,
                }}
                fill="currentColor"
              />
            ))}
          </div>

          {/* Letter Header */}
          <motion.div
            className="text-center mb-8 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                >
                  <Star className="w-6 h-6 text-gold" fill="currentColor" />
                </motion.div>
              ))}
            </div>
            <h2
              className="text-4xl md:text-5xl text-love mb-2"
              style={{ fontFamily: 'var(--font-dancing), cursive' }}
            >
              Happy Birthday
            </h2>
            <h3
              className="text-3xl md:text-4xl"
              style={{ fontFamily: 'var(--font-dancing), cursive' }}
            >
              My Dearest {partnerName}
            </h3>
          </motion.div>

          {/* Letter Content */}
          <motion.div
            className="relative z-10 space-y-4 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {letterContent.split('\n\n').map((paragraph, index) => (
              <motion.p
                key={index}
                className="text-foreground leading-relaxed text-lg"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>

          {/* Signature */}
          <motion.div
            className="text-right relative z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            <p className="text-muted-foreground mb-2">With all my love,</p>
            <p
              className="text-3xl text-love"
              style={{ fontFamily: 'var(--font-dancing), cursive' }}
            >
              {yourName}
            </p>
            <motion.div
              className="inline-flex items-center gap-1 mt-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <Heart className="w-5 h-5 text-love" fill="currentColor" />
              <Heart className="w-6 h-6 text-love" fill="currentColor" />
              <Heart className="w-5 h-5 text-love" fill="currentColor" />
            </motion.div>
          </motion.div>

          {/* Corner Decorations */}
          <div className="absolute top-4 left-4">
            <Heart className="w-8 h-8 text-love/20" fill="currentColor" />
          </div>
          <div className="absolute top-4 right-4">
            <Heart className="w-8 h-8 text-love/20" fill="currentColor" />
          </div>
          <div className="absolute bottom-4 left-4">
            <Heart className="w-8 h-8 text-love/20" fill="currentColor" />
          </div>
          <div className="absolute bottom-4 right-4">
            <Heart className="w-8 h-8 text-love/20" fill="currentColor" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
