import type { Metadata, Viewport } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/contexts/language-context'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { CustomCursor } from '@/components/custom-cursor'
import { BackToTop } from '@/components/back-to-top'
import './globals.css'

// ─── Fonts ────────────────────────────────────────────────────────────────────
// Ngarkohen vetëm subset-et e nevojshme; display:'swap' shmang FOIT
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',   // u korrigjua: globals.css pret --font-sans
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-heading', // u korrigjua: globals.css pret --font-heading
  display: 'swap',
})

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  // U hoq 'generator: v0.app' — nuk duhet të shfaqet në prodhim
  metadataBase: new URL('https://proventus.al'), // nevojitet për OG images absolute
  title: {
    default: 'PROVENTUS — Shoqata Shkencore | Scientific Association',
    template: '%s | PROVENTUS',               // titujt e faqeve të brendshme
  },
  description:
    'PROVENTUS është një shoqatë shkencore që organizon olimpiada dhe aktivitete akademike për nxënësit e talentuar të Shqipërisë.',
  keywords: [
    'PROVENTUS',
    'olimpiada matematike',
    'pi-mind',
    'e-mind',
    'since-mind',
    'BMO',
    'shoqata shkencore',
    'Shqipëri',
  ],
  authors: [{ name: 'PROVENTUS', url: 'https://proventus.al' }],
  creator: 'PROVENTUS',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: 'PROVENTUS — Shoqata Shkencore | Scientific Association',
    description:
      'PROVENTUS është një shoqatë shkencore që organizon olimpiada dhe aktivitete akademike për nxënësit e talentuar.',
    url: 'https://proventus.al',
    siteName: 'PROVENTUS',
    type: 'website',
    locale: 'sq_AL',
    images: [
      {
        url: '/og-image.png', // krijo një imazh 1200×630 për OG
        width: 1200,
        height: 630,
        alt: 'PROVENTUS — Shoqata Shkencore',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PROVENTUS — Shoqata Shkencore',
    description: 'Scientific association organizing olympiads and academic activities.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  alternates: {
    canonical: 'https://proventus.al',
  },
}

// Viewport ndahet nga metadata (kërkohet nga Next.js 14+)
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fafafa' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a1a' },
  ],
  width: 'device-width',
  initialScale: 1,
}

// ─── Layout ───────────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sq" suppressHydrationWarning className="bg-background">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LanguageProvider>
            {/* CustomCursor vetëm në desktop — CSS e fsheh në mobile */}
            <CustomCursor />
            <Navbar />
            <main id="main-content" className="min-h-screen">
              {children}
            </main>
            <Footer />
            <BackToTop />
          </LanguageProvider>
        </ThemeProvider>

        {/* Analytics ngarkohet vetëm në prodhim */}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
