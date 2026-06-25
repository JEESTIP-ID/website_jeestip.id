import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BrnButton } from '@spartan-ng/brain/button';

@Component({
  standalone: true,
  imports: [FormsModule, RouterLink, BrnButton],
  template: `
    <main class="grid min-h-screen bg-canvas lg:grid-cols-[1.05fr_.95fr]">
      <section class="hidden overflow-hidden bg-surface p-10 lg:flex lg:flex-col">
        <a routerLink="/" class="flex items-center gap-2 text-sm font-semibold">
          <span class="grid size-9 place-items-center rounded-xl bg-yellow text-primary">J</span> JEESTIP.ID
        </a>

        <div class="my-auto">
          <span class="rounded-full bg-yellow-light px-4 py-2 text-sm font-semibold text-yellow-dark">Portal operasional</span>
          <h1 class="display mt-6 max-w-xl text-6xl text-ink-deep">Semua pesanan Anda, dalam satu workspace.</h1>
          <p class="mt-6 max-w-lg text-lg leading-8 text-slate">Pantau invoice, transaksi pembelian, fee, dan rate layanan dalam antarmuka visual yang rapi.</p>

        </div>
      </section>

      <section class="flex items-center justify-center px-5 py-14">
        <div class="w-full max-w-md">
          <a routerLink="/" class="mb-10 inline-flex items-center gap-2 rounded-full border border-hairline-strong px-4 py-2 text-sm font-medium">← Kembali</a>
          <p class="text-xs font-semibold uppercase tracking-[.05em] text-stone">Selamat datang</p>
          <h2 class="display mt-3 text-5xl text-ink-deep">Masuk ke akun Anda.</h2>
          <p class="mt-4 leading-7 text-slate">Gunakan ID customer atau email admin untuk membuka portal yang sesuai.</p>

          <form class="mt-9 space-y-5" (ngSubmit)="submit()">
            <label class="block text-sm font-medium">Nama / Email
              <input class="input mt-2" name="identifier" [(ngModel)]="identifier" placeholder="CUST-001 atau nama@email.com" autocomplete="username" required>
            </label>
            <label class="block text-sm font-medium">Password
              <div class="relative mt-2">
                <input class="input pr-16" name="password" [(ngModel)]="password" [type]="visible() ? 'text' : 'password'" placeholder="Masukkan password" autocomplete="current-password" required>
                <button type="button" class="absolute right-3 top-2.5 rounded-full px-2 text-sm font-medium text-blue" (click)="visible.set(!visible())">{{ visible() ? 'Tutup' : 'Lihat' }}</button>
              </div>
            </label>
            <div class="flex items-center justify-between text-sm text-slate">
              <label class="flex items-center gap-2"><input type="checkbox" class="size-4 accent-blue"> Ingat saya</label>
              <button type="button" class="font-medium text-blue">Lupa password?</button>
            </div>
            <button brnButton class="btn btn-primary focus-ring w-full" [disabled]="loading()">{{ loading() ? 'Memproses...' : 'Masuk' }} <span>→</span></button>
          </form>

          <div class="my-7 flex items-center gap-3 text-xs text-stone"><span class="h-px flex-1 bg-hairline"></span>KHUSUS ADMIN<span class="h-px flex-1 bg-hairline"></span></div>
          <button brnButton class="btn btn-secondary focus-ring w-full"><b class="text-lg">G</b> Masuk dengan Google</button>
          <p class="mt-8 rounded-2xl bg-surface p-4 text-center text-xs leading-5 text-steel">Demo: email membuka admin, ID customer membuka portal customer.</p>
        </div>
      </section>
    </main>
  `,
})
export class LoginComponent {
  identifier = '';
  password = '';
  visible = signal(false);
  loading = signal(false);

  constructor(private router: Router) {}

  submit() {
    if (this.loading()) return;
    this.loading.set(true);
    setTimeout(() => this.router.navigate([this.identifier.includes('@') ? '/admin/dashboard' : '/customer/dashboard']), 500);
  }
}
