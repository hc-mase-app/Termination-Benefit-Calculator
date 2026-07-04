/* ============================================
   Termination Benefit Calculator - Logic
   Based on PP No. 35 Tahun 2021
   REVISED: Multiplier khusus per jenis PHK + Lampiran
   ============================================ */

// ============================================================
// DATA: ALASAN TERMINASI
// ============================================================
const terminationData = {
    phk_perusahaan: {
        label: "PHK oleh Perusahaan",
        reasons: {
            phk_merger: { 
                label: "Merger / Peleburan / Penggabungan / Pemisahan Perusahaan", 
                pasal: "Pasal 36 ayat (1) huruf a",
                up: true, upmk: true, uph: true, pkwt: false,
                up_multiplier: 1.0, upmk_multiplier: 1.0, uang_pisah: false,
                description: "Pekerja menolak dilanjutkan hubungan kerjanya dengan perusahaan penerus.",
                detail_pasal: "Pasal 41 PP No. 35 Tahun 2021"
            },
            phk_akuisisi: { 
                label: "Akuisisi / Pengambilalihan Perusahaan", 
                pasal: "Pasal 36 ayat (1) huruf a",
                up: true, upmk: true, uph: true, pkwt: false,
                up_multiplier: 0.5, upmk_multiplier: 1.0, uang_pisah: false,
                description: "Pekerja menolak dilanjutkan hubungan kerjanya oleh perusahaan penerus akibat pengambilalihan.",
                detail_pasal: "Pasal 42 ayat (2) PP No. 35 Tahun 2021"
            },
            phk_efisiensi_rugi: { 
                label: "Efisiensi Perusahaan (Karena Mengalami Kerugian)", 
                pasal: "Pasal 36 ayat (1) huruf b",
                up: true, upmk: true, uph: true, pkwt: false,
                up_multiplier: 0.5, upmk_multiplier: 1.0, uang_pisah: false,
                description: "Perusahaan melakukan efisiensi karena mengalami kerugian.",
                detail_pasal: "Pasal 43 ayat (1) PP No. 35 Tahun 2021"
            },
            phk_efisiensi_cegah_rugi: { 
                label: "Efisiensi Perusahaan (Untuk Mencegah Kerugian)", 
                pasal: "Pasal 36 ayat (1) huruf b",
                up: true, upmk: true, uph: true, pkwt: false,
                up_multiplier: 1.0, upmk_multiplier: 1.0, uang_pisah: false,
                description: "Perusahaan melakukan efisiensi untuk mencegah terjadinya kerugian.",
                detail_pasal: "Pasal 43 ayat (2) PP No. 35 Tahun 2021"
            },
            phk_tutup_rugi_2th: { 
                label: "Penutupan Perusahaan (Rugi 2 Tahun Berturut-turut)", 
                pasal: "Pasal 36 ayat (1) huruf c",
                up: true, upmk: true, uph: true, pkwt: false,
                up_multiplier: 0.5, upmk_multiplier: 1.0, uang_pisah: false,
                description: "Penutupan perusahaan karena mengalami kerugian secara terus-menerus selama 2 tahun.",
                detail_pasal: "Pasal 44 ayat (1) PP No. 35 Tahun 2021"
            },
            phk_tutup_bukan_rugi: { 
                label: "Penutupan Perusahaan (Bukan Karena Rugi)", 
                pasal: "Pasal 36 ayat (1) huruf d",
                up: true, upmk: true, uph: true, pkwt: false,
                up_multiplier: 1.0, upmk_multiplier: 1.0, uang_pisah: false,
                description: "Penutupan perusahaan yang bukan karena rugi 2 tahun berturut-turut.",
                detail_pasal: "Pasal 44 ayat (2) PP No. 35 Tahun 2021"
            },
            phk_force_majeure_tutup: { 
                label: "Force Majeure (Perusahaan Tutup)", 
                pasal: "Pasal 36 ayat (1) huruf e",
                up: true, upmk: true, uph: true, pkwt: false,
                up_multiplier: 0.5, upmk_multiplier: 1.0, uang_pisah: false,
                description: "Perusahaan tutup karena keadaan memaksa (force majeure).",
                detail_pasal: "Pasal 45 ayat (1) PP No. 35 Tahun 2021"
            },
            phk_force_majeure_tidak_tutup: { 
                label: "Force Majeure (Perusahaan Tidak Tutup)", 
                pasal: "Pasal 36 ayat (1) huruf f",
                up: true, upmk: true, uph: true, pkwt: false,
                up_multiplier: 0.75, upmk_multiplier: 1.0, uang_pisah: false,
                description: "Keadaan memaksa (force majeure) yang tidak mengakibatkan perusahaan tutup.",
                detail_pasal: "Pasal 45 ayat (2) PP No. 35 Tahun 2021"
            },
            phk_pkpu_rugi: { 
                label: "PKPU (Karena Perusahaan Rugi)", 
                pasal: "Pasal 36 ayat (1) huruf g",
                up: true, upmk: true, uph: true, pkwt: false,
                up_multiplier: 0.5, upmk_multiplier: 1.0, uang_pisah: false,
                description: "Perusahaan dalam PKPU karena mengalami kerugian.",
                detail_pasal: "Pasal 46 ayat (1) PP No. 35 Tahun 2021"
            },
            phk_pkpu_bukan_rugi: { 
                label: "PKPU (Bukan Karena Perusahaan Rugi)", 
                pasal: "Pasal 36 ayat (1) huruf h",
                up: true, upmk: true, uph: true, pkwt: false,
                up_multiplier: 1.0, upmk_multiplier: 1.0, uang_pisah: false,
                description: "Perusahaan dalam PKPU bukan karena kerugian.",
                detail_pasal: "Pasal 46 ayat (2) PP No. 35 Tahun 2021"
            },
            phk_pailit: { 
                label: "Pailit", 
                pasal: "Pasal 36 ayat (1) huruf i",
                up: true, upmk: true, uph: true, pkwt: false,
                up_multiplier: 0.5, upmk_multiplier: 1.0, uang_pisah: false,
                description: "Perusahaan dinyatakan pailit. Pembayaran dilakukan oleh kurator.",
                detail_pasal: "Pasal 47 PP No. 35 Tahun 2021"
            },
            phk_sakit: { 
                label: "Sakit Berkepanjangan / Cacat Akibat Kecelakaan Kerja (>12 Bulan)", 
                pasal: "Pasal 36 ayat (1) huruf j",
                up: true, upmk: true, uph: true, pkwt: false,
                up_multiplier: 2.0, upmk_multiplier: 1.0, uang_pisah: false,
                description: "Pekerja sakit berkepanjangan atau cacat akibat kecelakaan kerja >12 bulan.",
                detail_pasal: "Pasal 55 PP No. 35 Tahun 2021"
            },
            phk_ditahan_rugi: { 
                label: "Ditahan >6 Bulan (Menyebabkan Kerugian Perusahaan)", 
                pasal: "Pasal 36 ayat (1) huruf k",
                up: false, upmk: false, uph: true, pkwt: false,
                up_multiplier: 0, upmk_multiplier: 0, uang_pisah: true,
                description: "Pekerja ditahan >6 bulan dan menyebabkan kerugian perusahaan.",
                detail_pasal: "Pasal 54 ayat (1) PP No. 35 Tahun 2021"
            },
            phk_ditahan_tidak_rugi: { 
                label: "Ditahan >6 Bulan (Tidak Menyebabkan Kerugian)", 
                pasal: "Pasal 36 ayat (1) huruf k",
                up: false, upmk: true, uph: true, pkwt: false,
                up_multiplier: 0, upmk_multiplier: 1.0, uang_pisah: false,
                description: "Pekerja ditahan >6 bulan dan TIDAK menyebabkan kerugian perusahaan.",
                detail_pasal: "Pasal 54 ayat (2) PP No. 35 Tahun 2021"
            },
            phk_kesalahan_berat: { 
                label: "Kesalahan Berat (3x Surat Peringatan)", 
                pasal: "Pasal 36 ayat (1) huruf l",
                up: true, upmk: true, uph: true, pkwt: false,
                up_multiplier: 0.5, upmk_multiplier: 1.0, uang_pisah: false,
                description: "Pekerja melanggar ketentuan setelah SP 3x berturut-turut.",
                detail_pasal: "Pasal 52 ayat (1) PP No. 35 Tahun 2021"
            },
            phk_pelanggaran_mendesak: { 
                label: "Pelanggaran Mendesak (Langsung PHK)", 
                pasal: "Pasal 36 ayat (1) huruf l",
                up: false, upmk: false, uph: true, pkwt: false,
                up_multiplier: 0, upmk_multiplier: 0, uang_pisah: true,
                description: "Pelanggaran mendesak (penipuan, pencurian, narkoba, dll) langsung PHK tanpa SP.",
                detail_pasal: "Pasal 52 ayat (2) PP No. 35 Tahun 2021"
            },
            phk_tidak_masuk: { 
                label: "Mangkir >5 Hari Kerja Berturut-turut", 
                pasal: "Pasal 36 ayat (1) huruf m",
                up: false, upmk: false, uph: true, pkwt: false,
                up_multiplier: 0, upmk_multiplier: 0, uang_pisah: true,
                description: "Tidak masuk kerja >5 hari berturut-turut tanpa keterangan, dipanggil 2x.",
                detail_pasal: "Pasal 51 PP No. 35 Tahun 2021"
            }
        }
    },
    phk_pekerja: {
        label: "PHK oleh Pekerja / Berakhirnya Hubungan Kerja",
        reasons: {
            phk_pekerja_kekerasan: { 
                label: "Kekerasan / Ancaman / Intimidasi oleh Pengusaha", 
                pasal: "Pasal 36 ayat (1) huruf g",
                up: true, upmk: true, uph: true, pkwt: false,
                up_multiplier: 1.0, upmk_multiplier: 1.0, uang_pisah: false,
                description: "Pengusaha melakukan kekerasan, ancaman, atau intimidasi.",
                detail_pasal: "Pasal 48 PP No. 35 Tahun 2021"
            },
            phk_pekerja_upah: { 
                label: "Upah Tidak Dibayar >3 Bulan Berturut-turut", 
                pasal: "Pasal 36 ayat (1) huruf g",
                up: true, upmk: true, uph: true, pkwt: false,
                up_multiplier: 1.0, upmk_multiplier: 1.0, uang_pisah: false,
                description: "Upah tidak dibayar selama lebih dari 3 bulan berturut-turut.",
                detail_pasal: "Pasal 48 PP No. 35 Tahun 2021"
            },
            phk_pekerja_kewajiban: { 
                label: "Pengusaha Tidak Menjalankan Kewajiban (PK/PKB)", 
                pasal: "Pasal 36 ayat (1) huruf g",
                up: true, upmk: true, uph: true, pkwt: false,
                up_multiplier: 1.0, upmk_multiplier: 1.0, uang_pisah: false,
                description: "Pengusaha tidak menjalankan kewajiban sesuai PK/PKB/Perjanjian.",
                detail_pasal: "Pasal 48 PP No. 35 Tahun 2021"
            },
            phk_pekerja_luar_pk: { 
                label: "Disuruh Kerja di Luar Perjanjian Kerja", 
                pasal: "Pasal 36 ayat (1) huruf g",
                up: true, upmk: true, uph: true, pkwt: false,
                up_multiplier: 1.0, upmk_multiplier: 1.0, uang_pisah: false,
                description: "Pekerja disuruh kerja di luar yang diperjanjikan tanpa persetujuan.",
                detail_pasal: "Pasal 48 PP No. 35 Tahun 2021"
            },
            phk_putusan_lphi: { 
                label: "Putusan LPHI - Pekerja Kalah", 
                pasal: "Pasal 36 ayat (1) huruf h",
                up: false, upmk: false, uph: true, pkwt: false,
                up_multiplier: 0, upmk_multiplier: 0, uang_pisah: true,
                description: "Putusan LPHI menyatakan pengusaha tidak bersalah.",
                detail_pasal: "Pasal 49 PP No. 35 Tahun 2021"
            },
            meninggal: { 
                label: "Meninggal Dunia", 
                pasal: "Pasal 36 ayat (1) huruf o",
                up: true, upmk: true, uph: true, pkwt: false,
                up_multiplier: 2.0, upmk_multiplier: 1.0, uang_pisah: false,
                description: "Pekerja meninggal dunia. Hak diterima oleh ahli waris.",
                detail_pasal: "Pasal 57 PP No. 35 Tahun 2021"
            },
            habis_kontrak: { 
                label: "Habis Masa Kerja (PKWT)", 
                pasal: "Pasal 15 PP No. 35 Tahun 2021",
                up: false, upmk: false, uph: false, pkwt: true,
                up_multiplier: 0, upmk_multiplier: 0, uang_pisah: false,
                description: "Hubungan kerja berakhir karena habis masa kerja PKWT.",
                detail_pasal: "Pasal 15 & 16 PP No. 35 Tahun 2021"
            },
            resign: { 
                label: "Mengundurkan Diri", 
                pasal: "Pasal 36 ayat (1) huruf n",
                up: false, upmk: false, uph: true, pkwt: false,
                up_multiplier: 0, upmk_multiplier: 0, uang_pisah: true,
                description: "Pekerja mengundurkan diri dengan syarat: surat 30 hari, tidak ikatan dinas, tetap bekerja.",
                detail_pasal: "Pasal 50 PP No. 35 Tahun 2021"
            },
            pensiun: { 
                label: "Pensiun", 
                pasal: "Pasal 36 ayat (1) huruf n",
                up: true, upmk: true, uph: true, pkwt: false,
                up_multiplier: 1.75, upmk_multiplier: 1.0, uang_pisah: false,
                description: "Pekerja mencapai usia pensiun.",
                detail_pasal: "Pasal 56 PP No. 35 Tahun 2021"
            }
        }
    }
};

