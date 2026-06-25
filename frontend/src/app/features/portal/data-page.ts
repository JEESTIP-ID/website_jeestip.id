import { Component, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrnButton } from '@spartan-ng/brain/button';

type Config = { title: string; desc: string; columns: { key: string; label: string }[]; rows: Record<string, string>[]; customer?: boolean };

const rows = {
  customers: [
    { id: 'CUST-0142', name: 'Siska Amelia', phone: '0812 8821 9032', address: 'Jakarta Barat' },
    { id: 'CUST-0141', name: 'Reza Mahendra', phone: '0813 6621 1045', address: 'Bandung' },
    { id: 'CUST-0140', name: 'Nadia Putri', phone: '0821 4509 8221', address: 'Surabaya' },
    { id: 'CUST-0139', name: 'William Tan', phone: '0852 1019 6654', address: 'Medan' },
    { id: 'CUST-0138', name: 'Dewi Lestari', phone: '0812 3320 8814', address: 'Batam' },
  ],
  invoices: [
    { date: '22 Jun 2026', id: 'INV-2026-0148', customer: 'CUST-0128', name: 'Andi Saputra', price: 'RMB 1,840.00' },
    { date: '21 Jun 2026', id: 'INV-2026-0147', customer: 'CUST-0140', name: 'Nadia Putri', price: 'RMB 928.50' },
    { date: '20 Jun 2026', id: 'INV-2026-0146', customer: 'CUST-0132', name: 'Fauzan Akbar', price: 'RMB 2,210.00' },
    { date: '18 Jun 2026', id: 'INV-2026-0145', customer: 'CUST-0125', name: 'Michelle Wijaya', price: 'RMB 760.00' },
  ],
  transactions: [
    { date: '22 Jun 2026', resi: 'CNID884201', eta: '28 Jun 2026', status: 'on_ship', price: 'RMB 1,840.00' },
    { date: '21 Jun 2026', resi: 'CNID884133', eta: '30 Jun 2026', status: 'on_process', price: 'RMB 928.50' },
    { date: '19 Jun 2026', resi: 'CNID883921', eta: '24 Jun 2026', status: 'sortir', price: 'RMB 2,210.00' },
    { date: '16 Jun 2026', resi: 'CNID883712', eta: '22 Jun 2026', status: 'close', price: 'RMB 760.00' },
  ],
  fees: [
    { date: '22 Jun 2026', id: 'FEE-0099', customer: 'CUST-0128', name: 'Andi Saputra', status: 'unpaid', total: 'Rp 1.275.000' },
    { date: '21 Jun 2026', id: 'FEE-0098', customer: 'CUST-0140', name: 'Nadia Putri', status: 'paid', total: 'Rp 825.000' },
    { date: '20 Jun 2026', id: 'FEE-0097', customer: 'CUST-0132', name: 'Fauzan Akbar', status: 'paid', total: 'Rp 2.140.000' },
  ],
  rates: [
    { name: 'Topup Same Day', type: 'sameday', rate: 'Rp 2.250', status: 'open' },
    { name: 'Topup Instant', type: 'instant', rate: 'Rp 2.275', status: 'open' },
    { name: 'Promo Same Day', type: 'sameday', rate: 'Rp 2.240', status: 'close' },
  ],
  admins: [
    { email: 'erik@jeestip.id', verified: 'Terverifikasi', created: '12 Jan 2026' },
    { email: 'operation@jeestip.id', verified: 'Terverifikasi', created: '4 Mar 2026' },
    { email: 'finance@jeestip.id', verified: 'Menunggu', created: '15 Jun 2026' },
  ],
};

