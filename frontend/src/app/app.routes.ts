import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/landing/landing').then(m => m.LandingComponent), title: 'JEESTIP.ID — Jastip China' },
  { path: 'login', loadComponent: () => import('./features/auth/login').then(m => m.LoginComponent), title: 'Login Admin — JEESTIP.ID' },
  {
    path: 'admin',
    loadComponent: () => import('./shared/portal-shell').then(m => m.PortalShellComponent), data: { role: 'admin' },
    children: [
      { path: 'transaksi-pembelian', loadComponent: () => import('./features/portal/data-page').then(m => m.DataPageComponent), title: 'Transaksi Pembelian — Admin JEESTIP.ID' },
      { path: 'rate-jastip-taobao', loadComponent: () => import('./features/portal/rate-jastip').then(m => m.RateJastipComponent), title: 'Rate Jastip Taobao — Admin JEESTIP.ID' },
      { path: '', pathMatch: 'full', redirectTo: 'transaksi-pembelian' },
    ],
  },
  { path: '**', redirectTo: '' },
];