// ============================================================
// DATA: LAMPIRAN - LANDASAN HUKUM LENGKAP
// ============================================================
const lampiranHukum = {
    pasal_36: {
        judul: "Pasal 36 - Alasan Pemutusan Hubungan Kerja",
        isi: `Pemutusan Hubungan Kerja dapat terjadi karena alasan:
a. Perusahaan melakukan penggabungan, peleburan, pengambilalihan, atau pemisahan Perusahaan dan Pekerja/Buruh tidak bersedia melanjutkan Hubungan Kerja atau Pengusaha tidak bersedia menerima Pekerja/Buruh;
b. Perusahaan melakukan efisiensi diikuti dengan penutupan Perusahaan atau tidak diikuti dengan penutupan Perusahaan yang disebabkan Perusahaan mengalami kerugian;
c. Perusahaan tutup yang disebabkan karena Perusahaan mengalami kerugian secara terus menerus selama 2 (dua) tahun;
d. Perusahaan tutup yang disebabkan keadaan memaksa (force majeure);
e. Perusahaan dalam keadaan penundaan kewajiban pembayaran utang;
f. Perusahaan pailit;
g. Adanya permohonan Pemutusan Hubungan Kerja yang diajukan oleh Pekerja/Buruh dengan alasan Pengusaha melakukan perbuatan sebagai berikut:
   1. menganiaya, menghina secara kasar, atau mengancam Pekerja/Buruh;
   2. membujuk dan/atau menyuruh Pekerja/Buruh untuk melakukan perbuatan yang bertentangan dengan peraturan perundang-undangan;
   3. tidak membayar Upah tepat pada waktu yang telah ditentukan selama 3 (tiga) bulan berturut-turut atau lebih;
   4. tidak melakukan kewajiban yang telah dijanjikan kepada Pekerja/Buruh;
   5. memerintahkan Pekerja/Buruh untuk melaksanakan pekerjaan di luar yang diperjanjikan;
   6. memberikan pekerjaan yang membahayakan jiwa, keselamatan, kesehatan, dan kesusilaan Pekerja/Buruh;
h. Adanya putusan lembaga penyelesaian perselisihan hubungan industrial yang menyatakan Pengusaha tidak melakukan perbuatan sebagaimana dimaksud pada huruf g;
i. Pekerja/Buruh mengundurkan diri atas kemauan sendiri dan harus memenuhi syarat:
   1. mengajukan permohonan pengunduran diri secara tertulis selambat-lambatnya 30 (tiga puluh) hari sebelum tanggal mulai pengunduran diri;
   2. tidak terikat dalam ikatan dinas;
   3. tetap melaksanakan kewajibannya sampai tanggal mulai pengunduran diri;
j. Pekerja/Buruh mangkir selama 5 (lima) hari kerja atau lebih berturut-turut tanpa keterangan secara tertulis yang dilengkapi dengan bukti yang sah dan telah dipanggil oleh Pengusaha 2 (dua) kali secara patut dan tertulis;
k. Pekerja/Buruh melakukan pelanggaran ketentuan yang diatur dalam Perjanjian Kerja, Peraturan Perusahaan, atau Perjanjian Kerja Bersama dan sebelumnya telah diberikan surat peringatan pertama, kedua, dan ketiga secara berturut-turut masing-masing berlaku untuk paling lama 6 (enam) bulan;
l. Pekerja/Buruh tidak dapat melakukan pekerjaan selama 6 (enam) bulan akibat ditahan pihak yang berwajib karena diduga melakukan tindak pidana;
m. Pekerja/Buruh mengalami sakit berkepanjangan atau cacat akibat kecelakaan kerja dan tidak dapat melakukan pekerjaannya setelah melampaui batas 12 (dua belas) bulan;
n. Pekerja/Buruh memasuki usia pensiun;
o. Pekerja/Buruh meninggal dunia.`
    },
    pasal_40: {
        judul: "Pasal 40 - Dasar Perhitungan Uang Pesangon, UPMK, dan UPH",
        isi: `(1) Dalam hal terjadi Pemutusan Hubungan Kerja, Pengusaha wajib membayar uang pesangon dan/atau uang penghargaan masa kerja, dan uang penggantian hak yang seharusnya diterima.

(2) Uang pesangon diberikan dengan ketentuan:
    a. masa kerja kurang dari 1 (satu) tahun, 1 (satu) bulan Upah;
    b. masa kerja 1 (satu) tahun atau lebih tetapi kurang dari 2 (dua) tahun, 2 (dua) bulan Upah;
    c. masa kerja 2 (dua) tahun atau lebih tetapi kurang dari 3 (tiga) tahun, 3 (tiga) bulan Upah;
    d. masa kerja 3 (tiga) tahun atau lebih tetapi kurang dari 4 (empat) tahun, 4 (empat) bulan Upah;
    e. masa kerja 4 (empat) tahun atau lebih tetapi kurang dari 5 (lima) tahun, 5 (lima) bulan Upah;
    f. masa kerja 5 (lima) tahun atau lebih, tetapi kurang dari 6 (enam) tahun, 6 (enam) bulan Upah;
    g. masa kerja 6 (enam) tahun atau lebih tetapi kurang dari 7 (tujuh) tahun, 7 (tujuh) bulan Upah;
    h. masa kerja 7 (tujuh) tahun atau lebih tetapi kurang dari 8 (delapan) tahun, 8 (delapan) bulan Upah;
    i. masa kerja 8 (delapan) tahun atau lebih, 9 (sembilan) bulan Upah.

(3) Uang penghargaan masa kerja diberikan dengan ketentuan:
    a. masa kerja 3 (tiga) tahun atau lebih tetapi kurang dari 6 (enam) tahun, 2 (dua) bulan Upah;
    b. masa kerja 6 (enam) tahun atau lebih tetapi kurang dari 9 (sembilan) tahun, 3 (tiga) bulan Upah;
    c. masa kerja 9 (sembilan) tahun atau lebih tetapi kurang dari 12 (dua belas) tahun, 4 (empat) bulan Upah;
    d. masa kerja 12 (dua belas) tahun atau lebih tetapi kurang dari 15 (lima belas) tahun, 5 (lima) bulan Upah;
    e. masa kerja 15 (lima belas) tahun atau lebih tetapi kurang dari 18 (delapan belas) tahun, 6 (enam) bulan Upah;
    f. masa kerja 18 (delapan belas) tahun atau lebih tetapi kurang dari 21 (dua puluh satu) tahun, 7 (tujuh) bulan Upah;
    g. masa kerja 21 (dua puluh satu) tahun atau lebih tetapi kurang dari 24 (dua puluh empat) tahun, 8 (delapan) bulan Upah;
    h. masa kerja 24 (dua puluh empat) tahun atau lebih, 10 (sepuluh) bulan Upah.

(4) Uang penggantian hak yang seharusnya diterima meliputi:
    a. cuti tahunan yang belum diambil dan belum gugur;
    b. biaya atau ongkos pulang untuk Pekerja/Buruh dan keluarganya ke tempat dimana Pekerja/Buruh diterima bekerja;
    c. hal-hal lain yang ditetapkan dalam Perjanjian Kerja, Peraturan Perusahaan, atau Perjanjian Kerja Bersama.`
    },
    pasal_41: {
        judul: "Pasal 41 - Merger/Peleburan/Penggabungan/Pemisahan",
        isi: `Pengusaha dapat melakukan Pemutusan Hubungan Kerja terhadap Pekerja/Buruh karena alasan Perusahaan melakukan penggabungan, peleburan atau pemisahan Perusahaan dan Pekerja/Buruh tidak bersedia melanjutkan Hubungan Kerja atau Pengusaha tidak bersedia menerima Pekerja/Buruh maka Pekerja/Buruh berhak atas:
a. uang pesangon sebesar 1 (satu) kali ketentuan Pasal 40 ayat (2);
b. uang penghargaan masa kerja sebesar 1 (satu) kali ketentuan Pasal 40 ayat (3);
c. uang penggantian hak sesuai ketentuan Pasal 40 ayat (4).`
    },
    pasal_42: {
        judul: "Pasal 42 - Akuisisi/Pengambilalihan",
        isi: `(1) Pengusaha dapat melakukan Pemutusan Hubungan Kerja terhadap Pekerja/Buruh karena alasan pengambilalihan Perusahaan maka Pekerja/Buruh berhak atas:
a. uang pesangon sebesar 1 (satu) kali ketentuan Pasal 40 ayat (2);
b. uang penghargaan masa kerja sebesar 1 (satu) kali ketentuan Pasal 40 ayat (3);
c. uang penggantian hak sesuai ketentuan Pasal 40 ayat (4).

(2) Dalam hal terjadi pengambilalihan Perusahaan yang mengakibatkan terjadinya perubahan syarat kerja dan Pekerja/Buruh tidak bersedia melanjutkan Hubungan Kerja, Pengusaha dapat melakukan Pemutusan Hubungan Kerja dan Pekerja/Buruh berhak atas:
a. uang pesangon sebesar 0,5 (nol koma lima) kali ketentuan Pasal 40 ayat (2);
b. uang penghargaan masa kerja sebesar 1 (satu) kali ketentuan Pasal 40 ayat (3);
c. uang penggantian hak sesuai ketentuan Pasal 40 ayat (4).`
    },
    pasal_43: {
        judul: "Pasal 43 - Efisiensi Perusahaan",
        isi: `(1) Pengusaha dapat melakukan Pemutusan Hubungan Kerja terhadap Pekerja/Buruh karena alasan Perusahaan melakukan efisiensi yang disebabkan Perusahaan mengalami kerugian maka Pekerja/Buruh berhak atas:
a. uang pesangon sebesar 0,5 (nol koma lima) kali ketentuan Pasal 40 ayat (2);
b. uang penghargaan masa kerja sebesar 1 (satu) kali ketentuan Pasal 40 ayat (3);
c. uang penggantian hak sesuai ketentuan Pasal 40 ayat (4).

(2) Pengusaha dapat melakukan Pemutusan Hubungan Kerja terhadap Pekerja/Buruh karena alasan Perusahaan melakukan efisiensi untuk mencegah terjadinya kerugian maka Pekerja/Buruh berhak atas:
a. uang pesangon sebesar 1 (satu) kali ketentuan Pasal 40 ayat (2);
b. uang penghargaan masa kerja sebesar 1 (satu) kali ketentuan Pasal 40 ayat (3);
c. uang penggantian hak sesuai ketentuan Pasal 40 ayat (4).`
    },
    pasal_44: {
        judul: "Pasal 44 - Penutupan Perusahaan",
        isi: `(1) Pengusaha dapat melakukan Pemutusan Hubungan Kerja terhadap Pekerja/Buruh karena alasan Perusahaan tutup yang disebabkan Perusahaan mengalami kerugian secara terus menerus selama 2 (dua) tahun atau mengalami kerugian tidak secara terus menerus selama 2 (dua) tahun maka Pekerja/Buruh berhak atas:
a. uang pesangon sebesar 0,5 (nol koma lima) kali ketentuan Pasal 40 ayat (2);
b. uang penghargaan masa kerja sebesar 1 (satu) kali ketentuan Pasal 40 ayat (3);
c. uang penggantian hak sesuai ketentuan Pasal 40 ayat (4).

(2) Pengusaha dapat melakukan Pemutusan Hubungan Kerja terhadap Pekerja/Buruh karena alasan Perusahaan tutup yang disebabkan bukan karena Perusahaan mengalami kerugian maka Pekerja/Buruh berhak atas:
a. uang pesangon sebesar 1 (satu) kali ketentuan Pasal 40 ayat (2);
b. uang penghargaan masa kerja sebesar 1 (satu) kali ketentuan Pasal 40 ayat (3);
c. uang penggantian hak sesuai ketentuan Pasal 40 ayat (4).`
    },
    pasal_45: {
        judul: "Pasal 45 - Force Majeure",
        isi: `(1) Pengusaha dapat melakukan Pemutusan Hubungan Kerja terhadap Pekerja/Buruh karena alasan Perusahaan tutup yang disebabkan keadaan memaksa (force majeure) maka Pekerja/Buruh berhak atas:
a. uang pesangon sebesar 0,5 (nol koma lima) kali ketentuan Pasal 40 ayat (2);
b. uang penghargaan masa kerja sebesar 1 (satu) kali ketentuan Pasal 40 ayat (3);
c. uang penggantian hak sesuai ketentuan Pasal 40 ayat (4).

(2) Pengusaha dapat melakukan Pemutusan Hubungan Kerja terhadap Pekerja/Buruh karena alasan keadaan memaksa (force majeure) yang tidak mengakibatkan Perusahaan tutup maka Pekerja/Buruh berhak atas:
a. uang pesangon sebesar 0,75 (nol koma tujuh puluh lima) kali ketentuan Pasal 40 ayat (2);
b. uang penghargaan masa kerja sebesar 1 (satu) kali ketentuan Pasal 40 ayat (3);
c. uang penggantian hak sesuai ketentuan Pasal 40 ayat (4).`
    },
    pasal_46: {
        judul: "Pasal 46 - PKPU",
        isi: `(1) Pengusaha dapat melakukan Pemutusan Hubungan Kerja terhadap Pekerja/Buruh karena alasan Perusahaan dalam keadaan penundaan kewajiban pembayaran utang yang disebabkan Perusahaan mengalami kerugian maka Pekerja/Buruh berhak atas:
a. uang pesangon sebesar 0,5 (nol koma lima) kali ketentuan Pasal 40 ayat (2);
b. uang penghargaan masa kerja sebesar 1 (satu) kali ketentuan Pasal 40 ayat (3);
c. uang penggantian hak sesuai ketentuan Pasal 40 ayat (4).

(2) Pengusaha dapat melakukan Pemutusan Hubungan Kerja terhadap Pekerja/Buruh karena alasan Perusahaan dalam keadaan penundaan kewajiban pembayaran utang bukan karena Perusahaan mengalami kerugian maka Pekerja/Buruh berhak atas:
a. uang pesangon sebesar 1 (satu) kali ketentuan Pasal 40 ayat (2);
b. uang penghargaan masa kerja sebesar 1 (satu) kali ketentuan Pasal 40 ayat (3);
c. uang penggantian hak sesuai ketentuan Pasal 40 ayat (4).`
    },
    pasal_47: {
        judul: "Pasal 47 - Pailit",
        isi: `Pengusaha dapat melakukan Pemutusan Hubungan Kerja terhadap Pekerja/Buruh karena alasan Perusahaan pailit maka Pekerja/Buruh berhak atas:
a. uang pesangon sebesar 1 (satu) kali ketentuan Pasal 40 ayat (2);
b. uang penghargaan masa kerja sebesar 1 (satu) kali ketentuan Pasal 40 ayat (3);
c. uang penggantian hak sesuai ketentuan Pasal 40 ayat (4).`
    },
    pasal_48: {
        judul: "Pasal 48 - PHK oleh Pekerja",
        isi: `Pengusaha dapat melakukan Pemutusan Hubungan Kerja terhadap Pekerja/Buruh karena alasan adanya permohonan Pemutusan Hubungan Kerja yang diajukan oleh Pekerja/Buruh dengan alasan Pengusaha melakukan perbuatan sebagaimana yang dimaksud dalam Pasal 36 huruf g maka Pekerja/Buruh berhak atas:
a. uang pesangon sebesar 1 (satu) kali ketentuan Pasal 40 ayat (2);
b. uang penghargaan masa kerja sebesar 1 (satu) kali ketentuan Pasal 40 ayat (3);
c. uang penggantian hak sesuai ketentuan Pasal 40 ayat (4).`
    },
    pasal_49: {
        judul: "Pasal 49 - Putusan LPHI",
        isi: `Pengusaha dapat melakukan Pemutusan Hubungan Kerja terhadap Pekerja/Buruh karena alasan adanya putusan lembaga penyelesaian perselisihan hubungan industrial yang menyatakan Pengusaha tidak melakukan perbuatan sebagaimana dimaksud dalam Pasal 36 huruf g terhadap permohonan yang diajukan oleh Pekerja/Buruh maka Pekerja/Buruh berhak atas:
a. uang penggantian hak sesuai ketentuan Pasal 40 ayat (4);
b. uang pisah yang besarannya diatur dalam Perjanjian Kerja, Peraturan Perusahaan, atau Perjanjian Kerja Bersama.`
    },
    pasal_50: {
        judul: "Pasal 50 - Mengundurkan Diri",
        isi: `Pekerja/Buruh yang mengundurkan diri atas kemauan sendiri dan memenuhi syarat sebagaimana dimaksud dalam Pasal 36 huruf i, berhak atas:
a. uang penggantian hak sesuai ketentuan Pasal 40 ayat (4);
b. uang pisah yang besarannya diatur dalam Perjanjian Kerja, Peraturan Perusahaan, atau Perjanjian Kerja Bersama.`
    },
    pasal_51: {
        judul: "Pasal 51 - Mangkir",
        isi: `Pengusaha dapat melakukan Pemutusan Hubungan Kerja terhadap Pekerja/Buruh karena alasan Pekerja/Buruh mangkir selama 5 (lima) hari kerja atau lebih berturut-turut tanpa keterangan secara tertulis yang dilengkapi dengan bukti yang sah dan telah dipanggil oleh Pengusaha 2 (dua) kali secara patut dan tertulis maka Pekerja/Buruh berhak atas:
a. uang penggantian hak sesuai ketentuan Pasal 40 ayat (4);
b. uang pisah yang besarannya diatur dalam Perjanjian Kerja, Peraturan Perusahaan, atau Perjanjian Kerja Bersama.`
    },
    pasal_52: {
        judul: "Pasal 52 - Pelanggaran Ketentuan",
        isi: `(1) Pengusaha dapat melakukan Pemutusan Hubungan Kerja terhadap Pekerja/Buruh karena alasan Pekerja/Buruh melakukan pelanggaran ketentuan yang diatur dalam Perjanjian Kerja, Peraturan Perusahaan, atau Perjanjian Kerja Bersama dan sebelumnya telah diberikan surat peringatan pertama, kedua, dan ketiga secara berturut-turut maka Pekerja/Buruh berhak atas:
a. uang pesangon sebesar 0,5 (nol koma lima) kali ketentuan Pasal 40 ayat (2);
b. uang penghargaan masa kerja sebesar 1 (satu) kali ketentuan Pasal 40 ayat (3);
c. uang penggantian hak sesuai ketentuan Pasal 40 ayat (4).

(2) Pengusaha dapat melakukan Pemutusan Hubungan Kerja terhadap Pekerja/Buruh karena alasan Pekerja/Buruh melakukan pelanggaran bersifat mendesak yang diatur dalam Perjanjian Kerja, Peraturan Perusahaan, atau Perjanjian Kerja Bersama maka Pekerja/Buruh berhak atas:
a. uang penggantian hak sesuai ketentuan Pasal 40 ayat (4);
b. uang pisah yang besarannya diatur dalam Perjanjian Kerja, Peraturan Perusahaan, atau Perjanjian Kerja Bersama.`
    },
    pasal_54: {
        judul: "Pasal 54 - Ditahan >6 Bulan",
        isi: `(1) Pengusaha dapat melakukan Pemutusan Hubungan Kerja terhadap Pekerja/Buruh karena alasan Pekerja/Buruh tidak dapat melakukan pekerjaan selama 6 (enam) bulan akibat ditahan pihak yang berwajib karena diduga melakukan tindak pidana sebagaimana dimaksud dalam Pasal 36 huruf l yang menyebabkan kerugian Perusahaan maka Pekerja/Buruh berhak atas:
a. uang penggantian hak sesuai ketentuan Pasal 40 ayat (4);
b. uang pisah yang besarannya diatur dalam Perjanjian Kerja, Peraturan Perusahaan, atau Perjanjian Kerja Bersama.

(2) Pengusaha dapat melakukan Pemutusan Hubungan Kerja terhadap Pekerja/Buruh karena alasan Pekerja/Buruh tidak dapat melakukan pekerjaan selama 6 (enam) bulan akibat ditahan pihak yang berwajib karena diduga melakukan tindak pidana sebagaimana dimaksud dalam Pasal 36 huruf l yang tidak menyebabkan kerugian Perusahaan maka Pekerja/Buruh berhak atas:
a. uang penghargaan masa kerja sebesar 1 (satu) kali ketentuan Pasal 40 ayat (3);
b. uang penggantian hak sesuai ketentuan Pasal 40 ayat (4).`
    },
    pasal_55: {
        judul: "Pasal 55 - Sakit Berkepanjangan >12 Bulan",
        isi: `(1) Pengusaha dapat melakukan Pemutusan Hubungan Kerja terhadap Pekerja/Buruh karena alasan Pekerja/Buruh mengalami sakit berkepanjangan atau cacat akibat kecelakaan kerja dan tidak dapat melakukan pekerjaannya setelah melampaui batas 12 (dua belas) bulan maka Pekerja/Buruh berhak atas:
a. uang pesangon sebesar 2 (dua) kali ketentuan Pasal 40 ayat (2);
b. uang penghargaan masa kerja sebesar 1 (satu) kali ketentuan Pasal 40 ayat (3);
c. uang penggantian hak sesuai ketentuan Pasal 40 ayat (4).

(2) Pekerja/Buruh dapat mengajukan Pemutusan Hubungan Kerja kepada Pengusaha karena alasan Pekerja/Buruh mengalami sakit berkepanjangan atau cacat akibat kecelakaan kerja dan tidak dapat melakukan pekerjaannya setelah melampaui batas 12 (dua belas) bulan maka Pekerja/Buruh berhak atas:
a. uang pesangon sebesar 2 (dua) kali ketentuan Pasal 40 ayat (2);
b. uang penghargaan masa kerja sebesar 1 (satu) kali ketentuan Pasal 40 ayat (3);
c. uang penggantian hak sesuai ketentuan Pasal 40 ayat (4).`
    },
    pasal_56: {
        judul: "Pasal 56 - Pensiun",
        isi: `Pengusaha dapat melakukan Pemutusan Hubungan Kerja terhadap Pekerja/Buruh karena alasan Pekerja/Buruh memasuki usia pensiun maka Pekerja/Buruh berhak atas:
a. uang pesangon sebesar 1,75 (satu koma tujuh puluh lima) kali ketentuan Pasal 40 ayat (2);
b. uang penghargaan masa kerja sebesar 1 (satu) kali ketentuan Pasal 40 ayat (3);
c. uang penggantian hak sesuai ketentuan Pasal 40 ayat (4).`
    },
    pasal_57: {
        judul: "Pasal 57 - Meninggal Dunia",
        isi: `Pemutusan Hubungan Kerja karena alasan Pekerja/Buruh meninggal dunia maka kepada ahli warisnya diberikan sejumlah uang yang perhitungannya sama dengan:
a. uang pesangon sebesar 2 (dua) kali ketentuan Pasal 40 ayat (2);
b. uang penghargaan masa kerja sebesar 1 (satu) kali ketentuan Pasal 40 ayat (3);
c. uang penggantian hak sesuai ketentuan Pasal 40 ayat (4).`
    },
    pasal_15_16: {
        judul: "Pasal 15 & 16 - Kompensasi PKWT",
        isi: `Pasal 15:
(1) Pengusaha wajib memberikan uang kompensasi kepada Pekerja/Buruh yang hubungan kerjanya berdasarkan PKWT.
(2) Pemberian uang kompensasi dilaksanakan pada saat berakhirnya PKWT.
(3) Uang kompensasi diberikan kepada Pekerja/Buruh yang telah mempunyai masa kerja paling sedikit 1 (satu) bulan secara terus menerus.

Pasal 16:
(1) Besaran uang kompensasi diberikan sesuai dengan ketentuan sebagai berikut:
    a. PKWT selama 12 (dua belas) bulan secara terus menerus, diberikan sebesar 1 (satu) bulan Upah;
    b. PKWT selama 1 (satu) bulan atau lebih tetapi kurang dari 12 (dua belas) bulan, dihitung secara proporsional dengan perhitungan: (masa kerja / 12) x 1 (satu) bulan Upah;
    c. PKWT selama lebih dari 12 (dua belas) bulan, dihitung secara proporsional dengan perhitungan: (masa kerja / 12) x 1 (satu) bulan Upah.
(2) Upah yang digunakan sebagai dasar perhitungan pembayaran uang kompensasi terdiri atas Upah pokok dan tunjangan tetap.`
    }
};

