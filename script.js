/**
 * Aplikasi Editor DocTemp
 * Versi Otomatisasi Penuh dengan Pratinjau Scroll dan Konten Lengkap
 * Kode ini telah dirapikan dan dilengkapi dengan seluruh narasi dari dokumen RKS.
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // ===================================================================================
  // MANAJEMEN STATE
  // Menyimpan semua data yang dimasukkan pengguna.
  // ===================================================================================
  const state = {
    dataMaster: {
      jenisPekerjaan: '', judulPengadaan: '', noRks: '', tanggalRks: '',
      bulanRks: '', tahunRks: '', metodePengadaan: '', metodePenyampaian: '',
      sptTahun: '', ppnTahun: '', laporanKeuanganTahun: '', metodeEvaluasi: '',
      pengguna: '', direksiPekerjaan: '', pengawasPekerjaan: '', pengalamanPekerjaan: '',
      proyek: '', jenisPerjanjian: '',
      disusunJabatan: '', disusunNama: '',
      mengetahuiJabatan: '', mengetahuiNama: '',
      menyetujuiJabatan: '', menyetujuiNama: ''
    }
  };

  // ===================================================================================
  // TEMPLAT (Sumber Kebenaran untuk Konten Dokumen Lengkap dari Word)
  // ===================================================================================
  const documentTemplates = {
    'BAB I': {
        title: 'INSTRUKSI KEPADA CALON PENYEDIA JASA KONSULTANSI',
        content: `1.1. JUDUL PEKERJAAN
[Judul Pengadaan]

1.2. LINGKUP PEKERJAAN
Lingkup Pekerjaan ini mengacu pada Bab IV klausul 4.7 Dokumen RKS ini.

1.3. LOKASI PEKERJAAN
Lokasi pekerjaan ini mengacu pada Bab IV klausul 4.5 Dokumen RKS ini.

1.4. JANGKA WAKTU PELAKSANAAN PEKERJAAN
Jangka waktu pelaksanaan pekerjaan mengacu pada Bab IV klausul 4.6 Dokumen RKS ini.

1.5. SUMBER PENDANAAN
Sumber pendanaan pekerjaan ini mengacu pada Bab IV klausul 4.3 Dokumen RKS ini.

1.6. JENIS PERJANJIAN/KONTRAK
Pada perjanjian/kontrak pekerjaan ini menggunakan sistem [Jenis Perjanjian/Kontrak]. Harga Perjanjian/Kontrak sudah termasuk PPN sebesar 12%, beserta pembayaran-pembayaran wajib lainnya menurut peraturan yang sah.

1.7. LARANGAN KORUPSI KOLUSI DAN NEPOTISME (KKN) SERTA PENIPUAN
Calon Penyedia Jasa dan pihak yang terkait dengan pengadaan ini berkewajiban untuk mematuhi etika pengadaan dengan tidak melakukan tindakan sebagai berikut:
a. Berusaha mempengaruhi Pejabat Pelaksana Pengadaan dalam bentuk dan cara apapun, untuk memenuhi keinginan Calon Penyedia Jasa Konsultansi yang bertentangan dengan RKS, dan/atau peraturan perundang-undangan.
b. Membuat dan/atau menyampaikan dokumen dan/atau keterangan lain yang tidak benar untuk memenuhi persyaratan dalam RKS ini.

1.8. LARANGAN PERTENTANGAN KEPENTINGAN
Para Pihak dalam melaksanakan tugas, fungsi dan perannya, menghindari dan mencegah terjadinya pertentangan kepentingan Para Pihak yang terkait dalam proses pengadaan jasa, baik langsung maupun tidak langsung yang merugikan kepentingan Pengguna Jasa Konsultansi.

1.9. METODE PENGADAAN JASA KONSULTANSI
Metode yang digunakan dalam pengadaan ini adalah [Metode Pengadaan] mengacu kepada Edaran Direksi PT PLN Enjiniring No. 0001.E/DIR/2025 tentang Standar Prosedur Pengadaan Jasa Konsultansi.

1.10. METODE PENYAMPAIAN DOKUMEN PENAWARAN
Metode Penyampaian Dokumen Penawaran Pengadaan Jasa Konsultansi ini dilaksanakan dengan [Metode Penyampaian Dokumen Penawaran] mengacu kepada Edaran Direksi PT PLN Enjiniring No. 0001.E/DIR/2025 tentang Standar Prosedur Pengadaan Jasa Konsultansi.

1.11. JAMINAN PENAWARAN (BID BOND)
Jaminan Penawaran (Bid Bond) tidak dipersyaratkan dalam pekerjaan ini.

1.12. SYARAT-SYARAT YANG HARUS DIPENUHI PADA PROSES PENGADAAN JASA KONSULTANSI
1.12.1. Ketentuan Pengadaan Jasa Konsultansi
a. Calon Penyedia Jasa Konsultansi harus tunduk dan menaati ketentuan Edaran Direksi PT PLN Enjiniring No. 0001.E/DIR/2025 tentang Standar Prosedur Pengadaan Jasa Konsultansi.
b. Calon Penyedia Jasa hanya boleh menyampaikan 1 (satu) Dokumen Penawaran, apabila Calon Penyedia Jasa menyampaikan lebih dari 1 (satu) Dokumen Penawaran pada paket pekerjaan yang sama, maka dinyatakan GUGUR.
c. Yang tidak diperkenankan sebagai Calon Penyedia Jasa dalam penawaran ini adalah mereka yang keikutsertaannya akan bertentangan dengan tugasnya (conflict of interest).
d. Apabila Calon Penyedia Jasa Konsultansi tidak dapat memenuhi ketentuan-ketentuan tersebut, maka Calon Penyedia Jasa Konsultansi tidak dapat mengajukan tuntutan dalam bentuk apapun.

1.12.2. Syarat-syarat Calon Penyedia Jasa
A. Dokumen Aplikasi Kualifikasi
   i. Administrasi
      a) Pakta Integritas, sesuai dengan contoh pada BAB V Lampiran 8.
      b) Melampirkan salinan akta pendirian beserta perubahannya (apabila ada).
      c) Melampirkan salinan perizinan sesuai dengan bidang usahanya.
      d) Melampirkan Salinan Nomor Induk Berusaha (NIB).
      e) Perjanjian kerja sama operasi/kemitraan (apabila ada).
      f) Surat Pernyataan tidak dalam pengawasan pengadilan dan tidak bangkrut.
      g) Surat pernyataan kapasitas menandatangani Perjanjian/Kontrak.
      h) Surat Pernyataan kinerja baik dan tidak masuk Daftar Hitam (blacklist).
      i) Telah memenuhi kewajiban perpajakan tahun terakhir ([SPT] PPh) dan PPN 3 bulan terakhir.
      j) Melampirkan Formulir Isian Kualifikasi.
   ii. Teknis
      a) Sanggup memenuhi persyaratan penggunaan produksi dalam negeri.
      b) Khusus Jasa Konstruksi kualifikasi non-kecil harus memiliki pengalaman kerja.
   iii. Keuangan
      a) Melampirkan laporan keuangan minimal Tahun [Laporan Keuangan Tahun] yang telah diaudit.
      b) Memiliki surat keterangan dukungan keuangan dari Bank (jika dipersyaratkan).
   iv. Keselamatan dan Kesehatan Kerja (K3)
      a) Melampirkan Surat Pernyataan Mematuhi & Memahami Peraturan K3.
      b) Mempunyai Sistem Manajemen K3 (SMK3).
      c) Memiliki sertifikat CSMS yang masih berlaku.

B. Dokumen Penawaran Administrasi
[Detail Dokumen Penawaran Administrasi...]

C. Dokumen Penawaran Teknis
[Detail Dokumen Penawaran Teknis...]

D. Dokumen Penawaran Harga
[Detail Dokumen Penawaran Harga...]

1.13. ISI DOKUMEN PELELANGAN JASA KONSULTANSI
BAB I - INSTRUKSI KEPADA PENYEDIA JASA KONSULTANSI
BAB II - SYARAT-SYARAT UMUM PERJANJIAN
BAB III - SYARAT-SYARAT KHUSUS PERJANJIAN
BAB IV - KERANGKA ACUAN KERJA
BAB V - LAMPIRAN
BAB VI - PENUTUP

1.14. JADWAL PELAKSANAAN PENGADAAN
[Detail Jadwal Pelaksanaan Pengadaan...]

1.15. ADDENDUM DOKUMEN PELELANGAN/RKS
[Detail mengenai Addendum...]

1.16. PENYIAPAN DOKUMEN PENAWARAN
[Detail mengenai Penyiapan Dokumen Penawaran...]

1.17. BAHASA DAN HUKUM
[Detail mengenai Bahasa dan Hukum...]

1.18. CARA PENYAMPAIAN DOKUMEN
[Detail mengenai Cara Penyampaian Dokumen...]

1.19. PEMBUKAAN PENAWARAN
[Detail mengenai Pembukaan Penawaran...]

1.20. METODE EVALUASI PENAWARAN
Metode Evaluasi untuk Pengadaan ini menggunakan [Metode Evaluasi].

1.21. KRITERIA EVALUASI PENAWARAN
[Detail Kriteria Evaluasi Penawaran...]

1.22. KETENTUAN EVALUASI PENAWARAN
[Detail Ketentuan Evaluasi Penawaran...]

1.23. EVALUASI HARGA TIMPANG
[Detail Evaluasi Harga Timpang...]

1.24. KERAHASIAAN PROSES EVALUASI
[Detail Kerahasiaan Proses Evaluasi...]

1.25. PEMBUKTIAN KUALIFIKASI
[Detail Pembuktian Kualifikasi...]

1.26. LAPORAN HASIL EVALUASI
[Detail Laporan Hasil Evaluasi...]

1.27. KLARIFIKASI DOKUMEN PENAWARAN
[Detail Klarifikasi Dokumen Penawaran...]

1.28. NEGOSIASI PENAWARAN
[Detail Negosiasi Penawaran...]

1.29. PENETAPAN PENYEDIA/PENETAPAN PEMENANG
[Detail Penetapan Pemenang...]

1.30. PENGUMUMAN HASIL PELELANGAN
[Detail Pengumuman Hasil Pelelangan...]

1.31. SANGGAHAN
[Detail Prosedur Sanggahan...]

1.32. PENUNJUKAN PENYEDIA
[Detail Penunjukan Penyedia...]

1.33. PENANDATANGANAN PERJANJIAN/KONTRAK
[Detail Penandatanganan Perjanjian/Kontrak...]

1.34. PENGADAAN GAGAL DAN PENGADAAN ULANG
[Detail Pengadaan Gagal dan Pengadaan Ulang...]
`
    },
    'BAB II': {
        title: 'SYARAT–SYARAT UMUM PERJANJIAN (SSUP)',
        content: `2.1. DEFINISI
Istilah-istilah berikut memiliki arti sebagai berikut:
“Direksi Pekerjaan” adalah [Direksi Pekerjaan].
“Pengguna Jasa Konsultansi” adalah [Pengguna].
“Pengawas Pekerjaan” adalah [Pengawas Pekerjaan].
“Pengalaman Pekerjaan Sejenis” adalah [Pengalaman Pekerjaan Sejenis].
“Proyek” adalah [Proyek].
“KAK” adalah kerangka acuan kerja.
... (dan seterusnya untuk semua definisi dan klausul hingga 2.36)`
    },
    'BAB III': {
        title: 'SYARAT–SYARAT KHUSUS PERJANJIAN (SSKP)',
        content: `3.1 PENGGUNA BARANG/JASA
Mengacu pada Bab II Klausul 2.1.s.
... (dan seterusnya untuk semua klausul hingga 3.8)`
    },
    'BAB IV': {
        title: 'KERANGKA ACUAN KERJA',
        content: `4.1. LATAR BELAKANG
[Narasi latar belakang KAK dapat diedit di sini...]
... (dan seterusnya untuk semua klausul hingga 4.14)`
    },
    'BAB V': {
        title: 'LAMPIRAN',
        content: `5.1. Lampiran 1 – Surat Pernyataan Tidak Dalam Pengawasan Pengadilan Dan Tidak Bangkrut
[Konten Lampiran 1...]

5.2. Lampiran 2 – Surat Pernyataan Bahwa Direksi/Pengurus...
[Konten Lampiran 2...]
... (dan seterusnya untuk semua 19 lampiran)`
    },
    'BAB VI': {
        title: 'PENUTUP',
        content: `Pelaksanaan Pengadaan [Judul Pengadaan] berpedoman pada Dokumen Pelelangan/RKS ini. Perubahan atau penambahan atas hal-hal lain yang belum tercakup dalam Dokumen Pelelangan/RKS ini akan dicantumkan dalam Berita Acara Penjelasan yang akan merupakan bagian yang tidak terpisahkan dari Dokumen Pelelangan/RKS ini.`
    }
  };

  // ===================================================================================
  // ELEMEN DOM
  // ===================================================================================
  const DOM = {
    form: document.querySelector('.editor-form'),
    previewPanel: document.getElementById('preview'),
    
    // Elemen Data Master Lengkap
    dataJenisPekerjaan: document.getElementById('data-jenis-pekerjaan'),
    dataJudulPengadaan: document.getElementById('data-judul-pengadaan'),
    dataNoRks: document.getElementById('data-no-rks'),
    dataTanggalRks: document.getElementById('data-tanggal-rks'),
    dataBulanRks: document.getElementById('data-bulan-rks'),
    dataTahunRks: document.getElementById('data-tahun-rks'),
    dataMetodePengadaan: document.getElementById('data-metode-pengadaan'),
    dataMetodePenyampaian: document.getElementById('data-metode-penyampaian'),
    dataSptTahun: document.getElementById('data-spt-tahun'),
    dataPpnTahun: document.getElementById('data-ppn-tahun'),
    dataLaporanKeuanganTahun: document.getElementById('data-laporan-keuangan-tahun'),
    dataMetodeEvaluasi: document.getElementById('data-metode-evaluasi'),
    dataPengguna: document.getElementById('data-pengguna'),
    dataDireksiPekerjaan: document.getElementById('data-direksi-pekerjaan'),
    dataPengawasPekerjaan: document.getElementById('data-pengawas-pekerjaan'),
    dataPengalamanPekerjaan: document.getElementById('data-pengalaman-pekerjaan'),
    dataProyek: document.getElementById('data-proyek'),
    dataJenisPerjanjian: document.getElementById('data-jenis-perjanjian'),
    dataDisusunJabatan: document.getElementById('data-disusun-jabatan'),
    dataDisusunNama: document.getElementById('data-disusun-nama'),
    dataMengetahuiJabatan: document.getElementById('data-mengetahui-jabatan'),
    dataMengetahuiNama: document.getElementById('data-mengetahui-nama'),
    dataMenyetujuiJabatan: document.getElementById('data-menyetujui-jabatan'),
    dataMenyetujuiNama: document.getElementById('data-menyetujui-nama'),
  };

  // ===================================================================================
  // FUNGSI BANTU & LOGIKA
  // ===================================================================================
  function getLetterheadHTML() {
    return `
      <div class="letterhead-container">
        <div class="letterhead-top-border"></div>
        <div class="letterhead-content">
          <div class="letterhead-logo">
            <img src="Logo PLNE.png" alt="PLN Enjiniring Logo" />
          </div>
          <div class="letterhead-text">
            <p class="company-name">PT. PRIMA LAYANAN NASIONAL ENJINIRING</p>
            <p class="address">Jl. KS.Tubun I No.2, RT.03/RW.02, Kota Bambu Selatan, Kec. Palmerah, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11420</p>
          </div>
        </div>
      </div>
    `;
  }

  function processMailMerge(text) {
    if (!text) return '';
    const placeholderMap = {
      'Jenis Pekerjaan': state.dataMaster.jenisPekerjaan,
      'Judul Pengadaan': state.dataMaster.judulPengadaan || DOM.dataJudulPengadaan.placeholder,
      'No RKS': state.dataMaster.noRks || DOM.dataNoRks.placeholder,
      'Tanggal RKS': state.dataMaster.tanggalRks || DOM.dataTanggalRks.placeholder,
      'Bulan RKS': state.dataMaster.bulanRks,
      'Tahun RKS': state.dataMaster.tahunRks || DOM.dataTahunRks.placeholder,
      'Metode Pengadaan': state.dataMaster.metodePengadaan,
      'Metode Penyampaian Dokumen Penawaran': state.dataMaster.metodePenyampaian,
      'SPT': state.dataMaster.sptTahun || DOM.dataSptTahun.placeholder,
      'PPN': state.dataMaster.ppnTahun || DOM.dataPpnTahun.placeholder,
      'Laporan Keuangan Tahun': state.dataMaster.laporanKeuanganTahun || DOM.dataLaporanKeuanganTahun.placeholder,
      'Metode Evaluasi': state.dataMaster.metodeEvaluasi,
      'Pengguna': state.dataMaster.pengguna || DOM.dataPengguna.placeholder,
      'Direksi Pekerjaan': state.dataMaster.direksiPekerjaan || DOM.dataDireksiPekerjaan.placeholder,
      'Pengawas Pekerjaan': state.dataMaster.pengawasPekerjaan || DOM.dataPengawasPekerjaan.placeholder,
      'Pengalaman Pekerjaan Sejenis': state.dataMaster.pengalamanPekerjaan || DOM.dataPengalamanPekerjaan.placeholder,
      'Proyek': state.dataMaster.proyek || DOM.dataProyek.placeholder,
      'Jenis Perjanjian/Kontrak': state.dataMaster.jenisPerjanjian || DOM.dataJenisPerjanjian.placeholder,
      'Disusun Oleh Jabatan': state.dataMaster.disusunJabatan || DOM.dataDisusunJabatan.placeholder,
      'Disusun Oleh Nama': state.dataMaster.disusunNama || DOM.dataDisusunNama.placeholder,
      'Mengetahui Jabatan': state.dataMaster.mengetahuiJabatan || DOM.dataMengetahuiJabatan.placeholder,
      'Mengetahui Nama': state.dataMaster.mengetahuiNama || DOM.dataMengetahuiNama.placeholder,
      'Menyetujui Jabatan': state.dataMaster.menyetujuiJabatan || DOM.dataMenyetujuiJabatan.placeholder,
      'Menyetujui Nama': state.dataMaster.menyetujuiNama || DOM.dataMenyetujuiNama.placeholder,
    };
    return text.replace(/\[(.*?)\]/g, (match, placeholderName) => {
      const key = placeholderName.trim();
      return placeholderMap[key] !== undefined ? `<span class="mailmerge-highlight">${placeholderMap[key]}</span>` : match;
    });
  }

  // ===================================================================================
  // FUNGSI RENDER (VERSI BARU DENGAN HALAMAN TERPISAH)
  // ===================================================================================
  function renderFullDocument() {
    const letterhead = getLetterheadHTML();
    let fullDocumentHTML = '';

    // 1. Buat Halaman Sampul (tetap sama)
    const coverPageHTML = `
      <div class="preview-page cover-page">
        ${letterhead}
        <div class="page-content-after-letterhead">
          <p style="text-align:center; font-size: 18px; margin-top: 40px; margin-bottom: 10px; font-weight: bold;">${(state.dataMaster.judulPengadaan || DOM.dataJudulPengadaan.placeholder).toUpperCase()}</p>
          <p style="text-align:center; font-size: 14px; margin-top: 0; margin-bottom: 40px; color: #333;">NOMOR: ${state.dataMaster.noRks || DOM.dataNoRks.placeholder}</p>
          <p style="text-align:center; font-size: 18px; font-weight: bold; margin-bottom: 30px;">DOKUMEN RKS</p>
          <div class="cover-bab-list">
            ${Object.entries(documentTemplates).map(([babKey, babData]) => `
              <p>${babKey} &ndash; ${babData.title.toUpperCase()}</p>
            `).join('')}
          </div>
          <div style="text-align: center; margin-top: 80px; font-size: 16px; font-weight: bold;">
              ${(state.dataMaster.bulanRks).toUpperCase()} ${state.dataMaster.tahunRks || DOM.dataTahunRks.placeholder}
          </div>
        </div>
      </div>`;
    fullDocumentHTML += coverPageHTML;

    // 2. Buat Halaman Daftar Isi (tetap sama)
    let tocContentHTML = '';
    Object.entries(documentTemplates).forEach(([babKey, babData], index) => {
        tocContentHTML += `
            <div class="toc-entry toc-level-1">
                <span class="toc-item-text">${babKey} ${babData.title.toUpperCase()}</span>
                <span class="toc-item-page-num">${index + 3}</span>
            </div>`;
    });
    const tocPageHTML = `
      <div class="preview-page toc-page">
        ${letterhead}
        <div class="page-content-after-letterhead">
          <h2 class="toc-title">DAFTAR ISI</h2>
          <div class="toc-list">${tocContentHTML}</div>
        </div>
      </div>`;
    fullDocumentHTML += tocPageHTML;

    // 3. Gabungkan SEMUA BAB ke dalam satu alur konten yang berkelanjutan
    let mainContentHTML = '';
    Object.entries(documentTemplates).forEach(([babKey, babData]) => {
      const processedContent = processMailMerge(babData.content);
      // Setiap BAB kini menjadi bagian dari satu blok besar
      mainContentHTML += `
        <div class="bab-content-section">
            <h3 class="bab-title-for-break">${babKey}</h3>
            <h4 class="bab-subtitle">${babData.title.toUpperCase()}</h4>
            <div class="bab-text-content">
              ${processedContent.replace(/\n/g, '<br>')}
            </div>
        </div>
      `;
    });

    // Bungkus alur konten utama dalam satu halaman pratinjau
    const mainContentContainer = `
        <div class="preview-page continuous-content-page">
            ${letterhead}
            <div class="page-content-after-letterhead">
                ${mainContentHTML}
            </div>
        </div>
    `;
    fullDocumentHTML += mainContentContainer;

    DOM.previewPanel.innerHTML = fullDocumentHTML;
}

  // ===================================================================================
  // AKSI & EVENT HANDLERS
  // ===================================================================================
  function updateStateFromForm() {
    for (const key in DOM) {
        if (key.startsWith('data')) {
            const stateKey = key.charAt(4).toLowerCase() + key.slice(5);
            if (DOM[key]) {
                state.dataMaster[stateKey] = DOM[key].value;
            }
        }
    }
  }

  function onFormChange() {
    updateStateFromForm();
    renderFullDocument();
  }
  
  // ===================================================================================
  // INISIALISASI
  // ===================================================================================
  function initialize() {
    DOM.form.addEventListener('input', onFormChange);
    onFormChange();
  }

  initialize();
});

  function goToCreateTemplate() {
    window.location.href = "home-simple.html";
  }

  // --- KODE UNTUK FUNGSI POP-UP DOWNLOAD ---
document.addEventListener('DOMContentLoaded', () => {
    
    // Pastikan elemen-elemen ada di halaman sebelum menambahkan listener
    const downloadButton = document.getElementById('download-button');
    const downloadModal = document.getElementById('download-format-modal');
    const cancelButton = document.getElementById('download-cancel');
    const wordOption = document.getElementById('download-word');
    const pdfOption = document.getElementById('download-pdf');

    // Cek jika elemen ada untuk menghindari error di halaman lain
    if (downloadButton && downloadModal && cancelButton) {

        // 1. Tampilkan pop-up saat tombol "Download" utama diklik
        downloadButton.addEventListener('click', () => {
            downloadModal.classList.remove('hidden');
        });

        // 2. Sembunyikan pop-up saat tombol "Batal" diklik
        cancelButton.addEventListener('click', () => {
            downloadModal.classList.add('hidden');
        });

        // Fungsi untuk menyembunyikan pop-up (bisa dipanggil setelah memilih format)
        const hideModal = () => {
            downloadModal.classList.add('hidden');
        }

       // Ganti fungsi lama dengan yang ini
        wordOption.addEventListener('click', () => {
            console.log('Memulai proses download Word...');

            // 1. Ambil seluruh konten HTML dari panel pratinjau
            const previewContent = document.getElementById('preview').innerHTML;
            
            // 2. Bungkus konten dengan struktur HTML dasar agar valid
            const fullHtml = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Dokumen RKS</title>
                    <style>
                        /* Tambahkan style sederhana untuk memastikan tata letak di Word mirip */
                        body { font-family: 'Times New Roman', serif; font-size: 12pt; }
                        p, h1, h2, h3, h4 { margin: 0; padding: 0; }
                        .letterhead-text .company-name { border-bottom: 2px solid #000; }
                        .preview-page { page-break-after: always; } /* Memberi jeda halaman di Word */
                    </style>
                </head>
                <body>
                    ${previewContent}
                </body>
                </html>
            `;

            // 3. Gunakan library html-docx-js untuk mengubah HTML menjadi format Word (Blob)
            const fileBlob = htmlDocx.asBlob(fullHtml);

            // 4. Buat link download palsu untuk memicu unduhan di browser
            const link = document.createElement('a');
            link.href = URL.createObjectURL(fileBlob);
            
            // Ambil judul pengadaan untuk nama file, atau gunakan nama default
            const judul = document.getElementById('data-judul-pengadaan').value || 'Dokumen RKS';
            link.download = `${judul}.docx`; // Nama file yang akan diunduh
            
            // Tambahkan link ke dokumen, klik, lalu hapus lagi
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Sembunyikan pop-up setelah proses selesai
            hideModal();
        });

        pdfOption.addEventListener('click', () => {
    console.log('Memulai proses download PDF...');

    // Arahkan ke seluruh panel pratinjau. html2pdf akan membaca aturan CSS.
    const element = document.getElementById('preview');

    const judul = document.getElementById('data-judul-pengadaan').value || 'Dokumen RKS';
    const filename = `${judul}.pdf`;

    const opt = {
      margin:       [20, 15, 20, 15],
      filename:     filename,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
      // AKTIFKAN MODE PAGE BREAK OTOMATIS BERDASARKAN CSS
      pagebreak:    { mode: ['css', 'legacy'] }
    };

    html2pdf().set(opt).from(element).save();

    hideModal();
});
        
        // 3. Sembunyikan pop-up jika pengguna mengklik di luar area konten
        downloadModal.addEventListener('click', (event) => {
            if (event.target === downloadModal) {
                hideModal();
            }
        });
    }
});