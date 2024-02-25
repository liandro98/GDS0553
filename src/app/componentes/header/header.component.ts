import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuItems: MenuItem[];

  constructor() {
    this.menuItems = [
      { label: 'Inicio', routerLink: '/home' },
      { label: 'Produtos', routerLink: '/products' },
      { label: 'Cambiar de usuario', routerLink: '/login' },
      { label: 'Contacto', routerLink: '/home' }
    ];
  }
  
}