const configs: Record<string, Config> = {
  customers: { title: 'Customer', desc: 'Kelola data dan akun seluruh customer.', columns: [{ key: 'id', label: 'ID Customer' }, { key: 'name', label: 'Nama' }, { key: 'phone', label: 'Nomor HP' }, { key: 'address', label: 'Alamat' }], rows: rows.customers },
  invoices: { title: 'Invoice', desc: 'Kelola invoice pembelian customer.', columns: [{ key: 'date', label: 'Tanggal' }, { key: 'id', label: 'No. Invoice' }, { key: 'customer', label: 'ID Customer' }, { key: 'name', label: 'Nama Customer' }, { key: 'price', label: 'Harga' }], rows: rows.invoices },
  transactions: { title: 'Transaksi Pembelian', desc: 'Pantau seluruh proses pembelian dan pengiriman.', columns: [{ key: 'date', label: 'Tanggal' }, { key: 'resi', label: 'Resi' }, { key: 'eta', label: 'ETA' }, { key: 'status', label: 'Status' }, { key: 'price', label: 'Total Harga' }], rows: rows.transactions },
  fees: { title: 'Fees', desc: 'Kelola biaya pengiriman dan status pembayaran.', columns: [{ key: 'date', label: 'Tanggal' }, { key: 'id', label: 'ID Fee' }, { key: 'customer', label: 'ID Customer' }, { key: 'name', label: 'Nama Customer' }, { key: 'status', label: 'Status' }, { key: 'total', label: 'Total' }], rows: rows.fees },
  topupChina: { title: 'Topup Alipay/WePay China', desc: 'Rate layanan topup akun region China.', columns: [{ key: 'name', label: 'Nama Rate' }, { key: 'type', label: 'Jenis' }, { key: 'rate', label: 'Rate' }, { key: 'status', label: 'Status' }], rows: rows.rates },
  topupIndonesia: { title: 'Topup Alipay/WePay Indonesia', desc: 'Rate layanan topup akun region Indonesia.', columns: [{ key: 'name', label: 'Nama Rate' }, { key: 'type', label: 'Jenis' }, { key: 'rate', label: 'Rate' }, { key: 'status', label: 'Status' }], rows: rows.rates },
  transfer: { title: 'Transfer Bank China', desc: 'Rate transfer ke rekening bank China.', columns: [{ key: 'name', label: 'Nama Rate' }, { key: 'type', label: 'Jenis' }, { key: 'rate', label: 'Rate' }, { key: 'status', label: 'Status' }], rows: rows.rates },
  admins: { title: 'Admin Data', desc: 'Kelola akses administrator JEESTIP.ID.', columns: [{ key: 'email', label: 'Email' }, { key: 'verified', label: 'Verifikasi' }, { key: 'created', label: 'Dibuat' }], rows: rows.admins },
  myInvoices: { title: 'Invoice Saya', desc: 'Riwayat invoice pembelian Anda.', customer: true, columns: [{ key: 'date', label: 'Tanggal' }, { key: 'id', label: 'No. Invoice' }, { key: 'price', label: 'Harga' }], rows: rows.invoices.slice(0, 3) },
  myFees: { title: 'Fee Saya', desc: 'Biaya pengiriman dan status pembayaran Anda.', customer: true, columns: [{ key: 'date', label: 'Tanggal' }, { key: 'id', label: 'ID Fee' }, { key: 'status', label: 'Status' }, { key: 'total', label: 'Total' }], rows: rows.fees.slice(0, 3) },
  myTransactions: { title: 'Transaksi Pembelian Saya', desc: 'Pantau perkembangan barang Anda dari China.', customer: true, columns: [{ key: 'date', label: 'Tanggal' }, { key: 'resi', label: 'Resi' }, { key: 'eta', label: 'ETA' }, { key: 'status', label: 'Status' }, { key: 'price', label: 'Total' }], rows: rows.transactions },
};

