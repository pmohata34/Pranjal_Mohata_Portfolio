'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import styles from '@/styles/sections/ScreenLoader.module.css'
import profile from '@/data/profile.json'

export default function ScreenLoader({ onDismiss }) {
  const overlayRef = useRef(null)
  const tilesRef = useRef([])
  const scanBarRef = useRef(null)
  const startBtnRef = useRef(null)
  const logoWrapRef = useRef(null)
  const titleRef = useRef(null)
  const [assembled, setAssembled] = useState(false)

  useEffect(() => {
    const tiles = tilesRef.current.filter(Boolean)
    if (!tiles.length) return

    // Setup initial random scattered values
    tiles.forEach((tile) => {
      const randomX = (Math.random() - 0.5) * 350
      const randomY = (Math.random() - 0.5) * 350
      const randomRot = (Math.random() - 0.5) * 90
      gsap.set(tile, {
        x: randomX,
        y: randomY,
        rotation: randomRot,
        opacity: 0,
        scale: 0.8,
      })
    })

    // Animation timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setAssembled(true)
        // Play merge / flash effect
        gsap.to(logoWrapRef.current, {
          scale: 1.05,
          duration: 0.3,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1,
        })
        gsap.fromTo(
          startBtnRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.7)' }
        )
      },
    })

    // Staggered entry & assembly
    tl.to(tiles, {
      x: 0,
      y: 0,
      rotation: 0,
      opacity: 1,
      scale: 1,
      duration: 1.2,
      stagger: {
        amount: 0.8,
        grid: [3, 3],
        from: 'center',
      },
      ease: 'back.out(1.3)',
    }, 0.2)

    // Scan bar animation passing through the assembling puzzle
    tl.fromTo(
      scanBarRef.current,
      { y: -100, opacity: 0 },
      { y: 100, opacity: 0.8, duration: 1.5, ease: 'power2.inOut' },
      0.3
    )

    // Fade in title text
    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.4'
    )

    return () => tl.kill()
  }, [])

  function handleStart() {
    window.dispatchEvent(
      new CustomEvent('loader-dismissed')
    )

    const overlay = overlayRef.current
    if (!overlay) return

    overlay.style.pointerEvents = 'none'

    // Create split layers
    const top = document.createElement('div')
    top.className = styles.splitTop

    const bottom = document.createElement('div')
    bottom.className = styles.splitBottom

    // Center line
    const line = document.createElement('div')
    line.className = styles.centerLine

    document.body.appendChild(top)
    document.body.appendChild(bottom)
    document.body.appendChild(line)

    // Hide original overlay fast
    gsap.to(overlay, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.out',
    })

    // Animate line
    gsap.fromTo(
      line,
      {
        scaleX: 0,
        opacity: 0,
      },
      {
        scaleX: 1,
        opacity: 1,
        duration: 0.25,
        ease: 'power2.out',
      }
    )

    // Split animation
    gsap.to(top, {
      y: '-100%',
      duration: 1,
      ease: 'expo.inOut',
      force3D: true,
    })

    gsap.to(bottom, {
      y: '100%',
      duration: 1,
      ease: 'expo.inOut',
      force3D: true,
    })

    // Fade line away
    gsap.to(line, {
      opacity: 0,
      duration: 0.3,
      delay: 0.2,
    })

    setTimeout(() => {
      top.remove()
      bottom.remove()
      line.remove()

      window.dispatchEvent(
        new CustomEvent('loader-animation-done')
      )

      onDismiss()
    }, 1000)
  }

  // Create array of 9 tiles
  const gridTiles = Array.from({ length: 9 })

  return (
    <div ref={overlayRef} className={styles.overlay}>
      <video
        src="/assets/loader.mp4"
        autoPlay
        muted
        loop
        playsInline
        className={styles.bgVideo}
      />
      <div className={styles.liquidBg} aria-hidden />

      {/* Puzzle Grid Area */}
      <div ref={logoWrapRef} className={`${styles.puzzleContainer} ${assembled ? styles.assembled : ''}`}>
        <div className={styles.puzzleGrid}>
          {gridTiles.map((_, i) => {
            const row = Math.floor(i / 3)
            const col = i % 3
            const bgPosX = `${(col / 2) * 100}%`
            const bgPosY = `${(row / 2) * 100}%`

            return (
              <div
                key={i}
                ref={(el) => {
                  tilesRef.current[i] = el
                }}
                className={styles.puzzleTile}
                style={{
                  backgroundImage: "url('/assets/logo.png')",
                  backgroundPosition: `${bgPosX} ${bgPosY}`,
                }}
              />
            )
          })}
        </div>
        
        {/* Glow scan bar */}
        <div ref={scanBarRef} className={styles.scanBar} />
      </div>

      <p ref={titleRef} className={styles.monogram}>
        {profile.name.full.toUpperCase()}
      </p>

      <button
        ref={startBtnRef}
        className={styles.startBtn}
        onClick={handleStart}
        style={{ opacity: 0 }}
      >
        Start
      </button>
    </div>
  )
}