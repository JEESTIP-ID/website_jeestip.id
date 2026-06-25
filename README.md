# website_jeestip.id
Website jasa penitipan barang China ke Indonesia, topup Alipay/Wepay, dan transfer bank China

## 1. Ringkasan Produk

JEESTIP.ID adalah aplikasi website untuk menampilkan layanan jastip China, rate topup Alipay/Wepay, rate transfer bank China, serta menyediakan dashboard admin dan customer portal.

Website terdiri dari tiga area utama:

1. **Landing Page Publik**  
   Menampilkan informasi rate layanan, status layanan, dan tombol login.

2. **Website Admin**  
   Digunakan admin untuk mengelola customer, invoice, transaksi pembelian, fee, rate jastip, rate topup, rate transfer bank China, admin data, dan import data melalui Excel.

3. **Website Customer**  
   Digunakan customer untuk login dan melihat invoice, fee, dan transaksi pembelian miliknya sendiri.

---

## 2. Tujuan Produk

### 2.1 Tujuan Bisnis

- Mempermudah customer melihat informasi rate layanan JEESTIP.ID secara transparan.
- Mempermudah admin mengelola data customer, invoice, transaksi pembelian, dan fee.
- Mempermudah customer melihat status transaksi pembelian tanpa harus bertanya manual.
- Membantu operasional jastip agar data lebih rapi, mudah dicari, dan terdokumentasi.
- Mengurangi risiko kesalahan input melalui validasi form dan validasi import Excel.

### 2.2 Tujuan Teknis

- Membangun aplikasi modular dengan frontend Angular dan backend NestJS.
- Menggunakan PostgreSQL sebagai database utama.
- Menggunakan Drizzle ORM untuk schema, migration, query, dan relasi database.
- Menggunakan Better Auth untuk autentikasi admin dan customer.
- Menyediakan API yang aman, tervalidasi, dan memiliki proteksi agar request CRUD tidak double fire.
- Menyediakan dokumentasi teknis agar mudah dikembangkan menggunakan AI Codex.

## 3. Role dan Hak Akses

| Role | Akses |
|---|---|
| Public Visitor | Melihat landing page, rate topup, rate jastip, rate transfer bank China, dan tombol login. |
| Customer | Login menggunakan `id_customer` dan password. Melihat invoice, fee, dan transaksi pembelian milik sendiri. |
| Admin | Login menggunakan email dan password. Mengelola semua data admin panel. |

## Frontend

Frontend berada di folder `frontend/` dan menggunakan Angular 21, Tailwind CSS 4, serta primitive Spartan UI.

```bash
cd frontend
npm install
npm start
```

Buka `http://localhost:4200`. Build produksi dapat dibuat dengan:

```bash
npm run build
```

Data yang tampil saat ini adalah mock data frontend. Pada halaman login, identifier berbentuk email membuka demo admin; identifier selain email membuka demo customer.

## Deploy ke Vercel

Repository sudah memiliki `vercel.json` di root project. Konfigurasi tersebut:

- Menginstal dependency menggunakan `npm ci` di folder `frontend/`.
- Menjalankan build produksi Angular.
- Mempublikasikan `frontend/dist/frontend/browser`.
- Mengarahkan URL Angular seperti `/admin/dashboard` dan `/customer/invoices` ke `index.html`.

Langkah deployment:

1. Push repository ke GitHub, GitLab, atau Bitbucket.
2. Import repository tersebut di Vercel.
3. Biarkan **Root Directory** pada root repository.
4. Vercel akan membaca konfigurasi build dari `vercel.json`.
5. Jalankan **Deploy**.

Versi Node.js minimum yang digunakan adalah Node.js 20.19.
