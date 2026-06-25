import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/landing/landing').then(m => m.LandingComponent), title: 'JEESTIP.ID — Jastip China' },
  { path: 'login', loadComponent: () => import('./features/auth/login').then(m => m.LoginComponent), title: 'Masuk — JEESTIP.ID' },
  {
    path: 'admin',
    loadComponent: () => import('./shared/portal-shell').then(m => m.PortalShellComponent), data: { role: 'admin' },
    children: [
      { path: 'dashboard', loadComponent: () => import('./features/portal/dashboard').then(m => m.DashboardComponent), data: { role: 'admin' } },
      { path: 'customers', loadComponent: () => import('./features/portal/data-page').then(m => m.DataPageComponent), data: { page: 'customers' } },
      { path: 'invoices', loadComponent: () => import('./features/portal/data-page').then(m => m.DataPageComponent), data: { page: 'invoices' } },
      { path: 'purchase-transactions', loadComponent: () => import('./features/portal/data-page').then(m => m.DataPageComponent), data: { page: 'transactions' } },
      { path: 'fees', loadComponent: () => import('./features/portal/data-page').then(m => m.DataPageComponent), data: { page: 'fees' } },
      { path: 'rate-jastip', loadComponent: () => import('./features/portal/rate-jastip').then(m => m.RateJastipComponent) },
      { path: 'rates/topup-china', loadComponent: () => import('./features/portal/data-page').then(m => m.DataPageComponent), data: { page: 'topupChina' } },
      { path: 'rates/topup-indonesia', loadComponent: () => import('./features/portal/data-page').then(m => m.DataPageComponent), data: { page: 'topupIndonesia' } },
      { path: 'rates/transfer-bank-china', loadComponent: () => import('./features/portal/data-page').then(m => m.DataPageComponent), data: { page: 'transfer' } },
      { path: 'admin-users', loadComponent: () => import('./features/portal/data-page').then(m => m.DataPageComponent), data: { page: 'admins' } },
      { path: 'settings', loadComponent: () => import('./features/portal/settings').then(m => m.SettingsComponent) },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    ],
  },
  {
    path: 'customer',
    loadComponent: () => import('./shared/portal-shell').then(m => m.PortalShellComponent), data: { role: 'customer' },
    children: [
      { path: 'dashboard', loadComponent: () => import('./features/portal/dashboard').then(m => m.DashboardComponent), data: { role: 'customer' } },
      { path: 'invoices', loadComponent: () => import('./features/portal/data-page').then(m => m.DataPageComponent), data: { page: 'myInvoices' } },
      { path: 'fees', loadComponent: () => import('./features/portal/data-page').then(m => m.DataPageComponent), data: { page: 'myFees' } },
      { path: 'purchase-transactions', loadComponent: () => import('./features/portal/data-page').then(m => m.DataPageComponent), data: { page: 'myTransactions' } },
      { path: 'change-password', loadComponent: () => import('./features/auth/change-password').then(m => m.ChangePasswordComponent) },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
    ],
  },
  { path: '**', redirectTo: '' },
];
