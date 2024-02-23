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
      { label: 'Acerca de', routerLink: '/about' },
      { label: 'Productos', routerLink: '/products' },
      { label: 'Contacto', routerLink: '/contact' }
    ];
  }
  
}
