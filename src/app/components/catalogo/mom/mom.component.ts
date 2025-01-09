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
  momList: any;

  constructor(private db: DatabaseService,private router: Router){
    this.traerProductos();
  }

  traerProductos(){
    this.db.traerColeccion('moms').subscribe((response) => {
      this.momList = response;
      console.log('momList---> ',this.momList);
    });
  }

  verDetalleProducto(id :string) {
    const coleccion = 'moms';
    this.router.navigate(['/detalle-producto', id, coleccion]);
  }


}
