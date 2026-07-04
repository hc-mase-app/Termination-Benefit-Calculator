/* ============================================
   Kalkulator PHK - Simplified
   Based on PP No. 35 Tahun 2021
   ============================================ */

// ============================================================
// DATA: ALASAN TERMINASI
// ============================================================
const terminationData = {
    phk_perusahaan: {
        label: "PHK oleh Perusahaan",
        reasons: {
            phk_merger: {
                label: "Merger / Peleburan / Penggabungan / Pemisahan",
                up: true, upmk: true, uph: true,
                up_multiplier: 1.0, upmk_multiplier: 1.0,
                detail_pasal: "Pasal 41 PP No. 35 Tahun 2021"
            },
            phk_akuisisi: {
                label: "Akuisisi / Pengambilalihan",
                up: true, upmk: true, uph: true,
                up_multiplier: 0.5, upmk_multiplier: 1.0,
                detail_pasal: "Pasal 42 ayat (2) PP No. 35 Tahun 2021"
            },
            phk_efisiensi_rugi: {
                label: "Efisiensi (Karena Rugi)",
                up: true, upmk: true, uph: true,
                up_multiplier: 0.5, upmk_multiplier: 1.0,
                detail_pasal: "Pasal 43 ayat (1) PP No. 35 Tahun 2021"
            },
            phk_efisiensi_cegah_rugi: {
                label: "Efisiensi (Cegah Rugi)",
                up: true, upmk: true, uph: true,
                up_multiplier: 1.0, upmk_multiplier: 1.0,
                detail_pasal: "Pasal 43 ayat (2) PP No. 35 Tahun 2021"
            },
            phk_tutup_rugi_2th: {
                label: "Penutupan (Rugi 2 Tahun)",
                up: true, upmk: true, uph: true,
                up_multiplier: 0.5, upmk_multiplier: 1.0,
                detail_pasal: "Pasal 44 ayat (1) PP No. 35 Tahun 2021"
            },
            phk_tutup_bukan_rugi: {
                label: "Penutupan (Bukan Karena Rugi)",
                up: true, upmk: true, uph: true,
                up_multiplier: 1.0, upmk_multiplier: 1.0,
                detail_pasal: "Pasal 44 ayat (2) PP No. 35 Tahun 2021"
            },
            phk_force_majeure_tutup: {
                label: "Force Majeure (Perusahaan Tutup)",
                up: true, upmk: true, uph: true,
                up_multiplier: 0.5, upmk_multiplier: 1.0,
                detail_pasal: "Pasal 45 ayat (1) PP No. 35 Tahun 2021"
            },
            phk_force_majeure_tidak_tutup: {
                label: "Force Majeure (Tidak Tutup)",
                up: true, upmk: true, uph: true,
                up_multiplier: 0.75, upmk_multiplier: 1.0,
                detail_pasal: "Pasal 45 ayat (2) PP No. 35 Tahun 2021"
            },
            phk_pkpu_rugi: {
                label: "PKPU (Karena Rugi)",
                up: true, upmk: true, uph: true,
                up_multiplier: 0.5, upmk_multiplier: 1.0,
                detail_pasal: "Pasal 46 ayat (1) PP No. 35 Tahun 2021"
            },
            phk_pkpu_bukan_rugi: {
                label: "PKPU (Bukan Karena Rugi)",
                up: true, upmk: true, uph: true,
                up_multiplier: 1.0, upmk_multiplier: 1.0,
                detail_pasal: "Pasal 46 ayat (2) PP No. 35 Tahun 2021"
            },
            phk_pailit: {
                label: "Pailit",
                up: true, upmk: true, uph: true,
                up_multiplier: 1.0, upmk_multiplier: 1.0,
                detail_pasal: "Pasal 47 PP No. 35 Tahun 2021"
            },
            phk_sakit: {
                label: "Sakit Berkepanjangan / Cacat Kecelakaan Kerja (>12 Bulan)",
                up: true, upmk: true, uph: true,
                up_multiplier: 2.0, upmk_multiplier: 1.0,
                detail_pasal: "Pasal 55 PP No. 35 Tahun 2021"
            },
            phk_ditahan_rugi: {
                label: "Ditahan >6 Bulan (Menyebabkan Kerugian)",
                up: false, upmk: false, uph: true,
                up_multiplier: 0, upmk_multiplier: 0,
                detail_pasal: "Pasal 54 ayat (1) PP No. 35 Tahun 2021"
            },
            phk_ditahan_tidak_rugi: {
                label: "Ditahan >6 Bulan (Tidak Menyebabkan Kerugian)",
                up: false, upmk: true, uph: true,
                up_multiplier: 0, upmk_multiplier: 1.0,
                detail_pasal: "Pasal 54 ayat (2) PP No. 35 Tahun 2021"
            },
            phk_kesalahan_berat: {
                label: "Kesalahan Berat (3x SP)",
                up: true, upmk: true, uph: true,
                up_multiplier: 0.5, upmk_multiplier: 1.0,
                detail_pasal: "Pasal 52 ayat (1) PP No. 35 Tahun 2021"
            },
            phk_pelanggaran_mendesak: {
                label: "Pelanggaran Mendesak",
                up: false, upmk: false, uph: true,
                up_multiplier: 0, upmk_multiplier: 0,
                detail_pasal: "Pasal 52 ayat (2) PP No. 35 Tahun 2021"
            },
            phk_tidak_masuk: {
                label: "Mangkir >5 Hari Kerja",
                up: false, upmk: false, uph: true,
                up_multiplier: 0, upmk_multiplier: 0,
                detail_pasal: "Pasal 51 PP No. 35 Tahun 2021"
            }
        }
    },
    phk_pekerja: {
        label: "PHK oleh Pekerja / Berakhirnya HK",
        reasons: {
            phk_pekerja_kekerasan: {
                label: "Kekerasan / Ancaman / Intimidasi",
                up: true, upmk: true, uph: true,
                up_multiplier: 1.0, upmk_multiplier: 1.0,
                detail_pasal: "Pasal 48 PP No. 35 Tahun 2021"
            },
            phk_pekerja_upah: {
                label: "Upah Tidak Dibayar >3 Bulan",
                up: true, upmk: true, uph: true,
                up_multiplier: 1.0, upmk_multiplier: 1.0,
                detail_pasal: "Pasal 48 PP No. 35 Tahun 2021"
            },
            phk_pekerja_kewajiban: {
                label: "Pengusaha Tidak Menjalankan Kewajiban",
                up: true, upmk: true, uph: true,
                up_multiplier: 1.0, upmk_multiplier: 1.0,
                detail_pasal: "Pasal 48 PP No. 35 Tahun 2021"
            },
            phk_pekerja_luar_pk: {
                label: "Disuruh Kerja di Luar Perjanjian",
                up: true, upmk: true, uph: true,
                up_multiplier: 1.0, upmk_multiplier: 1.0,
                detail_pasal: "Pasal 48 PP No. 35 Tahun 2021"
            },
            phk_putusan_lphi: {
                label: "Putusan LPHI - Pekerja Kalah",
                up: false, upmk: false, uph: true,
                up_multiplier: 0, upmk_multiplier: 0,
                detail_pasal: "Pasal 49 PP No. 35 Tahun 2021"
            },
            meninggal: {
                label: "Meninggal Dunia",
                up: true, upmk: true, uph: true,
                up_multiplier: 2.0, upmk_multiplier: 1.0,
                detail_pasal: "Pasal 57 PP No. 35 Tahun 2021"
            },
            habis_kontrak: {
                label: "Habis Masa Kerja (PKWT)",
                up: false, upmk: false, uph: false, pkwt: true,
                up_multiplier: 0, upmk_multiplier: 0,
                detail_pasal: "Pasal 15 & 16 PP No. 35 Tahun 2021"
            },
            resign: {
                label: "Mengundurkan Diri",
                up: false, upmk: false, uph: true,
                up_multiplier: 0, upmk_multiplier: 0,
                detail_pasal: "Pasal 50 PP No. 35 Tahun 2021"
            },
            pensiun: {
                label: "Pensiun",
                up: true, upmk: true, uph: true,
                up_multiplier: 1.75, upmk_multiplier: 1.0,
                detail_pasal: "Pasal 56 PP No. 35 Tahun 2021"
            }
        }
    }
};

