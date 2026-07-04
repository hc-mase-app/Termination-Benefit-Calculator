/* ============================================
   Termination Benefit Calculator - Logic
   Based on PP No. 35 Tahun 2021
   ============================================ */

// Data: Alasan Terminasi (Dropdown Bertingkat)
const terminationData = {
    phk_perusahaan: {
        label: "PHK oleh Perusahaan",
        reasons: {
            phk_merger: { 
                label: "Merger / Konsolidasi / Fusi", 
                pasal: "Pasal 36 ayat (1) huruf a",
                up: true, upmk: true, uph: true, pkwt: false,
                description: "Pekerja menolak dilanjutkan hubungan kerjanya dengan perusahaan penerus."
            },
            phk_akuisisi: { 
                label: "Akuisisi Perusahaan", 
                pasal: "Pasal 36 ayat (1) huruf b",
                up: true, upmk: true, uph: true, pkwt: false,
                description: "Pekerja menolak dilanjutkan hubungan kerjanya oleh perusahaan penerus."
            },
            phk_efisiensi: { 
                label: "Efisiensi Perusahaan", 
                pasal: "Pasal 36 ayat (1) huruf c",
                up: true, upmk: true, uph: true, pkwt: false,
                description: "Perusahaan melakukan efisiensi untuk menjaga kelangsungan usaha."
            },
            phk_tutup: { 
                label: "Penutupan Perusahaan", 
                pasal: "Pasal 36 ayat (1) huruf d",
                up: true, upmk: true, uph: true, pkwt: false,
                description: "Penutupan perusahaan yang bukan karena rugi 2 tahun berturut-turut."
            },
            phk_tutup_rugi: { 
                label: "Tutup karena Rugi 2 Tahun", 
                pasal: "Pasal 36 ayat (1) huruf e",
                up: true, upmk: true, uph: true, pkwt: false,
                description: "Penutupan perusahaan karena rugi 2 tahun berturut-turut."
            },
            phk_force_majeure: { 
                label: "Force Majeure", 
                pasal: "Pasal 36 ayat (1) huruf f",
                up: true, upmk: true, uph: true, pkwt: false,
                description: "Perusahaan tutup karena keadaan memaksa (force majeure)."
            },
            phk_penundaan: { 
                label: "Penundaan Kewajiban Pembayaran Utang (PKPU)", 
                pasal: "Pasal 36 ayat (1) huruf g",
                up: true, upmk: true, uph: true, pkwt: false,
                description: "Perusahaan dalam penundaan kewajiban pembayaran utang."
            },
            phk_pailit: { 
                label: "Pailit", 
                pasal: "Pasal 36 ayat (1) huruf h",
                up: true, upmk: true, uph: true, pkwt: false,
                description: "Perusahaan dinyatakan pailit."
            },
            phk_sakit: { 
                label: "Sakit > 12 Bulan", 
                pasal: "Pasal 36 ayat (1) huruf i",
                up: true, upmk: true, uph: true, pkwt: false,
                description: "Pekerja sakit lebih dari 12 bulan berturut-turut."
            },
            phk_ditahan: { 
                label: "Ditahan > 6 Bulan", 
                pasal: "Pasal 36 ayat (1) huruf j",
                up: true, upmk: true, uph: true, pkwt: false,
                description: "Pekerja ditahan oleh pihak berwenang lebih dari 6 bulan."
            },
            phk_kesalahan_berat: { 
                label: "Kesalahan Berat", 
                pasal: "Pasal 36 ayat (1) huruf k",
                up: true, upmk: true, uph: true, pkwt: false,
                description: "Pekerja melakukan kesalahan berat setelah peringatan tertulis 3x."
            },
            phk_pelanggaran_pkb: { 
                label: "Pelanggaran Ketentuan PKB", 
                pasal: "Pasal 36 ayat (1) huruf l",
                up: true, upmk: true, uph: true, pkwt: false,
                description: "Pekerja melanggar ketentuan PKB setelah peringatan tertulis 3x."
            },
            phk_tidak_masuk: { 
                label: "Tidak Masuk > 5 Hari Kerja", 
                pasal: "Pasal 36 ayat (1) huruf m",
                up: true, upmk: true, uph: true, pkwt: false,
                description: "Pekerja tidak masuk kerja > 5 hari berturut-turut tanpa keterangan."
            }
        }
    },
    phk_pekerja: {
        label: "PHK oleh Pekerja",
        reasons: {
            phk_pekerja_kekerasan: { 
                label: "Kekerasan / Ancaman / Intimidasi", 
                pasal: "Pasal 37 ayat (2) huruf a",
                up: true, upmk: true, uph: true, pkwt: false,
                description: "Pengusaha melakukan kekerasan, ancaman, atau intimidasi."
            },
            phk_pekerja_upah: { 
                label: "Upah Tidak Dibayar > 3 Bulan", 
                pasal: "Pasal 37 ayat (2) huruf b",
                up: true, upmk: true, uph: true, pkwt: false,
                description: "Upah tidak dibayar selama lebih dari 3 bulan."
            },
            phk_pekerja_kewajiban: { 
                label: "Pengusaha Tidak Menjalankan Kewajiban", 
                pasal: "Pasal 37 ayat (2) huruf c",
                up: true, upmk: true, uph: true, pkwt: false,
                description: "Pengusaha tidak menjalankan kewajiban sesuai PK/PKB/Perjanjian."
            },
            phk_pekerja_luar_pk: { 
                label: "Disuruh Kerja di Luar PK", 
                pasal: "Pasal 37 ayat (2) huruf d",
                up: true, upmk: true, uph: true, pkwt: false,
                description: "Pekerja disuruh kerja di luar PK tanpa persetujuan."
            }
        }
    },
    berakhir: {
        label: "Berakhirnya Hubungan Kerja",
        reasons: {
            meninggal: { 
                label: "Meninggal Dunia", 
                pasal: "Pasal 37 ayat (1) huruf a",
                up: true, upmk: true, uph: true, pkwt: false,
                description: "Pekerja meninggal dunia. Hak diterima oleh ahli waris."
            },
            habis_kontrak: { 
                label: "Habis Masa Kerja (PKWT)", 
                pasal: "Pasal 37 ayat (1) huruf b",
                up: false, upmk: false, uph: false, pkwt: true,
                description: "Hubungan kerja berakhir karena habis masa kerja PKWT."
            },
            resign: { 
                label: "Mengundurkan Diri", 
                pasal: "Pasal 37 ayat (1) huruf c",
                up: false, upmk: true, uph: true, pkwt: false,
                description: "Pekerja mengundurkan diri. Tidak berhak UP."
            },
            pensiun: { 
                label: "Pensiun", 
                pasal: "Pasal 37 ayat (1) huruf d",
                up: false, upmk: true, uph: true, pkwt: false,
                description: "Pekerja mencapai usia pensiun. Tidak berhak UP."
            }
        }
    }
};

