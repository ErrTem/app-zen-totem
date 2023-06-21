import { Component } from '@angular/core';
import { AuthService } from "@core/services/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent {

  public menuItems = [
    { label: 'Home', link: 'app/home' },
    { label: 'Profile', link: 'app/profile' },
    { label: 'Inventory', link: 'app/inventory' },
    { label: 'Billing', link: 'app/billing' },
    { label: 'Reports', link: 'app/reports' }
  ];

  constructor(private readonly authService: AuthService) {
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
