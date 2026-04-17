import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const font = Plus_Jakarta_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CekKosBali — Jasa Inspeksi Kos Independen di Bali',
  description: 'Mau pindah ke Bali? Jangan langsung transfer DP kos sebelum kami cek kondisi aslinya. Jasa inspeksi kos independen, jujur, dan terpercaya di Bali.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={font.className}>{children}</body>
    </html>
  )
}
