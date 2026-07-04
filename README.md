# Termination Benefit Calculator

**Termination Benefit Calculator** adalah tools standalone berbasis HTML/CSS/JavaScript untuk menghitung estimasi hak karyawan yang berhenti bekerja berdasarkan **PP No. 35 Tahun 2021** tentang Perjanjian Kerja Waktu Tertentu, Alih Daya, Waktu Kerja dan Waktu Istirahat, dan Pemutusan Hubungan Kerja.

---

## ✨ Fitur

- ✅ **21 kondisi terminasi** lengkap (PHK oleh perusahaan, PHK oleh pekerja, berakhirnya hubungan kerja)
- ✅ Perhitungan **Uang Pesangon (UP)**, **Uang Penghargaan Masa Kerja (UPMK)**, dan **Uang Penggantian Hak (UPH)**
- ✅ Perhitungan **Kompensasi PKWT**
- ✅ Referensi **pasal PP 35/2021** untuk setiap komponen
- ✅ **Print-friendly** — bisa dicetak langsung dari browser
- ✅ **Responsive** — tampilan optimal di desktop, tablet, dan mobile
- ✅ **Standalone** — tidak perlu backend atau dependency

---

## 📁 Struktur File

```
termination-benefit-calculator/
├── index.html      # UI & struktur halaman
├── style.css       # Styling (tema YM-ID compatible)
├── calculator.js   # Logika perhitungan & data pasal
└── README.md       # Dokumentasi ini
```

---

## 🚀 Cara Menggunakan

### 1. Buka Langsung
Buka file `index.html` di browser (Chrome, Firefox, Safari, Edge).

### 2. Isi Form
- **Informasi Karyawan** — Nama, jabatan, status kepegawaian
- **Masa Kerja** — Tahun dan bulan
- **Gaji & Tunjangan** — Gaji pokok dan tunjangan tetap per bulan
- **Alasan Terminasi** — Pilih salah satu dari 21 kondisi
- **UPH Tambahan** — Sisa cuti, ongkos pulang, penggantian hak lain (opsional)

### 3. Klik "Hitung Estimasi Hak"
Sistem akan menampilkan:
- Rincian perhitungan UP, UPMK, UPH
- Total estimasi hak
- Referensi pasal PP 35/2021
- Komponen yang tidak diterima (jika ada)

### 4. Cetak / Simpan PDF
Klik tombol "Cetak / Simpan PDF" untuk menyimpan hasil.

---

## 🔌 Cara Embed ke Website

### Opsi 1: Subfolder (Rekomendasi)
Upload folder `termination-benefit-calculator/` ke server Anda:

```
www.ym-id.com/
├── tools/
│   ├── index.html              # Halaman tools utama
│   └── termination-benefit-calculator/
│       ├── index.html
│       ├── style.css
│       └── calculator.js
```

Tambahkan card di halaman tools:
```html
<div class="tool-card">
  <h3>Termination Benefit Calculator</h3>
  <p>Hitung estimasi uang pesangon, penghargaan masa kerja, dan penggantian hak berdasarkan PP No. 35 Tahun 2021.</p>
  <a href="/tools/termination-benefit-calculator/" class="btn">BUKA KALKULATOR</a>
</div>
```

### Opsi 2: Iframe
```html
<iframe src="/tools/termination-benefit-calculator/index.html" 
        width="100%" 
        height="1200px" 
        frameborder="0"
        style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
</iframe>
```

### Opsi 3: Copy ke Project Eksisting
Copy isi 3 file ke dalam project Anda dan sesuaikan path.

---

## ⚖️ Dasar Hukum

Kalkulator ini mengacu pada:
- **PP No. 35 Tahun 2021** tentang Perjanjian Kerja Waktu Tertentu, Alih Daya, Waktu Kerja dan Waktu Istirahat, dan Pemutusan Hubungan Kerja
- **UU No. 11 Tahun 2020** tentang Cipta Kerja (sebagai dasar pengaturan)

---

## ⚠️ Disclaimer

Hasil perhitungan ini bersifat **estimasi** berdasarkan PP No. 35 Tahun 2021. Jumlah final dapat berbeda tergantung:
- Kebijakan internal perusahaan
- Perjanjian Kerja Bersama (PKB)
- Perjanjian Kerja (PK) individu
- Ketentuan lain yang berlaku di perusahaan

Untuk kepastian hukum, konsultasikan dengan HR atau konsultan hukum ketenagakerjaan.

---

## 📝 Changelog

| Versi | Tanggal | Keterangan |
|-------|---------|------------|
| 1.0.0 | 2026-07-04 | Rilis awal — 21 kondisi terminasi, UP, UPMK, UPH, Kompensasi PKWT |

---

Dibuat untuk **YM-ID | Business, People & Digital Solutions**
