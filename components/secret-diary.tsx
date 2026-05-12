"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, Lock, Sparkles } from "lucide-react"
import { LockScreen } from "./lock-screen"
import { PhotoGallery, Photo } from "./photo-gallery"
import { LoveNotes, LoveNote } from "./love-notes"
import { BirthdayLetter } from "./birthday-letter"
import { JourneyTimeline, TimelineEvent } from "./journey-timeline"
import { DiaryNavigation } from "./diary-navigation"

// ============================================
// YOUR LOVE STORY - AADITYA & PALLAVI
// ============================================

// Your girlfriend's name
const PARTNER_NAME = "Pappu"

// Your name
const YOUR_NAME = "Your Sadiyal Forever"

// Your secret code
const SECRET_CODE = "1316"

// Your photos together - Replace with your real photos!
const PHOTOS: Photo[] = [
  {
    id: 1,
    src: "/photos/photo1.jpg",
    caption: "Where It All Began",
    date: "At Tuition",
    note: "Two strangers sitting in the same class... I never knew you would become my whole world, Pappu."
  },
  {
    id: 2,
    src: "/photos/photo2.jpg",
    caption: "From Strangers to Friends",
    date: "The Beginning",
    note: "Simple conversations that slowly turned into a habit... and now I can not imagine my life without you."
  },
  {
    id: 3,
    src: "/photos/photo3.jpg",
    caption: "The Day You Became Mine",
    date: "3rd January 2020",
    note: "The happiest day of my life - when you said yes to being my Pappu forever."
  },
  {
    id: 4,
    src: "/photos/photo4.jpg",
    caption: "Khatu Shyam Ji Darshan",
    date: "Our Sacred Moments",
    note: "Every visit to Khatu Shyam Ji temple with you feels so blessed. You are my blessing."
  },
  {
    id: 5,
    src: "/photos/photo5.jpg",
    caption: "Our Cozy Moments",
    date: "Home Memories",
    note: "The simple moments at home with you are my favorite... you are my comfort, my peace."
  },
  {
    id: 6,
    src: "/photos/photo6.jpg",
    caption: "Celebrating My Pappu",
    date: "13th May",
    note: "Happy Birthday my Pappu! You deserve all the chocolates and happiness in the world."
  },
]

// Your love notes for Pappu
const LOVE_NOTES: LoveNote[] = [
  {
    id: 1,
    title: "You Are My Peace",
    content: "I still do not know the exact moment I fell in love with you... maybe it was in your smile, or the way you slowly became my everyday peace. What started as simple conversations turned into a habit... and now, you are someone I can not imagine my life without.",
    date: "From Your Sadiyal",
    color: "pink"
  },
  {
    id: 2,
    title: "When You Call Me Sadiyal",
    content: "And when you call me 'Sadiyal', I can not help but smile... because even in that, I feel your love in the most real way. That name is so special because it comes from you, my Pappu.",
    date: "Written with love",
    color: "gold"
  },
  {
    id: 3,
    title: "You Are My Everything",
    content: "You are not just someone I love... you are my comfort, my happiness, my safe place. They do not know, but I feel it everytime. And I always miss you, every single moment.",
    date: "Always thinking of you",
    color: "cream"
  },
  {
    id: 4,
    title: "I Would Choose You Again",
    content: "If I had to live this life again, I would still choose you... again and again, without a second thought. I may not be perfect, I may mess things up sometimes... but one thing I am always sure about is how deeply I feel for you.",
    date: "Forever yours",
    color: "rose"
  },
]

// Timeline of your love story with Pappu
const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 1,
    title: "Two Strangers at Tuition",
    date: "Where It All Began",
    description: "We were just two strangers sitting in the same tuition class. Little did I know that this stranger would become my whole world.",
    icon: "heart"
  },
  {
    id: 2,
    title: "From Strangers to Friends",
    date: "The Friendship Era",
    description: "Simple conversations slowly turned into a beautiful friendship. You became someone I looked forward to seeing every day.",
    icon: "star"
  },
  {
    id: 3,
    title: "You Became My Pappu",
    date: "3rd January 2020",
    description: "The most special day of my life! Our journey as lovers officially began. You said yes to being my Pappu forever.",
    icon: "heart"
  },
  {
    id: 4,
    title: "Khatu Shyam Ji Blessings",
    date: "Our Sacred Place",
    description: "Every visit to Khatu Shyam Ji temple with you feels so blessed. Seeking blessings together for our forever.",
    icon: "pin"
  },
  {
    id: 5,
    title: "5+ Years of Love",
    date: "Still Going Strong",
    description: "From strangers to soulmates - every moment with you has been worth it. Here is to forever, my Pappu.",
    icon: "star"
  },
]

