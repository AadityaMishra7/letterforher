"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Lock, Unlock, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface LockScreenProps {
  onUnlock: () => void
  secretCode: string
  partnerName: string
}

export function LockScreen({ onUnlock, secretCode, partnerName }: LockScreenProps) {
  const [code, setCode] = useState("")
  const [error, setError] = useState(false)
  const [isShaking, setIsShaking] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (code.toLowerCase() === secretCode.toLowerCase()) {
      onUnlock()
    } else {
      setError(true)
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 500)
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center bg-background p-6 relative overflow-hidden"
    >
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-love/20"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 400),
              y: (typeof window !== 'undefined' ? window.innerHeight : 800) + 50,
            }}
            animate={{
              y: -50,
              x: `+=${Math.random() * 100 - 50}`,
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          >
            <Heart size={20 + Math.random() * 20} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center max-w-md w-full"
        animate={isShaking ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.5 }}
      >
        {/* Lock Icon */}
        <motion.div
          className="mb-8 relative"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
        >
          <div className="w-24 h-24 rounded-full bg-love/10 flex items-center justify-center">
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Lock className="w-12 h-12 text-love" />
            </motion.div>
          </div>
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-6 h-6 text-gold" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-3xl md:text-4xl font-serif text-foreground text-center mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{ fontFamily: 'var(--font-dancing), cursive' }}
        >
          Our Secret Diary
        </motion.h1>

        <motion.p
          className="text-muted-foreground text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Enter our special code to unlock our memories
        </motion.p>

        {/* Code Input */}
        <motion.form
          onSubmit={handleSubmit}
          className="w-full space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="relative">
            <Input
              type="password"
              placeholder="Enter secret code..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className={`text-center text-lg py-6 bg-card border-2 transition-colors ${
                error ? "border-destructive" : "border-love/30 focus:border-love"
              }`}
            />
            <Heart className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-love/50" />
          </div>

          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-destructive text-center text-sm"
              >
                That&apos;s not our secret code, try again my love 💕
              </motion.p>
            )}
          </AnimatePresence>

          <Button
            type="submit"
            className="w-full bg-love hover:bg-love/90 text-white py-6 text-lg gap-2"
          >
            <Unlock className="w-5 h-5" />
            Unlock Our Memories
          </Button>
        </motion.form>

        {/* Hint */}
        <motion.p
          className="mt-6 text-sm text-muted-foreground text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Hint: Our special number, Pappu knows it...
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
