import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kos di Bali Tersedia Sekarang — Cek Sebelum DP',
  description:
    'Daftar kos di Bali yang tersedia: Denpasar, Kuta, Seminyak, Canggu, Jimbaran, Sesetan. Harga, fasilitas, dan tipe lengkap. Minta inspeksi kondisi aslinya sebelum bayar DP.',
  keywords: [
    'kos di bali tersedia', 'listing kos bali', 'kos available bali',
    'kos denpasar tersedia', 'kos kuta murah', 'kos seminyak', 'kos canggu',
    'sewa kamar bali', 'kos harian bali', 'kos bulanan bali',
  ],
  alternates: { canonical: '/listings' },
  openGraph: {
    title: 'Kos di Bali Tersedia — Bantu Kos',
    description: 'Cari kos di Bali? Lihat listing terbaru dan minta dicek kondisi aslinya sebelum DP.',
    url: 'https://bantukos.com/listings',
    type: 'website',
  },
}

export default function ListingsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
