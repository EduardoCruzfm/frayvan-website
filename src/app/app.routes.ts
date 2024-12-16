import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

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
    {
      path: 'usuario-detalle',
      loadComponent: () =>
        import('./components/usuario-detalle/usuario-detalle.component').then(
          (m) => m.UsuarioDetalleComponent
        ),
        canActivate: [authGuard]
    },
    {
      path: 'catalogo',
      loadComponent: () =>
        import('./components/catalogo/catalogo.component').then(
          (m) => m.CatalogoComponent
        ),
    },
    {
      path: 'short',
      loadComponent: () =>
        import('./components/catalogo/short/short.component').then(
          (m) => m.ShortComponent
        )
    },
    {
      path: 'mom',
      loadComponent: () =>
        import('./components/catalogo/mom/mom.component').then(
          (m) => m.MomComponent
        )
    },
    {
      path: 'chupin',
      loadComponent: () =>
        import('./components/catalogo/chupin/chupin.component').then(
          (m) => m.ChupinComponent
        )
    }
    
];
