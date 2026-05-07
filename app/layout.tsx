import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const font = Plus_Jakarta_Sans({ subsets: ['latin'] })

const SITE_URL = 'https://bantukos.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Bantu Kos — Jasa Inspeksi Kos di Bali Sebelum DP | bantukos.com',
    template: '%s | Bantu Kos',
  },
  description:
    'Cari kos di Bali? Jangan DP sebelum kami cek kondisi aslinya. Jasa inspeksi kos independen #1 di Bali — video real, laporan jujur dalam 24 jam. Mulai Rp 150.000.',
  keywords: [
    'kos di bali', 'kos bali', 'sewa kos bali', 'cari kos bali', 'kos murah bali',
    'kos denpasar', 'kos kuta', 'kos seminyak', 'kos canggu', 'kos sesetan',
    'kos jimbaran', 'kos ubud', 'kos sanur', 'kost bali', 'kontrakan bali',
    'jasa inspeksi kos', 'cek kos bali', 'survey kos bali', 'inspeksi kos bali',
    'kos available bali', 'kos tersedia bali', 'kamar kos bali',
    'bantukos', 'bantu kos',
  ],
  authors: [{ name: 'Bantu Kos', url: SITE_URL }],
  creator: 'Bantu Kos',
  publisher: 'Bantu Kos',
  category: 'Real Estate',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: SITE_URL,
    siteName: 'Bantu Kos',
    title: 'Bantu Kos — Jasa Inspeksi Kos di Bali Sebelum DP',
    description:
      'Cari kos di Bali? Jangan DP sebelum kami cek kondisi aslinya. Laporan video jujur dalam 24 jam. Mulai Rp 150.000.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Bantu Kos — Jasa Inspeksi Kos di Bali',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bantu Kos — Jasa Inspeksi Kos di Bali',
    description: 'Cari kos di Bali? Jangan DP sebelum kami cek kondisi aslinya.',
    images: ['/og-image.jpg'],
    creator: '@bantukos',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: '',  // isi dengan Google Search Console verification code
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#business`,
      name: 'Bantu Kos',
      description: 'Jasa inspeksi kos independen di Bali. Kami datang langsung ke lokasi, rekam video real, dan kirim laporan jujur sebelum kamu DP.',
      url: SITE_URL,
      telephone: '+6289506585454',
      priceRange: 'Rp 150.000 - Rp 450.000',
      image: `${SITE_URL}/og-image.jpg`,
      logo: `${SITE_URL}/icon.svg`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Denpasar',
        addressRegion: 'Bali',
        addressCountry: 'ID',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -8.6705,
        longitude: 115.2126,
      },
      areaServed: [
        { '@type': 'City', name: 'Denpasar' },
        { '@type': 'City', name: 'Kuta' },
        { '@type': 'City', name: 'Seminyak' },
        { '@type': 'City', name: 'Canggu' },
        { '@type': 'City', name: 'Jimbaran' },
        { '@type': 'City', name: 'Ubud' },
        { '@type': 'City', name: 'Sanur' },
      ],
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
        opens: '08:00',
        closes: '21:00',
      },
      sameAs: [
        'https://instagram.com/bantukos',
        'https://tiktok.com/@bantukos',
        'https://wa.me/6289506585454',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Layanan Bantu Kos',
        itemListElement: [
          {
            '@type': 'Offer',
            name: 'Kos Inspection Report',
            description: 'Inspeksi kos langsung ke lokasi, video real, laporan PDF dalam 24 jam.',
            price: '150000',
            priceCurrency: 'IDR',
          },
          {
            '@type': 'Offer',
            name: 'Soft-Landing Starter Kit',
            description: 'Persiapan kamar kos sebelum kamu landing di Bali.',
            price: '200000',
            priceCurrency: 'IDR',
          },
          {
            '@type': 'Offer',
            name: 'Full Settle-In Package',
            description: 'Inspeksi 2 kos + starter kit + jemput bandara.',
            price: '450000',
            priceCurrency: 'IDR',
          },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Bantu Kos',
      description: 'Jasa inspeksi kos independen di Bali',
      inLanguage: 'id-ID',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/listings?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Apakah Bantu Kos membantu mencarikan kos di Bali?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Tidak. Kami bukan agen kos. Kamu yang mencari kos di Bali sendiri (lewat Mamikos, Facebook, dll), lalu kami datang ke lokasi dan memverifikasi kondisi aslinya secara jujur.',
          },
        },
        {
          '@type': 'Question',
          name: 'Berapa biaya jasa inspeksi kos di Bali?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Biaya inspeksi kos di Bali mulai dari Rp 150.000 per lokasi. Sudah termasuk video walk-through, speed test WiFi, cek air, dan laporan PDF.',
          },
        },
        {
          '@type': 'Question',
          name: 'Area mana saja yang bisa dicek di Bali?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Kami melayani inspeksi kos di Denpasar, Kuta, Seminyak, Canggu, Jimbaran, Sanur, dan Nusa Dua. Untuk Ubud dan area luar, silakan tanya via WhatsApp dulu.',
          },
        },
        {
          '@type': 'Question',
          name: 'Berapa lama laporan inspeksi kos di Bali dikirim?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Laporan video dan PDF dikirim maksimal 24 jam setelah pembayaran. Untuk area Denpasar Selatan, Kuta, dan Seminyak biasanya lebih cepat (3-6 jam).',
          },
        },
        {
          '@type': 'Question',
          name: 'Bagaimana cara pesan inspeksi kos di Bali?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Isi form di bantukos.com, tim kami akan konfirmasi via WhatsApp dalam 15 menit dan kirim link pembayaran. Tidak perlu daftar akun.',
          },
        },
      ],
    },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="canonical" href={SITE_URL} />
      </head>
      <body className={font.className}>{children}</body>
    </html>
  )
}
