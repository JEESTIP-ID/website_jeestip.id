# PRD JEESTIP.ID

> Struktur dokumen ini sudah dirapikan sesuai format baru: Overview, Requirements, Core Features, User Flow, Architecture, Sequence Diagram, Database Schema, dan Tech Stack.

## 1. Overview

### Identitas Produk

**Nama Produk:** JEESTIP.ID  
**Jenis Produk:** Website jasa penitipan barang China ke Indonesia, topup Alipay/Wepay, dan transfer bank China  
**Target Pengguna:** Admin operasional dan customer JEESTIP.ID  
**Stack:** Angular, Tailwind CSS, spartan/ui, NestJS, Drizzle ORM, Better Auth, PostgreSQL, VPS  
**Dokumen untuk:** Implementasi oleh AI Codex / developer

---

### Ringkasan Produk

JEESTIP.ID adalah aplikasi website untuk menampilkan layanan jastip China, rate topup Alipay/Wepay, rate transfer bank China, serta menyediakan dashboard admin dan customer portal.

Website terdiri dari tiga area utama:

1. **Landing Page Publik**  
   Menampilkan informasi rate layanan, status layanan, dan tombol login.

2. **Website Admin**  
   Digunakan admin untuk mengelola customer, invoice, transaksi pembelian, fee, rate jastip singleton, rate topup, rate transfer bank China, admin data, dan import data melalui Excel.

3. **Website Customer**  
   Digunakan customer untuk login dan melihat invoice, fee, dan transaksi pembelian miliknya sendiri.

---

### Tujuan Produk

#### 2.1 Tujuan Bisnis

- Mempermudah customer melihat informasi rate layanan JEESTIP.ID secara transparan.
- Mempermudah admin mengelola data customer, invoice, transaksi pembelian, dan fee.
- Mempermudah customer melihat status transaksi pembelian tanpa harus bertanya manual.
- Membantu operasional jastip agar data lebih rapi, mudah dicari, dan terdokumentasi.
- Mengurangi risiko kesalahan input melalui validasi form dan validasi import Excel.

#### 2.2 Tujuan Teknis

- Membangun aplikasi modular dengan frontend Angular dan backend NestJS.
- Menggunakan PostgreSQL sebagai database utama.
- Menggunakan Drizzle ORM untuk schema, migration, query, dan relasi database.
- Menggunakan Better Auth untuk autentikasi admin dan customer.
- Menyediakan API yang aman, tervalidasi, dan memiliki proteksi agar request create/update/import tidak double fire.
- Menyediakan dokumentasi teknis agar mudah dikembangkan menggunakan AI Codex.

---

### Role dan Hak Akses

| Role | Akses |
|---|---|
| Public Visitor | Melihat landing page, rate topup, rate jastip, rate transfer bank China, dan tombol login. |
| Customer | Login menggunakan `id_customer` dan password. Melihat invoice, fee, dan transaksi pembelian milik sendiri. |
| Admin | Login menggunakan email dan password. Mengelola semua data admin panel. |

---

## 2. Requirements

### Scope Fitur

#### 4.1 In Scope

- Landing page publik.
- Login gabungan admin dan customer.
- Customer first login flow.
- Admin dashboard.
- Create, read, dan update customer. Hard delete tidak dibuat. Definisi teknis disable customer belum ditambahkan untuk versi awal.
- Create, read, dan update invoice. Hard delete tidak dibuat. Definisi teknis cancel invoice belum ditambahkan untuk versi awal.
- Create, read, dan update transaksi pembelian. Hard delete tidak dibuat. Definisi teknis cancel transaksi belum ditambahkan untuk versi awal.
- Create, read, dan update fee. Hard delete tidak dibuat. Definisi teknis cancel fee belum ditambahkan untuk versi awal.
- Rate jastip menggunakan bentuk **single-setting form**: database hanya menyimpan **1 record rate jastip**, admin hanya dapat melihat dan mengupdate data tersebut. Fitur create/delete rate jastip tidak dibuat.
- Create, read, dan update rate topup Alipay/Wepay China. Status open/close tetap mengikuti field status existing.
- Create, read, dan update rate topup Alipay/Wepay Indonesia. Status open/close tetap mengikuti field status existing.
- Create, read, dan update rate transfer bank China. Status open/close tetap mengikuti field status existing.
- Admin data dengan create dan update admin. Hard delete tidak dibuat. Definisi teknis disable admin belum ditambahkan untuk versi awal.
- Forgot password admin melalui email verification.
- Google login untuk admin.
- Customer portal.
- Pagination table.
- Detail page / detail modal untuk data yang perlu disembunyikan dari table utama.
- Import data menggunakan Excel dari menu Settings.
- Validasi dan error report import Excel.
- Audit log admin pada menu Settings untuk aktivitas create, update, delete teknis, dan login.
- Security hardening: rate limiting, Helmet, CORS whitelist, CSRF protection jika memakai cookie, secure cookie, validasi DTO, object-level authorization, dan proteksi sensitive response.
- Optimasi performa: database index, cache public rate, server-side pagination, cursor pagination untuk data besar, dan lazy-loaded frontend route.
- Proteksi double submit dari frontend dan backend.

#### 4.2 Out of Scope untuk Versi Awal

- Payment gateway otomatis.
- Tracking otomatis dari ekspedisi.
- Multi-warehouse.
- Chat customer service.
- Mobile app native.
- Integrasi marketplace China secara otomatis.

---

### Batasan Implementasi Khusus untuk Codex

Codex/developer **wajib mengikuti batasan berikut**:

- Jangan menambahkan definisi status cancel/disable untuk versi awal.
- Jangan menambahkan enum baru seperti `cancelled` atau `disabled`.
- Jangan menambahkan field baru khusus disable seperti `is_active`, `disabled_at`, `cancelled_at`, atau status matrix baru, kecuali sudah dikonfirmasi ulang oleh owner project.
- Jangan membuat endpoint cancel/disable untuk customer, invoice, transaksi pembelian, fee, rate jastip, atau admin data pada implementasi awal.
- Hard delete tetap tidak dibuat untuk data operasional.
- Untuk rate topup Alipay/Wepay dan transfer bank China, status open/close tetap boleh digunakan karena memang sudah ada di database awal.
- Untuk rate jastip, jangan membuat create/delete/list/pagination. Rate jastip adalah 1 record singleton dan hanya boleh diupdate melalui form.
- Jika kebutuhan cancel/disable sudah diputuskan di fase berikutnya, catat aktivitasnya di audit log sebagai action `update`, bukan action baru.

---

### Aturan Validasi Input Penting untuk Codex

Codex/developer wajib menerapkan validasi berikut di **frontend, backend DTO, database constraint bila memungkinkan, dan import Excel**:

#### 4.4.1 Nomor HP Customer

- Field `customers.no_hp` hanya boleh berisi format nomor HP Indonesia yang valid.
- Tidak boleh menerima huruf, simbol acak, spasi, atau tanda baca seperti `-`, `.`, `/`, `()` pada data yang disimpan.
- Format input yang diterima:
  - `08xxxxxxxxxx`
  - `628xxxxxxxxxx`
  - `+628xxxxxxxxxx`
- Nomor harus diawali operator seluler Indonesia: `08`, `628`, atau `+628`.
- Panjang nomor setelah normalisasi harus wajar untuk nomor HP Indonesia, yaitu 10 sampai 15 digit.
- Rekomendasi regex validasi:

```regex
^(?:\+62|62|0)8[1-9][0-9]{7,11}$
```

- Rekomendasi penyimpanan: normalisasi ke format `+62xxxxxxxxxx` sebelum disimpan ke database.
- Contoh valid: `081234567890`, `6281234567890`, `+6281234567890`.
- Contoh tidak valid: `0812abc`, `0812-3456-7890`, `nomor saya`, `12345`, `+621234567`.

#### 4.4.2 Validasi Currency dan Angka Uang

- Semua field uang/rate wajib bertipe numeric/decimal dan tidak boleh bernilai minus.
- Input frontend boleh menampilkan format currency, tetapi payload API dan data Excel harus tetap angka bersih tanpa simbol mata uang.
- Format tampilan IDR: `Rp 1.000.000`.
- Format tampilan Yuan RMB China: `¥ 1,000.00` atau `RMB 1,000.00`, pilih salah satu dan gunakan konsisten di UI.
- Backend tidak boleh menerima string seperti `Rp 10.000`, `¥ 10`, `1 juta`, atau `abc` sebagai nilai numeric.
- Untuk angka uang, gunakan decimal precision, bukan integer biasa dan bukan floating number JavaScript untuk kalkulasi final.
- Validasi minimal:
  - invoice dan transaksi pembelian dalam Yuan RMB China harus `>= 0`.
  - fee, rate topup, transfer bank China, dan rate jastip dalam Rupiah harus `>= 0`, khusus rate layanan sebaiknya `> 0`.

#### 4.4.3 Currency per Modul

| Modul / Field | Currency | Aturan |
|---|---|---|
| `rate_jastip.rate_idr` | IDR/Rupiah | Harga 1 Yuan RMB China dalam Rupiah. Wajib numeric dan tidak boleh minus. Disarankan lebih besar dari 0. |
| `topup_alipay_wepay_china_rates.rate_idr` | IDR/Rupiah | Wajib numeric dan tidak boleh minus. Disarankan lebih besar dari 0. |
| `topup_alipay_wepay_indonesia_rates.rate_idr` | IDR/Rupiah | Wajib numeric dan tidak boleh minus. Disarankan lebih besar dari 0. |
| `transfer_bank_china_rates.rate_idr` | IDR/Rupiah | Wajib numeric dan tidak boleh minus. Disarankan lebih besar dari 0. |
| `fees.price_per_unit_idr` | IDR/Rupiah | Wajib numeric dan tidak boleh minus. |
| `fees.total_idr` | IDR/Rupiah | Wajib numeric dan tidak boleh minus. |
| `invoices.price_yuan` | Yuan RMB China | Wajib numeric dan tidak boleh minus. |
| `purchase_transactions.prices_yuan` | Yuan RMB China | Numeric dan tidak boleh minus jika diisi. |
| `purchase_transactions.total_price_yuan` | Yuan RMB China | Wajib numeric dan tidak boleh minus. |
| `purchase_transaction_items.price_yuan` | Yuan RMB China | Numeric dan tidak boleh minus jika diisi. |

---

### Acceptance Criteria

#### 17.1 Landing Page

- Landing page memakai navbar horizontal di bagian atas.
- Landing page tidak memakai sidebar.
- Visitor dapat melihat rate topup China dan Indonesia.
- Visitor dapat melihat rate transfer bank China.
- Visitor dapat melihat rate jastip.
- Status open/close tampil jelas.
- Tombol login mengarah ke halaman login.

#### 17.2 Login

- Admin dapat login menggunakan email dan password.
- Customer dapat login menggunakan id_customer dan password.
- Customer login pertama diarahkan ke halaman ganti password.
- Password tidak pernah dikirim kembali ke frontend.
- Pesan error login tidak membocorkan apakah akun ada atau tidak.

#### 17.3 Admin

- Website admin memakai sidebar/navbar samping sebagai navigasi utama.
- Admin dapat create/read/update customer, invoice, transaksi pembelian, fee, rate, dan admin data.
- Semua table memiliki pagination default 20 dan limit maksimal 100.
- Jangan membuat fitur cancel/disable dulu sampai definisi teknisnya dikonfirmasi.
- Semua create/update/import memiliki toast feedback success/warning/error sesuai kondisi API.
- Semua error create/update/login memiliki kode error, penjelasan masalah, info API, dan request ID bila tersedia.
- Double submit tidak membuat data duplicate.
- Data operasional tidak di-hard-delete. Untuk versi awal, definisi pembatalan/penonaktifan belum dibuat, sehingga Codex tidak boleh membuat status, field, atau endpoint cancel/disable baru.
- Audit log admin dapat dilihat di Settings dan hanya mencatat create, update, delete teknis, serta login.

#### 17.4 Customer

- Customer portal memakai sidebar/navbar samping sebagai navigasi utama.
- Customer hanya melihat data miliknya sendiri.
- Customer tidak dapat mengakses endpoint admin.
- Customer dapat mengganti password.

#### 17.5 Excel Import

- Admin dapat download template Excel.
- Admin dapat preview file sebelum commit.
- Sistem menolak data dengan format salah.
- Sistem menampilkan error per baris.
- Password dari Excel di-hash sebelum disimpan.

---

### Testing Plan

#### 18.1 Backend Test

- Unit test service create/read/update.
- Unit test validation DTO.
- Integration test auth admin/customer.
- Integration test customer data isolation.
- Integration test pagination max 100.
- Integration test idempotency key.
- Integration test Excel import preview dan commit.
- Integration test object-level authorization customer portal.
- Integration test audit log hanya mencatat create/update/delete teknis jika ada/login.
- Test rate limit login dan import.

#### 18.2 Frontend Test

- Component test DataTable.
- Component test Login page.
- Component test Admin create/update form.
- Test loading button agar tidak double submit.
- Test route guard admin/customer.
- Test landing page rate card.

#### 18.3 Manual QA Checklist

- Login admin berhasil.
- Login customer berhasil.
- Customer first login wajib ganti password.
- Create/read/update customer berhasil.
- Create/read/update invoice berhasil.
- Create/read/update transaksi pembelian berhasil.
- Create/read/update fee berhasil.
- Rate di admin tampil di landing page.
- Import Excel valid berhasil.
- Import Excel invalid menampilkan error.
- View table, pagination, refresh token, dan extend session tidak membuat audit log.
- Customer tidak bisa membuka URL admin.

---

### Dokumentasi yang Harus Dibuat Developer

Developer/Codex harus menghasilkan dokumentasi berikut:

1. `README.md`
   - Cara install.
   - Cara menjalankan frontend/backend.
   - Cara setup env.
   - Cara migration database.
   - Cara seed admin pertama.

2. `DATABASE.md`
   - ERD.
   - Table schema.
   - Relasi.
   - Enum.
   - Index.

3. `API.md`
   - List endpoint.
   - Request payload.
   - Response payload.
   - Error response.
   - Auth requirement.

4. `DEPLOYMENT.md`
   - Setup VPS.
   - Docker Compose.
   - Reverse proxy.
   - SSL.
   - Backup database.

5. `IMPORT_EXCEL.md`
   - Format Excel setiap module.
   - Aturan column.
   - Contoh file.
   - Error handling.

---

### Catatan Penting Implementasi

- Jangan simpan password customer atau admin dalam bentuk plain text.
- Walaupun password awal customer adalah `id_customer`, backend harus langsung menyimpan hash.
- Field `nama_customer` tidak perlu disimpan berulang jika bisa diambil dari relasi `customers`.
- Untuk list item, no toko, dan nama toko, gunakan table detail agar lebih rapi.
- Untuk list invoice pada fee, gunakan table relasi `fee_invoices`.
- Landing page hanya membaca data rate dari API public.
- Semua endpoint admin wajib dilindungi AdminGuard.
- Semua endpoint customer wajib filter berdasarkan customer yang login.
- Semua operasi mutasi data wajib memiliki proteksi idempotency.

