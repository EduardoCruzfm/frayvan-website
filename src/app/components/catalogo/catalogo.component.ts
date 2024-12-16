import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';


@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [NavbarComponent,CommonModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css',
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class CatalogoComponent {
  mostrarLogin: boolean = true; 

  constructor(private router: Router) { }

  irAShort() {
    console.log("--->")
    this.router.navigate(['/short']);
  }

  irAMom() {
    this.router.navigate(['/mom']);
  }
  irAChupin() {
    this.router.navigate(['/chupin']);
  }
}
