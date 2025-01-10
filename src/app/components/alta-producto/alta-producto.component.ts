import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { DatabaseService } from '../../services/database.service';
import { StorageService } from '../../services/storage.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Producto } from '../../classes/producto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alta-producto',
  standalone: true,
  imports: [NavbarComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './alta-producto.component.html',
  styleUrl: './alta-producto.component.css',
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
export class AltaProductoComponent {
  listaTalles: number[] = [36, 38, 40, 42, 44, 46]; 
  tallesSeleccionados: number[] = []; // Para almacenar los talles seleccionados
  selectedFile: any;
  coleccionFile: string[] = [];
  tallesConCantidad: { numeroTalle: number; cantidad: number }[] = []; // Resultado final

  selectedFiles: File[] = [];
  previewImages: { url: string; file: File }[] = [];
  isModalOpen = false;

   form = new FormGroup({
       titulo: new FormControl('', [Validators.required]),
       tipo: new FormControl('', [Validators.required]),
       talles: new FormControl([{ numeroTalle: 0, cantidad: 0 }], [Validators.required]),
       colores: new FormControl('', [Validators.required]),
       descripcion: new FormControl('', [Validators.required]),
      
     });
   
     constructor( private storage :StorageService ,private db:DatabaseService ) {} 
   
     // Registrar producto
  async handleRegister() {
        const { titulo,tipo,talles,colores,descripcion } = this.form.value;
        
        if (typeof titulo === 'string' && typeof tipo === 'string' && 
            Array.isArray(talles) &&  typeof colores === 'string' && typeof descripcion === 'string') {
          try {

            await this.uploadAllImages();
            const producto: Producto = new Producto('',titulo,tipo,talles,colores,this.coleccionFile,descripcion)
            this.db.agregarProducto(producto,tipo);
            
            console.log('prod -------->',producto);
              
              // Mostrar mensaje de éxito en el registro
              await Swal.fire({
                title: 'Producto registrado con éxito!',
                text: 'El producto ha sido agregado correctamente a la base de datos.',
                icon: 'success',
                confirmButtonText: 'Aceptar',
              });
    
          } catch (error: any) {
            
              await Swal.fire({
                icon: 'error',
                title: 'Error al registrar el producto',
                text: 'Ha ocurrido un error al registrar el producto. Por favor, intenta de nuevo más tarde.',
                footer: '<a href="#">¿Por qué tengo este problema?</a>',
                confirmButtonText: 'Aceptar',
              });
            
          }
        } else {
          await Swal.fire({
            icon: 'error',
            title: 'Datos inválidos',
            text: 'Por favor, asegúrate de que todos los campos estén correctamente llenados (nombre, tipo, talles y colores).',
            confirmButtonText: 'Aceptar',
          });
        }
      
  }

  onTalleChange(event: any) {
    const talle = event.target.value;
    if (event.target.checked) {
      // Agregar el talle a la lista de seleccionados
      this.tallesSeleccionados.push(+talle);
      this.form.get('talles')?.setValue(this.tallesConCantidad);


    } else {
      // Eliminar el talle si se desmarca
      this.tallesSeleccionados = this.tallesSeleccionados.filter(
        (t) => t !== +talle
      );
      // Eliminar la cantidad asociada
      this.tallesConCantidad = this.tallesConCantidad.filter(
        (tc) => tc.numeroTalle !== +talle
      );
    }
  }
  
  onCantidadChange(talle: number, event: any) {
    const cantidad = +event.target.value;
    const index = this.tallesConCantidad.findIndex((tc) => tc.numeroTalle === talle);

    if (index !== -1) {
      // Actualizar cantidad existente
      this.tallesConCantidad[index].cantidad = cantidad;
    } else {
      // Agregar un nuevo objeto de talle y cantidad
      this.tallesConCantidad.push({ numeroTalle: talle, cantidad });
    }
  }


    // Manejar la selección de archivos
  onFileSelected(event: Event): void {  
    const input = event.target as HTMLInputElement;
    if (input?.files) {
      const files = Array.from(input.files);

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewImages.push({
            url: e.target?.result as string,
            file: file,
          });
        };
        reader.readAsDataURL(file);
      });
    }
    
  }

  // Abrir/Cerrar el modal
  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  // Mover imágenes
  moveImage(index: number, direction: number): void {
    const newIndex = index + direction;
    if (newIndex >= 0 && newIndex < this.previewImages.length) {
      const temp = this.previewImages[index];
      this.previewImages[index] = this.previewImages[newIndex];
      this.previewImages[newIndex] = temp;
    }
  }

  // Eliminar imágenes
  removeImage(index: number): void {
    this.previewImages.splice(index, 1);
  }

  // Subir todas las imágenes
  async uploadAllImages(): Promise<void> {
    try {
      const uploadedUrls = await Promise.all(
        this.previewImages
        .filter((img) => img.file !== null) // Elimina valores nulos
        .map((img) => this.storage.uploadImage(img.file!))
      );
      
       // Asegura de que coleccionFile sea un arreglo de strings
      this.coleccionFile = uploadedUrls.filter((url) => url !== null) as string[];

      console.log('Imágenes subidas:', uploadedUrls);
      this.closeModal();
    } catch (error) {
      console.error('Error al subir las imágenes:', error);
    }
  }
}