// ============================================================
// DATA: POLA KERJA & DIVISOR
// ============================================================
const workPatterns = {
    "13_1": { label: "13 Hari Kerja, 1 Hari Off", divisor: 27 },
    "10_1": { label: "10 Hari Kerja, 1 Hari Off", divisor: 25 },
    "7_1":  { label: "7 Hari Kerja, 1 Hari Off", divisor: 23 },
    "6_1":  { label: "6 Hari Kerja, 1 Hari Off", divisor: 22 },
    "5_2":  { label: "5 Hari Kerja, 2 Hari Off", divisor: 21 },
    "4_3":  { label: "4 Hari Kerja, 3 Hari Off", divisor: 18 }
};

// ============================================================
// UTILITIES
// ============================================================
function formatIDR(n) {
    return 'Rp ' + (n || 0).toLocaleString('id-ID');
}

function parseCurrency(v) {
    return parseInt((v || '').replace(/[^0-9]/g, '')) || 0;
}

function terbilang(a) {
    const b = ['','Satu','Dua','Tiga','Empat','Lima','Enam','Tujuh','Delapan','Sembilan','Sepuluh','Sebelas'];
    if (a < 12) return b[a];
    if (a < 20) return b[a-10] + ' Belas';
    if (a < 100) return b[Math.floor(a/10)] + ' Puluh ' + b[a%10];
    if (a < 200) return 'Seratus ' + terbilang(a-100);
    if (a < 1000) return b[Math.floor(a/100)] + ' Ratus ' + terbilang(a%100);
    if (a < 2000) return 'Seribu ' + terbilang(a-1000);
    if (a < 1000000) return terbilang(Math.floor(a/1000)) + ' Ribu ' + terbilang(a%1000);
    if (a < 1000000000) return terbilang(Math.floor(a/1000000)) + ' Juta ' + terbilang(a%1000000);
    return terbilang(Math.floor(a/1000000000)) + ' Miliar ' + terbilang(a%1000000000);
}

