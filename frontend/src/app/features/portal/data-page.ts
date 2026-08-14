import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrnButton } from '@spartan-ng/brain/button';

type Status = 'refund' | 'close' | 'sortir' | 'on_process' | 'on_ship';
type ImportError = { row: number; column: string; error: string };
type TransaksiPembelian = {
  id: string;
  no_resi: string;
  eta: string;
  status: Status;
  updated_at: string;
};

const statusLabels: Record<Status, string> = {
  refund: 'Refund',
  close: 'Close',
  sortir: 'Sortir',
  on_process: 'On Process',
  on_ship: 'On Ship',
};

const dummyRows: TransaksiPembelian[] = [
  { id: 'trx-001', no_resi: 'JT123456789', eta: '2026-08-20', status: 'on_ship', updated_at: '2026-08-14 09:12' },
  { id: 'trx-002', no_resi: 'JT987654321', eta: '2026-08-22', status: 'sortir', updated_at: '2026-08-14 08:44' },
  { id: 'trx-003', no_resi: 'JT456789123', eta: '2026-08-25', status: 'on_process', updated_at: '2026-08-13 16:25' },
  { id: 'trx-004', no_resi: 'JT770019284', eta: '2026-08-19', status: 'close', updated_at: '2026-08-13 13:01' },
  { id: 'trx-005', no_resi: 'JT550092177', eta: '2026-08-28', status: 'refund', updated_at: '2026-08-12 10:18' },
];