// Data: Referensi Hukum
const legalReferences = {
    up: {
        pasal: "Pasal 40 dan Pasal 41",
        text: "UP diberikan kepada pekerja yang di-PHK oleh pengusaha. Jumlah: <1 th=1x, 1-<2 th=2x, 2-<3 th=3x, 3-<4 th=4x, 4-<5 th=5x, 5-<6 th=6x, 6-<7 th=7x, 7-<8 th=8x, ≥8 th=9x upah."
    },
    upmk: {
        pasal: "Pasal 42 dan Pasal 43",
        text: "UPMK diberikan sebagai penghargaan atas kontribusi. Minimal 3 tahun masa kerja. 3-<6 th=2x, 6-<9 th=3x, 9-<12 th=4x, 12-<15 th=5x, 15-<18 th=6x, 18-<21 th=7x, 21-<24 th=8x, ≥24 th=10x upah."
    },
    uph: {
        pasal: "Pasal 44 dan Pasal 45",
        text: "UPH meliputi: (1) cuti tahunan yang belum diambil, (2) ongkos pulang ke tempat asal, (3) hal lain sesuai PK/PKB/Perjanjian."
    },
    pkwt: {
        pasal: "Pasal 15",
        text: "Kompensasi PKWT dihitung proporsional: (masa kerja PKWT dalam bulan / 12) × 1 bulan upah."
    }
};