---

### Catatan Revisi Security dan Optimasi

Revisi ini menambahkan security hardening dan optimasi performa dengan batasan berikut:

- Data operasional tidak dihapus permanen. Untuk saat ini jangan menambahkan definisi status cancel/disable seperti enum `cancelled`, field `disabled`, field `is_active`, atau status matrix baru. Status open/close pada rate topup/transfer bank tetap mengikuti database awal.
- Audit log admin berada di menu Settings.
- Audit log hanya mencatat `create`, `update`, `delete` teknis, dan `login`.
- Aktivitas berulang seperti view table, buka detail, search, pagination, refresh token, extend session, dan health check tidak dicatat.
- Index database dikurangi agar tidak menimbulkan overhead berlebihan pada insert/update dan import Excel.
- Index awal hanya dipasang pada query yang paling penting untuk customer portal, admin listing, dan audit log.
- Validasi `customers.no_hp` wajib mencegah huruf dan memastikan format nomor HP Indonesia benar.
- Semua field currency/rate wajib mencegah nilai minus di frontend, backend, database constraint bila memungkinkan, dan import Excel.
- `rate_jastip.rate_idr` adalah harga 1 Yuan RMB China dalam Rupiah, bukan nominal bebas.

---

## 3. Core Features

### Landing Page

#### 5.1 Tujuan Landing Page

Landing page bertujuan menampilkan informasi layanan utama JEESTIP.ID dan mengarahkan user ke halaman login.

#### 5.2 Navbar Landing Page

Landing page wajib menggunakan **navbar horizontal di bagian atas halaman**. Navbar tidak boleh menggunakan sidebar pada halaman publik.

Menu navbar atas:

1. **Topup Alipay/Wepay**
2. **Transfer Bank China**
3. **Jastip China**
4. **Login**

Ketentuan navbar landing page:

- Navbar berada di bagian atas halaman.
- Pada desktop, menu ditampilkan horizontal.
- Pada mobile/tablet, menu boleh berubah menjadi hamburger menu/dropdown, tetapi posisi navigasi tetap berasal dari bagian atas halaman.
- Tombol **Login** mengarah ke halaman `/login`.
- Landing page tidak memakai sidebar.

##### Catatan Animasi Navbar Landing Page

Untuk frontend landing page, navbar dibuat dengan inspirasi pola animasi modern seperti website Clay (`https://www.clay.com/`), tetapi **tidak boleh menyalin desain, asset, brand, warna, logo, atau copywriting Clay secara langsung**. Yang ditiru hanya pola interaksi/feel animasinya.

Ketentuan animasi navbar landing page:

- Navbar tetap berbentuk **top navbar horizontal** pada desktop.
- Menu seperti **Topup Alipay/Wepay**, **Transfer Bank China**, dan **Jastip China** boleh memakai animated dropdown/mega-menu ringan.
- Saat user hover atau focus pada menu, dropdown muncul dengan transisi halus seperti fade, slide-down kecil, scale ringan, dan easing yang natural.
- Tambahkan active/hover indicator yang bergerak halus, misalnya underline/rounded highlight yang berpindah mengikuti menu aktif.
- Saat halaman di-scroll, navbar boleh berubah state secara halus, misalnya background menjadi sedikit blur/transparan, border/shadow tipis muncul, atau ukuran padding mengecil.
- Tombol **Login** boleh memiliki micro-interaction seperti hover lift, shadow ringan, atau animated background, tetapi tetap sederhana dan tidak mengganggu performa.
- Pada mobile/tablet, animasi berubah menjadi hamburger/drawer/dropdown dari bagian atas, bukan sidebar.
- Animasi harus tetap ringan, tidak membuat layout shift besar, dan tidak mengganggu Core Web Vitals.
- Wajib mendukung keyboard navigation dan focus state untuk aksesibilitas.
- Wajib menghormati `prefers-reduced-motion`; jika user mengaktifkan reduced motion, animasi harus diperkecil atau dimatikan.

Rekomendasi implementasi frontend:

- Gunakan Angular animation/CSS transition ringan.
- Boleh menggunakan Tailwind CSS utilities untuk transition, transform, backdrop-blur, shadow, opacity, dan duration.
- Hindari library animasi berat kecuali benar-benar diperlukan.
- Jangan memakai video/3D/canvas berat hanya untuk navbar.
- Pastikan komponen navbar reusable dengan nama misalnya `PublicNavbarComponent`.

#### 5.3 Section Topup Alipay/Wepay

Topup dibagi menjadi dua kategori besar:

1. **Topup Alipay/Wepay China**
2. **Topup Alipay/Wepay Indonesia**

Masing-masing kategori memiliki dua kartu:

| Card | Data yang Ditampilkan |
|---|---|
| Sameday | Nama rate, rate, status |
| Instant | Nama rate, rate, status |

Data diambil dari website admin pada menu:

- Rate Topup & Transfer Bank > Topup Alipay/Wepay China
- Rate Topup & Transfer Bank > Topup Alipay/Wepay Indonesia

Ketentuan tampilan:

- Jika status `open`, tampilkan badge **Open**.
- Jika status `close`, tampilkan badge **Close**.
- Rate tampil dalam format Rupiah, contoh `Rp 2.250`.
- Jika data belum tersedia, tampilkan fallback `Rate belum tersedia`.

#### 5.4 Section Transfer Bank China

Transfer Bank China memiliki dua kartu:

| Card | Data yang Ditampilkan |
|---|---|
| Sameday | Rate, jenis, status |
| Instant | Rate, jenis, status |

Data diambil dari website admin pada menu:

- Rate Topup & Transfer Bank > Transfer Bank China

Ketentuan tampilan:

- Rate ditampilkan dalam format currency IDR.
- Jenis hanya boleh `sameday` atau `instant`.
- Status hanya boleh `open` atau `close`.

#### 5.5 Section Jastip China

Data yang ditampilkan:

| Data | Keterangan |
|---|---|
| Keterangan Rate Jastip | Deskripsi rate jastip. |
| Rate Jastip | Nilai 1 Yuan RMB dalam Rupiah. |

Contoh tampilan:

```text
Rate Jastip China
1 Yuan RMB = Rp 2.250
Keterangan: Berlaku untuk transaksi reguler.
```

Data diambil dari website admin pada menu **Rate Jastip**. Untuk versi awal, rate jastip adalah data tunggal/singleton sehingga landing page selalu membaca 1 record rate jastip utama, bukan list data.

---

### Login dan Authentication

#### 6.1 Halaman Login

Route: `/login`

Field login:

| Field | Keterangan |
|---|---|
| Nama / Email | Untuk customer diisi `id_customer`, untuk admin diisi `email`. |
| Password | Untuk customer awalnya menggunakan `id_customer`; untuk admin menggunakan password admin. |

#### 6.2 Login Customer

Ketentuan:

- Customer login menggunakan `id_customer`.
- Password awal customer adalah `id_customer`.
- Password tidak boleh disimpan sebagai plain text.
- Saat customer dibuat, backend harus membuat `password_hash` dari `id_customer`.
- Field tambahan `must_change_password` bernilai `true` saat customer pertama dibuat.
- Tambahkan `failed_login_attempts`, `locked_until`, dan `last_login_at` untuk keamanan login customer.
- Setelah login pertama, customer diarahkan ke halaman ganti password.
- Setelah password diganti, `must_change_password` menjadi `false`.
- Jika customer gagal login berkali-kali, akun dikunci sementara sesuai aturan rate limit.

Flow:

1. Customer input `id_customer` dan password.
2. Backend mencari data customer berdasarkan `id_customer`.
3. Backend memverifikasi password terhadap `password_hash`.
4. Jika password benar dan `must_change_password = true`, arahkan ke `/customer/change-password`.
5. Jika password benar dan password sudah diganti, arahkan ke `/customer/dashboard`.

#### 6.3 Login Admin

Ketentuan:

- Admin login menggunakan email dan password.
- Password admin disimpan sebagai `password_hash`.
- Admin dapat menggunakan fitur lupa password melalui email verification.
- Admin dapat login menggunakan Google OAuth jika fitur diaktifkan.
- Admin harus memiliki `is_verified = true` agar dapat login penuh.
- Admin disarankan/wajib pada production memakai verifikasi tambahan berupa email OTP atau 2FA.
- Tambahkan proteksi failed login, lock sementara, dan pencatatan login pada audit log.

#### 6.4 Deteksi Login Admin atau Customer

Endpoint login dibuat satu:

```http
POST /api/auth/login
```

Backend melakukan pengecekan:

1. Jika identifier berbentuk email, cek table `admin_users`.
2. Jika bukan email, cek table `customers` berdasarkan `id_customer`.
3. Jika data tidak ditemukan, tampilkan error umum: `Nama/email atau password salah`.

Catatan keamanan: jangan membedakan pesan error antara akun tidak ditemukan dan password salah.

---

### Website Admin

#### 7.1 Layout Admin

Website admin wajib menggunakan **navbar samping / sidebar navigation**. Admin panel tidak memakai navbar horizontal utama seperti landing page.

Ketentuan layout admin:

- Sidebar admin berada di samping kiri pada tampilan desktop.
- Konten utama berada di sisi kanan sidebar.
- Pada mobile/tablet, sidebar boleh menjadi drawer/collapsible sidebar.
- Sidebar harus menampilkan menu aktif sesuai halaman yang sedang dibuka.
- Sidebar admin hanya dapat diakses oleh user admin yang sudah login.

Sidebar menu admin:

1. Dashboard
2. Customer
3. Invoice
4. Transaksi Pembelian
5. Fees
6. Rate Jastip
7. Rate Topup & Transfer Bank
   - Topup Alipay/Wepay China
   - Topup Alipay/Wepay Indonesia
   - Transfer Bank China
8. Admin Data
9. Settings
10. Logout

#### 7.2 Standar Table Admin

Semua table admin wajib memiliki:

- Search.
- Pagination.
- Default list 20 data.
- Limit maksimal 100 data per request.
- Sort by tanggal atau created_at jika tersedia.
- Button create.
- Button view detail.
- Button edit.
- Tidak ada tombol hard delete.
- Jangan membuat tombol/fitur cancel atau disable dulu sampai definisi teknisnya dikonfirmasi.
- Confirmation modal tetap wajib untuk aksi mutasi berisiko seperti submit/import/update data penting.
- Toast notification saat sukses atau gagal.
- Loading state.
- Empty state.
- Error state.

Parameter pagination API:

| Parameter | Default | Maksimal | Keterangan |
|---|---:|---:|---|
| page | 1 | - | Nomor halaman. |
| limit | 20 | 100 | Jumlah data per halaman. |
| search | empty | - | Keyword pencarian. |
| sortBy | created_at/tanggal | - | Field sorting. |
| sortOrder | desc | - | `asc` atau `desc`. |

#### 7.3 Proteksi Double Fire API

Semua operasi create, update, delete teknis jika ada, dan import harus dilindungi dari double submit.

##### Frontend

- Disable button saat request sedang berjalan.
- Gunakan loading state per form.
- Jangan izinkan user klik submit berkali-kali.
- Gunakan request guard pada service Angular.
- Untuk operasi create/update/delete teknis jika ada/import, kirim header `X-Idempotency-Key`.
- Jika user klik ulang dengan data sama, frontend tidak mengirim request baru selama request pertama belum selesai.

##### Backend

- Validasi header `X-Idempotency-Key` untuk operasi mutasi data.
- Simpan idempotency key pada table `idempotency_keys`.
- Jika key yang sama dipakai ulang, backend mengembalikan response request pertama.
- Gunakan database transaction untuk create/update/delete teknis jika ada/import.
- Gunakan unique constraint pada field penting seperti `id_customer`, `no_invoice`, email admin, dan id rate.
- Tambahkan rate limiting untuk endpoint sensitif.

---

### Modul Admin Detail

#### 8.1 Menu Customer

Table utama:

| Field | Tampil di Table | Keterangan |
|---|---|---|
| id_customer | Ya | Primary key customer. |
| nama | Ya | Nama customer. |
| no_hp | Ya | Nomor HP customer. |
| alamat | Ya | Alamat customer. |
| password_hash | Tidak | Hanya tampil di detail sebagai status, bukan hash penuh. |
| must_change_password | Detail | Menandakan customer harus ganti password. |

Fitur:

- Create customer.
- Edit customer.
- Hard delete customer tidak dibuat.
- View detail customer.
- Reset password customer ke `id_customer`.
- Pagination default 20, maksimal 100.
- Search berdasarkan id_customer, nama, no_hp.

Business rule:

- `id_customer` wajib unique.
- `no_hp` hanya boleh memakai format nomor HP Indonesia yang valid: `08xxxxxxxxxx`, `628xxxxxxxxxx`, atau `+628xxxxxxxxxx`.
- `no_hp` tidak boleh berisi huruf, spasi, tanda `-`, tanda `.`, atau simbol lain selain `+` pada prefix `+62`.
- Rekomendasi regex `no_hp`: `^(?:\+62|62|0)8[1-9][0-9]{7,11}$`.
- Saat customer dibuat, password awal adalah `id_customer`, tetapi harus disimpan dalam bentuk hash.
- Customer tidak boleh melihat data customer lain.
- Jangan menambahkan field/enum baru untuk disable customer pada versi awal sebelum dikonfirmasi.

#### 8.2 Menu Invoice

Table utama:

| Field | Tampil di Table | Keterangan |
|---|---|---|
| tanggal | Ya | Tanggal invoice. |
| no_invoice | Ya | Nomor invoice. |
| id_customer | Ya | ID customer pemilik invoice. |
| nama_customer | Ya | Nama customer dari relasi customer. |
| price | Ya | Nilai invoice dalam Yuan. |

Fitur:

- Create invoice.
- Edit invoice.
- Hard delete invoice tidak dibuat.
- View detail invoice.
- Search berdasarkan no_invoice, id_customer, nama customer.
- Pagination default 20, maksimal 100.

Business rule:

- `no_invoice` wajib unique.
- `id_customer` wajib sudah ada di table customers.
- `price` menggunakan currency Yuan.
- Nama customer sebaiknya ditampilkan dari join customer, bukan input manual.
- Jangan menambahkan field/enum baru untuk cancel invoice pada versi awal sebelum dikonfirmasi.

#### 8.3 Menu Transaksi Pembelian

Table utama:

