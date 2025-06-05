// Variabel global untuk navigasi pratinjau
let allGeneratedPages = []; // Akan menyimpan HTML string untuk setiap halaman
let currentPreviewPageIndex = 0; // Indeks halaman yang sedang ditampilkan

function goToCreateTemplate() {
  window.location.href = "create-template.html";
}

// Fungsi untuk mengubah angka Arab ke Romawi
function toRoman(num) {
  if (isNaN(num) || num < 1 || num > 3999) return num.toString();

  const romanNumerals = [
    { value: 1000, numeral: "M" }, { value: 900, numeral: "CM" },
    { value: 500, numeral: "D" },  { value: 400, numeral: "CD" },
    { value: 100, numeral: "C" },  { value: 90, numeral: "XC" },
    { value: 50, numeral: "L" },   { value: 40, numeral: "XL" },
    { value: 10, numeral: "X" },   { value: 9, numeral: "IX" },
    { value: 5, numeral: "V" },    { value: 4, numeral: "IV" },
    { value: 1, numeral: "I" }
  ];

  let result = "";
  for (let i = 0; i < romanNumerals.length; i++) {
    while (num >= romanNumerals[i].value) {
      result += romanNumerals[i].numeral;
      num -= romanNumerals[i].value;
    }
  }
  return result;
}

function updateBabAndSubBabNumbers() {
    const babSections = document.querySelectorAll('#bab-container .bab-section');
    babSections.forEach((babSection, babIndex) => {
        const babNumberDisplay = babSection.querySelector('.bab-number-display');
        const babRomanNum = toRoman(babIndex + 1);
        if (babNumberDisplay) {
            babNumberDisplay.value = `BAB ${babRomanNum}`;
        }
        // Simpan index bab (berbasis 1) untuk penomoran sub-bab
        babSection.dataset.babIndex = babIndex + 1;

        const subBabItems = babSection.querySelectorAll('.sub-bab-list-container .sub-bab-item'); // Perbaikan selector
        subBabItems.forEach((subBabItem, subBabIndex) => {
            const subBabNumberDisplay = subBabItem.querySelector('.sub-bab-number-display');
            if (subBabNumberDisplay) {
                subBabNumberDisplay.textContent = `${babSection.dataset.babIndex}.${subBabIndex + 1}`;
            }
        });

        const removeBabButton = babSection.querySelector('.remove-bab-button');
        if(removeBabButton) {
            removeBabButton.style.display = babSections.length > 0 ? 'inline-block' : 'none';
        }
    });
}

function addSubBab(buttonElement) {
    const babSection = buttonElement.closest('.bab-section');
    if (!babSection) return;

    const subBabListContainer = babSection.querySelector('.sub-bab-list-container');
    if (!subBabListContainer) {
        console.error("Elemen .sub-bab-list-container tidak ditemukan.");
        return;
    }
    
    const babIndexForNumbering = babSection.dataset.babIndex;
    if (!babIndexForNumbering) {
        console.error("Dataset babIndex tidak ditemukan pada babSection.");
        // Fallback atau panggil updateBabAndSubBabNumbers lagi untuk memastikan dataset ada
        updateBabAndSubBabNumbers(); // Coba update nomor dulu
        // babIndexForNumbering = babSection.dataset.babIndex || (Array.from(document.querySelectorAll('#bab-container .bab-section')).indexOf(babSection) + 1);
        // Jika masih tidak ada, ada masalah fundamental
        if (!babSection.dataset.babIndex) {
             console.error("Gagal mendapatkan babIndex bahkan setelah update.");
             return;
        }
    }


    const subBabCount = subBabListContainer.querySelectorAll('.sub-bab-item').length;
    const subBabNumericId = `${babIndexForNumbering}.${subBabCount + 1}`;

    const subBabItem = document.createElement('div');
    subBabItem.classList.add('sub-bab-item');
    subBabItem.innerHTML = `
        <span class="sub-bab-number-display">${subBabNumericId}</span>
        <input type="text" class="sub-bab-title" placeholder="Judul Sub-BAB ${subBabNumericId}" oninput="updatePreview()">
        <button class="remove-sub-bab-button" type="button" onclick="removeSubBab(this)">&times;</button>
    `;
    subBabListContainer.appendChild(subBabItem);
    updatePreview(); // Update pratinjau setelah sub-bab baru ditambahkan
}

