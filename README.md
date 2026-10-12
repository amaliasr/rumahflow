# RumahFlow Frontend

Dashboard keuangan rumah tangga dengan **Next.js / React**, font **Poppins**, tema terang/gelap, dan tampilan responsif untuk desktop serta HP. Semua nominal menggunakan Rupiah.

Repository ini hanya berisi frontend. Backend **CodeIgniter 3.1.13** disediakan sebagai ZIP untuk pemasangan manual, terpisah dari GitHub. Database, data Excel, nota, foto profil, dan kredensial tidak disimpan di repository.

## Alamat hosting

| Komponen | Alamat |
| --- | --- |
| Frontend Next.js | https://rumahflow.rstudiohub.com |
| Backend CI3 | https://api.buildmanagement.id/rumahflow |
| Status backend | https://api.buildmanagement.id/rumahflow/api/auth/status |

Browser memanggil `/api/*` pada domain frontend. Next.js meneruskannya ke `/rumahflow/api/*` pada backend sehingga sesi login dan upload nota tetap memakai origin frontend.

## Deploy frontend

Hosting frontend memerlukan Node.js 22 atau lebih baru. Atur **root directory aplikasi ke `frontend`** dan gunakan:

```sh
npm ci
npm run build
npm start
```

- Build command: `npm run build`.
- Start command: `npm start`; port mengikuti environment `PORT` dari hosting.
- Environment saat **build dan runtime**: `PHP_API_BASE_URL=https://api.buildmanagement.id/rumahflow`.
- Jangan mengatur `RUMAHFLOW_STATIC_EXPORT` untuk hosting dua domain ini.
- Aktifkan HTTPS untuk kedua domain. Jangan cache route `/api/*`.

Contoh environment tersedia di [frontend/.env.example](frontend/.env.example). Target proxy masuk ke hasil build; lakukan build ulang jika alamat backend berubah. Konfigurasi default produksi sudah mengarah ke domain backend di atas.

Backend dipasang dari ZIP sesuai panduan yang ada di dalam paket tersebut. Pastikan backend mengatur `APP_FRONTEND_ORIGIN=https://rumahflow.rstudiohub.com` dan `APP_COOKIE_SECURE=true`. Cookie sesi memakai `Path=/`, tanpa `Domain`, serta `HttpOnly`. Tidak perlu CORS wildcard.

## Pengembangan

Jalankan API CI3 lokal pada port 8088 dan izinkan origin frontend development pada environment PHP:

```dotenv
APP_FRONTEND_ORIGIN=http://127.0.0.1:3000
```

Lalu jalankan frontend:

```sh
cd frontend
npm ci
npm run dev
```

Buka http://127.0.0.1:3000. Proxy development default mengarah ke API lokal port 8088. Ubah `PHP_API_BASE_URL` bila alamat backend berbeda.

`npm run build:php` tersedia untuk menghasilkan folder `frontend/out` yang dapat disalin ke document root PHP pada pemasangan satu origin. Untuk dua domain hosting di atas, gunakan server Next.js melalui build/start biasa.

## Fitur

- Dashboard bulanan, grafik arus kas, saldo per rekening, dan kategori pengeluaran.
- Pemasukan, pengeluaran, upload nota, pencarian, filter, dan edit transaksi.
- Banyak rekening serta kartu kredit dengan limit, utang, dan sisa limit.
- Adjustment saldo akhir, closing, pembukaan bulan baru, dan koreksi bulan lama.
- Auto recharge berupa pencatatan pelunasan CC dari rekening pilihan saat membuka bulan.
- Admin, Inputer, dan Checker; Inputer dapat membuat Checker untuk datanya sendiri.
- Laporan Checker per bulan seperti Excel dan ekspor CSV.
- Profil pribadi, foto, kontak, warna aksen, password, dan tema terang/gelap.

Perhitungan saldo, pembatasan akses, autentikasi, dan penyimpanan dilaksanakan oleh backend CI3. Auto recharge merupakan pencatatan keuangan dan tidak melakukan transfer bank.

## Verifikasi deployment

1. Buka `https://rumahflow.rstudiohub.com/api/auth/status`; respons harus berupa JSON dari backend.
2. Pasang data awal privat pada backend sebelum membuat Admin pertama bila menggunakan referensi Excel.
3. Buat akun Admin, lalu periksa sesi tetap aktif setelah reload.
4. Uji simpan transaksi, upload nota, tampilan gambar, dan ekspor CSV.
5. Periksa akses Checker sesuai pemilik yang ditugaskan.

Tidak ada akun/password bawaan atau data keuangan demo yang dipublikasikan.

## Referensi

Desain terinspirasi [FinPilot oleh Ridoy Ahmed / Arobix Studio](https://dribbble.com/shots/27129601-FinPilot-Personal-Finance-Cashflow-Dashboard). Lisensi Poppins ada di `frontend/public/assets/fonts/OFL.txt`.