// Utility Functions
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

// Calculation Functions
function calculateUP(totalMonths, monthlyWage) {
    const years = totalMonths / 12;
    let multiplier = 0;
    if (years < 1) multiplier = 1;
    else if (years < 2) multiplier = 2;
    else if (years < 3) multiplier = 3;
    else if (years < 4) multiplier = 4;
    else if (years < 5) multiplier = 5;
    else if (years < 6) multiplier = 6;
    else if (years < 7) multiplier = 7;
    else if (years < 8) multiplier = 8;
    else multiplier = 9;
    return { amount: multiplier * monthlyWage, multiplier, years };
}

function calculateUPMK(totalMonths, monthlyWage) {
    const years = totalMonths / 12;
    let multiplier = 0;
    if (years < 3) return { amount: 0, multiplier: 0, years, eligible: false };
    else if (years < 6) multiplier = 2;
    else if (years < 9) multiplier = 3;
    else if (years < 12) multiplier = 4;
    else if (years < 15) multiplier = 5;
    else if (years < 18) multiplier = 6;
    else if (years < 21) multiplier = 7;
    else if (years < 24) multiplier = 8;
    else multiplier = 10;
    return { amount: multiplier * monthlyWage, multiplier, years, eligible: true };
}

function calculateUPH(monthlyWage, remainingLeave, repatriationCost, otherUPH) {
    const dailyWage = monthlyWage / 25;
    const leaveCompensation = remainingLeave * dailyWage;
    const totalUPH = leaveCompensation + repatriationCost + otherUPH;
    return { amount: totalUPH, leaveCompensation, repatriationCost, otherUPH, remainingLeave, dailyWage };
}

function calculatePKWTCompensation(pkwtMonths, monthlyWage) {
    const multiplier = pkwtMonths / 12;
    return { amount: multiplier * monthlyWage, months: pkwtMonths, multiplier };
}

// Dropdown Logic
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
    reasonInfoPanel.style.display = 'block';
}

// Main Calculation
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
    const monthlyWage = basicSalary + fixedAllowance;

    let upResult = { amount: 0, multiplier: 0, years: totalMonths / 12 };
    let upmkResult = { amount: 0, multiplier: 0, years: totalMonths / 12, eligible: false };
    let uphResult = { amount: 0, leaveCompensation: 0, repatriationCost: 0, otherUPH: 0 };
    let pkwtResult = { amount: 0, months: 0, multiplier: 0 };
    const notEligibleItems = [];

    if (reasonData.up) {
        upResult = calculateUP(totalMonths, monthlyWage);
    } else {
        notEligibleItems.push({
            name: 'Uang Pesangon (UP)',
            reason: `Tidak berhak UP karena ${reasonData.label.toLowerCase()}.`,
            pasal: reasonData.pasal
        });
    }

    if (reasonData.upmk) {
        upmkResult = calculateUPMK(totalMonths, monthlyWage);
        if (!upmkResult.eligible) {
            notEligibleItems.push({
                name: 'Uang Penghargaan Masa Kerja (UPMK)',
                reason: `Masa kerja kurang dari 3 tahun (${(totalMonths/12).toFixed(1)} tahun).`,
                pasal: legalReferences.upmk.pasal
            });
        }
    } else {
        notEligibleItems.push({
            name: 'Uang Penghargaan Masa Kerja (UPMK)',
            reason: `Tidak berhak UPMK karena ${reasonData.label.toLowerCase()}.`,
            pasal: reasonData.pasal
        });
    }

    if (reasonData.uph) {
        uphResult = calculateUPH(monthlyWage, remainingLeave, repatriationCost, otherUPH);
    } else {
        notEligibleItems.push({
            name: 'Uang Penggantian Hak (UPH)',
            reason: `Tidak berhak UPH karena ${reasonData.label.toLowerCase()}.`,
            pasal: reasonData.pasal
        });
    }

    if (reasonData.pkwt && employmentStatus === 'PKWT') {
        pkwtResult = calculatePKWTCompensation(pkwtDuration, monthlyWage);
    }

    const totalAmount = upResult.amount + upmkResult.amount + uphResult.amount + pkwtResult.amount;

    displayResults({
        employeeName, position, employmentStatus, years, months, totalMonths,
        monthlyWage, basicSalary, fixedAllowance, reasonData,
        upResult, upmkResult, uphResult, pkwtResult, totalAmount, notEligibleItems
    });
}