@Component({
  standalone: true,
  imports: [FormsModule, BrnButton],
  template: `
    @if (selected()) {
      <section class="min-h-[calc(100vh-8rem)]">
        <button class="btn btn-secondary" type="button" (click)="close()">
          <span aria-hidden="true">←</span>
          Kembali ke {{ config.title }}
        </button>

        <div class="mt-8 flex flex-col justify-between gap-5 border-b border-hairline pb-8 md:flex-row md:items-end">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[.05em] text-stone">DETAIL DATA</p>
            <h1 class="display mt-2 text-4xl text-ink-deep md:text-5xl">{{ detailTitle() }}</h1>
            <p class="mt-3 text-slate">Lihat dan kelola detail {{ config.title.toLowerCase() }}.</p>
          </div>
          @if (isCustomerRecord()) {
            <span class="w-fit rounded-full bg-teal px-4 py-2 text-xs font-semibold text-moss">Customer aktif</span>
          }
        </div>

        <div [class]="isCustomerRecord() ? 'mt-8 grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]' : 'mt-8 grid gap-8'">
          <div class="panel p-5 md:p-7">
            <div class="grid gap-5 md:grid-cols-2">
              @for (c of config.columns; track c.key) {
                <label class="block text-sm font-medium text-ink">
                  {{ c.label }}
                  <input class="input mt-2" [value]="selected()?.[c.key] || ''" [disabled]="config.customer">
                </label>
              }
            </div>
            @if (!config.customer) {
              <div class="mt-8 flex flex-col gap-3 border-t border-hairline-soft pt-6 sm:flex-row">
                <button brnButton class="btn btn-primary" (click)="saved()">Simpan perubahan</button>
                <button class="btn btn-secondary" type="button" (click)="close()">Batal</button>
              </div>
            }
          </div>

          @if (isCustomerRecord()) {
            <aside class="rounded-[28px] bg-yellow p-6">
              <p class="text-xs font-semibold uppercase tracking-[.05em] text-primary/60">Ringkasan customer</p>
              <div class="mt-8 grid gap-5">
                <div>
                  <p class="text-sm text-primary/60">Total invoice</p>
                  <p class="mt-1 text-3xl font-medium text-primary">18</p>
                </div>
                <div class="border-t border-primary/15 pt-5">
                  <p class="text-sm text-primary/60">Transaksi berjalan</p>
                  <p class="mt-1 text-3xl font-medium text-primary">4</p>
                </div>
                <div class="border-t border-primary/15 pt-5">
                  <p class="text-sm text-primary/60">Bergabung sejak</p>
                  <p class="mt-1 font-medium text-primary">12 Januari 2026</p>
                </div>
              </div>
            </aside>
          }
        </div>
      </section>
    } @else {
    <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[.05em] text-stone">{{ config.customer ? 'AKUN SAYA' : 'DATA OPERASIONAL' }}</p>
        <h1 class="display mt-2 text-5xl text-ink-deep">{{ config.title }}</h1>
        <p class="mt-3 text-slate">{{ config.desc }}</p>
      </div>
      @if (!config.customer) {
        <button brnButton class="btn btn-primary" (click)="drawer.set(true)">＋ Tambah data</button>
      }
    </div>

    <section class="panel mt-8 overflow-hidden">
      <div class="grid gap-3 border-b border-hairline-soft p-4 lg:grid-cols-[minmax(260px,1fr)_180px_180px] lg:items-center">
        <div class="relative min-w-0">
          <svg class="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-stone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <circle cx="11" cy="11" r="7"></circle>
            <path d="m20 20-3.5-3.5"></path>
          </svg>
          <input class="input search-input bg-surface" [(ngModel)]="query" placeholder="Cari data...">
        </div>
        <select class="input w-full rounded-full bg-canvas px-4">
          <option>Semua status</option>
          <option>Open</option>
          <option>Close</option>
        </select>
        <button class="btn btn-secondary w-full" type="button">
          <span aria-hidden="true">⇅</span>
          Filter
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full min-w-[720px] border-collapse text-left">
          <thead class="bg-surface text-xs uppercase tracking-[.05em] text-stone">
            <tr>
              @for (c of config.columns; track c.key) { <th class="px-5 py-4 font-semibold">{{ c.label }}</th> }
              <th class="px-5 py-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-hairline-soft">
            @for (row of filtered(); track $index) {
              <tr class="transition hover:bg-surface-soft">
                @for (c of config.columns; track c.key) {
                  <td class="px-5 py-4 text-sm text-slate" [class.font-medium]="c.key === 'id' || c.key === 'resi' || c.key === 'email'">
                    @if (c.key === 'status' || c.key === 'verified') {
                      <span class="rounded-full px-3 py-1 text-xs font-semibold" [class]="badge(row[c.key])">{{ pretty(row[c.key]) }}</span>
                    } @else {
                      {{ row[c.key] }}
                    }
                  </td>
                }
                <td class="px-5 py-4 text-right"><button class="rounded-full border border-hairline px-3 py-1 font-medium hover:bg-surface" aria-label="Lihat detail" (click)="openRow(row)">•••</button></td>
              </tr>
            } @empty {
              <tr><td [attr.colspan]="config.columns.length + 1" class="p-12 text-center text-sm text-stone">Data tidak ditemukan.</td></tr>
            }
          </tbody>
        </table>
      </div>

      <div class="flex flex-col items-center justify-between gap-3 border-t border-hairline-soft p-4 text-sm text-steel sm:flex-row">
        <span>Menampilkan 1–{{ filtered().length }} dari {{ config.rows.length }} data</span>
        <div class="flex gap-1">
          <button class="grid size-9 place-items-center rounded-full border border-hairline">‹</button>
          <button class="grid size-9 place-items-center rounded-full bg-primary text-white">1</button>
          <button class="grid size-9 place-items-center rounded-full border border-hairline">2</button>
          <button class="grid size-9 place-items-center rounded-full border border-hairline">›</button>
        </div>
      </div>
    </section>

    @if (drawer()) {
      <button class="fixed inset-0 z-50 bg-primary/35" aria-label="Tutup detail" (click)="close()"></button>
      <aside class="fixed inset-y-0 right-0 z-50 w-full max-w-md overflow-y-auto bg-canvas p-6 shadow-[rgba(5,0,56,.12)_0_16px_48px_-8px]">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[.05em] text-stone">{{ selected() ? 'DETAIL DATA' : 'DATA BARU' }}</p>
            <h2 class="mt-1 text-3xl font-medium text-ink-deep">{{ config.title }}</h2>
          </div>
          <button class="grid size-10 place-items-center rounded-full border border-hairline bg-surface" (click)="close()">×</button>
        </div>
        <div class="mt-8 space-y-5">
          @for (c of config.columns; track c.key) {
            <label class="block text-sm font-medium">{{ c.label }}<input class="input mt-2" [value]="(selected() || {})[c.key] || ''" [disabled]="!!selected() && config.customer"></label>
          }
        </div>
        @if (!config.customer) {
          <div class="mt-8 flex gap-3">
            <button brnButton class="btn btn-primary flex-1" (click)="saved()">{{ selected() ? 'Simpan perubahan' : 'Tambah data' }}</button>
            <button class="btn btn-secondary" (click)="close()">Batal</button>
          </div>
        }
      </aside>
    }
    }
  `,
})
export class DataPageComponent {
  config: Config;
  query = '';
  drawer = signal(false);
  selected = signal<Record<string, string> | null>(null);

  constructor(route: ActivatedRoute) {
    this.config = configs[route.snapshot.data['page']];
  }

  filtered() {
    const q = this.query.toLowerCase();
    return this.config.rows.filter((r) => Object.values(r).some((v) => v.toLowerCase().includes(q)));
  }

  isCustomerRecord() {
    return this.config === configs['customers'];
  }

  detailTitle() {
    const row = this.selected();
    return row?.['name'] || row?.['id'] || row?.['resi'] || row?.['email'] || this.config.title;
  }

  openRow(row: Record<string, string>) {
    this.selected.set(row);
  }

  close() {
    this.drawer.set(false);
    this.selected.set(null);
  }

  saved() {
    this.close();
  }

  pretty(v: string) {
    return v.replace('_', ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  }

  badge(v: string) {
    return ['open', 'paid', 'close', 'Terverifikasi'].includes(v)
      ? 'bg-teal text-moss'
      : v === 'unpaid' || v === 'Menunggu'
        ? 'bg-yellow-light text-yellow-dark'
        : 'bg-lavender text-blue';
  }
}
