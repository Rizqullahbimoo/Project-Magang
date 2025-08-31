/**
 * File Data dan Inisialisasi untuk Halaman Jasa Konstruksi.
 * Konten khusus untuk pengadaan jasa konstruksi.
 */

// 1. Definisikan template dokumen KHUSUS untuk Jasa Konstruksi
const konstruksiTemplates = {
    'BAB I': {
        title: 'INSTRUKSI KEPADA CALON PENYEDIA JASA KONSTRUKSI',
        content: `1.1. Judul Pekerjaan
[Judul Pengadaan]

1.2. Lingkup Pekerjaan
Lingkup Pekerjaan konstruksi ini meliputi perencanaan, pelaksanaan, dan pengawasan pekerjaan konstruksi sesuai dengan spesifikasi teknis yang ditetapkan dalam dokumen ini.

1.3. Lokasi Pekerjaan
Lokasi pekerjaan konstruksi ini berada di [Lokasi Proyek] sebagaimana dijelaskan dalam Bab IV dokumen ini.

1.4. Jangka Waktu Pelaksanaan Pekerjaan
Jangka waktu pelaksanaan pekerjaan konstruksi adalah [Jangka Waktu] hari kalender terhitung sejak tanggal dimulainya pekerjaan.

1.5. Sumber Pendanaan
Sumber pendanaan pekerjaan konstruksi ini berasal dari anggaran PT PLN Enjiniring tahun anggaran [Tahun Anggaran].

1.6. Jenis Perjanjian/Kontrak
Pada perjanjian/kontrak pekerjaan konstruksi ini menggunakan sistem [Jenis Perjanjian/Kontrak]. Harga Perjanjian/Kontrak sudah termasuk PPN sebesar 12% dan seluruh biaya lainnya.

1.7. Persyaratan Teknis
Calon penyedia jasa konstruksi harus memenuhi persyaratan teknis sebagai berikut:
a) Memiliki pengalaman dalam pekerjaan sejenis
b) Memiliki tenaga ahli yang kompeten
c) Memiliki peralatan yang memadai
d) Memiliki sistem manajemen mutu

1.8. Metode Pengadaan
Metode pengadaan yang digunakan adalah [Metode Pengadaan] sesuai dengan peraturan yang berlaku.

1.9. Jadwal Pelaksanaan Pengadaan
Pengadaan akan dilaksanakan sesuai dengan jadwal yang tercantum dalam dokumen ini.`
    },
    'BAB II': {
        title: 'SYARAT–SYARAT UMUM PERJANJIAN (SSUP)',
        content: `2.1. Definisi
Dalam perjanjian ini, yang dimaksud dengan:
"Pekerjaan" adalah seluruh pekerjaan konstruksi yang harus diselesaikan oleh Penyedia Jasa.
"Direksi Pekerjaan" adalah pihak yang ditunjuk oleh Pengguna Jasa untuk mengawasi pelaksanaan pekerjaan.
"Pengawas Pekerjaan" adalah pihak yang bertanggung jawab atas pengawasan teknis pekerjaan.

2.2. Hak dan Kewajiban Para Pihak
Para pihak dalam perjanjian ini memiliki hak dan kewajiban sebagaimana diatur dalam peraturan perundang-undangan yang berlaku.

2.3. Waktu Pelaksanaan
Penyedia Jasa wajib menyelesaikan pekerjaan dalam waktu yang telah ditetapkan.`
    },
    'BAB III': {
        title: 'SYARAT–SYARAT KHUSUS PERJANJIAN (SSKP)',
        content: `3.1. Ketentuan Khusus
Ketentuan khusus yang berlaku untuk pekerjaan konstruksi ini adalah sebagai berikut:
a) Standar kualitas material yang harus digunakan
b) Prosedur pengujian material
c) Standar keselamatan kerja
d) Pengelolaan lingkungan

3.2. Pengendalian Mutu
Penyedia Jasa wajib menerapkan sistem pengendalian mutu selama pelaksanaan pekerjaan.`
    },
    'BAB IV': {
        title: 'SPESIFIKASI TEKNIS',
        content: `4.1. Umum
Spesifikasi teknis pekerjaan konstruksi meliputi:
a) Gambar teknik
b) Spesifikasi material
c) Metode pelaksanaan
d) Standar kualitas

4.2. Material
Semua material yang digunakan harus memenuhi standar kualitas yang ditetapkan.`
    },
    'BAB V': {
        title: 'LAMPIRAN',
        content: `5.1. Lampiran Teknis
- Gambar detail konstruksi
- Spesifikasi material
- Jadwal pelaksanaan
- Daftar tenaga kerja

5.2. Lampiran Administratif
- Surat pernyataan
- Dokumen legalitas
- Dokumen pengalaman kerja`
    },
    'BAB VI': {
        title: 'PENUTUP',
        content: `Dokumen ini merupakan pedoman pelaksanaan pengadaan jasa konstruksi [Judul Pengadaan]. Segala perubahan akan diatur dalam addendum tersendiri.`
    }
};

// 2. Memulai aplikasi utama dengan memberikan data template di atas
function initializeApp(templates) {
    // Placeholder: implementasi aplikasi utama di sini
    // Misal: console.log(templates);
    console.log("Aplikasi inisialisasi dengan template:", templates);
    
    // Function to render the preview
    function renderPreview(templates) {
        const previewContainer = document.getElementById('preview');
        previewContainer.innerHTML = ''; // Clear previous content

        for (const section in templates) {
            const template = templates[section];
            const sectionDiv = document.createElement('div');
            sectionDiv.innerHTML = `<h3>${template.title}</h3><p>${template.content}</p>`;
            previewContainer.appendChild(sectionDiv);
        }
    }

    // Call the render function
    renderPreview(konstruksiTemplates);
}
initializeApp(konstruksiTemplates);
