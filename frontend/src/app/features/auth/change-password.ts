import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrnButton } from '@spartan-ng/brain/button';

@Component({
  standalone: true,
  imports: [FormsModule, BrnButton],
  template: `
    <div class="mx-auto max-w-2xl">
      <p class="text-xs font-semibold uppercase tracking-[.05em] text-stone">Keamanan akun</p>
      <h1 class="display mt-2 text-5xl text-ink-deep">Ganti password</h1>
      <div class="panel mt-8 p-6 md:p-8">
        <p class="mb-6 text-sm text-slate">Gunakan minimal 8 karakter dengan kombinasi huruf dan angka.</p>
        <form class="space-y-5" (ngSubmit)="saved.set(true)">
          <label class="block text-sm font-medium">Password saat ini<input type="password" class="input mt-2" required></label>
          <label class="block text-sm font-medium">Password baru<input type="password" class="input mt-2" required></label>
          <label class="block text-sm font-medium">Ulangi password baru<input type="password" class="input mt-2" required></label>
          <button brnButton class="btn btn-primary">Simpan password</button>
        </form>
        @if (saved()) {
          <p class="mt-4 rounded-2xl bg-teal p-3 text-sm font-medium text-moss">Password berhasil diperbarui.</p>
        }
      </div>
    </div>
  `,
})
export class ChangePasswordComponent {
  saved = signal(false);
}
