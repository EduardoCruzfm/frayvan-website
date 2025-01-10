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
  productChupinList: any;
  
    constructor(private db: DatabaseService,private router: Router){
      this.traerProductos();
    }
  
    traerProductos(){
      this.db.traerColeccion(this.model).subscribe((response) => {
        this.productChupinList = response;
        console.log('productChupinList---> ',this.productChupinList);
      });
    }
  
    verDetalleProducto(id :string) {
      this.router.navigate(['/detalle-producto', id, this.model]);
    }
  
}
