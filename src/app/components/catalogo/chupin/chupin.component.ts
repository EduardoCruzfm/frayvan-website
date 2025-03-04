import { Component } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { TallesComponent } from '../talles/talles.component';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../../../services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chupin',
  standalone: true,
  imports: [NavbarComponent,TallesComponent,CommonModule],
  templateUrl: './chupin.component.html',
  styleUrl: './chupin.component.css'
})
export class ChupinComponent {
  model :string = 'chupines';
  productChupinList: any[] = []; 
  productChupinListOriginal : any[] = [];
  selectedSizes: number[] = []; 
  limpiarTallesEvent: boolean = false;

    constructor(private db: DatabaseService,private router: Router){
      this.traerProductos();
    }
  
    traerProductos(){
      this.db.traerColeccion(this.model).subscribe((response) => {
        this.productChupinList = response;
        this.productChupinListOriginal = [...response];
        console.log('productChupinList---> ',this.productChupinList);
      });
    }
  
    verDetalleProducto(id :string) {
      this.router.navigate(['/detalle-producto', id, this.model]);
    }
  
    recibirTalle(event: { talle: number, checked: boolean }) {

      if (event.checked) {
        if (!this.selectedSizes.includes(event.talle)) this.selectedSizes.push(event.talle);
      } else {
        this.selectedSizes = this.selectedSizes.filter(t => t !== event.talle)
      }
  
      if (this.selectedSizes.length > 0) {
        this.filtrarShots();
      } else {
        this.restaurarLista();
      }
    }
  
    filtrarShots() {
      if (this.productChupinList.length === 0) {
        console.log('Lista de productos aún vacía, no se puede filtrar.');
        return;
      }
  
      this.productChupinList = this.productChupinListOriginal.filter( (short: any) => 
        short.talles.some( (t:any) => this.selectedSizes.includes(t.numeroTalle))
      );
    }
  
    restaurarLista() {
      this.productChupinList = [...this.productChupinListOriginal]; 
    }

    limpiarFiltros() {
      this.selectedSizes = [];
      this.restaurarLista();
      this.limpiarTallesEvent = true;
      setTimeout(() => (this.limpiarTallesEvent = false), 100); 
    }
}