function formatTerbilang(a) {
    return a === 0 ? 'Nol Rupiah' : terbilang(a).trim() + ' Rupiah';
}

// ============================================================
// CALCULATION
// ============================================================
function getUPBase(totalMonths) {
    const y = totalMonths / 12;
    if (y < 1) return 1;
    if (y < 2) return 2;
    if (y < 3) return 3;
    if (y < 4) return 4;
    if (y < 5) return 5;
    if (y < 6) return 6;
    if (y < 7) return 7;
    if (y < 8) return 8;
    return 9;
}

function getUPMKBase(totalMonths) {
    const y = totalMonths / 12;
    if (y < 3) return 0;
    if (y < 6) return 2;
    if (y < 9) return 3;
    if (y < 12) return 4;
    if (y < 15) return 5;
    if (y < 18) return 6;
    if (y < 21) return 7;
    if (y < 24) return 8;
    return 10;
}

function calcUP(totalMonths, wage, mult) {
    const base = getUPBase(totalMonths);
    return { amount: base * mult * wage, base, mult, total: base * mult };
}

function calcUPMK(totalMonths, wage, mult) {
    const base = getUPMKBase(totalMonths);
    if (base === 0) return { amount: 0, base: 0, mult, total: 0, eligible: false };
    return { amount: base * mult * wage, base, mult, total: base * mult, eligible: true };
}

