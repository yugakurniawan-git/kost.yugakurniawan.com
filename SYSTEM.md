# SupportKos (bantukos.com) — Arsitektur & Alur

## Stack

- **Framework**: Next.js (App Router)
- **Deploy**: cPanel via GitHub Actions (push ke main → auto-deploy)
- **Data**: `public/listings.json` di-generate oleh `bantukos-bot/sync_website.py`

---

## Alur Update Listing

```
bantukos-bot scraping → posts di DB → sync_website.py generate listings.json
  → push ke GitHub repo SupportKos via API
  → GitHub Actions trigger → deploy ke cPanel bantukos.com
```

---

## Halaman

| Path | Fungsi |
|---|---|
| `/` | Landing page (hero, cara kerja, FAQ) |
| `/listings` | Daftar kos tersedia — load dari `public/listings.json` |

---

## listings.json Format

```json
{
  "id": 123,
  "location": "Sesetan",
  "price": "Rp 1.5jt/bln",
  "type": "Putri",
  "facilities": ["AC", "WiFi", "KM Dalam"],
  "source": "facebook",
  "posted_at": "2026-05-19",
  "image_url": "https://res.cloudinary.com/..."
}
```

---

## Filter Listing

Listing yang tidak ditampilkan ke website:
- Post yang mengandung kata "cari kos" (pencari, bukan penawaran)
- Post yang mengandung kata jual/kavling/rumah dijual
- Post tanpa harga atau harga di luar range Rp 500rb–8jt/bulan
- Lokasi terlalu generik ("Bali", "Denpasar", "Badung")
- Duplikat berdasarkan (lokasi, harga)

---

## Design Decisions

- **Tidak ada link ke Facebook/sumber asli** — customer diarahkan WA Bantukos untuk info detail (supaya ada qualified lead)
- Foto dari Cloudinary CDN (bukan server langsung)
- WA number: 6285190810100 (WA Bisnis Bantukos)

---

## Known Issues / History

- **2026-05-19**: Hapus tombol "Lihat di Facebook" dari listing card — customer harus hubungi WA Bantukos
- **source_url** dihapus dari listings.json dan DB query (tidak relevan di website)