| Field | Tampil di Table | Keterangan |
|---|---|---|
| tanggal | Ya | Tanggal transaksi. |
| resi | Ya | Nomor resi. |
| eta | Ya | Estimasi tiba. |
| status | Ya | Status transaksi. |
| total_price | Ya | Total harga dalam Yuan. |
| id_transaksi_pembelian | Tidak | Disembunyikan dari table, dipakai internal. |

Detail data:

| Field | Keterangan |
|---|---|
| list_item | Daftar item transaksi. |
| prices | Harga per item atau subtotal dalam Yuan. |
| no_toko | Nomor toko, dapat berupa list. |
| nama_toko | Nama toko, dapat berupa list. |
| no_invoice | Nomor invoice yang terkait. |
| id_customer | ID customer. |
| nama_customer | Nama customer. |

Status transaksi:

| Status | Keterangan |
|---|---|
| refund | Transaksi refund. |
| close | Transaksi selesai/ditutup. |
| sortir | Barang sedang sortir. |
| on_process | Transaksi sedang diproses. |
| on_ship | Barang sedang dikirim. |

Fitur:

- Create transaksi pembelian.
- Edit transaksi pembelian.
- Hard delete transaksi pembelian tidak dibuat.
- View detail transaksi.
- Search berdasarkan resi, no_invoice, id_customer, nama customer.
- Filter berdasarkan status.
- Filter berdasarkan tanggal.
- Pagination default 20, maksimal 100.

Business rule:

- `id_transaksi_pembelian` tidak perlu tampil di table utama.
- `no_invoice` harus merujuk ke invoice yang valid.
- Jika satu transaksi memiliki banyak item/toko, gunakan table detail terpisah agar data tidak dipaksa menjadi string panjang.
- Jangan menambahkan status baru untuk cancel transaksi pembelian pada versi awal sebelum dikonfirmasi.

#### 8.4 Menu Fees

Table utama:

| Field | Tampil di Table | Keterangan |
|---|---|---|
| tanggal | Ya | Tanggal fee. |
| id_fee | Ya | ID fee. |
| id_customer | Ya | ID customer. |
| nama_customer | Ya | Nama customer. |
| status | Ya | Paid/unpaid. |
| total_harga | Ya | Total harga dalam IDR. |

Detail data:

| Field | Keterangan |
|---|---|
| no_invoice | List nomor invoice. |
| unit_measurement | Volume atau kg. |
| weight_or_volume_unit | Berat atau volume. |
| price_per_unit | Harga per unit dalam IDR. |
| total | Total fee dalam IDR. |

Status fee:

| Status | Keterangan |
|---|---|
| paid | Sudah dibayar. |
| unpaid | Belum dibayar. |

Fitur:

- Create fee.
- Edit fee.
- Hard delete fee tidak dibuat.
- View detail fee.
- Search berdasarkan id_fee, no_invoice, id_customer, nama customer.
- Filter status paid/unpaid.
- Pagination default 20, maksimal 100.

Business rule:

- `id_customer` wajib valid.
- `no_invoice` dalam detail harus valid.
- `total` dapat dihitung otomatis dari `weight_or_volume_unit * price_per_unit`.
- Jangan menambahkan status baru untuk cancel fee pada versi awal sebelum dikonfirmasi.

#### 8.5 Menu Rate Jastip

Menu Rate Jastip **bukan tabel CRUD**. Untuk versi awal, menu ini berbentuk **form setting tunggal** yang hanya menampilkan dan mengupdate 1 data rate jastip utama.

Form field:

| Field | Keterangan |
|---|---|
| id_rate_jastip | ID internal singleton. Tidak perlu diedit oleh admin. Gunakan nilai tetap, contoh `RATE_JASTIP_MAIN`. |
| keterangan | Deskripsi rate jastip yang tampil di landing page. |
| rate | Harga **1 Yuan RMB China dalam Rupiah**. |

Fitur:

- View 1 data rate jastip utama.
- Update keterangan rate jastip.
- Update nilai rate jastip.
- Tampilkan notifikasi success setelah update berhasil.
- Tampilkan warning jika validasi update gagal.
- Tampilkan error jika update gagal karena API/backend/database/network/timeout.

Batasan:

- Jangan membuat fitur create rate jastip dari UI admin.
- Jangan membuat fitur delete rate jastip.
- Jangan membuat list table, search, dan pagination untuk rate jastip karena data hanya 1 record.
- Jangan menambahkan field aktif/nonaktif baru untuk rate jastip pada versi awal sebelum dikonfirmasi.

Business rule:

- `rate` / `rate_idr` adalah **harga 1 Yuan RMB China dalam Rupiah**.
- Rate harus numeric, menggunakan currency IDR/Rupiah, dan tidak boleh minus.
- Rate disarankan wajib lebih besar dari 0 karena rate 0 tidak valid untuk operasional.
- Landing page selalu mengambil 1 data rate jastip utama dari record singleton tersebut.
- Audit log untuk rate jastip hanya mencatat action `update`, bukan `create` atau `delete`, karena create/delete rate jastip tidak dibuat.

#### 8.6 Menu Rate Topup & Transfer Bank

##### 8.6.1 Submenu Topup Alipay/Wepay China

Table:

| Field | Keterangan |
|---|---|
| id | Primary key. |
| nama_rate | Nama rate. |
| rate | Rate dalam Rupiah. |
| jenis | `instant` atau `sameday`. |
| status | `open` atau `close`. |

##### 8.6.2 Submenu Topup Alipay/Wepay Indonesia

Table:

| Field | Keterangan |
|---|---|
| id | Primary key. |
| nama_rate | Nama rate. |
| rate | Rate dalam Rupiah. |
| jenis | `instant` atau `sameday`. |
| status | `open` atau `close`. |

##### 8.6.3 Submenu Transfer Bank China

Table:

| Field | Keterangan |
|---|---|
| id | Primary key. |
| rate | Rate dalam Rupiah. |
| jenis | `instant` atau `sameday`. |
| status | `open` atau `close`. |

Business rule umum:

- `jenis` hanya boleh `instant` atau `sameday`.
- `rate` / `rate_idr` menggunakan currency IDR/Rupiah.
- `rate` / `rate_idr` wajib numeric dan tidak boleh minus.
- Untuk operasional, rate topup dan transfer bank China disarankan wajib lebih besar dari 0.
- `status` di database disimpan sebagai boolean atau enum. Untuk UI lebih jelas gunakan tampilan `open` dan `close`.
- Data rate dengan status `open` tampil di landing page.
- Jika ada lebih dari satu data untuk jenis yang sama, landing page mengambil data terbaru yang statusnya `open` sesuai database awal. Jangan menambahkan field aktif/nonaktif baru di luar status existing.

#### 8.7 Menu Admin Data

Table:

| Field | Keterangan |
|---|---|
| id_serial | Primary key integer. |
| email | Email admin, unique, not null. |
| password_hash | Password yang sudah di-hash. |
| is_verified | Status verifikasi email. |
| verification_token | Token verifikasi. |
| created_at | Waktu data dibuat. |

Fitur:

- Create admin.
- Edit admin.
- Hard delete admin tidak dibuat.
- View detail admin.
- Verify admin.
- Reset password admin.
- Search berdasarkan email.
- Pagination default 20, maksimal 100.

Business rule:

- Email admin wajib unique.
- Password tidak boleh disimpan plain text.
- `verification_token` harus memiliki masa berlaku jika dipakai untuk verifikasi atau reset password.

#### 8.8 Menu Settings

Fitur Settings:

1. Import data dari Excel.
2. Download template Excel setiap module.
3. Validasi file sebelum masuk database.
4. Preview data sebelum import.
5. Menampilkan daftar error per baris jika format salah.
6. Menampilkan riwayat import.
7. Rollback import jika terjadi error fatal.
8. Audit log admin.
9. Filter audit log berdasarkan tanggal, admin, module, action, dan target data.

Aturan Audit Log Admin di Settings:

- Audit log hanya mencatat aktivitas penting: `create`, `update`, `delete`, dan `login`.
- Aktivitas view table, buka detail, search, pagination, refresh token, extend session, dan health check tidak perlu dicatat agar log tidak berulang-ulang.
- Untuk versi awal, jangan membuat fitur atau definisi teknis cancel/disable baru. Jika fitur ini disetujui di masa depan, aktivitasnya dicatat sebagai `update`, bukan action baru.
- Action `delete` hanya digunakan jika ada endpoint delete teknis di masa depan atau untuk data non-operasional yang memang benar-benar dihapus.
- Audit log harus menyimpan ringkasan perubahan penting, admin pelaku, module, target data, IP address, user agent, dan waktu kejadian.
- Field sensitif seperti `password_hash`, token, OTP, dan session token tidak boleh disimpan di audit log.

Module yang dapat di-import:

- Customer
- Invoice
- Transaksi Pembelian
- Fees
- Rate Jastip
- Topup Alipay/Wepay China
- Topup Alipay/Wepay Indonesia
- Transfer Bank China
- Admin Data

---

### Website Customer

#### 9.1 Hak Akses Customer

Customer hanya dapat melihat data miliknya sendiri berdasarkan `id_customer` dari session login.

Customer tidak boleh:

- Melihat customer lain.
- Mengubah invoice.
- Mengubah transaksi pembelian.
- Mengubah fee.
- Mengakses admin panel.

#### 9.2 Menu Customer Portal

Customer portal wajib menggunakan **navbar samping / sidebar navigation**, sama seperti pola admin panel tetapi dengan menu yang lebih terbatas. Customer portal tidak memakai navbar horizontal utama seperti landing page.

Ketentuan layout customer portal:

- Sidebar customer berada di samping kiri pada tampilan desktop.
- Konten utama berada di sisi kanan sidebar.
- Pada mobile/tablet, sidebar boleh menjadi drawer/collapsible sidebar.
- Sidebar harus menampilkan menu aktif sesuai halaman yang sedang dibuka.
- Sidebar customer hanya menampilkan menu yang boleh diakses customer.

Sidebar/customer menu:

1. Dashboard
2. Invoice Saya
3. Fee Saya
4. Transaksi Pembelian Saya
5. Ganti Password
6. Logout

#### 9.3 Invoice Saya

Menampilkan invoice berdasarkan `id_customer` yang sedang login.

Field table:

| Field | Keterangan |
|---|---|
| tanggal | Tanggal invoice. |
| no_invoice | Nomor invoice. |
| price | Harga dalam Yuan. |

#### 9.4 Fee Saya

Menampilkan fee berdasarkan `id_customer` yang sedang login.

Field table:

| Field | Keterangan |
|---|---|
| tanggal | Tanggal fee. |
| id_fee | ID fee. |
| status | Paid/unpaid. |
| total_harga | Total harga dalam IDR. |

#### 9.5 Transaksi Pembelian Saya

Menampilkan transaksi pembelian berdasarkan `id_customer` yang sedang login.

Field table:

| Field | Keterangan |
|---|---|
| tanggal | Tanggal transaksi. |
| resi | Nomor resi. |
| eta | Estimasi tiba. |
| status | Status transaksi. |
| total_price | Total harga dalam Yuan. |

Detail transaksi menampilkan:

- List item.
- Harga item.
- Nomor toko.
- Nama toko.
- Nomor invoice.

---

### Format Excel Import

#### 15.1 Aturan Umum Excel

- File harus `.xlsx`.
- Row pertama wajib header.
- Nama header harus sama dengan template.
- Jangan merge cell.
- Jangan menggunakan formula untuk data penting.
- Format tanggal wajib `YYYY-MM-DD`.
- Numeric tidak boleh memakai simbol mata uang.
- Currency IDR/Rupiah dan Yuan RMB China tetap angka saja.
- Semua nilai uang/rate tidak boleh minus.
- Rate layanan seperti rate jastip singleton, rate topup, dan transfer bank China disarankan wajib lebih besar dari 0.
- Kolom `no_hp` pada customer harus text agar angka 0 di depan tidak hilang.
- Kolom enum harus mengikuti value yang ditentukan.
- Jika ada list invoice atau list toko, gunakan pemisah `|`.
- Data akan divalidasi dulu sebelum commit ke database.

#### 15.2 Template Customer

| Column | Required | Tipe | Aturan |
|---|---|---|---|
| id_customer | Ya | text | Unique, tidak boleh kosong. |
| nama | Ya | text | Nama customer. |
| no_hp | Tidak | text | Nomor HP Indonesia. Tidak boleh huruf. Format valid: `08xxxxxxxxxx`, `628xxxxxxxxxx`, atau `+628xxxxxxxxxx`. Regex: `^(?:\+62|62|0)8[1-9][0-9]{7,11}$`. |
| alamat | Tidak | text | Alamat. |

Password awal otomatis dibuat dari `id_customer` dan disimpan sebagai hash.

#### 15.3 Template Invoice

| Column | Required | Tipe | Aturan |
|---|---|---|---|
| id_invoice | Ya | text | Unique. |
| no_invoice | Ya | text | Unique. |
| tanggal | Ya | date | Format `YYYY-MM-DD`. |
| id_customer | Ya | text | Harus ada di table customers. |
| price_yuan | Ya | numeric | Currency Yuan RMB China. Angka saja, tidak boleh simbol mata uang, tidak boleh minus. |

#### 15.4 Template Transaksi Pembelian

| Column | Required | Tipe | Aturan |
|---|---|---|---|
| id_transaksi_pembelian | Ya | text | Unique. |
| tanggal | Ya | date | Format `YYYY-MM-DD`. |
| no_invoice | Ya | text | Harus ada di table invoices. |
| id_customer | Ya | text | Harus ada di table customers. |
| resi | Tidak | text | Nomor resi. |
| status | Ya | enum | refund, close, sortir, on_process, on_ship. |
| eta | Tidak | date | Format `YYYY-MM-DD`. |
| items_count | Ya | integer | Minimal 0. |
| prices_yuan | Tidak | numeric | Currency Yuan RMB China. Angka saja, tidak boleh simbol mata uang, tidak boleh minus jika diisi. |
| total_price_yuan | Ya | numeric | Currency Yuan RMB China. Angka saja, tidak boleh simbol mata uang, tidak boleh minus. |
| item_name_list | Tidak | text | Pisahkan dengan `|`. |
| no_toko_list | Tidak | text | Pisahkan dengan `|`. |
| nama_toko_list | Tidak | text | Pisahkan dengan `|`. |
| price_yuan_list | Tidak | text | Currency Yuan RMB China. Pisahkan dengan `|`, isi angka saja, tidak boleh minus. |

Contoh list:

```text
item_name_list: Tas A|Sepatu B|Baju C
no_toko_list: T001|T002|T003
nama_toko_list: Toko A|Toko B|Toko C
price_yuan_list: 10.5|20|30
```

#### 15.5 Template Fees