function calcUPH(wage, leaveDays, divisor) {
    const daily = wage / divisor;
    return { amount: leaveDays * daily, daily, leaveDays, divisor };
}

function calcPKWT(months, wage) {
    if (months < 1) return { amount: 0, eligible: false };
    return { amount: (months / 12) * wage, months, eligible: true };
}

// ============================================================
// UI HELPERS
// ============================================================
function populateReasons(cat) {
    const sel = document.getElementById('terminationReason');
    const grp = document.getElementById('subCategoryGroup');
    const info = document.getElementById('reasonInfoPanel');
    sel.innerHTML = '<option value="" disabled selected>Pilih alasan</option>';
    if (!cat) { grp.style.display = 'none'; info.style.display = 'none'; return; }
    Object.entries(terminationData[cat].reasons).forEach(([k, d]) => {
        const o = document.createElement('option'); o.value = k; o.textContent = d.label; sel.appendChild(o);
    });
    grp.style.display = 'block'; info.style.display = 'none';
}

function showReasonInfo(key) {
    const panel = document.getElementById('reasonInfoPanel');
    if (!key) { panel.style.display = 'none'; return; }
    let data = null;
    for (const cat of Object.values(terminationData)) {
        if (cat.reasons[key]) { data = cat.reasons[key]; break; }
    }
    if (!data) return;
    document.getElementById('reasonDescription').textContent = data.label;
    document.getElementById('reasonDetailPasal').textContent = data.detail_pasal;
    panel.style.display = 'block';
}

// ============================================================
// MAIN CALCULATION
// ============================================================
function performCalculation() {
    const name = document.getElementById('employeeName').value || '-';
    const position = document.getElementById('position').value || '-';
    const status = document.getElementById('employmentStatus').value;
    const years = parseInt(document.getElementById('yearsOfService').value) || 0;
    const months = parseInt(document.getElementById('monthsOfService').value) || 0;
    const basic = parseCurrency(document.getElementById('basicSalary').value);
    const allowance = parseCurrency(document.getElementById('fixedAllowance').value);
    const reasonKey = document.getElementById('terminationReason').value;
    const pkwtMonths = parseInt(document.getElementById('pkwtDuration').value) || 0;
    const leaveDays = parseInt(document.getElementById('remainingLeave').value) || 0;
    const workPattern = document.getElementById('workPattern').value || "6_1";

    if (!status) { alert('Pilih Status Kepegawaian.'); return; }
    if (!reasonKey) { alert('Pilih Alasan Terminasi.'); return; }
    if (basic <= 0) { alert('Masukkan Gaji Pokok.'); return; }

    let reason = null;
    for (const cat of Object.values(terminationData)) {
        if (cat.reasons[reasonKey]) { reason = cat.reasons[reasonKey]; break; }
    }
    if (!reason) { alert('Alasan tidak valid.'); return; }

    const totalMonths = years * 12 + months;
    const wage = basic + allowance;
    const divisor = workPatterns[workPattern] ? workPatterns[workPattern].divisor : 22;

    const up = reason.up ? calcUP(totalMonths, wage, reason.up_multiplier) : { amount: 0, base: 0, mult: reason.up_multiplier, total: 0 };
    const upmk = reason.upmk ? calcUPMK(totalMonths, wage, reason.upmk_multiplier) : { amount: 0, base: 0, mult: reason.upmk_multiplier, total: 0, eligible: false };
    const uph = reason.uph ? calcUPH(wage, leaveDays, divisor) : { amount: 0, daily: wage / divisor, leaveDays, divisor };
    const pkwt = reason.pkwt && status === 'PKWT' ? calcPKWT(pkwtMonths, wage) : { amount: 0, eligible: false };

    const notEligible = [];
    if (!reason.up) notEligible.push({ name: 'Uang Pesangon (UP)', reason: 'Tidak berhak UP.', pasal: reason.detail_pasal });
    if (!reason.upmk) notEligible.push({ name: 'UPMK', reason: 'Tidak berhak UPMK.', pasal: reason.detail_pasal });
    if (!upmk.eligible && reason.upmk) notEligible.push({ name: 'UPMK', reason: 'Masa kerja kurang dari 3 tahun.', pasal: 'Pasal 40 ayat (3)' });
    if (!reason.uph) notEligible.push({ name: 'UPH', reason: 'Tidak berhak UPH.', pasal: reason.detail_pasal });

    const total = up.amount + upmk.amount + uph.amount + pkwt.amount;

    displayResults({ name, position, status, years, months, totalMonths, wage, basic, allowance, reason, up, upmk, uph, pkwt, total, notEligible, divisor, workPattern });
}

