function goToCreateTemplate() {
  window.location.href = "create-template.html";
}

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

function updateBabNumbers() {
    const babSections = document.querySelectorAll('#bab-container .bab-section');
    babSections.forEach((section, index) => {
        const babNumberInput = section.querySelector('.bab-number-display');
        const romanCount = toRoman(index + 1);
        if (babNumberInput) {
            babNumberInput.value = `BAB ${romanCount}`;
        }
        const removeButton = section.querySelector('.remove-bab-button');
        if(removeButton) {
            removeButton.style.display = babSections.length > 0 ? 'inline-block' : 'none';
        }
    });
}

function addBab() {
  const container = document.getElementById('bab-container');
  const arabicCount = container.querySelectorAll('.bab-section').length + 1;
  const romanCount = toRoman(arabicCount);

  const section = document.createElement('div');
  section.classList.add('bab-section');
  section.innerHTML = `
    <div class="bab-row">
      <input type="text" class="bab-number-display" value="BAB ${romanCount}" disabled />
      <input type="text" class="bab-title" placeholder="Judul Bab ${romanCount}" oninput="updatePreview()" />
      <button class="remove-bab-button" onclick="removeBab(this)">&times;</button>
    </div>
    <textarea class="bab-content" placeholder="Masukkan konten untuk BAB ${romanCount} di sini..." oninput="updatePreview()"></textarea>
  `;
  container.appendChild(section);
  updateBabNumbers();
  updatePreview();
}

function removeBab(buttonElement) {
    const babSectionToRemove = buttonElement.closest('.bab-section');
    if (babSectionToRemove) {
        babSectionToRemove.remove();
        updateBabNumbers();
        updatePreview();
    }
}

function getLetterheadHTML() {
  const logoUrl = 'Logo PLNE.png'; // MODIFIED HERE
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

  const babListForCover = document.querySelectorAll('#bab-container .bab-section');
  let daftarIsiHTML = "";
  babListForCover.forEach(section => {
    const babNumberInput = section.querySelector('.bab-number-display');
    const titleInput = section.querySelector('.bab-title');
    
    const babNumberText = babNumberInput ? babNumberInput.value : "";
    const titleText = titleInput ? (titleInput.value || "Judul Bab") : "Judul Bab";
    if (babNumberText) {
        daftarIsiHTML += `<p style="margin: 5px 0; text-align: left; padding-left: 40px;"><b>${babNumberText}</b> &ndash; ${titleText.toUpperCase()}</p>`;
    }
  });

  let pagesHTML = "";
  babListForCover.forEach(section => {
    const babNumberInput = section.querySelector('.bab-number-display');
    const titleInput = section.querySelector('.bab-title');
    const contentInput = section.querySelector('.bab-content');

    const babNumberText = babNumberInput ? babNumberInput.value : "";
    const titleText = titleInput ? (titleInput.value || "Judul Bab") : "Judul Bab";
    const contentText = contentInput ? contentInput.value.replace(/\n/g, '<br>') : "Konten belum diisi.";

    pagesHTML += `
      <div class="preview-page continuous-page">
        ${letterhead} 
        <div class="page-content-after-letterhead">
            <h3 style="text-align:center; font-size: 14px; font-weight: bold; margin-top: 20px;">${babNumberText.toUpperCase()}</h3>
            <h4 style="text-align:center; font-size: 13px; font-weight: bold; margin-bottom: 20px;">${titleText.toUpperCase()}</h4>
            <div style="font-size: 12px; line-height: 1.6; text-align: justify;">
            ${contentText}
            </div>
        </div>
      </div>
    `;
  });

  const preview = document.getElementById('preview');
  if (preview) {
    preview.innerHTML = `
      <div class="document-page-container">
        <div class="preview-page cover-page">
          ${letterhead} 
          <div class="page-content-after-letterhead">
            <p style="text-align:center; font-size: 18px; margin-top: 40px; margin-bottom: 10px; font-weight: bold;">${judul.toUpperCase()}</p>
            <p style="text-align:center; font-size: 14px; margin-top: 0; margin-bottom: 40px; color: #333;">NOMOR: ${nomor}</p>
            
            <p style="text-align:center; font-size: 18px; font-weight: bold; margin-bottom: 30px;">${jenis.toUpperCase()}</p>
            
            <div style="margin-top: 50px; margin-bottom: 50px;">
              ${daftarIsiHTML}
            </div>
            
            <div style="text-align: center; margin-top: 80px; font-size: 16px; font-weight: bold;">
                ${bulan.toUpperCase()} ${tahun}
            </div>
          </div>
        </div>

        ${pagesHTML}
      </div>
    `;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  updateBabNumbers();
  updatePreview();
});