import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { DatabaseService } from '../../services/database.service';
import { UsuarioService } from '../../services/usuario.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-usuario-detalle',
  standalone: true,
  imports: [CommonModule,FormsModule,NavbarComponent],
  templateUrl: './usuario-detalle.component.html',
  styleUrl: './usuario-detalle.component.css',
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

export class UsuarioDetalleComponent {
  usuario: any;
  mostrarLogin: boolean = true; 
  tipoUsuarioPefil: string = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {
    this.usuario = this.usuarioService.getUsuario();
    console.log("test", this.usuario);
    this.tipoUsuarioPefil = this.usuarioService.getUsuarioPerfil();
  }

  ngOnInit(): void {

    if (this.usuario) {
      console.log('Datos del usuario:', this.usuario);
    } else {
      console.error('No se han recibido datos del usuario.');
    }

  }

  historial(){
    this.router.navigate(['/historia-clinica']); // ver esto
  }

}