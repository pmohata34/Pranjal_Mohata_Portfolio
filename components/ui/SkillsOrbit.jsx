'use client'

import { useEffect, useRef } from 'react'
import profile from '@/data/profile.json'
import styles from '@/styles/ui/SkillsOrbit.module.css'

export default function SkillsOrbit() {
  const containerRef = useRef(null)
  const ringRef      = useRef(null)
  const tagRefs      = useRef([])
  const skills       = profile.skills

  useEffect(() => {
    const container = containerRef.current
    if (!container || skills.length === 0) return

    const tags = tagRefs.current.filter(Boolean)
    const total = tags.length

    let angle = 0
    let targetSpeed = 0.005
    let currentSpeed = 0.005
    let mouseX = 0
    let isHovered = false

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect()
      // Normalized X from -1 to 1
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    }

    const handleMouseEnter = () => {
      isHovered = true
    }

    const handleMouseLeave = () => {
      isHovered = false
      mouseX = 0
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)

    let animId
    const tick = () => {
      animId = requestAnimationFrame(tick)

      // Calculate radius dynamically based on container size
      const isMobile = window.innerWidth < 768
      const radiusX = isMobile ? window.innerWidth * 0.32 : Math.min(260, container.offsetWidth * 0.32)
      const radiusZ = isMobile ? window.innerWidth * 0.28 : Math.min(220, container.offsetWidth * 0.28)

      // Smoothly interpolate speed
      if (isHovered) {
        // Spin direction and speed dictated by cursor X position
        targetSpeed = mouseX * 0.015
      } else {
        // Idle return speed
        targetSpeed = 0.004
      }
      currentSpeed += (targetSpeed - currentSpeed) * 0.08
      angle += currentSpeed

      tags.forEach((tag, idx) => {
        const phi = (idx / total) * Math.PI * 2 + angle
        
        // 3D positioning
        const x = Math.sin(phi) * radiusX
        const z = Math.cos(phi) * radiusZ
        
        // Tilt the orbit slightly for a 3D perspective
        const y = Math.cos(phi) * 16 

        // Scale & Opacity based on depth (z)
        const scale = 0.72 + ((z + radiusZ) / (2 * radiusZ)) * 0.38
        const opacity = 0.32 + ((z + radiusZ) / (2 * radiusZ)) * 0.68
        const zIndex = Math.round(z + radiusZ * 2)

        tag.style.transform = `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`
        tag.style.opacity = opacity
        tag.style.zIndex = zIndex
      })
    }

    tick()

    return () => {
      cancelAnimationFrame(animId)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [skills])

  return (
    <div ref={containerRef} className={styles.container}>
      <div ref={ringRef} className={styles.orbitRing}>
        {skills.map((skill, idx) => (
          <div
            key={skill}
            ref={el => { tagRefs.current[idx] = el }}
            className={styles.tag}
          >
            {skill}
          </div>
        ))}
      </div>
    </div>
  )
}
