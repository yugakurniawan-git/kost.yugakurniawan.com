"use client"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const WA_NUMBER = "6285190810100"

export default function Home() {
  const [faqOpen, setFaqOpen] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    nama: '', wa: '', kota: '', layanan: '', linkKos: '', tanggal: ''
  })

  const toggleFaq = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index)
  }

  const kirimWA = () => {
    if (!formData.nama || !formData.wa) {
      alert('Mohon isi minimal nama dan nomor WhatsApp kamu ya 🙏')
      return
    }

    const pesan = `Halo Bantu Kos! 👋\n\n*Nama:* ${formData.nama || '-'}\n*No. WA:* ${formData.wa || '-'}\n*Kota Asal:* ${formData.kota || '-'}\n*Layanan:* ${formData.layanan || '-'}\n*Rencana Pindah:* ${formData.tanggal || '-'}\n\n*Link Kos yang Mau Dicek:*\n${formData.linkKos || '(belum diisi, mau tanya dulu)'}\n\nSaya ingin tahu lebih lanjut tentang layanan Bantu Kos 🙏`

    const encoded = encodeURIComponent(pesan)
    window.open(`https://wa.me/${WA_NUMBER}?text=${encoded}`, '_blank')
  }

  return (
    <main className="min-h-screen relative overflow-hidden text-slate-200">
      
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 py-4 bg-[#080c14]/70 backdrop-blur-xl border-b border-white/10">
        <div className="text-xl font-extrabold tracking-tight text-gradient">
          Bantu <span className="text-slate-200">Kos</span>
        </div>
        <ul className="hidden sm:flex gap-8 list-none m-0">
          <li><Link href="#layanan" className="text-slate-400 hover:text-sky-400 text-sm transition-colors">Layanan</Link></li>
          <li><Link href="#contoh-laporan" className="text-slate-400 hover:text-sky-400 text-sm transition-colors">Contoh Laporan</Link></li>
          <li><Link href="#cara-kerja" className="text-slate-400 hover:text-sky-400 text-sm transition-colors">Cara Kerja</Link></li>
          <li><Link href="/listings" className="text-slate-400 hover:text-sky-400 text-sm transition-colors">Kos Tersedia</Link></li>
          <li><Link href="#faq" className="text-slate-400 hover:text-sky-400 text-sm transition-colors">FAQ</Link></li>
        </ul>
        <Link href="#pesan">
          <Button className="bg-gradient-to-r from-sky-400 to-indigo-400 font-bold text-[#0a0f1a] rounded-lg">
            Pesan Sekarang
          </Button>
        </Link>
      </nav>

      {/* HERO */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-8 pt-32 pb-16">
        <div className="animate-fade-up inline-flex items-center gap-2 bg-sky-400/10 border border-sky-400/25 rounded-full px-4 py-1.5 text-xs font-semibold text-sky-400 mb-6">
          <span className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-pulse-custom"></span>Jasa Inspeksi Kos Independen #1 di Bali — 30+ Kos Sudah Diverifikasi
        </div>
        <h1 className="animate-fade-up animate-delay-100 text-[clamp(2.4rem,6vw,4rem)] font-extrabold leading-tight tracking-tight max-w-4xl">
          Cari <span className="text-gradient">Kos di Bali?</span> Jangan DP Sebelum Kami Cek Dulu
        </h1>
        <p className="animate-fade-up animate-delay-200 mt-5 text-lg text-slate-400 max-w-2xl">
          Foto kos di internet bisa menipu. Kami datang langsung ke lokasi, rekam video real, tes WiFi, cek air, dan kirim laporan jujur ke kamu dalam 24 jam.
        </p>
        <div className="animate-fade-up flex flex-wrap gap-4 mt-10 justify-center">
          <Link href="#pesan">
            <Button size="lg" className="bg-gradient-to-r from-sky-400 to-indigo-400 font-bold text-[#0a0f1a] hover:-translate-y-0.5 transition-transform shadow-[0_0_30px_rgba(56,189,248,0.25)] hover:shadow-[0_0_40px_rgba(56,189,248,0.4)] rounded-xl px-8">
              🔍 Pesan Inspeksi Sekarang
            </Button>
          </Link>
          <Link href="#cara-kerja">
            <Button size="lg" variant="outline" className="bg-white/5 border-white/10 hover:bg-white/10 hover:border-sky-400/40 rounded-xl px-8 font-semibold text-white">
              Lihat Cara Kerjanya
            </Button>
          </Link>
        </div>
        
        <div className="animate-fade-up flex flex-wrap justify-center gap-6 mt-12 text-sm text-slate-400">
          <div className="flex items-center gap-2"><span>✅</span> Bukan agen, bukan calo</div>
          <div className="flex items-center gap-2"><span>📹</span> Video real tanpa edit</div>
          <div className="flex items-center gap-2"><span>⚡</span> Laporan dalam 24 jam</div>
          <div className="flex items-center gap-2"><span>🔒</span> Tanpa perantara</div>
        </div>
      </section>

      {/* PROBLEM */}
      <section id="masalah" className="relative z-10 py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-xs font-bold tracking-[1.5px] uppercase text-sky-400 mb-3">Kenapa Ini Penting?</div>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-extrabold tracking-tight mb-4">Cari kos di Kota Tujuanmu dari jauh itu penuh risiko</h2>
          <p className="text-slate-400 max-w-2xl mb-12">Masalah yang sering dialami orang yang mau pindah tanpa survei dulu.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { e: '📸', t: 'Foto Palsu / Menyesatkan', d: 'Foto di Mamikos/Facebook diambil saat kos masih baru. Kenyataannya dinding sudah lembab dan kebocoran di mana-mana.' },
              { e: '📶', t: 'WiFi "Sampai 100 Mbps" Ternyata Lemot', d: 'Pemilik kos bilang WiFi cepat. Nyatanya 10 kamar pakai 1 router, kamu yang kerja remote bakal menderita.' },
              { e: '🤝', t: 'Harga Sudah Naik Tapi Tidak Diupdate', d: 'Listing menampilkan harga lama. Begitu kamu datang, harga sudah naik 30% dan kamu tidak punya pilihan lain.' },
              { e: '📍', t: 'Lokasi Tidak Sesuai Ekspektasi', d: '"Dekat pantai" ternyata 30 menit jalan kaki. Lingkungan sekitar bising atau banjir saat musim hujan.' },
              { e: '💧', t: 'Air Mati / Kecil / Bau', d: 'Kualitas air di Kota Tujuanmu sangat bervariasi. Ada yang air sumur, ada PAM. Detail ini tidak pernah ditulis di listing kos.' },
              { e: '😤', t: 'Terlanjur Bayar, Baru Menyesal', d: 'Karena pemilik kos minta DP dulu lewat transfer, banyak yang terpaksa bayar penuh sebelum melihat kondisi aslinya. Ternyata penipuan, alamat tidak ada, atau kondisi jauh dari foto.' },
            ].map((p, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 transition-all hover:border-red-400/30 hover:bg-red-400/5 hover:-translate-y-1">
                <div className="text-3xl mb-3">{p.e}</div>
                <h3 className="text-base font-bold mb-2">{p.t}</h3>
                <p className="text-sm text-slate-400">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="layanan" className="relative z-10 py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-xs font-bold tracking-[1.5px] uppercase text-sky-400 mb-3">Layanan Kami</div>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-extrabold tracking-tight mb-4">Solusi lengkap untuk perantau</h2>
          <p className="text-slate-400 max-w-2xl mb-12">Dari inspeksi kos hingga kamar yang siap huni ketika kamu mendarat.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Service 1 */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:-translate-y-1 transition-all hover:border-sky-400/40 hover:shadow-[0_20px_60px_rgba(56,189,248,0.08)]">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-400 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="inline-block bg-sky-400/20 border border-sky-400/20 text-sky-400 rounded-lg text-xs font-bold px-3 py-1 mb-4">Layanan Utama</div>
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2">Kos Inspection Report</h3>
              <p className="text-sm text-slate-400 mb-5">Kami datang ke kos pilihanmu, rekam video real, dan kirim laporan lengkap dalam 24 jam.</p>
              <ul className="flex flex-col gap-2 mb-8">
                {['Speed test WiFi + screenshot hasil', 'Cek sinyal (Telkomsel/XL/Smartfren)', 'Kualitas & tekanan air, cek kebocoran', 'Foto & video kondisi kamar real (tanpa filter)', 'Kondisi keamanan & lingkungan sekitar', 'Laporan PDF siap print'].map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-400"><span className="text-emerald-400 font-bold">✓</span> {f}</li>
                ))}
              </ul>
              <div className="border-t border-white/10 pt-5 flex items-center justify-between mt-auto">
                <div>
                  <div className="text-xl font-extrabold text-sky-400">Rp 150.000</div>
                  <div className="text-xs text-slate-400">per 1 lokasi kos</div>
                </div>
                <Link href="#pesan">
                  <Button className="bg-gradient-to-r from-sky-400 to-indigo-400 text-[#0a0f1a] font-bold">Pesan →</Button>
                </Link>
              </div>
            </div>

            {/* Service 2 */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:-translate-y-1 transition-all hover:border-amber-400/50 hover:shadow-[0_20px_60px_rgba(251,191,36,0.08)]">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="inline-block bg-amber-400/10 border border-amber-400/20 text-amber-400 rounded-lg text-xs font-bold px-3 py-1 mb-4">⭐ Terlaris</div>
              <div className="text-4xl mb-4">🎒</div>
              <h3 className="text-xl font-bold mb-2">Soft-Landing Starter Kit</h3>
              <p className="text-sm text-slate-400 mb-5">Kamarmu sudah siap sebelum kamu landing. Kami belikan dan antar semua kebutuhan awal ke kos.</p>
              <ul className="flex flex-col gap-2 mb-8">
                {['Galon air minum + pompa / dispenser', 'Token listrik awal', 'Perlengkapan kebersihan dasar', 'Sabun cuci, cairan pel, pengharum ruangan', 'Opsional: Antar jemput dari Bandara'].map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-400"><span className="text-emerald-400 font-bold">✓</span> {f}</li>
                ))}
              </ul>
              <div className="border-t border-white/10 pt-5 flex items-center justify-between mt-auto">
                <div>
                  <div className="text-xl font-extrabold text-sky-400">Rp 200.000</div>
                  <div className="text-xs text-slate-400">jasa saja, belum harga barang</div>
                </div>
                <Link href="#pesan">
                  <Button className="bg-gradient-to-r from-sky-400 to-indigo-400 text-[#0a0f1a] font-bold">Pesan →</Button>
                </Link>
              </div>
            </div>

            {/* Service 3 */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:-translate-y-1 transition-all hover:border-indigo-400/40 hover:shadow-[0_20px_60px_rgba(129,140,248,0.08)]">
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="inline-block bg-indigo-400/10 border border-indigo-400/20 text-indigo-400 rounded-lg text-xs font-bold px-3 py-1 mb-4">Paket Kombo</div>
              <div className="text-4xl mb-4">🏠</div>
              <h3 className="text-xl font-bold mb-2">Full Settle-In Package</h3>
              <p className="text-sm text-slate-400 mb-5">Inspeksi kos + persiapan kamar + jemput bandara. Tinggal landing, langsung nyaman.</p>
              <ul className="flex flex-col gap-2 mb-8">
                {['Inspeksi hingga 2 lokasi kos', 'Full Starter Kit (galon, listrik, kebersihan)', 'Jemput dari Bandara Ngurah Rai', 'Laporan PDF + Video rekaman', 'Konsultasi WA 3 hari pasca huni'].map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-400"><span className="text-emerald-400 font-bold">✓</span> {f}</li>
                ))}
              </ul>
              <div className="border-t border-white/10 pt-5 flex items-center justify-between mt-auto">
                <div>
                  <div className="text-xl font-extrabold text-sky-400">Rp 450.000</div>
                  <div className="text-xs text-slate-400">paket terlengkap, belum barang</div>
                </div>
                <Link href="#pesan">
                  <Button className="bg-gradient-to-r from-sky-400 to-indigo-400 text-[#0a0f1a] font-bold">Pesan →</Button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CONTOH LAPORAN */}
      <section id="contoh-laporan" className="relative z-10 py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-xs font-bold tracking-[1.5px] uppercase text-sky-400 mb-3">Transparansi Kami</div>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-extrabold tracking-tight mb-4">Ini yang kamu dapat dari kami</h2>
          <p className="text-slate-400 max-w-2xl mb-12">
            Setelah inspeksi selesai, kamu dapat <strong className="text-slate-200">link laporan online</strong> via WhatsApp.
            Bisa dibuka di HP, dibagi ke pasangan/keluarga, dan tetap aktif 30 hari. Berikut tampilan aslinya:
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* Kiri - Preview Laporan */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 hover:border-sky-400/30 transition-all">
              {/* Header laporan: verdict + skor */}
              <div className="flex items-start justify-between gap-4 pb-5 mb-5 border-b border-white/10">
                <div>
                  <div className="text-[10px] text-sky-400 font-bold uppercase tracking-wider mb-1">Laporan Inspeksi Kos</div>
                  <div className="font-bold text-base">Kos Melati, Sesetan</div>
                  <div className="text-xs text-slate-400 mt-0.5">Jl. Suradipa No. 12 · Inspeksi 23 Mei 2026</div>
                </div>
                <div className="flex-shrink-0 px-3 py-2 rounded-xl text-center bg-emerald-400/10 border border-emerald-400/30">
                  <div className="text-2xl font-black text-emerald-400">4.3</div>
                  <div className="text-[10px] text-emerald-400 font-medium">Direkomendasikan ✅</div>
                </div>
              </div>

              {/* Skor per kategori dengan bar */}
              <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-3">📊 Skor per Kategori</div>
              <div className="flex flex-col gap-2.5 mb-5">
                {[
                  { cat: '🛏️ Kamar',         score: 4.2, color: '#16a34a' },
                  { cat: '🚿 Kamar Mandi',   score: 3.8, color: '#16a34a' },
                  { cat: '⚡ Fasilitas',     score: 4.5, color: '#16a34a' },
                  { cat: '🔒 Keamanan',      score: 4.0, color: '#16a34a' },
                  { cat: '📍 Sekitar Lokasi', score: 4.6, color: '#16a34a' },
                ].map((c, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-300">{c.cat}</span>
                      <span className="font-semibold text-emerald-400">{c.score.toFixed(1)} ✅</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${(c.score / 5) * 100}%`, backgroundColor: c.color }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Detail item — mixed scoring */}
              <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-3">📋 Contoh Detail Item</div>
              <div className="flex flex-col gap-2 mb-5">
                {[
                  { label: 'AC',                    badge: '✓ Ya',  type: 'binary-yes' },
                  { label: 'CCTV di area kos',      badge: '✓ Ya',  type: 'binary-yes' },
                  { label: 'Rawan banjir?',         badge: '✓ Tidak', type: 'binary-yes' },
                  { label: 'Kecepatan WiFi',        badge: '4',     type: 'scale-good' },
                  { label: 'Kunci pintu kamar',     badge: '5',     type: 'scale-good' },
                  { label: 'Tingkat kebisingan',    badge: '2',     type: 'scale-bad' },
                  { label: 'Ukuran kamar',          badge: '📝 info', type: 'info', notes: '3×4 m' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between gap-3 bg-white/5 rounded-lg px-3 py-2">
                    <div className="min-w-0">
                      <span className="text-xs text-slate-300">{item.label}</span>
                      {'notes' in item && item.notes && (
                        <span className="text-[10px] text-slate-500 ml-2">"{item.notes}"</span>
                      )}
                    </div>
                    <span
                      className={`flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.type === 'binary-yes' ? 'bg-emerald-500/20 text-emerald-300' :
                        item.type === 'binary-no'  ? 'bg-red-500/20 text-red-300' :
                        item.type === 'scale-good' ? 'bg-emerald-500/20 text-emerald-300' :
                        item.type === 'scale-bad'  ? 'bg-red-500/20 text-red-300' :
                                                     'bg-blue-500/20 text-blue-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>
                ))}
              </div>

              <div className="text-[10px] text-slate-500 italic text-center pt-2 border-t border-white/10">
                + 40 item lain dicek di laporan lengkap
              </div>
            </div>

            {/* Kanan - Penjelasan fitur laporan */}
            <div className="flex flex-col gap-5">
              {[
                {
                  icon: '🎯',
                  title: 'Verdict & Skor Otomatis',
                  desc: 'Tiap kos dapat skor 0-5 dan verdict tegas: Direkomendasikan ✅, Bisa Nego Dulu ⚠️, atau Lewati ❌. Tidak ambigu, langsung tahu posisinya.',
                },
                {
                  icon: '🧠',
                  title: 'Penilaian "Kayak Manusia"',
                  desc: 'Tidak semua item dipaksa skor 1-5. AC dijawab Ya/Tidak. Restoran terdekat dinilai 1-5 (banyak/sedikit). Ukuran kamar diisi info real ("3×4 m"). Logis dan jujur.',
                },
                {
                  icon: '🚩',
                  title: 'Red Flags & Hidden Gems',
                  desc: 'Section khusus untuk hal-hal yang patut diperhatikan (mis. "air kadang mati siang") dan kelebihan tak terduga ("warung 24 jam tetangga"). Tidak hanya angka.',
                },
                {
                  icon: '💬',
                  title: 'Notif WA Otomatis',
                  desc: 'Saat tim mulai inspeksi, kamu langsung dapat WA. Saat laporan selesai, kamu dapat WA lagi dengan link laporan online — tidak perlu install aplikasi.',
                },
                {
                  icon: '🌐',
                  title: 'Bisa Dibuka di Mana Saja',
                  desc: 'Link laporan format bantukos.com/laporan/xxx — bisa kamu share ke pasangan, ortu, atau teman untuk minta second opinion. Valid 30 hari.',
                },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-sky-400/30 transition-all hover:-translate-y-0.5">
                  <div className="text-2xl shrink-0 mt-0.5">{item.icon}</div>
                  <div>
                    <div className="font-bold mb-1">{item.title}</div>
                    <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="cara-kerja" className="relative z-10 py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-xs font-bold tracking-[1.5px] uppercase text-sky-400 mb-3">Prosesnya Mudah</div>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-extrabold tracking-tight mb-4">Cara kerja Bantu Kos</h2>
          <p className="text-slate-400 max-w-2xl mb-12">Dari order hingga laporan, semuanya bisa dilakukan dari kotamu sekarang.</p>

          <div className="relative max-w-2xl flex flex-col gap-0">
            <div className="absolute left-[23px] top-[24px] bottom-[24px] w-[1px] bg-gradient-to-b from-sky-400 to-indigo-400/0"></div>
            
            {[
              { t: 'Isi Form Pemesanan', d: 'Pilih layanan, kirim link kos yang kamu temukan (Mamikos/Facebook/dll), isi data dirimu. Tidak perlu daftar akun.' },
              { t: 'Chat Konfirmasi via WhatsApp', d: 'Tim kami konfirmasi detail dan kirim link pembayaran (QRIS / transfer) dalam 15 menit.' },
              { t: 'Notif WA: Inspeksi Mulai 📋', d: 'Begitu pembayaran masuk, kamu otomatis dapat WA bahwa inspeksi sedang berjalan. Estimasi laporan siap dalam 24 jam.' },
              { t: 'Notif WA: Laporan Siap ✅', d: 'Tim datang ke lokasi, cek 50+ item, foto/video, dan susun laporan. Kamu dapat WA dengan link laporan online begitu publish.' },
              { t: 'Buka Laporan di HP', d: 'Klik link → langsung lihat verdict (Direkomendasikan / Nego / Lewati), skor per kategori, foto inspeksi, dan red flags. Share ke ortu/pasangan kalau perlu second opinion.' }
            ].map((s, i) => (
              <div key={i} className="flex gap-6 items-start py-6">
                <div className="w-12 h-12 rounded-xl shrink-0 bg-gradient-to-br from-sky-400 to-indigo-400 text-[#0a0f1a] font-extrabold text-lg flex items-center justify-center relative z-10">{i + 1}</div>
                <div>
                  <h3 className="text-lg font-bold mb-1">{s.t}</h3>
                  <p className="text-sm text-slate-400">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative z-10 py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-xs font-bold tracking-[1.5px] uppercase text-sky-400 mb-3">Kata Mereka</div>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-extrabold tracking-tight mb-12">Sudah bantu perantau dari berbagai kota</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { s: '★★★★★', t: '"Seriusan ini sangat membantu. Aku hampir DP kos yang fotonya bagus banget, untung pakai Bantu Kos dulu. Ternyata kamarnya gelap, WiFi-nya 3 Mbps doang."', name: 'Ayu R.', f: 'Jakarta → Bali', a: 'A' },
              { s: '★★★★★', t: '"Starter kit-nya worth banget. Pas aku landing malem-malem, kamar udah ada galon, ada listrik, ada sabun. Langsung bisa tidur tanpa beli-beli dulu."', name: 'Rian M.', f: 'Surabaya → Bali', a: 'R' },
              { s: '★★★★★', t: '"Sebagai seorang developer yang kerja remote dari Bali, cek kecepatan WiFi itu krusial banget. Laporan dari Bantu Kos detail dan jujur banget, termasuk screenshot speed test-nya."', name: 'Dito S.', f: 'Bandung → Bali', a: 'D' }
            ].map((t, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:-translate-y-1 transition-all hover:border-sky-400/30">
                <div className="text-amber-400 text-sm tracking-[2px] mb-3">{t.s}</div>
                <p className="text-sm text-slate-400 italic mb-4 leading-relaxed">{t.t}</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-indigo-400 flex items-center justify-center font-bold text-[#0a0f1a] text-sm">{t.a}</div>
                  <div>
                    <div className="text-sm font-bold">{t.name}</div>
                    <div className="text-xs text-slate-400">{t.f}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative z-10 py-20 px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs font-bold tracking-[1.5px] uppercase text-sky-400 mb-3 text-center">Pertanyaan Umum</div>
          <h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-extrabold tracking-tight mb-10 text-center">FAQ</h2>
          
          <div className="flex flex-col gap-4">
            {[
              { q: 'Apakah kalian membantu mencarikan kos?', a: 'Tidak. Kami bukan agen kos dan bukan calo. Kamu yang mencari opsi kos sendiri (lewat Mamikos, Facebook Group, atau rekomendasi teman). Tugas kami adalah datang ke lokasi dan memverifikasi kondisi aslinya secara jujur.' },
              { q: 'Berapa lama laporan dikirim setelah pesan?', a: 'Kami menargetkan pengiriman laporan maksimal 1x24 jam setelah pembayaran diterima. Untuk area Denpasar Selatan, Kuta, Seminyak, dan Canggu, biasanya bisa lebih cepat (3-6 jam).' },
              { q: 'Area mana saja yang sudah bisa dicek?', a: 'Saat ini kami beroperasi di area Denpasar, Kuta, Legian, Seminyak, Canggu, Jimbaran, dan Nusa Dua. Untuk area di luar itu (Ubud, Sanur, dll), silakan tanyakan terlebih dahulu via WhatsApp.' },
              { q: 'Bagaimana cara pembayarannya?', a: 'Pembayaran dilakukan via QRIS, GoPay, atau transfer bank setelah kamu mendapatkan konfirmasi dari tim kami via WhatsApp. Tidak ada biaya tersembunyi.' },
              { q: 'Bagaimana jika lokasi kos ternyata sudah terisi?', a: 'Jika kos sudah penuh saat kami tiba, kami akan segera konfirmasi ke kamu. Kamu bisa memilih untuk mengganti ke lokasi kos lain, atau kami kembalikan biaya secara penuh (100%). Ini bukan salahmu, jadi tidak ada potongan apapun.' }
            ].map((f, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-sky-400/40 transition-colors">
                <button 
                  onClick={() => toggleFaq(i)}
                  className="w-full text-left px-6 py-4 font-semibold text-[15px] flex justify-between items-center outline-none"
                >
                  {f.q}
                  <span className={`text-sky-400 transition-transform ${faqOpen === i ? 'rotate-180' : ''}`}>▼</span>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ${faqOpen === i ? 'max-h-60' : 'max-h-0'}`}
                >
                  <p className="px-6 pb-5 text-sm text-slate-400 leading-relaxed">{f.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / ORDER FORM */}
      <div id="pesan" className="relative z-10 px-4 sm:px-8 pb-32">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-white/[0.06] to-white/[0.02] border border-sky-400/10 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-72 h-72 bg-sky-400/10 blur-[80px] rounded-full pointer-events-none"></div>
          
          <h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-extrabold tracking-tight mb-4 relative z-10">
            Siap Pindah dengan <span className="text-gradient">Tenang?</span>
          </h2>
          <p className="text-slate-400 max-w-lg mx-auto mb-10 relative z-10">Isi form di bawah ini dan tim kami akan menghubungi kamu via WhatsApp dalam 15 menit. Gratis konsultasi!</p>

          <div className="max-w-xl mx-auto bg-[#080c14]/80 border border-white/10 rounded-2xl p-6 md:p-8 text-left relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-2">Nama Kamu</label>
                <input type="text" placeholder="contoh: Budi Santoso" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 transition-colors" 
                  value={formData.nama} onChange={e => setFormData({...formData, nama: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-400 mb-2">No. WhatsApp</label>
                <input type="tel" placeholder="0812xxxxxxxx" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 transition-colors" 
                  value={formData.wa} onChange={e => setFormData({...formData, wa: e.target.value})} />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-semibold text-slate-400 mb-2">Kota Asal Kamu</label>
              <input type="text" placeholder="contoh: Jakarta, Bandung, Surabaya..." className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 transition-colors" 
                value={formData.kota} onChange={e => setFormData({...formData, kota: e.target.value})} />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-slate-400 mb-2">Layanan yang Kamu Inginkan</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 transition-colors [&>option]:bg-slate-900"
                value={formData.layanan} onChange={e => setFormData({...formData, layanan: e.target.value})}>
                <option value="">Pilih layanan...</option>
                <option value="inspeksi">🔍 Kos Inspection Report — Rp 150.000/kos</option>
                <option value="starter">🎒 Soft-Landing Starter Kit — Rp 200.000 (jasa)</option>
                <option value="kombo">🏠 Full Settle-In Package — Rp 450.000</option>
                <option value="tanya">💬 Konsultasi Gratis Dulu</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-slate-400 mb-2">Link Kos yang Mau Dicek</label>
              <textarea placeholder="Tempel link kos dari Mamikos / OLX / Facebook / lainnya di sini." rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 transition-colors resize-y"
                value={formData.linkKos} onChange={e => setFormData({...formData, linkKos: e.target.value})}></textarea>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-400 mb-2">Rencana Pindah</label>
              <input type="month" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-400 transition-colors"
                value={formData.tanggal} onChange={e => setFormData({...formData, tanggal: e.target.value})} />
            </div>

            <button onClick={kirimWA} className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-xl py-4 flex items-center justify-center gap-2 hover:-translate-y-0.5 transition-transform shadow-[0_0_30px_rgba(16,185,129,0.2)] hover:shadow-[0_0_40px_rgba(16,185,129,0.35)]">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              Chat via WhatsApp Sekarang
            </button>
            <p className="text-center text-xs text-slate-400 mt-4">📱 Data kamu aman. Kami hanya menghubungi kamu terkait pesanan.</p>

          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/10 py-8 flex flex-col items-center justify-center text-center text-sm text-slate-400">
        <div className="flex gap-6 mb-4 text-slate-300 font-medium">
          <a href="https://instagram.com/bantukos" target="_blank" className="hover:text-sky-400 transition-colors flex items-center gap-2">📷 @bantukos</a>
          <a href="https://tiktok.com/@bantukos" target="_blank" className="hover:text-sky-400 transition-colors flex items-center gap-2">🎵 @bantukos</a>
        </div>
        <p>© 2026 <strong className="text-slate-200">Bantu Kos</strong> — Jasa Inspeksi Kos Independen di Kota Tujuanmu</p>
        <p className="mt-2">Bukan agen, bukan calo. Jujur, transparan, dan berpihak pada perantau. 🌴</p>
      </footer>
      
      {/* FLOATING WA BUTTON */}
      <a href={`https://wa.me/${WA_NUMBER}?text=Halo%20Bantu%20Kos%2C%20saya%20mau%20tanya%20tentang%20layanan%20inspeksi%20kos`} 
         className="fixed bottom-8 right-8 z-50 bg-emerald-500 text-white w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-[0_4px_20px_rgba(16,185,129,0.4)] hover:scale-110 hover:shadow-[0_6px_30px_rgba(16,185,129,0.6)] transition-all animate-fade-up"
         target="_blank" title="Chat WhatsApp">
         💬
      </a>

    </main>
  )
}