// Display Results
function displayResults(data) {
    document.getElementById('formSection').style.display = 'none';
    document.getElementById('resultSection').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const now = new Date();
    document.getElementById('resultDate').textContent = now.toLocaleDateString('id-ID', { 
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });

    const statusLabel = data.employmentStatus === 'PKWTT' ? 'PKWTT — Tetap' : 'PKWT — Kontrak';
    document.getElementById('employeeSummary').innerHTML = `
        <h4>Ringkasan Karyawan</h4>
        <div class="summary-grid">
            <div class="summary-item"><span class="summary-label">Nama</span><span class="summary-value">${data.employeeName}</span></div>
            <div class="summary-item"><span class="summary-label">Jabatan</span><span class="summary-value">${data.position}</span></div>
            <div class="summary-item"><span class="summary-label">Status</span><span class="summary-value">${statusLabel}</span></div>
            <div class="summary-item"><span class="summary-label">Masa Kerja</span><span class="summary-value">${data.years} th ${data.months} bln (${(data.totalMonths/12).toFixed(1)} th)</span></div>
            <div class="summary-item"><span class="summary-label">Gaji Pokok</span><span class="summary-value">${formatIDR(data.basicSalary)}</span></div>
            <div class="summary-item"><span class="summary-label">Tunjangan</span><span class="summary-value">${formatIDR(data.fixedAllowance)}</span></div>
            <div class="summary-item"><span class="summary-label">Upah/Bulan</span><span class="summary-value">${formatIDR(data.monthlyWage)}</span></div>
            <div class="summary-item"><span class="summary-label">Alasan</span><span class="summary-value">${data.reasonData.label}</span></div>
        </div>
    `;

    // UP
    const upSection = document.getElementById('upSection');
    if (data.upResult.amount > 0) {
        upSection.style.display = 'block';
        document.getElementById('upAmount').textContent = formatIDR(data.upResult.amount);
        document.getElementById('upExplanation').innerHTML = `
            Masa kerja <strong>${data.upResult.years.toFixed(1)} tahun</strong> → <strong>${data.upResult.multiplier} bulan upah</strong>.<br>
            ${data.upResult.multiplier} × ${formatIDR(data.monthlyWage)} = <strong>${formatIDR(data.upResult.amount)}</strong>
        `;
        document.getElementById('upReference').innerHTML = `
            <div class="ref-pasal">${legalReferences.up.pasal} PP No. 35 Tahun 2021</div>
            <div class="ref-text">${legalReferences.up.text}</div>
        `;
    } else { upSection.style.display = 'none'; }

    // UPMK
    const upmkSection = document.getElementById('upmkSection');
    if (data.upmkResult.amount > 0) {
        upmkSection.style.display = 'block';
        document.getElementById('upmkAmount').textContent = formatIDR(data.upmkResult.amount);
        document.getElementById('upmkExplanation').innerHTML = `
            Masa kerja <strong>${data.upmkResult.years.toFixed(1)} tahun</strong> → <strong>${data.upmkResult.multiplier} bulan upah</strong>.<br>
            ${data.upmkResult.multiplier} × ${formatIDR(data.monthlyWage)} = <strong>${formatIDR(data.upmkResult.amount)}</strong>
        `;
        document.getElementById('upmkReference').innerHTML = `
            <div class="ref-pasal">${legalReferences.upmk.pasal} PP No. 35 Tahun 2021</div>
            <div class="ref-text">${legalReferences.upmk.text}</div>
        `;
    } else { upmkSection.style.display = 'none'; }

    // UPH
    const uphSection = document.getElementById('uphResultSection');
    if (data.uphResult.amount > 0 || data.reasonData.uph) {
        uphSection.style.display = 'block';
        document.getElementById('uphAmount').textContent = formatIDR(data.uphResult.amount);
        let uphHTML = '';
        if (data.uphResult.remainingLeave > 0) {
            uphHTML += `<div class="uph-breakdown-item"><span class="uph-breakdown-label">Cuti terhutang (${data.uphResult.remainingLeave} hari × ${formatIDR(data.uphResult.dailyWage)})</span><span class="uph-breakdown-value">${formatIDR(data.uphResult.leaveCompensation)}</span></div>`;
        }
        if (data.uphResult.repatriationCost > 0) {
            uphHTML += `<div class="uph-breakdown-item"><span class="uph-breakdown-label">Ongkos pulang</span><span class="uph-breakdown-value">${formatIDR(data.uphResult.repatriationCost)}</span></div>`;
        }
        if (data.uphResult.otherUPH > 0) {
            uphHTML += `<div class="uph-breakdown-item"><span class="uph-breakdown-label">Lainnya</span><span class="uph-breakdown-value">${formatIDR(data.uphResult.otherUPH)}</span></div>`;
        }
        if (uphHTML === '') uphHTML = '<p style="font-size:13px;color:#6b6b69;"><em>Tidak ada komponen UPH yang diisi.</em></p>';
        document.getElementById('uphBreakdown').innerHTML = uphHTML;
        document.getElementById('uphReference').innerHTML = `
            <div class="ref-pasal">${legalReferences.uph.pasal} PP No. 35 Tahun 2021</div>
            <div class="ref-text">${legalReferences.uph.text}</div>
        `;
    } else { uphSection.style.display = 'none'; }

    // PKWT
    const pkwtSection = document.getElementById('pkwtSection');
    if (data.pkwtResult.amount > 0) {
        pkwtSection.style.display = 'block';
        document.getElementById('pkwtAmount').textContent = formatIDR(data.pkwtResult.amount);
        document.getElementById('pkwtExplanation').innerHTML = `
            Masa kontrak <strong>${data.pkwtResult.months} bulan</strong> → <strong>${data.pkwtResult.multiplier.toFixed(2)} bulan upah</strong>.<br>
            (${data.pkwtResult.months}/12) × ${formatIDR(data.monthlyWage)} = <strong>${formatIDR(data.pkwtResult.amount)}</strong>
        `;
        document.getElementById('pkwtReference').innerHTML = `
            <div class="ref-pasal">${legalReferences.pkwt.pasal} PP No. 35 Tahun 2021</div>
            <div class="ref-text">${legalReferences.pkwt.text}</div>
        `;
    } else { pkwtSection.style.display = 'none'; }

    // Not Eligible
    const notEligibleSection = document.getElementById('notEligibleSection');
    if (data.notEligibleItems.length > 0) {
        notEligibleSection.style.display = 'block';
        document.getElementById('notEligibleList').innerHTML = data.notEligibleItems.map(item => `
            <li><strong>${item.name}</strong><small>${item.reason}</small><small style="display:block;color:#999;margin-top:2px;">${item.pasal}</small></li>
        `).join('');
    } else { notEligibleSection.style.display = 'none'; }

    // Total
    document.getElementById('totalAmount').textContent = formatIDR(data.totalAmount);
    document.getElementById('totalTerbilang').textContent = formatTerbilang(data.totalAmount);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Currency formatting
    document.querySelectorAll('.currency-input').forEach(input => {
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
    });

    // Reason change
    document.getElementById('terminationReason').addEventListener('change', function() {
        showReasonInfo(this.value);
    });

    // Calculate
    document.getElementById('calculateBtn').addEventListener('click', performCalculation);

    // Reset
    document.getElementById('resetBtn').addEventListener('click', function() {
        document.querySelectorAll('input, select').forEach(el => { el.value = ''; });
        document.getElementById('pkwtDurationGroup').style.display = 'none';
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
