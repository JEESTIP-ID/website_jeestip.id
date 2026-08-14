import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

type MenuIcon = 'cart' | 'jastip';

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
            <span class="grid size-10 place-items-center rounded-full bg-yellow text-sm font-semibold text-primary">EA</span>
            <div class="min-w-0">
              <p class="truncate text-sm font-medium text-ink">Erik Admin</p>
              <p class="truncate text-xs text-steel">Administrator</p>
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
                  @case ('cart') {
                    <svg class="size-5" viewBox="0 0 24 24" fill="none"><path d="M3 4h2l2.3 10.5a2 2 0 0 0 2 1.5h6.9a2 2 0 0 0 1.9-1.4L20 8H7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /><path d="M10 20h.01M17 20h.01" stroke="currentColor" stroke-width="3" stroke-linecap="round" /></svg>
                  }
                  @case ('jastip') {
                    <svg class="size-5" viewBox="0 0 24 24" fill="none"><path d="M6 8h12l-1 12H7L6 8Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" /><path d="M9 8a3 3 0 0 1 6 0M9 13h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" /></svg>
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
            <p class="font-medium text-ink">Pusat Operasional</p>
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
  role: 'admin';
  open = signal(false);
  today = new Intl.DateTimeFormat('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date());

  adminMenu: Menu[] = [
    { label: 'Transaksi Pembelian', icon: 'cart', path: 'transaksi-pembelian', section: 'OPERASIONAL' },
    { label: 'Rate Jastip Taobao', icon: 'jastip', path: 'rate-jastip-taobao', section: 'PENGATURAN' },
  ];

  get menu() {
    return this.adminMenu;
  }

  constructor(route: ActivatedRoute) {
    this.role = route.snapshot.data['role'] ?? 'admin';
  }
}
