'use client'

import { useEffect, useRef, useState, Fragment } from 'react'
import Image from 'next/image'
import { gsap } from '@/lib/gsap'
import {
  FaGithub, FaLinkedinIn, FaMedium, FaInstagram, FaYoutube, FaEnvelope,
} from 'react-icons/fa'
import { FiArrowUpRight, FiChevronDown } from 'react-icons/fi'
import profile from '@/data/profile.json'
import content from '@/data/content.json'
import styles from '@/styles/sections/PublicationsFooterSection.module.css'

const PUBS = profile.publications

const SOCIAL_ICONS = {
  GitHub: <FaGithub size={13} />,
  LinkedIn: <FaLinkedinIn size={13} />,
  Medium: <FaMedium size={13} />,
  Instagram: <FaInstagram size={13} />,
  YouTube: <FaYoutube size={13} />,
  Email: <FaEnvelope size={13} />,
}

const MOBILE_SOCIAL_ICONS = {
  GitHub: <FaGithub size={20} />,
  LinkedIn: <FaLinkedinIn size={20} />,
  Instagram: <FaInstagram size={20} />,
}
const HERO_SOCIAL_LABELS = ['GitHub', 'LinkedIn', 'Instagram']

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

function handleViewProjects() {
  const scroller = document.querySelector('main')
  if (scroller) gsap.to(scroller, { scrollTop: 3 * window.innerHeight, duration: 1.0, ease: 'power3.inOut' })
}

