import { Component } from '@angular/core';
import { DatabaseService } from '../../../services/database.service';
import { NavbarComponent } from '../../navbar/navbar.component';
import { TallesComponent } from '../talles/talles.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mom',
  standalone: true,
  imports: [NavbarComponent,TallesComponent,CommonModule],
  templateUrl: './mom.component.html',
  styleUrl: './mom.component.css'
})
export class MomComponent {
  model :string = 'moms';
  productMomList: any[] = []; 
  productMomListOriginal : any[] = [];
  selectedSizes: number[] = []; 
  limpiarTallesEvent: boolean = false;

  constructor(private db: DatabaseService,private router: Router){
    this.traerProductos();
  }

  traerProductos(){
    this.db.traerColeccion(this.model).subscribe((response) => {
      this.productMomList = response;
      this.productMomListOriginal  = [...response];
      console.log('productMomList---> ',this.productMomList);
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
    if (this.productMomList.length === 0) {
      console.log('Lista de productos aún vacía, no se puede filtrar.');
      return;
    }

    this.productMomList = this.productMomListOriginal.filter( (short: any) => 
      short.talles.some( (t:any) => this.selectedSizes.includes(t.numeroTalle))
    );
  }

  restaurarLista() {
    this.productMomList = [...this.productMomListOriginal]; 
  }

  limpiarFiltros() {
    this.selectedSizes = [];
    this.restaurarLista();
    this.limpiarTallesEvent = true;
    setTimeout(() => (this.limpiarTallesEvent = false), 100); 
  }
}