| Column | Required | Tipe | Aturan |
|---|---|---|---|
| id_fee | Ya | text | Unique. |
| tanggal | Ya | date | Format `YYYY-MM-DD`. |
| no_invoice_list | Ya | text | Pisahkan dengan `|`, setiap invoice harus valid. |
| id_customer | Ya | text | Harus ada di table customers. |
| unit_measurement | Ya | enum | volume atau kg. |
| weight_or_volume_unit | Ya | integer | Lebih dari 0. |
| price_per_unit_idr | Ya | numeric | Currency IDR/Rupiah. Angka saja, tidak boleh simbol mata uang, tidak boleh minus. |
| total_idr | Ya | numeric | Currency IDR/Rupiah. Angka saja, tidak boleh simbol mata uang, tidak boleh minus. |
| status | Ya | enum | paid atau unpaid. |

#### 15.6 Rate Jastip Tidak Menggunakan Import Create

Rate Jastip tidak dibuat sebagai import list karena hanya menyimpan **1 data singleton**. Admin mengubah rate jastip melalui form menu Rate Jastip.

Jika di fase berikutnya owner ingin update rate jastip melalui Excel, Excel tersebut hanya boleh bersifat **update singleton**, bukan create data baru. Format yang diizinkan:

| Column | Required | Tipe | Aturan |
|---|---|---|---|
| keterangan | Tidak | text | Keterangan rate. |
| rate_idr | Ya | numeric | Harga 1 Yuan RMB China dalam IDR/Rupiah. Angka saja, tidak boleh simbol mata uang, tidak boleh minus, disarankan > 0. |

Catatan untuk Codex: Jangan membuat import Excel yang menambah banyak row rate jastip. Jangan menerima `id_rate_jastip` dari Excel untuk membuat data baru.

#### 15.7 Template Topup Alipay/Wepay China

| Column | Required | Tipe | Aturan |
|---|---|---|---|
| id | Ya | text | Unique. |
| nama_rate | Ya | text | Nama rate. |
| rate_idr | Ya | numeric | Currency IDR/Rupiah. Angka saja, tidak boleh simbol mata uang, tidak boleh minus, disarankan > 0. |
| jenis | Ya | enum | instant atau sameday. |
| status | Ya | enum/boolean | open/close atau true/false. |

#### 15.8 Template Topup Alipay/Wepay Indonesia

| Column | Required | Tipe | Aturan |
|---|---|---|---|
| id | Ya | text | Unique. |
| nama_rate | Ya | text | Nama rate. |
| rate_idr | Ya | numeric | Currency IDR/Rupiah. Angka saja, tidak boleh simbol mata uang, tidak boleh minus, disarankan > 0. |
| jenis | Ya | enum | instant atau sameday. |
| status | Ya | enum/boolean | open/close atau true/false. |

#### 15.9 Template Transfer Bank China

| Column | Required | Tipe | Aturan |
|---|---|---|---|
| id | Ya | text | Unique. |
| rate_idr | Ya | numeric | Currency IDR/Rupiah. Angka saja, tidak boleh simbol mata uang, tidak boleh minus, disarankan > 0. |
| jenis | Ya | enum | instant atau sameday. |
| status | Ya | enum/boolean | open/close atau true/false. |

#### 15.10 Template Admin Data

| Column | Required | Tipe | Aturan |
|---|---|---|---|
| email | Ya | email | Unique. |
| password | Tidak | text | Jika kosong, backend generate temporary password. |
| is_verified | Tidak | boolean | true/false. |

Password dari Excel tidak boleh disimpan langsung. Backend wajib melakukan hashing.

---

### Lampiran Update Layout Navigasi

Codex wajib mengikuti aturan layout navigasi berikut:

1. **Landing page/public page** memakai navbar horizontal di bagian atas.
2. **Website admin** memakai sidebar/navbar samping.
3. **Customer portal** memakai sidebar/navbar samping.
4. Landing page navbar wajib memiliki animasi modern dengan inspirasi pola interaksi seperti Clay, yaitu animated dropdown/mega-menu ringan, smooth hover/focus transition, active indicator, dan scroll state yang halus.
5. Animasi navbar landing page tidak boleh menyalin desain/asset/brand Clay secara langsung.
6. Pada mobile/tablet, sidebar admin dan customer boleh berubah menjadi drawer/collapsible sidebar.
7. Pada mobile/tablet, landing page tetap memakai top navigation dengan hamburger/drawer/dropdown dari atas, bukan sidebar.
8. Landing page tidak boleh memakai sidebar.
9. Admin panel dan customer portal tidak memakai navbar horizontal utama seperti landing page sebagai navigasi utama.
10. Animasi wajib ringan, accessible, dan mendukung `prefers-reduced-motion`.

## 4. User Flow

### 4.1 Public Visitor Flow

1. Visitor membuka `jeestip.id`.
2. Frontend landing page menampilkan top navbar horizontal dengan menu Topup Alipay/Wepay, Transfer Bank China, Jastip China, dan Login.
3. Frontend mengambil data rate dari `GET /api/public/landing-rates`.
4. Backend mengambil rate jastip singleton, topup Alipay/Wepay China, topup Alipay/Wepay Indonesia, dan transfer bank China dari database.
5. Landing page menampilkan card rate, status open/close, CTA login, dan informasi layanan.
6. Jika visitor menekan Login, frontend redirect ke `/login`.

### 4.2 Customer Login dan Customer Portal Flow

1. Customer membuka `/login`.
2. Customer mengisi field Nama/Email dengan `id_customer` dan password.
3. Frontend mengirim request ke `POST /api/auth/login`.
4. Backend mendeteksi identifier bukan email, lalu mencari data customer berdasarkan `id_customer`.
5. Backend memverifikasi password hash.
6. Jika `must_change_password = true`, customer diarahkan ke `/customer/change-password`.
7. Jika login normal, customer diarahkan ke `/customer/dashboard`.
8. Saat customer membuka Invoice Saya, Fee Saya, atau Transaksi Pembelian Saya, backend wajib mengambil `id_customer` dari session dan melakukan filter data berdasarkan session tersebut.
9. Customer tidak boleh melihat data customer lain meskipun mengetahui URL atau ID data.

### 4.3 Pemilik/Admin Login dan Admin Panel Flow

1. Pemilik/admin membuka `/login`.
2. Admin mengisi field Nama/Email dengan email admin dan password.
3. Frontend mengirim request ke `POST /api/auth/login`.
4. Backend mendeteksi identifier berbentuk email, lalu mencari data admin berdasarkan email.
5. Backend memverifikasi password hash, status verifikasi, account lock, dan session.
6. Jika berhasil, admin diarahkan ke `/admin/dashboard`.
7. Admin mengelola customer, invoice, transaksi pembelian, fee, rate topup, transfer bank China, admin data, settings, dan rate jastip singleton.
8. Semua create/update/import memakai validation, idempotency key, loading state, toast notification, dan audit log sesuai aturan PRD.

### 4.4 Rate Jastip Singleton Flow

1. Admin membuka menu Rate Jastip.
2. Frontend mengambil 1 record utama dari `GET /api/admin/rate-jastip`.
3. Admin hanya dapat mengupdate `keterangan` dan `rate_idr`.
4. Frontend mengirim `PATCH /api/admin/rate-jastip`.
5. Backend memvalidasi rate sebagai IDR/Rupiah, harga 1 Yuan RMB China dalam Rupiah, numeric, dan tidak minus.
6. Backend mengupdate record singleton `RATE_JASTIP_MAIN`.
7. Backend mencatat audit log action `update`.
8. Landing page membaca data terbaru melalui public API.

### 4.5 Import Excel Flow

1. Admin membuka Settings > Import Excel.
2. Admin memilih module dan upload file `.xlsx`.
3. Frontend mengirim file ke endpoint preview.
4. Backend melakukan parsing, validasi header, validasi tipe data, validasi nomor HP, validasi currency, validasi foreign key, dan validasi enum.
5. Backend mengembalikan preview data dan daftar error per baris.
6. Jika data valid, admin melakukan commit import.
7. Backend menjalankan transaction, insert/update data, menyimpan import batch, menyimpan import error jika ada, dan mengembalikan response success/warning/error.

### 4.6 Error dan Notification Flow

1. Frontend menerima response API.
2. Jika response 2xx, tampilkan success toast.
3. Jika response 400/409/422, tampilkan warning toast dan field error.
4. Jika response 500/502/503/timeout/network error, tampilkan error toast dengan kode error dan request ID bila tersedia.
5. Frontend tidak boleh menampilkan dua toast untuk satu request yang sama.

## 5. Architecture

### 5.1 High-Level Architecture

```text
Public Visitor / Customer / Pemilik Admin
        |
        v
Angular Frontend Web
- Landing Page
- Admin Panel
- Customer Portal
        |
        v
NestJS Backend API
- Auth API
- Admin API
- Customer API
- Public Landing API
- Settings Import API
        |
        v
PostgreSQL Database
- Data customer
- Invoice
- Transaksi pembelian
- Fee
- Rate
- Admin users
- Audit log
- Import log
```

Prinsip arsitektur:

- Frontend Angular hanya mengakses data melalui API backend.
- Backend NestJS menjadi pusat validasi, authorization, idempotency, audit log, dan security.
- PostgreSQL menjadi source of truth untuk semua data operasional.
- Customer portal wajib memakai object-level authorization berdasarkan session customer.
- Public landing page hanya membaca data rate melalui endpoint public yang aman dan dapat di-cache.

### API Design

#### 12.1 API Base URL

```text
/api
```

#### 12.2 Standard Response

Success:

```json
{
  "success": true,
  "message": "Data berhasil diproses",
  "data": {},
  "meta": {}
}
```

Error:

Implementasi utama wajib memakai format **Standard Error Response Detail** pada section 12.2.1. Jangan memakai format error sederhana yang tidak memiliki `code`, `explanation`, `api`, `request_id`, dan `timestamp`.

Paginated response:

```json
{
  "success": true,
  "data": [],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 120,
    "totalPages": 6
  }
}
```


#### 12.2.1 Standard Error Response Detail

Backend wajib mengembalikan error response dengan format konsisten agar frontend bisa menampilkan notifikasi success, warning, dan error dengan benar.

Format error API wajib memiliki:

- `code`: kode error stabil untuk frontend dan debugging.
- `message`: pesan singkat yang aman ditampilkan ke user.
- `explanation`: penjelasan masalah yang lebih detail tetapi tidak membocorkan data sensitif atau raw database error.
- `api`: informasi endpoint/API yang menyebabkan error.
- `details`: detail field atau detail validasi jika ada.
- `request_id`: ID request untuk membantu tracing log backend.
- `timestamp`: waktu error terjadi.

Contoh standard error response:

```json
{
  "success": false,
  "error": {
    "code": "CUSTOMER_CREATE_VALIDATION_ERROR",
    "message": "Data customer belum valid.",
    "explanation": "Nomor HP customer tidak boleh berisi huruf dan harus memakai format nomor HP Indonesia yang valid.",
    "api": {
      "method": "POST",
      "endpoint": "/api/admin/customers",
      "http_status": 400,
      "module": "customers",
      "action": "create"
    },
    "details": [
      {
        "field": "no_hp",
        "issue": "Nomor HP harus format Indonesia, contoh 081234567890 atau +6281234567890."
      }
    ],
    "request_id": "req_20260618_xxxxx",
    "timestamp": "2026-06-18T13:00:00.000Z"
  }
}
```

Format error login karena masalah API/backend:

```json
{
  "success": false,
  "error": {
    "code": "AUTH_LOGIN_SERVICE_ERROR",
    "message": "Login belum bisa diproses.",
    "explanation": "Terjadi masalah pada API atau backend saat memproses login. Silakan coba lagi beberapa saat lagi.",
    "api": {
      "method": "POST",
      "endpoint": "/api/auth/login",
      "http_status": 503,
      "module": "auth",
      "action": "login"
    },
    "details": [],
    "request_id": "req_20260618_yyyyy",
    "timestamp": "2026-06-18T13:00:00.000Z"
  }
}
```

Catatan keamanan:

- Jangan expose raw SQL error, stack trace, nama tabel internal yang tidak perlu, token, password hash, atau detail sensitif lain ke frontend.
- Untuk login gagal karena credential salah, pesan ke user tetap umum: `Nama/email atau password salah`.
- Untuk login gagal karena API/backend/network/server, tampilkan error dengan kode seperti `AUTH_LOGIN_SERVICE_ERROR`, bukan pesan credential salah.

#### 12.2.2 Kategori Notification Handler Frontend

Frontend wajib memiliki handler notifikasi global untuk response API.

| Tipe Notifikasi | Kondisi | Contoh Pesan User | Contoh Sumber |
|---|---|---|---|
| Success | Create/update data berhasil dengan response 2xx | `Data berhasil disimpan.` / `Data berhasil diperbarui.` | POST/PATCH berhasil |
| Warning | Request diterima API tetapi data tidak valid atau melanggar aturan bisnis | `Data belum valid. Periksa kembali input.` | 400, 409, 422 |
| Error | Request gagal karena API/backend/database/network/timeout/server error | `Terjadi masalah pada sistem. Silakan coba lagi.` | 500, 502, 503, timeout, network error |

Aturan wajib:

- Success notification hanya muncul setelah API benar-benar mengembalikan status berhasil.
- Warning notification digunakan untuk kesalahan input create/update seperti nomor HP tidak valid, currency minus, format tanggal salah, data duplikat, foreign key tidak ditemukan, atau validasi Excel gagal.
- Error notification digunakan untuk kegagalan sistem seperti API tidak bisa diakses, backend error, database error, timeout, session bermasalah, atau login gagal karena service error.
- Jangan menampilkan success jika request sebenarnya gagal atau rollback.
- Jangan menampilkan dua toast untuk satu request yang sama.
- Notifikasi harus mendukung `request_id` agar admin/developer bisa mencari log backend.

#### 12.2.3 Daftar Kode Error API Minimum

Gunakan format kode error uppercase dengan pola umum:

```text
{MODULE}_{ACTION}_{ERROR_TYPE}
```

Contoh module: `AUTH`, `CUSTOMER`, `INVOICE`, `PURCHASE_TRANSACTION`, `FEE`, `RATE_JASTIP`, `RATE_TOPUP`, `TRANSFER_BANK`, `ADMIN_USER`, `IMPORT`, `IDEMPOTENCY`.

Contoh action: `LOGIN`, `CREATE`, `UPDATE`, `READ`, `IMPORT`, `VALIDATE`.

Contoh error type: `VALIDATION_ERROR`, `NOT_FOUND`, `DUPLICATE`, `FORBIDDEN`, `SERVICE_ERROR`, `DATABASE_ERROR`, `NETWORK_ERROR`, `TIMEOUT`, `RATE_LIMITED`.

