import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BrnButton } from '@spartan-ng/brain/button';

@Component({
  standalone: true,
  imports: [RouterLink, BrnButton],
  template: `
    <header class="sticky top-0 z-50 border-b border-hairline-soft bg-canvas/95 backdrop-blur-xl">
      <nav class="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8" aria-label="Navigasi utama">
        <a routerLink="/" class="focus-ring flex items-center gap-2 rounded-lg text-sm font-semibold tracking-tight">
          <span class="grid size-9 place-items-center rounded-xl bg-yellow text-lg font-semibold text-primary">J</span> JEESTIP.ID
        </a>
        <div class="hidden items-center gap-1 lg:flex">
          <a href="#topup" class="focus-ring rounded-full px-4 py-2 text-sm font-medium text-slate hover:bg-surface">Topup Alipay/WePay</a>
          <a href="#transfer" class="focus-ring rounded-full px-4 py-2 text-sm font-medium text-slate hover:bg-surface">Transfer Bank China</a>
          <a href="#jastip" class="focus-ring rounded-full px-4 py-2 text-sm font-medium text-slate hover:bg-surface">Jastip China</a>
        </div>
        <div class="flex items-center gap-2">
          <a routerLink="/login" class="hidden rounded-full px-4 py-2 text-sm font-medium text-ink sm:inline-flex">Login</a>
          <a routerLink="/login" brnButton class="btn btn-primary focus-ring">Masuk portal</a>
        </div>
      </nav>
    </header>

    <main>
      <section id="topup" class="scroll-mt-20 bg-canvas py-20 sm:py-24 lg:py-28">
        <div class="mx-auto max-w-7xl px-5 lg:px-8">
          <div class="mx-auto max-w-5xl text-center">
            <span class="inline-flex rounded-full bg-yellow-light px-4 py-2 text-sm font-semibold text-yellow-dark">Topup China tanpa fee jasa</span>
            <h1 class="display mx-auto mt-6 max-w-5xl text-5xl text-ink-deep sm:text-6xl lg:text-[80px]">
              Perlu isi saldo Alipay atau WePay sekarang?
            </h1>
            <p class="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate">
              Pilih layanan sesuai kebutuhan. Rate dibuat bertingkat berdasarkan jumlah RMB, lalu dikonfirmasi sebelum Anda transfer.
            </p>
            <div class="mt-8 flex flex-wrap justify-center gap-3">
              <a href="#rates" brnButton class="btn btn-primary focus-ring">Lihat rate hari ini</a>
              <a href="#transfer" brnButton class="btn btn-secondary focus-ring">Layanan lain</a>
            </div>
          </div>

          <div class="whiteboard-shadow mx-auto mt-14 max-w-6xl overflow-hidden rounded-2xl border border-hairline-soft bg-canvas">
            <div class="flex items-center justify-between border-b border-hairline-soft px-5 py-4">
              <div class="flex items-center gap-2">
                <span class="size-3 rounded-full bg-coral"></span>
                <span class="size-3 rounded-full bg-yellow"></span>
                <span class="size-3 rounded-full bg-teal"></span>
              </div>
              <span class="rounded-full bg-surface px-3 py-1 text-xs font-medium text-steel">JEESTIP rate board</span>
            </div>
            <div class="grid gap-5 bg-surface-soft p-5 lg:grid-cols-[.75fr_1.25fr]">
              <aside class="rounded-[28px] bg-yellow p-6 text-primary">
                <p class="text-sm font-medium">Kurs dikonfirmasi</p>
                <p class="display mt-12 text-4xl">Sebelum transfer</p>
                <p class="mt-4 text-sm leading-6 text-primary/70">CS mengirim final rate dan nominal IDR sesuai tier RMB yang dipilih.</p>
              </aside>

              <div id="rates" class="grid gap-5 md:grid-cols-2">
                @for (wallet of topupRateGroups; track wallet.wallet) {
                  <section class="rounded-[28px] border border-hairline-soft bg-canvas p-5">
                    <div class="flex items-start justify-between gap-3">
                      <div>
                        <p class="text-xs font-semibold uppercase tracking-[.05em] text-stone">Topup {{ wallet.wallet }}</p>
                        <h2 class="mt-1 text-2xl font-medium text-ink-deep">Rate per RMB</h2>
                      </div>
                      <span class="rounded-full bg-yellow-light px-3 py-1 text-xs font-semibold text-yellow-dark">{{ wallet.updated }}</span>
                    </div>

                    <div class="mt-5 grid gap-4">
                      @for (service of wallet.services; track service.name) {
                        <article class="rounded-2xl p-5" [class]="service.cardClass">
                          <div class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                            <div class="min-w-0">
                              <span class="rounded-full bg-white/75 px-3 py-1 text-xs font-semibold text-primary">{{ service.name }}</span>
                              <p class="mt-4 text-sm text-primary/65">{{ service.description }}</p>
                            </div>
                            <p class="flex items-baseline gap-1.5 whitespace-nowrap font-medium tracking-tight">
                              <span class="text-base">Rp</span>
                              <strong class="text-2xl font-medium sm:text-3xl">{{ service.featuredRate }}</strong>
                            </p>
                          </div>
                          <div class="mt-5 divide-y divide-primary/10 border-t border-primary/10">
                            @for (tier of service.tiers; track tier.range) {
                              <div class="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3 text-sm">
                                <span class="text-slate">{{ tier.range }}</span>
                                <b class="whitespace-nowrap font-medium text-ink">Rp {{ tier.rate }}</b>
                              </div>
                            }
                          </div>
                        </article>
                      }
                    </div>
                  </section>
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="transfer" class="scroll-mt-20 bg-surface py-24">
        <div class="mx-auto max-w-7xl px-5 lg:px-8">
          <div class="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <span class="rounded-full bg-yellow-light px-4 py-2 text-sm font-semibold text-yellow-dark">Transfer Bank China</span>
              <h2 class="display mt-5 text-4xl text-ink-deep sm:text-5xl">Transfer cepat. Biaya jelas.</h2>
              <p class="mt-5 max-w-lg leading-7 text-slate">Pembayaran supplier dan kebutuhan bisnis di China jadi lebih sederhana.</p>
            </div>
            <div class="grid gap-5 sm:grid-cols-2">
              <div class="min-w-0 rounded-[28px] bg-coral p-6 text-primary sm:p-8">
                <span class="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold">OPEN</span>
                <p class="mt-14 text-sm text-slate">Same Day</p>
                <p class="mt-1 flex items-baseline gap-2 whitespace-nowrap font-medium">
                  <span class="text-xl sm:text-2xl">Rp</span>
                  <strong class="text-3xl font-medium sm:text-4xl">2.265</strong>
                </p>
                <p class="mt-3 text-sm text-slate">Diproses di hari yang sama</p>
              </div>
              <div class="min-w-0 rounded-[28px] bg-teal p-6 text-primary sm:p-8">
                <span class="rounded-full bg-white/70 px-3 py-1 text-xs font-semibold">OPEN</span>
                <p class="mt-14 text-sm text-slate">Instant</p>
                <p class="mt-1 flex items-baseline gap-2 whitespace-nowrap font-medium">
                  <span class="text-xl sm:text-2xl">Rp</span>
                  <strong class="text-3xl font-medium sm:text-4xl">2.285</strong>
                </p>
                <p class="mt-3 text-sm text-slate">Prioritas proses tercepat</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="jastip" class="scroll-mt-20 bg-canvas py-24">
        <div class="mx-auto max-w-7xl px-5 lg:px-8">
          <div class="rounded-[32px] bg-primary px-7 py-16 text-white md:px-14">
            <div class="mx-auto max-w-3xl text-center">
              <span class="rounded-full bg-white px-4 py-2 text-sm font-medium text-primary">Jastip China</span>
              <h2 class="display mt-6 text-4xl sm:text-6xl">Titip belanja, tanpa batas ide.</h2>
              <p class="mt-5 leading-7 text-white/70">Rate berlaku untuk pembelian marketplace China. Konsultasikan barang dan estimasi biaya dengan tim kami.</p>
              <div class="mt-8 inline-flex rounded-full bg-white px-6 py-4 text-primary"><span class="mr-5 text-sm text-slate">Rate utama</span><b>1 RMB = Rp 2.250</b></div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="bg-primary text-white">
      <div class="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[1.2fr_2fr] lg:px-8">
        <div>
          <div class="flex items-center gap-2 text-lg font-semibold"><span class="grid size-9 place-items-center rounded-xl bg-yellow text-primary">J</span> JEESTIP.ID</div>
          <p class="mt-4 max-w-sm text-sm leading-6 text-white/55">Portal jastip, topup, dan transfer China–Indonesia.</p>
        </div>
        <div class="grid gap-8 text-sm sm:grid-cols-3">
          <div><b>Layanan</b><div class="mt-4 grid gap-3 text-white/55"><a href="#topup">Topup</a><a href="#transfer">Transfer</a><a href="#jastip">Jastip</a></div></div>
          <div><b>Portal</b><div class="mt-4 grid gap-3 text-white/55"><a routerLink="/login">Login customer</a><a routerLink="/login">Login admin</a></div></div>
          <div><b>Kontak</b><div class="mt-4 grid gap-3 text-white/55"><span>CS setiap hari</span><span>© 2026 JEESTIP.ID</span></div></div>
        </div>
      </div>
    </footer>
  `,
})
export class LandingComponent {
  protected readonly topupRateGroups = [
    {
      wallet: 'Alipay',
      updated: '12 Jun, 08.17',
      services: [
        {
          name: 'Instant',
          featuredRate: '2.732',
          description: 'Prioritas · ≤1 jam',
          cardClass: 'bg-rose',
          tiers: [
            { range: '500–999 RMB', rate: '2.732' },
            { range: '1.000–9.999 RMB', rate: '2.722' },
            { range: '≥10.000 RMB', rate: '2.712' },
          ],
        },
        {
          name: 'Same Day',
          featuredRate: '2.722',
          description: 'Lebih hemat · hari ini',
          cardClass: 'bg-teal',
          tiers: [
            { range: '500–999 RMB', rate: '2.722' },
            { range: '1.000–9.999 RMB', rate: '2.712' },
            { range: '≥10.000 RMB', rate: '2.702' },
          ],
        },
      ],
    },
    {
      wallet: 'WePay',
      updated: '12 Jun, 08.17',
      services: [
        {
          name: 'Instant',
          featuredRate: '2.732',
          description: 'Prioritas · ≤1 jam',
          cardClass: 'bg-orange',
          tiers: [
            { range: '500–999 RMB', rate: '2.732' },
            { range: '1.000–9.999 RMB', rate: '2.722' },
            { range: '≥10.000 RMB', rate: '2.712' },
          ],
        },
        {
          name: 'Same Day',
          featuredRate: '2.722',
          description: 'Lebih hemat · hari ini',
          cardClass: 'bg-lavender',
          tiers: [
            { range: '500–999 RMB', rate: '2.722' },
            { range: '1.000–9.999 RMB', rate: '2.712' },
            { range: '≥10.000 RMB', rate: '2.702' },
          ],
        },
      ],
    },
  ];
}
