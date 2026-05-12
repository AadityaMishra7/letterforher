"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

export interface Photo {
  id: number
  src: string
  caption: string
  date: string
  note: string
}

interface PhotoGalleryProps {
  photos: Photo[]
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openPhoto = (photo: Photo, index: number) => {
    setSelectedPhoto(photo)
    setCurrentIndex(index)
  }

  const nextPhoto = () => {
    const next = (currentIndex + 1) % photos.length
    setCurrentIndex(next)
    setSelectedPhoto(photos[next])
  }

  const prevPhoto = () => {
    const prev = (currentIndex - 1 + photos.length) % photos.length
    setCurrentIndex(prev)
    setSelectedPhoto(photos[prev])
  }

  return (
    <div className="py-8">
      <motion.h2
        className="text-3xl md:text-4xl text-center mb-2"
        style={{ fontFamily: 'var(--font-dancing), cursive' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Our Journey Together
      </motion.h2>
      <motion.p
        className="text-muted-foreground text-center mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Every moment with you is a treasure ✨
      </motion.p>

      {/* Photo Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            className="relative group cursor-pointer"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => openPhoto(photo, index)}
          >
            <div className="aspect-square relative rounded-2xl overflow-hidden bg-muted border-4 border-card shadow-lg">
              <Image
                src={photo.src}
                alt={photo.caption}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-love/0 group-hover:bg-love/20 transition-colors" />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-white text-sm font-medium truncate">{photo.caption}</p>
                <p className="text-white/70 text-xs">{photo.date}</p>
              </div>
            </div>
            <motion.div
              className="absolute -top-2 -right-2 bg-love text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
              whileHover={{ scale: 1.2 }}
            >
              <Heart className="w-4 h-4" fill="white" />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              className="relative max-w-4xl w-full bg-card rounded-3xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation */}
              <button
                onClick={prevPhoto}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextPhoto}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image */}
              <div className="aspect-[4/3] relative">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.caption}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Caption */}
              <div className="p-6 bg-card">
                <div className="flex items-center gap-2 mb-2">
                  <Heart className="w-5 h-5 text-love" fill="currentColor" />
                  <span className="text-sm text-muted-foreground">{selectedPhoto.date}</span>
                </div>
                <h3
                  className="text-2xl mb-2"
                  style={{ fontFamily: 'var(--font-dancing), cursive' }}
                >
                  {selectedPhoto.caption}
                </h3>
                <p className="text-muted-foreground italic">{selectedPhoto.note}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
