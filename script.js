/**
 * Aplikasi Editor DocTemp - Mesin Utama (script.js)
 * Versi ini telah dimodifikasi menjadi mesin generik.
 * Tidak lagi berisi data template spesifik, namun siap menerima data dari file lain.
 */

// Fungsi inisialisasi global yang akan dipanggil oleh file data (konsultansi.js/konstruksi.js)
function initializeApp(pageTemplates) {
  
  // Pastikan kode berjalan setelah semua elemen HTML dimuat
  function runApp() {
    
    // ===================================================================================
    // MANAJEMEN STATE & ELEMEN DOM
    // ===================================================================================
    const state = {
  dataMaster: {
    jenisPekerjaan: '', judulPengadaan: '', noRks: '', tanggalRks: '',
    bulanRks: '', tahunRks: '', metodePengadaan: '', metodePenyampaian: '',
    sptTahun: '', ppnTahun: '', laporanKeuanganTahun: '', metodeEvaluasi: '',
    pengguna: '', direksiPekerjaan: '', pengawasPekerjaan: '', pengalamanPekerjaan: '',
    proyek: '', jenisPerjanjian: '',
    metodePembayaran: '',
    disusunJabatan: '', disusunNama: '',
    mengetahuiJabatan: '', mengetahuiNama: '',
    menyetujuiJabatan: '', menyetujuiNama: ''
  }
};

    const DOM = {};
    
    function initializeDOMReferences() {
      DOM.form = document.querySelector('.editor-form');
      DOM.previewPanel = document.getElementById('preview');
      
      for (const key in state.dataMaster) {
        const elementId = 'data-' + key.replace(/([A-Z])/g, '-$1').toLowerCase();
        DOM[key] = document.getElementById(elementId);
      }

      // Add event listener for Tata Cara Pembayaran select to update metodePembayaran realtime
      if (DOM['tata-cara-pembayaran']) {
        DOM['tata-cara-pembayaran'].addEventListener('change', (e) => {
          state.dataMaster.metodePembayaran = e.target.value;
          renderFullDocument();
        });
      }
    }

    // ===================================================================================
    // FUNGSI BANTU & LOGIKA
    // ===================================================================================
    function getLetterheadHTML() {
      return `
        <div class="letterhead-container">
          <div class="letterhead-top-border"></div>
          <div class="letterhead-content">
            <div class="letterhead-logo">
              <img src="asset/Logo PLNE.png" alt="PLN Enjiniring Logo" />
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
        'Judul Pengadaan': state.dataMaster.judulPengadaan || (DOM.judulPengadaan ? DOM.judulPengadaan.placeholder : ''),
        'No RKS': state.dataMaster.noRks || (DOM.noRks ? DOM.noRks.placeholder : ''),
        'Tanggal RKS': state.dataMaster.tanggalRks,
        'Bulan RKS': state.dataMaster.bulanRks,
        'Tahun RKS': state.dataMaster.tahunRks || (DOM.tahunRks ? DOM.tahunRks.placeholder : ''),
        'Metode Pengadaan': state.dataMaster.metodePengadaan,
        'Metode Penyampaian Dokumen': state.dataMaster.metodePenyampaian,
        'SPT': state.dataMaster.sptTahun || (DOM.sptTahun ? DOM.sptTahun.placeholder : ''),
        'PPN': state.dataMaster.ppnTahun || (DOM.ppnTahun ? DOM.ppnTahun.placeholder : ''),
        'Laporan Keuangan Tahun': state.dataMaster.laporanKeuanganTahun || (DOM.laporanKeuanganTahun ? DOM.laporanKeuanganTahun.placeholder : ''),
        'Metode Evaluasi': state.dataMaster.metodeEvaluasi,
        'Pengguna': state.dataMaster.pengguna || (DOM.pengguna ? DOM.pengguna.placeholder : ''),
        'Direksi Pekerjaan': state.dataMaster.direksiPekerjaan || (DOM.direksiPekerjaan ? DOM.direksiPekerjaan.placeholder : ''),
        'Pengawas Pekerjaan': state.dataMaster.pengawasPekerjaan || (DOM.pengawasPekerjaan ? DOM.pengawasPekerjaan.placeholder : ''),
        'Pengalaman Pekerjaan Sejenis': state.dataMaster.pengalamanPekerjaan || (DOM.pengalamanPekerjaan ? DOM.pengalamanPekerjaan.placeholder : ''),
        'Proyek': state.dataMaster.proyek || (DOM.proyek ? DOM.proyek.placeholder : ''),
        'Jenis Perjanjian/Kontrak': state.dataMaster.jenisPerjanjian || (DOM.jenisPerjanjian ? DOM.jenisPerjanjian.placeholder : ''),
        'Tata Cara Pembayaran': state.dataMaster.metodePembayaran || (DOM.metodePembayaran ? DOM.metodePembayaran.placeholder : ''),
        'Detail Tata Cara Pembayaran': state.dataMaster.metodePembayaran || (DOM.metodePembayaran ? DOM.metodePembayaran.placeholder : ''),
      };
      return text.replace(/\[(.*?)\]/g, (match, placeholderName) => {
        const key = placeholderName.trim();
        return placeholderMap[key] !== undefined ? placeholderMap[key] : match;
      });
    }

    // ===================================================================================
    // FUNGSI RENDER UTAMA
    // ===================================================================================
    function renderFullDocument() {
      if (!DOM.previewPanel || !pageTemplates) return;

      const letterhead = getLetterheadHTML();
      let fullDocumentHTML = '';

      // 1. Buat Halaman Sampul
      const coverPageHTML = `
        <div class="preview-page cover-page">
          ${letterhead}
          <div class="page-content-after-letterhead">
            <p style="text-align:center; font-size: 18px; margin-top: 40px; margin-bottom: 10px; font-weight: bold;">${(state.dataMaster.judulPengadaan || (DOM.judulPengadaan ? DOM.judulPengadaan.placeholder : '')).toUpperCase()}</p>
            <p style="text-align:center; font-size: 14px; margin-top: 0; margin-bottom: 40px; color: #333;">NOMOR: ${state.dataMaster.noRks || (DOM.noRks ? DOM.noRks.placeholder : '')}</p>
            <p style="text-align:center; font-size: 18px; font-weight: bold; margin-bottom: 30px;">DOKUMEN RKS</p>
            <div class="cover-bab-list">
              ${Object.entries(pageTemplates).map(([babKey, babData]) => `
                <p>${babKey} &ndash; ${babData.title.toUpperCase()}</p>
              `).join('')}
            </div>
            <div style="text-align: center; margin-top: 80px; font-size: 16px; font-weight: bold;">
                ${(state.dataMaster.bulanRks).toUpperCase()} ${state.dataMaster.tahunRks || (DOM.tahunRks ? DOM.tahunRks.placeholder : '')}
            </div>
          </div>
        </div>`;
      fullDocumentHTML += coverPageHTML;

      // 2. Buat Halaman Daftar Isi
      let tocContentHTML = '';
      Object.entries(pageTemplates).forEach(([babKey, babData], index) => {
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

      // 3. Gabungkan semua BAB
      let mainContentHTML = '';
      Object.entries(pageTemplates).forEach(([babKey, babData]) => {
        const processedContent = processMailMerge(babData.content);
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
      for (const key in state.dataMaster) {
        if (DOM[key] && DOM[key].value !== undefined) {
          state.dataMaster[key] = DOM[key].value;
        }
      }
    }

    function onFormChange() {
      updateStateFromForm();
      renderFullDocument();
    }

    // ===================================================================================
    // LOGIKA DOWNLOAD
    // ===================================================================================
    function initializeDownloadFunctionality() {
        const downloadButton = document.getElementById('download-button');
        const downloadModal = document.getElementById('download-format-modal');
        const cancelButton = document.getElementById('download-cancel');
        const wordOption = document.getElementById('download-word');
        const pdfOption = document.getElementById('download-pdf');

        if (!downloadButton || !downloadModal) return;

        const hideModal = () => downloadModal.classList.add('hidden');

        downloadButton.addEventListener('click', () => downloadModal.classList.remove('hidden'));
        cancelButton.addEventListener('click', hideModal);
        downloadModal.addEventListener('click', (event) => {
            if (event.target === downloadModal) hideModal();
        });

        wordOption.addEventListener('click', () => {
            const previewContent = document.getElementById('preview').innerHTML;
            const fullHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Dokumen RKS</title><style>body{font-family:'Times New Roman',serif;font-size:12pt;}p,h1,h2,h3,h4{margin:0;padding:0;}.letterhead-text .company-name{border-bottom:2px solid #000;}.preview-page{page-break-after:always;}</style></head><body>${previewContent}</body></html>`;
            const fileBlob = htmlDocx.asBlob(fullHtml);
            const link = document.createElement('a');
            link.href = URL.createObjectURL(fileBlob);
            link.download = `${state.dataMaster.judulPengadaan || 'Dokumen RKS'}.docx`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            hideModal();
        });

        pdfOption.addEventListener('click', () => {
            const element = document.getElementById('preview');
            const judul = state.dataMaster.judulPengadaan || 'Dokumen RKS';
            const opt = {
              margin: [20, 15, 20, 15], filename: `${judul}.pdf`,
              image: { type: 'jpeg', quality: 0.98 },
              html2canvas: { scale: 2, useCORS: true },
              jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
              pagebreak: { mode: ['css', 'legacy'] }
            };
            html2pdf().set(opt).from(element).save();
            hideModal();
        });
    }

    // ===================================================================================
    // TITIK MULAI EKSEKUSI
    // ===================================================================================
    initializeDOMReferences();
    if (DOM.form) {
      DOM.form.addEventListener('input', onFormChange);
    }
    onFormChange(); // Render awal saat halaman dimuat
    initializeDownloadFunctionality();
  };
}
