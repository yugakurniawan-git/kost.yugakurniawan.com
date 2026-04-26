import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service — Bantu Kos',
  description: 'Syarat dan ketentuan penggunaan layanan Bantu Kos — jasa inspeksi kos independen di Bali.',
}

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-[#080c14] text-slate-200">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-4 bg-[#080c14]/70 backdrop-blur-xl border-b border-white/10">
        <Link href="/" className="text-xl font-extrabold tracking-tight">
          <span className="text-gradient">Bantu</span>{' '}
          <span className="text-slate-200">Kos</span>
        </Link>
        <Link href="/" className="text-sm text-slate-400 hover:text-sky-400 transition-colors">
          ← Kembali ke Beranda
        </Link>
      </nav>

      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-2">
          Terms of Service
        </h1>
        <p className="text-slate-400 text-sm mb-10">
          Terakhir diperbarui: 26 April 2026
        </p>

        <div className="space-y-10 text-slate-300 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-slate-100 mb-3">1. Tentang Layanan</h2>
            <p>
              Bantu Kos adalah jasa inspeksi kos independen yang membantu calon penyewa memeriksa kondisi kos sebelum membayar DP. Layanan kami mencakup survei langsung ke lokasi kos, dokumentasi foto/video, dan laporan kondisi yang jujur. Dengan menggunakan layanan kami, kamu menyetujui syarat dan ketentuan berikut.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-100 mb-3">2. Ketentuan Penggunaan Layanan</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li>Layanan hanya tersedia untuk wilayah yang kami jangkau (saat ini Bali dan sekitarnya)</li>
              <li>Pemesanan dilakukan melalui WhatsApp atau formulir di website</li>
              <li>Informasi yang kamu berikan harus akurat dan lengkap</li>
              <li>Kami berhak menolak pemesanan yang tidak sesuai dengan kapasitas atau area layanan kami</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-100 mb-3">3. Biaya dan Pembayaran</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li>Biaya layanan dikomunikasikan sebelum konfirmasi pemesanan</li>
              <li>Pembayaran dilakukan sesuai kesepakatan yang dikonfirmasi via WhatsApp</li>
              <li>Bantu Kos bukan pihak yang menerima atau menjamin DP kos — kami hanya menyediakan informasi kondisi</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-100 mb-3">4. Batasan Tanggung Jawab</h2>
            <p className="mb-3">
              Bantu Kos menyediakan laporan inspeksi berdasarkan kondisi kos pada saat survei dilakukan. Kami <strong className="text-slate-100">tidak bertanggung jawab</strong> atas:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li>Perubahan kondisi kos setelah tanggal survei</li>
              <li>Keputusan akhir penyewaan yang dibuat oleh klien</li>
              <li>Sengketa antara klien dan pemilik kos</li>
              <li>Kerugian finansial akibat keputusan yang diambil berdasarkan laporan kami</li>
            </ul>
            <p className="mt-3">
              Laporan kami bersifat informatif dan tidak merupakan jaminan hukum atas kondisi properti.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-100 mb-3">5. Konten Media Sosial</h2>
            <p>
              Konten yang kami posting di Instagram, TikTok, dan platform lainnya (listing kos, foto, video, caption) adalah milik Bantu Kos. Dilarang menggunakan, menyalin, atau mendistribusikan konten kami tanpa izin tertulis.
            </p>
            <p className="mt-3">
              Jika kamu adalah pemilik kos yang merasa konten propertimu diposting tanpa izin, hubungi kami untuk penghapusan segera.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-100 mb-3">6. Pembatalan dan Refund</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li>Pembatalan dapat dilakukan sebelum tim kami berangkat ke lokasi</li>
              <li>Kebijakan refund dikomunikasikan secara individual sesuai kondisi</li>
              <li>Keterlambatan atau pembatalan mendadak dari pihak pemilik kos bukan tanggung jawab Bantu Kos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-100 mb-3">7. Hak Kekayaan Intelektual</h2>
            <p>
              Seluruh konten di website <strong className="text-slate-100">bantukos.com</strong> — termasuk teks, desain, logo, dan laporan — dilindungi hak cipta dan merupakan milik Bantu Kos. Penggunaan tanpa izin dapat dikenakan tindakan hukum.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-100 mb-3">8. Perubahan Syarat</h2>
            <p>
              Kami berhak mengubah syarat dan ketentuan ini kapan saja. Perubahan akan berlaku segera setelah dipublikasikan di halaman ini. Penggunaan layanan setelah perubahan berarti kamu menerima syarat yang diperbarui.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-100 mb-3">9. Hukum yang Berlaku</h2>
            <p>
              Syarat dan ketentuan ini tunduk pada hukum yang berlaku di Republik Indonesia. Setiap sengketa akan diselesaikan secara musyawarah mufakat terlebih dahulu.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-100 mb-3">10. Kontak</h2>
            <p>Ada pertanyaan tentang syarat dan ketentuan ini? Hubungi kami:</p>
            <ul className="list-none mt-3 space-y-1 text-slate-400">
              <li>WhatsApp: <span className="text-slate-200">+62 895-0658-5454</span></li>
              <li>Instagram: <span className="text-slate-200">@bantukos</span></li>
              <li>Website: <span className="text-slate-200">bantukos.com</span></li>
            </ul>
          </section>

        </div>
      </div>
    </main>
  )
}
