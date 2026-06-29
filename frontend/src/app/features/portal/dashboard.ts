import { NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

type DashboardIcon = 'customers' | 'invoice' | 'cart' | 'fees' | 'shipping' | 'process' | 'check';

@Component({
  standalone: true,
  imports: [RouterLink, NgTemplateOutlet],
  template: `
    <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p class="text-xs font-semibold uppercase tracking-[.05em] text-stone">Ringkasan</p>
        <h1 class="display mt-2 text-5xl text-ink-deep">{{ admin ? 'Selamat datang, Erik.' : 'Halo, Andi.' }}</h1>
        <p class="mt-3 text-slate">{{ admin ? 'Pantau aktivitas operasional JEESTIP hari ini.' : 'Berikut perkembangan pesanan Anda.' }}</p>
      </div>
      <a [routerLink]="admin ? '/admin/customers' : '/customer/purchase-transactions'" class="btn btn-primary">{{ admin ? '+ Customer baru' : 'Lihat pesanan' }}</a>
    </div>

    <div class="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      @for (card of cards; track card.label) {
        <article class="panel flex min-w-0 flex-col p-6">
          <div class="flex min-h-11 items-start justify-between gap-3">
            <span class="grid size-11 place-items-center rounded-2xl text-primary" [class]="card.color" aria-hidden="true">
              <ng-container [ngTemplateOutlet]="dashboardIcon" [ngTemplateOutletContext]="{ icon: card.icon }" />
            </span>
            <span class="flex min-h-8 max-w-[8.5rem] items-center justify-center rounded-full bg-teal px-3 py-1 text-center text-xs font-semibold leading-4 text-moss">{{ card.change }}</span>
          </div>
          <p class="mt-8 text-sm text-steel">{{ card.label }}</p>
          <b class="mt-1 block text-4xl font-medium tracking-tight text-ink-deep">{{ card.value }}</b>
        </article>
      }
    </div>

    <div class="mt-6 grid gap-6 xl:grid-cols-[1.45fr_.75fr]">
      <section class="panel overflow-hidden">
        <div class="flex items-center justify-between border-b border-hairline-soft p-6">
          <div>
            <h2 class="text-lg font-medium text-ink">Aktivitas terbaru</h2>
            <p class="text-sm text-steel">Pembaruan operasional terakhir</p>
          </div>
          <button class="text-sm font-medium text-blue">Lihat semua →</button>
        </div>
        <div class="divide-y divide-hairline-soft">
          @for (a of activity; track a.title) {
            <div class="flex items-center gap-4 p-5">
              <span class="grid size-10 shrink-0 place-items-center rounded-full bg-surface text-primary" aria-hidden="true">
                <ng-container [ngTemplateOutlet]="dashboardIcon" [ngTemplateOutletContext]="{ icon: a.icon }" />
              </span>
              <div class="min-w-0 flex-1">
                <p class="truncate text-sm font-medium text-ink">{{ a.title }}</p>
                <p class="text-xs text-steel">{{ a.detail }}</p>
              </div>
              <span class="text-xs text-stone">{{ a.time }}</span>
            </div>
          }
        </div>
      </section>

      <section class="rounded-2xl bg-primary p-6 text-white">
        <span class="rounded-full bg-white px-3 py-1 text-xs font-semibold text-primary">Rate hari ini</span>
        <p class="mt-8 text-sm text-white/55">Rate Jastip</p>
        <div class="mt-2">
          <p class="flex items-baseline gap-2 whitespace-nowrap font-medium">
            <span class="text-xl sm:text-2xl">Rp</span>
            <strong class="text-4xl font-medium tracking-tight 2xl:text-5xl">2.250</strong>
          </p>
          <p class="mt-2 text-sm leading-5 text-white/50">untuk 1 Yuan RMB</p>
        </div>
        <div class="my-6 h-px bg-white/12"></div>
        <div class="space-y-3 text-sm">
          <div class="flex justify-between"><span class="text-white/55">Topup China</span><b class="font-medium">Rp 2.250</b></div>
          <div class="flex justify-between"><span class="text-white/55">Transfer Bank</span><b class="font-medium">Rp 2.265</b></div>
        </div>
        @if (admin) {
          <a routerLink="/admin/rate-jastip" class="btn mt-8 w-full bg-white text-primary">Kelola rate</a>
        }
      </section>
    </div>

    <ng-template #dashboardIcon let-icon="icon">
      @switch (icon) {
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
        @case ('shipping') {
          <svg class="size-5" viewBox="0 0 24 24" fill="none"><path d="M3 7h11v10H3V7ZM14 11h3l3 3v3h-6v-6Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" /><path d="M7 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM17 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" stroke="currentColor" stroke-width="1.8" /></svg>
        }
        @case ('process') {
          <svg class="size-5" viewBox="0 0 24 24" fill="none"><path d="M6 12a6 6 0 0 1 10.2-4.3L18 9M18 9V5M18 9h-4M18 12a6 6 0 0 1-10.2 4.3L6 15M6 15v4M6 15h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" /></svg>
        }
        @case ('check') {
          <svg class="size-5" viewBox="0 0 24 24" fill="none"><path d="M20 7 10 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
        }
      }
    </ng-template>
  `,
})
export class DashboardComponent {
  admin = false;
  cards: Array<{ label: string; value: string; change: string; icon: DashboardIcon; color: string }> = [];
  activity: Array<{ icon: DashboardIcon; title: string; detail: string; time: string }> = [
    { icon: 'invoice', title: 'Invoice INV-2026-0148 dibuat', detail: 'CUST-0128 · Andi Saputra', time: '8 mnt' },
    { icon: 'shipping', title: 'Status transaksi diperbarui', detail: 'CNID884201 · On ship', time: '24 mnt' },
    { icon: 'fees', title: 'Fee FEE-0098 telah dibayar', detail: 'Rp 1.275.000', time: '1 jam' },
    { icon: 'customers', title: 'Customer baru ditambahkan', detail: 'CUST-0142 · Siska Amelia', time: '2 jam' },
  ];

  constructor(route: ActivatedRoute) {
    this.admin = route.snapshot.data['role'] === 'admin';
    this.cards = this.admin
      ? [
          { label: 'Total customer', value: '1.284', change: '+12 bulan ini', icon: 'customers', color: 'bg-lavender' },
          { label: 'Invoice aktif', value: '328', change: '+8.4%', icon: 'invoice', color: 'bg-rose' },
          { label: 'Dalam pengiriman', value: '86', change: '12 tiba segera', icon: 'shipping', color: 'bg-yellow' },
          { label: 'Fee belum dibayar', value: '24', change: 'Rp 18,4 jt', icon: 'fees', color: 'bg-coral' },
        ]
      : [
          { label: 'Total invoice', value: '18', change: '3 bulan ini', icon: 'invoice', color: 'bg-lavender' },
          { label: 'Dalam proses', value: '4', change: '2 on ship', icon: 'process', color: 'bg-rose' },
          { label: 'Fee belum dibayar', value: '2', change: 'Rp 1,8 jt', icon: 'fees', color: 'bg-yellow' },
          { label: 'Pesanan selesai', value: '12', change: 'Semua waktu', icon: 'check', color: 'bg-teal' },
        ];
  }
}