@Component({
  standalone: true,
  imports: [FormsModule, BrnButton],
  template: `
    <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[.05em] text-stone">DATA OPERASIONAL</p>
        <h1 class="display mt-2 text-5xl text-ink-deep">Transaksi Pembelian</h1>
        <p class="mt-3 max-w-2xl text-slate">Kelola data resi public dengan field sederhana: nomor resi, ETA, dan status.</p>
      </div>
      <div class="flex flex-col gap-2 sm:flex-row">
        <button class="btn btn-secondary" type="button" (click)="importOpen.set(true)">Import Excel/CSV</button>
        <button brnButton class="btn btn-primary" type="button" (click)="startCreate()">Tambah data</button>
      </div>
    </div>

    <section class="panel mt-8 overflow-hidden">
      <div class="grid gap-3 border-b border-hairline-soft p-4 lg:grid-cols-[minmax(260px,1fr)_220px_120px] lg:items-center">
        <div class="relative min-w-0">
          <svg class="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-stone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <circle cx="11" cy="11" r="7"></circle>
            <path d="m20 20-3.5-3.5"></path>
          </svg>
          <input class="input search-input bg-surface" [(ngModel)]="query" placeholder="Cari nomor resi...">
        </div>
        <select class="input w-full rounded-full bg-canvas px-4" [(ngModel)]="statusFilter">
          <option value="all">Semua status</option>
          @for (status of statuses; track status) {
            <option [value]="status">{{ label(status) }}</option>
          }
        </select>
        <button class="btn btn-secondary w-full" type="button" (click)="resetFilters()">Reset</button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full min-w-[760px] border-collapse text-left">
          <thead class="bg-surface text-xs uppercase tracking-[.05em] text-stone">
            <tr>
              <th class="px-5 py-4 font-semibold">No Resi</th>
              <th class="px-5 py-4 font-semibold">ETA</th>
              <th class="px-5 py-4 font-semibold">Status</th>
              <th class="px-5 py-4 font-semibold">Terakhir diperbarui</th>
              <th class="px-5 py-4 text-right font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-hairline-soft">
            @for (row of paginatedRows(); track row.id) {
              <tr class="transition hover:bg-surface-soft">
                <td class="px-5 py-4 text-sm font-medium text-ink">{{ row.no_resi }}</td>
                <td class="px-5 py-4 text-sm text-slate">{{ row.eta }}</td>
                <td class="px-5 py-4 text-sm">
                  <span class="rounded-full px-3 py-1 text-xs font-semibold" [class]="badge(row.status)">{{ label(row.status) }}</span>
                </td>
                <td class="px-5 py-4 text-sm text-slate">{{ row.updated_at }}</td>
                <td class="px-5 py-4 text-right">
                  <button class="rounded-full border border-hairline px-4 py-2 text-sm font-medium hover:bg-surface" type="button" (click)="startEdit(row)">Edit</button>
                </td>
              </tr>
            } @empty {
              <tr><td colspan="5" class="p-12 text-center text-sm text-stone">Data tidak ditemukan.</td></tr>
            }
          </tbody>
        </table>
      </div>

      <div class="flex flex-col items-center justify-between gap-3 border-t border-hairline-soft p-4 text-sm text-steel sm:flex-row">
        <span>Menampilkan {{ paginatedRows().length }} dari {{ filteredRows().length }} data</span>
        <div class="flex gap-1">
          <button class="grid size-9 place-items-center rounded-full border border-hairline" type="button" (click)="page.set(1)">‹</button>
          <button class="grid size-9 place-items-center rounded-full bg-primary text-white" type="button">1</button>
          <button class="grid size-9 place-items-center rounded-full border border-hairline" type="button">2</button>
          <button class="grid size-9 place-items-center rounded-full border border-hairline" type="button">›</button>
        </div>
      </div>
    </section>

    @if (drawer()) {
      <button class="fixed inset-0 z-50 bg-primary/35" aria-label="Tutup form" (click)="closeDrawer()"></button>
      <aside class="fixed inset-y-0 right-0 z-50 w-full max-w-md overflow-y-auto bg-canvas p-6 shadow-[rgba(5,0,56,.12)_0_16px_48px_-8px]">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[.05em] text-stone">{{ editingId ? 'EDIT DATA' : 'DATA BARU' }}</p>
            <h2 class="mt-1 text-3xl font-medium text-ink-deep">Transaksi Pembelian</h2>
          </div>
          <button class="grid size-10 place-items-center rounded-full border border-hairline bg-surface" type="button" (click)="closeDrawer()">x</button>
        </div>
        <form class="mt-8 space-y-5" (ngSubmit)="save()">
          <label class="block text-sm font-medium">No Resi
            <input class="input mt-2" name="no_resi" [(ngModel)]="form.no_resi" placeholder="JT123456789" required>
          </label>
          <label class="block text-sm font-medium">ETA
            <input class="input mt-2" name="eta" [(ngModel)]="form.eta" type="date" required>
          </label>
          <label class="block text-sm font-medium">Status
            <select class="input mt-2" name="status" [(ngModel)]="form.status" required>
              @for (status of statuses; track status) {
                <option [value]="status">{{ label(status) }}</option>
              }
            </select>
          </label>
          <div class="flex gap-3 pt-3">
            <button brnButton class="btn btn-primary flex-1" type="submit">Simpan</button>
            <button class="btn btn-secondary" type="button" (click)="closeDrawer()">Batal</button>
          </div>
          @if (toast()) {
            <p class="rounded-2xl bg-teal p-3 text-sm font-medium text-moss">{{ toast() }}</p>
          }
        </form>
      </aside>
    }

    @if (importOpen()) {
      <button class="fixed inset-0 z-50 bg-primary/35" aria-label="Tutup import" (click)="closeImport()"></button>
      <aside class="fixed inset-y-0 right-0 z-50 w-full max-w-2xl overflow-y-auto bg-canvas p-6 shadow-[rgba(5,0,56,.12)_0_16px_48px_-8px]">
        <div class="flex items-center justify-between gap-4">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[.05em] text-stone">IMPORT EXCEL/CSV</p>
            <h2 class="mt-1 text-3xl font-medium text-ink-deep">Preview transaksi pembelian</h2>
          </div>
          <button class="grid size-10 place-items-center rounded-full border border-hairline bg-surface" type="button" (click)="closeImport()">x</button>
        </div>

        <div class="mt-6 rounded-[28px] border border-hairline-soft bg-surface-soft p-5">
          <p class="text-sm leading-6 text-slate">Upload dummy menerima .xlsx atau .csv. Preview di bawah memakai contoh validasi frontend untuk menunjukkan alur sebelum commit.</p>
          <div class="mt-5 grid gap-3 sm:grid-cols-[1fr_auto_auto] sm:items-center">
            <input class="input bg-canvas" type="file" accept=".xlsx,.csv" (change)="previewImport($event)">
            <button class="btn btn-secondary" type="button">Template CSV</button>
            <button class="btn btn-secondary" type="button">Template XLSX</button>
          </div>
        </div>

        @if (importPreview()) {
          <div class="mt-6 grid gap-3 sm:grid-cols-5">
            <div class="rounded-2xl bg-surface p-4"><p class="text-xs text-stone">Total rows</p><b class="text-2xl">{{ preview.total }}</b></div>
            <div class="rounded-2xl bg-teal p-4"><p class="text-xs text-moss">Valid rows</p><b class="text-2xl">{{ preview.valid }}</b></div>
            <div class="rounded-2xl bg-rose p-4"><p class="text-xs text-slate">Invalid rows</p><b class="text-2xl">{{ preview.invalid }}</b></div>
            <div class="rounded-2xl bg-yellow-light p-4"><p class="text-xs text-yellow-dark">Create</p><b class="text-2xl">{{ preview.create }}</b></div>
            <div class="rounded-2xl bg-lavender p-4"><p class="text-xs text-blue">Update</p><b class="text-2xl">{{ preview.update }}</b></div>
          </div>

          <div class="mt-6 overflow-hidden rounded-2xl border border-hairline-soft">
            <table class="w-full min-w-[520px] text-left text-sm">
              <thead class="bg-surface text-xs uppercase tracking-[.05em] text-stone">
                <tr><th class="px-4 py-3">Row</th><th class="px-4 py-3">Column</th><th class="px-4 py-3">Error</th></tr>
              </thead>
              <tbody class="divide-y divide-hairline-soft">
                @for (error of preview.errors; track error.row) {
                  <tr><td class="px-4 py-3">{{ error.row }}</td><td class="px-4 py-3 font-medium">{{ error.column }}</td><td class="px-4 py-3 text-slate">{{ error.error }}</td></tr>
                } @empty {
                  <tr><td colspan="3" class="px-4 py-8 text-center text-slate">Tidak ada error. Data siap di-commit.</td></tr>
                }
              </tbody>
            </table>
          </div>

          <button brnButton class="btn btn-primary mt-6 w-full" type="button" [disabled]="preview.invalid > 0" (click)="commitImport()">Commit Import</button>
        }
      </aside>
    }
  `,
})
export class DataPageComponent {
  protected readonly statuses: Status[] = ['refund', 'close', 'sortir', 'on_process', 'on_ship'];
  protected readonly pageSize = 20;
  protected readonly preview = {
    total: 8,
    valid: 6,
    invalid: 2,
    create: 4,
    update: 2,
    errors: [
      { row: 5, column: 'eta', error: 'Format tanggal harus YYYY-MM-DD.' },
      { row: 8, column: 'status', error: 'Status harus salah satu dari refund, close, sortir, on_process, on_ship.' },
    ] satisfies ImportError[],
  };

