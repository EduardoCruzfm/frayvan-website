import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'bienvenida', pathMatch: 'full' }, // Redirige la ruta raíz a "login"
    
    {
      path: 'bienvenida',
      loadComponent: () =>
        import('./components/bienvenida/bienvenida.component').then(
          (m) => m.BienvenidaComponent
        ),
        data: { animation: 'bienvenida' },
    },
    {
      path: 'login',
      loadComponent: () =>
        import('./components/login/login.component').then(
          (m) => m.LoginComponent
        ),
        data: { animation: 'login' },
    },
    {
      path: 'registro',
      loadComponent: () =>
        import('./components/registro/registro.component').then(
          (m) => m.RegistroComponent
        ),
        data: { animation: 'registro' },
    },
];