function removeSubBab(buttonElement) {
    const subBabItemToRemove = buttonElement.closest('.sub-bab-item');
    if (!subBabItemToRemove) return;
    
    const babSection = subBabItemToRemove.closest('.bab-section');
    
    subBabItemToRemove.remove();
    
    if (babSection) { // Update nomor sub-bab hanya untuk bab section ini setelah penghapusan
        const babIndexForNumbering = babSection.dataset.babIndex;
        const subBabItems = babSection.querySelectorAll('.sub-bab-list-container .sub-bab-item');
        subBabItems.forEach((item, subBabIndex) => {
            const subBabNumberDisplay = item.querySelector('.sub-bab-number-display');
            if (subBabNumberDisplay && babIndexForNumbering) { // Pastikan babIndexForNumbering ada
                subBabNumberDisplay.textContent = `${babIndexForNumbering}.${subBabIndex + 1}`;
            }
        });
    }
    updatePreview();
}

function addBab() {
  const container = document.getElementById('bab-container');
  const babCount = container.querySelectorAll('.bab-section').length;
  const newBabIndex = babCount + 1;
  const romanCount = toRoman(newBabIndex);

  const section = document.createElement('div');
  section.classList.add('bab-section');
  section.dataset.babIndex = newBabIndex; // Simpan nomor bab Arab (berbasis 1)

  section.innerHTML = `
    <div class="bab-row">
      <input type="text" class="bab-number-display" value="BAB ${romanCount}" disabled />
      <input type="text" class="bab-title" placeholder="Judul Bab ${romanCount}" oninput="updatePreview()" />
      <button class="remove-bab-button" type="button" onclick="removeBab(this)">&times;</button>
    </div>
    <textarea class="bab-content" placeholder="Masukkan konten untuk BAB ${romanCount} di sini..." oninput="updatePreview()"></textarea>
    <div class="sub-bab-controls">
        <button type="button" class="add-sub-bab-button" onclick="addSubBab(this)">+ Tambah Sub-BAB</button>
    </div>
    <div class="sub-bab-list-container">
        </div>
  `;
  container.appendChild(section);
  updateBabAndSubBabNumbers(); 
  updatePreview();
}

function removeBab(buttonElement) {
    const babSectionToRemove = buttonElement.closest('.bab-section');
    if (babSectionToRemove) {
        babSectionToRemove.remove();
        updateBabAndSubBabNumbers(); 
        updatePreview();
    }
}

function getLetterheadHTML() {
  const logoUrl = 'Logo PLNE.png'; // Pastikan nama file ini benar dan ada di direktori Anda
  return `
    <div class="letterhead-container">
      <div class="letterhead-top-border"></div>
      <div class="letterhead-content">
        <div class="letterhead-logo">
          <img src="${logoUrl}" alt="PLN Enjiniring Logo" />
        </div>
        <div class="letterhead-text">
          <p class="company-name">PT. PRIMA LAYANAN NASIONAL ENJINIRING</p>
          <p class="address">Jl. KS.Tubun I No.2, RT.03/RW.02, Kota Bambu Selatan, Kec. Palmerah, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11420</p>
        </div>
      </div>
    </div>
  `;
}