export default function PublicationsFooterSection() {
  const wrapperRef = useRef(null)
  const stickyRef = useRef(null)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('')

    const form = e.target
    const data = new FormData(form)

    const web3Key = profile.web3formsKey || "dbffc85a-06b8-4c8d-b0f3-e5d4481079d3"
    data.append("access_key", web3Key)
    data.append("subject", "New Portfolio Message from " + data.get("name"))

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data
      })
      const result = await response.json()
      if (result.success) {
        setSubmitStatus("Thank you! Your message has been sent successfully.")
        form.reset()
      } else {
        setSubmitStatus("Something went wrong. Please try emailing directly: " + profile.email)
      }
    } catch (error) {
      setSubmitStatus("Error sending message. Please try emailing directly: " + profile.email)
    } finally {
      setIsSubmitting(false)
    }
  }

  function renderContactForm() {
    return (
      <form onSubmit={handleSubmit} className={styles.contactForm}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.formLabel}>Name</label>
          <input type="text" id="name" name="name" required placeholder="John Doe" className={styles.formInput} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.formLabel}>Your Email</label>
          <input type="email" id="email" name="email" required placeholder="john@example.com" className={styles.formInput} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.formLabel}>Message</label>
          <textarea id="message" name="message" required placeholder="Tell me about your project..." rows={3} className={styles.formTextarea}></textarea>
        </div>
        <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
        {submitStatus && <p className={styles.submitStatus}>{submitStatus}</p>}
      </form>
    )
  }

  // image
  const imageWrapRef = useRef(null)
  const imageOverlayRef = useRef(null)

  // publication content
  const pubContentRef = useRef(null)
  const labelRef = useRef(null)
  const headingRef = useRef(null)
  const dividerRef = useRef(null)
  const itemRefs = useRef([])



  // footer
  const footerContentRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const bigNameRef = useRef(null)
  const bottomBarRef = useRef(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const sticky = stickyRef.current
    const scroller = document.querySelector('main')
    if (!wrapper || !sticky || !scroller) return

    const isMobile = window.innerWidth < 768

    // ── Publication entry animation ───────────────────────────
    let pubAnimDone = false

    function resetPubAnim() {
      pubAnimDone = false
      gsap.set(labelRef.current, { opacity: 0, y: -16, rotateX: 40, transformPerspective: 500, transformOrigin: '50% 0%' })
      gsap.set(headingRef.current, { opacity: 0, y: -30, rotateX: 35, transformPerspective: 700, transformOrigin: '50% 0%' })
      gsap.set(dividerRef.current, { scaleX: 0, transformOrigin: 'left center' })
      itemRefs.current.forEach(el => {
        if (el) gsap.set(el, { opacity: 0, y: 28, rotateX: 18, transformPerspective: 900, transformOrigin: '50% 0%' })
      })
    }

    function playPubAnim() {
      if (pubAnimDone) return
      pubAnimDone = true
      gsap.to(labelRef.current, { opacity: 1, y: 0, rotateX: 0, duration: 0.55, ease: 'power3.out' })
      gsap.to(headingRef.current, { opacity: 1, y: 0, rotateX: 0, duration: 0.75, ease: 'expo.out', delay: 0.08 })
      gsap.to(dividerRef.current, { scaleX: 1, duration: 0.7, ease: 'power2.inOut', delay: 0.25 })
      itemRefs.current.forEach((el, i) => {
        if (el) gsap.to(el, { opacity: 1, y: 0, rotateX: 0, duration: 0.6, ease: 'power3.out', delay: 0.32 + i * 0.1 })
      })
    }

    // ── Initial image position (full-width background) ───────
    function setImageLeft() {
      const vw = window.innerWidth
      gsap.set(imageWrapRef.current, { width: vw, x: 0, opacity: 1 })
      if (imageOverlayRef.current) gsap.set(imageOverlayRef.current, { opacity: 1 })
    }

    // ── Scroll-driven animation ───────────────────────────────
    function onScroll() {
      const vh = window.innerHeight
      const dist = -wrapper.getBoundingClientRect().top

      // Entry: play pub animation when section first enters view
      if (dist > -vh * 0.5 && dist < vh * 0.35) {
        playPubAnim()
      } else if (dist < -vh * 0.4) {
        resetPubAnim()
        setImageLeft()
      }

      const p = Math.max(0, Math.min(1, dist / vh))

      // ── Phase 1: pub text fades out ──────────────────────
      const pubFadeEnd = 0.40
      const pubFade = 1 - Math.max(0, Math.min(1, p / pubFadeEnd))
      gsap.set(pubContentRef.current, { opacity: pubFade, pointerEvents: pubFade > 0.05 ? 'auto' : 'none' })

      const vw = window.innerWidth

      if (!isMobile) {
        // ── Phase 2: image shrinks full-width → centered (p 0.05 → 0.90) ──
        const imgRaw = Math.max(0, Math.min(1, (p - 0.05) / 0.85))
        const imgP = easeInOut(imgRaw)

        const startW = vw
        const endW = vw * 0.46
        const w = startW + imgP * (endW - startW)
        const centerX = imgP * (vw - w) / 2

        gsap.set(imageWrapRef.current, { width: w, x: centerX, opacity: 1 })

        // Dark overlay fades as image shrinks
        if (imageOverlayRef.current) {
          gsap.set(imageOverlayRef.current, { opacity: 1 - imgP })
        }
      }

      // ── Footer text fades in ──────────────────────────────
      const footerStart = 0.60
      const footerRange = 0.35
      const footerFade = Math.max(0, Math.min(1, (p - footerStart) / footerRange))
      gsap.set(footerContentRef.current, { opacity: footerFade, pointerEvents: footerFade > 0.05 ? 'auto' : 'none' })
    }

    resetPubAnim()
    setImageLeft()
    scroller.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      scroller.removeEventListener('scroll', onScroll)
    }
  }, [])

  const year = new Date().getFullYear()

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div ref={stickyRef} className={styles.sticky}>

        {/* ── Mobile background image (footer phase - mobile only) ── */}
        <div className={styles.mobileFooterBg}>
          <Image
            src="/assets/footer-mobile.png"
            alt=""
            fill
            quality={100}
            className={styles.mobileFooterBgImg}
            sizes="100vw"
            priority={false}
          />
        </div>

        {/* ── Mobile permanent dark overlay - keeps image visually identical across all 3 sections ── */}
        <div className={styles.mobileDarkOverlay} aria-hidden />

        {/* ── Floating image: starts left, moves to center ── */}
        <div ref={imageWrapRef} className={styles.imageWrap}>
          <Image
            src="/assets/footer.png"
            alt=""
            fill
            quality={100}
            className={styles.imageEl}
            sizes="(max-width: 767px) 100vw, 50vw"
            priority={false}
          />
          <div ref={imageOverlayRef} className={styles.imageOverlay} />
        </div>

        {/* ── Publication content (right of image) ── */}
        <div ref={pubContentRef} className={styles.pubContent}>
          <span className={styles.watermark} aria-hidden>{(content.publications?.watermark || "Writing").toUpperCase()}</span>

          <div className={styles.pubHero}>
            <p ref={labelRef} className={styles.label}>{content.publications?.eyebrow || "Research & Writing"}</p>
            <h2 ref={headingRef} className={styles.heading}>{content.publications?.heading || "Publications"}</h2>
          </div>

          <div ref={dividerRef} className={styles.divider} />

          <div className={styles.list}>
            {PUBS.map((pub, i) => (
              <a
                key={pub.id}
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                ref={el => { itemRefs.current[i] = el }}
                className={styles.item}
              >
                <div className={styles.num}>0{i + 1}.</div>
                <div className={styles.itemBody}>
                  <div className={styles.itemTop}>
                    <h3 className={styles.title}>{pub.title}</h3>
                    <span className={styles.platform}>{pub.platform}</span>
                  </div>
                  <p className={styles.desc}>{pub.desc}</p>
                </div>
                <div className={styles.itemRight}>
                  <span className={styles.year}>{pub.year}</span>
                  <span className={styles.readBtn}>
                    Read <FiArrowUpRight size={11} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>



        {/* ── Radial vignette (footer phase) ── */}
        <div className={styles.vignetteOverlay} aria-hidden />

        {/* ── Footer content ── */}
        <div ref={footerContentRef} className={styles.footerContent}>

          {/* ── Mobile: hero-like layout ── */}
          <div className={styles.mobileLayout}>
            <div className={styles.mobileBrand}>
              <span className={styles.mobileRoleDot} />
              <span className={styles.mobileRoleText}>{profile.roles.short.toUpperCase()}</span>
            </div>
            <h2 className={styles.mobileName}>
              {profile.name.first.toUpperCase()}
              <br />
              <span className={styles.mobileNameGhost}>{profile.name.last.toUpperCase()}</span>
            </h2>
            <p className={styles.mobileDesc}>{profile.description}</p>
            <div className={styles.mobileFormWrap}>
              {renderContactForm()}
            </div>
            <div className={styles.mobileSocialRow}>
              {HERO_SOCIAL_LABELS.map((label, i) => {
                const s = profile.socials.find(s => s.label === label)
                if (!s) return null
                return (
                  <Fragment key={label}>
                    {i > 0 && <div className={styles.mobileSocialDivider} aria-hidden />}
                    <a href={s.href} target="_blank" rel="noopener noreferrer" className={styles.mobileSocialLink} aria-label={label}>
                      <span className={styles.mobileSocialIconEl}>{MOBILE_SOCIAL_ICONS[label]}</span>
                      <span className={styles.mobileSocialLabelEl}>{label.toUpperCase()}</span>
                    </a>
                  </Fragment>
                )
              })}
            </div>
            <div className={styles.mobileScrollHint} aria-hidden>
              <FiChevronDown size={18} />
              <span className={styles.mobileScrollText}>Scroll to explore</span>
            </div>
          </div>

          <div className={styles.mainGrid}>

            <div ref={leftRef} className={styles.leftCol}>
              <div className={styles.identityBlock}>
                <p className={styles.greetLine}>
                  <span className={styles.greetDot} />
                  {getGreeting()}
                </p>
                <p className={styles.roleLabel}>{profile.roles.short}</p>
                <h2 className={styles.nameHeading}>
                  {profile.name.first}
                  <br />
                  <span className={styles.nameGhost}>{profile.name.last}</span>
                </h2>
              </div>

              <div className={styles.footerInfo}>
                <p className={styles.footerDescription}>{profile.description}</p>
                <div className={styles.footerLinks}>
                  {profile.socials.slice(0, 4).map((s, i) => {
                    const isEmail = s.label === 'Email'
                    return (
                      <span key={s.label} className={styles.footerLinkWrap}>
                        {i > 0 && <span className={styles.footerPipe}>|</span>}
                        <a
                          href={isEmail ? `mailto:${s.href}` : s.href}
                          target={isEmail ? undefined : "_blank"}
                          rel={isEmail ? undefined : "noopener noreferrer"}
                          className={styles.footerLink}
                        >
                          {SOCIAL_ICONS[s.label] && (
                            <span className={styles.socialIcon}>{SOCIAL_ICONS[s.label]}</span>
                          )}
                          {s.label}
                        </a>
                      </span>
                    )
                  })}
                </div>
                <a href={`mailto:${profile.email}`} className={styles.footerMail}>
                  <FaEnvelope size={12} />
                  {profile.email}
                </a>
              </div>
            </div>

            <div className={styles.centerSpace} />

            <div ref={rightRef} className={styles.rightCol}>
              <h3 className={styles.formSectionTitle}>Get in touch</h3>
              {renderContactForm()}
            </div>

          </div>

          <div ref={bigNameRef} className={styles.signatureWrap}>
            <h2 className={styles.signatureText}>{profile.name.full.toUpperCase()}</h2>
          </div>

          <div ref={bottomBarRef} className={styles.bottomBar}>
            <div className={styles.bottomLeft}>
              <Image
                src="/assets/logo.png"
                alt="PM Monogram Logo"
                width={40}
                height={40}
                className={styles.footerLogo}
              />
              <span className={styles.leftDivider} />
              <div className={styles.copyBlock}>
                <p className={styles.copy}>© {year} {profile.name.full.toUpperCase()}</p>
                <p className={styles.copyAll}>ALL RIGHTS RESERVED</p>
              </div>
            </div>
            <div className={styles.bottomRight}>
              <span className={styles.builtWith}>
                DESIGNED &amp; DEVELOPED
                <br />
                WITH PRECISION.
              </span>
              <span className={styles.barDivider} />
              <span className={styles.sunIcon}>✺</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