| Kode Error | HTTP Status | Tipe Notifikasi | Penjelasan Masalah | Info API yang Wajib Ada |
|---|---:|---|---|---|
| `VALIDATION_ERROR` | 400 | Warning | Data request tidak sesuai aturan validasi. | method, endpoint, module, action, request_id |
| `DUPLICATE_DATA` | 409 | Warning | Data unik sudah ada, misalnya `id_customer`, `no_invoice`, atau id rate duplikat. | method, endpoint, module, action, request_id |
| `RELATED_DATA_NOT_FOUND` | 404 | Warning | Data relasi tidak ditemukan, misalnya `id_customer` atau `no_invoice` tidak valid. | method, endpoint, module, action, request_id |
| `FORBIDDEN_ACCESS` | 403 | Error | User tidak punya akses ke resource tersebut. | method, endpoint, module, action, request_id |
| `AUTH_LOGIN_INVALID_CREDENTIALS` | 401 | Warning | Nama/email atau password salah. Jangan jelaskan apakah akun ditemukan atau tidak. | method, endpoint, module auth, action login, request_id |
| `AUTH_ACCOUNT_LOCKED` | 423 | Warning | Akun dikunci sementara karena terlalu banyak gagal login. | method, endpoint, module auth, action login, request_id |
| `AUTH_RATE_LIMITED` | 429 | Warning | Terlalu banyak request login/forgot password/import. | method, endpoint, module, action, request_id |
| `AUTH_LOGIN_SERVICE_ERROR` | 503 | Error | Login gagal diproses karena masalah API/backend/service auth. | method, endpoint, module auth, action login, request_id |
| `API_NETWORK_ERROR` | 0 | Error | Frontend tidak bisa terhubung ke API, koneksi terputus, DNS error, atau CORS/network issue. | endpoint target, module, action, request_id jika tersedia |
| `API_TIMEOUT` | 408/504 | Error | Request terlalu lama dan timeout. | method, endpoint, module, action, request_id |
| `BACKEND_SERVICE_ERROR` | 500/502/503 | Error | Backend/API mengalami error internal. | method, endpoint, module, action, request_id |
| `DATABASE_ERROR` | 500 | Error | Query database gagal, constraint error tidak tertangani, atau koneksi database bermasalah. | method, endpoint, module, action, request_id |
| `IDEMPOTENCY_CONFLICT` | 409 | Warning | Request double submit dengan payload berbeda pada idempotency key yang sama. | method, endpoint, module idempotency, action create/update, request_id |

Contoh kode spesifik yang disarankan:

| Modul | Create | Update |
|---|---|---|
| Customer | `CUSTOMER_CREATE_VALIDATION_ERROR` | `CUSTOMER_UPDATE_VALIDATION_ERROR` |
| Invoice | `INVOICE_CREATE_VALIDATION_ERROR` | `INVOICE_UPDATE_VALIDATION_ERROR` |
| Transaksi Pembelian | `PURCHASE_TRANSACTION_CREATE_VALIDATION_ERROR` | `PURCHASE_TRANSACTION_UPDATE_VALIDATION_ERROR` |
| Fee | `FEE_CREATE_VALIDATION_ERROR` | `FEE_UPDATE_VALIDATION_ERROR` |
| Rate Jastip | Tidak dibuat | `RATE_JASTIP_UPDATE_VALIDATION_ERROR` |
| Rate Topup | `RATE_TOPUP_CREATE_VALIDATION_ERROR` | `RATE_TOPUP_UPDATE_VALIDATION_ERROR` |
| Transfer Bank China | `TRANSFER_BANK_CREATE_VALIDATION_ERROR` | `TRANSFER_BANK_UPDATE_VALIDATION_ERROR` |
| Admin User | `ADMIN_USER_CREATE_VALIDATION_ERROR` | `ADMIN_USER_UPDATE_VALIDATION_ERROR` |

#### 12.2.4 Contoh Mapping Error Create/Update

| Skenario | HTTP Status | Kode Error | Tipe Notifikasi | Pesan User |
|---|---:|---|---|---|
| Nomor HP customer berisi huruf | 400 | `CUSTOMER_CREATE_VALIDATION_ERROR` | Warning | `Nomor HP tidak valid. Gunakan format 081234567890 atau +6281234567890.` |
| Rate jastip diinput minus saat update | 400 | `RATE_JASTIP_UPDATE_VALIDATION_ERROR` | Warning | `Rate jastip tidak boleh minus.` |
| Harga fee diinput minus | 400 | `FEE_CREATE_VALIDATION_ERROR` | Warning | `Harga fee tidak boleh minus.` |
| Invoice Yuan RMB diinput minus | 400 | `INVOICE_CREATE_VALIDATION_ERROR` | Warning | `Harga invoice tidak boleh minus.` |
| `id_customer` pada invoice tidak ditemukan | 404 | `RELATED_DATA_NOT_FOUND` | Warning | `Customer tidak ditemukan.` |
| `id_customer` duplikat saat create customer | 409 | `DUPLICATE_DATA` | Warning | `ID customer sudah digunakan.` |
| Backend gagal menyimpan data | 500 | `BACKEND_SERVICE_ERROR` | Error | `Data gagal disimpan karena masalah sistem.` |
| Database tidak bisa diakses | 503 | `DATABASE_ERROR` | Error | `Database sedang bermasalah. Silakan coba lagi.` |
| API timeout saat update data | 408/504 | `API_TIMEOUT` | Error | `Request terlalu lama. Silakan coba lagi.` |
| Login gagal karena API auth error | 503 | `AUTH_LOGIN_SERVICE_ERROR` | Error | `Login belum bisa diproses. Silakan coba lagi.` |


#### 12.3 Auth API

| Method | Endpoint | Akses | Keterangan |
|---|---|---|---|
| POST | /auth/login | Public | Login admin/customer. |
| POST | /auth/logout | Admin/Customer | Logout. |
| GET | /auth/me | Admin/Customer | Ambil session user. |
| POST | /auth/change-password | Admin/Customer | Ganti password. |
| POST | /auth/forgot-password | Public | Request reset password admin. |
| POST | /auth/reset-password | Public | Reset password dengan token. |
| GET | /auth/google | Public | Redirect login Google admin. |
| GET | /auth/google/callback | Public | Callback Google OAuth. |

Payload login:

```json
{
  "identifier": "CUS001 atau admin@email.com",
  "password": "password"
}
```

#### 12.4 Public Landing API

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | /public/rates/topup/china | Rate Topup Alipay/Wepay China. |
| GET | /public/rates/topup/indonesia | Rate Topup Alipay/Wepay Indonesia. |
| GET | /public/rates/transfer-bank-china | Rate Transfer Bank China. |
| GET | /public/rates/jastip | Rate Jastip singleton untuk landing page. Ambil 1 record utama `RATE_JASTIP_MAIN`. |
| GET | /public/landing-rates | Gabungan semua rate untuk landing page. |

#### 12.5 Admin Customer API

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | /admin/customers | List customer. |
| POST | /admin/customers | Create customer. |
| GET | /admin/customers/:id_customer | Detail customer. |
| PATCH | /admin/customers/:id_customer | Update customer. |
| POST | /admin/customers/:id_customer/reset-password | Reset password customer. |

Catatan: Jangan membuat endpoint disable customer dulu. Definisi disable customer belum dikonfirmasi.

#### 12.6 Admin Invoice API

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | /admin/invoices | List invoice. |
| POST | /admin/invoices | Create invoice. |
| GET | /admin/invoices/:id_invoice | Detail invoice. |
| PATCH | /admin/invoices/:id_invoice | Update invoice. |

Catatan: Jangan membuat endpoint cancel invoice dulu. Definisi cancel invoice belum dikonfirmasi.

#### 12.7 Admin Transaksi Pembelian API

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | /admin/purchase-transactions | List transaksi pembelian. |
| POST | /admin/purchase-transactions | Create transaksi pembelian. |
| GET | /admin/purchase-transactions/:id | Detail transaksi pembelian. |
| PATCH | /admin/purchase-transactions/:id | Update transaksi pembelian. |

Catatan: Jangan membuat endpoint cancel transaksi pembelian dulu. Definisi cancel transaksi belum dikonfirmasi.

#### 12.8 Admin Fees API

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | /admin/fees | List fee. |
| POST | /admin/fees | Create fee. |
| GET | /admin/fees/:id_fee | Detail fee. |
| PATCH | /admin/fees/:id_fee | Update fee. |

Catatan: Jangan membuat endpoint cancel fee dulu. Definisi cancel fee belum dikonfirmasi.

#### 12.9 Admin Rate API

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | /admin/rate-jastip | Ambil 1 data rate jastip singleton untuk form admin. |
| PATCH | /admin/rate-jastip | Update 1 data rate jastip singleton. |

Catatan: Jangan membuat endpoint `POST /admin/rate-jastip`, `DELETE /admin/rate-jastip/:id`, list table, search, atau pagination untuk rate jastip. Rate jastip hanya boleh diupdate dari form tunggal. Jangan membuat endpoint disable rate jastip dulu. Definisi disable rate jastip belum dikonfirmasi.

Rate Topup & Transfer Bank endpoints:

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | /admin/rates/topup/china | List topup China. |
| POST | /admin/rates/topup/china | Create topup China. |
| PATCH | /admin/rates/topup/china/:id | Update topup China. |
| PATCH | /admin/rates/topup/china/:id/status | Update status open/close topup China memakai field status existing. |
| GET | /admin/rates/topup/indonesia | List topup Indonesia. |
| POST | /admin/rates/topup/indonesia | Create topup Indonesia. |
| PATCH | /admin/rates/topup/indonesia/:id | Update topup Indonesia. |
| PATCH | /admin/rates/topup/indonesia/:id/status | Update status open/close topup Indonesia memakai field status existing. |
| GET | /admin/rates/transfer-bank-china | List transfer bank China. |
| POST | /admin/rates/transfer-bank-china | Create transfer bank China. |
| PATCH | /admin/rates/transfer-bank-china/:id | Update transfer bank China. |
| PATCH | /admin/rates/transfer-bank-china/:id/status | Update status open/close transfer bank China memakai field status existing. |

#### 12.10 Admin Data API

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | /admin/admin-users | List admin. |
| POST | /admin/admin-users | Create admin. |
| GET | /admin/admin-users/:id | Detail admin. |
| PATCH | /admin/admin-users/:id | Update admin. |
| POST | /admin/admin-users/:id/send-verification | Kirim email verifikasi. |

Catatan: Jangan membuat endpoint disable admin dulu. Definisi disable admin belum dikonfirmasi.

#### 12.11 Customer Portal API

Semua endpoint customer harus otomatis filter berdasarkan session `id_customer`.

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | /customer/me | Data customer login. |
| GET | /customer/invoices | Invoice milik customer. |
| GET | /customer/invoices/:id_invoice | Detail invoice milik customer. |
| GET | /customer/fees | Fee milik customer. |
| GET | /customer/fees/:id_fee | Detail fee milik customer. |
| GET | /customer/purchase-transactions | Transaksi pembelian milik customer. |
| GET | /customer/purchase-transactions/:id | Detail transaksi milik customer. |

#### 12.12 Settings Import API

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | /admin/settings/import-templates | List template import. |
| GET | /admin/settings/import-templates/:module | Download template Excel module. |
| POST | /admin/settings/import/:module/preview | Preview dan validasi file. |
| POST | /admin/settings/import/:module/commit | Commit hasil import ke database. |
| GET | /admin/settings/import-batches | Riwayat import. |
| GET | /admin/settings/import-batches/:id | Detail hasil import dan error. |
| GET | /admin/settings/audit-logs | List audit log admin. |
| GET | /admin/settings/audit-logs/:id | Detail audit log admin. |

---

### Backend Specification

#### 13.1 Struktur Folder NestJS

```text
backend/
  src/
    app.module.ts
    main.ts
    config/
    database/
      schema/
      migrations/
      drizzle.service.ts
    common/
      decorators/
      filters/
      guards/
      interceptors/
      pipes/
      utils/
    auth/
    admin/
      customers/
      invoices/
      purchase-transactions/
      fees/
      rate-jastip/
      rates/
      admin-users/
      settings/
    customer/
      invoices/
      fees/
      purchase-transactions/
    public/
      landing-rates/
```

#### 13.2 Module Backend

| Module | Keterangan |
|---|---|
| AuthModule | Login admin/customer, logout, session, forgot password, Google OAuth. |
| CustomersModule | Create/read/update customer admin. |
| InvoicesModule | Create/read/update invoice admin dan read-only customer. |
| PurchaseTransactionsModule | Create/read/update transaksi admin dan read-only customer. |
| FeesModule | Create/read/update fee admin dan read-only customer. |
| RateJastipModule | Read/update singleton rate jastip dan public landing data. Tidak ada create/delete dari UI/API admin. |
| RatesModule | Create/read/update topup/transfer bank dan public landing data. |
| AdminUsersModule | Create/read/update admin data. |
| SettingsModule | Excel import, template, import history, audit log admin. |
| IdempotencyModule | Proteksi double request. |

#### 13.3 Middleware / Guard / Interceptor

| Komponen | Fungsi |
|---|---|
| AuthGuard | Validasi session/token user. |
| AdminGuard | Memastikan user adalah admin. |
| CustomerGuard | Memastikan user adalah customer. |
| IdempotencyInterceptor | Mencegah double create/update/delete teknis jika ada/import. |
| ValidationPipe | Validasi DTO request. |
| HttpExceptionFilter | Format error response konsisten dengan `code`, `message`, `explanation`, `api`, `details`, `request_id`, dan `timestamp`. |
| RequestIdMiddleware/Interceptor | Membuat atau meneruskan `X-Request-ID` untuk tracing error API/backend. |
| LoggingInterceptor | Logging request penting tanpa mencatat view table, pagination, refresh token, atau extend session. |

#### 13.4 Validasi Backend

Validasi wajib:

- Required field.
- Format email.
- Format tanggal `YYYY-MM-DD`.
- `customers.no_hp` wajib numeric phone format Indonesia jika diisi, tidak boleh huruf, dan harus lolos regex `^(?:\+62|62|0)8[1-9][0-9]{7,11}$`.
- Numeric value harus angka dan tidak negatif.
- Field currency IDR/Rupiah: `rate_jastip.rate_idr`, semua `rate_idr` topup/transfer bank, `fees.price_per_unit_idr`, dan `fees.total_idr`.
- Field currency Yuan RMB China: `invoices.price_yuan`, `purchase_transactions.prices_yuan`, `purchase_transactions.total_price_yuan`, dan `purchase_transaction_items.price_yuan`.
- Semua field currency tidak boleh minus; rate layanan seperti rate jastip, topup, dan transfer bank China disarankan wajib lebih besar dari 0.
- `rate_jastip.rate_idr` wajib dipahami sebagai harga 1 Yuan RMB China dalam Rupiah.
- Enum hanya menerima value yang diizinkan.
- Foreign key harus valid.
- Limit pagination tidak boleh lebih dari 100.

