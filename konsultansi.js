/**
 * File Data Template untuk Halaman Jasa Konsultansi.
 */

const konsultansiTemplates = {
  'BAB I': {
    title: 'INSTRUKSI KEPADA CALON PENYEDIA JASA KONSULTANSI',
    content: `1.1. Judul Pekerjaan
[Judul Pengadaan]

1.2. Jenis Perjanjian
[Jenis Perjanjian/Kontrak].

1.3. Metode Pengadaan
[Metode Pengadaan].

1.4. Metode Penyampaian
[Metode Penyampaian].

1.5. Pengguna Jasa
[Pengguna].`
  },
  'BAB II': {
    title: 'SYARAT–SYARAT UMUM PERJANJIAN (SSUP)',
    content: `Direksi Pekerjaan: [Direksi Pekerjaan].
Pengawas Pekerjaan: [Pengawas Pekerjaan].`
  },
  'BAB III': {
    title: 'SYARAT–SYARAT KHUSUS PERJANJIAN (SSKP)',
    content: `Ketentuan khusus sesuai edaran PT PLN Enjiniring.`
  },
  'BAB IV': {
    title: 'KERANGKA ACUAN KERJA',
    content: `Lingkup pekerjaan: [Proyek].`
  },
  'BAB V': {
    title: 'LAMPIRAN',
    content: `Lampiran administratif dan teknis.`
  },
  'BAB VI': {
    title: 'PENUTUP',
    content: `Dokumen ini merupakan pedoman pelaksanaan pengadaan jasa konsultansi [Judul Pengadaan].`
  }
};

initializeApp(konsultansiTemplates);
