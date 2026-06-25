import { Component, signal } from '@angular/core';
import { BrnButton } from '@spartan-ng/brain/button';

@Component({
  standalone: true,
  imports: [BrnButton],
  template: `
    <div>
      <p class="text-xs font-semibold uppercase tracking-[.05em] text-stone">SISTEM</p>
      <h1 class="display mt-2 text-5xl text-ink-deep">Settings</h1>
      <p class="mt-3 text-slate">Import data, template, dan audit aktivitas admin.</p>
    </div>

    <div class="mt-8 grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
      <section class="panel p-6">
        <h2 class="text-lg font-medium text-ink">Import data Excel</h2>
        <p class="mt-1 text-sm text-steel">Upload file, validasi, lalu preview sebelum disimpan.</p>
        <label class="mt-6 grid min-h-48 cursor-pointer place-items-center rounded-2xl border border-dashed border-hairline-strong bg-surface p-6 text-center transition">
          <input type="file" accept=".xlsx,.xls" class="hidden" (change)="file.set('customer-import-juni.xlsx')">
          <span>
            <span class="mx-auto grid size-12 place-items-center rounded-2xl bg-yellow text-xl">⇧</span>
            <b class="mt-3 block font-medium">{{ file() || 'Pilih atau tarik file Excel' }}</b>
            <span class="mt-1 block text-xs text-stone">XLSX atau XLS, maksimal 10 MB</span>
          </span>
        </label>
        <div class="mt-5 flex gap-3"><button brnButton class="btn btn-primary flex-1" [disabled]="!file()">Preview import</button><button class="btn btn-secondary">Unduh template</button></div>
      </section>

      <section class="panel overflow-hidden">
        <div class="border-b border-hairline-soft p-6">
          <h2 class="text-lg font-medium text-ink">Riwayat import</h2>
          <p class="text-sm text-steel">Batch import data terbaru.</p>
        </div>
        <div class="divide-y divide-hairline-soft">
          @for (item of imports; track item.name) {
            <div class="flex items-center gap-4 p-5">
              <span class="grid size-10 place-items-center rounded-2xl bg-surface">X</span>
              <div class="min-w-0 flex-1">
                <p class="truncate text-sm font-medium text-ink">{{ item.name }}</p>
                <p class="text-xs text-stone">{{ item.date }} · {{ item.rows }} baris</p>
              </div>
              <span class="rounded-full px-3 py-1 text-xs font-semibold" [class]="item.status === 'Berhasil' ? 'bg-teal text-moss' : 'bg-yellow-light text-yellow-dark'">{{ item.status }}</span>
            </div>
          }
        </div>
      </section>
    </div>

    <section class="panel mt-6 overflow-hidden">
      <div class="flex flex-col justify-between gap-3 border-b border-hairline-soft p-6 sm:flex-row sm:items-center">
        <div>
          <h2 class="text-lg font-medium text-ink">Audit log admin</h2>
          <p class="text-sm text-steel">Aktivitas penting create, update, dan login.</p>
        </div>
        <button class="btn btn-secondary">Filter log</button>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full min-w-[700px] text-left text-sm">
          <thead class="bg-surface text-xs uppercase tracking-[.05em] text-stone"><tr><th class="p-4">Waktu</th><th class="p-4">Admin</th><th class="p-4">Aksi</th><th class="p-4">Modul</th><th class="p-4">Target</th></tr></thead>
          <tbody>
            @for (log of logs; track log.time) {
              <tr class="border-t border-hairline-soft"><td class="p-4 text-steel">{{ log.time }}</td><td class="p-4 font-medium">{{ log.admin }}</td><td class="p-4"><span class="rounded-full bg-lavender px-3 py-1 text-xs font-semibold text-blue">{{ log.action }}</span></td><td class="p-4 text-slate">{{ log.module }}</td><td class="p-4 text-stone">{{ log.target }}</td></tr>
            }
          </tbody>
        </table>
      </div>
    </section>
  `,
})
export class SettingsComponent {
  file = signal('');
  imports = [
    { name: 'customer-juni-2026.xlsx', date: '22 Jun 2026, 09:42', rows: '48', status: 'Berhasil' },
    { name: 'invoice-juni-batch-2.xlsx', date: '20 Jun 2026, 14:18', rows: '126', status: 'Berhasil' },
    { name: 'transaction-revision.xlsx', date: '18 Jun 2026, 11:05', rows: '32', status: '3 peringatan' },
  ];
  logs = [
    { time: '22 Jun, 10:32', admin: 'erik@jeestip.id', action: 'UPDATE', module: 'Rate Jastip', target: 'RATE_JASTIP_MAIN' },
    { time: '22 Jun, 09:42', admin: 'operation@jeestip.id', action: 'CREATE', module: 'Customer', target: '48 records' },
    { time: '22 Jun, 08:15', admin: 'finance@jeestip.id', action: 'LOGIN', module: 'Authentication', target: 'Web admin' },
  ];
}