#### 13.5 Security Backend

- Password hashing untuk admin dan customer.
- Session cookie secure.
- CSRF protection jika menggunakan cookie-based session.
- CORS restriction hanya ke domain frontend.
- Helmet security headers.
- Rate limit endpoint auth dan import.
- Validasi input untuk mencegah SQL injection dan XSS.
- Jangan return `password_hash` ke frontend.
- Jangan expose detail error database ke user.
- Semua error API wajib memakai kode error stabil dan menyertakan info API yang aman untuk frontend.
- Audit log admin untuk `create`, `update`, `delete`, dan `login` saja.
- Object-level authorization untuk customer portal: customer hanya boleh membaca data dengan `id_customer` dari session.
- Proteksi mass assignment: DTO whitelist dan larangan update field internal seperti `password_hash`, `is_verified`, `created_at`, dan token.
- Jangan return field sensitif: `password_hash`, `verification_token`, reset token, OTP, session token, dan raw error database.
- Rate limit khusus untuk login, forgot password, verify OTP, reset password, dan import Excel.
- Lock sementara akun setelah gagal login berulang.
- Admin production memakai email OTP/2FA atau Google OAuth dengan email terverifikasi.

#### 13.6 Rate Limit dan Account Lock Policy

Rekomendasi rate limit backend:

| Endpoint | Limit | Keterangan |
|---|---:|---|
| POST /auth/login | 5 request / menit / IP + identifier | Cegah brute force login. |
| POST /auth/forgot-password | 3 request / 10 menit / email | Cegah spam email. |
| POST /auth/reset-password | 5 request / 10 menit / token/email | Cegah percobaan token berulang. |
| POST /auth/verify-otp | 5 request / 10 menit / email | Cegah brute force OTP. |
| POST /admin/settings/import/:module/preview | 3 request / menit / admin | Cegah upload berulang. |
| POST /admin/settings/import/:module/commit | 3 request / menit / admin | Cegah commit import berulang. |

Account lock policy:

- Setelah 5 kali gagal login beruntun, akun dikunci sementara 15 menit.
- Reset `failed_login_attempts` menjadi 0 saat login berhasil.
- Simpan `last_login_at` saat login berhasil.
- Pesan error login tetap umum: `Nama/email atau password salah`.

#### 13.7 Object-Level Authorization

Aturan wajib untuk semua endpoint customer:

- Backend mengambil `id_customer` dari session, bukan dari body/query yang dikirim frontend.
- Query customer portal wajib memakai filter `where id_customer = session.user.id_customer`.
- Customer tidak boleh membaca invoice, fee, atau transaksi pembelian customer lain meskipun mengetahui ID data.
- Endpoint admin tetap wajib memakai `AdminGuard`.

Contoh rule backend:

```ts
const customerId = session.user.idCustomer;
return invoiceRepository.findMany({
  where: { idCustomer: customerId },
});
```

#### 13.8 Optimasi Backend dan Database

##### 13.8.1 Kebijakan Index agar Overhead Terkendali

Index memang mempercepat query baca, tetapi setiap index juga menambah biaya storage, insert, update, delete teknis, dan maintenance database. Karena JEESTIP.ID memiliki fitur import Excel dan banyak operasi create/update dari admin, index awal harus dibuat secukupnya saja.

Aturan versi awal:

- Jangan membuat index untuk semua kolom.
- Jangan membuat index untuk tabel rate kecil yang isinya hanya sedikit data dan lebih sering dibaca melalui cache landing page.
- Prioritaskan index untuk tabel yang akan sering dicari oleh customer portal dan admin.
- Tambah index baru hanya setelah ada bukti dari query lambat, `EXPLAIN ANALYZE`, atau data sudah besar.
- Evaluasi index setiap 1-3 bulan menggunakan statistik database.

Index awal yang direkomendasikan hanya 4 index utama:

```sql
CREATE INDEX idx_invoices_customer_date
ON invoices (id_customer, tanggal DESC);

CREATE INDEX idx_fees_customer_status_date
ON fees (id_customer, status, tanggal DESC);

CREATE INDEX idx_purchase_transactions_customer_status_date
ON purchase_transactions (id_customer, status, tanggal DESC);

CREATE INDEX idx_admin_audit_logs_created_at
ON admin_audit_logs (created_at DESC);
```

Index yang sengaja tidak dibuat di versi awal:

| Index | Status | Alasan |
|---|---|---|
| `idx_invoices_status_date` | Tidak dibuat | Struktur invoice versi awal belum memiliki status utama. Jika nanti status invoice sering difilter, baru tambahkan. |
| `idx_purchase_transactions_resi` | Opsional | Tambahkan hanya jika admin sering mencari transaksi berdasarkan resi. |
| `idx_rate_jastip_status_or_active` | Tidak dibuat | Rate jastip versi awal belum memiliki field aktif/nonaktif. Tabel rate kecil dan data landing page memakai cache. |
| `idx_topup_china_jenis_status` | Tidak dibuat | Data rate topup sangat kecil, query tidak berat. |
| `idx_topup_indonesia_jenis_status` | Tidak dibuat | Data rate topup sangat kecil, query tidak berat. |
| `idx_transfer_bank_china_jenis_status` | Tidak dibuat | Data transfer bank sangat kecil, query tidak berat. |
| `idx_admin_audit_logs_date_action` | Diganti | Cukup mulai dari `created_at DESC`. Tambahkan composite `(created_at DESC, action)` jika filter action sudah sering dipakai. |

Index tambahan yang boleh dipertimbangkan nanti:

```sql
-- Tambahkan jika search resi sering dipakai dan data transaksi sudah besar.
CREATE INDEX idx_purchase_transactions_resi
ON purchase_transactions (resi);

-- Tambahkan jika audit log sering difilter per admin dan module.
CREATE INDEX idx_admin_audit_logs_admin_module_date
ON admin_audit_logs (admin_id, module_name, created_at DESC);
```

##### 13.8.2 Optimasi Query

- Gunakan server-side pagination untuk semua table.
- Default `limit = 20`, maksimum `limit = 100`.
- Siapkan cursor pagination untuk data yang sudah besar.
- Gunakan `select` field seperlunya; jangan selalu `select *`.
- Landing page mengambil rate dari endpoint gabungan `/public/landing-rates`.
- Cache public landing rates selama 30-120 detik.
- Invalidate cache saat admin mengubah rate jastip, topup, atau transfer bank China.
- Import Excel besar dapat diproses melalui queue/background job agar request tidak timeout.

#### 13.9 Environment Variables Backend

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/jeestip
APP_URL=https://jeestip.id
FRONTEND_URL=https://jeestip.id
BETTER_AUTH_SECRET=change-me
BETTER_AUTH_URL=https://jeestip.id
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM=no-reply@jeestip.id
```

---

### Frontend Specification

#### 14.1 Struktur Folder Angular

```text
frontend/
  src/
    app/
      core/
        guards/
        interceptors/
        services/
      shared/
        components/
        ui/
        pipes/
        utils/
      features/
        landing/
        auth/
        admin/
          dashboard/
          customers/
          invoices/
          purchase-transactions/
          fees/
          rate-jastip/
          rates/
          admin-users/
          settings/
        customer/
          dashboard/
          invoices/
          fees/
          purchase-transactions/
          change-password/
```

#### 14.2 Routes

```text
/
/login
/customer/change-password
/customer/dashboard
/customer/invoices
/customer/fees
/customer/purchase-transactions
/admin/dashboard
/admin/customers
/admin/invoices
/admin/purchase-transactions
/admin/fees
/admin/rate-jastip
/admin/rates/topup-china
/admin/rates/topup-indonesia
/admin/rates/transfer-bank-china
/admin/admin-users
/admin/settings
```

#### 14.3 Frontend Components

Shared components:

- AppShell.
- PublicNavbar: navbar horizontal di bagian atas khusus landing page/public page.
- AdminSidebar: sidebar/navbar samping khusus website admin.
- CustomerSidebar: sidebar/navbar samping khusus customer portal.
- DataTable.
- Pagination.
- SearchInput.
- StatusBadge.
- CurrencyText.
- DateText.
- ConfirmDialog.
- Toast.
- LoadingButton.
- EmptyState.
- ErrorState.
- DetailDrawer/DetailModal.
- ExcelImportDialog.

#### 14.4 Frontend API Helper dan Notification Handler

Buat service wrapper:

```text
ApiService
  - get<T>()
  - post<T>()
  - patch<T>()
  - delete<T>() tidak dibuat untuk data operasional; hanya dibuat jika nanti ada kebutuhan delete teknis yang sudah dikonfirmasi
```

Buat notification handler global:

```text
NotificationService
  - success(message, options?)
  - warning(message, options?)
  - error(message, options?)
```

Ketentuan ApiService:

- Otomatis attach credential/session.
- Otomatis handle standard success response dan standard error response.
- Otomatis membaca `error.code`, `error.message`, `error.explanation`, `error.api`, `error.details`, dan `error.request_id` dari response API.
- Otomatis generate `X-Idempotency-Key` untuk method POST/PATCH/DELETE.
- Bisa menampilkan toast success/warning/error sesuai hasil API.
- Untuk create/update, success toast hanya muncul jika API benar-benar berhasil.
- Untuk validasi create/update, tampilkan warning toast dan field error.
- Untuk error API/backend/network/login service, tampilkan error toast dengan kode error dan request ID bila ada.
- Jangan menampilkan toast dobel untuk satu request.

Contoh behavior create/update:

```text
POST/PATCH success 2xx:
  Toast success: Data berhasil disimpan / Data berhasil diperbarui.

POST/PATCH 400/409/422:
  Toast warning: Data belum valid. Periksa kembali input.
  Tampilkan field error pada form.

POST/PATCH 500/502/503/timeout/network error:
  Toast error: Data gagal diproses karena masalah sistem.
  Tampilkan kode error dan request ID jika tersedia.
```

Contoh behavior login:

```text
401 AUTH_LOGIN_INVALID_CREDENTIALS:
  Toast warning: Nama/email atau password salah.

423 AUTH_ACCOUNT_LOCKED:
  Toast warning: Akun dikunci sementara. Silakan coba lagi nanti.

429 AUTH_RATE_LIMITED:
  Toast warning: Terlalu banyak percobaan. Silakan coba beberapa saat lagi.

500/502/503 AUTH_LOGIN_SERVICE_ERROR atau BACKEND_SERVICE_ERROR:
  Toast error: Login belum bisa diproses karena masalah sistem.
```

#### 14.5 Double Submit Guard Frontend

Form submit harus memiliki state:

```ts
isSubmitting = false;
```

Rule:

- Saat submit dimulai, `isSubmitting = true`.
- Button disabled saat `isSubmitting = true`.
- Setelah request selesai, `isSubmitting = false`.
- Jika request masih berjalan, submit berikutnya diabaikan.

#### 14.6 UI/UX Requirement

- Responsive untuk desktop, tablet, dan mobile.
- Admin table nyaman digunakan di desktop.
- Mobile admin minimal tetap bisa scroll horizontal jika data banyak.
- Gunakan spartan/ui untuk komponen UI utama.
- Gunakan Tailwind CSS untuk styling.
- Gunakan badge warna berbeda untuk status open/close, paid/unpaid, dan status transaksi.
- Gunakan confirmation modal untuk aksi mutasi berisiko.
- Gunakan toast/notification handler untuk success, warning, dan error.
- Setelah create data berhasil, tampilkan notifikasi success.
- Setelah update/edit data berhasil, tampilkan notifikasi success.
- Jika create/update gagal karena validasi atau aturan bisnis, tampilkan notifikasi warning.
- Jika create/update/login gagal karena API, backend, database, network, atau timeout, tampilkan notifikasi error dengan kode error dan request ID bila tersedia.


#### 14.7 Optimasi Frontend Angular

- Gunakan lazy-loaded routes untuk menu admin dan customer portal.
- Gunakan server-side pagination, filtering, dan sorting pada semua table.
- Gunakan debounce untuk search input.
- Hindari render seluruh data sekaligus; jangan mengambil lebih dari limit maksimum 100 per request.
- Gunakan loading state per tombol/form untuk mencegah double submit.
- Gunakan confirmation modal untuk aksi mutasi berisiko seperti update data penting, reset password, import, atau perubahan status existing open/close pada rate topup/transfer bank.
- Gunakan toast notification untuk success, warning, dan error sesuai standard error response API.
- Untuk landing page, optimasi gambar dengan ukuran sesuai kebutuhan dan lazy loading.
- Pisahkan bundle admin dan customer agar landing page tetap ringan.

---

### Aturan Frontend untuk Input Nomor HP dan Currency

Frontend Angular wajib menerapkan aturan berikut agar user tidak mudah salah input:

#### Nomor HP Customer

- Field `no_hp` menggunakan `inputmode="tel"` atau komponen phone input sederhana.
- Tidak boleh menerima huruf.
- Saat user mengetik, boleh melakukan sanitize untuk menghapus spasi, tanda `-`, dan karakter tidak valid sebelum validasi akhir.
- Validasi akhir tetap harus menolak data yang tidak sesuai format `08xxxxxxxxxx`, `628xxxxxxxxxx`, atau `+628xxxxxxxxxx`.
- Tampilkan error message: `Nomor HP harus format Indonesia, contoh 081234567890 atau +6281234567890.`

#### Currency IDR dan Yuan RMB China

- Gunakan komponen currency input untuk tampilan, tetapi simpan nilai internal sebagai decimal/numeric bersih.
- Tombol minus atau input `-` harus ditolak untuk semua field uang/rate.
- Jangan kirim simbol `Rp`, `¥`, `RMB`, koma, atau titik ribuan ke API.
- Payload API harus numeric string/decimal, contoh `15000`, `15000.50`, bukan `Rp 15.000`.
- Tampilan UI:
  - IDR/Rupiah: `Rp 15.000`.
  - Yuan RMB China: `RMB 100.00` atau `¥ 100.00`.
- Gunakan format yang konsisten antara table, detail, form, dan landing page.

---

## 6. Sequence Diagram

### 16.1 Login Gabungan Admin dan Customer

```mermaid
sequenceDiagram
  participant U as User
  participant FE as Angular Frontend
  participant BE as NestJS Backend
  participant DB as PostgreSQL

  U->>FE: Input nama/email dan password
  FE->>BE: POST /api/auth/login
  BE->>BE: Cek identifier email atau id_customer
  alt Identifier email
    BE->>DB: Cari admin by email
    DB-->>BE: Admin data
  else Identifier id_customer
    BE->>DB: Cari customer by id_customer
    DB-->>BE: Customer data
  end
  BE->>BE: Verify password hash
  alt must_change_password true
    BE-->>FE: Login success + mustChangePassword
    FE-->>U: Redirect ke ganti password
  else normal login
    BE-->>FE: Session created
    FE-->>U: Redirect dashboard sesuai role
  end
