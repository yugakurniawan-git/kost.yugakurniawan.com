export type ChecklistItemType = 'SCALE' | 'BINARY' | 'INFO'

export type ChecklistItem = {
  category: string
  label: string
  order: number
  hint?: string
  type: ChecklistItemType
  // Untuk BINARY: jawaban mana yang berarti "baik" (score 5).
  // Default 'yes'. Untuk pertanyaan terbalik (mis. "Rawan banjir?"),
  // pakai 'no' supaya "tidak" = score 5.
  binaryGood?: 'yes' | 'no'
}

// Konvensi penyimpanan score di DB:
//  - SCALE  : 1-5 langsung (rating kualitas)
//  - BINARY : 5 = jawaban "baik" (sesuai binaryGood), 1 = jawaban "buruk"
//  - INFO   : score selalu null, hanya `notes` yang dipakai
export const CHECKLIST_ITEMS: ChecklistItem[] = [
  // ─── KAMAR ────────────────────────────────────────────
  { category: 'KAMAR', label: 'Ukuran kamar (m²)', order: 1, type: 'INFO',
    hint: 'Tulis estimasi luas, mis. "3×4 m"' },
  { category: 'KAMAR', label: 'Tinggi plafon', order: 2, type: 'INFO',
    hint: 'Mis. "rendah ~2.4m" atau "tinggi ~3m"' },
  { category: 'KAMAR', label: 'Ventilasi / jendela', order: 3, type: 'SCALE',
    hint: 'Bisa dibuka? Angin masuk?' },
  { category: 'KAMAR', label: 'Pencahayaan alami', order: 4, type: 'SCALE' },
  { category: 'KAMAR', label: 'Kondisi tembok & lantai', order: 5, type: 'SCALE',
    hint: 'Lembap? Retak? Jamur?' },
  { category: 'KAMAR', label: 'Kebersihan kamar', order: 6, type: 'SCALE' },
  { category: 'KAMAR', label: 'Kasur & furnitur', order: 7, type: 'SCALE',
    hint: 'Kondisi kasur, meja, lemari' },
  { category: 'KAMAR', label: 'Lemari / rak baju', order: 8, type: 'BINARY' },
  { category: 'KAMAR', label: 'Meja & kursi kerja', order: 9, type: 'BINARY' },
  { category: 'KAMAR', label: 'Jumlah colokan listrik', order: 10, type: 'SCALE',
    hint: 'Sedikit→buruk, banyak→baik' },
  { category: 'KAMAR', label: 'Gorden / privasi', order: 11, type: 'BINARY' },
  { category: 'KAMAR', label: 'Cermin', order: 12, type: 'BINARY' },

  // ─── KAMAR MANDI ──────────────────────────────────────
  { category: 'KAMAR_MANDI', label: 'Lokasi kamar mandi', order: 1, type: 'INFO',
    hint: 'Mis. "dalam kamar" atau "luar, dipakai bersama"' },
  { category: 'KAMAR_MANDI', label: 'Kelancaran air', order: 2, type: 'SCALE',
    hint: 'Buka keran & flush, cek tekanan' },
  { category: 'KAMAR_MANDI', label: 'Kebersihan air (warna, bau)', order: 3, type: 'SCALE' },
  { category: 'KAMAR_MANDI', label: 'Saluran pembuangan', order: 4, type: 'SCALE',
    hint: 'Mampet? Bau?' },
  { category: 'KAMAR_MANDI', label: 'Kondisi WC', order: 5, type: 'SCALE' },
  { category: 'KAMAR_MANDI', label: 'Shower / bak mandi', order: 6, type: 'SCALE',
    hint: 'Gayung=skor rendah, shower lengkap=skor tinggi' },
  { category: 'KAMAR_MANDI', label: 'Water heater', order: 7, type: 'BINARY' },
  { category: 'KAMAR_MANDI', label: 'Exhaust fan / ventilasi', order: 8, type: 'BINARY' },
  { category: 'KAMAR_MANDI', label: 'Kebersihan keseluruhan', order: 9, type: 'SCALE' },

  // ─── DAPUR ────────────────────────────────────────────
  { category: 'DAPUR', label: 'Dapur bersama', order: 1, type: 'BINARY' },
  { category: 'DAPUR', label: 'Kondisi & kebersihan dapur', order: 2, type: 'SCALE' },
  { category: 'DAPUR', label: 'Kompor tersedia', order: 3, type: 'BINARY' },
  { category: 'DAPUR', label: 'Kulkas bersama', order: 4, type: 'BINARY' },

  // ─── FASILITAS ────────────────────────────────────────
  { category: 'FASILITAS', label: 'AC', order: 1, type: 'BINARY',
    hint: 'Khusus AC. Kalau cuma kipas tulis di catatan.' },
  { category: 'FASILITAS', label: 'Kecepatan WiFi', order: 2, type: 'SCALE',
    hint: 'Speed test di HP, tulis Mbps di catatan' },
  { category: 'FASILITAS', label: 'Listrik (token/termasuk)', order: 3, type: 'INFO',
    hint: 'Mis. "termasuk uang sewa" atau "token, beli sendiri"' },
  { category: 'FASILITAS', label: 'Parkir motor', order: 4, type: 'BINARY' },
  { category: 'FASILITAS', label: 'Parkir mobil', order: 5, type: 'BINARY' },
  { category: 'FASILITAS', label: 'Mesin cuci / laundry', order: 6, type: 'BINARY' },
  { category: 'FASILITAS', label: 'Dispenser air', order: 7, type: 'BINARY' },
  { category: 'FASILITAS', label: 'TV', order: 8, type: 'BINARY' },
  { category: 'FASILITAS', label: 'Balkon / area santai', order: 9, type: 'BINARY' },

  // ─── KEAMANAN ─────────────────────────────────────────
  { category: 'KEAMANAN', label: 'Kunci pintu kamar', order: 1, type: 'SCALE',
    hint: 'Kunci biasa=2, gembok ekstra=3, digital/card=5' },
  { category: 'KEAMANAN', label: 'CCTV di area kos', order: 2, type: 'BINARY' },
  { category: 'KEAMANAN', label: 'Penerangan malam hari', order: 3, type: 'SCALE' },
  { category: 'KEAMANAN', label: 'Keamanan lingkungan sekitar', order: 4, type: 'SCALE' },
  { category: 'KEAMANAN', label: 'Rawan banjir?', order: 5, type: 'BINARY',
    binaryGood: 'no', hint: 'Jawab "tidak" kalau aman dari banjir' },
  { category: 'KEAMANAN', label: 'Tingkat kebisingan', order: 6, type: 'SCALE',
    hint: 'Bising=1, tenang=5. Jalan raya? Tempat hiburan?' },

  // ─── SEKITAR ──────────────────────────────────────────
  { category: 'SEKITAR', label: 'Warung makan / restoran terdekat', order: 1, type: 'SCALE',
    hint: 'Sedikit pilihan=2, banyak variasi=5' },
  { category: 'SEKITAR', label: 'Minimarket terdekat', order: 2, type: 'SCALE' },
  { category: 'SEKITAR', label: 'Laundry kiloan terdekat', order: 3, type: 'SCALE' },
  { category: 'SEKITAR', label: 'Akses transportasi / ojol', order: 4, type: 'SCALE',
    hint: 'Mudah dapat ojol/angkot?' },
  { category: 'SEKITAR', label: 'Jarak ke pusat kota', order: 5, type: 'SCALE' },
  { category: 'SEKITAR', label: 'Kondisi jalan akses', order: 6, type: 'SCALE',
    hint: 'Gang sempit? Banjir kalau hujan?' },

  // ─── PEMILIK ──────────────────────────────────────────
  { category: 'PEMILIK', label: 'Responsivitas pemilik', order: 1, type: 'SCALE' },
  { category: 'PEMILIK', label: 'Kebijakan tamu', order: 2, type: 'INFO',
    hint: 'Mis. "boleh tamu sampai jam 22" / "tidak boleh menginap"' },
  { category: 'PEMILIK', label: 'Jam malam / peraturan kos', order: 3, type: 'INFO',
    hint: 'Mis. "tidak ada jam malam" atau "pintu kunci jam 23"' },
  { category: 'PEMILIK', label: 'Kontrak & deposit', order: 4, type: 'INFO',
    hint: 'Mis. "min 6 bulan, deposit 1 bulan"' },
]

export const CATEGORY_LABELS: Record<string, string> = {
  KAMAR: '🛏️ Kamar',
  KAMAR_MANDI: '🚿 Kamar Mandi',
  DAPUR: '🍳 Dapur',
  FASILITAS: '⚡ Fasilitas',
  KEAMANAN: '🔒 Keamanan',
  SEKITAR: '📍 Sekitar Lokasi',
  PEMILIK: '🏠 Pemilik & Aturan',
}

export const CATEGORIES = Object.keys(CATEGORY_LABELS)

// Lookup type & binaryGood berdasarkan label item — dipakai form & display
// untuk render yang benar tanpa harus simpan type di DB per item.
const _BY_LABEL = new Map(CHECKLIST_ITEMS.map(i => [i.label, i] as const))

export function getItemConfig(label: string): ChecklistItem | undefined {
  return _BY_LABEL.get(label)
}

export function getItemType(label: string): ChecklistItemType {
  return _BY_LABEL.get(label)?.type ?? 'SCALE'
}
