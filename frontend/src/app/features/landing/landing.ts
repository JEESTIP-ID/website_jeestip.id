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
          <a href="#jastip-options" class="focus-ring rounded-full px-4 py-2 text-sm font-medium text-slate hover:bg-surface">Jastip China</a>
          <a href="#topup" class="focus-ring rounded-full px-4 py-2 text-sm font-medium text-slate hover:bg-surface">Topup Alipay/WePay</a>
          <a href="#transfer" class="focus-ring rounded-full px-4 py-2 text-sm font-medium text-slate hover:bg-surface">Transfer Bank China</a>
        </div>
        <div class="flex items-center gap-2">
          <a routerLink="/login" class="hidden rounded-full px-4 py-2 text-sm font-medium text-ink sm:inline-flex">Login</a>
          <a routerLink="/login" brnButton class="btn btn-primary focus-ring">Masuk portal</a>
        </div>
      </nav>
    </header>

    <main>
      <section id="jastip" class="scroll-mt-20 bg-canvas py-20 sm:py-24 lg:py-28">
        <div class="mx-auto max-w-7xl px-5 lg:px-8">
          <div class="mx-auto max-w-6xl rounded-[32px] bg-surface-soft p-7 text-center sm:p-9">
            <span class="inline-flex rounded-full bg-yellow-light px-4 py-2 text-sm font-semibold text-yellow-dark">Jastip Belanja Marketplace China</span>
              <h1 class="display mx-auto mt-6 max-w-5xl text-5xl text-ink-deep sm:text-6xl lg:text-[72px]">
                Jastip belanja dari Alibaba, Taobao, dan 1688
              </h1>
              <p class="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate">
                Bantu cari, beli, dan urus kebutuhan belanja dari marketplace China dengan proses yang jelas dari estimasi harga sampai barang dikirim.
              </p>
          </div>

          <section id="jastip-options" class="whiteboard-shadow mx-auto mt-8 max-w-6xl overflow-hidden rounded-[32px] border border-hairline-soft bg-canvas">
            <div class="grid gap-0 lg:grid-cols-[.82fr_1.18fr]">
              <aside class="flex min-h-[360px] flex-col bg-primary p-7 text-white">
                <span class="w-max rounded-full bg-white px-4 py-2 text-sm font-medium text-primary">Rate Jastip</span>
                <div class="my-8 grid place-items-center rounded-[28px] border border-white/10 bg-white/8 p-6">
                  <svg class="h-36 w-full max-w-[260px]" viewBox="0 0 280 170" fill="none" aria-hidden="true">
                    <rect x="48" y="62" width="110" height="82" rx="20" fill="#FFD84D" />
                    <path d="M77 65c0-24 12-38 31-38s31 14 31 38" stroke="white" stroke-width="10" stroke-linecap="round" />
                    <rect x="142" y="82" width="74" height="62" rx="14" fill="white" />
                    <path d="M142 104h74M179 82v62" stroke="#10243E" stroke-opacity=".18" stroke-width="4" />
                    <circle cx="207" cy="45" r="25" fill="#84E0C3" />
                    <path d="M197 45h20M207 35v20" stroke="#10243E" stroke-width="5" stroke-linecap="round" />
                    <path d="M62 144h168" stroke="white" stroke-opacity=".28" stroke-width="8" stroke-linecap="round" />
                    <path d="M83 101h39M83 119h26" stroke="#10243E" stroke-width="7" stroke-linecap="round" />
                  </svg>
                </div>
                <p class="text-sm text-white/60">Rate utama</p>
                <div class="mt-3 rounded-[28px] bg-white p-6 text-primary">
                  <p class="text-sm font-medium text-slate">untuk 1 Yuan RMB</p>
                  <p class="mt-2 flex items-baseline gap-2 whitespace-nowrap text-ink-deep">
                    <span class="text-2xl font-medium">Rp</span>
                    <b class="text-6xl font-semibold tracking-tight">2.250</b>
                  </p>
                </div>
                <p class="mt-5 text-sm leading-6 text-white/65">Rate berlaku untuk pembelian dari marketplace China dan dikonfirmasi sebelum pembayaran.</p>
              </aside>

              <aside class="p-7">
                <p class="text-xs font-semibold uppercase tracking-[.08em] text-stone">Jastip China</p>
                <h2 class="mt-3 text-3xl font-semibold tracking-tight text-ink-deep">Marketplace China</h2>
                <div class="mt-6 grid gap-3">
                  @for (option of jastipOptions; track option.name) {
                    <div class="rounded-2xl border border-hairline-soft bg-surface-soft p-4">
                      <div class="flex items-center justify-between gap-3">
                        <b class="text-lg font-semibold text-ink-deep">{{ option.name }}</b>
                        <span class="rounded-full bg-yellow-light px-3 py-1 text-xs font-semibold text-yellow-dark">{{ option.badge }}</span>
                      </div>
                      <p class="mt-2 text-sm leading-6 text-slate">{{ option.description }}</p>
                    </div>
                  }
                </div>
                <p class="mt-5 rounded-2xl bg-teal/70 p-4 text-sm leading-6 text-primary">Kirim link produk, tim JEESTIP.ID bantu cek estimasi dan proses order.</p>
                <a
                  [href]="whatsappLink"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="mt-4 flex items-center justify-center gap-3 rounded-2xl bg-primary px-5 py-4 text-sm font-semibold text-white transition hover:bg-primary/90"
                >
                  <svg class="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 4a8 8 0 0 0-6.9 12.1L4 20l4-1a8 8 0 1 0 4-15Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
                    <path d="M9.2 8.9c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.3.1.5-.1.7l-.4.5c.6 1.1 1.4 1.9 2.5 2.5l.5-.4c.2-.2.4-.2.7-.1l1.6.7c.3.1.4.3.4.6v.4c0 .4-.1.6-.4.8-.6.4-1.4.6-2.2.4-2.9-.7-5.2-3-5.9-5.9-.2-.8 0-1.6.4-2.2Z" fill="currentColor" />
                  </svg>
                  <span>Hubungi WhatsApp {{ whatsappPhone }}</span>
                </a>
              </aside>
            </div>
          </section>
        </div>
      </section>

      <section id="topup" class="scroll-mt-20 bg-canvas py-20 sm:py-24">
        <div class="mx-auto max-w-7xl px-5 lg:px-8">
          <div class="mx-auto mb-10 max-w-6xl">
            <span class="inline-flex rounded-full bg-yellow-light px-4 py-2 text-sm font-semibold text-yellow-dark">Topup Alipay/WePay</span>
            <h2 class="display mt-5 text-4xl text-ink-deep sm:text-5xl">Rate topup berdasarkan region dan jumlah RMB.</h2>
            <p class="mt-5 leading-7 text-slate">
              Pilih layanan sesuai kebutuhan. Rate dibuat bertingkat berdasarkan jumlah RMB, lalu dikonfirmasi sebelum Anda transfer.
            </p>
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
              <aside class="flex min-h-[420px] flex-col overflow-hidden rounded-[28px] bg-yellow p-6 text-primary">
                <p class="text-sm font-medium">Kurs dikonfirmasi</p>
                <p class="display mt-12 text-4xl">Sebelum transfer</p>
                <div class="my-7 rounded-[28px] bg-white/60 p-5">
                  <svg class="h-40 w-full" viewBox="0 0 300 176" fill="none" aria-hidden="true">
                    <ellipse cx="150" cy="151" rx="105" ry="10" fill="#10243E" opacity=".12" />
                    <g transform="rotate(-8 70 86)">
                      <rect x="24" y="45" width="106" height="72" rx="14" fill="#10243E" />
                      <rect x="36" y="57" width="82" height="48" rx="10" stroke="white" stroke-opacity=".35" stroke-width="4" />
                      <circle cx="77" cy="81" r="15" fill="#FFD84D" />
                      <path d="M56 101h42" stroke="white" stroke-width="6" stroke-linecap="round" />
                      <text x="49" y="40" fill="#10243E" font-size="24" font-weight="800">IDR</text>
                    </g>
                    <path d="M136 82h49M171 62l21 21-21 21" stroke="#10243E" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
                    <g>
                      <circle cx="227" cy="84" r="42" fill="#84E0C3" />
                      <circle cx="227" cy="84" r="28" stroke="#10243E" stroke-opacity=".22" stroke-width="5" />
                      <path d="M227 62v44M213 73h20a12 12 0 0 1 0 24h-20" stroke="#10243E" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" />
                      <text x="198" y="151" fill="#10243E" font-size="24" font-weight="800">RMB</text>
                    </g>
                    <circle cx="252" cy="39" r="17" fill="#FF7D61" />
                    <path d="m244 39 5 5 11-12" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
                <p class="text-sm leading-6 text-primary/70">CS mengirim final rate dan nominal IDR sesuai tier RMB yang dipilih.</p>
                <div class="mt-auto grid gap-2 pt-5 text-sm">
                  <div class="flex items-center gap-2 rounded-2xl bg-white/55 px-4 py-3">
                    <span class="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold text-white">1</span>
                    <span>Kirim nominal IDR</span>
                  </div>
                  <div class="flex items-center gap-2 rounded-2xl bg-white/55 px-4 py-3">
                    <span class="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold text-white">2</span>
                    <span>CS konfirmasi kurs RMB</span>
                  </div>
                  <div class="flex items-center gap-2 rounded-2xl bg-white/55 px-4 py-3">
                    <span class="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-xs font-semibold text-white">3</span>
                    <span>Transfer diproses</span>
                  </div>
                </div>
              </aside>

              <div id="rates" class="grid items-stretch gap-5 md:grid-cols-2">
                @for (group of topupRateGroups; track group.name) {
                  <section class="flex h-full flex-col rounded-[28px] border border-hairline-soft bg-canvas p-5">
                    <div class="grid min-h-[78px] grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                      <div class="min-w-0">
                        <p class="min-h-8 text-xs font-semibold uppercase leading-4 tracking-[.05em] text-stone">Topup {{ group.name }}</p>
                        <h2 class="mt-1 text-2xl font-medium text-ink-deep">Rate per RMB</h2>
                      </div>
                      <span class="whitespace-nowrap rounded-full bg-yellow-light px-3 py-1 text-xs font-semibold text-yellow-dark">{{ group.updated }}</span>
                    </div>

                    <div class="mt-5 grid flex-1 auto-rows-fr gap-4">
                      @for (service of group.services; track service.name) {
                        <article class="flex h-full flex-col rounded-2xl p-5" [class]="service.cardClass">
                          <div class="grid min-h-[82px] grid-cols-[minmax(0,1fr)_minmax(94px,auto)] items-start gap-3">
                            <div class="min-w-0">
                              <span class="rounded-full bg-white/75 px-3 py-1 text-xs font-semibold text-primary">{{ service.name }}</span>
                              <p class="mt-4 text-sm text-primary/65">{{ service.description }}</p>
                            </div>
                            <p class="flex justify-end gap-1.5 whitespace-nowrap text-right font-medium leading-none tracking-tight">
                              <span class="text-base">Rp</span>
                              <strong class="text-2xl font-medium sm:text-3xl">{{ service.featuredRate }}</strong>
                            </p>
                          </div>
                          <div class="mt-auto divide-y divide-primary/10 border-t border-primary/10 pt-2">
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
          <div class="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
            <div>
              <span class="rounded-full bg-yellow-light px-4 py-2 text-sm font-semibold text-yellow-dark">Transfer Bank China</span>
              <h2 class="display mt-5 text-4xl text-ink-deep sm:text-5xl">Transfer cepat. Biaya jelas.</h2>
              <p class="mt-5 max-w-lg leading-7 text-slate">Pembayaran supplier dan kebutuhan bisnis di China jadi lebih sederhana.</p>
            </div>
            <div class="grid gap-5 sm:grid-cols-2">
              <article class="whiteboard-shadow relative overflow-hidden rounded-[32px] border-2 border-coral bg-coral p-7 text-primary">
                <div class="absolute right-5 top-5 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[.08em]">OPEN</div>
                <div class="grid size-12 place-items-center rounded-2xl bg-white/75 text-primary" aria-hidden="true">
                  <svg class="size-7" viewBox="0 0 24 24" fill="none">
                    <path d="M7 3v3M17 3v3M4.5 9.5h15" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
                    <rect x="4" y="5" width="16" height="15" rx="4" stroke="currentColor" stroke-width="1.8" />
                    <path d="m8.25 14 2.25 2.25L15.75 11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
                <p class="mt-8 text-sm font-semibold uppercase tracking-[.12em] text-primary/65">Transfer Bank China</p>
                <h3 class="mt-2 text-4xl font-semibold tracking-tight text-ink-deep">Same Day</h3>
                <p class="mt-3 text-sm leading-6 text-slate">Diproses di hari yang sama untuk pembayaran supplier dan kebutuhan reguler.</p>
                <div class="mt-8 rounded-2xl bg-white/75 p-5">
                  <p class="text-xs font-semibold uppercase tracking-[.08em] text-slate">Rate per RMB</p>
                  <p class="mt-2 flex items-baseline gap-2 whitespace-nowrap text-ink-deep">
                    <span class="text-xl font-medium">Rp</span>
                    <b class="text-5xl font-semibold tracking-tight">2.265</b>
                  </p>
                </div>
              </article>
              <article class="whiteboard-shadow relative overflow-hidden rounded-[32px] border-2 border-teal bg-teal p-7 text-primary">
                <div class="absolute right-5 top-5 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[.08em]">OPEN</div>
                <div class="grid size-12 place-items-center rounded-2xl bg-white/75 text-primary" aria-hidden="true">
                  <svg class="size-7" viewBox="0 0 24 24" fill="none">
                    <path d="M13 2 5 13h6l-1 9 9-12h-6l1-8Z" fill="currentColor" />
                    <path d="M4 18h5M15 18h5M6.5 21h11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
                  </svg>
                </div>
                <p class="mt-8 text-sm font-semibold uppercase tracking-[.12em] text-primary/65">Transfer Bank China</p>
                <h3 class="mt-2 text-4xl font-semibold tracking-tight text-ink-deep">Instant</h3>
                <p class="mt-3 text-sm leading-6 text-slate">Prioritas proses tercepat untuk kebutuhan transfer yang lebih mendesak.</p>
                <div class="mt-8 rounded-2xl bg-white/75 p-5">
                  <p class="text-xs font-semibold uppercase tracking-[.08em] text-slate">Rate per RMB</p>
                  <p class="mt-2 flex items-baseline gap-2 whitespace-nowrap text-ink-deep">
                    <span class="text-xl font-medium">Rp</span>
                    <b class="text-5xl font-semibold tracking-tight">2.285</b>
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

    </main>

    <footer class="bg-primary text-white">
      <div class="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[1.2fr_2fr] lg:px-8">
        <div>
          <div class="flex items-center gap-2 text-lg font-semibold"><span class="grid size-9 place-items-center rounded-xl bg-yellow text-primary">J</span> JEESTIP.ID</div>
          <p class="mt-4 max-w-sm text-sm leading-6 text-white/55">Jastip belanja dari Alibaba, Taobao, 1688, plus topup dan transfer China-Indonesia.</p>
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
  protected readonly whatsappPhone = '+62 812-3456-7890';
  protected readonly whatsappLink = 'https://wa.me/6281234567890?text=Halo%20JEESTIP.ID%2C%20saya%20ingin%20konsultasi%20jastip%20China.';

  protected readonly jastipOptions = [
    {
      name: 'Alibaba',
      badge: 'Supplier',
      description: 'Cocok untuk pembelian supplier, grosir, dan kebutuhan bisnis.',
    },
    {
      name: 'Taobao',
      badge: 'Retail',
      description: 'Cocok untuk belanja produk retail, fashion, aksesoris, dan barang unik.',
    },
    {
      name: '1688',
      badge: 'Grosir',
      description: 'Cocok untuk harga grosir, pembelian banyak, dan produk pabrik China.',
    },
  ];

  protected readonly topupRateGroups = [
    {
      name: 'Alipay/WePay Indonesia',
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
      name: 'Alipay/WePay China',
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
