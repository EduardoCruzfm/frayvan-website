import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule, ViewportScroller } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { NavbarComponent } from '../navbar/navbar.component';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-bienvenida',
  standalone: true,
  imports: [NavbarComponent,RouterModule,CommonModule],
  templateUrl: './bienvenida.component.html',
  styleUrl: './bienvenida.component.css',
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class BienvenidaComponent {
  userLoggedIn: boolean = false; 
  userEmail: string | null = null; 
  tipoUsuario: string | any = null;
  
  usuarioActual: string | any = null;
  mostrarLogin: boolean = true; 


  constructor(private authService: AuthService, private viewportScroller: ViewportScroller, private router: Router, 
    private route: ActivatedRoute, private db: DatabaseService,private usuarioService: UsuarioService,) {
    // Suscribirse a los cambios de estado de autenticación
    this.authService.userLoggedIn$.subscribe((isLoggedIn) => {
      this.userLoggedIn = isLoggedIn;
    });

    // Suscribirse a los cambios de correo del usuario
    this.authService.userEmail$.subscribe((email) => {
      this.userEmail = email;
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.viewportScroller.scrollToPosition([0, 0]);
      }
    });
  } 

    ngOnInit(): void {

      this.tipoUsuario = this.usuarioService.getUsuarioPerfil();
      this.cargarUsuarioActual();
    }

    async cargarUsuarioActual() {
      const user = await this.authService.getCurrentUser();
      if (user) {
        this.usuarioActual = await this.db.obtenerUsuarioPorId(user.uid, this.tipoUsuario);
        
        console.log("usuaario actual" , this.usuarioActual );
      }
    }

  async onLinkClick(event: MouseEvent, path: string) {
    event.preventDefault(); // Evita la acción predeterminada del enlace

    const isValid = this.validateUser();

    if (isValid) {
      this.router.navigate([path]);
    } else {

      await Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Debe registrarse para poder juagar!',
        footer: `
        <div style="display: flex; flex-direction: column;">
          <a href="/login">Iniciar Sesión</a>
          <a href="/registro">Registrarse</a>
        </div>
      `
      });
      console.log('Validación fallida');
    }
  }

  validateUser() {
    return this.userLoggedIn;
  }

  async navigateTo() {
      // La validación
      const isValid = this.validateUser();

      if (isValid) {
        
        this.router.navigate(['/mostrar-especialidades'], { state: { usuario: this.usuarioActual } });
        // this.router.navigate(['/turnos'], { state: { usuario: this.usuarioActual } });
      } else {
  
        await Swal.fire({
          icon: 'warning',
          title: 'Oops...',
          text: 'Debe registrarse para poder solicitar un turno!',
          footer: `
          <div style="display: flex; flex-direction: column;">
            <a href="/login">Iniciar Sesión</a>
            <a href="/registro">Registrarse</a>
          </div>
        `
        });
        console.log('Validación fallida');
      }
    
  }

  scrollToSection(sectionId: string) {
    this.router.navigate([], { fragment: sectionId }).then(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}