function updatePreview() {
  console.log("updatePreview_mulai"); // DEBUG
  const judulInput = document.getElementById('judul');
  const nomorInput = document.getElementById('nomor');
  const jenisInput = document.getElementById('jenis');
  const bulanInput = document.getElementById('bulan');
  const tahunInput = document.getElementById('tahun');

  const judul = judulInput ? (judulInput.value || judulInput.placeholder) : "Judul Dokumen";
  const nomor = nomorInput ? (nomorInput.value || nomorInput.placeholder) : "Nomor Dokumen";
  const jenis = jenisInput ? (jenisInput.value || jenisInput.placeholder) : "Jenis Dokumen";
  const bulan = bulanInput ? (bulanInput.value || bulanInput.placeholder) : "BULAN";
  const tahun = tahunInput ? (tahunInput.value || tahunInput.placeholder) : "TAHUN";

  const letterhead = getLetterheadHTML();
  
  allGeneratedPages = []; 
  let pageNumberForToC = 0; 

  // 1. Generate HTML Halaman Sampul (Cover)
  pageNumberForToC++;
  const coverPageHTMLString = `
    <div class="preview-page cover-page">
      ${letterhead}
      <div class="page-content-after-letterhead">
        <p style="text-align:center; font-size: 18px; margin-top: 40px; margin-bottom: 10px; font-weight: bold;">${judul.toUpperCase()}</p>
        <p style="text-align:center; font-size: 14px; margin-top: 0; margin-bottom: 40px; color: #333;">NOMOR: ${nomor}</p>
        <p style="text-align:center; font-size: 18px; font-weight: bold; margin-bottom: 30px;">${jenis.toUpperCase()}</p>
        <div style="text-align: center; margin-top: 80px; font-size: 16px; font-weight: bold;">
            ${bulan.toUpperCase()} ${tahun}
        </div>
        </div>
    </div>`;
  allGeneratedPages.push(coverPageHTMLString);
  console.log("Cover page generated."); // DEBUG

  // 2. Generate HTML Halaman Daftar Isi
  pageNumberForToC++;
  const tocDisplayPageForToC = pageNumberForToC;
  let tocPageContentHTML = "";
  const babSections = document.querySelectorAll('#bab-container .bab-section');
  
  let currentContentPageForToC = tocDisplayPageForToC; 

  babSections.forEach((babSection, babIndex) => {
    currentContentPageForToC++; 

    const babNumberDisplay = babSection.querySelector('.bab-number-display');
    const babTitleInput = babSection.querySelector('.bab-title');
    const babNumberText = babNumberDisplay ? babNumberDisplay.value : `BAB ${toRoman(babIndex + 1)}`;
    const babTitleText = babTitleInput ? (babTitleInput.value || "Judul Bab") : "Judul Bab";

    tocPageContentHTML += `<div class="toc-entry toc-level-1">
                            <span class="toc-item-text">${babNumberText} &ndash; ${babTitleText.toUpperCase()}</span>
                            <span class="toc-item-page-num">${currentContentPageForToC}</span>
                          </div>`;

    const subBabItems = babSection.querySelectorAll('.sub-bab-list-container .sub-bab-item');
    subBabItems.forEach((subBabItem) => {
        currentContentPageForToC++; 
        const subBabNumberSpan = subBabItem.querySelector('.sub-bab-number-display');
        const subBabTitleInput = subBabItem.querySelector('.sub-bab-title');
        const subBabNumberText = subBabNumberSpan ? subBabNumberSpan.textContent : ""; // Ambil dari span yang sudah diupdate
        const subBabTitleText = subBabTitleInput ? (subBabTitleInput.value || "Judul Sub-BAB") : "Judul Sub-BAB";
        
        tocPageContentHTML += `<div class="toc-entry toc-level-2">
                                <span class="toc-item-text">${subBabNumberText} &ndash; ${subBabTitleText.toUpperCase()}</span>
                                <span class="toc-item-page-num">${currentContentPageForToC}</span>
                              </div>`;
    });
  });
  
  const tocPageHTMLString = `
    <div class="preview-page toc-page">
      ${letterhead}
      <div class="page-content-after-letterhead">
        <h2 class="toc-title">DAFTAR ISI</h2>
        <div class="toc-list">
          ${tocPageContentHTML}
        </div>
        </div>
    </div>`;
  allGeneratedPages.push(tocPageHTMLString);
  console.log("ToC page generated. Entries:", babSections.length > 0 ? tocPageContentHTML.substring(0,100) : "No BABs"); // DEBUG

  // 3. Generate HTML Halaman Konten BAB
  babSections.forEach((section) => {
    const babNumberInput = section.querySelector('.bab-number-display');
    const titleInput = section.querySelector('.bab-title');
    const contentInput = section.querySelector('.bab-content');
    const babNumberText = babNumberInput ? babNumberInput.value : "";
    const babTitleText = titleInput ? (titleInput.value || "Judul Bab") : "Judul Bab";
    const contentText = contentInput ? contentInput.value.replace(/\n/g, '<br>') : "Konten belum diisi.";

    const babContentPageHTMLString = `
      <div class="preview-page continuous-page">
        ${letterhead}
        <div class="page-content-after-letterhead">
            <h3 style="text-align:center; font-size: 14px; font-weight: bold; margin-top: 20px;">${babNumberText.toUpperCase()}</h3>
            <h4 style="text-align:center; font-size: 13px; font-weight: bold; margin-bottom: 20px;">${babTitleText.toUpperCase()}</h4>
            <div style="font-size: 12px; line-height: 1.6; text-align: justify;">
            ${contentText}
            </div>
            </div>
      </div>`;
    allGeneratedPages.push(babContentPageHTMLString);
  });
  console.log("BAB content pages generated. Count:", babSections.length); // DEBUG

  if (currentPreviewPageIndex >= allGeneratedPages.length && allGeneratedPages.length > 0) {
    currentPreviewPageIndex = allGeneratedPages.length - 1;
  } else if (allGeneratedPages.length === 0) {
    currentPreviewPageIndex = 0; // Atau -1 jika Anda ingin logika displayCurrentPage menangani index 0 dari array kosong
  }
  // Pastikan index tidak negatif jika allGeneratedPages masih kosong setelah semua logika di atas
  if (currentPreviewPageIndex < 0 && allGeneratedPages.length === 0) {
      currentPreviewPageIndex = 0;
  } else if (currentPreviewPageIndex < 0 && allGeneratedPages.length > 0) {
      currentPreviewPageIndex = 0; // Jika ada halaman, mulai dari halaman pertama
  }


  console.log("Total halaman digenerate:", allGeneratedPages.length); // DEBUG
  console.log("Index halaman saat ini akan ditampilkan:", currentPreviewPageIndex); // DEBUG
  displayCurrentPage();
}

