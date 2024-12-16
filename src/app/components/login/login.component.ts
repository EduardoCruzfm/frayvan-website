import { Component } from '@angular/core';
import {FormControl,FormGroup,FormsModule,ReactiveFormsModule,Validators} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { formatDate } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,NavbarComponent,ReactiveFormsModule,SweetAlert2Module,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
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
export class LoginComponent {
  listaAdministradores: any;
  listaClientes: any;
  usuarioActual: any

   // Variable para almacenar el CAPTCHA generado
  generatedCaptcha: string = '';

  // Variable para almacenar el valor ingresado por el usuario
  captchaInput: string = '';
  
  // Mensaje de error de CAPTCHA
  captchaError: boolean = false;
  mostrarLogin: boolean = true; 

  // Registro del logue
  anioActual: number = new Date().getFullYear();
  fechaActual = new Date();
  mesActual = this.fechaActual.getMonth(); 

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router, private authService: AuthService, private db: DatabaseService,private usuarioService: UsuarioService) {
    this.traerAdministradores();
    this.traerClientes();
  } 

  traerAdministradores(){
    this.db.traerUsuario('administradores').subscribe((response) => {
      this.listaAdministradores = response;
      console.log('Lista de Administradores:', this.listaAdministradores);
    });
  }
  traerClientes(){
    this.db.traerUsuario('clientes').subscribe((response) => {
      this.listaClientes = response;
      console.log('Lista de Clientes:', this.listaClientes);
    });
  }

  ngOnInit(): void {
    // Generar el CAPTCHA cuando se carga el componente        ->>> crear log basico

    // this.generateCaptcha();
  }

  usuarioAdmin() {
    this.form.patchValue({
      email: 'eduardocruz.fm@gmail.com',
      password: '450253',
    });
  }
  usuarioEspecialista1(){
    this.form.patchValue({
      email: 'eduardofrankcruzmendez@gmail.com',
      password: '450253'
    });
  }

  asignarContrasenia(usuario: any){
    if (usuario && usuario.email) {

      switch (usuario.email) {
        case 'eduardocruz.fm@gmail.com':
            this.usuarioAdmin();
          break;
        case 'eduardofrankcruzmendez@gmail.com':
            this.usuarioEspecialista1();
          break;
      }

    } else {
      console.log(`Contraseña asignada a ${usuario.correo}: ${usuario.contraseña}`);
    }
  }


async handleLogin() {    //agregar wsp al registro

  // Validar CAPTCHA antes de proceder con el login
  // if (!this.validateCaptcha()) {

  //   await Swal.fire({
  //     icon: 'warning',
  //     title: 'El CAPTCHA es incorrecto',
  //     text: 'Por favor, inténtalo de nuevo.',
  //   });
  //   return;
  // }


  if (this.form.valid) {
    const { email, password } = this.form.value;

    if (typeof email === 'string' && typeof password === 'string') {
      try {
        await this.authService.login(email, password);

        const esAdmin = this.listaAdministradores.some((admin: any) => 
          admin.email == email && admin.perfil == 'administrador'
        );

        const esPaciente = this.listaClientes.some((admin: any) => 
          admin.email == email && admin.perfil == 'cliente'
        );

       if (esAdmin) {
        this.continuarLog('administradores');
      }
      else if(esPaciente && await this.emailVerified()) {
          this.continuarLog('clientes');
        }
        
      } catch (error) {
        // Mostrar alerta en caso de error de autenticación
        await Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Correo o contraseña incorrectos. Por favor, intenta de nuevo!',
          footer: '<a href="#">Why do I have this issue?</a>',
        });
        console.error('Error al iniciar sesión:', error);
      }
    } else {
      await Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Correo electrónico o contraseña inválidos!',
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  } else {
    await Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Formulario inválido!',
      footer: '<a href="#">Why do I have this issue?</a>',
    });
  }
}

  setterForms(){
    this.form.get('email')?.setValue('');
    this.form.get('password')?.setValue('');
  }

  async emailVerified():Promise<boolean>{
    const emailVerified = await this.authService.isEmailVerified();
    if (!emailVerified) {
      await Swal.fire({
        icon: 'info',
        title: 'Verificación requerida',
        text: 'Por favor, verifica tu correo electrónico antes de continuar.',
      });
      return false;
    }
    return true;
  }

   obtenerUsuario(perfil: string){
    const User =  this.authService.getCurrentUser();
    if (User) {
      this.usuarioActual =  this.db.obtenerUsuarioPorId(User.uid, perfil);
    }
    else{
      console.log("ERROR -> ", User);
    } 
  }


registrarLogs() {
  const User = this.authService.getCurrentUser();
  if (User) {
    const fechaActual = new Date();
    const dia = fechaActual.getDate();
    const mesDigito = fechaActual.getMonth(); // Mes en formato de número (0-11)
    const anio = fechaActual.getFullYear();
    const hora = formatDate(fechaActual, 'HH:mm:ss', 'en-US'); // Hora en formato HH:mm:ss

    // Mapa de meses para convertir el número a cadena
    const mesesCadena = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    const mesCadena = mesesCadena[mesDigito];

    const log = {
      idUsuario: User.uid,
      dia: dia,
      mes: {
        cadena: mesCadena,
        digito: mesDigito
      },
      hora: hora,
      anio: anio
    };

    console.log(log);
    this.db.agregarLog(log,'logs');

  } else {
    console.log("ERROR -> ", User);
  }
}

   // Función para generar un CAPTCHA aleatorio
   generateCaptcha(): void {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captchaText = '';

    // Generar un texto aleatorio de 6 caracteres
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      captchaText += characters[randomIndex];
    }

    // Asignar el CAPTCHA generado a la variable
    this.generatedCaptcha = captchaText;
  }

  // Función para validar el CAPTCHA ingresado
  validateCaptcha(): boolean {
    console.log(this.captchaInput);
    console.log(this.generatedCaptcha);
    
    if (this.captchaInput === this.generatedCaptcha) {
      this.captchaError = false;  // CAPTCHA válido
      return true;
    } else {
      this.captchaError = true;   // CAPTCHA incorrecto
      return false;
    }

  }

  async continuarLog(perfil :string){
    this.registrarLogs();

          await Swal.fire({
            title: 'Éxito!',
            text: 'Inicio de sesión exitoso!',
            icon: 'success',
          });
          
          this.router.navigate(['/bienvenida']);
          this.usuarioService.setUsuarioPerfil(perfil);
          this.setterForms();
  }



}