// Your birthday letter for Pappu - 13th May
const BIRTHDAY_LETTER = `I still do not know the exact moment I fell in love with you...
maybe it was in your smile, or the way you slowly became my everyday peace.

What started as simple conversations turned into a habit...
and now, you are someone I can not imagine my life without.

And when you call me 'Sadiyal', I can not help but smile...
because even in that, I feel your love in the most real way.

I may not be perfect, I may mess things up sometimes...
but one thing I am always sure about is how deeply I feel for you.

You are not just someone I love...
you are my comfort, my happiness, my safe place.

If I had to live this life again, I would still choose you...
again and again, without a second thought.

They do not know how special you are to me, Pappu...
but I feel it every single moment. And I always miss you, everytime.

You love chocolates, your family, and your dreams...
and I love everything about you, including the way you dream.

Happy Birthday, my Pappu...
from your always-and-forever Sadiyal`

// ============================================
// END OF CUSTOMIZATION
// ============================================

export function SecretDiary() {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  
  const homeRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const notesRef = useRef<HTMLDivElement>(null)
  const letterRef = useRef<HTMLDivElement>(null)

  const sectionRefs: Record<string, React.RefObject<HTMLDivElement | null>> = {
    home: homeRef,
    timeline: timelineRef,
    gallery: galleryRef,
    notes: notesRef,
    letter: letterRef,
  }

  const handleNavigate = (section: string) => {
    setActiveSection(section)
    sectionRefs[section]?.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleUnlock = () => {
    setIsUnlocked(true)
  }

  return (
    <AnimatePresence mode="wait">
      {!isUnlocked ? (
        <LockScreen
          key="lock"
          onUnlock={handleUnlock}
          secretCode={SECRET_CODE}
          partnerName={PARTNER_NAME}
        />
      ) : (
        <motion.div
          key="diary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen bg-background pb-24"
        >
          {/* Header */}
          <motion.header
            className="sticky top-0 z-30 bg-background/80 backdrop-blur-lg border-b border-love/10 py-4"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="container mx-auto px-4 flex items-center justify-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="w-6 h-6 text-love" fill="currentColor" />
              </motion.div>
              <h1
                className="text-2xl md:text-3xl text-foreground"
                style={{ fontFamily: 'var(--font-dancing), cursive' }}
              >
                Our Secret Diary
              </h1>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-5 h-5 text-gold" />
              </motion.div>
            </div>
          </motion.header>

          {/* Main Content */}
          <main className="container mx-auto px-4 max-w-5xl">
            {/* Home Section */}
            <section ref={homeRef} className="py-12">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  className="inline-flex items-center gap-2 bg-love/10 px-4 py-2 rounded-full mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring" }}
                >
                  <Heart className="w-4 h-4 text-love" fill="currentColor" />
                  <span className="text-sm text-love font-medium">Happy Birthday!</span>
                  <Heart className="w-4 h-4 text-love" fill="currentColor" />
                </motion.div>
                
                <h2
                  className="text-4xl md:text-6xl text-foreground mb-4"
                  style={{ fontFamily: 'var(--font-dancing), cursive' }}
                >
                  To My Dearest {PARTNER_NAME}
                </h2>
                
                <p className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
                  Welcome to our secret diary, a collection of our most precious memories,
                  my love notes to you, and a special birthday message just for you.
                </p>

                <motion.div
                  className="mt-8 flex justify-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    >
                      <Heart
                        className="w-8 h-8 text-love"
                        fill="currentColor"
                        style={{ opacity: 1 - i * 0.2 }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </section>

            {/* Timeline Section */}
            <section ref={timelineRef}>
              <JourneyTimeline events={TIMELINE_EVENTS} />
            </section>

            {/* Gallery Section */}
            <section ref={galleryRef}>
              <PhotoGallery photos={PHOTOS} />
            </section>

            {/* Notes Section */}
            <section ref={notesRef}>
              <LoveNotes notes={LOVE_NOTES} />
            </section>

            {/* Letter Section */}
            <section ref={letterRef}>
              <BirthdayLetter
                partnerName={PARTNER_NAME}
                letterContent={BIRTHDAY_LETTER}
                yourName={YOUR_NAME}
              />
            </section>

            {/* Footer */}
            <motion.footer
              className="text-center py-8 border-t border-love/10 mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-muted-foreground text-sm mb-2">
                Made with love for {PARTNER_NAME}
              </p>
              <div className="flex justify-center gap-2">
                <Heart className="w-4 h-4 text-love" fill="currentColor" />
                <Lock className="w-4 h-4 text-love/50" />
                <Heart className="w-4 h-4 text-love" fill="currentColor" />
              </div>
            </motion.footer>
          </main>

          {/* Navigation */}
          <DiaryNavigation activeSection={activeSection} onNavigate={handleNavigate} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