function displayCurrentPage() {
  console.log("displayCurrentPage_mulai, index:", currentPreviewPageIndex, "total halaman:", allGeneratedPages.length); //DEBUG
  const previewPanel = document.getElementById('preview');
  const pageIndicator = document.getElementById('pageIndicator');
  const prevBtn = document.getElementById('prevPageBtn');
  const nextBtn = document.getElementById('nextPageBtn');

  if (!previewPanel || !pageIndicator || !prevBtn || !nextBtn) {
    console.error("Elemen kontrol pratinjau tidak ditemukan! Pastikan ID elemen HTML sudah benar.");
    return;
  }

  if (allGeneratedPages.length === 0) {
    previewPanel.innerHTML = "<p style='text-align:center; padding-top:50px;'>Tidak ada konten untuk ditampilkan. Silakan isi form atau tambahkan BAB.</p>";
    pageIndicator.textContent = "Page 0 of 0";
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    console.log("Tidak ada halaman untuk ditampilkan (allGeneratedPages kosong)."); //DEBUG
    return;
  }
  
  // Pencegahan error jika index di luar batas setelah manipulasi array
  if (currentPreviewPageIndex < 0) currentPreviewPageIndex = 0;
  if (currentPreviewPageIndex >= allGeneratedPages.length) currentPreviewPageIndex = allGeneratedPages.length - 1;


  if (allGeneratedPages[currentPreviewPageIndex] !== undefined) {
    previewPanel.innerHTML = allGeneratedPages[currentPreviewPageIndex];
    console.log("innerHTML previewPanel telah di-set dengan halaman " + (currentPreviewPageIndex + 1)); //DEBUG
  } else {
    previewPanel.innerHTML = "<p style='text-align:center; padding-top:50px;'>Error: Konten halaman tidak ditemukan pada index ini.</p>";
    console.error("Error: Konten halaman tidak ditemukan pada index:", currentPreviewPageIndex); //DEBUG
  }
  
  pageIndicator.textContent = `Page ${currentPreviewPageIndex + 1} of ${allGeneratedPages.length}`;
  prevBtn.disabled = (currentPreviewPageIndex === 0);
  nextBtn.disabled = (currentPreviewPageIndex >= allGeneratedPages.length - 1);
}

function nextPage() {
  if (currentPreviewPageIndex < allGeneratedPages.length - 1) {
    currentPreviewPageIndex++;
    displayCurrentPage();
  }
}

function prevPage() {
  if (currentPreviewPageIndex > 0) {
    currentPreviewPageIndex--;
    displayCurrentPage();
  }
}

document.addEventListener('DOMContentLoaded', function() {
  console.log("DOM Content Loaded"); // DEBUG
  currentPreviewPageIndex = 0; 
  updateBabAndSubBabNumbers(); 
  updatePreview(); 
  console.log("Initial preview update called."); // DEBUG
});