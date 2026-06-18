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
