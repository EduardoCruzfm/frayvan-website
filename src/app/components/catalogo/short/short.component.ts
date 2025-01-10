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
  productShortList: any;
  // imgInitial: string = 

  constructor(private db: DatabaseService,private router: Router) {
    this.traerProductos();
  }

  traerProductos(){
    this.db.traerColeccion(this.model).subscribe((response) => {
      this.productShortList = response;
      console.log('productShortList---> ',this.productShortList);
    });
  }

  verDetalleProducto(id :string) {
    this.router.navigate(['/detalle-producto', id, this.model]);
  }
}