```

### 16.2 Create/Update dengan Idempotency

```mermaid
sequenceDiagram
  participant A as Admin
  participant FE as Angular Admin
  participant BE as NestJS API
  participant ID as Idempotency Store
  participant DB as PostgreSQL

  A->>FE: Klik Submit
  FE->>FE: Disable button dan generate X-Idempotency-Key
  FE->>BE: POST create data + key
  BE->>ID: Cek key
  alt Key sudah ada
    ID-->>BE: Return response lama
    BE-->>FE: Response lama
  else Key baru
    BE->>DB: Begin transaction
    BE->>DB: Insert data
    BE->>ID: Simpan key dan response
    BE->>DB: Commit
    BE-->>FE: Success
  end
  FE->>FE: Enable button
```

### 16.3 Landing Page Mengambil Rate

```mermaid
sequenceDiagram
  participant V as Visitor
  participant FE as Landing Page
  participant BE as Public API
  participant DB as PostgreSQL

  V->>FE: Buka jeestip.id
  FE->>BE: GET /api/public/landing-rates
  BE->>DB: Ambil rate jastip, topup, transfer bank
  DB-->>BE: Data rate untuk landing page
  BE-->>FE: Response landing rates
  FE-->>V: Tampilkan card rate dan status
```

### 16.4 Import Excel

```mermaid
sequenceDiagram
  participant A as Admin
  participant FE as Settings Page
  participant BE as Import API
  participant DB as PostgreSQL

  A->>FE: Upload Excel
  FE->>BE: POST /preview
  BE->>BE: Parse dan validasi file
  BE-->>FE: Preview data + error list
  alt Tidak ada error fatal
    A->>FE: Klik Commit Import
    FE->>BE: POST /commit
    BE->>DB: Begin transaction
    BE->>DB: Insert/update data
    BE->>DB: Simpan import batch
    BE->>DB: Commit
    BE-->>FE: Import success
  else Ada error
    FE-->>A: Tampilkan error per row
  end
```


### 16.5 Sequence Diagram Pemilik/Admin Mengelola Data Operasional

Diagram ini menjelaskan alur umum ketika pemilik/admin mengelola data operasional dari website admin, mulai dari frontend web, backend API, sampai database. Alur ini berlaku untuk create/update data customer, invoice, transaksi pembelian, fee, rate topup, transfer bank China, admin data, dan update rate jastip singleton. Untuk rate jastip, hanya gunakan update record singleton, bukan create/delete.

```mermaid
sequenceDiagram
  actor O as Pemilik/Admin
  participant FE as Frontend Web Admin Angular
  participant API as Backend API NestJS
  participant DB as Database PostgreSQL

  O->>FE: Login dan buka menu admin
  FE->>API: GET /api/auth/me
  API->>DB: Validasi session dan role admin
  DB-->>API: Data session admin valid
  API-->>FE: Admin authorized

  O->>FE: Input atau edit data operasional
  FE->>FE: Validasi form, disable submit, generate X-Idempotency-Key
  FE->>API: POST/PATCH endpoint admin + payload + idempotency key
  API->>API: AdminGuard, DTO validation, idempotency check

  alt Data tidak valid
    API-->>FE: Warning response dengan kode error validasi
    FE-->>O: Tampilkan warning toast dan field error
  else Data valid
    API->>DB: Begin transaction
    API->>DB: Insert/update data sesuai module
    API->>DB: Simpan audit log create/update/login jika diperlukan
    API->>DB: Commit transaction
    DB-->>API: Data tersimpan
    API-->>FE: Success response + data terbaru
    FE-->>O: Tampilkan success toast dan refresh table/form
  end

  alt Backend/API/Database bermasalah
    API-->>FE: Error response dengan code, explanation, api, request_id
    FE-->>O: Tampilkan error toast + request ID
  end
```

### 16.6 Sequence Diagram Customer Melihat Data Miliknya

Diagram ini menjelaskan alur customer dari customer portal hingga backend API dan database. Backend wajib mengambil `id_customer` dari session login, bukan dari body/query/frontend, agar customer hanya melihat invoice, fee, dan transaksi pembelian miliknya sendiri.

```mermaid
sequenceDiagram
  actor C as Customer
  participant FE as Frontend Web Customer Angular
  participant API as Backend API NestJS
  participant DB as Database PostgreSQL

  C->>FE: Login dan buka customer portal
  FE->>API: GET /api/auth/me
  API->>DB: Validasi session customer
  DB-->>API: Data session customer valid
  API-->>FE: Customer authorized + id_customer dari session

  C->>FE: Buka Invoice Saya / Fee Saya / Transaksi Saya
  FE->>API: GET /api/customer/invoices atau fees atau purchase-transactions
  API->>API: CustomerGuard dan object-level authorization
  API->>API: Ambil id_customer dari session, bukan dari request body/query
  API->>DB: Query data WHERE id_customer = session.user.id_customer
  DB-->>API: Data milik customer login saja
  API-->>FE: Response data customer portal
  FE-->>C: Tampilkan data invoice/fee/transaksi milik customer

  alt Customer mencoba akses data customer lain dari URL
    FE->>API: GET /api/customer/invoices/:id_invoice
    API->>API: Validasi kepemilikan data berdasarkan session id_customer
    API->>DB: Query detail WHERE id_invoice = param AND id_customer = session.user.id_customer
    DB-->>API: Tidak ada data / bukan milik customer
    API-->>FE: 403/404 response aman
    FE-->>C: Tampilkan warning/error tanpa membocorkan data customer lain
  end

  alt API/Backend/Database bermasalah
    API-->>FE: Error response dengan code, explanation, api, request_id
    FE-->>C: Tampilkan error toast + request ID jika tersedia
  end
```

---

## 7. Database Schema

### Database Design

#### 10.1 Prinsip Database

- Gunakan snake_case untuk nama table dan column.
- Semua table utama memiliki `created_at` dan `updated_at`.
- Tidak menggunakan soft delete untuk versi saat ini.
- Data operasional tidak dihapus permanen.
- Jangan menambahkan definisi teknis cancel/disable seperti enum `cancelled`, field `disabled`, field `is_active`, atau status matrix baru sampai dikonfirmasi oleh owner project.
- Status existing tetap dipakai sesuai database awal, misalnya status transaksi dari database dan status open/close pada rate topup/transfer bank.
- Gunakan foreign key untuk relasi customer, invoice, fee, dan transaksi pembelian.
- Nama customer sebaiknya ditampilkan melalui join dari table `customers`.
- Jika butuh riwayat nama customer pada saat transaksi, tambahkan field snapshot seperti `customer_name_snapshot`.

#### 10.2 Enum

```sql
CREATE TYPE transaction_status AS ENUM ('refund', 'close', 'sortir', 'on_process', 'on_ship');
CREATE TYPE fee_status AS ENUM ('paid', 'unpaid');
CREATE TYPE rate_type AS ENUM ('instant', 'sameday');
CREATE TYPE unit_measurement AS ENUM ('volume', 'kg');
CREATE TYPE audit_action AS ENUM ('create', 'update', 'delete', 'login');
```

Jika tidak ingin menggunakan PostgreSQL enum, gunakan text/varchar dengan validation di backend.

#### 10.2.1 Database Check Constraint dan Numeric Validation

Tambahkan constraint atau validasi setara di backend untuk mencegah data salah masuk ke database:

```sql
-- Nomor HP customer: nullable, tetapi jika diisi harus format nomor HP Indonesia.
ALTER TABLE customers
ADD CONSTRAINT customers_no_hp_format_check
CHECK (no_hp IS NULL OR no_hp = '' OR no_hp ~ '^(\+62|62|0)8[1-9][0-9]{7,11}$');

-- Currency Yuan RMB China tidak boleh minus.
ALTER TABLE invoices
ADD CONSTRAINT invoices_price_yuan_non_negative_check
CHECK (price_yuan >= 0);

ALTER TABLE purchase_transactions
ADD CONSTRAINT purchase_transactions_prices_yuan_non_negative_check
CHECK (prices_yuan IS NULL OR prices_yuan >= 0);

ALTER TABLE purchase_transactions
ADD CONSTRAINT purchase_transactions_total_price_yuan_non_negative_check
CHECK (total_price_yuan >= 0);

ALTER TABLE purchase_transaction_items
ADD CONSTRAINT purchase_transaction_items_price_yuan_non_negative_check
CHECK (price_yuan IS NULL OR price_yuan >= 0);

-- Currency IDR/Rupiah tidak boleh minus.
ALTER TABLE fees
ADD CONSTRAINT fees_price_per_unit_idr_non_negative_check
CHECK (price_per_unit_idr >= 0);

ALTER TABLE fees
ADD CONSTRAINT fees_total_idr_non_negative_check
CHECK (total_idr >= 0);

-- Rate layanan sebaiknya lebih besar dari 0.
ALTER TABLE rate_jastip
ADD CONSTRAINT rate_jastip_rate_idr_positive_check
CHECK (rate_idr > 0);

ALTER TABLE topup_alipay_wepay_china_rates
ADD CONSTRAINT topup_china_rate_idr_positive_check
CHECK (rate_idr > 0);

ALTER TABLE topup_alipay_wepay_indonesia_rates
ADD CONSTRAINT topup_indonesia_rate_idr_positive_check
CHECK (rate_idr > 0);