  query = '';
  statusFilter: Status | 'all' = 'all';
  page = signal(1);
  drawer = signal(false);
  importOpen = signal(false);
  importPreview = signal(false);
  toast = signal('');
  editingId = '';
  form: Pick<TransaksiPembelian, 'no_resi' | 'eta' | 'status'> = {
    no_resi: '',
    eta: '',
    status: 'on_process',
  };
  rows = signal<TransaksiPembelian[]>(dummyRows);

  filteredRows() {
    const q = this.query.trim().toLowerCase();
    return this.rows().filter((row) => {
      const matchesQuery = !q || row.no_resi.toLowerCase().includes(q);
      const matchesStatus = this.statusFilter === 'all' || row.status === this.statusFilter;
      return matchesQuery && matchesStatus;
    });
  }

  paginatedRows() {
    return this.filteredRows().slice(0, this.pageSize);
  }

  label(status: Status) {
    return statusLabels[status];
  }

  badge(status: Status) {
    if (status === 'on_ship' || status === 'close') return 'bg-teal text-moss';
    if (status === 'refund') return 'bg-rose text-coral-dark';
    if (status === 'sortir') return 'bg-yellow-light text-yellow-dark';
    return 'bg-lavender text-blue';
  }

  resetFilters() {
    this.query = '';
    this.statusFilter = 'all';
  }

  startCreate() {
    this.editingId = '';
    this.form = { no_resi: '', eta: '', status: 'on_process' };
    this.drawer.set(true);
  }

  startEdit(row: TransaksiPembelian) {
    this.editingId = row.id;
    this.form = { no_resi: row.no_resi, eta: row.eta, status: row.status };
    this.drawer.set(true);
  }

  save() {
    const now = new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date());

    if (this.editingId) {
      this.rows.update((rows) => rows.map((row) => (row.id === this.editingId ? { ...row, ...this.form, updated_at: now } : row)));
    } else {
      this.rows.update((rows) => [{ id: `trx-${Date.now()}`, ...this.form, updated_at: now }, ...rows]);
    }

    this.toast.set('Data berhasil disimpan.');
    setTimeout(() => this.closeDrawer(), 500);
  }

  closeDrawer() {
    this.drawer.set(false);
    this.toast.set('');
  }

  previewImport(event: Event) {
    const input = event.target as HTMLInputElement;
    this.importPreview.set(!!input.files?.length);
  }

  commitImport() {
    this.importOpen.set(false);
    this.importPreview.set(false);
  }

  closeImport() {
    this.importOpen.set(false);
    this.importPreview.set(false);
  }
}
