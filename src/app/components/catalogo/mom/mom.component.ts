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
  productMomList: any;

  constructor(private db: DatabaseService,private router: Router){
    this.traerProductos();
  }

  traerProductos(){
    this.db.traerColeccion(this.model).subscribe((response) => {
      this.productMomList = response;
      console.log('productMomList---> ',this.productMomList);
    });
  }

  verDetalleProducto(id :string) {
    this.router.navigate(['/detalle-producto', id, this.model]);
  }


}
