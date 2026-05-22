export type ChecklistItem = {
  category: string
  label: string
  order: number
  hint?: string // tips saat inspeksi
}

export const CHECKLIST_ITEMS: ChecklistItem[] = [
  // KAMAR
  { category: 'KAMAR', label: 'Ukuran kamar (estimasi m²)', order: 1, hint: 'Coba ukur dengan langkah kaki' },
  { category: 'KAMAR', label: 'Tinggi plafon', order: 2 },
  { category: 'KAMAR', label: 'Ventilasi / jendela', order: 3, hint: 'Bisa dibuka? Angin masuk?' },
  { category: 'KAMAR', label: 'Pencahayaan alami', order: 4 },
  { category: 'KAMAR', label: 'Kondisi tembok & lantai', order: 5, hint: 'Lembap? Retak? Jamur?' },
  { category: 'KAMAR', label: 'Kebersihan kamar', order: 6 },
  { category: 'KAMAR', label: 'Kasur & furnitur', order: 7, hint: 'Kondisi kasur, meja, lemari' },
  { category: 'KAMAR', label: 'Lemari / rak baju', order: 8 },
  { category: 'KAMAR', label: 'Meja & kursi kerja', order: 9 },
  { category: 'KAMAR', label: 'Jumlah colokan listrik', order: 10, hint: 'Cukup untuk kebutuhan harian?' },
  { category: 'KAMAR', label: 'Gorden / privasi', order: 11 },
  { category: 'KAMAR', label: 'Cermin', order: 12 },

  // KAMAR MANDI
  { category: 'KAMAR_MANDI', label: 'Lokasi (dalam/luar kamar)', order: 1 },
  { category: 'KAMAR_MANDI', label: 'Kelancaran air', order: 2, hint: 'Buka keran & flush, cek tekanan' },
  { category: 'KAMAR_MANDI', label: 'Kebersihan air (warna, bau)', order: 3 },
  { category: 'KAMAR_MANDI', label: 'Saluran pembuangan', order: 4, hint: 'Mampet? Bau?' },
  { category: 'KAMAR_MANDI', label: 'Kondisi WC', order: 5 },
  { category: 'KAMAR_MANDI', label: 'Shower / bak mandi', order: 6 },
  { category: 'KAMAR_MANDI', label: 'Water heater', order: 7 },
  { category: 'KAMAR_MANDI', label: 'Exhaust fan / ventilasi', order: 8 },
  { category: 'KAMAR_MANDI', label: 'Kebersihan keseluruhan', order: 9 },

  // DAPUR
  { category: 'DAPUR', label: 'Dapur bersama (ada/tidak)', order: 1 },
  { category: 'DAPUR', label: 'Kondisi & kebersihan dapur', order: 2 },
  { category: 'DAPUR', label: 'Kompor tersedia', order: 3 },
  { category: 'DAPUR', label: 'Kulkas bersama', order: 4 },

  // FASILITAS
  { category: 'FASILITAS', label: 'AC / kipas angin', order: 1, hint: 'Nyalakan, cek suhu & suara' },
  { category: 'FASILITAS', label: 'Kecepatan WiFi (Mbps)', order: 2, hint: 'Lakukan speed test di HP' },
  { category: 'FASILITAS', label: 'Listrik (token/termasuk)', order: 3 },
  { category: 'FASILITAS', label: 'Parkir motor', order: 4 },
  { category: 'FASILITAS', label: 'Parkir mobil', order: 5 },
  { category: 'FASILITAS', label: 'Mesin cuci / laundry', order: 6 },
  { category: 'FASILITAS', label: 'Dispenser air', order: 7 },
  { category: 'FASILITAS', label: 'TV', order: 8 },
  { category: 'FASILITAS', label: 'Balkon / area santai', order: 9 },

  // KEAMANAN
  { category: 'KEAMANAN', label: 'Kunci pintu kamar', order: 1, hint: 'Kunci kamar, bukan cuma kunci pagar' },
  { category: 'KEAMANAN', label: 'CCTV di area kos', order: 2 },
  { category: 'KEAMANAN', label: 'Penerangan malam hari', order: 3 },
  { category: 'KEAMANAN', label: 'Keamanan lingkungan sekitar', order: 4 },
  { category: 'KEAMANAN', label: 'Rawan banjir?', order: 5, hint: 'Tanya warga / cek bekas air' },
  { category: 'KEAMANAN', label: 'Tingkat kebisingan', order: 6, hint: 'Jalan raya? Tempat hiburan?' },

  // SEKITAR
  { category: 'SEKITAR', label: 'Warung makan / restoran terdekat', order: 1, hint: 'Jarak & variasi makanan' },
  { category: 'SEKITAR', label: 'Minimarket terdekat', order: 2 },
  { category: 'SEKITAR', label: 'Laundry kiloan terdekat', order: 3 },
  { category: 'SEKITAR', label: 'Akses transportasi / ojol', order: 4, hint: 'Mudah dapat ojol/angkot?' },
  { category: 'SEKITAR', label: 'Jarak ke pusat kota', order: 5 },
  { category: 'SEKITAR', label: 'Kondisi jalan akses', order: 6, hint: 'Gang sempit? Banjir kalau hujan?' },

  // PEMILIK
  { category: 'PEMILIK', label: 'Responsivitas pemilik', order: 1 },
  { category: 'PEMILIK', label: 'Kebijakan tamu', order: 2, hint: 'Boleh bawa tamu? Jam berapa?' },
  { category: 'PEMILIK', label: 'Jam malam / peraturan kos', order: 3 },
  { category: 'PEMILIK', label: 'Kontrak & deposit', order: 4, hint: 'Min berapa bulan? Deposit?' },
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
