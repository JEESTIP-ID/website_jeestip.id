import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BrnButton } from '@spartan-ng/brain/button';

type ResiStatus = 'refund' | 'close' | 'sortir' | 'on_process' | 'on_ship';
type Resi = { no_resi: string; eta: string; status: ResiStatus };

const statusLabels: Record<ResiStatus, string> = {
  refund: 'Refund',
  close: 'Close',
  sortir: 'Sortir',
  on_process: 'On Process',
  on_ship: 'On Ship',
};

@Component({
  standalone: true,
  imports: [RouterLink, FormsModule, BrnButton],
  template: `
    <header class="sticky top-0 z-50 border-b border-hairline-soft bg-canvas/95 backdrop-blur-xl">
      <nav class="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8" aria-label="Navigasi utama">
        <a routerLink="/" class="focus-ring flex items-center gap-2 rounded-lg text-sm font-semibold tracking-tight">
          <span class="grid size-9 place-items-center rounded-xl bg-yellow text-lg font-semibold text-primary">J</span> JEESTIP.ID
        </a>
        <div class="hidden items-center gap-1 lg:flex">
          <a href="#jastip" class="focus-ring rounded-full px-4 py-2 text-sm font-medium text-slate hover:bg-surface">Jastip Taobao</a>
          <a href="#alipay-wepay" class="focus-ring rounded-full px-4 py-2 text-sm font-medium text-slate hover:bg-surface">Alipay/WePay</a>
          <a href="#transfer" class="focus-ring rounded-full px-4 py-2 text-sm font-medium text-slate hover:bg-surface">Transfer Bank</a>
          <a href="#cek-resi" class="focus-ring rounded-full px-4 py-2 text-sm font-medium text-slate hover:bg-surface">Cek Resi</a>
        </div>
        <div class="flex items-center gap-2">
          <a routerLink="/login" class="hidden rounded-full px-4 py-2 text-sm font-medium text-ink sm:inline-flex">Login Admin</a>
        </div>
      </nav>
    </header>

    <main>
      <section id="jastip" class="scroll-mt-20 bg-canvas pb-8 pt-0 sm:pb-10 lg:pb-12">
        <div class="mx-auto max-w-7xl px-5 lg:px-8">
          <div class="mx-auto max-w-6xl rounded-[32px] bg-surface-soft px-6 py-8 text-center sm:px-10 sm:py-10 lg:px-16">
            <span class="inline-flex rounded-full bg-yellow-light px-5 py-2 text-sm font-semibold text-yellow-dark">Jastip Belanja Marketplace China</span>
            <h1 class="display mx-auto mt-4 max-w-5xl text-5xl text-ink-deep sm:text-6xl lg:text-[74px]">
              Jastip belanja dari Alibaba, Taobao, dan 1688
            </h1>
            <p class="mx-auto mt-4 max-w-3xl text-lg leading-8 text-slate">
              Bantu cari, beli, dan urus kebutuhan belanja dari marketplace China dengan proses yang jelas dari estimasi harga sampai barang dikirim.
            </p>
          </div>

          <div class="whiteboard-shadow mx-auto mt-5 grid max-w-6xl overflow-hidden rounded-[32px] border border-hairline-soft bg-canvas lg:grid-cols-[.82fr_1.18fr]">
            <aside class="flex min-h-[620px] flex-col bg-primary p-7 text-white sm:p-10">
              <span class="w-max rounded-full bg-white px-5 py-2 text-sm font-medium text-primary">Rate Jastip</span>

              <div class="mt-7 grid min-h-[230px] place-items-center rounded-[28px] border border-white/10 bg-white/8 p-6">
                <svg class="h-40 w-full max-w-[320px]" viewBox="0 0 360 210" fill="none" aria-hidden="true">
                  <rect x="22" y="20" width="316" height="168" rx="24" fill="#2c2c34" stroke="#ffffff" stroke-opacity=".08" />
                  <path d="M87 172h132" stroke="#8e91a0" stroke-width="8" stroke-linecap="round" />
                  <rect x="78" y="104" width="78" height="70" rx="14" fill="#FFD84D" />
                  <path d="M95 106c0-38 19-57 47-57s47 19 47 57" stroke="#ffffff" stroke-width="10" stroke-linecap="round" />
                  <rect x="151" y="121" width="67" height="53" rx="14" fill="#ffffff" />
                  <path d="M184 121v53M151 148h67" stroke="#d7d9de" stroke-width="4" />
                  <circle cx="211" cy="76" r="22" fill="#84E0C3" />
                  <path d="M199 76h24M211 64v24" stroke="#050038" stroke-width="6" stroke-linecap="round" />
                  <path d="M101 136h36M101 152h24" stroke="#10243E" stroke-width="7" stroke-linecap="round" />
                </svg>
              </div>

              <p class="mt-6 text-sm text-white/65">Rate utama</p>
              <div class="mt-5 rounded-[28px] bg-white p-6 text-primary sm:p-8">
                <p class="text-sm font-medium text-slate sm:text-base">untuk 1 Yuan RMB</p>
                <p class="mt-6 flex items-baseline gap-3 whitespace-nowrap text-ink-deep">
                  <span class="text-2xl font-semibold sm:text-3xl">Rp</span>
                  <b class="text-6xl font-semibold tracking-tight sm:text-7xl">2.250</b>
                </p>
              </div>
              <p class="mt-4 text-sm leading-7 text-white/70 sm:text-base">Rate berlaku untuk pembelian dari marketplace China dan dikonfirmasi sebelum pembayaran.</p>
            </aside>

            <aside class="flex min-h-[620px] flex-col bg-canvas p-7 sm:p-10">
              <p class="text-xs font-semibold uppercase tracking-[.12em] text-stone">Jastip China</p>
              <h2 class="mt-4 text-4xl font-semibold tracking-tight text-ink-deep">Marketplace China</h2>

              <div class="mt-4 grid gap-3">
                @for (option of jastipOptions; track option.name) {
                  <article class="rounded-[24px] border border-hairline-soft bg-surface-soft p-5 sm:p-6">
                    <div class="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
                      <div class="min-w-0">
                        <h3 class="text-2xl font-semibold text-ink-deep">{{ option.name }}</h3>
                        <p class="mt-4 text-sm leading-6 text-slate sm:text-base">{{ option.description }}</p>
                      </div>
                      <span class="w-fit rounded-full bg-yellow-light px-4 py-2 text-xs font-semibold text-yellow-dark sm:mt-1">{{ option.badge }}</span>
                    </div>
                  </article>
                }
              </div>

              <p class="mt-5 rounded-2xl bg-teal/80 p-4 text-sm leading-6 text-primary/80">
                Kirim link produk, tim JEESTIP.ID bantu cek estimasi dan proses order.
              </p>

              <a
                [href]="whatsappLink"
                target="_blank"
                rel="noopener noreferrer"
                brnButton
                class="btn btn-primary mt-6 w-full"
              >
                <svg class="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 4a8 8 0 0 0-6.9 12.1L4 20l4-1a8 8 0 1 0 4-15Z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" />
                  <path d="M9.2 8.9c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.7 1.6c.1.3.1.5-.1.7l-.4.5c.6 1.1 1.4 1.9 2.5 2.5l.5-.4c.2-.2.4-.2.7-.1l1.6.7c.3.1.4.3.4.6v.4c0 .4-.1.6-.4.8-.6.4-1.4.6-2.2.4-2.9-.7-5.2-3-5.9-5.9-.2-.8 0-1.6.4-2.2Z" fill="currentColor" />
                </svg>
                Hubungi WhatsApp {{ whatsappPhone }}
              </a>
            </aside>
          </div>
        </div>
      </section>

      <section id="alipay-wepay" class="scroll-mt-20 bg-canvas py-10 sm:py-12">
        <div class="mx-auto max-w-7xl px-5 lg:px-8">
          <div class="mx-auto max-w-6xl rounded-[32px] bg-surface-soft px-6 py-8 text-center sm:px-10 sm:py-9 lg:px-16">
            <span class="inline-flex rounded-full bg-yellow-light px-5 py-2 text-sm font-semibold text-yellow-dark">Topup Alipay/WePay</span>
            <h2 class="display mx-auto mt-4 max-w-5xl text-4xl text-ink-deep sm:text-5xl lg:text-[64px]">
              Pilih durasi topup untuk Indonesia dan China
            </h2>
            <p class="mx-auto mt-3 max-w-3xl text-lg leading-8 text-slate">
              Rate Rp tidak ditampilkan pada landing page. Tim JEESTIP.ID akan mengonfirmasi nominal final sebelum topup diproses.
            </p>
          </div>

          <div class="whiteboard-shadow mx-auto mt-5 max-w-6xl overflow-hidden rounded-[32px] border border-hairline-soft bg-canvas p-5 sm:p-6">
            <div class="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
              <div>
                <p class="text-xs font-semibold uppercase tracking-[.12em] text-stone">Alipay / WePay</p>
                <h3 class="mt-2 text-3xl font-semibold tracking-tight text-ink-deep sm:text-4xl">Durasi layanan topup</h3>
              </div>
              <a [href]="whatsappLink" target="_blank" rel="noopener noreferrer" brnButton class="btn btn-primary w-fit">
                Hubungi WhatsApp
              </a>
            </div>

            <div class="mt-5 grid items-start gap-4 lg:grid-cols-2">
              @for (group of topupRateGroups; track group.name) {
                <section class="flex h-full flex-col rounded-[24px] border border-hairline-soft bg-surface-soft p-4 sm:p-5">
                  <div class="grid min-h-[76px] gap-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start">
                    <div>
                      <p class="text-xs font-semibold uppercase tracking-[.08em] text-stone">Topup</p>
                      <h4 class="mt-1 text-2xl font-semibold text-ink-deep">{{ group.name }}</h4>
                    </div>
                    <span class="mt-1 w-fit rounded-full bg-yellow-light px-4 py-2 text-xs font-semibold text-yellow-dark">Tanpa rate Rp</span>
                  </div>

                  <div class="mt-4 grid flex-1 auto-rows-fr items-stretch gap-3">
                    @for (service of group.services; track service.name) {
                      <article class="grid min-h-[112px] gap-3 rounded-2xl p-4 sm:grid-cols-[minmax(0,1fr)_8.5rem] sm:items-center" [class]="service.cardClass">
                        <div class="min-w-0">
                          <span class="rounded-full bg-white/75 px-3 py-1 text-xs font-semibold text-primary">{{ service.name }}</span>
                          <p class="mt-2 min-h-10 text-sm leading-5 text-primary/65">{{ service.description }}</p>
                        </div>
                        <b class="flex min-h-10 w-fit items-center justify-center rounded-full bg-white/80 px-4 py-2 text-center text-sm font-semibold text-primary sm:w-full">{{ service.duration }}</b>
                      </article>
                    }
                  </div>
                </section>
              }
            </div>

            <p class="mt-4 rounded-2xl bg-teal/80 p-3 text-sm leading-6 text-primary/80">
              Kirim kebutuhan topup, pilih durasi, lalu tim JEESTIP.ID akan konfirmasi nominal dan jadwal proses.
            </p>
          </div>
        </div>
      </section>

      <section id="transfer" class="scroll-mt-20 bg-surface py-20 sm:py-24">
        <div class="mx-auto max-w-7xl px-5 lg:px-8">
          <div class="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
            <div>
              <span class="rounded-full bg-yellow-light px-4 py-2 text-sm font-semibold text-yellow-dark">Transfer Bank China</span>
              <h2 class="display mt-5 text-4xl text-ink-deep sm:text-5xl">Transfer bank dengan durasi yang jelas.</h2>
              <p class="mt-5 max-w-lg leading-7 text-slate">Same Day dan Instant hanya menampilkan estimasi durasi, tanpa nominal rate di landing page.</p>
              <a [href]="whatsappLink" target="_blank" rel="noopener noreferrer" brnButton class="btn btn-primary mt-7">Hubungi WhatsApp</a>
            </div>
            <div class="grid items-stretch gap-5 sm:grid-cols-2">
              @for (transfer of transferOptions; track transfer.name) {
                <article class="whiteboard-shadow flex min-h-[320px] flex-col rounded-[32px] border border-hairline-soft p-7 text-primary" [class]="transfer.cardClass">
                  <span class="w-fit rounded-full bg-white/80 px-4 py-2 text-xs font-bold uppercase tracking-[.1em] text-primary">{{ transfer.state }}</span>
                  <p class="mt-10 text-sm font-semibold uppercase tracking-[.12em] text-primary/65">Transfer Bank China</p>
                  <h3 class="mt-2 text-4xl font-semibold tracking-tight text-ink-deep">{{ transfer.name }}</h3>
                  <p class="mt-3 min-h-16 text-sm leading-6 text-slate">{{ transfer.description }}</p>
                  <div class="mt-auto rounded-2xl bg-white/75 p-5 pt-6">
                    <p class="text-xs font-semibold uppercase tracking-[.08em] text-slate">Estimasi durasi</p>
                    <p class="mt-2 text-3xl font-semibold tracking-tight text-ink-deep">{{ transfer.duration }}</p>
                  </div>
                </article>
              }
            </div>
          </div>
        </div>
      </section>

      <section id="cek-resi" class="scroll-mt-20 bg-canvas py-20 sm:py-24">
        <div class="mx-auto grid max-w-6xl gap-8 px-5 lg:grid-cols-[.9fr_1.1fr] lg:px-8">
          <div>
            <span class="inline-flex rounded-full bg-yellow-light px-4 py-2 text-sm font-semibold text-yellow-dark">Cek Resi</span>
            <h2 class="display mt-5 text-4xl text-ink-deep sm:text-5xl">Cari status barang tanpa login.</h2>
            <p class="mt-5 leading-7 text-slate">Masukkan nomor resi dummy seperti JT123456789, JT987654321, atau JT456789123.</p>
          </div>

          <div class="rounded-[32px] border border-hairline-soft bg-surface-soft p-5">
            <form class="grid gap-3 sm:grid-cols-[1fr_auto]" (ngSubmit)="searchResi()">
              <input class="input bg-canvas" name="resiQuery" [(ngModel)]="resiQuery" placeholder="Masukkan nomor resi">
              <button brnButton class="btn btn-primary" type="submit">Cari resi</button>
            </form>

            <div class="mt-5 grid gap-3">
              @if (resiError) {
                <p class="rounded-2xl bg-rose p-4 text-sm font-medium text-coral-dark">Cek resi belum bisa diproses. Silakan coba lagi.</p>
              } @else if (resiSearched && resiResults().length === 0) {
                <p class="rounded-2xl bg-canvas p-5 text-center text-sm text-stone">Resi tidak ditemukan.</p>
              } @else {
                @for (resi of resiResults(); track resi.no_resi) {
                  <article class="grid gap-4 rounded-2xl bg-canvas p-5 sm:grid-cols-[minmax(0,1fr)_9rem_8rem] sm:items-center">
                    <div>
                      <p class="text-xs font-semibold uppercase tracking-[.05em] text-stone">No Resi</p>
                      <b class="mt-1 block text-lg text-ink-deep">{{ resi.no_resi }}</b>
                    </div>
                    <div>
                      <p class="text-xs font-semibold uppercase tracking-[.05em] text-stone">ETA</p>
                      <p class="mt-1 font-medium text-slate">{{ resi.eta }}</p>
                    </div>
                    <span class="inline-flex min-h-8 w-full items-center justify-center rounded-full px-3 py-1 text-center text-xs font-semibold" [class]="badge(resi.status)">{{ label(resi.status) }}</span>
                  </article>
                }
              }
            </div>
          </div>
        </div>
      </section>

      <section class="bg-surface-soft py-20">
        <div class="mx-auto grid max-w-6xl gap-4 px-5 md:grid-cols-3 lg:px-8">
          @for (step of steps; track step.title) {
            <article class="rounded-[28px] bg-canvas p-6">
              <span class="grid size-10 place-items-center rounded-full bg-primary text-sm font-semibold text-white">{{ step.no }}</span>
              <h3 class="mt-5 text-2xl font-medium text-ink-deep">{{ step.title }}</h3>
              <p class="mt-3 text-sm leading-6 text-slate">{{ step.desc }}</p>
            </article>
          }
        </div>
      </section>
    </main>

    <footer class="bg-primary text-white">
      <div class="mx-auto grid max-w-7xl gap-10 px-5 py-16 md:grid-cols-[1.2fr_2fr] lg:px-8">
        <div>
          <div class="flex items-center gap-2 text-lg font-semibold"><span class="grid size-9 place-items-center rounded-xl bg-yellow text-primary">J</span> JEESTIP.ID</div>
          <p class="mt-4 max-w-sm text-sm leading-6 text-white/55">Landing page frontend JEESTIP.ID dengan dummy data untuk jastip Taobao dan cek resi.</p>
        </div>
        <div class="grid gap-8 text-sm sm:grid-cols-3">
          <div><b>Layanan</b><div class="mt-4 grid gap-3 text-white/55"><a href="#jastip">Jastip Taobao</a><a href="#alipay-wepay">Alipay/WePay</a><a href="#transfer">Transfer Bank</a></div></div>
          <div><b>Admin</b><div class="mt-4 grid gap-3 text-white/55"><a routerLink="/login">Login Admin</a><a routerLink="/admin/transaksi-pembelian">Transaksi Pembelian</a></div></div>
          <div><b>Kontak</b><div class="mt-4 grid gap-3 text-white/55"><span>{{ whatsappPhone }}</span><span>© 2026 JEESTIP.ID</span></div></div>
        </div>
      </div>
    </footer>
  `,
})
export class LandingComponent {
  protected readonly whatsappPhone = '+62 812-3456-7890';
  protected readonly whatsappLink = 'https://wa.me/6281234567890?text=Halo%20JEESTIP.ID%2C%20saya%20ingin%20konsultasi%20jastip%20China.';

