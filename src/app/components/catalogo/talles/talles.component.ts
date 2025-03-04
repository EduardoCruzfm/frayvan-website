import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-talles',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './talles.component.html',
  styleUrl: './talles.component.css'
})
export class TallesComponent {

  @Output() talleSeleccionado = new EventEmitter<{ talle: number, checked: boolean }>();
  @Input() limpiarTalles: boolean = false; // Recibe evento desde el padre

  listaTalles: number[] = [36,38,40,42,44,46];
  seleccionados: { [key: number]: boolean } = {}; // Objeto para manejar checkboxes
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['limpiarTalles'] && this.limpiarTalles) {
      this.seleccionados = {}; // Limpiar checkboxes
    }
  }

  checkTalle(event: Event, talle: number) {
    const target = event.target as HTMLInputElement | null;
  
    if (target !== null) {
      this.seleccionados[talle] = target.checked;
      this.talleSeleccionado.emit({ talle, checked: target.checked });
    }
  }

}