ALTER TABLE transfer_bank_china_rates
ADD CONSTRAINT transfer_bank_china_rate_idr_positive_check
CHECK (rate_idr > 0);
```

Catatan untuk Codex:

- Constraint di atas tidak menambahkan tabel baru.
- Jangan menggunakan tipe `float` untuk uang. Gunakan `numeric(18,2)` atau decimal helper.
- Frontend wajib mencegah input minus, tetapi backend tetap wajib memvalidasi ulang karena frontend bisa dilewati.
- Untuk Excel import, validasi dilakukan sebelum commit ke database agar error bisa ditampilkan per baris.

#### 10.3 Table: customers

| Column | Type | Constraint | Keterangan |
|---|---|---|---|
| id_customer | varchar | PK, unique, not null | ID customer untuk login. |
| nama | varchar | not null | Nama customer. |
| no_hp | varchar | nullable | Nomor HP Indonesia. Jika diisi harus valid sesuai regex `^(?:\+62|62|0)8[1-9][0-9]{7,11}$`. |
| alamat | text | nullable | Alamat. |
| password_hash | varchar | not null | Hash password customer. |
| must_change_password | boolean | default true | Wajib ganti password saat login pertama. |
| failed_login_attempts | integer | default 0 | Jumlah gagal login beruntun. |
| locked_until | timestamp | nullable | Waktu kunci sementara login. |
| last_login_at | timestamp | nullable | Login terakhir customer. |
| created_at | timestamp | default now | Waktu dibuat. |
| updated_at | timestamp | default now | Waktu update. |

#### 10.4 Table: invoices

| Column | Type | Constraint | Keterangan |
|---|---|---|---|
| id_invoice | varchar | PK, unique, not null | ID internal invoice. |
| no_invoice | varchar | unique, not null | Nomor invoice. |
| tanggal | date | not null | Tanggal invoice. |
| id_customer | varchar | FK customers.id_customer | Customer pemilik invoice. |
| price_yuan | numeric(18,2) | not null, check >= 0 | Harga invoice dalam Yuan RMB China, tidak boleh minus. |
| created_at | timestamp | default now | Waktu dibuat. |
| updated_at | timestamp | default now | Waktu update. |

#### 10.5 Table: purchase_transactions

| Column | Type | Constraint | Keterangan |
|---|---|---|---|
| id_transaksi_pembelian | varchar | PK, unique, not null | ID internal transaksi. |
| tanggal | date | not null | Tanggal transaksi. |
| no_invoice | varchar | FK invoices.no_invoice | Invoice terkait. |
| id_customer | varchar | FK customers.id_customer | Customer pemilik transaksi. |
| resi | varchar | nullable | Nomor resi. |
| status | transaction_status | not null | Status transaksi. |
| eta | date | nullable | Estimasi tiba. |
| items_count | integer | default 0 | Jumlah item. |
| prices_yuan | numeric(18,2) | nullable, check >= 0 | Subtotal/harga dalam Yuan RMB China, tidak boleh minus jika diisi. |
| total_price_yuan | numeric(18,2) | not null, check >= 0 | Total harga dalam Yuan RMB China, tidak boleh minus. |
| created_at | timestamp | default now | Waktu dibuat. |
| updated_at | timestamp | default now | Waktu update. |

#### 10.6 Table: purchase_transaction_items

Table ini dipakai agar list item, no toko, nama toko, dan prices tidak disimpan sebagai string panjang.

| Column | Type | Constraint | Keterangan |
|---|---|---|---|
| id | serial | PK | ID detail. |
| id_transaksi_pembelian | varchar | FK purchase_transactions.id_transaksi_pembelian | Transaksi induk. |
| item_name | varchar | nullable | Nama item. |
| no_toko | varchar | nullable | Nomor toko. |
| nama_toko | varchar | nullable | Nama toko. |
| price_yuan | numeric(18,2) | nullable, check >= 0 | Harga item dalam Yuan RMB China, tidak boleh minus jika diisi. |
| quantity | integer | default 1 | Jumlah item. |
| created_at | timestamp | default now | Waktu dibuat. |

#### 10.7 Table: fees

| Column | Type | Constraint | Keterangan |
|---|---|---|---|
| id_fee | varchar | PK, unique, not null | ID fee. |
| tanggal | date | not null | Tanggal fee. |
| id_customer | varchar | FK customers.id_customer | Customer pemilik fee. |
| unit_measurement | unit_measurement | not null | `volume` atau `kg`. |
| weight_or_volume_unit | integer | not null | Berat atau volume. |
| price_per_unit_idr | numeric(18,2) | not null, check >= 0 | Harga per unit dalam IDR/Rupiah, tidak boleh minus. |
| total_idr | numeric(18,2) | not null, check >= 0 | Total dalam IDR/Rupiah, tidak boleh minus. |
| status | fee_status | not null | Paid/unpaid. |
| created_at | timestamp | default now | Waktu dibuat. |
| updated_at | timestamp | default now | Waktu update. |

#### 10.8 Table: fee_invoices

Karena detail fee dapat berisi list nomor invoice, gunakan table relasi.

| Column | Type | Constraint | Keterangan |
|---|---|---|---|
| id | serial | PK | ID relasi. |
| id_fee | varchar | FK fees.id_fee | Fee induk. |
| no_invoice | varchar | FK invoices.no_invoice | Invoice terkait. |
| created_at | timestamp | default now | Waktu dibuat. |

#### 10.9 Table: rate_jastip

Table `rate_jastip` adalah **singleton table** untuk menyimpan 1 data rate jastip utama. Table ini tetap memakai nama dan field dasar dari database awal, tetapi implementasi aplikasi tidak boleh membuat banyak data rate jastip.

| Column | Type | Constraint | Keterangan |
|---|---|---|---|
| id_rate_jastip | varchar | PK, unique, not null, fixed singleton ID | ID rate jastip. Gunakan nilai tetap, contoh `RATE_JASTIP_MAIN`. |
| keterangan | varchar | nullable | Keterangan rate. |
| rate_idr | numeric(18,2) | not null, check >= 0 | Harga 1 Yuan RMB China dalam IDR/Rupiah. Tidak boleh minus. Disarankan lebih besar dari 0 sebelum website live. |
| created_at | timestamp | default now | Waktu record singleton dibuat melalui seed/migration, bukan dari UI admin. |
| updated_at | timestamp | default now | Waktu update. |

Constraint tambahan yang direkomendasikan agar hanya ada 1 record:

```sql
ALTER TABLE rate_jastip
ADD CONSTRAINT rate_jastip_singleton_id_check
CHECK (id_rate_jastip = 'RATE_JASTIP_MAIN');
```

Karena `id_rate_jastip` adalah primary key dan nilainya dikunci ke `RATE_JASTIP_MAIN`, database hanya bisa menyimpan 1 row rate jastip. Codex wajib membuat seed/migration awal untuk membuat record ini, lalu admin hanya melakukan update.

#### 10.10 Table: topup_alipay_wepay_china_rates

| Column | Type | Constraint | Keterangan |
|---|---|---|---|
| id | varchar | PK, unique, not null | ID rate. |
| nama_rate | varchar | not null | Nama rate. |
| rate_idr | numeric(18,2) | not null, check > 0 | Rate dalam IDR/Rupiah. Tidak boleh minus dan disarankan lebih besar dari 0. |
| jenis | rate_type | not null | Instant/sameday. |
| status | boolean | default true | true=open, false=close. |
| created_at | timestamp | default now | Waktu dibuat. |
| updated_at | timestamp | default now | Waktu update. |

#### 10.11 Table: topup_alipay_wepay_indonesia_rates

| Column | Type | Constraint | Keterangan |
|---|---|---|---|
| id | varchar | PK, unique, not null | ID rate. |
| nama_rate | varchar | not null | Nama rate. |
| rate_idr | numeric(18,2) | not null, check > 0 | Rate dalam IDR/Rupiah. Tidak boleh minus dan disarankan lebih besar dari 0. |
| jenis | rate_type | not null | Instant/sameday. |
| status | boolean | default true | true=open, false=close. |
| created_at | timestamp | default now | Waktu dibuat. |
| updated_at | timestamp | default now | Waktu update. |

#### 10.12 Table: transfer_bank_china_rates

| Column | Type | Constraint | Keterangan |
|---|---|---|---|
| id | varchar | PK, unique, not null | ID rate. |
| rate_idr | numeric(18,2) | not null, check > 0 | Rate dalam IDR/Rupiah. Tidak boleh minus dan disarankan lebih besar dari 0. |
| jenis | rate_type | not null | Instant/sameday. |
| status | boolean | default true | true=open, false=close. |
| created_at | timestamp | default now | Waktu dibuat. |
| updated_at | timestamp | default now | Waktu update. |

#### 10.13 Table: admin_users

| Column | Type | Constraint | Keterangan |
|---|---|---|---|
| id_serial | serial | PK | ID admin. |
| email | varchar | unique, not null | Email admin. |
| password_hash | varchar | nullable | Hash password admin. |
| is_verified | boolean | default false | Status verifikasi. |
| two_factor_enabled | boolean | default false | Status 2FA/email OTP admin. |
| verification_token | varchar | nullable | Token verifikasi. |
| verification_token_expires_at | timestamp | nullable | Expired token. |
| failed_login_attempts | integer | default 0 | Jumlah gagal login beruntun. |
| locked_until | timestamp | nullable | Waktu kunci sementara login. |
| last_login_at | timestamp | nullable | Login terakhir admin. |
| created_at | timestamp | default now | Waktu dibuat. |
| updated_at | timestamp | default now | Waktu update. |

#### 10.14 Table: idempotency_keys

| Column | Type | Constraint | Keterangan |
|---|---|---|---|
| id | serial | PK | ID. |
| key | varchar | unique, not null | Idempotency key dari request. |
| user_type | varchar | not null | admin/customer. |
| user_id | varchar | not null | ID user. |
| request_method | varchar | not null | POST/PUT/PATCH/DELETE. |
| request_path | varchar | not null | Endpoint. |
| request_hash | varchar | not null | Hash payload. |
| response_code | integer | nullable | Status response. |
| response_body | jsonb | nullable | Response pertama. |
| created_at | timestamp | default now | Waktu dibuat. |
| expires_at | timestamp | not null | Expired key. |

#### 10.15 Table: import_batches

| Column | Type | Constraint | Keterangan |
|---|---|---|---|
| id | serial | PK | ID batch import. |
| module_name | varchar | not null | Nama module import. |
| file_name | varchar | not null | Nama file. |
| status | varchar | not null | pending, success, failed, partial_failed. |
| total_rows | integer | default 0 | Total baris. |
| success_rows | integer | default 0 | Baris sukses. |
| failed_rows | integer | default 0 | Baris gagal. |
| created_by | varchar | nullable | Admin pengimport. |
| created_at | timestamp | default now | Waktu import. |

#### 10.16 Table: import_errors

| Column | Type | Constraint | Keterangan |
|---|---|---|---|
| id | serial | PK | ID error. |
| import_batch_id | integer | FK import_batches.id | Batch import. |
| row_number | integer | not null | Nomor baris Excel. |
| column_name | varchar | nullable | Nama column error. |
| error_message | text | not null | Detail error. |
| raw_data | jsonb | nullable | Data baris mentah. |
| created_at | timestamp | default now | Waktu dibuat. |

#### 10.17 Table: admin_audit_logs

Audit log ditampilkan di menu Settings. Log hanya mencatat aktivitas penting agar tidak penuh dengan data berulang.

| Column | Type | Constraint | Keterangan |
|---|---|---|---|
| id | serial | PK | ID audit log. |
| admin_id | integer | FK admin_users.id_serial, nullable | Admin pelaku. Nullable untuk percobaan login gagal yang belum teridentifikasi. |
| action | audit_action | not null | Hanya `create`, `update`, `delete`, atau `login`. |
| module_name | varchar | not null | Nama module: customer, invoice, fee, rate, settings, auth, dll. |
| target_id | varchar | nullable | ID data yang dibuat/diubah/dihapus jika ada. |
| old_value | jsonb | nullable | Snapshot field penting sebelum update/delete. Jangan simpan data sensitif. |
| new_value | jsonb | nullable | Snapshot field penting setelah create/update. Jangan simpan data sensitif. |
| ip_address | varchar | nullable | IP request. |
| user_agent | text | nullable | User agent browser. |
| created_at | timestamp | default now | Waktu aktivitas. |

Aturan audit log:

- `login`: dicatat untuk login admin berhasil dan gagal.
- `create`: dicatat saat admin membuat data baru.
- `update`: dicatat saat admin mengubah data. Jika fitur cancel/disable disetujui di masa depan, aktivitasnya juga dicatat sebagai `update`.
- `delete`: hanya dicatat jika ada endpoint delete teknis di masa depan.
- Tidak mencatat view table, view detail, search, pagination, refresh token, extend session, dan health check.

---

### ERD Mermaid

```mermaid
erDiagram
  customers ||--o{ invoices : has
  customers ||--o{ purchase_transactions : has
  customers ||--o{ fees : has
  invoices ||--o{ purchase_transactions : referenced_by
  invoices ||--o{ fee_invoices : included_in
  fees ||--o{ fee_invoices : has
  purchase_transactions ||--o{ purchase_transaction_items : has

  customers {
    varchar id_customer PK
    varchar nama
    varchar no_hp
    text alamat
    varchar password_hash
    boolean must_change_password
    integer failed_login_attempts
    timestamp locked_until
    timestamp last_login_at
    timestamp created_at
    timestamp updated_at
  }

  invoices {
    varchar id_invoice PK
    varchar no_invoice UK
    date tanggal
    varchar id_customer FK
    numeric price_yuan
    timestamp created_at
    timestamp updated_at
  }

  purchase_transactions {
    varchar id_transaksi_pembelian PK
    date tanggal
    varchar no_invoice FK
    varchar id_customer FK
    varchar resi
    transaction_status status
    date eta
    integer items_count
    numeric prices_yuan
    numeric total_price_yuan
  }

  purchase_transaction_items {
    serial id PK
    varchar id_transaksi_pembelian FK
    varchar item_name
    varchar no_toko
    varchar nama_toko
    numeric price_yuan
    integer quantity
  }

  fees {
    varchar id_fee PK
    date tanggal
    varchar id_customer FK
    unit_measurement unit_measurement
    integer weight_or_volume_unit
    numeric price_per_unit_idr
    numeric total_idr
    fee_status status
  }

  fee_invoices {
    serial id PK
    varchar id_fee FK
    varchar no_invoice FK
  }

  rate_jastip {
    varchar id_rate_jastip PK
    varchar keterangan
    numeric rate_idr
  }

  admin_users ||--o{ admin_audit_logs : writes

  admin_users {
    serial id_serial PK
    varchar email UK
    varchar password_hash
    boolean is_verified
    boolean two_factor_enabled
    varchar verification_token
    integer failed_login_attempts
    timestamp locked_until
    timestamp last_login_at
    timestamp created_at
  }

  admin_audit_logs {
    serial id PK
    integer admin_id FK
    audit_action action
    varchar module_name
    varchar target_id
    jsonb old_value
    jsonb new_value
    timestamp created_at
  }
```

---

## 8. Tech Stack (Frontend, Backend API, Database, dan Deployment)

### 8.1 Frontend

| Komponen | Teknologi |
|---|---|
| Framework | Angular |
| Styling | Tailwind CSS |
| UI Component | spartan/ui |
| Landing Page | Top navbar horizontal, responsive, reveal animation, micro interaction button, dan design token dari `DESIGN.md` |
| Admin Panel | Sidebar/navbar samping |
| Customer Portal | Sidebar/navbar samping |
| State/Helper | ApiService, NotificationService, LoadingButton, Double Submit Guard |

Catatan: shadcn tidak digunakan untuk versi saat ini. Jangan mengubah frontend menjadi React/Next.js.

### 8.2 Backend API

| Komponen | Teknologi |
|---|---|
| Framework | NestJS |
| ORM | Drizzle ORM |
| Authentication | Better Auth |
| Security | Helmet, CORS whitelist, rate limit, CSRF jika cookie-based, secure cookie, DTO validation |
| Error Handling | Standard error response dengan `code`, `explanation`, `api`, `request_id`, dan `timestamp` |
| Audit | Admin audit log untuk create, update, delete teknis jika ada, dan login |

### 8.3 Database

| Komponen | Teknologi |
|---|---|
| Database | PostgreSQL |
| Migration | Drizzle migration |
| Naming | snake_case |
| Currency | numeric/decimal, bukan float |
| Index Policy | 4 index awal utama agar overhead terkendali |
| Data Safety | Data operasional tidak hard delete dan tidak menambah definisi cancel/disable untuk versi awal |

### 8.4 Deployment

| Komponen | Teknologi |
|---|---|
| Hosting | VPS |
| Container | Docker dan Docker Compose |
| Reverse Proxy | Nginx atau Traefik |
| SSL | HTTPS dengan SSL certificate |
| Database Backup | Backup PostgreSQL berkala |
| Production Config | `.env` production, CORS domain, rate limit, migration, seed admin pertama |

### Deployment VPS

#### 19.1 Komponen Server

- VPS Linux.
- Docker dan Docker Compose.
- PostgreSQL container atau managed PostgreSQL.
- Backend NestJS container.
- Frontend Angular static build.
- Reverse proxy Nginx atau Traefik.
- SSL HTTPS.
- Backup database berkala.

#### 19.2 Contoh Struktur Docker Compose

```text
services:
  postgres
  backend
  frontend
  reverse-proxy
```

#### 19.3 Production Checklist

- HTTPS aktif.
- Environment variable production sudah benar.
- Database migration sudah dijalankan.
- Admin pertama sudah dibuat.
- CORS hanya mengizinkan domain frontend.
- Rate limit aktif.
- Backup database aktif.
- Log error backend tersimpan.

---

### Prompt Implementasi untuk Codex

Gunakan prompt berikut di Codex:

```text
Bangun aplikasi website JEESTIP.ID berdasarkan PRD ini.

Stack:
- Frontend: Angular, Tailwind CSS, spartan/ui
- Backend: NestJS, Drizzle ORM, Better Auth
- Database: PostgreSQL
- Hosting target: VPS dengan Docker

Prioritas implementasi:
1. Setup monorepo frontend dan backend.
2. Buat database schema Drizzle sesuai PRD.
3. Buat migration PostgreSQL.
4. Buat auth gabungan admin/customer.
5. Buat landing page public untuk rate jastip, topup, dan transfer bank China.
6. Buat admin panel dengan create/read/update untuk customer, invoice, transaksi pembelian, fee, rate topup, transfer bank, admin data, dan settings import Excel. Untuk rate jastip, buat hanya form single-setting yang membaca dan mengupdate 1 record singleton; jangan membuat create/delete/list/pagination rate jastip. Jangan membuat fitur/definisi cancel-disable dulu kecuali sudah dikonfirmasi owner project.
7. Buat audit log admin di menu Settings yang hanya mencatat create, update, delete teknis, dan login.
8. Buat customer portal yang hanya menampilkan data milik customer login melalui object-level authorization.
9. Tambahkan pagination default 20 dan max 100.
10. Tambahkan helper frontend dan backend untuk mencegah double submit/double API fire.
11. Tambahkan validasi DTO, guard role, error handling, notification handler, confirmation modal, dan responsive design. Pastikan `no_hp` customer tidak bisa diisi huruf dan wajib format nomor HP Indonesia yang valid. Pastikan semua field currency/rate tidak bisa diinput minus.
12. Tambahkan notifikasi success saat create/update berhasil, warning saat create/update gagal karena validasi/aturan bisnis, dan error saat create/update/login gagal karena API/backend/database/network/timeout. Semua error API wajib punya format kode error, penjelasan masalah, dan info API.
13. Tambahkan security hardening: rate limit, account lock, secure cookie, CORS whitelist, Helmet, CSRF protection jika cookie-based, dan sensitive response filtering.
14. Tambahkan optimasi: database index, cache public landing rates, lazy-loaded Angular route, dan server-side filtering/sorting.
15. Buat dokumentasi setup, env, migration, seed, deployment VPS, security checklist, dan testing.

Ikuti acceptance criteria dan API design pada PRD ini.
```

---
