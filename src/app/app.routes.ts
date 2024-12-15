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
    }
];
