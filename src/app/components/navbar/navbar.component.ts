import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  tipoUsuarioPefil: string = '';

  userLoggedIn: boolean = false;      
  userEmail: string | null = null; 
  usuarioActual: any | null = "";

  constructor(private authService: AuthService,
              private router: Router, 
              private db: DatabaseService,
              private usuarioService: UsuarioService
            ){
      this.authService.userLoggedIn$.subscribe((isLoggedIn) => {
      this.userLoggedIn = isLoggedIn;
    });

    this.authService.userEmail$.subscribe(async (email) => {
      this.userEmail = email;
    });

    this.tipoUsuarioPefil = this.usuarioService.getUsuarioPerfil();
    
  }
  
  async ngOnInit(): Promise<void> {
    // Recuperar el perfil del usu
    await this.cargarUsuarioActual();
    this.usuarioService.setUsuario(this.usuarioActual);
    this.tipoUsuarioPefil = this.usuarioService.getUsuarioPerfil();
    // this.usuarioActual = this.usuarioService.getUsuario();

    console.log("tipoUsuarioPefil", this.tipoUsuarioPefil)
  }
  
  async cargarUsuarioActual() {
    const user = await this.authService.getCurrentUser(); // Obtener el usuario actual
    if (user) {
      console.log("UID " + user.uid);
      this.usuarioActual = await this.db.obtenerUsuarioPorId(user.uid, this.tipoUsuarioPefil); // <-----
      
    }
  }

  home() { 
    this.router.navigate(['/bienvenida']).then(() => {
      this.scrollToSection('nav');
    });
  }

  catalogo() {
    this.router.navigate(['/catalogo']);
  }

  altaProducto() {
    this.router.navigate(['/alta-producto']);
  }

  miPerfil(usuario: any) {
    this.usuarioService.setUsuario(usuario); 
    this.router.navigate(['/usuario-detalle']);
    // this.router.navigate(['/usuario-detalle'],{ state: { usuario } });
  }

  scrollToSection(sectionId: string) {
    this.router.navigate([], { fragment: sectionId }).then(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  cerrarSesion() {
    this.authService.logout().then(() => {
      this.usuarioService.clearUsuario();
      this.router.navigate(['/bienvenida']); 
    });
  }

  iniciarSesion() {
    this.router.navigate(['/login']); 
  }

  registrarse() {
    this.router.navigate(['/registro']); 
  }
}