// ============================================================
// UTILITY FUNCTIONS
// ============================================================
function formatIDR(number) {
    if (isNaN(number) || number === null) return 'Rp 0';
    return 'Rp ' + number.toLocaleString('id-ID');
}

function parseCurrency(value) {
    if (!value) return 0;
    return parseInt(value.replace(/\./g, '').replace(/[^0-9]/g, '')) || 0;
}

function terbilang(angka) {
    const bilangan = ['', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan', 'Sepuluh', 'Sebelas'];
    if (angka < 12) return bilangan[angka];
    if (angka < 20) return bilangan[angka - 10] + ' Belas';
    if (angka < 100) return bilangan[Math.floor(angka / 10)] + ' Puluh ' + bilangan[angka % 10];
    if (angka < 200) return 'Seratus ' + terbilang(angka - 100);
    if (angka < 1000) return bilangan[Math.floor(angka / 100)] + ' Ratus ' + terbilang(angka % 100);
    if (angka < 2000) return 'Seribu ' + terbilang(angka - 1000);
    if (angka < 1000000) return terbilang(Math.floor(angka / 1000)) + ' Ribu ' + terbilang(angka % 1000);
    if (angka < 1000000000) return terbilang(Math.floor(angka / 1000000)) + ' Juta ' + terbilang(angka % 1000000);
    if (angka < 1000000000000) return terbilang(Math.floor(angka / 1000000000)) + ' Miliar ' + terbilang(angka % 1000000000);
    return '';
}

function formatTerbilang(angka) {
    if (angka === 0) return 'Nol Rupiah';
    return terbilang(angka).trim() + ' Rupiah';
}

// ============================================================
// CALCULATION FUNCTIONS
// ============================================================
function getUPBaseMultiplier(totalMonths) {
    const years = totalMonths / 12;
    if (years < 1) return 1;
    else if (years < 2) return 2;
    else if (years < 3) return 3;
    else if (years < 4) return 4;
    else if (years < 5) return 5;
    else if (years < 6) return 6;
    else if (years < 7) return 7;
    else if (years < 8) return 8;
    else return 9;
}

function getUPMKBaseMultiplier(totalMonths) {
    const years = totalMonths / 12;
    if (years < 3) return 0;
    else if (years < 6) return 2;
    else if (years < 9) return 3;
    else if (years < 12) return 4;
    else if (years < 15) return 5;
    else if (years < 18) return 6;
    else if (years < 21) return 7;
    else if (years < 24) return 8;
    else return 10;
}

function calculateUP(totalMonths, monthlyWage, phkMultiplier) {
    const baseMultiplier = getUPBaseMultiplier(totalMonths);
    const finalMultiplier = baseMultiplier * phkMultiplier;
    const years = totalMonths / 12;
    return { 
        amount: finalMultiplier * monthlyWage, 
        baseMultiplier: baseMultiplier, 
        phkMultiplier: phkMultiplier,
        finalMultiplier: finalMultiplier,
        years: years 
    };
}

function calculateUPMK(totalMonths, monthlyWage, phkMultiplier) {
    const baseMultiplier = getUPMKBaseMultiplier(totalMonths);
    const finalMultiplier = baseMultiplier * phkMultiplier;
    const years = totalMonths / 12;

    if (baseMultiplier === 0) {
        return { 
            amount: 0, 
            baseMultiplier: 0, 
            phkMultiplier: phkMultiplier,
            finalMultiplier: 0,
            years: years, 
            eligible: false 
        };
    }

    return { 
        amount: finalMultiplier * monthlyWage, 
        baseMultiplier: baseMultiplier, 
        phkMultiplier: phkMultiplier,
        finalMultiplier: finalMultiplier,
        years: years, 
        eligible: true 
    };
}

function calculateUPH(monthlyWage, remainingLeave) {
    // Pasal 33 ayat (1): 
    // 6 hari kerja/minggu → upah harian = upah bulanan / 25
    // 5 hari kerja/minggu → upah harian = upah bulanan / 21
    const divisor = 25;
    const dailyWage = monthlyWage / divisor;
    const leaveCompensation = remainingLeave * dailyWage;
    return { amount: leaveCompensation, leaveCompensation, remainingLeave, dailyWage, divisor };
}

function calculatePKWTCompensation(pkwtMonths, monthlyWage) {
    // Pasal 15 ayat (3): Minimal 1 bulan masa kerja secara terus menerus
    if (pkwtMonths < 1) {
        return { amount: 0, months: pkwtMonths, multiplier: 0, eligible: false };
    }
    const multiplier = pkwtMonths / 12;
    return { amount: multiplier * monthlyWage, months: pkwtMonths, multiplier, eligible: true };
}

// ============================================================
// DROPDOWN LOGIC
// ============================================================
function populateReasonDropdown(category) {
    const reasonSelect = document.getElementById('terminationReason');
    const subCategoryGroup = document.getElementById('subCategoryGroup');
    const reasonInfoPanel = document.getElementById('reasonInfoPanel');

    reasonSelect.innerHTML = '<option value="" disabled selected>Pilih alasan</option>';

    if (!category) {
        subCategoryGroup.style.display = 'none';
        reasonInfoPanel.style.display = 'none';
        return;
    }

    const categoryData = terminationData[category];
    if (!categoryData) return;

    Object.entries(categoryData.reasons).forEach(([key, data]) => {
        const option = document.createElement('option');
        option.value = key;
        option.textContent = data.label;
        reasonSelect.appendChild(option);
    });

    subCategoryGroup.style.display = 'block';
    reasonInfoPanel.style.display = 'none';
}

function showReasonInfo(reasonKey) {
    const reasonInfoPanel = document.getElementById('reasonInfoPanel');
    const reasonDescription = document.getElementById('reasonDescription');
    const reasonPasal = document.getElementById('reasonPasal');
    const reasonDetailPasal = document.getElementById('reasonDetailPasal');

    if (!reasonKey) {
        reasonInfoPanel.style.display = 'none';
        return;
    }

    let reasonData = null;
    for (const cat of Object.values(terminationData)) {
        if (cat.reasons[reasonKey]) {
            reasonData = cat.reasons[reasonKey];
            break;
        }
    }

    if (!reasonData) return;

    reasonDescription.textContent = reasonData.description;
    reasonPasal.textContent = reasonData.pasal;
    reasonDetailPasal.textContent = reasonData.detail_pasal;
    reasonInfoPanel.style.display = 'block';
}

// ============================================================
// MAIN CALCULATION
// ============================================================
function performCalculation() {
    const employeeName = document.getElementById('employeeName').value || '-';
    const position = document.getElementById('position').value || '-';
    const employmentStatus = document.getElementById('employmentStatus').value;
    const years = parseInt(document.getElementById('yearsOfService').value) || 0;
    const months = parseInt(document.getElementById('monthsOfService').value) || 0;
    const basicSalary = parseCurrency(document.getElementById('basicSalary').value);
    const fixedAllowance = parseCurrency(document.getElementById('fixedAllowance').value);
    const reasonKey = document.getElementById('terminationReason').value;
    const pkwtDuration = parseInt(document.getElementById('pkwtDuration').value) || 0;
    const remainingLeave = parseInt(document.getElementById('remainingLeave').value) || 0;
    const repatriationCost = parseCurrency(document.getElementById('repatriationCost').value);
    const otherUPH = parseCurrency(document.getElementById('otherUPH').value);
    const workDaysPerWeek = parseInt(document.getElementById('workDaysPerWeek').value) || 6;
    const minimumWageInput = parseCurrency(document.getElementById('minimumWage').value);
    const uangPisahAmount = parseCurrency(document.getElementById('uangPisahAmount').value);

    if (!employmentStatus) { alert('Pilih Status Kepegawaian.'); return; }
    if (!reasonKey) { alert('Pilih Alasan Terminasi.'); return; }
    if (basicSalary <= 0) { alert('Masukkan Gaji Pokok.'); return; }

    let reasonData = null;
    for (const cat of Object.values(terminationData)) {
        if (cat.reasons[reasonKey]) {
            reasonData = cat.reasons[reasonKey];
            break;
        }
    }
    if (!reasonData) { alert('Alasan tidak valid.'); return; }

    const totalMonths = (years * 12) + months;
    const rawMonthlyWage = basicSalary + fixedAllowance;
    const wageValidation = getMinimumWage(rawMonthlyWage, minimumWageInput);
    const monthlyWage = wageValidation.effectiveWage;

    let upResult = { amount: 0, baseMultiplier: 0, phkMultiplier: 0, finalMultiplier: 0, years: totalMonths / 12 };
    let upmkResult = { amount: 0, baseMultiplier: 0, phkMultiplier: 0, finalMultiplier: 0, years: totalMonths / 12, eligible: false };
    let uphResult = { amount: 0, leaveCompensation: 0, repatriationCost: 0, otherUPH: 0 };
    let pkwtResult = { amount: 0, months: 0, multiplier: 0 };
    let uangPisahResult = { amount: 0 };
    const notEligibleItems = [];

    if (reasonData.up) {
        upResult = calculateUP(totalMonths, monthlyWage, reasonData.up_multiplier);
    } else {
        notEligibleItems.push({
            name: 'Uang Pesangon (UP)',
            reason: 'Tidak berhak UP karena ' + reasonData.label.toLowerCase() + '.',
            pasal: reasonData.detail_pasal
        });
    }

    if (reasonData.upmk) {
        upmkResult = calculateUPMK(totalMonths, monthlyWage, reasonData.upmk_multiplier);
        if (!upmkResult.eligible) {
            notEligibleItems.push({
                name: 'Uang Penghargaan Masa Kerja (UPMK)',
                reason: 'Masa kerja kurang dari 3 tahun (' + (totalMonths/12).toFixed(1) + ' tahun).',
                pasal: 'Pasal 40 ayat (3) PP No. 35 Tahun 2021'
            });
        }
    } else {
        notEligibleItems.push({
            name: 'Uang Penghargaan Masa Kerja (UPMK)',
            reason: 'Tidak berhak UPMK karena ' + reasonData.label.toLowerCase() + '.',
            pasal: reasonData.detail_pasal
        });
    }

    if (reasonData.uph) {
        uphResult = calculateUPH(monthlyWage, remainingLeave, repatriationCost, otherUPH, workDaysPerWeek);
    } else {
        notEligibleItems.push({
            name: 'Uang Penggantian Hak (UPH)',
            reason: 'Tidak berhak UPH karena ' + reasonData.label.toLowerCase() + '.',
            pasal: reasonData.detail_pasal
        });
    }

    if (reasonData.pkwt && employmentStatus === 'PKWT') {
        pkwtResult = calculatePKWTCompensation(pkwtDuration, monthlyWage);
    }

    if (reasonData.uang_pisah) {
        uangPisahResult = { amount: uangPisahAmount };
    }

    const totalAmount = upResult.amount + upmkResult.amount + uphResult.amount + pkwtResult.amount + uangPisahResult.amount;

    displayResults({
        employeeName, position, employmentStatus, years, months, totalMonths,
        monthlyWage, basicSalary, fixedAllowance, reasonData,
        upResult, upmkResult, uphResult, pkwtResult, uangPisahResult,
        totalAmount, notEligibleItems, wageValidation, workDaysPerWeek
    });
}

// ============================================================
// BUILD LAMPIRAN
// ============================================================
function buildLampiran(reasonData) {
    const lampiranContent = document.getElementById('lampiranContent');

    let relevantPasals = ['pasal_36', 'pasal_40'];

    const pasalMap = {
        'Pasal 41': 'pasal_41', 'Pasal 42': 'pasal_42', 'Pasal 43': 'pasal_43',
        'Pasal 44': 'pasal_44', 'Pasal 45': 'pasal_45', 'Pasal 46': 'pasal_46',
        'Pasal 47': 'pasal_47', 'Pasal 48': 'pasal_48', 'Pasal 49': 'pasal_49',
        'Pasal 50': 'pasal_50', 'Pasal 51': 'pasal_51', 'Pasal 52': 'pasal_52',
        'Pasal 54': 'pasal_54', 'Pasal 55': 'pasal_55', 'Pasal 56': 'pasal_56',
        'Pasal 57': 'pasal_57', 'Pasal 15': 'pasal_15_16'
    };

    for (const [key, value] of Object.entries(pasalMap)) {
        if (reasonData.detail_pasal.includes(key)) {
            if (!relevantPasals.includes(value)) {
                relevantPasals.push(value);
            }
        }
    }

    let html = '';
    relevantPasals.forEach(pasalKey => {
        const pasal = lampiranHukum[pasalKey];
        if (pasal) {
            html += '<div class="lampiran-pasal">' +
                '<div class="lampiran-pasal-title">' + pasal.judul + '</div>' +
                '<div class="lampiran-pasal-content">' + pasal.isi.replace(/\n/g, '<br>') + '</div>' +
                '</div>';
        }
    });

    lampiranContent.innerHTML = html;
}

// ============================================================
// DISPLAY RESULTS
// ============================================================
function displayResults(data) {
    document.getElementById('formSection').style.display = 'none';
    document.getElementById('resultSection').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const now = new Date();
    document.getElementById('resultDate').textContent = now.toLocaleDateString('id-ID', { 
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });

    const statusLabel = data.employmentStatus === 'PKWTT' ? 'PKWTT - Tetap' : 'PKWT - Kontrak';
    let summaryHTML = 
        '<h4>Ringkasan Karyawan</h4>' +
        '<div class="summary-grid">' +
        '<div class="summary-item"><span class="summary-label">Nama</span><span class="summary-value">' + data.employeeName + '</span></div>' +
        '<div class="summary-item"><span class="summary-label">Jabatan</span><span class="summary-value">' + data.position + '</span></div>' +
        '<div class="summary-item"><span class="summary-label">Status</span><span class="summary-value">' + statusLabel + '</span></div>' +
        '<div class="summary-item"><span class="summary-label">Masa Kerja</span><span class="summary-value">' + data.years + ' th ' + data.months + ' bln (' + (data.totalMonths/12).toFixed(1) + ' th)</span></div>' +
        '<div class="summary-item"><span class="summary-label">Gaji Pokok</span><span class="summary-value">' + formatIDR(data.basicSalary) + '</span></div>' +
        '<div class="summary-item"><span class="summary-label">Tunjangan</span><span class="summary-value">' + formatIDR(data.fixedAllowance) + '</span></div>';

    // Tampilkan info validasi upah minimum jika digunakan
    if (data.wageValidation && data.wageValidation.isUsingMinimum) {
        summaryHTML += '<div class="summary-item"><span class="summary-label">Upah Asli</span><span class="summary-value" style="text-decoration:line-through;color:#999;">' + formatIDR(data.wageValidation.originalWage) + '</span></div>' +
            '<div class="summary-item"><span class="summary-label">Upah Efektif (UMP)</span><span class="summary-value" style="color:#e85d4e;">' + formatIDR(data.wageValidation.effectiveWage) + '</span></div>';
    } else {
        summaryHTML += '<div class="summary-item"><span class="summary-label">Upah/Bulan</span><span class="summary-value">' + formatIDR(data.monthlyWage) + '</span></div>';
    }

    summaryHTML += '<div class="summary-item"><span class="summary-label">Hari Kerja</span><span class="summary-value">' + data.workDaysPerWeek + ' hari/minggu</span></div>' +
        '<div class="summary-item"><span class="summary-label">Alasan</span><span class="summary-value">' + data.reasonData.label + '</span></div>' +
        '</div>';

    document.getElementById('employeeSummary').innerHTML = summaryHTML;

    // UP
    const upSection = document.getElementById('upSection');
    if (data.upResult.amount > 0) {
        upSection.style.display = 'block';
        document.getElementById('upAmount').textContent = formatIDR(data.upResult.amount);
        document.getElementById('upExplanation').innerHTML = 
            'Masa kerja <strong>' + data.upResult.years.toFixed(1) + ' tahun</strong> = <strong>' + data.upResult.baseMultiplier + ' bulan upah</strong> (Pasal 40 ayat 2).<br>' +
            'Jenis PHK = <strong>' + data.upResult.phkMultiplier + 'x</strong> (' + data.reasonData.detail_pasal + ').<br>' +
            'Perhitungan: ' + data.upResult.baseMultiplier + ' x ' + data.upResult.phkMultiplier + ' = <strong>' + data.upResult.finalMultiplier.toFixed(2) + ' bulan upah</strong>.<br>' +
            data.upResult.finalMultiplier.toFixed(2) + ' x ' + formatIDR(data.monthlyWage) + ' = <strong>' + formatIDR(data.upResult.amount) + '</strong>';
    } else { upSection.style.display = 'none'; }

    // UPMK
    const upmkSection = document.getElementById('upmkSection');
    if (data.upmkResult.amount > 0) {
        upmkSection.style.display = 'block';
        document.getElementById('upmkAmount').textContent = formatIDR(data.upmkResult.amount);
        document.getElementById('upmkExplanation').innerHTML = 
            'Masa kerja <strong>' + data.upmkResult.years.toFixed(1) + ' tahun</strong> = <strong>' + data.upmkResult.baseMultiplier + ' bulan upah</strong> (Pasal 40 ayat 3).<br>' +
            'Jenis PHK = <strong>' + data.upmkResult.phkMultiplier + 'x</strong> (' + data.reasonData.detail_pasal + ').<br>' +
            'Perhitungan: ' + data.upmkResult.baseMultiplier + ' x ' + data.upmkResult.phkMultiplier + ' = <strong>' + data.upmkResult.finalMultiplier.toFixed(2) + ' bulan upah</strong>.<br>' +
            data.upmkResult.finalMultiplier.toFixed(2) + ' x ' + formatIDR(data.monthlyWage) + ' = <strong>' + formatIDR(data.upmkResult.amount) + '</strong>';
    } else { upmkSection.style.display = 'none'; }

    // UPH
    const uphSection = document.getElementById('uphResultSection');
    if (data.uphResult.amount > 0 || data.reasonData.uph) {
        uphSection.style.display = 'block';
        document.getElementById('uphAmount').textContent = formatIDR(data.uphResult.amount);
        let uphHTML = '<p style="font-size:12px;color:#6b6b69;margin-bottom:8px;">Upah harian = ' + formatIDR(data.monthlyWage) + ' / ' + data.uphResult.divisor + ' hari = ' + formatIDR(data.uphResult.dailyWage) + ' (Pasal 33 ayat 1, ' + data.workDaysPerWeek + ' hari kerja/minggu)</p>';
        if (data.uphResult.remainingLeave > 0) {
            uphHTML += '<div class="uph-breakdown-item"><span class="uph-breakdown-label">Cuti terhutang (' + data.uphResult.remainingLeave + ' hari x ' + formatIDR(data.uphResult.dailyWage) + ')</span><span class="uph-breakdown-value">' + formatIDR(data.uphResult.leaveCompensation) + '</span></div>';
        }
        if (data.uphResult.repatriationCost > 0) {
            uphHTML += '<div class="uph-breakdown-item"><span class="uph-breakdown-label">Ongkos pulang</span><span class="uph-breakdown-value">' + formatIDR(data.uphResult.repatriationCost) + '</span></div>';
        }
        if (data.uphResult.otherUPH > 0) {
            uphHTML += '<div class="uph-breakdown-item"><span class="uph-breakdown-label">Lainnya (PK/PKB)</span><span class="uph-breakdown-value">' + formatIDR(data.uphResult.otherUPH) + '</span></div>';
        }
        if (uphHTML === '') uphHTML = '<p style="font-size:13px;color:#6b6b69;"><em>Tidak ada komponen UPH yang diisi.</em></p>';
        document.getElementById('uphBreakdown').innerHTML = uphHTML;
    } else { uphSection.style.display = 'none'; }

    // PKWT
    const pkwtSection = document.getElementById('pkwtSection');
    if (data.pkwtResult.amount > 0) {
        pkwtSection.style.display = 'block';
        document.getElementById('pkwtAmount').textContent = formatIDR(data.pkwtResult.amount);
        document.getElementById('pkwtExplanation').innerHTML = 
            'Masa kontrak <strong>' + data.pkwtResult.months + ' bulan</strong> -> <strong>' + data.pkwtResult.multiplier.toFixed(2) + ' bulan upah</strong>.<br>' +
            '(' + data.pkwtResult.months + '/12) x ' + formatIDR(data.monthlyWage) + ' = <strong>' + formatIDR(data.pkwtResult.amount) + '</strong>';
    } else { pkwtSection.style.display = 'none'; }

    // UANG PISAH
    const uangPisahSection = document.getElementById('uangPisahSection');
    if (data.uangPisahResult.amount > 0) {
        uangPisahSection.style.display = 'block';
        document.getElementById('uangPisahAmountDisplay').textContent = formatIDR(data.uangPisahResult.amount);
        document.getElementById('uangPisahExplanation').innerHTML = 
            'Uang pisah sesuai ketentuan <strong>Perjanjian Kerja / Peraturan Perusahaan / Perjanjian Kerja Bersama</strong>.<br>' +
            'Jumlah: <strong>' + formatIDR(data.uangPisahResult.amount) + '</strong>';
    } else { uangPisahSection.style.display = 'none'; }

    // NOT ELIGIBLE
    const notEligibleSection = document.getElementById('notEligibleSection');
    if (data.notEligibleItems.length > 0) {
        notEligibleSection.style.display = 'block';
        let neHTML = '';
        data.notEligibleItems.forEach(function(item) {
            neHTML += '<li><strong>' + item.name + '</strong><small>' + item.reason + '</small><small style="display:block;color:#999;margin-top:2px;">' + item.pasal + '</small></li>';
        });
        document.getElementById('notEligibleList').innerHTML = neHTML;
    } else { notEligibleSection.style.display = 'none'; }

    // TOTAL
    document.getElementById('totalAmount').textContent = formatIDR(data.totalAmount);
    document.getElementById('totalTerbilang').textContent = formatTerbilang(data.totalAmount);

    // BUILD LAMPIRAN
    buildLampiran(data.reasonData);
}

// ============================================================
// EVENT LISTENERS
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    // Currency formatting
    document.querySelectorAll('.currency-input').forEach(function(input) {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\./g, '').replace(/[^0-9]/g, '');
            e.target.value = value ? parseInt(value).toLocaleString('id-ID') : '';
        });
    });

    // Employment status
    document.getElementById('employmentStatus').addEventListener('change', function() {
        const pkwtGroup = document.getElementById('pkwtDurationGroup');
        if (this.value === 'PKWT') {
            pkwtGroup.style.display = 'block';
            document.getElementById('pkwtDuration').required = true;
        } else {
            pkwtGroup.style.display = 'none';
            document.getElementById('pkwtDuration').required = false;
            document.getElementById('pkwtDuration').value = '';
        }
    });

    // Category change
    document.getElementById('terminationCategory').addEventListener('change', function() {
        populateReasonDropdown(this.value);
        document.getElementById('reasonInfoPanel').style.display = 'none';
        document.getElementById('uangPisahGroup').style.display = 'none';
    });

    // Reason change
    document.getElementById('terminationReason').addEventListener('change', function() {
        showReasonInfo(this.value);

        let reasonData = null;
        for (const cat of Object.values(terminationData)) {
            if (cat.reasons[this.value]) {
                reasonData = cat.reasons[this.value];
                break;
            }
        }
        const uangPisahGroup = document.getElementById('uangPisahGroup');
        if (reasonData && reasonData.uang_pisah) {
            uangPisahGroup.style.display = 'block';
        } else {
            uangPisahGroup.style.display = 'none';
            document.getElementById('uangPisahAmount').value = '';
        }
    });

    // Calculate
    document.getElementById('calculateBtn').addEventListener('click', performCalculation);

    // Reset
    document.getElementById('resetBtn').addEventListener('click', function() {
        document.querySelectorAll('input').forEach(function(el) { el.value = ''; });
        document.querySelectorAll('select').forEach(function(el) { 
            if (el.id === 'workDaysPerWeek') {
                el.value = '6';
            } else {
                el.value = ''; 
            }
        });
        document.getElementById('pkwtDurationGroup').style.display = 'none';
        document.getElementById('uangPisahGroup').style.display = 'none';
        document.getElementById('subCategoryGroup').style.display = 'none';
        document.getElementById('reasonInfoPanel').style.display = 'none';
        document.getElementById('terminationReason').innerHTML = '<option value="" disabled selected>Pilih alasan</option>';
    });

    // Recalculate
    document.getElementById('recalculateBtn').addEventListener('click', function() {
        document.getElementById('resultSection').style.display = 'none';
        document.getElementById('formSection').style.display = 'block';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Print
    document.getElementById('printBtn').addEventListener('click', function() {
        window.print();
    });
});
