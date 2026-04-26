import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — Bantu Kos',
  description: 'Kebijakan privasi Bantu Kos menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi pengguna.',
}

export default function PrivacyPolicy() {
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
          Privacy Policy
        </h1>
        <p className="text-slate-400 text-sm mb-10">
          Terakhir diperbarui: 26 April 2026
        </p>

        <div className="space-y-10 text-slate-300 leading-relaxed">

          <section>
            <h2 className="text-lg font-bold text-slate-100 mb-3">1. Tentang Kebijakan Ini</h2>
            <p>
              Bantu Kos (&quot;kami&quot;, &quot;kita&quot;) adalah layanan inspeksi kos independen yang beroperasi di Bali, Indonesia. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi kamu saat menggunakan layanan kami — termasuk website <strong className="text-slate-100">bantukos.com</strong> dan akun media sosial resmi kami.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-100 mb-3">2. Data yang Kami Kumpulkan</h2>
            <p className="mb-3">Kami hanya mengumpulkan data yang diperlukan untuk memberikan layanan:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li><span className="text-slate-300">Nama dan nomor WhatsApp</span> — untuk komunikasi terkait pemesanan jasa inspeksi</li>
              <li><span className="text-slate-300">Kota dan tanggal rencana pindah</span> — untuk menjadwalkan kunjungan survei</li>
              <li><span className="text-slate-300">Link atau alamat kos yang ingin dicek</span> — sebagai objek survei</li>
              <li><span className="text-slate-300">Data interaksi di media sosial</span> — komentar atau pesan DM yang kamu kirimkan ke akun kami</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-100 mb-3">3. Cara Kami Menggunakan Data</h2>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li>Menghubungi kamu untuk konfirmasi dan koordinasi jadwal survei</li>
              <li>Mengirimkan laporan hasil inspeksi kos</li>
              <li>Meningkatkan kualitas layanan kami</li>
              <li>Memposting konten listing kos di media sosial (tanpa mencantumkan data pribadi klien)</li>
            </ul>
            <p className="mt-3">
              Kami <strong className="text-slate-100">tidak menjual, menyewakan, atau membagikan</strong> data pribadi kamu ke pihak ketiga untuk keperluan komersial.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-100 mb-3">4. Konten Media Sosial</h2>
            <p>
              Akun Instagram dan TikTok kami (<strong className="text-slate-100">@bantukos</strong>) memposting listing kos yang kami kumpulkan dari sumber publik seperti grup Facebook dan platform properti. Konten yang diposting bersifat informasi umum dan tidak mengandung data pribadi pemilik kos tanpa izin.
            </p>
            <p className="mt-3">
              Jika kamu merasa ada konten yang melanggar privasi kamu, silakan hubungi kami melalui WhatsApp atau DM Instagram untuk permintaan penghapusan.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-100 mb-3">5. Penyimpanan Data</h2>
            <p>
              Data pemesanan disimpan secara aman dan hanya dapat diakses oleh tim internal Bantu Kos. Kami tidak menggunakan layanan analitik pihak ketiga yang mengumpulkan data identifikasi pribadi.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-100 mb-3">6. Hak Kamu</h2>
            <p className="mb-3">Kamu berhak untuk:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-400">
              <li>Meminta akses ke data pribadi yang kami simpan</li>
              <li>Meminta koreksi atau penghapusan data</li>
              <li>Menolak penggunaan data untuk keperluan tertentu</li>
            </ul>
            <p className="mt-3">Hubungi kami via WhatsApp <strong className="text-slate-100">+62 895-0658-5454</strong> untuk menggunakan hak-hak tersebut.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-100 mb-3">7. Perubahan Kebijakan</h2>
            <p>
              Kami dapat memperbarui kebijakan ini sewaktu-waktu. Perubahan signifikan akan diinformasikan melalui website atau akun media sosial kami. Dengan terus menggunakan layanan kami setelah perubahan, kamu menyetujui kebijakan yang telah diperbarui.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-100 mb-3">8. Kontak</h2>
            <p>Ada pertanyaan tentang kebijakan privasi ini? Hubungi kami:</p>
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
