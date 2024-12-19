import { Component } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { TallesComponent } from "../talles/talles.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-short',
  standalone: true,
  imports: [NavbarComponent, TallesComponent],
  templateUrl: './short.component.html',
  styleUrl: './short.component.css'
})
export class ShortComponent {

  constructor(private router: Router) { }

  verDetalleProducto(id: number): void {
    this.router.navigate(['/detalle-producto', id]);
  }
}
