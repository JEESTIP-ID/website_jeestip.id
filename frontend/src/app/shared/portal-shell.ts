import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

type MenuIcon =
  | 'dashboard'
  | 'customers'
  | 'invoice'
  | 'cart'
  | 'fees'
  | 'jastip'
  | 'topup-china'
  | 'topup-id'
  | 'transfer'
  | 'admin'
  | 'settings'
  | 'password';

type Menu = { label: string; icon: MenuIcon; path: string; section?: string };

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
          <button class="grid size-10 place-items-center rounded-full border border-hairline lg:hidden" aria-label="Tutup menu" (click)="open.set(false)">
            <svg class="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>
          </button>
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
              <span class="grid size-5 shrink-0 place-items-center text-current" aria-hidden="true">
                @switch (item.icon) {
                  @case ('dashboard') {
                    <svg class="size-5" viewBox="0 0 24 24" fill="none"><path d="M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-5v-6h-4v6H5a1 1 0 0 1-1-1v-8.5Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" /></svg>
                  }
                  @case ('customers') {
                    <svg class="size-5" viewBox="0 0 24 24" fill="none"><path d="M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM3.5 20c.7-3.5 2.7-5.5 5.5-5.5s4.8 2 5.5 5.5M16.5 10.5a3 3 0 1 0 0-6M15.5 14.5c2.6.2 4.3 2 5 5.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" /></svg>
                  }
                  @case ('invoice') {
                    <svg class="size-5" viewBox="0 0 24 24" fill="none"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" /><path d="M9 8h6M9 12h6M9 16h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" /></svg>
                  }
                  @case ('cart') {
                    <svg class="size-5" viewBox="0 0 24 24" fill="none"><path d="M3 4h2l2.3 10.5a2 2 0 0 0 2 1.5h6.9a2 2 0 0 0 1.9-1.4L20 8H7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 20h.01M17 20h.01" stroke="currentColor" stroke-width="3" stroke-linecap="round" /></svg>
                  }
                  @case ('fees') {
                    <svg class="size-5" viewBox="0 0 24 24" fill="none"><path d="M4 7h16v10H4V7Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" /><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM7 10h.01M17 14h.01" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" /></svg>
                  }
                  @case ('jastip') {
                    <svg class="size-5" viewBox="0 0 24 24" fill="none"><path d="M6 8h12l-1 12H7L6 8Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" /><path d="M9 8a3 3 0 0 1 6 0M9 13h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" /></svg>
                  }
                  @case ('topup-china') {
                    <svg class="size-5" viewBox="0 0 24 24" fill="none"><path d="M5 8h14v10H5V8Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" /><path d="M8 5h8M12 8v10M9 13h6M17.5 5.5 20 3m0 0v4m0-4h-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
                  }
                  @case ('topup-id') {
                    <svg class="size-5" viewBox="0 0 24 24" fill="none"><path d="M5 8h14v10H5V8Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" /><path d="M8 5h8M12 8v10M9 13h6M6.5 4.5 4 7m0 0V3m0 4h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
                  }
                  @case ('transfer') {
                    <svg class="size-5" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 17h16M8 4 4 7l4 3M16 14l4 3-4 3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
                  }
                  @case ('admin') {
                    <svg class="size-5" viewBox="0 0 24 24" fill="none"><path d="M12 3 5 6v5c0 4.5 2.8 8 7 10 4.2-2 7-5.5 7-10V6l-7-3Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" /><path d="M9 12.5 11 14l4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
                  }
                  @case ('settings') {
                    <svg class="size-5" viewBox="0 0 24 24" fill="none"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" stroke="currentColor" stroke-width="1.8" /><path d="m19 12 .9-2-2.1-1.2-.2-2.3-2.3-.2L14.1 4h-4.2L8.7 6.3l-2.3.2-.2 2.3L4.1 10l.9 2-.9 2 2.1 1.2.2 2.3 2.3.2L9.9 20h4.2l1.2-2.3 2.3-.2.2-2.3 2.1-1.2-.9-2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" /></svg>
                  }
                  @case ('password') {
                    <svg class="size-5" viewBox="0 0 24 24" fill="none"><path d="M7 11V8a5 5 0 0 1 10 0v3M6 11h12v10H6V11Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" /><path d="M12 15v2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" /></svg>
                  }
                }
              </span>
              {{ item.label }}
            </a>
          }
        </nav>

        <a routerLink="/login" class="mt-4 flex items-center gap-3 rounded-full border border-hairline px-4 py-3 text-sm font-medium text-ink hover:bg-surface">
          <svg class="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M10 6H6v12h4M14 8l4 4-4 4M18 12H9" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
          Keluar
        </a>
      </aside>

      <div class="lg:col-start-2">
        <header class="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-hairline bg-canvas/95 px-5 backdrop-blur-lg md:px-8">
          <button class="grid size-11 place-items-center rounded-full border border-hairline bg-canvas lg:hidden" aria-label="Buka menu" (click)="open.set(true)">
            <svg class="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>
          </button>
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
    { label: 'Dashboard', icon: 'dashboard', path: 'dashboard' },
    { label: 'Customer', icon: 'customers', path: 'customers', section: 'OPERASIONAL' },
    { label: 'Invoice', icon: 'invoice', path: 'invoices' },
    { label: 'Transaksi Pembelian', icon: 'cart', path: 'purchase-transactions' },
    { label: 'Fees', icon: 'fees', path: 'fees' },
    { label: 'Rate Jastip', icon: 'jastip', path: 'rate-jastip', section: 'RATE LAYANAN' },
    { label: 'Topup China', icon: 'topup-china', path: 'rates/topup-china' },
    { label: 'Topup Indonesia', icon: 'topup-id', path: 'rates/topup-indonesia' },
    { label: 'Transfer Bank China', icon: 'transfer', path: 'rates/transfer-bank-china' },
    { label: 'Admin Data', icon: 'admin', path: 'admin-users', section: 'SISTEM' },
    { label: 'Settings', icon: 'settings', path: 'settings' },
  ];

  customerMenu: Menu[] = [
    { label: 'Dashboard', icon: 'dashboard', path: 'dashboard' },
    { label: 'Invoice Saya', icon: 'invoice', path: 'invoices', section: 'AKUN SAYA' },
    { label: 'Fee Saya', icon: 'fees', path: 'fees' },
    { label: 'Transaksi Pembelian', icon: 'cart', path: 'purchase-transactions' },
    { label: 'Ganti Password', icon: 'password', path: 'change-password', section: 'PENGATURAN' },
  ];

  get menu() {
    return this.role === 'admin' ? this.adminMenu : this.customerMenu;
  }

  constructor(route: ActivatedRoute) {
    this.role = route.snapshot.data['role'];
  }
}