  resiQuery = '';
  resiSearched = false;
  resiError = false;

  protected readonly resiData: Resi[] = [
    { no_resi: 'JT123456789', eta: '2026-08-20', status: 'on_ship' },
    { no_resi: 'JT987654321', eta: '2026-08-22', status: 'sortir' },
    { no_resi: 'JT456789123', eta: '2026-08-25', status: 'on_process' },
  ];

  protected readonly jastipOptions = [
    { name: 'Alibaba', badge: 'Supplier', description: 'Cocok untuk sourcing supplier, barang custom, dan kebutuhan produksi.' },
    { name: 'Taobao', badge: 'Retail', description: 'Cocok untuk belanja produk retail, fashion, aksesoris, dan barang unik.' },
    { name: '1688', badge: 'Grosir', description: 'Cocok untuk harga grosir, pembelian banyak, dan produk pabrik China.' },
  ];

  protected readonly topupRateGroups = [
    {
      name: 'Alipay/WePay Indonesia',
      updated: 'Dummy data',
      services: [
        { name: 'Instant', duration: '<= 1 jam', description: 'Prioritas untuk kebutuhan paling cepat.', cardClass: 'bg-rose' },
        { name: 'Same Day', duration: 'Hari yang sama', description: 'Diproses di hari yang sama sesuai jam operasional.', cardClass: 'bg-teal' },
        { name: 'Slow', duration: 'Estimasi 3 hari', description: 'Pilihan lebih santai untuk kebutuhan tidak mendesak.', cardClass: 'bg-yellow' },
      ],
    },
    {
      name: 'Alipay/WePay China',
      updated: 'Dummy data',
      services: [
        { name: 'Instant', duration: '<= 1 jam', description: 'Prioritas untuk akun region China.', cardClass: 'bg-orange' },
        { name: 'Same Day', duration: 'Hari yang sama', description: 'Diproses di hari yang sama sesuai antrian.', cardClass: 'bg-lavender' },
        { name: 'Slow', duration: 'Estimasi 3 hari', description: 'Estimasi pengerjaan tiga hari.', cardClass: 'bg-teal' },
      ],
    },
  ];

