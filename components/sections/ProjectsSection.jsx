'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { FaGithub } from 'react-icons/fa'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import profile from '@/data/profile.json'
import styles from '@/styles/sections/ProjectsSection.module.css'

const PROJECTS = profile.projects

export default function ProjectsSection() {
  const sectionRef  = useRef(null)
  const gridRef     = useRef(null)
  const progressRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const grid    = gridRef.current
    if (!section || !grid) return

    const scroller = document.querySelector('main')
    if (!scroller) return

    const tl = gsap.timeline({ paused: true })

    const st = ScrollTrigger.create({
      trigger:  section,
      scroller,
      start:    'top top',
      end:      () => `+=${(PROJECTS.length - 1) * window.innerHeight}`,
      scrub:    true,
      animation: tl,
      onUpdate: (self) => {
        if (progressRef.current) {
          gsap.set(progressRef.current, {
            scaleX: self.progress,
            transformOrigin: 'left center',
            overwrite: true,
          })
        }
      },
    })

    function updateScroll() {
      if (!section || !grid) return
      
      const containerHeight = section.clientHeight
      const gridHeight = grid.offsetHeight
      
      const containerStyle = window.getComputedStyle(grid.parentNode)
      const paddingTop = parseFloat(containerStyle.paddingTop) || 0
      const paddingBottom = parseFloat(containerStyle.paddingBottom) || 0
      
      const scrollDistance = Math.max(0, gridHeight + paddingTop + paddingBottom - containerHeight)

      // Clear the timeline and recreate the vertical translation
      tl.clear()
      tl.to(grid, {
        y: -scrollDistance,
        ease: 'none',
        duration: 1,
      })
      
      ScrollTrigger.refresh()
    }

    // Run initially
    updateScroll()

    // Wait for images to load to get accurate offsetHeight
    const delayTimer = setTimeout(updateScroll, 500)
    
    // Add load event listener for all images
    const images = grid.querySelectorAll('img')
    images.forEach(img => {
      if (img.complete) {
        updateScroll()
      } else {
        img.addEventListener('load', updateScroll)
      }
    })

    window.addEventListener('resize', updateScroll)

    return () => {
      clearTimeout(delayTimer)
      window.removeEventListener('resize', updateScroll)
      images.forEach(img => img.removeEventListener('load', updateScroll))
      st.kill()
    }
  }, [])

  return (
    <div style={{ height: `${PROJECTS.length * 100}vh` }}>
      <section ref={sectionRef} className={styles.section}>

        {/* Top bar */}
        <div className={styles.topBar}>
          <span className={styles.sectionLabel}>Projects</span>
          <span className={styles.sectionSubLabel}>Selected Works</span>
        </div>

        {/* Vertical Grid Container */}
        <div className={styles.gridContainer}>
          <div ref={gridRef} className={styles.grid}>
            {PROJECTS.map((proj) => (
              <div key={proj.id} className={styles.cardContainer}>
                
                {/* Image Card Frame */}
                <div className={styles.card}>
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={styles.cardImg}
                    priority
                  />
                  
                  {/* Floating Badges */}
                  <span className={styles.yearBadge}>{proj.year}</span>
                  
                  <div className={styles.cardLinks}>
                    {proj.github && (
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.iconLink}
                        aria-label="GitHub Repository"
                      >
                        <FaGithub size={18} />
                      </a>
                    )}
                    {proj.live && (
                      <a
                        href={proj.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.iconLink}
                        aria-label="Live Demo"
                      >
                        <svg width="16" height="16" viewBox="0 0 12 12" fill="none" aria-hidden>
                          <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </a>
                    )}
                  </div>
                </div>

                {/* Card Info below image */}
                <div className={styles.cardInfo}>
                  <div className={styles.titleRow}>
                    <h3 className={styles.cardTitle}>{proj.title}</h3>
                    <div className={styles.techTags}>
                      {proj.tech.slice(0, 3).map((t) => (
                        <span key={t} className={styles.tag}>{t}</span>
                      ))}
                    </div>
                  </div>
                  <p className={styles.cardDesc}>{proj.desc}</p>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Progress bar UI */}
        <div className={styles.bottomUI}>
          <div className={styles.progressTrack}>
            <div ref={progressRef} className={styles.progressBar} />
          </div>
        </div>

      </section>
    </div>
  )
}

