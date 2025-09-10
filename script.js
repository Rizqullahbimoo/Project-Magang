function initializeApp(pageTemplates) {
   // Menambahkan 'async' agar bisa menggunakan 'await' untuk render pertama kali
   async function runApp() {
      // ============ STATE ============
      const state = {
         dataMaster: {
            jenisPekerjaan: "",
            judulPengadaan: "",
            noRks: "",
            tanggalRks: "",
            bulanRks: "",
            tahunRks: "",
            metodePengadaan: "",
            metodePenyampaian: "",
            sptTahun: "",
            ppnTahun: "",
            laporanKeuanganTahun: "",
            metodeEvaluasi: "",
            pengguna: "",
            direksiPekerjaan: "",
            pengawasPekerjaan: "",
            pengalamanPekerjaan: "",
            proyek: "",
            jenisPerjanjian: "",
            metodePembayaran: "",
            disusunJabatan: "",
            disusunNama: "",
            mengetahuiJabatan: "",
            mengetahuiNama: "",
            menyetujuiJabatan: "",
            menyetujuiNama: "",
         },
      };
      const DOM = {};

      function initDOM() {
         DOM.form = document.querySelector(".editor-form");
         DOM.previewPanel = document.getElementById("preview");
         for (const key in state.dataMaster) {
            const id = "data-" + key.replace(/([A-Z])/g, "-$1").toLowerCase();
            DOM[key] = document.getElementById(id);
         }
      }

      // ============ HELPERS ============
      function getLetterheadHTML() {
         return `
        <div class="letterhead-container">
          <div class="letterhead-top-border"></div>
          <div class="letterhead-content">
            <div class="letterhead-logo"><img src="asset/Logo PLNE.png" /></div>
            <div class="letterhead-text">
              <p class="company-name">PT. PRIMA LAYANAN NASIONAL ENJINIRING</p>
              <p class="address">Jl. KS.Tubun I No.2, RT.03/RW.02, Kota Bambu Selatan, Jakarta Barat</p>
            </div>
          </div>
        </div>`;
      }

      function processMailMerge(text) {
         if (!text) return "";
         const map = {
            "Judul Pengadaan": state.dataMaster.judulPengadaan,
            "No RKS": state.dataMaster.noRks,
            "Tanggal RKS": state.dataMaster.tanggalRks,
            "Bulan RKS": state.dataMaster.bulanRks,
            "Tahun RKS": state.dataMaster.tahunRks,
            "Metode Pengadaan": state.dataMaster.metodePengadaan,
            "Metode Penyampaian": state.dataMaster.metodePenyampaian,
            SPT: state.dataMaster.sptTahun,
            PPN: state.dataMaster.ppnTahun,
            "Laporan Keuangan Tahun": state.dataMaster.laporanKeuanganTahun,
            "Metode Evaluasi": state.dataMaster.metodeEvaluasi,
            Pengguna: state.dataMaster.pengguna,
            "Direksi Pekerjaan": state.dataMaster.direksiPekerjaan,
            "Pengawas Pekerjaan": state.dataMaster.pengawasPekerjaan,
            "Pengalaman Pekerjaan Sejenis":
               state.dataMaster.pengalamanPekerjaan,
            Proyek: state.dataMaster.proyek,
            "Jenis Perjanjian/Kontrak": state.dataMaster.jenisPerjanjian,
            "Tata Cara Pembayaran": state.dataMaster.metodePembayaran,
            "Disusun Jabatan": state.dataMaster.disusunJabatan,
            "Disusun Nama": state.dataMaster.disusunNama,
            "Mengetahui Jabatan": state.dataMaster.mengetahuiJabatan,
            "Mengetahui Nama": state.dataMaster.mengetahuiNama,
            "Menyetujui Jabatan": state.dataMaster.menyetujuiJabatan,
            "Menyetujui Nama": state.dataMaster.menyetujuiNama,
         };
         return text.replace(/\[(.*?)\]/g, (_, key) =>
            map[key.trim()] !== undefined ? map[key.trim()] : `[${key}]`
         );
      }

      // ============ RENDER (DITULIS ULANG) ============
      async function renderFullDocument() {
         if (!DOM.previewPanel) return;
         DOM.previewPanel.innerHTML =
            '<div style="text-align:center; padding: 40px;">Membuat pratinjau dokumen...</div>';

         const createPageHtml = (content) => `
        <div class="preview-page">
          ${getLetterheadHTML()}
          <div class="page-content-after-letterhead">
            ${content}
          </div>
        </div>`;

         // 1. Render Halaman Sampul (Cover) dan Daftar Isi
         const coverHtml = createPageHtml(`
        <div class="cover-page" style="text-align: center;">
          <p style="margin-top: 10px;">${(
             state.dataMaster.judulPengadaan || "[JUDUL PENGADAAN]"
          ).toUpperCase()}</p>
          <p>NOMOR: ${state.dataMaster.noRks || "[Nomor RKS]"}</p>
          <p style="margin-top: 10px;">DOKUMEN RKS</p>
          <div class="cover-bab-list" style="margin-top: 10px;">
            ${Object.entries(pageTemplates)
               .map(([k, v]) => `<p>${k} – ${v.title.toUpperCase()}</p>`)
               .join("")}
          </div>
          <div style="margin-top: 40px;">
            ${state.dataMaster.tanggalRks || "[Tanggal]"} ${(state.dataMaster.bulanRks || "[Bulan]").toUpperCase()} ${
            state.dataMaster.tahunRks || "[Tahun]"
         }
          </div>
        </div>`);

         const tocHtml = createPageHtml(`
        <h2 class="toc-title">DAFTAR ISI</h2>
        ${Object.entries(pageTemplates)
           .map(
              ([k, v], i) =>
                 `<div class="toc-entry"><span>${k} ${v.title.toUpperCase()}</span><span>${
                    i + 3
                 }</span></div>`
           )
           .join("")}`);

         let finalHtmlOutput = coverHtml + tocHtml;

         // 2. Siapkan div sementara untuk mengukur tinggi konten
         const measureDiv = document.createElement("div");
         measureDiv.className = "preview-page";
         measureDiv.style.visibility = "hidden";
         measureDiv.style.position = "absolute";
         measureDiv.style.left = "-9999px";
         document.body.appendChild(measureDiv);

         measureDiv.innerHTML = createPageHtml("");
         const pageContentMeasureEl = measureDiv.querySelector(
            ".page-content-after-letterhead"
         );

         const letterheadImg = measureDiv.querySelector(".letterhead-logo img");
         if (letterheadImg && !letterheadImg.complete) {
            await new Promise((resolve) => {
               letterheadImg.onload = resolve;
               letterheadImg.onerror = resolve;
            });
         }
         const availableHeight =
            measureDiv.clientHeight - pageContentMeasureEl.offsetTop - 40; // Beri jarak 40px di bawah

         // 3. Proses setiap BAB dan pecah menjadi beberapa halaman jika perlu
         for (const [k, v] of Object.entries(pageTemplates)) {
            const babTitleHtml = `<h3 class="bab-title-for-break">${k}</h3>`;
            const babSubtitleHtml = `<h4 class="bab-subtitle">${v.title.toUpperCase()}</h4>`;
            const fullContent = processMailMerge(v.content);
            const lines = fullContent.split("\n");

            pageContentMeasureEl.innerHTML = babTitleHtml + babSubtitleHtml;

            for (const line of lines) {
               const previousContent = pageContentMeasureEl.innerHTML;
               pageContentMeasureEl.innerHTML += (line || " ") + "\n";

               if (pageContentMeasureEl.scrollHeight > availableHeight) {
                  finalHtmlOutput += createPageHtml(previousContent);
                  pageContentMeasureEl.innerHTML = (line || " ") + "\n";
               }
            }
            finalHtmlOutput += createPageHtml(pageContentMeasureEl.innerHTML);
         }

         // 4. Bersihkan div sementara dan tampilkan hasilnya
         document.body.removeChild(measureDiv);
         DOM.previewPanel.innerHTML = finalHtmlOutput;
      }

      // ============ FORM EVENTS ============
      function updateState() {
         for (const k in state.dataMaster)
            if (DOM[k]) state.dataMaster[k] = DOM[k].value;
      }
      function attachForm() {
         if (DOM.form)
            DOM.form.addEventListener("input", () => {
               updateState();
               renderFullDocument();
            });
      }

      // ============ DOWNLOAD ============
      function initDownload() {
         const btn = document.getElementById("download-button");
         const modal = document.getElementById("download-modal");
         const cancel = document.getElementById("cancel-download");
         const form = document.getElementById("download-form");
         const nameInput = document.getElementById("doc-name");
         if (!btn || !modal) return;

         btn.addEventListener("click", () => {
            nameInput.value = state.dataMaster.judulPengadaan || "Dokumen";
            modal.classList.remove("hidden");
         });
         cancel.addEventListener("click", () => modal.classList.add("hidden"));
         form.addEventListener("submit", (e) => {
            e.preventDefault();
            const fileName = nameInput.value || "Dokumen";
            const type = form.querySelector(
               'input[name="file-type"]:checked'
            ).value;
            const content = DOM.previewPanel.innerHTML;
            if (type === "docx") {
               const blob = window.htmlDocx.asBlob(content);
               const link = document.createElement("a");
               link.href = URL.createObjectURL(blob);
               link.download = `${fileName}.docx`;
               link.click();
            } else {
               const opt = {
                  margin: 0,
                  filename: `${fileName}.pdf`,
                  image: { type: "jpeg", quality: 0.98 },
                  html2canvas: { scale: 2 },
                  jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
               };
               window.html2pdf().set(opt).from(DOM.previewPanel).save();
            }
            modal.classList.add("hidden");
         });
      }

      // ============ INIT ============
      initDOM();
      updateState();
      await renderFullDocument(); // Tunggu render pertama selesai
      attachForm();
      initDownload();
   }
   if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", runApp);
   } else {
      runApp();
   }
}
