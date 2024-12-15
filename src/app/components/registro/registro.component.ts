import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import Swal from 'sweetalert2';
import { Cliente } from '../../classes/cliente';



@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule,NavbarComponent,ReactiveFormsModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
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
export class RegistroComponent {
   mostrarLogin: boolean = true; 

   form = new FormGroup({
     nombre: new FormControl('', [Validators.required]),
     apellido: new FormControl('', [Validators.required]),
     dni: new FormControl('', [Validators.required]),
     email: new FormControl('', [Validators.required, Validators.email]),
     password: new FormControl('', [Validators.required]),
   });
 
   constructor(private router: Router, private authService: AuthService, private db:DatabaseService ) {} 
 
   // Registrar
   async handleRegister() {
   
       const { nombre,apellido,dni,email,password } = this.form.value;
 
       if (typeof nombre === 'string' && typeof apellido === 'string' && typeof dni === 'number' &&  
           typeof email === 'string' && typeof password === 'string') {
         try {
              const userCredential = await this.authService.register(email, password);
             const userId = userCredential.user?.uid;
             
             if (userCredential.user) {
               await this.authService.sendVerificationEmail(userCredential.user);
             }
   
             if (userId) {
               const cliente: Cliente = new Cliente(userId,nombre,apellido,dni,email,"paciente");
               await this.db.agregarUsuario(cliente,'clientes');
             }
   
             // Mostrar mensaje de éxito en el registro
             await Swal.fire({
               title: 'Registro exitoso!',
               text: 'Te hemos enviado un correo de verificación. Por favor, verifica tu correo electrónico antes de iniciar sesión.',
               icon: 'success',
             });
   
             // Redirigir al inicio de sesión (opcional)
             this.router.navigate(['/login']);
           
 
         } catch (error: any) {
           if (error.code === 'auth/email-already-in-use') {
             // Manejo específico cuando el correo ya está registrado
             await Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text: 'El correo electrónico ya está en uso!',
             });
           } else {
             await Swal.fire({
               icon: 'error',
               title: 'Oops...',
               text: 'Error al registrarse. Por favor, intenta de nuevo!',
               footer: '<a href="#">Why do I have this issue?</a>',
             });
           }
         }
       } else {
         await Swal.fire({
           icon: 'error',
           title: 'Oops...',
           text: 'Correo electrónico o contraseña inválidos!',
           footer: '<a href="#">Why do I have this issue?</a>',
         });
       }
     
   }
 
}
