import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

declare var bootstrap: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private router: Router) {
    // Cerrar sidebar al completar la navegación
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.closeMobileSidebar();
    });
  }

  // Método para cerrar el sidebar en móvil
  closeMobileSidebar(): void {
    const offcanvasElement = document.getElementById('offcanvasSidebar');
    if (offcanvasElement) {
      const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
      if (offcanvas) {
        offcanvas.hide();
      }
    }
  }

  // Método para manejar la navegación en móvil
  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.closeMobileSidebar();
  }
}
