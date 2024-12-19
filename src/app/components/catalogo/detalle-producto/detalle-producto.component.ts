import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavbarComponent } from "../../navbar/navbar.component";

@Component({
  selector: 'app-detalle-producto',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './detalle-producto.component.html',
  styleUrl: './detalle-producto.component.css'
})

export class DetalleProductoComponent {
  productoId!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params
    this.route.params.subscribe((params) => {
      this.productoId = +params['id']; 
      console.log('Producto ID:', this.productoId);
    });

    this.setupButtonGroup('color-buttons', 'selected');
    this.setupButtonGroup('size-buttons', 'active');
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