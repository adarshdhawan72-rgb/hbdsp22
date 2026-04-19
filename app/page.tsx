'use client'

import { useEffect, useState } from 'react'
import StarsCanvas from '@/components/StarsCanvas'
import CakeScene from '@/components/scenes/CakeScene'
import GiftBoxScene from '@/components/scenes/GiftBoxScene'
import PhotoScene from '@/components/scenes/PhotoScene'
import LetterScene from '@/components/scenes/LetterScene'
import FinalScene from '@/components/scenes/FinalScene'
import { playBirthdaySong, stopBirthdaySong } from '@/lib/effects'
type SceneId = 'cake' | 'gift' | 'photo' | 'letter' | 'final'

export default function Home() {
  const [scene, setScene] = useState<SceneId>('cake')

  useEffect(() => {
    playBirthdaySong()

    const startOnInteraction = () => {
      playBirthdaySong()
    }

    window.addEventListener('pointerdown', startOnInteraction, { once: true })
    window.addEventListener('keydown', startOnInteraction, { once: true })

    return () => {
      window.removeEventListener('pointerdown', startOnInteraction)
      window.removeEventListener('keydown', startOnInteraction)
      stopBirthdaySong(500)
    }
  }, [])

  return (
    <main className="fixed inset-0 h-full w-full overflow-hidden bg-black">
      <StarsCanvas />

      <CakeScene active={scene === 'cake'} onComplete={() => setScene('gift')} />
      <GiftBoxScene active={scene === 'gift'} onComplete={() => setScene('photo')} />
      <PhotoScene active={scene === 'photo'} onComplete={() => setScene('letter')} />
      <LetterScene active={scene === 'letter'} onComplete={() => setScene('final')} />
      <FinalScene active={scene === 'final'} />
    </main>
  )
}