  protected readonly transferOptions = [
    { name: 'Same Day', state: 'Open', duration: 'Hari yang sama', description: 'Untuk pembayaran supplier dan kebutuhan reguler.', cardClass: 'bg-coral' },
    { name: 'Instant', state: 'Open', duration: '<= 1 jam', description: 'Untuk kebutuhan transfer yang lebih mendesak.', cardClass: 'bg-teal' },
  ];

  protected readonly steps = [
    { no: '1', title: 'Kirim link', desc: 'Bagikan link produk China atau nomor resi yang ingin dicek.' },
    { no: '2', title: 'Admin proses', desc: 'Tim menginput/update ETA dan status transaksi pembelian.' },
    { no: '3', title: 'Cek status', desc: 'Visitor cukup mencari nomor resi tanpa login.' },
  ];

  searchResi() {
    this.resiSearched = true;
    this.resiError = this.resiQuery.trim().toLowerCase() === 'error';
  }

  resiResults() {
    if (!this.resiSearched || this.resiError) return [];
    const query = this.resiQuery.trim().toLowerCase();
    if (!query) return this.resiData;
    return this.resiData.filter((resi) => resi.no_resi.toLowerCase().includes(query));
  }

  label(status: ResiStatus) {
    return statusLabels[status];
  }

  badge(status: ResiStatus) {
    if (status === 'on_ship' || status === 'close') return 'bg-teal text-moss';
    if (status === 'refund') return 'bg-rose text-coral-dark';
    if (status === 'sortir') return 'bg-yellow-light text-yellow-dark';
    return 'bg-lavender text-blue';
  }
}
