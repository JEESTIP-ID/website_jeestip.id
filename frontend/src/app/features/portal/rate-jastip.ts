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
      <p class="mt-3 text-slate">Atur rate utama yang tampil pada landing page.</p>
    </div>

    <div class="mt-8 grid gap-6 xl:grid-cols-[1.1fr_.9fr]">
      <form class="panel p-6 md:p-8" (ngSubmit)="save()">
        <div class="mb-7 flex items-start gap-3 rounded-2xl bg-lavender p-4 text-sm text-blue">
          <span class="text-xl">ⓘ</span>
          <p>Rate Jastip adalah pengaturan tunggal. Perubahan langsung memengaruhi informasi di halaman publik.</p>
        </div>
        <label class="block text-sm font-medium">ID Rate<input class="input mt-2 bg-surface" value="RATE_JASTIP_MAIN" disabled></label>
        <label class="mt-5 block text-sm font-medium">Judul
          <input class="input mt-2" name="title" [(ngModel)]="title" placeholder="Masukkan judul rate jastip" required>
          <span class="mt-2 block text-xs text-stone">Judul ini akan ditampilkan pada bagian Jastip China di landing page.</span>
        </label>
        <label class="mt-5 block text-sm font-medium">Rate 1 Yuan RMB (IDR)
          <div class="relative mt-2">
            <span class="pointer-events-none absolute inset-y-0 left-0 z-10 flex w-12 items-center justify-center border-r border-hairline-strong font-medium text-stone">Rp</span>
            <input class="input currency-input text-lg font-medium" name="rate" [(ngModel)]="rate" inputmode="numeric" min="1" required>
          </div>
          <span class="mt-2 block text-xs text-stone">Nilai harus lebih besar dari Rp 0.</span>
        </label>
        <label class="mt-5 block text-sm font-medium">Keterangan
          <textarea class="mt-2 min-h-28 w-full resize-none rounded-lg border border-hairline-strong bg-white p-4 outline-none focus:border-blue focus:ring-1 focus:ring-blue" name="description" [(ngModel)]="description"></textarea>
        </label>
        <div class="mt-7 flex gap-3">
          <button brnButton class="btn btn-primary" [disabled]="saving()">{{ saving() ? 'Menyimpan...' : 'Simpan perubahan' }}</button>
          <button type="button" class="btn btn-secondary">Batalkan</button>
        </div>
        @if (success()) {
          <p class="mt-4 rounded-2xl bg-teal p-3 text-sm font-medium text-moss">✓ Rate jastip berhasil diperbarui.</p>
        }
      </form>

      <aside class="rounded-[28px] bg-primary p-7 text-white">
        <p class="text-xs font-semibold uppercase tracking-[.05em] text-white/55">Preview landing page</p>
        <div class="mt-20">
          <span class="rounded-full bg-white px-4 py-2 text-sm font-medium text-primary">Jastip China</span>
          <h2 class="display mt-6 text-5xl">{{ title }}</h2>
          <div class="mt-7 rounded-full bg-white px-6 py-4 text-primary">
            <span class="text-sm text-slate">Rate utama</span>
            <b class="ml-4 font-medium">1 RMB = Rp {{ formatRate() }}</b>
          </div>
          <p class="mt-5 text-sm leading-6 text-white/65">{{ description }}</p>
        </div>
      </aside>
    </div>
  `,
})
export class RateJastipComponent {
  title = 'Titip belanja, tanpa batas ide.';
  rate = '2250';
  description = 'Berlaku untuk pembelian marketplace China. Hubungi admin untuk estimasi lengkap.';
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
