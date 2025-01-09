import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from "../../navbar/navbar.component";
import { DatabaseService } from '../../../services/database.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [NavbarComponent,CommonModule],
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.css'
})

export class DetalleProductoComponent {
  productoId!: string;
  coleccion!: string;
  producto: any;
  isLoading: boolean = true;
  imagenSeleccionada: string = '';


  constructor(private route: ActivatedRoute, private db: DatabaseService, private authService: AuthService) {
    this.route.params
    this.route.params.subscribe((params) => {
      this.productoId = params['id']; 
      this.coleccion = params['coleccion'];
      console.log('Producto ID:', this.productoId);
      console.log('Colección:', this.coleccion); 
    });
  }

  async ngOnInit(): Promise<void> {
    this.setupButtonGroup('color-buttons', 'selected');
    this.setupButtonGroup('size-buttons', 'active');
    await this.cargarProductoActual();
    this.imagenSeleccionada = this.producto.fotos[2] || '';
  }
  
  async cargarProductoActual() {
    this.producto = await this.db.obtenerUsuarioPorId(this.productoId, this.coleccion);    
    console.log('Producto---> ',this.producto); 
  }

  cambiarImagen(foto: string) {
    this.imagenSeleccionada = foto;
  }


  setupButtonGroup(buttonGroupId: string, activeClass: string): void {
    const buttonGroup = document.getElementById(buttonGroupId);
  
    const buttons = buttonGroup!.querySelectorAll<HTMLButtonElement>('button');
  
    buttons.forEach((button: HTMLButtonElement) => {
      button.addEventListener('click', () => {
        buttons.forEach((btn: HTMLButtonElement) => btn.classList.remove(activeClass));
        button.classList.add(activeClass);
      });
    });
  }  

}