'use client'

import dynamic from 'next/dynamic'
import { HeroSection } from '@/components/hero-section'
import { Olympiad3DCards } from '@/components/olympiad-3d-cards'
import { BMOBanner } from '@/components/bmo-banner'
import { useLanguage } from '@/contexts/language-context'
import { motion } from 'framer-motion'

// ─── Dynamic imports (SSR:false) për komponentët me Three.js / WebGL ──────────
// Kjo shmang gabimet "window is not defined" gjatë server-side rendering
const SpaceBackground = dynamic(
  () => import('@/components/space-background').then((mod) => mod.SpaceBackground),
  {
    ssr: false,
    // Placeholder transparent gjatë ngarkimit — pa CLS (Content Layout Shift)
    loading: () => null,
  }
)

// ─── Të dhënat e feature cards (data-driven, jo kod i përsëritur) ─────────────
// Lëvizi jashtë komponentit për të shmangur ri-krijimin në çdo render
const FEATURES = [
  {
    symbol: 'π',
    color: '#F5E642',
    titleKey: 'feature1Title',
    titleFallback: 'Ekselencë Akademike',
    descKey: 'feature1Desc',
    descFallback: 'Programe të dizajnuara nga ekspertë për të zhvilluar aftësitë kritike të mendimit.',
  },
  {
    symbol: 'e',
    color: '#3b82f6',
    titleKey: 'feature2Title',
    titleFallback: 'Konkurrencë Ndërkombëtare',
    descKey: 'feature2Desc',
    descFallback: 'Mundësi për të përfaqësuar Shqipërinë në olimpiada ndërkombëtare.',
  },
  {
    symbol: '∑',
    color: '#10b981',
    titleKey: 'feature3Title',
    titleFallback: 'Komunitet i Fuqishëm',
    descKey: 'feature3Desc',
    descFallback: 'Bashkohu me nxënës të tjerë të talentuar dhe mentorë të përkushtuar.',
  },
] as const

// ─── Variante animacioni (jashtë komponentit — krijohen vetëm një herë) ────────
const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 },
  }),
}

// ─── Feature Card ─────────────────────────────────────────────────────────────
// Komponent i ndarë për të shmangur JSX të përsëritur dhe për lehtësi testimi
interface FeatureCardProps {
  symbol: string
  color: string
  title: string
  description: string
  index: number
}

function FeatureCard({ symbol, color, title, description, index }: FeatureCardProps) {
  // Ngjyrat e hover-it via CSS custom property — pa JS inline style
  // Kjo lejon GPU compositing dhe shmang layout thrashing
  const rgb = hexToRgb(color)
  const cssVars = rgb
    ? ({
        '--card-glow': `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.2)`,
        '--card-border': `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`,
      } as React.CSSProperties)
    : {}

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      // Hover-i bëhet me CSS (globals.css .feature-card:hover) — performancë më e mirë
      className="feature-card group rounded-2xl border border-border/50 bg-card/50 p-8 backdrop-blur-sm transition-all duration-300"
      style={cssVars}
    >
      {/* Ikona simbolike */}
      <div
        className="mb-6 flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-300"
        style={{
          backgroundColor: `rgba(${hexToRgb(color)?.r ?? 0}, ${hexToRgb(color)?.g ?? 0}, ${hexToRgb(color)?.b ?? 0}, 0.1)`,
        }}
      >
        <span className="text-2xl font-bold" style={{ color }}>
          {symbol}
        </span>
      </div>

      <h3 className="mb-3 text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  )
}

// ─── Funksion ndihmës: hex → rgb ───────────────────────────────────────────────
// Vendoset këtu (jo në lib/utils) pasi përdoret vetëm në këtë skedar
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

// ─── Faqja kryesore ───────────────────────────────────────────────────────────
export default function HomePage() {
  const { t } = useLanguage()

  return (
    <div className="relative">
      {/* 3D Space Background — ngarkohet asinkronisht, pa bllokuar LCP */}
      <SpaceBackground />

      {/* ── Hero ── */}
      <HeroSection />

      {/* ── Olympiad 3D Cards ── */}
      <Olympiad3DCards />

      {/* ── BMO Banner ── */}
      <BMOBanner />

      {/* ── Features Section ── */}
      <section className="relative py-24" aria-labelledby="features-heading">
        <div className="container mx-auto px-4">

          {/* Titulli i seksionit */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <h2
              id="features-heading"
              className="mb-4 font-heading text-4xl font-bold text-foreground md:text-5xl"
            >
              {t('whyProventus', 'Pse PROVENTUS?')}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {t('whyProventusDesc', 'Ndërtojmë të ardhmen përmes edukimit të jashtëzakonshëm')}
            </p>
          </motion.div>

          {/* Feature Cards — gjenerohen nga array, jo të kopjuara 3 herë */}
          <div className="grid gap-8 md:grid-cols-3">
            {FEATURES.map((feature, index) => (
              <FeatureCard
                key={feature.titleKey}
                index={index}
                symbol={feature.symbol}
                color={feature.color}
                title={t(feature.titleKey, feature.titleFallback)}
                description={t(feature.descKey, feature.descFallback)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
