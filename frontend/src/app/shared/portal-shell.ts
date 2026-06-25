import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

type Menu = { label: string; icon: string; path: string; section?: string };

@Component({
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="min-h-screen bg-surface lg:grid lg:grid-cols-[280px_1fr]">
      @if (open()) {
        <button class="fixed inset-0 z-30 bg-primary/45 lg:hidden" aria-label="Tutup menu" (click)="open.set(false)"></button>
      }

      <aside class="fixed inset-y-0 left-0 z-40 flex w-[280px] flex-col border-r border-hairline bg-canvas p-4 transition-transform lg:translate-x-0" [class.-translate-x-full]="!open()">
        <div class="flex h-14 items-center justify-between px-2">
          <a routerLink="/" class="flex items-center gap-2 text-sm font-semibold">
            <span class="grid size-9 place-items-center rounded-xl bg-yellow text-primary">J</span> JEESTIP.ID
          </a>
          <button class="grid size-10 place-items-center rounded-full border border-hairline lg:hidden" (click)="open.set(false)">×</button>
        </div>

        <div class="mx-1 my-5 rounded-2xl border border-hairline-soft bg-surface p-3">
          <div class="flex items-center gap-3">
            <span class="grid size-10 place-items-center rounded-full bg-yellow text-sm font-semibold text-primary">{{ role === 'admin' ? 'EA' : 'AS' }}</span>
            <div class="min-w-0">
              <p class="truncate text-sm font-medium text-ink">{{ role === 'admin' ? 'Erik Admin' : 'Andi Saputra' }}</p>
              <p class="truncate text-xs text-steel">{{ role === 'admin' ? 'Administrator' : 'CUST-0128' }}</p>
            </div>
          </div>
        </div>

        <nav class="flex-1 space-y-1 overflow-y-auto px-1">
          @for (item of menu; track item.path) {
            @if (item.section) {
              <p class="mb-2 mt-6 px-3 text-[11px] font-semibold uppercase tracking-[.05em] text-stone">{{ item.section }}</p>
            }
            <a
              [routerLink]="item.path"
              routerLinkActive="bg-primary text-white border-primary"
              class="flex items-center gap-3 rounded-full border border-transparent px-4 py-2.5 text-sm font-medium text-steel transition hover:border-hairline hover:bg-surface hover:text-ink"
              (click)="open.set(false)"
            >
              <span class="w-5 text-center">{{ item.icon }}</span>{{ item.label }}
            </a>
          }
        </nav>

        <a routerLink="/login" class="mt-4 flex items-center gap-3 rounded-full border border-hairline px-4 py-3 text-sm font-medium text-ink hover:bg-surface">↗ Keluar</a>
      </aside>

      <div class="lg:col-start-2">
        <header class="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-hairline bg-canvas/95 px-5 backdrop-blur-lg md:px-8">
          <button class="grid size-11 place-items-center rounded-full border border-hairline bg-canvas lg:hidden" (click)="open.set(true)">☰</button>
          <div class="hidden lg:block">
            <p class="text-xs text-stone">{{ today }}</p>
            <p class="font-medium text-ink">{{ role === 'admin' ? 'Pusat Operasional' : 'Portal Customer' }}</p>
          </div>
          <div class="flex items-center gap-3">
            <span class="hidden rounded-full bg-teal px-3 py-1.5 text-xs font-semibold text-moss sm:inline">Sistem normal</span>
          </div>
        </header>
        <main class="p-5 md:p-8 lg:p-10"><router-outlet /></main>
      </div>
    </div>
  `,
})
export class PortalShellComponent {
  role: 'admin' | 'customer';
  open = signal(false);
  today = new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());

  adminMenu: Menu[] = [
    { label: 'Dashboard', icon: '⌂', path: 'dashboard' },
    { label: 'Customer', icon: '♙', path: 'customers', section: 'OPERASIONAL' },
    { label: 'Invoice', icon: '▤', path: 'invoices' },
    { label: 'Transaksi Pembelian', icon: '▣', path: 'purchase-transactions' },
    { label: 'Fees', icon: '◇', path: 'fees' },
    { label: 'Rate Jastip', icon: '¥', path: 'rate-jastip', section: 'RATE LAYANAN' },
    { label: 'Topup China', icon: '↗', path: 'rates/topup-china' },
    { label: 'Topup Indonesia', icon: '↙', path: 'rates/topup-indonesia' },
    { label: 'Transfer Bank China', icon: '⇄', path: 'rates/transfer-bank-china' },
    { label: 'Admin Data', icon: '♟', path: 'admin-users', section: 'SISTEM' },
    { label: 'Settings', icon: '⚙', path: 'settings' },
  ];

  customerMenu: Menu[] = [
    { label: 'Dashboard', icon: '⌂', path: 'dashboard' },
    { label: 'Invoice Saya', icon: '▤', path: 'invoices', section: 'AKUN SAYA' },
    { label: 'Fee Saya', icon: '◇', path: 'fees' },
    { label: 'Transaksi Pembelian', icon: '▣', path: 'purchase-transactions' },
    { label: 'Ganti Password', icon: '⚿', path: 'change-password', section: 'PENGATURAN' },
  ];

  get menu() {
    return this.role === 'admin' ? this.adminMenu : this.customerMenu;
  }

  constructor(route: ActivatedRoute) {
    this.role = route.snapshot.data['role'];
  }
}
