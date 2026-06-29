import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrnButton } from '@spartan-ng/brain/button';

@Component({
  standalone: true,
  imports: [FormsModule, BrnButton],
  template: `
    <div>
      <p class="text-xs font-semibold uppercase tracking-[.05em] text-stone">RATE LAYANAN</p>
      <h1 class="display mt-2 text-5xl text-ink-deep">Rate Jastip</h1>
      <p class="mt-3 text-slate">Atur konten section jastip yang tampil pada landing page.</p>
    </div>

    <div class="mt-8 grid gap-6 xl:grid-cols-[1.05fr_.95fr]">
      <form class="panel p-6 md:p-8" (ngSubmit)="save()">
        <div class="mb-7 flex items-start gap-3 rounded-2xl bg-lavender p-4 text-sm text-blue">
          <span class="text-xl">ⓘ</span>
          <p>Field ini dipakai untuk section jastip di landing page: judul, deskripsi, rate utama, dan pilihan marketplace.</p>
        </div>

        <label class="block text-sm font-medium">ID Section
          <input class="input mt-2 bg-surface" value="SECTION_JASTIP_MAIN" disabled>
        </label>

        <div class="mt-6 grid gap-5 md:grid-cols-2">
          <label class="block text-sm font-medium">Badge Section
            <input class="input mt-2" name="sectionBadge" [(ngModel)]="sectionBadge" required>
          </label>
          <label class="block text-sm font-medium">Label Pilihan
            <input class="input mt-2" name="marketplaceLabel" [(ngModel)]="marketplaceLabel" required>
          </label>
        </div>

        <label class="mt-5 block text-sm font-medium">Judul Utama
          <input class="input mt-2" name="title" [(ngModel)]="title" placeholder="Masukkan judul section jastip" required>
          <span class="mt-2 block text-xs text-stone">Judul ini tampil di bagian utama landing page.</span>
        </label>

        <label class="mt-5 block text-sm font-medium">Deskripsi Utama
          <textarea class="mt-2 min-h-24 w-full resize-none rounded-lg border border-hairline-strong bg-white p-4 outline-none focus:border-blue focus:ring-1 focus:ring-blue" name="description" [(ngModel)]="description"></textarea>
        </label>

        <div class="mt-6 grid gap-5 md:grid-cols-2">
          <label class="block text-sm font-medium">Rate 1 Yuan RMB (IDR)
            <div class="relative mt-2">
              <span class="pointer-events-none absolute inset-y-0 left-0 z-10 flex w-12 items-center justify-center border-r border-hairline-strong font-medium text-stone">Rp</span>
              <input class="input currency-input text-lg font-medium" name="rate" [(ngModel)]="rate" inputmode="numeric" min="1" required>
            </div>
          </label>
          <label class="block text-sm font-medium">Judul Pilihan Jastip
            <input class="input mt-2" name="marketplaceTitle" [(ngModel)]="marketplaceTitle" required>
          </label>
        </div>

        <label class="mt-5 block text-sm font-medium">Keterangan Rate
          <textarea class="mt-2 min-h-20 w-full resize-none rounded-lg border border-hairline-strong bg-white p-4 outline-none focus:border-blue focus:ring-1 focus:ring-blue" name="rateDescription" [(ngModel)]="rateDescription"></textarea>
        </label>

        <div class="mt-7 rounded-[24px] border border-hairline-soft bg-surface-soft p-5">
          <div class="flex items-center justify-between gap-3">
            <div>
              <p class="text-sm font-semibold text-ink-deep">Pilihan Marketplace</p>
              <p class="mt-1 text-xs text-stone">Edit nama, badge, dan deskripsi pilihan jastip.</p>
            </div>
          </div>

          <div class="mt-5 grid gap-4">
            @for (option of jastipOptions; track option.id; let i = $index) {
              <div class="rounded-2xl border border-hairline-soft bg-white p-4">
                <div class="grid gap-4 md:grid-cols-[1fr_.8fr]">
                  <label class="block text-sm font-medium">Nama
                    <input class="input mt-2" name="optionName{{ i }}" [(ngModel)]="option.name">
                  </label>
                  <label class="block text-sm font-medium">Badge
                    <input class="input mt-2" name="optionBadge{{ i }}" [(ngModel)]="option.badge">
                  </label>
                </div>
                <label class="mt-4 block text-sm font-medium">Deskripsi
                  <textarea class="mt-2 min-h-20 w-full resize-none rounded-lg border border-hairline-strong bg-white p-4 outline-none focus:border-blue focus:ring-1 focus:ring-blue" name="optionDescription{{ i }}" [(ngModel)]="option.description"></textarea>
                </label>
              </div>
            }
          </div>
        </div>

        <label class="mt-5 block text-sm font-medium">Catatan Bawah Pilihan Jastip
          <textarea class="mt-2 min-h-20 w-full resize-none rounded-lg border border-hairline-strong bg-white p-4 outline-none focus:border-blue focus:ring-1 focus:ring-blue" name="helperText" [(ngModel)]="helperText"></textarea>
        </label>

        <div class="mt-6 grid gap-5 md:grid-cols-2">
          <label class="block text-sm font-medium">No. Telp WhatsApp
            <input class="input mt-2" name="whatsappPhone" [(ngModel)]="whatsappPhone" placeholder="+62 812-3456-7890">
            <span class="mt-2 block text-xs text-stone">Nomor ini ditampilkan di tombol WhatsApp landing page.</span>
          </label>
          <label class="block text-sm font-medium">Link WhatsApp
            <input class="input mt-2" name="whatsappLink" [(ngModel)]="whatsappLink" placeholder="https://wa.me/62812...">
            <span class="mt-2 block text-xs text-stone">Gunakan format wa.me agar langsung terbuka di WhatsApp.</span>
          </label>
        </div>

        <div class="mt-7 flex gap-3">
          <button brnButton class="btn btn-primary" [disabled]="saving()">{{ saving() ? 'Menyimpan...' : 'Simpan perubahan' }}</button>
          <button type="button" class="btn btn-secondary">Batalkan</button>
        </div>
        @if (success()) {
          <p class="mt-4 rounded-2xl bg-teal p-3 text-sm font-medium text-moss">✓ Section jastip berhasil diperbarui.</p>
        }
      </form>

      <aside class="panel overflow-hidden p-0">
        <div class="border-b border-hairline-soft px-6 py-5">
          <p class="text-xs font-semibold uppercase tracking-[.05em] text-stone">Preview landing page</p>
          <h2 class="mt-2 text-2xl font-semibold text-ink-deep">Section Jastip</h2>
        </div>

        <div class="bg-canvas p-5">
          <div class="rounded-[28px] bg-surface-soft p-6 text-center">
            <span class="inline-flex rounded-full bg-yellow-light px-4 py-2 text-xs font-semibold text-yellow-dark">{{ sectionBadge }}</span>
            <h3 class="display mx-auto mt-5 max-w-lg text-4xl text-ink-deep">{{ title }}</h3>
            <p class="mx-auto mt-4 max-w-lg text-sm leading-6 text-slate">{{ description }}</p>
          </div>

          <div class="mt-5 overflow-hidden rounded-[28px] border border-hairline-soft bg-canvas">
            <div class="grid lg:grid-cols-[.82fr_1.18fr]">
              <div class="flex min-h-[320px] flex-col bg-primary p-6 text-white">
                <span class="w-max rounded-full bg-white px-4 py-2 text-sm font-medium text-primary">Rate Jastip</span>
                <p class="mt-auto text-sm text-white/60">Rate utama</p>
                <div class="mt-3 rounded-[24px] bg-white p-5 text-primary">
                  <p class="text-sm font-medium text-slate">untuk 1 Yuan RMB</p>
                  <p class="mt-2 flex items-baseline gap-2 whitespace-nowrap text-ink-deep">
                    <span class="text-xl font-medium">Rp</span>
                    <b class="text-5xl font-semibold tracking-tight">{{ formatRate() }}</b>
                  </p>
                </div>
                <p class="mt-5 text-sm leading-6 text-white/65">{{ rateDescription }}</p>
              </div>

              <div class="p-6">
                <p class="text-xs font-semibold uppercase tracking-[.08em] text-stone">{{ marketplaceLabel }}</p>
                <h3 class="mt-3 text-3xl font-semibold tracking-tight text-ink-deep">{{ marketplaceTitle }}</h3>
                <div class="mt-6 grid gap-3">
                  @for (option of jastipOptions; track option.id) {
                    <div class="rounded-2xl border border-hairline-soft bg-surface-soft p-4">
                      <div class="flex items-center justify-between gap-3">
                        <b class="text-lg font-semibold text-ink-deep">{{ option.name }}</b>
                        <span class="rounded-full bg-yellow-light px-3 py-1 text-xs font-semibold text-yellow-dark">{{ option.badge }}</span>
                      </div>
                      <p class="mt-2 text-sm leading-6 text-slate">{{ option.description }}</p>
                    </div>
                  }
                </div>
                <p class="mt-5 rounded-2xl bg-teal/70 p-4 text-sm leading-6 text-primary">{{ helperText }}</p>
                <a
                  [href]="whatsappLink"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="mt-4 flex items-center justify-center gap-3 rounded-2xl bg-primary px-5 py-4 text-sm font-semibold text-white"
                >
                  <svg class="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 4a8 8 0 0 0-6.9 12.1L4 20l4-1a8 8 0 1 0 4-15Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
                    <path d="M9.2 8.9c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.3.1.5-.1.7l-.4.5c.6 1.1 1.4 1.9 2.5 2.5l.5-.4c.2-.2.4-.2.7-.1l1.6.7c.3.1.4.3.4.6v.4c0 .4-.1.6-.4.8-.6.4-1.4.6-2.2.4-2.9-.7-5.2-3-5.9-5.9-.2-.8 0-1.6.4-2.2Z" fill="currentColor" />
                  </svg>
                  <span>Hubungi WhatsApp {{ whatsappPhone }}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </div>
  `,
})
export class RateJastipComponent {
  sectionBadge = 'Jastip Belanja Marketplace China';
  marketplaceLabel = 'Jastip China';
  title = 'Jastip belanja dari Alibaba, Taobao, dan 1688';
  description = 'Bantu cari, beli, dan urus kebutuhan belanja dari marketplace China dengan proses yang jelas dari estimasi harga sampai barang dikirim.';
  rate = '2250';
  rateDescription = 'Rate berlaku untuk pembelian dari marketplace China dan dikonfirmasi sebelum pembayaran.';
  marketplaceTitle = 'Marketplace China';
  helperText = 'Kirim link produk, tim JEESTIP.ID bantu cek estimasi dan proses order.';
  whatsappPhone = '+62 812-3456-7890';
  whatsappLink = 'https://wa.me/6281234567890?text=Halo%20JEESTIP.ID%2C%20saya%20ingin%20konsultasi%20jastip%20China.';
  jastipOptions = [
    {
      id: 'alibaba',
      name: 'Alibaba',
      badge: 'Supplier',
      description: 'Cocok untuk pembelian supplier, grosir, dan kebutuhan bisnis.',
    },
    {
      id: 'taobao',
      name: 'Taobao',
      badge: 'Retail',
      description: 'Cocok untuk belanja produk retail, fashion, aksesoris, dan barang unik.',
    },
    {
      id: '1688',
      name: '1688',
      badge: 'Grosir',
      description: 'Cocok untuk harga grosir, pembelian banyak, dan produk pabrik China.',
    },
  ];
  saving = signal(false);
  success = signal(false);

  formatRate() {
    return new Intl.NumberFormat('id-ID').format(Number(this.rate) || 0);
  }

  save() {
    if (this.saving()) return;
    this.saving.set(true);
    this.success.set(false);
    setTimeout(() => {
      this.saving.set(false);
      this.success.set(true);
    }, 500);
  }
}
