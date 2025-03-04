import { Component } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { TallesComponent } from "../talles/talles.component";
import { Router } from '@angular/router';
import { DatabaseService } from '../../../services/database.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-short',
  standalone: true,
  imports: [NavbarComponent,TallesComponent,CommonModule],
  templateUrl: './short.component.html',
  styleUrl: './short.component.css'
})
export class ShortComponent {
  model :string = 'shorts';
  productShortList: any[] = []; 
  productShortListOriginal : any[] = [];
  selectedSizes: number[] = [];
  limpiarTallesEvent: boolean = false;

  constructor(private db: DatabaseService,private router: Router) {
    this.traerProductos();
  }

  traerProductos(){
    this.db.traerColeccion(this.model).subscribe((response) => {
      this.productShortList = response;
      this.productShortListOriginal  = [...response];
      console.log('productShortList---> ',this.productShortList);
    });
  }

  verDetalleProducto(id :string) {
    this.router.navigate(['/detalle-producto', id, this.model]);
  }

  recibirTalle(event: { talle: number, checked: boolean }) {

    if (event.checked) {
      if (!this.selectedSizes.includes(event.talle)) this.selectedSizes.push(event.talle);
    } else {
      // Si se deselecciona, excluye de la lista
      this.selectedSizes = this.selectedSizes.filter(t => t !== event.talle)
    }

    if (this.selectedSizes.length > 0) {
      this.filtrarShots();
    } else {
      this.restaurarLista();
    }
  }

  filtrarShots() {
    if (this.productShortList.length === 0) {
      console.log('Lista de productos aún vacía, no se puede filtrar.');
      return;
    }

    this.productShortList = this.productShortListOriginal.filter( (short: any) => 
      short.talles.some( (t:any) => this.selectedSizes.includes(t.numeroTalle))
    );
  }

  restaurarLista() {
    this.productShortList = [...this.productShortListOriginal]; 
  }

  limpiarFiltros() {
    this.selectedSizes = [];
    this.restaurarLista();
    this.limpiarTallesEvent = true; // Notificar a app-talles
    setTimeout(() => (this.limpiarTallesEvent = false), 100); // Reiniciar valor después de un tiempo
  }
  
}