// ============================================================
// DISPLAY RESULTS
// ============================================================
function displayResults(d) {
    document.getElementById('formSection').style.display = 'none';
    document.getElementById('resultSection').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    document.getElementById('resultDate').textContent = new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    const statusLabel = d.status === 'PKWTT' ? 'PKWTT - Tetap' : 'PKWT - Kontrak';
    const patternLabel = workPatterns[d.workPattern] ? workPatterns[d.workPattern].label : d.workPattern;
    document.getElementById('employeeSummary').innerHTML =
        '<h4>Ringkasan</h4><div class="summary-grid">' +
        '<div class="summary-item"><span class="summary-label">Nama</span><span class="summary-value">' + d.name + '</span></div>' +
        '<div class="summary-item"><span class="summary-label">Jabatan</span><span class="summary-value">' + d.position + '</span></div>' +
        '<div class="summary-item"><span class="summary-label">Status</span><span class="summary-value">' + statusLabel + '</span></div>' +
        '<div class="summary-item"><span class="summary-label">Masa Kerja</span><span class="summary-value">' + d.years + ' th ' + d.months + ' bln</span></div>' +
        '<div class="summary-item"><span class="summary-label">Gaji Pokok</span><span class="summary-value">' + formatIDR(d.basic) + '</span></div>' +
        '<div class="summary-item"><span class="summary-label">Tunjangan</span><span class="summary-value">' + formatIDR(d.allowance) + '</span></div>' +
        '<div class="summary-item"><span class="summary-label">Upah/Bulan</span><span class="summary-value">' + formatIDR(d.wage) + '</span></div>' +
        '<div class="summary-item"><span class="summary-label">Pola Kerja</span><span class="summary-value">' + patternLabel + '</span></div>' +
        '<div class="summary-item"><span class="summary-label">Alasan</span><span class="summary-value">' + d.reason.label + '</span></div>' +
        '</div>';

    // UP
    const upSec = document.getElementById('upSection');
    if (d.up.amount > 0) {
        upSec.style.display = 'block';
        document.getElementById('upAmount').textContent = formatIDR(d.up.amount);
        document.getElementById('upExplanation').innerHTML =
            'Masa kerja ' + (d.totalMonths/12).toFixed(1) + ' tahun = <strong>' + d.up.base + ' bulan upah</strong> (Pasal 40 ayat 2).<br>' +
            'Jenis PHK = <strong>' + d.up.mult + 'x</strong> (' + d.reason.detail_pasal + ').<br>' +
            'Total: ' + d.up.total + ' x ' + formatIDR(d.wage) + ' = <strong>' + formatIDR(d.up.amount) + '</strong>';
    } else { upSec.style.display = 'none'; }

    // UPMK
    const upmkSec = document.getElementById('upmkSection');
    if (d.upmk.amount > 0) {
        upmkSec.style.display = 'block';
        document.getElementById('upmkAmount').textContent = formatIDR(d.upmk.amount);
        document.getElementById('upmkExplanation').innerHTML =
            'Masa kerja ' + (d.totalMonths/12).toFixed(1) + ' tahun = <strong>' + d.upmk.base + ' bulan upah</strong> (Pasal 40 ayat 3).<br>' +
            'Jenis PHK = <strong>' + d.upmk.mult + 'x</strong> (' + d.reason.detail_pasal + ').<br>' +
            'Total: ' + d.upmk.total + ' x ' + formatIDR(d.wage) + ' = <strong>' + formatIDR(d.upmk.amount) + '</strong>';
    } else { upmkSec.style.display = 'none'; }

    // UPH
    const uphSec = document.getElementById('uphResultSection');
    if (d.uph.amount > 0 || d.reason.uph) {
        uphSec.style.display = 'block';
        document.getElementById('uphAmount').textContent = formatIDR(d.uph.amount);
        document.getElementById('uphBreakdown').innerHTML =
            '<p style="font-size:12px;color:#6b6b69;margin-bottom:8px;">Upah harian = ' + formatIDR(d.wage) + ' / ' + d.divisor + ' = ' + formatIDR(d.uph.daily) + ' (' + patternLabel + ')</p>' +
            '<div class="uph-breakdown-item"><span class="uph-breakdown-label">Cuti terhutang (' + d.uph.leaveDays + ' hari x ' + formatIDR(d.uph.daily) + ')</span><span class="uph-breakdown-value">' + formatIDR(d.uph.amount) + '</span></div>';
    } else { uphSec.style.display = 'none'; }

    // PKWT
    const pkwtSec = document.getElementById('pkwtSection');
    if (d.pkwt.amount > 0) {
        pkwtSec.style.display = 'block';
        document.getElementById('pkwtAmount').textContent = formatIDR(d.pkwt.amount);
        document.getElementById('pkwtExplanation').innerHTML =
            'Masa kontrak <strong>' + d.pkwt.months + ' bulan</strong> &rarr; <strong>' + (d.pkwt.months/12).toFixed(2) + ' bulan upah</strong>.<br>' +
            '(' + d.pkwt.months + '/12) x ' + formatIDR(d.wage) + ' = <strong>' + formatIDR(d.pkwt.amount) + '</strong>';
    } else { pkwtSec.style.display = 'none'; }

    // Not Eligible
    const neSec = document.getElementById('notEligibleSection');
    if (d.notEligible.length > 0) {
        neSec.style.display = 'block';
        let html = '';
        d.notEligible.forEach(function(item) {
            html += '<li><strong>' + item.name + '</strong><small>' + item.reason + '</small><small style="display:block;color:#999;margin-top:2px;">' + item.pasal + '</small></li>';
        });
        document.getElementById('notEligibleList').innerHTML = html;
    } else { neSec.style.display = 'none'; }

    // Total
    document.getElementById('totalAmount').textContent = formatIDR(d.total);
    document.getElementById('totalTerbilang').textContent = formatTerbilang(d.total);
}

// ============================================================
// EVENTS
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    // Currency formatting
    document.querySelectorAll('.currency-input').forEach(function(input) {
        input.addEventListener('input', function(e) {
            let v = e.target.value.replace(/[^0-9]/g, '');
            e.target.value = v ? parseInt(v).toLocaleString('id-ID') : '';
        });
    });

    // Employment status
    document.getElementById('employmentStatus').addEventListener('change', function() {
        const g = document.getElementById('pkwtDurationGroup');
        g.style.display = this.value === 'PKWT' ? 'block' : 'none';
        document.getElementById('pkwtDuration').required = this.value === 'PKWT';
    });

    // Category change
    document.getElementById('terminationCategory').addEventListener('change', function() {
        populateReasons(this.value);
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
        document.querySelectorAll('input').forEach(function(el) { el.value = ''; });
        document.querySelectorAll('select').forEach(function(el) { el.value = ''; });
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
